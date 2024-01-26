export const sidenavRoutes = [
  {
    routeLink: '/dashboard',
    icon: 'fa-solid fa-house-user',
    label: 'dashboard',
  },
  {
    routeLink: 'business-management',
    icon: 'fa-regular fa-address-book',
    label: 'business.businessManagement',
    role: ['admin'],
  },
  {
    routeLink: 'identity',
    icon: 'fa-regular fa-address-book',
    label: 'identity.identityManagement',
    role: ['business'],
  },
  // { routeLink: 'qrcode', icon: 'fa-regular fa-qrcode', label: 'qrcode', role: ['business'] },
  // {
  //   routeLink: 'menu',
  //   icon: 'fa-regular fa-bars',
  //   label: 'Menu',
  //   role: ['business'],
  // },
];
