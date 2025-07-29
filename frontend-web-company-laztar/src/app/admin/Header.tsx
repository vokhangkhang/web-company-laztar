"use client"
import {motion} from "framer-motion";
import { useState, useEffect } from "react";
const Header = () => {
  const [Login, setLogin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
        setLogin(true);
      }else{setLogin(false);}
  }, []);
  const logout = () => {
    sessionStorage.removeItem("token");
    setLogin(false);
  }
  return (
    <nav style={{position: 'absolute', width:'100vw', height:'10vh', background:'#ffffff', top: '0%', left: '0%'}}>
      <a href='/admin/'>
        <motion.div
        style={{width:'8vw', height:'13vh'}}
        animate={{ rotateY: 360}}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
        >
         <img
          src="https://res.cloudinary.com/dtipeaspf/image/upload/v1751354861/8a2d5fde0b6c26d9230e2e30e1ddf3252e633448_ijab0g.png"
          style={{ width: '10vw', height: '15vh', cursor: 'pointer', margin:'-2vh auto auto -2vw' }}
          alt="logo"
        /></motion.div>
      </a>
      <a href='/admin/contact'><button style={{cursor: 'pointer', background: '#171717', color:'#ffffff', borderRadius: '0.5em',
                                         position:'absolute', top: '1%', right:'5%', width:'10%', height:'30%'}}>
                  Contact</button>
      </a>
      {Login?(
        <a href='#'><button onClick={logout}
                                style={{cursor: 'pointer', background: '#171717', color:'#ffffff', borderRadius: '0.5em',
                                         position:'absolute', top: '1%', right:'0%', width:'5%', height:'30%'}}>
                  logout</button>
        </a>
      ):(
      <a href='/admin/login'><button style={{cursor: 'pointer', background: '#171717', color:'#ffffff', borderRadius: '0.5em',
                                         position:'absolute', top: '1%', right:'0%', width:'5%', height:'30%'}}>
                  login</button>
      </a>)
      }
      <div style={{width:'100vw',position:'absolute', top: '1vh', display:"flex", justifyContent: "center", alignItems: "center"}}>
        <a href='/admin/' style={{cursor: 'pointer', fontSize:'150%'}}>Home</a>
        <a href='/admin/about_us'style={{cursor: 'pointer', marginLeft: '5%', fontSize:'150%'}}>About us</a>
        <a href='/admin/services' style={{cursor: 'pointer', marginLeft: '3%', fontSize:'150%'}}>Services</a>
        <a href='/admin/projects' style={{cursor: 'pointer', marginLeft: '3%', fontSize:'150%'}}>Project</a>
        <a href='/admin/careers' style={{cursor: 'pointer', marginLeft: '3%', fontSize:'150%'}}>Careers</a>
        <a href='/admin/blog' style={{cursor: 'pointer', marginLeft: '3%', fontSize:'150%'}}>Blog</a>
      </div>
    </nav>
 );
};

export default Header;
