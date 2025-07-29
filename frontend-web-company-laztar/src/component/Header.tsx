"use client"
import {motion} from "framer-motion";
const Header = () => {
  return (
    <nav style={{width:'100vw', height:'10vh', background:'#ffffff', position:'absolute', top: '0%', left: '0%'}}>
      <motion.div
      style={{width:'8vw', height:'13vh'}}
      animate={{ rotateY: 360}}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
      >
      <a href='/'>
         <img
          src="https://res.cloudinary.com/dtipeaspf/image/upload/v1751354861/8a2d5fde0b6c26d9230e2e30e1ddf3252e633448_ijab0g.png"
          style={{ width: '10vw', height: '15vh', cursor: 'pointer', margin:'-2vh auto auto -2vw' }}
          alt="logo"
          />
        </a></motion.div>
      <a href='/contact'><button style={{cursor: 'pointer', background: '#171717', color:'#ffffff', borderRadius: '0.5em',
                                         position:'absolute', top: '1%', right:'5%', width:'10%', height:'30%'}}>
                  Contact</button>
      </a>
      <samp style={{position: 'absolute', top: '1%', left: '25%', width:'50%'}}>
        <a href='/' style={{cursor: 'pointer', fontSize:'150%'}}>Home</a>
        <a href='/about_us'style={{cursor: 'pointer', marginLeft: '5%', fontSize:'150%'}}>About_us</a>
        <a href='/services' style={{cursor: 'pointer', marginLeft: '5%', fontSize:'150%'}}>Services</a>
        <a href='/projects' style={{cursor: 'pointer', marginLeft: '5%', fontSize:'150%'}}>Project</a>
        <a href='/careers' style={{cursor: 'pointer', marginLeft: '5%', fontSize:'150%'}}>Careers</a>
        <a href='/blog' style={{cursor: 'pointer', marginLeft: '5%', fontSize:'150%'}}>Blog</a>
      </samp>
    </nav>
 );
};

export default Header;
