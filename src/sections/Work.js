import React from 'react';
import { GlitchSlideshow } from '../utils/slides';
import classnames from 'classnames';

import l2 from '../images/l2.jpg';
import aion from '../images/aion.jpg';
import portfolio from '../images/portfolio.jpg';

import data from '../data/work';

import './work.scss';

class Work extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			slideshow: null
		}
	}

	componentDidMount() {
		this.setState({
			slideshow: new GlitchSlideshow(document.querySelector('.slides'))
		})
	}

	nextSlide = () => {
		this.state.slideshow.navigate("next");
	}

	prevSlide = () => {
		this.state.slideshow.navigate("prev");
	}

	render() {
		let images = {"l2": l2, "aion": aion, "portfolio": portfolio};
		return (
	    <section id="work" className="work">
	      <h1>Work</h1>
	      <div className="overlay"></div>
	      <button className="slide-nav__button prev" onClick={this.prevSlide} />
	      <button className="slide-nav__button next" onClick={this.nextSlide} />
	      <div className="slides slides--contained ">
	      	{
	      		data.data.map((item, key) => {
	      			let slideClass = classnames({
	      				"slide": true,
	      				"slide--current": key === 0
	      			});
	      			return (
	      				<div key={key} className={slideClass}>
									<div className="slide-overlay"></div>
									<div className="slide__img glitch" style={{backgroundImage: `url(${images[item.image]})`}}></div>
									<div className="slide__text">
										<h2 className="slide__title">{item.title}</h2>
										<p className="slide__description">{item.description}</p>
										<ul className="slide__used">
											{
												item.used.map((item, key) => {
													return <li key={key}>{item}</li>
												})
											}
										</ul>
										<a className="btn-slash" rel="noopener noreferrer" target="_blank" href={item.url}>View</a>
									</div>
								</div>
	      			)
	      		})
	      	}
				</div>
	    </section>
	  );
	}
}

export default Work;