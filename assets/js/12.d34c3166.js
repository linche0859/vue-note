(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{330:function(e,t,i){},393:function(e,t,i){"use strict";var n=i(330);i.n(n).a},423:function(e,t,i){"use strict";i.r(t);i(25);var n={name:"ForNoKey",components:{},props:{},data:function(){return{list:[{id:"task001",title:"選項 1",isDone:!1},{id:"task002",title:"選項 2",isDone:!1},{id:"task003",title:"選項 3",isDone:!1}]}},computed:{todoList:function(){return this.list.filter((function(e){return!e.isDone}))},doneList:function(){return this.list.filter((function(e){return e.isDone}))}},watch:{},created:function(){},mounted:function(){},methods:{}},s=(i(393),i(43)),o=Object(s.a)(n,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"forNoKey d-flex"},[i("div",{staticClass:"flex-grow-1"},[i("h3",[e._v("Todo List")]),e._v(" "),i("ul",{staticClass:"mb-0"},e._l(e.todoList,(function(t){return i("li",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.isDone,expression:"item.isDone"}],attrs:{type:"checkbox",id:"forNoKey"+t.id},domProps:{checked:Array.isArray(t.isDone)?e._i(t.isDone,null)>-1:t.isDone},on:{change:function(i){var n=t.isDone,s=i.target,o=!!s.checked;if(Array.isArray(n)){var r=e._i(n,null);s.checked?r<0&&e.$set(t,"isDone",n.concat([null])):r>-1&&e.$set(t,"isDone",n.slice(0,r).concat(n.slice(r+1)))}else e.$set(t,"isDone",o)}}}),e._v(" "),i("label",{attrs:{for:"forNoKey"+t.id}},[e._v(e._s(t.title))])])})),0)]),e._v(" "),i("div",{staticClass:"flex-grow-1"},[i("h3",[e._v("Done List")]),e._v(" "),i("ul",{staticClass:"mb-0"},e._l(e.doneList,(function(t){return i("li",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.isDone,expression:"item.isDone"}],attrs:{type:"checkbox",id:"forNoKey"+t.id},domProps:{checked:Array.isArray(t.isDone)?e._i(t.isDone,null)>-1:t.isDone},on:{change:function(i){var n=t.isDone,s=i.target,o=!!s.checked;if(Array.isArray(n)){var r=e._i(n,null);s.checked?r<0&&e.$set(t,"isDone",n.concat([null])):r>-1&&e.$set(t,"isDone",n.slice(0,r).concat(n.slice(r+1)))}else e.$set(t,"isDone",o)}}}),e._v(" "),i("label",{attrs:{for:"forNoKey"+t.id}},[e._v(e._s(t.title))])])})),0)])])}),[],!1,null,null,null);t.default=o.exports}}]);