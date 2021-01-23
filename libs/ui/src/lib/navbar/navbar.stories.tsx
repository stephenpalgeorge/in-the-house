import React from 'react';
import { Navbar, NavbarProps } from './navbar';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  component: Navbar,
  title: 'Navbar'
};

export const primary = () => {
  
  
  const props:NavbarProps = {
    menu: [
      { path: '/', label: 'Home' },
      { path: '/Docs', label: 'Docs'},
    ]
  };
  

  return <Router><Navbar menu = {props.menu} /></Router>;
};