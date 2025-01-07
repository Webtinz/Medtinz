import{p as x,i as y,r as c,j as e}from"./index-DMyFwfPw.js";import{a as j}from"./axios-upsvKRUO.js";import{a as g}from"./index-BmJ0gaIa.js";import{C,a as v,b as M,c as f}from"./CModalTitle-n6JZNKqm.js";import{c as N}from"./index.esm-C08VXAn-.js";import"./iconBase-DDq4M1RR.js";import"./ClientFooter-BSyiqpfD.js";import"./CConditionalPortal-BL_iV0wb.js";const _=()=>{var m;const d=x(),a=(m=y().state)==null?void 0:m.appointment,[n,p]=c.useState("Cash"),[s,h]=c.useState({currency:"XOF",amount:"",purpose:"consultation",paymentId:""});c.useState(!1);const i=r=>{p(r.target.value)},o=r=>{const{name:l,value:t}=r.target;h({...s,[l]:t})},u=async r=>{r.preventDefault();const l={appointmentId:(a==null?void 0:a._id)||"",patientId:(a==null?void 0:a.patientId)||"",department:(a==null?void 0:a.department)||"Unknown",amount:s.amount,currency:s.currency,paymentMethod:n,purpose:s.purpose,paymentId:n==="MOMO"?s.paymentId:`CASH-${Date.now()}`};console.log("Submitting payment data:",l);try{const t=await j.post("http://localhost:5000/clinic/createPayment",l);console.log("Payment recorded:",t.data),d("/client/receiptpay",{state:{paymentData:t.data}})}catch(t){console.error("Error recording payment:",t.response?t.response.data:t.message),alert("Payment failed. Please try again.")}};return e.jsx("div",{className:"payment-page",children:e.jsxs(C,{className:"paymentbycash newregistermodal",alignment:"center",scrollable:!0,size:"lg",visible:!0,onClose:()=>{},"aria-labelledby":"VerticallyCenteredScrollableExample2",children:[e.jsx(v,{className:"text-center",children:e.jsx(M,{id:"VerticallyCenteredScrollableExample2",className:"Titleformsmodal",children:"New Appointment"})}),e.jsxs(f,{className:"p-5",children:[e.jsxs("section",{className:"mb-5",children:[e.jsx("p",{children:e.jsx("strong",{children:"Appointment Details:"})}),e.jsxs("p",{children:["Patient: ",a==null?void 0:a.patientId]}),e.jsxs("p",{children:["Department: ",a==null?void 0:a.department]}),e.jsxs("p",{children:["Date: ",a==null?void 0:a.appointmentDate]}),e.jsxs("p",{children:["Time: ",a==null?void 0:a.appointmentTime]})]}),e.jsx("section",{className:"pamentoption",children:e.jsxs("div",{className:"selectpaymentoption",children:[e.jsx("h4",{children:"Choose Payment Method"}),e.jsxs("div",{className:"momopayment",children:[e.jsx("input",{type:"radio",name:"paymentMethod",id:"momopayment",value:"MOMO",checked:n==="MOMO",onChange:i}),e.jsx("img",{src:"src/assets/images/MoMo_Logo_RGB_Horizontal-on_LIGHT_BG 1.png",className:"cardicon",alt:"Consultation Icon"})]}),e.jsxs("div",{className:"cashpayment",children:[e.jsx("input",{type:"radio",name:"paymentMethod",id:"cashpayment",value:"Cash",checked:n==="Cash",onChange:i}),e.jsx("h3",{className:"cashtext",children:"Cash"})]})]})}),e.jsxs("form",{onSubmit:u,children:[n==="Cash"?e.jsx(e.Fragment,{children:e.jsxs("div",{className:"form-row row",children:[e.jsxs("div",{className:"form-group col-md-4",children:[e.jsx("label",{htmlFor:"currency",children:"Currency"}),e.jsxs("select",{name:"currency",id:"currency",value:s.currency,onChange:o,required:!0,children:[e.jsx("option",{value:"XOF",children:"XOF"}),e.jsx("option",{value:"USD",children:"USD"}),e.jsx("option",{value:"EUR",children:"EUR"})]})]}),e.jsxs("div",{className:"form-group col-md-8",children:[e.jsx("label",{htmlFor:"amount",children:"Enter Amount"}),e.jsx("input",{type:"number",name:"amount",id:"amount",value:s.amount,onChange:o,required:!0})]})]})}):e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"paymentId",children:"MOMO Payment ID"}),e.jsx("input",{type:"text",name:"paymentId",id:"paymentId",placeholder:"Enter MOMO Payment ID",value:s.paymentId,onChange:o,required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"purpose",children:"Purpose"}),e.jsxs("select",{name:"purpose",id:"purpose",value:s.purpose,onChange:o,required:!0,children:[e.jsx("option",{value:"consultation",children:"Consultation"}),e.jsx("option",{value:"operation",children:"Operation"})]})]}),e.jsx("div",{className:"form-group d-flex justify-content-center",children:e.jsxs(N,{type:"submit",className:"w-100",children:["Confirm Payment   ",e.jsx(g,{})]})})]})]})]})})};export{_ as default};
