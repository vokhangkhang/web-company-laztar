const Header = () => {
  return (
    <nav>
      <a href='/admin/'>
         <img
          src="https://res.cloudinary.com/dtipeaspf/image/upload/v1751354861/8a2d5fde0b6c26d9230e2e30e1ddf3252e633448_ijab0g.png"
          style={{ width: '15%', height: '25%', cursor: 'pointer',position:'absolute', top: '-5%', left: '-3%' }}
          alt="logo"
          />
        </a>
      <a href='/admin/contact'><button style={{cursor: 'pointer', background: '#171717', color:'#ffffff', borderRadius: '0.5em',
                                         position:'absolute', top: '1%', right:'10%', width:'10%', height:'3%'}}>
                  Contact</button>
      </a>
      <samp style={{position: 'absolute', top: '1%', left: '25%', width:'50%'}}>
        <a href='/admin/' style={{cursor: 'pointer', fontSize:'150%'}}>Home</a>
        <a href='/admin/about_us'style={{cursor: 'pointer', marginLeft: '3%', fontSize:'150%'}}>About us</a>
        <a href='/admin/services' style={{cursor: 'pointer', marginLeft: '3%', fontSize:'150%'}}>Services</a>
        <a href='/admin/projects' style={{cursor: 'pointer', marginLeft: '3%', fontSize:'150%'}}>Project</a>
        <a href='/admin/careers' style={{cursor: 'pointer', marginLeft: '3%', fontSize:'150%'}}>Careers</a>
        <a href='/admin/blog' style={{cursor: 'pointer', marginLeft: '3%', fontSize:'150%'}}>Blog</a>
      </samp>
    </nav>
 );
};

export default Header;
