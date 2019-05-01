import React from 'react';
import './contact.scss';

function Contact() {
  return (
    <section className="contact">
      <h1>Contact</h1>
      <div className="social">
      	<a className="icon resume" alt="resume" target="_blank" />
      	<a className="icon github" alt="github" target="_blank" />
      	<a className="icon linkedin" alt="linkedin" target="_blank" />
      </div>
    </section>
  );
}

export default Contact;