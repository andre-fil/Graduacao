import capaAdm from './capa-adm.png';
import capaContabilidade from './capa-contabilidade.png';
import capaDireito from './capa-direito.png';
import capaPedagogia from './capa-pedagogia.png';
import capaServicoSocial from './capa-serviço-social.png';
import defaultCover from './Título curso.png';

const courseCovers: Record<string, string> = {
  administracao: capaAdm,
  agronegocio: defaultCover,
  'ciencias-contabeis': capaContabilidade,
  direito: capaDireito,
  pedagogia: capaPedagogia,
  'servico-social': capaServicoSocial,
};

export const defaultCourseCover = defaultCover;

export function getCourseCoverUrl(slug: string): string {
  return courseCovers[slug] ?? defaultCourseCover;
}
