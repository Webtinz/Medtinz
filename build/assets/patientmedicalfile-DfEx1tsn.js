import{r as t,q as g,j as s}from"./index-DMyFwfPw.js";import N from"./addappointment-B0tSGJF7.js";import{a as u}from"./index-DDA6ZN6t.js";import{b as c,c as C}from"./index-BmJ0gaIa.js";import{a as v,b}from"./ClientFooter-BSyiqpfD.js";import{a as y}from"./axios-upsvKRUO.js";import{C as A}from"./CHeader-CJuvaqrj.js";import{a as D,c as o}from"./index.esm-C08VXAn-.js";import{C as w}from"./CHeaderNav-hEJLwZ-k.js";import{C as m}from"./CRow-Cq4HXHde.js";import{C as n}from"./CCol-OKn3_WcL.js";import{C as P}from"./CCard-BxMFv-c9.js";import{C as S}from"./CCardBody-W_evx8a4.js";import"./CModalTitle-n6JZNKqm.js";import"./CConditionalPortal-BL_iV0wb.js";import"./iconBase-DDq4M1RR.js";const $=()=>{const[r,l]=t.useState(!1),[k,x]=t.useState([]);t.useState(!1);const{patientId:d}=g(),[e,h]=t.useState(null),[p,j]=t.useState(!0);if(t.useEffect(()=>{(async()=>{try{const a=await y.get(`http://localhost:5000/clinic/getpatients/${d}`);h(a.data)}catch(a){console.error("Erreur lors de la récupération des données du patient:",a)}finally{j(!1)}})()},[d]),p)return s.jsx("p",{children:"Chargement..."});const f=i=>{x(a=>[...a,i])};return s.jsxs("div",{className:"dashboard-header",children:[s.jsx(A,{position:"sticky",style:{backgroundColor:"#DFEAF5"},children:s.jsxs(D,{fluid:!0,className:"d-flex align-items-center",children:[s.jsxs("div",{className:"pagetittle",children:[s.jsx("h4",{children:s.jsx("b",{children:"Patient Management"})}),s.jsxs("p",{children:["Home ",s.jsx(c,{className:"mx-2",style:{fontSize:"12px"}}),"  Dashboard ",s.jsx(c,{style:{fontSize:"12px"},className:"mx-2"}),"  ",s.jsx("span",{style:{color:"#191B1C"},children:"Patient Management"})]})]}),s.jsx(w,{children:s.jsx(v,{children:s.jsxs(b,{href:"#",className:"d-flex align-items-center",children:[s.jsx("img",{src:"src\\assets\\images\\adminprofil.png",className:"cardicon",alt:"Consultation Icon",width:"50",height:"50"}),s.jsxs("div",{children:[s.jsx("span",{className:"ms-2",children:"Semia BOKO"}),s.jsx("p",{className:"ms-2",children:"Admin"})]})]})})})]})}),s.jsx("div",{className:"Patientlist filemedical mt-2",children:s.jsx("div",{className:"tabsection",children:s.jsx(m,{children:s.jsx(n,{xs:12,children:s.jsx(P,{className:"card mb-4 p-4",children:s.jsxs(S,{children:[s.jsxs("div",{className:"topbtn",children:[s.jsx("div",{className:"retourbtn",children:s.jsxs(o,{className:"retourbtn",onClick:()=>navigate(-1)||navigate("/"),children:[s.jsx(u,{})," Retour"]})}),s.jsx("div",{className:"registeruserbtn ms-auto",children:s.jsxs(o,{onClick:()=>l(!r),className:"registernewbtn ms-auto d-flex align-items-center",active:!0,tabIndex:-1,children:[s.jsx(C,{className:"mx-2"})," New Appointment"]})})]}),s.jsx(N,{visible:r,onClose:()=>l(!1),onAppointmentAdded:f}),s.jsxs("div",{className:"patientdetails",children:[s.jsxs("div",{className:"d-flex align-items-center cardheader mb-5",children:[s.jsx("span",{className:"me-3",style:{width:"70px",height:"5px",background:"green"}}),s.jsx("h4",{children:"Medical history"})]}),e?s.jsxs(m,{className:"my-3 patientinfo mb-5",children:[s.jsx(n,{xs:12,md:2,children:s.jsxs("div",{className:"flexcoldisposition",children:[s.jsx("p",{children:"Name :"}),s.jsx("p",{children:s.jsx("b",{children:e.name})})]})}),s.jsx(n,{xs:12,md:2,children:s.jsxs("div",{className:"flexcoldisposition",children:[s.jsx("p",{children:"Email : "}),s.jsx("p",{children:s.jsx("b",{children:e.email})})]})}),s.jsx(n,{xs:12,md:2,children:s.jsxs("div",{className:"flexcoldisposition",children:[s.jsx("p",{children:"Date of birth: "}),s.jsx("p",{children:s.jsx("b",{children:e.age.split("T")[0]})})]})}),s.jsx(n,{xs:12,md:2,children:s.jsxs("div",{className:"flexcoldisposition",children:[s.jsx("p",{children:"Address : "}),s.jsx("p",{children:s.jsx("b",{children:e.address})})]})}),s.jsx(n,{xs:12,md:2,children:s.jsxs("div",{className:"flexcoldisposition",children:[s.jsx("p",{children:"Gender :"}),s.jsx("p",{children:s.jsx("b",{children:e.gender})})]})})]}):s.jsx("p",{children:"No data available"})]}),s.jsxs("div",{className:"mt-5",children:[s.jsxs("div",{className:"d-flex align-items-center cardheader",children:[s.jsx("span",{className:"me-3",style:{width:"70px",height:"5px",background:"green"}}),s.jsx("h4",{children:"Medical history"})]}),e!=null&&e.medicalHistory&&e.medicalHistory.length>0?s.jsx("div",{className:"medical-history-list",children:e.medicalHistory.map((i,a)=>s.jsxs("div",{className:"history-item",children:[s.jsxs("p",{children:[s.jsx("strong",{children:"Condition:"})," ",i.condition||"N/A"]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Description:"})," ",i.description||"No description"]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Date Diagnosed:"})," ",i.dateDiagnosed?new Date(i.dateDiagnosed).toLocaleDateString():"Unknown"]})]},a))}):s.jsxs("div",{className:"d-flex align-items-center justify-content-center",style:{height:"300px"},children:[s.jsx("h4",{children:"No medical history yet"}),s.jsx("img",{src:"src/assets/images/Group 207.png",className:"cardicon",alt:"Consultation Icon",width:"100",height:"100"})]})]})]})})})})})})]})};export{$ as default};
