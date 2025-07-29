"use client"
import Header from "../component/Header";
import {motion} from "framer-motion";
import { useInView } from 'framer-motion';
import { useRef } from "react";


export default function Home() {
  const images = [
  "https://res.cloudinary.com/dtipeaspf/image/upload/v1751367555/ca5fa41773042de2bc537af905f55fe1094d9dd1_wo2cr6.jpg",
  "https://res.cloudinary.com/dtipeaspf/image/upload/v1751367555/b01c9028c1d93d1cd4ac28d207b7fce9364f8fd7_xwglle.jpg",
  "https://res.cloudinary.com/dtipeaspf/image/upload/v1751367554/e888168bbbf0dd3ed598c1cc613173918a344cdb_s8y6ob.jpg"
];
  const Box = ({ delay, children }:any) => (
  <motion.div
    style={{
    width: 'fit-content',
    position: 'relative',
    display: 'inline-block',
    }}

    animate={{ x: ['-100vw', '100vw'] }}
    transition={{
      duration: 40,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear',
      delay,
    }}>
    {children}</motion.div>
  )
  const ref = useRef(null);
  const inView = useInView(ref);
  const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5
    }
    }
    };

    const item = {
      hidden: { y: 20, opacity: 0 },
      show: { y: 0, opacity: 1 }
    };
    
  return (  
    <main style={{width:'100vw'}}>
      <Header />
      <motion.ul variants={container} initial="hidden" animate="show" style={{ listStyle: "none", padding: 0, margin: 0 }}>
      <div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'10%'}}>
        
          <motion.li variants={item}>
          <motion.div
          style={{width:'40vw'}}
          ref={ref}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: 360}}
          transition={{ duration: 0.5}}
          >
        <p id="opening_statement" style={{fontSize:'6vh', width:'40vw', textAlign:'center'}}>
          Take Your Business To The Next Level</p></motion.div></motion.li>       
        <div>
          <motion.li variants={item}>
            <motion.div
          style={{width:'40vw'}}
          ref={ref}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate:360}}
          transition={{ duration: 1}}
          >
        <p id="company_function_description" style={{ fontSize:'4vh', width:'40vw', marginTop:'1%', textAlign: 'center', opacity: 0.4}}>
          We turn ideas into disruptive digital solutions. Helping you connect effectively with customers and grow sustainably.</p>
        </motion.div></motion.li>
        </div>
        <div style={{ display: 'flex', gap: '12px'}}>
        <a href='/contact'>
        <button style={{background: '#171717', color:'#ffffff', cursor: 'pointer', fontSize:'150%', borderRadius: '0.5em'}}>Contact for advice</button>
        </a>
        <a href='/projects'>
        <button style={{background: '#ffffff', color:'#171717', cursor: 'pointer', fontSize:'150%', borderRadius: '0.5em'}}>See projects</button>
        </a>
        </div>
      </div>
      <div style={{background:'#97ffff',lineHeight:'10%'}}><p style={{fontSize:'10%'}}>|</p></div>
  
      <div style={{width:'100vw', display: 'flex', gap: '2vw',overflow: 'hidden'}}>
       <Box delay={0.2}> 
        <img
          src="https://res.cloudinary.com/dtipeaspf/image/upload/v1751367555/ca5fa41773042de2bc537af905f55fe1094d9dd1_wo2cr6.jpg"
          style={{ width: '32vw', height: '37vh', marginTop:'1vh'}}
          alt="logo"
        /></Box>
        <Box delay={0.1}>
        <img
          src="https://res.cloudinary.com/dtipeaspf/image/upload/v1751367555/b01c9028c1d93d1cd4ac28d207b7fce9364f8fd7_xwglle.jpg"
          style={{ width: '32vw', height: '37vh', marginTop:'1vh'}}
          alt="logo"
        /></Box>
        <Box delay={0}>
        <img
          src="https://res.cloudinary.com/dtipeaspf/image/upload/v1751367554/e888168bbbf0dd3ed598c1cc613173918a344cdb_s8y6ob.jpg"
          style={{ width: '32vw', height: '37vh', marginTop:'1vh'}}
          alt="logo"
        /></Box>
      </div>
          <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100vw",
      }}
    >
      <motion.div
        style={{
          display: "inline-flex",
          gap: "2vw",
        }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* ✨ Lặp 2 lần để tạo cảm giác khép kín */}
        {[...images, ...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            style={{
              width: "32vw",
              height: "37vh",
              objectFit: "cover",
              marginTop: "1vh",
            }}
            alt="carousel"
          />
        ))}
      </motion.div>
    </div>

      <p style={{marginLeft:'3%', fontSize:'150%', width:'20%', marginTop:'5%', color:'#00a7c4'}}>
        Dịch vụ</p>
      <div style={{background:'#97ffff',lineHeight:'10%', marginTop:'1%'}}><p style={{fontSize:'10%'}}>|</p></div>     
      <p style={{marginLeft:'3%', fontSize:'200%', width:'30%', marginTop:'1%', color:'#000000'}}>
        Dịch Vụ Của Chúng Tôi</p>
      <p style={{marginLeft:'3%', fontSize:'150%', width:'50%', marginTop:'1%', color:'#4b5563'}}>
        Chúng tôi cung cấp các giải pháp kỹ thuật số toàn diện, được thiết kế riêng để phù hợp với mọi nhu cầu của doanh nghiệp bạn.</p>
          
      <div style={{ display: 'flex', gap: '2vw', width:'100vw', marginTop:'6%'}}>
          <motion.li variants={item}>
          <motion.div
          style={{width:'30vw', background:'#ffffff'}}
          ref={ref}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1} : {}}
          transition={{ duration: 0.5}}
          >
        <div style={{width:'30vw', border: '0.1vw solid rgba(31, 29, 29, 0.3)', borderRadius:'5%'}}>
          
          <p style={{color:'#000000', width:'100%', fontSize:'200%', marginTop:'10%'}}>
            Thiết Kế & Phát Triển Website
          </p>
          <p style={{color:'#4b5563', width:'100%', fontSize:'150%', marginTop:'3%'}}>
            Chúng tôi xây dựng những website chuyên nghiệp, chuẩn responsive, không chỉ gây ấn tượng về mặt thị giác mà còn t
          </p>
          <a href='/services' style={{cursor: 'pointer', color:'#00a7c4', width:'20%', fontSize:'100%', marginTop:'10%'}}>
          Xem thêm
          </a>
        </div>
          </motion.div></motion.li>
        <motion.li variants={item}>
          <motion.div
          style={{width:'30vw', background:'#ffffff'}}
          ref={ref}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1} : {}}
          transition={{ duration: 0.5}}
          >
        <div style={{width:'30vw', border: '0.1vw solid rgba(31, 29, 29, 0.3)', borderRadius:'5%'}}>
          
          <p style={{color:'#000000', width:'100%', fontSize:'200%', marginTop:'10%'}}>
            Thiết Kế & Phát Triển Website
          </p>
          <p style={{color:'#4b5563', width:'100%', fontSize:'150%', marginTop:'3%'}}>
            Chúng tôi xây dựng những website chuyên nghiệp, chuẩn responsive, không chỉ gây ấn tượng về mặt thị giác mà còn t
          </p>
          <a href='/services' style={{cursor: 'pointer', color:'#00a7c4', width:'20%', fontSize:'100%', marginTop:'10%'}}>
          Xem thêm
          </a>
        </div>
          </motion.div></motion.li>

        <motion.li variants={item}>
          <motion.div
          style={{width:'30vw', background:'#ffffff'}}
          ref={ref}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1} : {}}
          transition={{ duration: 0.5}}
          >
        <div style={{width:'30vw', border: '0.1vw solid rgba(31, 29, 29, 0.3)', borderRadius:'5%'}}>
          
          <p style={{color:'#000000', width:'100%', fontSize:'200%', marginTop:'10%'}}>
            Thiết Kế & Phát Triển Website
          </p>
          <p style={{color:'#4b5563', width:'100%', fontSize:'150%', marginTop:'3%'}}>
            Chúng tôi xây dựng những website chuyên nghiệp, chuẩn responsive, không chỉ gây ấn tượng về mặt thị giác mà còn t
          </p>
          <a href='/services' style={{cursor: 'pointer', color:'#00a7c4', width:'20%', fontSize:'100%', marginTop:'10%'}}>
          Xem thêm
          </a>
        </div>
          </motion.div></motion.li>
      </div>
      
      <div style={{ display: 'flex', gap: '2vw', width:'100vw', marginTop:'5%'}}>
        <motion.li variants={item}>
          <motion.div
          style={{width:'30vw', background:'#ffffff'}}
          ref={ref}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1} : {}}
          transition={{ duration: 0.5}}
          >
        <div style={{width:'30vw', border: '0.1vw solid rgba(31, 29, 29, 0.3)', borderRadius:'5%'}}>
          
          <p style={{color:'#000000', width:'100%', fontSize:'200%', marginTop:'10%'}}>
            Thiết Kế & Phát Triển Website
          </p>
          <p style={{color:'#4b5563', width:'100%', fontSize:'150%', marginTop:'3%'}}>
            Chúng tôi xây dựng những website chuyên nghiệp, chuẩn responsive, không chỉ gây ấn tượng về mặt thị giác mà còn t
          </p>
          <a href='/services' style={{cursor: 'pointer', color:'#00a7c4', width:'20%', fontSize:'100%', marginTop:'10%'}}>
          Xem thêm
          </a>
        </div>
          </motion.div></motion.li>

        <motion.li variants={item}>
          <motion.div
          style={{width:'30vw', background:'#ffffff'}}
          ref={ref}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1} : {}}
          transition={{ duration: 0.5}}
          >
        <div style={{width:'30vw', border: '0.1vw solid rgba(31, 29, 29, 0.3)', borderRadius:'5%'}}>
          
          <p style={{color:'#000000', width:'100%', fontSize:'200%', marginTop:'10%'}}>
            Thiết Kế & Phát Triển Website
          </p>
          <p style={{color:'#4b5563', width:'100%', fontSize:'150%', marginTop:'3%'}}>
            Chúng tôi xây dựng những website chuyên nghiệp, chuẩn responsive, không chỉ gây ấn tượng về mặt thị giác mà còn t
          </p>
          <a href='/services' style={{cursor: 'pointer', color:'#00a7c4', width:'20%', fontSize:'100%', marginTop:'10%'}}>
          Xem thêm
          </a>
        </div>
          </motion.div></motion.li>

          <motion.li variants={item}>
          <motion.div
          style={{width:'30vw', background:'#ffffff'}}
          ref={ref}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1} : {}}
          transition={{ duration: 0.5}}
          >
        <div style={{width:'30vw', border: '0.1vw solid rgba(31, 29, 29, 0.3)', borderRadius:'5%'}}>
          
          <p style={{color:'#000000', width:'100%', fontSize:'200%', marginTop:'10%'}}>
            Thiết Kế & Phát Triển Website
          </p>
          <p style={{color:'#4b5563', width:'100%', fontSize:'150%', marginTop:'3%'}}>
            Chúng tôi xây dựng những website chuyên nghiệp, chuẩn responsive, không chỉ gây ấn tượng về mặt thị giác mà còn t
          </p>
          <a href='/services' style={{cursor: 'pointer', color:'#00a7c4', width:'20%', fontSize:'100%', marginTop:'10%'}}>
          Xem thêm
          </a>
        </div>
          </motion.div></motion.li> 
      </div>
      



      </div>
      </motion.ul>
    </main>   
  );
}
