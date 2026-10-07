export const site = {
  name: 'Gilmar Résidence',
  company: 'Société Gilmar',
  legalName: 'Société Gilbert & Marie (SGM) SARL',
  phoneDisplay: '+236 72 13 79 79',
  phoneHref: 'tel:+23672137979',
  whatsapp: '23672137979',
  email: 'gilbertmariegilmar@gmail.com',
  facebook: 'https://www.facebook.com/EsaieDoungoupou',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Paroisse+Sainte+Anne+Kassa%C3%AF+Bangui',
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
