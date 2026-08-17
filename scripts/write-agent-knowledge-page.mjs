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

export function writeAgentKnowledgePage(courses) {
  const root = process.cwd();
  const areas = JSON.parse(readFileSync(join(root, 'src', 'data', 'areas.json'), 'utf8'));
  const modalities = JSON.parse(readFileSync(join(root, 'src', 'data', 'modalities.json'), 'utf8'));
  const ingress = JSON.parse(readFileSync(join(root, 'src', 'data', 'ingress.json'), 'utf8'));

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
    <p>Faculdade de Educação Memorial Adelaide Franco. Documento de referência para atendimento. Dados de mensalidade referentes a 2026.</p>
    <p class="note"><strong>Regra de turno (presencial):</strong> os cursos presenciais funcionam no turno <strong>noturno</strong>. ${escapeHtml(PRESENCIAL_SHIFT_NOTICE)}</p>
    <p><strong>Inscrição (todas as formas de ingresso):</strong> <a href="${ENROLLMENT_URL}">${ENROLLMENT_URL}</a></p>
    <p><strong>WhatsApp:</strong> ${WHATSAPP_DISPLAY}</p>
    <p>${escapeHtml(ingress.generalInfo)}</p>
  </header>

  <section>
    <h2>Formas de ingresso</h2>
    ${methods}
  </section>

  <nav>
    <h2>Índice de cursos</h2>
    <ul>
      ${index}
    </ul>
  </nav>

  ${articles}

  <footer>
    <p>Página de referência interna. Não faz parte da navegação pública do catálogo.</p>
  </footer>
</body>
</html>
`;

  const outPath = join(root, 'public', 'fonte-agente-cursos.html');
  writeFileSync(outPath, html, 'utf8');
  return outPath;
}
