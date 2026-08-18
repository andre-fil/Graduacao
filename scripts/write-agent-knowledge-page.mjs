import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENROLLMENT_URL = 'https://vestibular2.femaf.com.br';
const WHATSAPP_DISPLAY = '0800 878 5129';
const PRESENCIAL_SHIFT_NOTICE =
  'Atividades em outros turnos podem ocorrer, conforme necessidade da coordenação.';
const EAD_NAME_SUFFIX = ' -ead';

const INGRESS_LABELS = {
  vestibular: 'Vestibular',
  enem: 'ENEM',
  transferencia: 'Transferência',
  segundaGraduacao: 'Segunda Graduação',
  prouni: 'PROUNI',
  fies: 'FIES',
  reabertura: 'Reabertura de matrícula',
};

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function formatMoney(value) {
  return currencyFormatter.format(value);
}

function formatPercent(percent) {
  return Number.isInteger(percent) ? String(percent) : percent.toFixed(2).replace('.', ',');
}

function courseTitle(course) {
  return course.name.endsWith(EAD_NAME_SUFFIX)
    ? course.name.slice(0, -EAD_NAME_SUFFIX.length)
    : course.name;
}

function paragraphs(text) {
  return text
    .split(/\n{2,}/)
    .map((block) => `<p>${escapeHtml(block.trim())}</p>`)
    .join('\n');
}

function list(items) {
  if (!items?.length) return '<p>Não informado.</p>';
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function ingressList(ingress) {
  const names = Object.entries(INGRESS_LABELS)
    .filter(([key]) => ingress[key])
    .map(([, label]) => label);
  return names.length ? names.join(', ') : 'Consulte a coordenação.';
}

function field(label, value) {
  return `<div class="field"><span class="label">${escapeHtml(label)}</span><span class="value">${value}</span></div>`;
}

function priceLine(course, modalityId, modalityName) {
  const price = course.pricesByModality?.[modalityId] ?? course.price;
  const title = courseTitle(course);
  return `PREÇO | ${title} | ${modalityName} | integral ${formatMoney(price.original)} | pontualidade ${formatMoney(price.punctualityDiscount)} (${formatPercent(price.punctualityPercent)}%)`;
}

function renderPriceIndex(courses, modalityName) {
  const lines = [];
  for (const course of courses) {
    for (const modalityId of course.modalityIds) {
      lines.push(priceLine(course, modalityId, modalityName(modalityId)));
    }
  }

  const direito = courses.find((course) => course.id === 'direito');
  const direitoPrice = direito?.price;
  const direitoCity = direitoPrice
    ? `PREÇO-DIREITO-CIDADE | Direito | Presencial | mora em Pedreiras ou Trizidela do Vale | pontualidade 10% | mora a mais de 15 km dessas cidades | pontualidade 30% (Auxílio Transporte) | integral ${formatMoney(direitoPrice.original)}`
    : '';

  const allLines = direitoCity ? [direitoCity, ...lines] : lines;
  const text = allLines.join('\n');
  const htmlLines = allLines.map((line) => `<p>${escapeHtml(line)}</p>`).join('\n');

  return `
<article id="tabela-precos">
  <h2>TABELA DE PREÇOS 2026 — uma linha por curso e modalidade</h2>
  <p>Esta é a fonte de mensalidade da graduação. Ao informar valor, use SOMENTE a linha em que CURSO e MODALIDADE coincidem com a pergunta. Não copie o preço de outro curso. Pós-graduação não tem preço nesta tabela.</p>
  ${htmlLines}
  <pre>${escapeHtml(text)}</pre>
</article>`;
}

function offerBlock(course, modalityId, modalityName) {
  const price = course.pricesByModality?.[modalityId] ?? course.price;
  const isPresencial = modalityId === 'presencial';
  const turno = isPresencial
    ? 'Noturno'
    : 'Horários flexíveis na plataforma EAD';
  const aviso = isPresencial
    ? field('Aviso sobre turno', escapeHtml(PRESENCIAL_SHIFT_NOTICE))
    : '';

  return `
<section class="offer">
  ${field('Modalidade', escapeHtml(modalityName))}
  ${field('Valor', `${escapeHtml(formatMoney(price.original))} por mês (mensalidade integral)`)}
  ${field(
    'Desconto de pontualidade',
    `${escapeHtml(formatPercent(price.punctualityPercent))}% — mensalidade com pontualidade: ${escapeHtml(formatMoney(price.punctualityDiscount))} por mês. Concedido quando o pagamento é realizado em dia.`,
  )}
  ${field('Turno', escapeHtml(turno))}
  ${aviso}
</section>`;
}

function renderEnrollmentSection(ingress) {
  const matricula = ingress?.matricula;
  if (!matricula) return '';

  return `
<article id="documentos-matricula">
  <h2>Documentos necessários para matrícula (graduação)</h2>
  ${field('Setor Acadêmico (presencial)', escapeHtml(`${matricula.academicSector.name} — ${matricula.academicSector.days}, ${matricula.academicSector.hours}. Endereço: ${matricula.academicSector.address ?? ''}`.trim()))}
  <h3>Lista de documentos</h3>
  ${list(matricula.documents)}
  <h3>Como entregar, conforme a modalidade</h3>
  ${field('EAD', escapeHtml(matricula.delivery.ead))}
  ${field('Presencial', escapeHtml(matricula.delivery.presencial))}
  <h3>Prazos de matrícula</h3>
  ${field('Presencial', escapeHtml(matricula.deadlines.presencial))}
  ${field('EAD', escapeHtml(matricula.deadlines.ead))}
  <h3>Como responder perguntas de matrícula</h3>
  ${list(matricula.agentGuidance)}
</article>`;
}

function enrollmentNotesForCourse(course, matricula) {
  if (!matricula) return '';

  const ids = course.modalityIds ?? [];
  const notes = [];
  if (ids.includes('ead')) notes.push(matricula.delivery.ead);
  if (ids.includes('presencial')) {
    notes.push(matricula.delivery.presencial);
  }
  const deadlines = [];
  if (ids.includes('ead') && matricula.deadlines?.ead) deadlines.push(matricula.deadlines.ead);
  if (ids.includes('presencial') && matricula.deadlines?.presencial) {
    deadlines.push(matricula.deadlines.presencial);
  }
  const extra =
    ids.includes('ead') && ids.includes('presencial')
      ? ' Este curso tem mais de uma modalidade: confirme se a matrícula é EAD ou presencial antes de orientar a entrega dos documentos.'
      : '';

  return field(
    'Matrícula e documentos',
    escapeHtml(
      `Documentos: ${matricula.documents.join('; ')}. ${notes.join(' ')} ${deadlines.join(' ')}${extra} Ver seção Documentos necessários para matrícula.`,
    ),
  );
}

function renderInstitutionSection(institution) {
  if (!institution) return '';

  const facts = list(institution.identityFacts);
  const objectives = list(institution.objectives);
  const guidance = list(institution.agentGuidance);
  const milestones = (institution.milestones ?? [])
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.period)} — ${escapeHtml(item.title)}:</strong> ${escapeHtml(item.detail)}</li>`,
    )
    .join('');

  return `
