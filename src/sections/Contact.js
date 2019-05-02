import React from 'react';
import './contact.scss';
import axios from "axios";
import classnames from "classnames";

import data from '../data/contact';

class Contact extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			"name": "",
			"email": "",
			"message": "",
			"valid": false
		}
	}

	handleFocus = (e) => {
		let parent = e.target.parentNode;
		parent.classList.add("focused");
	}

	handleBlur = (e) => {
		let target = e.target;
		let parent = target.parentNode;
		let value = target.value.trim();

		// if it is empty
		if(value === "") {
			parent.classList.remove('focused');
		} else {
			if(target.id === "email") {
				this.validateEmail(value);
			} else {
				this.setState({
					[target.id]: value
				})
			}
		}
	}

	validateEmail = (email) => {
		let reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(reg.test(email)) {
    	this.setState({
				"email": email,
				"valid": true
			})
    } else {
    	console.log('nope');
    }
	}

	handleSubmit = () => {
		let formReady = (this.state.name !== "" && this.state.email !== "" && this.state.message !== "" && this.state.valid);
		if(!formReady){
			return false;
		}
		
		let formData = new FormData();
		formData.append("name", this.state.name);
		formData.append("email", this.state.email);
		formData.append("message", this.state.message);

		let form = document.getElementById('contact-form');
		let thinking = document.getElementById('thinking');
		let thanks = document.getElementById('thanks');
		form.classList.add('hidden');
		thinking.classList.add('show');
		axios({
	    method: 'post',
	    url: data.endpoint,
	    data: formData,
	    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
    }).then(function (response) {
        //handle success
        console.log("Success", response);
        thinking.classList.remove('show')
        thanks.classList.add('show');
    }).catch(function (response) {
        //handle error
        console.log("Error", response);
    });
	}


	render() {
		let now = new Date();
		let formReady = (this.state.name !== "" && this.state.email !== "" && this.state.message !== "" && this.state.valid);
		let submitClass = classnames({
			"btn-slash": true,
			"submit": true,
			"disabled": !formReady
		})
		return (
	    <section id="contact" className="contact">
	      <h1>Contact</h1>
	      <div id="contact-form" className="contact-form">
	      	<form autoComplete="off" id="gform" method="POST">
		      	<div className="input-wrap name-wrap"><span className="holder">Name</span><input type="text" name="name" id="name" autoComplete="new-password" onFocus={this.handleFocus} onBlur={this.handleBlur} /></div>
		      	<div className="input-wrap message-wrap"><span className="holder">Message</span><textarea type="text" name="message" id="message" onFocus={this.handleFocus} onBlur={this.handleBlur} /></div>
		      	<div className="input-wrap email-wrap"><span className="holder">Email</span><input type="email" name="email" id="email" autoComplete="off" onFocus={this.handleFocus} onBlur={this.handleBlur} /></div>
	      	</form>
	      	<button className={submitClass} id="submit" onClick={this.handleSubmit}>Submit</button>
	      </div>
	      <div id="thinking" className="thinking">
	      	<h3>Thinking</h3>
	      </div>
	      <div id="thanks" className="thanks">
	      	<h2>Thank You!</h2>
	      	<p>I'll be in touch</p>
	      </div>
	      <div className="social">
	      	<a className="icon resume" alt="resume" href={data.resume} target="_blank" rel="noopener noreferrer"><span>Resume</span></a>
	      	<a className="icon github" alt="github" href={data.github} target="_blank" rel="noopener noreferrer"><span>Github</span></a>
	      	<a className="icon linkedin" alt="linkedin" href={data.linkedin} target="_blank" rel="noopener noreferrer"><span>LinkedIn</span></a>
	      	<span>John C. Maddox © {now.getFullYear()}</span>
	      </div>
	    </section>
	  );
	}
}

export default Contact;