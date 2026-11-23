export const ENROLLMENT_URL = 'https://vestibular2.femaf.com.br';

export const EDITAL_URL =
  'https://cf21e3d6-a8c4-4296-adb5-2998bd8e5bfa.usrfiles.com/ugd/cf21e3_76cc4bc7a4c04cd48c450778f590e179.pdf';

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
