/* tslint:disable:max-line-length */
import { TreoNavigationItem } from '@treo/components/navigation';

export const defaultNavigation: TreoNavigationItem[] = [
  {
    id: 'admin.dashboard',
    title: 'Dashboard',
    type: 'basic',
    link: '/dashboard',
  },
  {
    id: 'management',
    title: 'Application',
    subtitle: 'Application management',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'admin.users',
        title: 'Users',
        type: 'basic',
        link: '/users',
      },
      {
        id: 'admin.orders',
        title: 'Orders',
        type: 'basic',
        link: '/orders',
      },
      {
        id: 'admin.partners',
        title: 'Partners',
        type: 'basic',
        link: '/partners',
      },
    ],
  },
  //   {
  //     id: 'admin.users',
  //     title: 'Users',
  //     type: 'basic',
  //     link: '/admin/users',
  //   },
  //   {
  //     id: 'admin.orders',
  //     title: 'Orders',
  //     type: 'basic',
  //     link: '/admin/orders',
  //   },
];
export const compactNavigation: TreoNavigationItem[] = [
  {
    id: 'starter',
    title: 'Starter',
    type: 'aside',
    icon: 'apps',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
];
export const futuristicNavigation: TreoNavigationItem[] = [
  {
    id: 'starter.example',
    title: 'Example component',
    type: 'basic',
    icon: 'heroicons:chart-pie',
    link: '/example',
  },
  {
    id: 'starter.dummy.1',
    title: 'Dummy menu item #1',
    icon: 'heroicons:calendar',
    type: 'basic',
  },
  {
    id: 'starter.dummy.2',
    title: 'Dummy menu item #1',
    icon: 'heroicons:user-group',
    type: 'basic',
  },
];
export const horizontalNavigation: TreoNavigationItem[] = [
  {
    id: 'starter',
    title: 'Starter',
    type: 'group',
    icon: 'apps',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
];
