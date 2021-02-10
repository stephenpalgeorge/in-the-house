import { NavbarProps } from '@in-the-house/ui';

export function defaultNav(pathname): NavbarProps {
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