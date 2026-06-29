/**
 * Normaliza o telefone para o formato wa.me (apenas dígitos, com DDI 55).
 */
export function normalizeWhatsAppPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  if (digits.startsWith('55')) {
    return digits;
  }

  return `55${digits}`;
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const normalizedPhone = normalizeWhatsAppPhone(phone);
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}
