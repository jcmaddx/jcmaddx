import React from 'react';
import './menu.scss';
import data from '../data/menu';

import logo from '../images/jc.png';

function Menu() {
  return (
    <div id="menu" className="menu">
      <img src={logo} />
      <ul>
      	{
      		Object.keys(data).map((item, key) => {
      			return <li>{data[item]}</li>
      		})
      	}
      </ul>
    </div>
  );
}

export default Menu;