<article id="sobre-a-femaf">
  <h2>Sobre a FEMAF (instituição)</h2>
  ${field('Nome completo', escapeHtml(institution.name))}
  ${field('Sigla', escapeHtml(institution.acronym))}
  ${field('Sede', escapeHtml(`${institution.city}, ${institution.state}`))}
  ${institution.address ? field('Endereço', escapeHtml(institution.address)) : ''}
  ${field('Ano de fundação', escapeHtml(String(institution.foundedYear)))}
  ${field('Fonte', `<a href="${escapeHtml(institution.sourceUrl)}">${escapeHtml(institution.sourceUrl)}</a>`)}
  <h3>Fatos para atendimento</h3>
  ${facts}
  <h3>História</h3>
  ${paragraphs(institution.history)}
  <h3>Missão</h3>
  ${paragraphs(institution.mission)}
  <h3>Visão</h3>
  ${paragraphs(institution.vision)}
  <h3>Objetivos</h3>
  ${objectives}
  <h3>Linha do tempo</h3>
  <ul>${milestones}</ul>
  <h3>Como responder perguntas sobre a instituição</h3>
  ${guidance}
</article>`;
}

function renderFinancingSection(financing) {
  if (!financing) return '';

  const government = (financing.governmentPrograms ?? [])
    .map(
      (item) =>
        `<div class="faq-item"><p><strong>${escapeHtml(item.name)}</strong></p><p>${escapeHtml(item.detail)}</p></div>`,
    )
    .join('');

  const femafPrograms = (financing.femafPrograms ?? [])
    .map(
      (item) =>
        `<div class="faq-item"><p><strong>${escapeHtml(item.name)}</strong></p><p>${escapeHtml(item.detail)}</p></div>`,
    )
    .join('');

  return `
