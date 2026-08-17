import capaAdm from './capa-adm.png';
import capaContabilidade from './capa-contabilidade.png';
import capaDireito from './capa-direito.png';
import capaEdFisica from './capa-ed-fisica.png';
import capaEngenharia from './capa-engenharia.png';
import capaFarmacia from './capa-farmacia.png';
import capaPedagogia from './capa-pedagogia.png';
import capaPsicologia from './capa-psicologia.png';
import capaServicoSocial from './capa-serviço-social.png';
import defaultCover from './Título curso.png';

const courseCovers: Record<string, string> = {
  administracao: capaAdm,
  agronegocio: defaultCover,
  'ciencias-contabeis': capaContabilidade,
  direito: capaDireito,
  'educacao-fisica': capaEdFisica,
  'engenharia-civil': capaEngenharia,
  farmacia: capaFarmacia,
  pedagogia: capaPedagogia,
  psicologia: capaPsicologia,
  'servico-social': capaServicoSocial,
};

export const defaultCourseCover = defaultCover;

export function getCourseCoverUrl(slug: string): string {
  return courseCovers[slug] ?? defaultCourseCover;
}
