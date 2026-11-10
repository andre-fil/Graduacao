export const ENROLLMENT_URL = 'https://vestibular2.femaf.com.br';

export const EDITAL_URL =
  'https://www.femaf.com.br/_files/ugd/cf21e3_73155cc337c24b0fb998e5e938ae2338.pdf';

export const enrollmentLinkProps = {
  href: ENROLLMENT_URL,
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;

export const editalLinkProps = {
  href: EDITAL_URL,
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;
