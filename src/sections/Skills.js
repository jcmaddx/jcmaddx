import React from 'react';
import './skills.scss';

import { ballpool } from '../utils/balls';

var interval;

class Skills extends React.Component {

	componentDidMount() {
		window.addEventListener("resize", this.handleResize);
		document.body.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
		document.body.removeEventListener("scroll", this.handleScroll);
	}

	handleResize() {
		let canvas = document.querySelector('#balls canvas');
		if(canvas && canvas !== null){
			canvas.parentNode.removeChild(canvas);
		} else {
			clearTimeout(interval);
			interval = setTimeout(() => {
				ballpool();
			},500)
		}
	}

	handleScroll(e) {
		let box = document.getElementById('skills');
		let canvas = document.querySelector('#balls canvas');
		let boxOffset = box.getBoundingClientRect().top;
		let halfScreen = window.innerHeight / 2;
		if(boxOffset <= halfScreen && canvas === null){
			ballpool();
			document.body.removeEventListener("scroll", this.handleScroll);
		}
	}

	render() {
		return (
	    <section id="skills" className="skills">
	      <h1>Skills</h1>
	      <div className="skill-intro">Something about these skills bouncing around.</div>
	      <div id="balls" />
	    </section>
	  );
	}
}

export default Skills;