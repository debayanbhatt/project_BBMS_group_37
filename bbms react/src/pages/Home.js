import { Link } from "react-router-dom";
import Top from "./Dashboard/inc/Top";
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
function Home(props) {
    const css = `
        #hero-section{
            //background:#1f1b9f;
            //background:#FF0000 ;
            background:#ffffff ;
            //color:#fff!important;
            color:#000000;
        }
        .marketing .col-lg-4 {
           // margin-bottom: 1.5rem;
            text-align: center;
          }
          .marketing h2 {
            font-weight: 400;
          }
          
          .marketing .col-lg-4 p {
            margin-right: .75rem;
            margin-left: .75rem;
          }

        #before-footer{
            background:#1f1b9f;
            color:#fff!important;
        }
          
    `;

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
    return (
        <div  className="d-flex flex-column h-100">
            <style>
                {css}
            </style>
            <div className="flex-shrink-0">
                <Top name="Home" />

               
  <div id="hero-section">
  <div className="text-secondary px-1 py-1 text-center" id="hero-section">
                    
                    <h1 className="display-5 fw-bold text-black">City Hospital</h1>
                    <h1 className="display-5 fw-bold text-black">Blood Bank Management System</h1>
                    </div>
               
  <div className="container col-xxl-8 px-4 py-5">
    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6">
      
      <div style={{ display: 'block', width: 600,  padding: 30 }}>
      
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="/assets/images/pic1.jpg"
            alt="Image One"
          />
         
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="/assets/images/pic2.jpg"
            alt="Image Two"
          />
         
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="/assets/images/pic4.jpg"
            alt="Image Three"
          />
         
        </Carousel.Item>
      </Carousel>
    </div>
      </div>
      <div className="col-lg-6">
        <h1 className="display-5 fw-bold lh-1 mb-3">About BBMS</h1>
        <p className="lead">The main aim of the Blood Bank Management System is to ease the process of blood donation and managing related operations.
        <ul>
<li>The system aims to demostrate the use of CRUD operation where the application starts with registering user.</li>
<li>Admin can add other users(Doctor,Admin),update the blood stock,add donor,approve blood request.</li>
<li>Doctor can check blood stock and request for blood according to that to the blood bank admin.</li>
<li>Contributor just have to fill a form and will be able to donate blood.</li>
</ul>
        </p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        {(() => {
                            if (getCookie("id") === ""){
                                return (
                                    <Link to="/login" type="button" className="btn btn-warning btn-lg px-4 me-md-2">Login/Register</Link>
                                )
                            } 
                            
                            return null
                            
                            
                        })()}
          <Link to="/contributors" type="button" className="btn btn-danger btn-lg px-4 me-md-2">Contribute</Link>
        </div>
      </div>
    </div>
  </div>
  </div>
                
            </div>
            <footer className="footer mt-auto py-3 bg-light">
                <div className="container text-center">
                    <span className="text-muted">Copyright &copy; Debayan & Sushant :  All rights reserved.</span>
                </div>
            </footer>
        </div>
    );
}

export default Home;
