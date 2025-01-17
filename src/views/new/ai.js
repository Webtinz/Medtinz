import { useState } from "react";

// Composant EditableBlockList
const EditableBlockList = () => {


  return (
    <div className="container py-4" style={{width:'80%'}}>
      <div className="d-flex justify-content-between">
        <div>
          <p><strong>Name :</strong> Markiz Oceane Malwine</p>
          <p><strong>Gender :</strong> Female</p>
          <p><strong>Age :</strong> 24 years Old</p>
        </div>
        <div>
          <button className="btn btn-succ text-white px-4 py-2" style={{background:'#1A5D1A'}}>Recording <i class="bi bi-mic"></i></button>
        </div>
      </div>
      <div className="mb-4 mt-3 " style={{border:'1px dashed #0056B3', borderRadius:'10px'}}>    
        <p className="text-center py-3 fw-bold" style={{background:'#FF980017'}}>Hearing ...</p>
        <p className="mt-3 px-3">
            Good morning, Doctor. 
            <br/><br/>
            For the past three days, I’ve been feeling unwell, and it seems to be getting worse. It started with a mild headache and a general feeling of fatigue. I thought it was just stress or lack of sleep, but then I started experiencing a fever that comes and goes, along with chills that make me feel very cold, even under a blanket.
            In addition to the fever, I’ve been feeling a sharp pain in my lower back, especially on the right side. It gets worse when I move or try to lie down. I’ve also noticed a burning sensation when I urinate, and I feel the need to go to the bathroom much more often than usual. However, not much comes out when I try, and the process is very uncomfortable.<br/>
            I haven’t had much appetite, and I’ve been feeling nauseous at times, though I haven’t vomited. I’ve been drinking plenty of water to see if it helps, but the symptoms seem to persist. I’m worried it could be a serious infection or something affecting my kidneys. What do you think it could be? ...
        </p>
      </div>
      <div className="mb-4 mt-3 " style={{border:'1px dashed #0056B3', borderRadius:'10px'}}>    
        <p className="text-center py-3 fw-bold" style={{background:'#FF980017'}}>Hearing ...</p>
        <p className="mt-3 px-3">
            Good morning, Doctor. 
            <br/><br/>
            For the past three days, I’ve been feeling unwell, and it seems to be getting worse. It started with a mild headache and a general feeling of fatigue. I thought it was just stress or lack of sleep, but then I started experiencing a fever that comes and goes, along with chills that make me feel very cold, even under a blanket.
            In addition to the fever, I’ve been feeling a sharp pain in my lower back, especially on the right side. It gets worse when I move or try to lie down. I’ve also noticed a burning sensation when I urinate, and I feel the need to go to the bathroom much more often than usual. However, not much comes out when I try, and the process is very uncomfortable.<br/>
            I haven’t had much appetite, and I’ve been feeling nauseous at times, though I haven’t vomited. I’ve been drinking plenty of water to see if it helps, but the symptoms seem to persist. I’m worried it could be a serious infection or something affecting my kidneys. What do you think it could be? ...
        </p>
      </div>
    </div>
  );
};

export default EditableBlockList;
