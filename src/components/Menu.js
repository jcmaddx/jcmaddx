import React from 'react';
import './menu.scss';
import data from '../data/menu';

import { scrollToContainer } from '../utils/helpers';

import logo from '../images/jc.png';

function Menu() {
  return (
    <div id="menu" className="menu">
      <img onClick={() => {scrollToContainer("intro")}} alt="logo" src={logo} />
      <ul>
      	{
      		Object.keys(data).map((item, key) => {
      			return <li key={key} onClick={() => {scrollToContainer(item)}}>{data[item]}</li>
      		})
      	}
      </ul>
    </div>
  );
}

export default Menu;