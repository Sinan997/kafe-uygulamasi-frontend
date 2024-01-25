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
  { routeLink: 'dashboard', icon: 'fa-regular fa-home', label: 'Dashboard', role: ['business'] },
  { routeLink: 'qrcode', icon: 'fa-regular fa-qrcode', label: 'logout', role: ['business'] },
  {
    routeLink: 'menu',
    icon: 'fa-regular fa-bars',
    label: 'Menu',
    role: ['business'],
  },
];