<article id="programas-ingresso">
  <h2>Programas de ingresso, FIES, PROUNI e convênios</h2>
  <h3>Programas governamentais</h3>
  ${government}
  <h3>Programas FEMAF</h3>
  ${femafPrograms}
  <h3>Como responder</h3>
  ${list(financing.agentGuidance)}
</article>`;
}

function renderPostgraduateSection(postgraduate) {
  if (!postgraduate) return '';

  const areas = (postgraduate.areas ?? [])
    .map((area) => {
      const courses = (area.courses ?? [])
        .map(
          (course) =>
            `<li><strong>${escapeHtml(course.name)}:</strong> ${escapeHtml(course.summary)}</li>`,
        )
        .join('');
      return `<h3>Área: ${escapeHtml(area.name)}</h3><ul>${courses}</ul>`;
    })
    .join('\n');

  const count = (postgraduate.areas ?? []).reduce(
    (total, area) => total + (area.courses?.length ?? 0),
    0,
  );

  return `
<article id="pos-graduacao">
  <h2>Pós-graduação EAD (FEMAF DIGITAL)</h2>
  ${field('Portal', `<a href="${escapeHtml(postgraduate.sourceUrl)}">${escapeHtml(postgraduate.sourceUrl)}</a>`)}
  ${field('Marca', escapeHtml(postgraduate.brand))}
  ${field('Modalidade', escapeHtml(postgraduate.modality))}
  ${field('Quantidade de cursos', escapeHtml(String(count)))}
  ${field('Como encaminhar o interessado', escapeHtml(postgraduate.contactGuidance))}
  <p>${escapeHtml(postgraduate.summary)}</p>
  ${areas}
  <h3>Como responder perguntas de pós-graduação</h3>
  ${list(postgraduate.agentGuidance)}
</article>`;
}

export function writeAgentKnowledgePage(courses) {
  const root = process.cwd();
  const areas = JSON.parse(readFileSync(join(root, 'src', 'data', 'areas.json'), 'utf8'));
  const modalities = JSON.parse(readFileSync(join(root, 'src', 'data', 'modalities.json'), 'utf8'));
  const ingress = JSON.parse(readFileSync(join(root, 'src', 'data', 'ingress.json'), 'utf8'));
  const institution = JSON.parse(
    readFileSync(join(root, 'src', 'data', 'institution.json'), 'utf8'),
  );
  const financing = JSON.parse(
    readFileSync(join(root, 'src', 'data', 'financing.json'), 'utf8'),
  );
  const postgraduate = JSON.parse(
    readFileSync(join(root, 'src', 'data', 'postgraduate.json'), 'utf8'),
  );

  const areaName = (id) => areas.find((item) => item.id === id)?.name ?? id;
  const modalityName = (id) => modalities.find((item) => item.id === id)?.name ?? id;

  const index = courses
    .map((course) => {
      const title = courseTitle(course);
      return `<li><a href="#${escapeHtml(course.slug)}">${escapeHtml(title)}</a></li>`;
    })
    .join('\n');

  const articles = courses
    .map((course) => {
      const title = courseTitle(course);
      const offers = course.modalityIds
        .map((id) => offerBlock(course, id, modalityName(id)))
        .join('\n');
      const faq = (course.faq ?? [])
        .map(
          (item) =>
            `<div class="faq-item"><p><strong>${escapeHtml(item.question)}</strong></p><p>${escapeHtml(item.answer)}</p></div>`,
        )
        .join('\n');

      return `
<article id="${escapeHtml(course.slug)}" class="course">
  <h2>Título: ${escapeHtml(title)}</h2>
  ${field('Grau', escapeHtml(course.degree))}
  ${field('Área', escapeHtml(areaName(course.areaId)))}
  ${field('Duração', escapeHtml(course.duration))}
  ${field('Reconhecimento MEC', escapeHtml(course.mecRecognition || 'Cursos reconhecidos pelo MEC'))}
  ${course.emecProcess ? field('Portaria MEC', escapeHtml(course.emecProcess)) : ''}
  ${field('Formas de ingresso', escapeHtml(ingressList(course.ingress)))}
  ${field('Inscrição', `<a href="${ENROLLMENT_URL}">${ENROLLMENT_URL}</a>`)}
  ${enrollmentNotesForCourse(course, ingress.matricula)}
  ${offers}
  <h3>Resumo</h3>
  <p>${escapeHtml(course.summary)}</p>
  <h3>Sobre o curso</h3>
  ${paragraphs(course.description)}
  <h3>Destaques</h3>
  ${list(course.highlights)}
  <h3>Perfil do egresso</h3>
  ${paragraphs(course.graduateProfile)}
  <h3>Mercado de trabalho</h3>
  ${paragraphs(course.jobMarket)}
  <h3>Áreas de atuação</h3>
  ${list(course.careerPaths)}
  <h3>Perguntas frequentes</h3>
  ${faq}
