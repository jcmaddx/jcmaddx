import React from 'react';
import './loading.scss';

import j from "../images/j.png";
import c from "../images/c.png";

class Loading extends React.Component {

	componentDidMount() {
		this.checkReady();
	}

	checkReady = () => {
		setTimeout(() => {
			if(document.readyState === "complete"){
				this.loadingDone();
			} else {
				this.checkReady();
			}
		}, 3000)
	}

	loadingDone = () => {
		let loader = document.getElementById('loader');
		loader.classList.add('done');
		setTimeout(() => {
			loader.classList.add('hidden');
		}, 1200)
	}

	render() {
		return (
	    <div id="loader" className="loading">
	      <div className="loading-icon">
	      	<img className="letter letter-j" alt="J" src={j} />
	      	<img className="letter letter-c" alt="C" src={c} />
	      </div>
	      <h3 className="thinking">Thinking</h3>
	    </div>
	  );
	}
}

export default Loading;