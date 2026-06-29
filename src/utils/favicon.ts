import faviconImage from './LOGO FEMAF 02.png';

export const faviconSrc = faviconImage;
export const faviconType = 'image/png';

export function setupFavicon(): void {
  let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");

  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  link.type = faviconType;
  link.href = faviconSrc;
}
