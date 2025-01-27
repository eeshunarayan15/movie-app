import React from 'react'
import SideNav from '../Navbar/SideNav';
import TopNav from '../Navbar/TopNav';

const Home = () => {
    document.title = "SCSDB | Homepage";
  return (
    <>

              <SideNav/>
   
          <div className="w-[80%] h-full  "
          
          >
              <TopNav/>
          </div>
    </>
  );
}
 
export default Home