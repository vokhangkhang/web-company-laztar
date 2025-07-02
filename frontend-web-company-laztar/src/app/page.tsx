import Header from "../component/Header";

export default function Home() {
  return (  
    <main>
      <Header />
      <div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'10%'}}>
        <p id="opening_statement" style={{fontSize:'300%', width:'30%', textAlign:'center'}}>
          Take Your Business To The Next Level</p>
        <div>
        <p id="company_function_description" style={{marginLeft:'30%', fontSize:'200%', width:'40%', marginTop:'1%', textAlign: 'center', opacity: 0.4}}>
          We turn ideas into disruptive digital solutions. Helping you connect effectively with customers and grow sustainably.</p>
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
      <div style={{width:'100vw'}}>
        <img
          src="https://res.cloudinary.com/dtipeaspf/image/upload/v1751367555/ca5fa41773042de2bc537af905f55fe1094d9dd1_wo2cr6.jpg"
          style={{ width: '32%', height: '30%', marginTop:'3%', marginRight:'1%'}}
          alt="logo"
        />
        <img
          src="https://res.cloudinary.com/dtipeaspf/image/upload/v1751367555/b01c9028c1d93d1cd4ac28d207b7fce9364f8fd7_xwglle.jpg"
          style={{ width: '34%', height: '40%', marginTop:'3%', marginRight:'1%'}}
          alt="logo"
        />
        <img
          src="https://res.cloudinary.com/dtipeaspf/image/upload/v1751367554/e888168bbbf0dd3ed598c1cc613173918a344cdb_s8y6ob.jpg"
          style={{ width: '32%', height: '30%', marginTop:'3%'}}
          alt="logo"
        />
      </div>
      <p style={{marginLeft:'5%', fontSize:'150%', width:'20%', marginTop:'5%', color:'#00a7c4'}}>
        Dịch vụ</p>
      <div style={{background:'#97ffff',lineHeight:'10%', marginTop:'1%'}}><p style={{fontSize:'10%'}}>|</p></div>     
      <p style={{marginLeft:'5%', fontSize:'200%', width:'30%', marginTop:'1%', color:'#000000'}}>
        Dịch Vụ Của Chúng Tôi</p>
      <p style={{marginLeft:'5%', fontSize:'150%', width:'50%', marginTop:'1%', color:'#4b5563'}}>
        Chúng tôi cung cấp các giải pháp kỹ thuật số toàn diện, được thiết kế riêng để phù hợp với mọi nhu cầu của doanh nghiệp bạn.</p>
      
      <div style={{ display: 'flex', gap: '4vw', width:'100vw', marginTop:'10%'}}>
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
      </div>
      
      <div style={{ display: 'flex', gap: '4vw', width:'100vw', marginTop:'10%'}}>
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
      </div>
      



      </div>
    </main>   
  );
}
