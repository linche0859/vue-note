(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{330:function(t,e,a){},384:function(t,e,a){"use strict";var o=a(330);a.n(o).a},402:function(t,e,a){"use strict";a.r(e);var o={name:"ResetData",components:{},props:{},data:function(){return{form:{name:"",city:"",gender:"man"}}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{resetFormHandler:function(){Object.assign(this.form,this.$options.data().form)}}},r=(a(384),a(43)),s=Object(r.a)(o,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"resetData"},[a("form",{attrs:{action:"javascript:;"}},[a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-2 col-form-label text-right",attrs:{for:"name"}},[t._v("姓名")]),t._v(" "),a("div",{staticClass:"col-10"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.name,expression:"form.name"}],staticClass:"form-control",attrs:{type:"text",id:"name"},domProps:{value:t.form.name},on:{input:function(e){e.target.composing||t.$set(t.form,"name",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-2 col-form-label text-right",attrs:{for:"city"}},[t._v("城市")]),t._v(" "),a("div",{staticClass:"col-10"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.form.city,expression:"form.city"}],staticClass:"form-control",attrs:{id:"city"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.form,"city",e.target.multiple?a:a[0])}}},[a("option",{attrs:{disabled:"",value:""}},[t._v("請選擇")]),t._v(" "),a("option",[t._v("台北市")]),t._v(" "),a("option",[t._v("台中市")]),t._v(" "),a("option",[t._v("高雄市")])])])]),t._v(" "),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-2 col-form-label text-right"},[t._v("性別")]),t._v(" "),a("div",{staticClass:"col-10"},[a("div",{staticClass:"d-flex align-items-center h-100"},[a("div",{staticClass:"form-check mr-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.gender,expression:"form.gender"}],staticClass:"form-check-input",attrs:{type:"radio",id:"man",value:"man"},domProps:{checked:t._q(t.form.gender,"man")},on:{change:function(e){return t.$set(t.form,"gender","man")}}}),t._v(" "),a("label",{staticClass:"form-check-label",attrs:{for:"man"}},[t._v("男")])]),t._v(" "),a("div",{staticClass:"form-check"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.gender,expression:"form.gender"}],staticClass:"form-check-input",attrs:{type:"radio",id:"woman",value:"woman"},domProps:{checked:t._q(t.form.gender,"woman")},on:{change:function(e){return t.$set(t.form,"gender","woman")}}}),t._v(" "),a("label",{staticClass:"form-check-label",attrs:{for:"woman"}},[t._v("女")])])])])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 text-right"},[a("button",{staticClass:"btn btn-secondary",attrs:{type:"button"},on:{click:t.resetFormHandler}},[t._v("重置")])])])])])}),[],!1,null,null,null);e.default=s.exports}}]);