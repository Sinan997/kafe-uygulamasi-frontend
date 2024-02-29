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
  {
    routeLink: 'menu',
    icon: 'fa-solid fa-book-open',
    label: 'menu.menu',
    role: ['business'],
  },
  {
    routeLink: 'table',
    icon: 'fa-solid fa-table',
    label: 'table.tables',
    role: ['business', 'waiter'],
  },
  {
    routeLink: 'orders',
    icon: 'fa-solid fa-utensils',
    label: 'orders.orders',
    role: ['business'],
  },
  { routeLink: 'qrcode', icon: 'fa-solid fa-qrcode', label: 'qrcode.qrcode', role: ['business'] },
];
