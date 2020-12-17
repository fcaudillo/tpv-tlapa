import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles/TPV.css';
import platziconfLogoImage from '../images/platziconf-logo.svg';
import astronautsImage from '../images/astronauts.svg';

const TPV = () => (

    <div>
      <p> componente de tpv Datos</p>
      <Link className="btn btn-primary" to="/">
                Regresar a codigo barras mod
              </Link>
    </div>
);



export default TPV;