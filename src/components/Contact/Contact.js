'use client';
import '@/./app/contact/contact.css';
import Image from "next/image";
import { useState, useRef } from "react";
import Link from 'next/link';
import emailjs from '@emailjs/browser';

export default function Contact(){
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [nameErr, setNameErr] = useState(false);
    const [phoneErr, setPhoneErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [success, setSuccess] = useState(false);
    const form = useRef();
    const buttonRef = useRef(null);

    function validateFields(data){
        var validate = true;
        Object.keys(data).forEach(function(field, index){
            if(field === 'email'){
                var email = data[field];
                email.toLowerCase();
                if(!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || !email){
                    validate = false;
                    setEmailErr(true);
                }
            }
            if(field === 'name'){
                if(!data[field]){
                    validate = false;
                    setNameErr(true);
                }
            }
            if(field === 'phone'){
                if(!data[field]){
                    validate = false;
                    setPhoneErr(true);
                }
            }
        })
        return validate;
    }

    function sendEmail(e){
        e.preventDefault();
        setNameErr(false);
        setEmailErr(false);
        setPhoneErr(false);

        var data = {
            'name' : name,
            'phone' : phone,
            'email' : email,
            'message' : message
        }

        console.log(data);
        if(validateFields(data)){
            buttonRef.current.classList.add('loading');
            emailjs.sendForm('service_5p5csde', 'template_n8m0li7', e.target, 'WVJRNpYjZCliyL50b')
            .then((result) => {
                buttonRef.current.classList.remove('loading');
                buttonRef.current.classList.add('success');
                setSuccess(true);
                console.log(result.text);
                e.target.reset();
            }, (error) => {
                buttonRef.current.classList.remove('loading');
                buttonRef.current.classList.add('error');
                console.log(error.text);
                e.target.reset();
            });
        } else{
            buttonRef.current.classList.remove('loading');
            buttonRef.current.classList.add('error');
            e.target.reset();
        }
        
    }
    return(
        <div className="standard-container contact" >
             <form className="form" ref={form} onSubmit={sendEmail}>
                <div className="grid-item large form-inputs-container">
                    <label className="name-input">
                        <span className="req">Name</span>
                        <input className="smaller" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                        <span className={nameErr ? 'req-text active' : 'req-text'}>*Required Field</span>
                    </label>
                    <label className="phone-input">
                        <span className="req">Phone</span>
                        <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        <span className={phoneErr ? 'req-text active' : 'req-text'}>*Required Field</span>
                    </label>
                        <label className="email-input">
                        <span className="req">Email</span>
                        <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <span className={emailErr ? 'req-text active' : 'req-text'}>*Required Field / Invalid Input</span>
                    </label>
                    <label className="message-input">
                        <span>Message</span>
                        <textarea type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </label>
                </div>
                <div className="grid-item small description-container">
                    <p className='header'>{props.header}</p>
                    <span>{documentToReactComponents(props.description,options)}  </span>
               </div>
                <div className="grid-item small submit-container">
                    <button className="submit-butt" type="submit" value="submit" ref={buttonRef}><span className='submit-text'>{success ? 'Success!' : 'Submit'}</span><span className="loading-animation"></span><div className="checkmark"></div><Image src={Envelope} width={35} alt="oops"/></button>
                </div>
                    
                </form>
        </div>
    )
}