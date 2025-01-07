import{r as t,j as e,L as R}from"./index-DMyFwfPw.js";import{a as g}from"./axios-upsvKRUO.js";import{a as Q,b as A,c as H,g as M,e as W}from"./index-BmJ0gaIa.js";import{a as X,b as Z,i as ee}from"./ClientFooter-BSyiqpfD.js";import{C as se,a as ae,b as te,c as le}from"./CModalTitle-n6JZNKqm.js";import{c as T,a as re,C as O}from"./index.esm-C08VXAn-.js";import{b as k,c as L,d as K}from"./index-DDA6ZN6t.js";import{C as ie}from"./CHeader-CJuvaqrj.js";import{C as ne}from"./CHeaderNav-hEJLwZ-k.js";import{C as ce}from"./CRow-Cq4HXHde.js";import{C as oe}from"./CCol-OKn3_WcL.js";import{C as de}from"./CCard-BxMFv-c9.js";import{C as me}from"./CCardBody-W_evx8a4.js";import{C as he,a as xe,b as z,c as _}from"./CTabList-C4Teo4Bu.js";import{c as $}from"./cil-search-CDkY_4k-.js";import{C as q,a as U,b as v,c as l,d as V,e as r}from"./CTable-Cjt_XmP4.js";import"./iconBase-DDq4M1RR.js";import"./CConditionalPortal-BL_iV0wb.js";import"./getNextActiveElement-BFbndcFM.js";const G=({visible:N,onClose:h,onPatientAdded:C})=>{const[y,S]=t.useState([]),[m,c]=t.useState(""),[j,f]=t.useState(""),[i,u]=t.useState({name:"",age:"",gender:"",phone:"",email:"",hospitalId:"",address:""}),d=o=>{const{name:n,value:x}=o.target;u({...i,[n]:x})},b=async o=>{o.preventDefault();try{const n=await g.post("http://localhost:5000/clinic/patients/register",i);console.log("Patient ajouté avec succès:",n.data),c("Patient ajouté avec succès!"),f("success"),C(n.data),u({name:"",age:"",gender:"",phone:"",email:"",hospitalId:"",address:""})}catch(n){console.error("Erreur lors de l’ajout du patient:",n),c("Une erreur est survenue lors de l’ajout du patient."),f("error")}};return t.useEffect(()=>{(async()=>{try{const n=await g.get("http://localhost:5000/api/hospitals");S(n.data)}catch(n){console.error("Erreur lors de la récupération des hôpitaux:",n)}})()},[]),e.jsxs(se,{className:"newregistermodal",alignment:"center",scrollable:!0,size:"lg",visible:N,onClose:h,"aria-labelledby":"VerticallyCenteredScrollableExample2",children:[e.jsx(ae,{children:e.jsx(te,{children:"Register new patient"})}),e.jsxs(le,{className:"p-5",children:[m&&e.jsx("div",{className:`alert ${j==="success"?"alert-success":"alert-danger"}`,children:m}),e.jsxs("form",{onSubmit:b,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"name",children:"Name"}),e.jsx("input",{type:"text",name:"name",id:"name",value:i.name,onChange:d,placeholder:"Casos Billal",required:!0})]}),e.jsxs("div",{className:"form-row row",children:[e.jsxs("div",{className:"form-group col-md-4",children:[e.jsx("label",{htmlFor:"gender",children:"Gender"}),e.jsxs("select",{name:"gender",id:"gender",value:i.gender,onChange:d,required:!0,children:[e.jsx("option",{value:"",children:"Select Gender"}),e.jsx("option",{value:"male",children:"Male"}),e.jsx("option",{value:"female",children:"Female"}),e.jsx("option",{value:"other",children:"Other"})]})]}),e.jsxs("div",{className:"form-group col-md-4",children:[e.jsx("label",{htmlFor:"age",children:"Date of birth"}),e.jsx("input",{type:"date",name:"age",id:"age",value:i.age,onChange:d,required:!0,placeholder:"20-12-2000"})]}),e.jsxs("div",{className:"form-group col-md-4",children:[e.jsx("label",{htmlFor:"hospitalId",children:"Hospital"}),e.jsxs("select",{name:"hospitalId",id:"hospitalId",value:i.hospitalId,onChange:d,required:!0,children:[e.jsx("option",{value:"",children:"Select Hospital"}),y.map(o=>e.jsxs("option",{value:o._id,children:[o.name," "]},o._id))]})]})]}),e.jsxs("div",{className:"form-row row",children:[e.jsxs("div",{className:"form-group col-md-6",children:[e.jsx("label",{htmlFor:"phone",children:"Contact"}),e.jsx("input",{type:"tel",name:"phone",id:"phone",value:i.phone,onChange:d,placeholder:"+229 01 90 00 00 00"})]}),e.jsxs("div",{className:"form-group col-md-6",children:[e.jsx("label",{htmlFor:"email",children:"Email"}),e.jsx("input",{type:"email",name:"email",onChange:d,value:i.email,id:"email",placeholder:"+229 01 90 00 00 00"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"address",children:"Address"}),e.jsx("input",{name:"address",id:"address",value:i.address,onChange:d,placeholder:"Your address here"})]}),e.jsx("div",{className:"savenewuser form-group d-flex justify-content-center",children:e.jsxs(T,{type:"submit",children:["Continue   ",e.jsx(Q,{})]})})]})]})]})},Be=()=>{const[N,h]=t.useState(!1),[C,y]=t.useState([]),[S,m]=t.useState([]),[c,j]=t.useState(1),[f,i]=t.useState(0),[u,d]=t.useState(0),[b,o]=t.useState(""),[n,x]=t.useState(!1),P=10,I=async(s=1)=>{x(!0);try{const a=await g.get(`http://localhost:5000/clinic/patients?page=${s}&limit=${P}`);m(a.data.patients),i(a.data.totalPages),d(a.data.totalPatients),j(a.data.currentPage)}catch(a){console.error("Erreur lors de la récupération des patients:",a)}finally{x(!1)}};t.useEffect(()=>{(async()=>{try{const a=await g.get("http://localhost:5000/clinic/getAppointmentlist");console.log("API Response:",a.data),y(a.data)}catch(a){console.error("Error fetching appointments:",a),alert("Failed to fetch appointments")}})()},[]);const w=async s=>{const a=s.target.value;if(o(a),!a){I(c);return}x(!0);try{const p=await g.get("http://localhost:5000/clinic/patients/searchpatient",{params:{name:a,id:a,phone:a}});m(p.data)}catch(p){console.error("Erreur lors de la recherche des patients:",p),m([])}finally{x(!1)}};t.useEffect(()=>{I(c)},[c]);const Y=()=>{c<f&&j(s=>s+1)},J=()=>{c>1&&j(s=>s-1)},E=s=>{m(a=>[...a,s])};return e.jsxs("div",{className:"dashboard-header",children:[e.jsx(ie,{position:"sticky",style:{backgroundColor:"#DFEAF5"},children:e.jsxs(re,{fluid:!0,className:"d-flex align-items-center",children:[e.jsxs("div",{className:"pagetittle",children:[e.jsx("h4",{children:e.jsx("b",{children:"Patient Management"})}),e.jsxs("p",{children:["Home ",e.jsx(A,{className:"mx-2",style:{fontSize:"12px"}}),"  Dashboard ",e.jsx(A,{style:{fontSize:"12px"},className:"mx-2"}),"  ",e.jsx("span",{style:{color:"#191B1C"},children:"Patient Management"})]})]}),e.jsx(ne,{children:e.jsx(X,{children:e.jsxs(Z,{href:"#",className:"d-flex align-items-center",children:[e.jsx("img",{src:"src\\assets\\images\\adminprofil.png",className:"cardicon",alt:"Consultation Icon",width:"50",height:"50"}),e.jsxs("div",{children:[e.jsx("span",{className:"ms-2",children:"Semia BOKO"}),e.jsx("p",{className:"ms-2",children:"Admin"})]})]})})})]})}),e.jsx("div",{className:"Patientlist mt-2",children:e.jsx("div",{className:"tabsection",children:e.jsx(ce,{children:e.jsx(oe,{xs:12,children:e.jsx(de,{className:"card mb-4 p-4",children:e.jsxs(me,{children:[e.jsxs(he,{activeItemKey:"Allpatient",children:[e.jsxs(xe,{variant:"underline",className:"border-bottom mx-auto",children:[e.jsx(z,{itemKey:"Allpatient",children:"All Patient"}),e.jsx(z,{itemKey:"dayrecord",children:"Day's record"})]}),e.jsxs(ee,{children:[e.jsx(_,{className:"p-3",itemKey:"Allpatient",children:e.jsxs("div",{className:"tablist ",children:[e.jsxs("div",{className:"patientlistline",children:[e.jsx("div",{className:"search-container",children:e.jsxs("div",{className:"search-bar",children:[e.jsx(O,{icon:$,size:"sm",className:"search-icon"}),e.jsx("input",{type:"text",placeholder:"Search for a patient (Enter ID, name or Tel)",value:b,onChange:w})]})}),e.jsx("div",{className:"registeruserbtn ms-auto",children:e.jsxs(T,{onClick:()=>h(!0),className:"registernewbtn ms-auto d-flex align-items-center",active:!0,tabIndex:-1,children:[e.jsx(H,{className:"mx-2"})," Register New patient"]})})]}),e.jsx(G,{visible:N,onClose:()=>h(!1),onPatientAdded:E}),e.jsx("div",{className:"",children:e.jsxs("div",{className:"filter-bar",children:[e.jsxs("button",{className:"filter-button",children:["Filter By",e.jsx(k,{className:"icon"})]}),e.jsxs("button",{className:"filter-button",children:["Order Type",e.jsx(L,{className:"icon"})]}),e.jsxs("button",{className:"reset-button",children:[e.jsx(K,{className:"icon"})," Reset Filter"]})]})}),e.jsx("div",{className:"patientlisttable",children:e.jsxs(q,{className:"mt-5 ctable-no-border ",align:"middle",responsive:!0,children:[e.jsx(U,{children:e.jsxs(v,{className:"tablehead",children:[e.jsx(l,{scope:"col",children:"ID"}),e.jsx(l,{scope:"col",children:"NAME"}),e.jsx(l,{scope:"col",children:"ADDRESS"}),e.jsx(l,{scope:"col",children:"LAST VISIT"}),e.jsx(l,{scope:"col",children:"PHONE"}),e.jsx(l,{scope:"col",children:"ACTION"})]})}),e.jsx(V,{children:S.map(s=>e.jsxs(v,{className:"ctable-row",children:[e.jsx(r,{align:"middle",children:s.patientId}),e.jsx(r,{children:s.name}),e.jsx(r,{children:s.address}),e.jsx(r,{children:s.email}),e.jsx(r,{children:s.phone}),e.jsx(r,{children:e.jsxs(R,{to:`/client/patientfilemedical/${s._id}`,className:"openfilepatient",children:[e.jsx(M,{})," Open patient file"]})})]}))})]})})]})}),e.jsx(_,{className:"p-3",itemKey:"dayrecord",children:e.jsxs("div",{className:"tablist ",children:[e.jsxs("div",{className:"patientlistline",children:[e.jsx("div",{className:"search-container",children:e.jsxs("div",{className:"search-bar",children:[e.jsx(O,{icon:$,size:"sm",className:"search-icon"}),e.jsx("input",{type:"text",placeholder:"Search for a patient (Enter ID, name or Tel)",value:b,onChange:w})]})}),e.jsx("div",{className:"registeruserbtn ms-auto",children:e.jsxs(T,{onClick:()=>h(!0),className:"registernewbtn ms-auto d-flex align-items-center",active:!0,tabIndex:-1,children:[e.jsx(H,{className:"mx-2"})," Register New patient"]})})]}),e.jsx(G,{visible:N,onClose:()=>h(!1),onPatientAdded:E}),e.jsx("div",{className:"",children:e.jsxs("div",{className:"filter-bar",children:[e.jsxs("button",{className:"filter-button",children:["Filter By",e.jsx(k,{className:"icon"})]}),e.jsxs("button",{className:"filter-button",children:["Order Type",e.jsx(L,{className:"icon"})]}),e.jsxs("button",{className:"reset-button",children:[e.jsx(K,{className:"icon"})," Reset Filter"]})]})}),e.jsx("div",{className:"patientlisttable",children:e.jsxs(q,{className:"mt-5 ctable-no-border ",align:"middle",responsive:!0,children:[e.jsx(U,{children:e.jsxs(v,{className:"tablehead",children:[e.jsx(l,{scope:"col",children:"ID"}),e.jsx(l,{scope:"col",children:"NAME"}),e.jsx(l,{scope:"col",children:"ADDRESS"}),e.jsx(l,{scope:"col",children:"Status"}),e.jsx(l,{scope:"col",children:"PHONE"}),e.jsx(l,{scope:"col",children:"STATUS"})]})}),e.jsx(V,{children:C.map(s=>{var a,p,F,D,B;return e.jsxs(v,{className:"ctable-row",children:[e.jsx(r,{children:((a=s.patientId)==null?void 0:a.patientId)||"N/A"}),e.jsx(r,{children:((p=s.patientId)==null?void 0:p.name)||"Unknown"}),e.jsx(r,{children:((F=s.patientId)==null?void 0:F.address)||"N/A"}),e.jsx(r,{children:e.jsx("span",{className:s.status==="Scheduled"?"coloredsucess":"coloredechec",children:s.status})}),e.jsx(r,{children:((D=s.patientId)==null?void 0:D.phone)||"N/A"}),e.jsx(r,{children:e.jsxs(R,{to:`/client/patientfilemedical/${(B=s.patientId)==null?void 0:B._id}`,className:"openfilepatient",children:[e.jsx(M,{})," Open patient file"]})})]},s._id)})})]})})]})})]})]}),e.jsxs("div",{className:"paginate me-5",children:[e.jsxs("p",{className:"mt-3",children:["Showing ",(c-1)*P+1,"-",Math.min(c*P,u)," of ",u]}),e.jsxs("div",{className:"actionbtn",children:[e.jsx("div",{className:"left",onClick:J,children:e.jsx(W,{className:"pagicon"})}),e.jsx("div",{className:"right",onClick:Y,children:e.jsx(A,{className:"pagicon"})})]})]})]})})})})})})]})};export{Be as default};
