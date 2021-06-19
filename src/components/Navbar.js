import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext }  from '../Context'

import './styles/Navbar.css';
import logo from '../images/logo.svg';

const Navbar = () =>  {
    const value = useContext(ApplicationContext);
    const { parametros } = value;
    
    return (
      <div className="Navbar">
        <div className="container-fluid">
          <Link className="Navbar__brand" to="/">
            <img className="Navbar__brand-logo" src={logo} alt="Logo" />
            <span className="font-weight-light">{ parametros['CLIENTE_GIRO'] } </span>
            <span className="font-weight-bold">{ parametros['CLIENTE_NOMBRE'] }</span>
          </Link>
        </div>
      </div>
    )
}

export default Navbar;
