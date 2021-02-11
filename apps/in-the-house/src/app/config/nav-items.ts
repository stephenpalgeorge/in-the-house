import { ILink, NavbarProps } from '@in-the-house/ui';

export function defaultNav(pathname: string): NavbarProps {
  return {
    menu: [
      { path: '/', label: 'Home' },
      { path: '/demo', label: 'Demo' },
      { path: '/docs', label: 'Docs' }
    ],
    actions: [
      { path: `${pathname}?signup`, label: 'Sign up', color: 'primary' },
      { path: '/login', label: 'Login', color: 'secondary' },
    ]
  }
} 

export const authNav: NavbarProps = {
  menu: [
    { path: '/demo', label: 'Demo' },
    { path: '/docs', label: 'Docs' },
  ],
  actions: [
    { path: '/logout', label: 'Logout', color: 'secondary' }
  ]
}

export const menuNav: NavbarProps = {
  menu: [
    { path: '/', label: 'Home' },
    { path: '/demo', label: 'Demo' },
    { path: '/docs', label: 'Docs' }
  ]
}

export function dashboardSubNav(pathname: string): ILink[] {
  return [
    { path: `${pathname}/account`, label: 'Account' },
    { path: `${pathname}/usage`, label: 'Your API usage' },
    { path: `${pathname}/keys`, label: 'API & Project Keys' },
    { path: `${pathname}/billing`, label: 'Billing details' },
  ];
}
