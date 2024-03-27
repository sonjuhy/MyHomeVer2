(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1758],{34434:function(e,s,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/BackEnd",function(){return n(29101)}])},29101:function(e,s,n){"use strict";n.r(s),n.d(s,{default:function(){return _}});var r=n(85893),a=n(36599),t=n(36270),l=n(9601),i=n(51221),d=n(72162),c=n(17494),o=n(54123),j=n(90948),x=n(90629),Z=n(51233),h=n(5616),m=n(15861),p=n(86886),u=n(63366),y=n(87462),f=n(67294),S=n(90512),g=n(58510),b=n(59773),v=n(71657),k=n(26336);let T=["children","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"],M=e=>{let{classes:s,inset:n,primary:r,secondary:a,dense:t}=e;return(0,g.Z)({root:["root",n&&"inset",t&&"dense",r&&a&&"multiline"],primary:["primary"],secondary:["secondary"]},k.L,s)},z=(0,j.ZP)("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(e,s)=>{let{ownerState:n}=e;return[{[`& .${k.Z.primary}`]:s.primary},{[`& .${k.Z.secondary}`]:s.secondary},s.root,n.inset&&s.inset,n.primary&&n.secondary&&s.multiline,n.dense&&s.dense]}})(({ownerState:e})=>(0,y.Z)({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},e.primary&&e.secondary&&{marginTop:6,marginBottom:6},e.inset&&{paddingLeft:56})),D=f.forwardRef(function(e,s){let n=(0,v.Z)({props:e,name:"MuiListItemText"}),{children:a,className:t,disableTypography:l=!1,inset:i=!1,primary:d,primaryTypographyProps:c,secondary:o,secondaryTypographyProps:j}=n,x=(0,u.Z)(n,T),{dense:Z}=f.useContext(b.Z),h=null!=d?d:a,p=o,g=(0,y.Z)({},n,{disableTypography:l,inset:i,primary:!!h,secondary:!!p,dense:Z}),k=M(g);return null==h||h.type===m.Z||l||(h=(0,r.jsx)(m.Z,(0,y.Z)({variant:Z?"body2":"body1",className:k.primary,component:null!=c&&c.variant?void 0:"span",display:"block"},c,{children:h}))),null==p||p.type===m.Z||l||(p=(0,r.jsx)(m.Z,(0,y.Z)({variant:"body2",className:k.secondary,color:"text.secondary",display:"block"},j,{children:p}))),(0,r.jsxs)(z,(0,y.Z)({className:(0,S.Z)(k.root,t),ownerState:g,ref:s},x,{children:[h,p]}))});var w=n(20569),P=n(33201),W=n(7925),C=n(89285),B=n(55534);let E=(0,j.ZP)(x.Z)(e=>{let{theme:s}=e;return{backgroundColor:"dark"===s.palette.mode?"#1A2027":"#fff",...s.typography.body2,padding:s.spacing(1),textAlign:"center",color:s.palette.text.secondary}});function _(){let[e,s]=(0,f.useState)("Modal Title"),[n,j]=(0,f.useState)("Modal Content"),[x,u]=(0,f.useState)(["Modal Problem"]),[y,S]=(0,f.useState)(["Modal solved"]),[g,b]=(0,f.useState)("java"),[v,k]=(0,f.useState)("tmp"),[T,M]=(0,f.useState)("tmp"),[z,_]=(0,f.useState)(!1),L=()=>{_(!z)},N=(0,W.TL)(),{prefix:I}=(0,f.useContext)(C.ZP),A=(0,W.CG)(e=>e.page.smallMode)?14:16,F=(e,n,r,a,t,l,i)=>{s(e),j(n),b(r),u(l),S(i),k(a),M(t)};return(0,f.useEffect)(()=>{let e=()=>{var e;let s=null===(e=document.getElementById("backend-container"))||void 0===e?void 0:e.offsetWidth;s&&s<=900?N((0,B.gh)(!0)):N((0,B.gh)(!1))};return e(),window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[]),(0,r.jsxs)("div",{id:"backend-container",children:[(0,r.jsx)(w.Z,{part:v,name:T,show:z,handleStatus:L,title:e,content:n,problems:x,solved:y,codeType:g}),(0,r.jsxs)(Z.Z,{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:[(0,r.jsxs)(h.Z,{textAlign:"center",width:"80%",children:[(0,r.jsx)("br",{}),(0,r.jsx)(m.Z,{variant:"h5",children:"Back-End Sequence"}),(0,r.jsx)("br",{}),(0,r.jsx)(m.Z,{children:"개발 과정 중 발생한 문제와 해결 과정을 순서대로 담은 페이지입니다."}),(0,r.jsx)("br",{}),(0,r.jsx)(m.Z,{fontSize:A,children:"자세한 내용을 보고싶으시면, Problem & Solution의 내용을 클릭하여 주시기 바랍니다."})]}),(0,r.jsxs)(E,{id:"security item",style:{width:"90%",marginBottom:"3rem",marginTop:"3rem"},children:[(0,r.jsx)(m.Z,{variant:"overline",fontSize:2*A,fontWeight:"bolder",children:"security"}),(0,r.jsxs)(p.ZP,{container:!0,style:{marginBottom:"1rem",marginTop:"1rem"},children:[(0,r.jsx)(p.ZP,{item:!0,xs:6,sm:6,md:6,lg:6,children:(0,r.jsx)(m.Z,{fontSize:1.6*A,children:"Category"})}),(0,r.jsx)(p.ZP,{item:!0,xs:6,sm:6,md:6,lg:6,children:(0,r.jsx)(m.Z,{fontSize:1.6*A,children:"Problem & Solution"})})]}),(0,r.jsxs)(a.Z,{position:"left",children:[(0,r.jsxs)(t.Z,{children:[(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"primary"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{fontSize:A,fontWeight:"bolder",children:"Change PHP to Spring Boot"})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"primary"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{fontSize:A,fontWeight:"bolder",children:"Apply Spring Security"})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"jwt",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"rule",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"jwtFilter",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"whiteList",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"customFilter",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsx)(l.Z,{children:(0,r.jsx)(c.Z,{color:"success"})}),(0,r.jsx)(d.Z,{})]})]})]}),(0,r.jsxs)(E,{id:"feature item",style:{width:"90%",marginBottom:"3rem"},children:[(0,r.jsx)(m.Z,{variant:"overline",fontSize:2*A,fontWeight:"bolder",children:"feature"}),(0,r.jsxs)(Z.Z,{children:[(0,r.jsx)(m.Z,{variant:"overline",fontSize:1.5*A,children:"goal"}),(0,r.jsxs)(D,{children:[(0,r.jsx)(m.Z,{fontSize:1*A,children:"1. 메인 로직을 실행 하는 주체 변경. (Android → Server)"}),(0,r.jsx)(m.Z,{fontSize:1*A,children:"2. 기능을 서버로 통합하여 여러 클라이언트에서도 동일한 서비스를 사용할 수 있도록 확장성 개선."})]})]}),(0,r.jsxs)(p.ZP,{container:!0,style:{marginBottom:"1rem",marginTop:"1rem"},children:[(0,r.jsx)(p.ZP,{item:!0,xs:6,sm:6,md:6,lg:6,children:(0,r.jsx)(m.Z,{fontWeight:"bolder",fontSize:1.6*A,children:"Category"})}),(0,r.jsx)(p.ZP,{item:!0,xs:6,sm:6,md:6,lg:6,children:(0,r.jsx)(m.Z,{fontWeight:"bolder",fontSize:1.6*A,children:"Problem & Solution"})})]}),(0,r.jsxs)(a.Z,{position:"left",children:[(0,r.jsxs)(t.Z,{children:[(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"primary"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{fontSize:A,fontWeight:"bolder",children:"Weather"})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"weatherFeature",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"primary"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{fontSize:A,fontWeight:"bolder",children:"IoT"})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"iotFeature",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"primary"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{fontSize:A,fontWeight:"bolder",children:"Cloud"})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"sftp",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"fullSearch",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"thumbnail",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"lowQualityImage",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"walksAndBulk",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"batch",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsx)(l.Z,{children:(0,r.jsx)(c.Z,{color:"success"})}),(0,r.jsx)(d.Z,{})]})]})]}),(0,r.jsxs)(E,{id:"maintenance item",style:{width:"90%",marginBottom:"3rem"},children:[(0,r.jsx)(m.Z,{variant:"overline",fontSize:2*A,fontWeight:"bolder",children:"maintenance"}),(0,r.jsxs)(Z.Z,{children:[(0,r.jsx)(m.Z,{variant:"overline",fontSize:1.5*A,children:"goal"}),(0,r.jsxs)(D,{children:[(0,r.jsx)(m.Z,{fontSize:1*A,children:"1. 유지 보수를 쉽게 하도록 하여 서비스 제공에 문제가 없도록 하는 것."}),(0,r.jsx)(m.Z,{fontSize:1*A,children:"2. 주요 로직을 서버로 처리하여 에러가 나더라도 클라이언트는 수정 없이 해결할 수 있도록 할 것."})]})]}),(0,r.jsxs)(p.ZP,{container:!0,style:{marginBottom:"1rem",marginTop:"1rem"},children:[(0,r.jsx)(p.ZP,{item:!0,xs:6,sm:6,md:6,lg:6,children:(0,r.jsx)(m.Z,{fontWeight:"bolder",fontSize:1.6*A,children:"Category"})}),(0,r.jsx)(p.ZP,{item:!0,xs:6,sm:6,md:6,lg:6,children:(0,r.jsx)(m.Z,{fontWeight:"bolder",fontSize:1.6*A,children:"Problem & Solution"})})]}),(0,r.jsxs)(a.Z,{position:"left",children:[(0,r.jsxs)(t.Z,{children:[(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"primary"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{fontSize:A,fontWeight:"bolder",children:"Use Docker & Jenkins"})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"CIAndCD",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"restart",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"container",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"primary"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{fontSize:A,fontWeight:"bolder",children:"Weather"})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"weatherMaintenance",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"primary"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{fontSize:A,fontWeight:"bolder",children:"IoT Back-End Change"})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"onlyLogic",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"migration",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"primary"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{fontSize:A,fontWeight:"bolder",children:"Log System"})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"buildLogSystem",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"logDivPart",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"primary"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{fontSize:A,fontWeight:"bolder",children:"Code Refactoring"})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"block",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(c.Z,{color:"success"}),(0,r.jsx)(i.Z,{})]}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(t.Z,{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(P.Z,{name:"enum",codeType:"java",setModalData:F,part:"backend",handleStatus:L})}),(0,r.jsx)(l.Z,{children:(0,r.jsx)(c.Z,{color:"success"})}),(0,r.jsx)(d.Z,{})]})]})]})]})]})}}},function(e){e.O(0,[4991,1274,2902,5023,2888,9774,179],function(){return e(e.s=34434)}),_N_E=e.O()}]);