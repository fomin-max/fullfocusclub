export const LINK_ID = {
  about: 'about',
  esportsClubs: 'esports-clubs',
  faq: 'faq',
  contacts: 'contacts',
  franchise: 'franchise',
} as const;

export const LINKS = [
  {
    id: LINK_ID.about,
    name: 'О нас',
  },
  {
    id: LINK_ID.esportsClubs,
    name: 'Клубы',
  },
  {
    id: LINK_ID.faq,
    name: 'Faq',
  },
  // {
  //   id: 'reviews',
  // },
  {
    id: LINK_ID.contacts,
    name: 'Контакты',
  },
  {
    id: LINK_ID.franchise,
    name: 'Франшиза',
  },
] as const;
