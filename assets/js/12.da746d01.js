(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{329:function(t,e,n){},378:function(t,e,n){"use strict";var a=n(329);n.n(a).a},393:function(t,e,n){"use strict";n.r(e);var a={name:"KeepAliveWithMax",components:{home:{template:'\n    <div>\n      <input type="text" class="form-control" placeholder="input something here" value="home"/>\n    </div>'},about:{template:'\n    <div>\n      <input type="text" class="form-control" placeholder="input something here" value="about"/>\n    </div>'},contact:{template:'\n    <div>\n      <input type="text" class="form-control" placeholder="input something here" value="contact"/>\n    </div>'}},props:{},data:function(){return{tabs:[{id:"home",name:"HOME"},{id:"about",name:"ABOUT"},{id:"contact",name:"CONTACT"}],currentTab:"home"}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{}},i=(n(378),n(43)),o=Object(i.a)(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"keepAliveWithMax"},[n("ul",{staticClass:"nav nav-tabs mt-0 mb-3"},t._l(t.tabs,(function(e){return n("li",{key:e.id,staticClass:"nav-item"},[n("a",{class:["nav-link",{active:e.id===t.currentTab}],on:{click:function(n){t.currentTab=e.id}}},[t._v(t._s(e.name))])])})),0),t._v(" "),n("keep-alive",{attrs:{max:2}},[n(t.currentTab,{tag:"component"})],1)],1)}),[],!1,null,null,null);e.default=o.exports}}]);