(this["webpackJsonp2.20_puhelinluettelo_step12"]=this["webpackJsonp2.20_puhelinluettelo_step12"]||[]).push([[0],{41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(16),a=t.n(c),o=t(7),i=t(3),u=t(1),r=t(0),l=function(e){return Object(r.jsxs)("div",{children:["filter shown with ",Object(r.jsx)("input",{onChange:e.handleFiltering})]})},s=function(e){return Object(r.jsxs)("form",{onSubmit:e.addContact,children:[Object(r.jsxs)("div",{children:[" name: ",Object(r.jsx)("input",{value:e.newName,onChange:e.handleNameChange})," "]}),Object(r.jsxs)("div",{children:[" number: ",Object(r.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})," "]}),Object(r.jsxs)("div",{children:[" ",Object(r.jsx)("button",{type:"submit",children:" add "})," "]})]})},d=function(e){var n=e.person,t=e.deleteContact;return Object(r.jsxs)("li",{children:[n.name," ",n.number,Object(r.jsx)("button",{onClick:function(){return t(n)},children:" Delete "})]})},j=function(e){return Object(r.jsx)("ul",{children:e.contactsToShow.map((function(n){return Object(r.jsx)(d,{person:n,deleteContact:e.deleteContact},n.id)}))})},b=t(4),h=t.n(b),f="api/persons",m=function(e){var n=e.message;return null===n?null:Object(r.jsx)("div",{className:"error",children:n})},O=function(){var e=Object(u.useState)([]),n=Object(i.a)(e,2),t=n[0],c=n[1],a=Object(u.useState)(""),d=Object(i.a)(a,2),b=d[0],O=d[1],p=Object(u.useState)(""),v=Object(i.a)(p,2),x=v[0],w=v[1],g=Object(u.useState)(""),C=Object(i.a)(g,2),N=C[0],S=C[1],T=Object(u.useState)(null),k=Object(i.a)(T,2),y=k[0],D=k[1];Object(u.useEffect)((function(){h.a.get(f).then((function(e){return e.data})).then((function(e){c(e)}))}),[]);var E=N?t.filter((function(e){return e.name.toLowerCase().includes(N.toLowerCase())})):t;return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(m,{message:y}),Object(r.jsx)(l,{handleFiltering:function(e){S(e.target.value)}}),Object(r.jsx)("h2",{children:"add a new"}),Object(r.jsx)(s,{addContact:function(e){e.preventDefault();var n,a=!1;if(t.forEach((function(e){e.name===b&&(a=!0)})),a){if(window.confirm("".concat(b," is already added to phonebook, replace the old number with a new one?"))){var i=t.find((function(e){return e.name===b})),u=Object(o.a)(Object(o.a)({},i),{},{number:x});(n=u,h.a.put("".concat(f,"/").concat(n.id),n).then((function(e){return e.data}))).then((function(e){c(t.map((function(n){return n.id!==e.id?n:e}))),D("Updated ".concat(b)),setTimeout((function(){D(null)}),5e3)})).catch((function(e){console.log(e),D("".concat(i.name," has already been removed from server")),setTimeout((function(){D(null)}),5e3),c(t.filter((function(e){return e.id!==i.id})))}))}O(""),w("")}else{(function(e){return h.a.post(f,e).then((function(e){return e.data}))})({name:b,number:x}).then((function(e){c(t.concat(e)),D("Added ".concat(b)),setTimeout((function(){D(null)}),5e3)})).catch((function(e){console.log(e),D("Person validation failed: invalid name or number"),setTimeout((function(){D(null)}),5e3)})),O(""),w("")}},newName:b,handleNameChange:function(e){O(e.target.value)},newNumber:x,handleNumberChange:function(e){w(e.target.value)}}),Object(r.jsx)("h2",{children:"Numbers"}),Object(r.jsx)(j,{contactsToShow:E,deleteContact:function(e){if(window.confirm("Delete ".concat(e.name,"?"))){a=e.id,h.a.delete("".concat(f,"/").concat(a));var n=[];t.forEach((function(t){t.id!==e.id&&n.push(t)})),c(n),D("Deleted ".concat(e.name)),setTimeout((function(){D(null)}),5e3)}var a}})]})};t(41);a.a.render(Object(r.jsx)(O,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.23e8aeaf.chunk.js.map