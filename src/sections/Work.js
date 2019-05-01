import React from 'react';
import { GlitchSlideshow } from '../utils/slides';

import l2 from '../images/l2.jpg';
import aion from '../images/aion.jpg';
import portfolio from '../images/portfolio.jpg';

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
		return (
	    <section className="work">
	      <h1>Work</h1>
	      <div className="overlay"></div>
	      <button className="slide-nav__button prev" onClick={this.prevSlide} />
	      <button className="slide-nav__button next" onClick={this.nextSlide} />
	      <div className="slides slides--contained ">
					<div className="slide slide--current">
						<div className="slide-overlay"></div>
						<div className="slide__img glitch" style={{backgroundImage: `url(${aion})`}}></div>
						<div className="slide__text">
							<h2 className="slide__title">Aion</h2>
							<p className="slide__description">The Aion Shop</p>
						</div>
					</div>
					<div className="slide">
						<div className="slide-overlay"></div>
						<div className="slide__img glitch" style={{backgroundImage: `url(${l2})`}}></div>
						<div className="slide__text">
							<h2 className="slide__title">Lineage 2</h2>
							<p className="slide__description">The Lineage 2 Shop</p>
						</div>
					</div>
					<div className="slide">
						<div className="slide-overlay"></div>
						<div className="slide__img glitch" style={{backgroundImage: `url(${portfolio})`}}></div>
						<div className="slide__text">
							<h2 className="slide__title">Portfolio</h2>
							<p className="slide__description">Blizz Stuff</p>
						</div>
					</div>
				</div>
	    </section>
	  );
	}
}

export default Work;