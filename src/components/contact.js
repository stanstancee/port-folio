import React, { useState, useEffect} from "react";
import axios from "axios";
import Success from "./success";

import {
  FaMapMarkerAlt as Location,
  FaPhone as Phone,
  FaEnvelopeOpen as Mail,
  FaUserAlt as Name,
  FaPenSquare as Message
} from "react-icons/fa";

export default function Contact() {
const [contact, setContact] = useState({
name:"Your Name",
email:"your@mail.com",
phone:"234",
message:"message"

});
const [submitted, setSubmit] = useState(false);
const [counter, setCounter] = useState(20);
const [loading, setLoading] = useState(false);

useEffect(() => {
  
  const interval = setInterval(() => {
    setCounter(counter => counter - 1);
  }, 1000);

  return () => {
    clearInterval(interval);
    setLoading(false);
  };
}, []);


   const handleChange = (event)=>{
    const {name,value }= event.target
    setContact((previousValue)=>{
     return   {
          ...previousValue,
          [name]:value
        }
      
    })
   }
   
   const handleSubmit = (event)=>{
    setLoading(true);
    event.preventDefault();
   
    let {name,email, phone, message} =contact;
        const userContact = {
          name:name,
          email:email,
          phone:phone,
          message:message
        }
          axios.post("https://intense-brushlands-67616.herokuapp.com/contact", userContact )
          .then(res => {
            console.log(res);
            console.log(res.data);
            setLoading(false);
            setSubmit(true)
            setCounter(20)
            setContact({
              name:"Your Name",
              email:"your@mail.com",
               phone:"234",
              message:"message"

            })
           
          });
   }
  return (
    <div className="row contact" style={{backgroundColor:"hsl(0, 0%, 97%)",color:"hsl(255, 11%, 22%)"}}>
    
      <h1>Get In Touch With Us.</h1>
      <address className='col-8'>
        <table>
          <thead>
        <th><h3 className="para">Address </h3></th>
          </thead>
          
          <tbody>
            <tr>
              <td>
                <Location className="para" />
              </td>
              <td>
                8, Adewale Adegun Street, Karaole Estate, College Road. Ogba
                Lagos
              </td>
            </tr>
            <tr>
              <td>
                <Phone className="para" />
              </td>
              <td>2348149181923</td>
            </tr>
            <tr>
              <td>
                <Mail  className="para"/>
              </td>
              <td>stanstancee@gmail.com</td>
            </tr>
          </tbody>
        </table>
        <div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.0457982824582!2d3.328393114449821!3d6.641235223626713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b914fff2c63fd%3A0xcfb813da136b6291!2sCollege%20Rd%2C%20Lagos!5e0!3m2!1sen!2sng!4v1604334658423!5m2!1sen!2sng"  height="300" frameborder="0" style={{border:"0",width:"400"  }} aria-hidden="false" tabindex="0" title="my location"></iframe>
        </div>
      </address>
      <div className="col-6">
{  submitted && counter>1 ?<Success counter={counter} />:
    <form onSubmit={handleSubmit}>
   <h3 className="para">Get In Touch</h3>
   <label for="name" required><span><Name className="para"/> </span> Name </label>
   <input type='text' onChange={handleChange} name="name" value={contact.name} /><br />
   <label for="email" required><span><Mail className="para" /> </span> Email </label>
   <input type='email' onChange={handleChange}name="email" value={contact.email} /><br />
   <label for="phone"><span><Phone className="para" /> </span> Phone </label>
   <input type='tel' onChange={handleChange} name="phone" value={contact.phone} />   <br />
 <div className="row" >

     <label  className="col-10" for="message"> <span><Message className="para"/></span>Message</label>
 <div className="col-11">  <textarea cols="60" rows="5" onChange={handleChange} name="message" value={contact.message} ></textarea>
  </div>
  <button className="btn" type="submit">{loading?"Loading...":"Submit"}</button>
  </div> 


  

    </form>
}
      </div>
      
    </div> 
  );
}
