export const sidenavRoutes = [
  {
    routeLink: 'business-management',
    icon: 'fa-regular fa-address-book',
    label: 'business.businessManagement',
    role: ['admin'],
  },
  {
    routeLink: 'dashboard',
    icon: 'fa-solid fa-house-user',
    label: 'dashboard',
    role: ['business'],
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
    label: 'order.orders',
    role: ['business', 'waiter'],
  },
  { routeLink: 'qrcode', icon: 'fa-solid fa-qrcode', label: 'qrcode.qrcode', role: ['business'] },
];
