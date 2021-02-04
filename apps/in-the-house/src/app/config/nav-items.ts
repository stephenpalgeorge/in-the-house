import { NavbarProps } from '@in-the-house/ui';

export const defaultNav: NavbarProps = {
  menu: [
    { path: '/', label: 'Home' },
    { path: '/demo', label: 'Demo' },
    { path: '/docs', label: 'Docs' }
  ],
  actions: [
    { path: `${location.pathname}?signup`, label: 'Sign up', color: 'accent-bright' },
    { path: '/login', label: 'Login', color: 'accent-muted' },
  ]
}

export const menuNav: NavbarProps = {
  menu: [
    { path: '/', label: 'Home' },
    { path: '/demo', label: 'Demo' },
    { path: '/docs', label: 'Docs' }
  ]
}