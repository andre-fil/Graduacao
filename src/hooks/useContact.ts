import { useMemo } from 'react';
import { getContactConfig } from '../services';

export function useContact() {
  const contact = useMemo(() => getContactConfig(), []);
  return contact;
}

export { buildWhatsAppUrl, normalizeWhatsAppPhone } from '../utils/whatsapp';