</article>`;
    })
    .join('\n');

  const methods = (ingress.methods ?? [])
    .map(
      (method) =>
        `<div class="faq-item"><p><strong>${escapeHtml(method.name)}</strong></p><p>${escapeHtml(method.description)}</p></div>`,
    )
    .join('\n');

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <meta name="description" content="Fonte de conhecimento dos cursos de graduação da FEMAF para atendimento automatizado." />
  <title>Fonte de conhecimento — Cursos FEMAF</title>
  <style>
    body { font-family: Georgia, "Times New Roman", serif; max-width: 52rem; margin: 0 auto; padding: 2rem 1.25rem 4rem; color: #111; line-height: 1.55; }
    h1, h2, h3 { font-family: Arial, Helvetica, sans-serif; line-height: 1.25; }
    h1 { font-size: 1.75rem; }
    h2 { margin-top: 2.5rem; padding-top: 1.25rem; border-top: 1px solid #ccc; }
    .field { margin: 0.35rem 0 0.7rem; }
    .label { display: block; font-family: Arial, Helvetica, sans-serif; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: #444; }
    .value { display: block; }
    .offer { background: #f6f6f6; padding: 0.9rem 1rem; margin: 1rem 0; }
    nav ul { padding-left: 1.2rem; }
    .note { background: #fff8e5; padding: 0.9rem 1rem; }
  </style>
</head>
<body>
  <header>
    <h1>Fonte de conhecimento — Catálogo de cursos FEMAF</h1>
  ${renderPriceIndex(courses, modalityName)}
    <p>Faculdade de Educação Memorial Adelaide Franco (FEMAF), sede em Pedreiras–MA. Documento de referência para atendimento. Dados de mensalidade referentes a 2026.</p>
    <p class="note"><strong>Regra de turno (presencial):</strong> os cursos presenciais funcionam no turno <strong>noturno</strong>. ${escapeHtml(PRESENCIAL_SHIFT_NOTICE)}</p>
    <p><strong>Inscrição (todas as formas de ingresso):</strong> <a href="${ENROLLMENT_URL}">${ENROLLMENT_URL}</a></p>
    <p><strong>WhatsApp:</strong> ${WHATSAPP_DISPLAY}</p>
    <p>${escapeHtml(ingress.generalInfo)}</p>
  </header>

  <nav>
    <h2>Índice desta base</h2>
    <ul>
      <li><a href="#tabela-precos">Tabela de preços 2026</a></li>
      <li><a href="#sobre-a-femaf">Sobre a FEMAF (instituição)</a></li>
      <li><a href="#programas-ingresso">Programas de ingresso, FIES, PROUNI e convênios</a></li>
      <li><a href="#pos-graduacao">Pós-graduação EAD</a></li>
      <li><a href="#formas-de-ingresso">Formas de ingresso</a></li>
      <li><a href="#documentos-matricula">Documentos e matrícula</a></li>
      ${index}
    </ul>
  </nav>

  ${renderInstitutionSection(institution)}

  ${renderFinancingSection(financing)}

  ${renderPostgraduateSection(postgraduate)}

  <section id="formas-de-ingresso">
    <h2>Formas de ingresso</h2>
    ${methods}
  </section>

  ${renderEnrollmentSection(ingress)}

  ${articles}

  <footer>
    <p>Página de referência interna. Não faz parte da navegação pública do catálogo.</p>
  </footer>
</body>
</html>
`;

  const outPath = join(root, 'public', 'fonte-agente-cursos.html');
  writeFileSync(outPath, html, 'utf8');

  const pricePage = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Preços graduação FEMAF 2026 — base do agente</title>
</head>
<body>
  <h1>Preços da graduação FEMAF 2026</h1>
  <p>Use somente a linha cujo curso e modalidade coincidem com a pergunta. Não misture com pós-graduação.</p>
  ${renderPriceIndex(courses, modalityName)}
</body>
</html>
`;
  const pricePath = join(root, 'public', 'fonte-agente-precos.html');
  writeFileSync(pricePath, pricePage, 'utf8');
  return outPath;
}
