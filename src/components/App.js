import React from 'react';
import '../global.scss';

//import sections
import Loading from "./Loading";
import Intro from "../sections/Intro";
import Skills from "../sections/Skills";
import Work from "../sections/Work";
import Contact from "../sections/Contact";
import Menu from './Menu';

function App() {
  return (
    <div className="app">
    	<Loading />
    	<Menu />
      <Intro />
      <Skills />
      <Work />
      <Contact />
    </div>
  );
}

export default App;
