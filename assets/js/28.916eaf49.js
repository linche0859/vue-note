(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{361:function(t,e,s){},431:function(t,e,s){"use strict";s(361)},464:function(t,e,s){"use strict";s.r(e);s(65);var c={name:"RenderIfWithFor",components:{renderComponent:{render:function(t){return this.list.length?t("ul",this.list.map((function(e){return t("li",e)}))):t("p","No fruit was selected.")},props:{list:{type:Array,required:!0}}}},props:{},data:function(){return{list:["Apple","Banana","Cherry","Grape"],selctedList:["Apple","Banana"]}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{}},r=(s(431),s(43)),i=Object(r.a)(c,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"renderIfWifthFor"},[s("h2",{staticClass:"border-bottom-0"},[t._v("Select")]),t._v(" "),s("div",{staticClass:"form-group d-flex flex-wrap"},t._l(t.list,(function(e){return s("div",{key:e,staticClass:"form-check mr-3"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.selctedList,expression:"selctedList"}],staticClass:"form-check-input",attrs:{type:"checkbox",id:"chk"+e},domProps:{value:e,checked:Array.isArray(t.selctedList)?t._i(t.selctedList,e)>-1:t.selctedList},on:{change:function(s){var c=t.selctedList,r=s.target,i=!!r.checked;if(Array.isArray(c)){var a=e,n=t._i(c,a);r.checked?n<0&&(t.selctedList=c.concat([a])):n>-1&&(t.selctedList=c.slice(0,n).concat(c.slice(n+1)))}else t.selctedList=i}}}),t._v(" "),s("label",{staticClass:"form-check-label",attrs:{for:"chk"+e}},[t._v(t._s(e))])])})),0),t._v(" "),s("div",{staticClass:"card"},[s("div",{staticClass:"card-header"},[t._v("Fruit basket")]),t._v(" "),s("div",{staticClass:"card-body"},[s("render-component",{attrs:{list:t.selctedList}})],1)])])}),[],!1,null,null,null);e.default=i.exports}}]);