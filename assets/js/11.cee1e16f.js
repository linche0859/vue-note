(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{326:function(t,n,e){"use strict";function r(){return(r=Object.assign||function(t){for(var n,e=1;e<arguments.length;e++)for(var r in n=arguments[e])Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r]);return t}).apply(this,arguments)}var o=["attrs","props","domProps"],a=["class","style","directives"],i=["on","nativeOn"],s=function(t,n){return function(){t&&t.apply(this,arguments),n&&n.apply(this,arguments)}};t.exports=function(t){return t.reduce((function(t,n){for(var e in n)if(t[e])if(-1!==o.indexOf(e))t[e]=r({},t[e],n[e]);else if(-1!==a.indexOf(e)){var c=t[e]instanceof Array?t[e]:[t[e]],u=n[e]instanceof Array?n[e]:[n[e]];t[e]=c.concat(u)}else if(-1!==i.indexOf(e))for(var l in n[e])if(t[e][l]){var f=t[e][l]instanceof Array?t[e][l]:[t[e][l]],d=n[e][l]instanceof Array?n[e][l]:[n[e][l]];t[e][l]=f.concat(d)}else t[e][l]=n[e][l];else if("hook"==e)for(var p in n[e])t[e][p]=t[e][p]?s(t[e][p],n[e][p]):n[e][p];else t[e]=n[e];else t[e]=n[e];return t}),{})}},361:function(t,n,e){},429:function(t,n,e){"use strict";e(361)},530:function(t,n,e){"use strict";e.r(n);var r=e(326),o=e.n(r),a=(e(65),{functional:!0,render:function(t,n){var e=n.data;return t("input",o()([{},e]))}}),i={name:"Common",components:{},props:{},data:function(){return{text:"Hello World",radio:"one",radios:["one","second","third"]}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{inputHandler:function(t){var n=t.target.value;this.text=n},changeHandler:function(t){var n=t.target.value;this.radio=n}},render:function(){var t=this,n=arguments[0];return n("div",[n(a,{class:"form-control",attrs:{type:"text",value:this.text},on:{input:this.inputHandler}}),n("p",{class:"pb-3 border-bottom"},["Input text result：",this.text]),this.radios.map((function(e){return n("div",{class:"form-check"},[n(a,{class:"form-check-input",attrs:{type:"radio",name:"radio",id:e,value:e,checked:t.radio===e},key:e,on:{change:t.changeHandler}}),n("label",{class:"form-check-label",attrs:{for:e}},[e])])})),n("p",{class:"mb-0"},["Radio result：",this.radio])])}},s=(e(429),e(41)),c=Object(s.a)(i,void 0,void 0,!1,null,null,null);n.default=c.exports}}]);