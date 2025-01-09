import React from 'react';
import Partner from './partner';
import Pricing from './pricing';
import Review from "./review";
import Faq from "./faq";
import Footer from "./landingfooter";
import './landing.css';
import teme from '../../assets/images/teme.png';
import personne from '../../assets/images/Personne.png';
import icon1 from '../../assets/images/icon1.png';
import icone2 from '../../assets/images/icone2.png';
import icone3 from '../../assets/images/icone3.png';
import uno from '../../assets/images/uno.png';
import tablet from '../../assets/images/tablet.png';
import credit from '../../assets/images/credit.png';
import table from '../../assets/images/table.png';
import doctor from '../../assets/images/doctor.png'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function App() {
  return (
    <div className='crainte'>
      <div className='time'>
        <div>
        <nav className="navbar navbar-expand-lg ">
            <div className="container mt-2">
            <a className="navbar-brand" href="#">MED<span className='tchou'>TINZ</span></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="#">Features</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Contact us</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">About Us</a>
                </li>
                
                </ul>
                <form className="d-flex" role="search">
                <button className='mexi'>Sign Up</button>
                </form>
            </div>
            </div>
        </nav>
        </div>
        <div className='sista container-fluide mt-5'>
                <div className='junior col-lg-12'>
                    <div className='cloris'>
                    <h1 className='doty mb-3'>Transform your hospital  <br></br>Operations with AI driven <span className='tout'> Efficiency</span></h1>
                    <p className='coton mb-3'>We provide many features that you can use cheaply and easily. Try it now <br></br> and get an interesting promo</p>
                    <button className='neux'>Watch a demo</button>
                    </div>
                    
                    <div className='tchip'>
                        <img src={personne} alt="personne" className="shut " />
                    </div>
                </div>        
        </div>
      </div>
      <Partner />
      <div className='mt-4 mb-4'>
      <div className='jule container mt-5 mb-5'>
            <div className='row mt-4 mb-3'>
                <div className='col-lg-3'>
                    <span className='stil'>Our features</span>
                    <h4 className='sod'>Easy, Simple,
                    Affordable</h4>
                </div>
                <div className='col-lg-7'>
                    <p className='mt-5 story'>Our platform helps your business in managing <br></br>expenses. These are some of the reasons why you <br></br> should use our platform in managing business finances.</p>
                </div>
                <div className='col-lg-2'>
                <img src={teme} alt="teme" className=" chill" />
                </div>
            </div>
            <div className='row mb-3'>
                    <div className='col-lg-4'>
                    <img src={uno} alt="uno" className="chille mb-2" />
                    <h5 className='kan mb-2'>Patient Management</h5>
                    <p className='ketou'>No need to pay manually, we provide <br></br> automatic invoice payment service! Set a <br></br> payment schedule and you're done, it's that <br></br> easy!</p>
                    </div> 
                    <div className='col-lg-4'>
                    <img src={table} alt="table" className="chille mb-2" />
                    <h5 className='kan mb-2'>Reporting & Analytics</h5>
                    <p className='ketou'>Still writing manual expenses? Our platform <br></br> breaks down every expense you log down to <br></br>the millisecond!</p>
                    </div>  
                    <div className='col-lg-4'>
                    <img src={credit} alt="credit" className="chille mb-2" />
                    <h5 className='kan mb-2'>Insurance Integration</h5>
                    <p className='ketou'>Have more than 1 bank account or credit/debit <br></br> card? Our platform is already integrated with <br></br> many banks around the world, for easier <br></br> payments!</p>
                    </div>   
            </div>
            <div className='row mt-3'>
                    <div className='col-lg-4'>
                    <img src={uno} alt="uno" className="chille mb-2" />
                    <h5 className='kan mb-2'>Laboratory Records</h5>
                    <p className='ketou'>No need to pay manually, we provide <br></br> automatic invoice payment service! Set a <br></br> payment schedule and you're done, it's that <br></br> easy!</p>
                    </div> 
                    <div className='col-lg-4'>
                    <img src={table} alt="table" className="chille mb-2" />
                    <h5 className='kan mb-2'>Appointment Scheduling</h5>
                    <p className='ketou'>Still writing manual expenses? Our platform <br></br> breaks down every expense you log down to <br></br>the millisecond!</p>
                    </div>  
                    <div className='col-lg-4'>
                    <img src={credit} alt="credit" className="chille mb-2" />
                    <h5 className='kan mb-2'>Telemedicine</h5>
                    <p className='ketou'>Have more than 1 bank account or credit/debit <br></br> card? Our platform is already integrated with <br></br> many banks around the world, for easier <br></br> payments!</p>
                    </div>   
            </div>
      </div>
      </div>
        <div className='colombe '>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                        <img src={tablet} alt="tablet" className=" chou mt-5" />
                        </div>
                        <div className='col-lg-6'>
                            <div className='hui'>
                            <span className='yasmine'>Why choose us </span>
                            <p className='reda'>Take your hospital to the next <br></br> level</p>
                            <p className='kady mb-2'>In just few easy step, you are all set to manage your <br></br>  business finances. Manage all expenses with Spend.In all in one place.</p>
                            <div className='sonic mb-2 mt-3'>
                                <img src={icon1} alt="icon1" className=" aurelie " />
                                <div className='trio'>
                                    <h6 className='redan' >Streamlined Operations</h6>
                                    <span className='lara'>Automatic payments help you to arrange payments on a <br></br> certain date without doing it manually again.</span>
                                </div>
                                
                            </div>
                            <div className='sonic mb-2 mt-3'>
                                <img src={icone2} alt="icone2" className=" aurelie " />
                                <div className='trio'>
                                    <h6 className='redan' >Streamlined Operations</h6>
                                    <span className='lara'>Automatic payments help you to arrange payments on a <br></br> certain date without doing it manually again.</span>
                                </div>
                                
                            </div>
                            <div className='sonic mb-5 mt-3'>
                                <img src={icone3} alt="icone3" className=" aurelie " />
                                <div className='trio'>
                                    <h6 className='redan' >Streamlined Operations</h6>
                                    <span className='lara'>Automatic payments help you to arrange payments on a <br></br> certain date without doing it manually again.</span>
                                </div>
                                
                            </div>
                        </div>
                            
                        </div>
                    </div>
                </div>
        </div>
        <Pricing />
       <div className='amour mt-5'>
            <Review />
       </div>
       <div className="hero-section mb-5">
            <div className="container d-flex align-items-center justify-content-between mb-3 colline">
                        <div className="row chrome ">
                            <div className='col-lg-6 '>
                            <img src={doctor} alt="doctor" className=" man" />
                            </div>
                            <div className='col-lg-6'>
                                <div className='mt-5'>
                                <p className='afro'>Affordable Plans for Hospitals of All Sizes</p>
                                <div className='chron'>
                                    <button className='boya me-2'>View Detailed Pricing</button>
                                    <a href='#' className='chro'>Request a Quote</a>
                                </div>
                                </div>
                                
                            </div>
                        </div>
            </div>
        </div>
        <div>
            <Faq />
        </div>
        <div>
            <Footer />
        </div>

    </div>
  );
}

export default App;
