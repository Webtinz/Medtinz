import React, { useState } from "react";
import "../new/docteur.css";
import l from '../../assets/images/timer-pause.svg';
import l1 from '../../assets/images/woman.svg';
import l2 from '../../assets/images/book-square.svg';
import l3 from '../../assets/images/microphone-2.png';
import Block from '../new/block1';
import Block1 from '../new/block2';
import Block2 from '../new/block3';
import BlockD from '../new/block d';
import Add from './addquestion';
import Allergie from '../new/allergie';
import Analyses from '../new/analyses';
import History from '../new/history';
import Clinical from '../new/clinical';
import Diagnosis from '../new/diagnosis';
import Medical from '../new/medical';
import Medicament from '../new/medicament';
import Laboratory from '../new/laboratoire';
import Recommendation from '../new/recommandation';
import Follow from '../new/follow';
import Frame from '../../assets/images/Frame.svg';
import Frame1 from '../../assets/images/Frame1.png';
import Ai from '../new/ai';

const Docteur = () => {
  const [isSlidingPageOpen, setIsSlidingPageOpen] = useState(false); // État pour contrôler l'affichage de la page coulissante

  const toggleSlidingPage = () => {
    setIsSlidingPageOpen(!isSlidingPageOpen); // Change l'état d'ouverture/fermeture
  };
  return (
    <div className="container position-relative">
      
      <div className="row">
        <div className="col-lg-6 mx-auto mb-3">
          <div className="p-3 text-white" style={{background:'#28A745',borderRadius:'20px'}}>
            <div className="d-flex justify-content-between">
              <div><p className="mt-2">Appointment with</p></div>
              <div>
                <img src={l} alt="timer" className="w-75 img-fluid" />
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div><h3>Markiz Oceane Malwine,</h3></div>
              <div>
                <p className="mt-2" style={{fontSize:'13px'}}>00h : 00mn : 01s</p>
              </div>
            </div>
            <p style={{fontSize:'13px'}}>started !</p>
          </div>
        </div>
        <div className="col-lg-6 mx-auto mb-3">
          <div className="p-3 text-white" style={{background:'#FF9800',borderRadius:'20px'}}>
            <div className="d-flex justify-content-between">
              <div><p className="mt-2"> <strong>Gender :</strong> Female</p></div>
              <div>
                <img src={l1} alt="timer" className="w-75 img-fluid" />
              </div>
            </div>
            <div><p> <strong>Age :</strong>  24 years Old</p></div>
            <div><p>Starting time : 10h : 09mn : 20s</p></div>
          </div>
        </div>
      </div>
      <div className=" bg-white p-3">
        <div className="my-3">
          <button className="btn btn-primary">View medical history of patient <img src={l2} alt="timer" className="img-fluid" /></button>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column">
            <div> <strong>Patient consent to recording ?</strong></div>
            <div className="d-flex">
              <div>
                <input type="radio" name="consent" className="form-check-input" id="consent1" />
                <label for="consent1" className="form-check-label" >Yes</label>
              </div>
              <div className="ms-4">
                <input type="radio" name="consent" className="form-check-input" id="consent2" />
                <label for="consent1" className="form-check-label" >No</label>
              </div>
            </div>
          </div>
          <div>
            <button className="btn btn-outline-success fw-bold">Start recording  <img src={l3} alt="timer" className="img-fluid" /></button>
          </div>
        </div>
        <div className="mb-4 mt-3 p-3" style={{border:'1px dashed #0056B3', borderRadius:'10px'}}>
            
            <p className="p-2 text-center fw-bold" style={{background:'#FF980017'}}>Registered vital signs</p>
            <p className="my-2 ms-4">Body Temperature :   <span style={{color:'#EF3826'}}>35.7°C</span></p>
            <span className="d-block" style={{borderBottom:'1px solid #292D3230'}}></span>
            <p className="my-2 ms-4">Blood pressure :     <span style={{fontWeight:'600'}}>120/90 mmHg</span></p>
            <span className="d-block" style={{borderBottom:'1px solid #292D3230'}}></span>
            <p className="my-2 ms-4">Note :    <span style={{fontWeight:'600'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </span></p>
            <span className="d-block" style={{borderBottom:'1px solid #292D3230'}}></span>
        </div>
        <div><Block /></div>
        <div><Block1 /></div>
        <div className="mb-4 p-4 position-relative" style={{border:'1px solid #0056B3', borderRadius:'10px'}}>
            <input type="date" className="form-control" style={{border:'none'}}/>
            <div className="d-flex pos">
              <p>When did your symptoms start ?</p>
            </div>
        </div>
        <div><Block2 /></div>
        <div><Add /></div>
        <div className="mt-4">
          <div><Allergie /></div>
        </div>
        <div className="mt-4">
          <div><History /></div>
        </div>
        <div className="mt-4">
          <div><Analyses /></div>
        </div>
        <div className="mt-4">
          <div><Clinical /></div>
        </div>
        <div className="mt-4">
          <div><Diagnosis /></div>
        </div>
        <div className="mb-4 mt-3 p-3" style={{border:'1px dashed #0056B3', borderRadius:'10px'}}>
            
            <p className="p-2 text-center fw-bold" style={{background:'#0056B317'}}>AI’s generated Diagnosis</p>
            <p>
                <strong style={{textDecoration:'underline'}}>Suspected Urinary Tract Infection (UTI)</strong> <br/>
                Based on the severity and duration of the symptoms, it is likely acute bronchitis rather than chronic bronchitis. However, if symptoms persist beyond 3 weeks, further investigations may be necessary to rule out other conditions like asthma or chronic obstructive pulmonary disease (COPD). <br/> <br/>

                After conducting a thorough clinical examination and reviewing the patient's medical history, it has been determined that the patient is experiencing symptoms consistent with bronchitis. 
            </p>
        </div>
        <div className="mt-4">
          <div><BlockD /></div>
        </div>
        <div className="mt-4">
          <div><Medical /></div>
        </div>
        <div className="mb-4 mt-3 p-3" style={{border:'1px dashed #FF9800', borderRadius:'10px'}}>
            
            <ol>
              <li>Medications:
                <ul>
                  <li>Aspirin: 200 mg daily</li>
                  <li>Ibuprofen: 200 mg daily</li>
                  <li>Dextromethorphan: 5 mg daily</li>
                </ul>
              </li>
              <li>Laboratory Tests:
                <ul>
                  <li>Urinalysis: To confirm the presence of infection and determine the severity.</li>
                  <li>Urine Culture and Sensitivity Test: To identify the specific bacteria causing the infection and determine the appropriate antibiotic.</li>
                  <li>Complete Blood Count (CBC): To check for signs of systemic infection or inflammation.</li>
                </ul>
              </li>
              <li>Non-Pharmacological Recommendations:
                <ul>
                  <li>Increase fluid intake to at least 2 liters per day to help flush out the urinary tract.</li>
                  <li>Avoid caffeine, alcohol, and spicy foods, which can irritate the bladder.</li>
                </ul>
              </li>
              <li>Follow-Up:
                <ul>
                  <li>Schedule a follow-up appointment in 10 days to review test results and assess treatment progress.</li>
                </ul>
              </li>
            </ol>
        </div>
        <div className="mt-4">
          <div><Medicament /></div>
        </div>
        <div className="mt-2">
          <div><Laboratory /></div>
        </div>
        <div className="mt-4">
          <div className="d-flex flex-column ms-5">
              <div> <strong>Patient consent to recording ?</strong></div>
              <div className="d-flex">
                <div>
                  <input type="radio" name="consent" className="form-check-input" id="consent1" />
                  <label for="consent1" className="form-check-label" >Yes</label>
                </div>
                <div className="ms-4">
                  <input type="radio" name="consent" className="form-check-input" id="consent2" />
                  <label for="consent1" className="form-check-label" >No</label>
                </div>
              </div>
          </div>
          <div className="mt-4">
            <Block/>
          </div>
          <div className="mt-4">
            <Block/>
          </div>
        </div>
        <div className="mt-2">
          <div><Recommendation /></div>
        </div>
        <div className="mt-2">
          <div><Follow /></div>
        </div>
        <div className="mt-2">
          <div className="d-flex ms-5">
            <div>
              <button className="btn btn-prim text-white" style={{background:'#EF3826'}}>End consultation <i class="bi bi-box-arrow-left ms-2"></i></button>
            </div>
            <div className="ms-5">
              <button className="btn btn-prim text-white" style={{background:'#0056B3'}}>Generer l’ordonnance<i class="bi bi-box-arrow-up ms-2"></i></button>
            </div>
          </div>
        </div>

      </div>
      <div className="app-container">
        {/* Contenu principal */}
        <div className="bos">
          <a href="#" onClick={toggleSlidingPage}>
            <img src={Frame} className="img-fluid" />
          </a>
        </div>

        {/* Page coulissante */}
        <div className={`sliding-page ${isSlidingPageOpen ? "open" : ""}`}>
          <button className="close-btn btn btn-white" onClick={toggleSlidingPage}>
            <img src={Frame1} className="img-fluid" />
          </button>
          <div className="content">
            <div><Ai /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docteur;
