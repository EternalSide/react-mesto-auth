import React from 'react'
import logo from "../images/logo.svg";
const Header = () => {
  return (
    <header className="header">
    <img src={logo} alt="Лого сайта" className="header__logo" />
  </header>
  )
}

export default Header