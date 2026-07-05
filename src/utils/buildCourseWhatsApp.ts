import { buildWhatsAppUrl } from '../hooks/useContact';

export function buildCourseWhatsAppUrl(phone: string, courseName: string): string {
  const message = `Olá! Estou na página do curso de ${courseName} e gostaria de tirar algumas dúvidas.`;
  return buildWhatsAppUrl(phone, message);
}
