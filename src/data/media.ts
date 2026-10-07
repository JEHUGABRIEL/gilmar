// Toutes les photos de la résidence. Pour en ajouter : déposer le fichier dans
// public/images/ puis le référencer ici.

const img = (name: string) => `/images/${name}.jpg`;

export type GalleryCategory = 'rooms' | 'living' | 'restaurant' | 'outside';

export const media = {
  logo: '/logo.jpg',
  hero: [img('salon-3'), img('restaurant-1'), img('chambre-6'), img('facade-2')],
  about: [img('salon-4'), img('chambre-5'), img('salle-a-manger-1')],
  aboutOffset: img('facade-1'),
  apartments: {
    e4: [img('chambre-2'), img('salon-1'), img('salle-a-manger-2'), img('cuisine-1'), img('salon-2'), img('chambre-1')],
    suite: [img('salon-3'), img('chambre-5'), img('salon-4')],
    confort: [img('chambre-6')],
    ambiance: [img('chambre-10'), img('chambre-8'), img('chambre-9'), img('chambre-4')],
  } as Record<string, string[]>,
  restaurant: [img('restaurant-1'), img('restaurant-2'), img('terrasse-2'), img('restaurant-4'), img('terrasse-3')],
  vehicles: [img('vehicules-1'), img('vehicules-2'), img('parking-2')],
  gym: img('exterieur-2'),
  contact: img('facade-1'),
};

export const gallery: { src: string; category: GalleryCategory }[] = [
  ...['chambre-2', 'chambre-6', 'chambre-10', 'chambre-5', 'chambre-1', 'chambre-8', 'chambre-9', 'chambre-4'].map(
    (n) => ({ src: img(n), category: 'rooms' as const })
  ),
  ...['salon-3', 'salon-4', 'salon-1', 'salon-2', 'salle-a-manger-1', 'salle-a-manger-2', 'cuisine-1'].map(
    (n) => ({ src: img(n), category: 'living' as const })
  ),
  ...['restaurant-1', 'restaurant-2', 'restaurant-3', 'restaurant-4', 'terrasse-1', 'terrasse-2', 'terrasse-3'].map(
    (n) => ({ src: img(n), category: 'restaurant' as const })
  ),
  ...['facade-2', 'facade-1', 'exterieur-1', 'exterieur-2', 'exterieur-3', 'exterieur-4', 'parking-1', 'parking-2', 'vehicules-1', 'vehicules-2'].map(
    (n) => ({ src: img(n), category: 'outside' as const })
  ),
];
