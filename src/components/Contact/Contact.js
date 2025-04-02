'use client';
import Image from "next/image";
import { useState, useRef } from "react";
import Link from 'next/link';
import { useForm, ValidationError } from "@formspree/react";

import './Contact.css'


export default function Contact(){
    const [state, handleSubmit] = useForm("xqakqebl");
	if (state.succeeded) {
		return (
			<div id='contact' className="standard-container contact">
				<div className="contact-container">
					<p className="contact-success-message">Thanks for reaching out!</p>
				</div>
			</div>
		);
	}

    return(
        <div id='contact' className="standard-container contact" >
			<div className="contact-inner">
            <div className="contact-container">
			<h1>Contact Us</h1>
			<p>We'd love to hear from you! Please fill out the form below to get in touch.</p>
                <div className="contact-form">
        
                    <form onSubmit={handleSubmit}>
					<div className="email-section">
						<input
							id="email"
							type="email"
							name="email"
							placeholder="Email Address"
						/>
					</div>
					<div className="message-section">
						<textarea id="message" name="message" placeholder="Message" />
					</div>
					<ValidationError
						prefix="Message"
						field="message"
						errors={state.errors}
					/>
					<button type="submit" disabled={state.submitting}>
						Submit
					</button>
				</form>
                </div>
            </div>
			</div>
        </div>
    )
}