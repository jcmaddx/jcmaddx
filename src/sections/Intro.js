import React from 'react';
import './intro.scss';

import data from '../data/intro';

class Intro extends React.Component {

	render() {
		return (
	    <section className="intro ambient-canvas">
	    	<div className="glitch-bg">
    			<div className="glitch-img"></div>
    			<div className="glitch-img"></div>
    			<div className="glitch-img"></div>
    			<div className="glitch-img"></div>
    			<div className="glitch-img"></div>
    		</div>
	    	<div className="intro-content">
	    		<h1>{data.name}<span>{data.title}</span></h1>
	    	</div>
	    	<span className="down"></span>
	    </section>
	  );
	}
}

export default Intro;