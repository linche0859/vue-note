(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{308:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},309:function(e,t,r){var n=r(24),o="["+r(308)+"]",c=RegExp("^"+o+o+"*"),i=RegExp(o+o+"*$"),a=function(e){return function(t){var r=String(n(t));return 1&e&&(r=r.replace(c,"")),2&e&&(r=r.replace(i,"")),r}};e.exports={start:a(1),end:a(2),trim:a(3)}},313:function(e,t,r){var n=r(5),o=r(93);e.exports=function(e,t,r){var c,i;return o&&"function"==typeof(c=t.constructor)&&c!==r&&n(i=c.prototype)&&i!==r.prototype&&o(e,i),e}},315:function(e,t,r){"use strict";var n=r(6),o=r(4),c=r(92),i=r(11),a=r(7),u=r(18),f=r(313),s=r(45),p=r(2),l=r(29),b=r(67).f,g=r(26).f,m=r(9).f,O=r(309).trim,d=o.Number,N=d.prototype,v="Number"==u(l(N)),h=function(e){var t,r,n,o,c,i,a,u,f=s(e,!1);if("string"==typeof f&&f.length>2)if(43===(t=(f=O(f)).charCodeAt(0))||45===t){if(88===(r=f.charCodeAt(2))||120===r)return NaN}else if(48===t){switch(f.charCodeAt(1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+f}for(i=(c=f.slice(2)).length,a=0;a<i;a++)if((u=c.charCodeAt(a))<48||u>o)return NaN;return parseInt(c,n)}return+f};if(c("Number",!d(" 0o1")||!d("0b1")||d("+0x1"))){for(var y,I=function(e){var t=arguments.length<1?0:e,r=this;return r instanceof I&&(v?p((function(){N.valueOf.call(r)})):"Number"!=u(r))?f(new d(h(t)),r,I):h(t)},j=n?b(d):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),w=0;j.length>w;w++)a(d,y=j[w])&&!a(I,y)&&m(I,y,g(d,y));I.prototype=N,N.constructor=I,i(o,"Number",I)}},320:function(e,t,r){var n=r(1),o=r(6);n({target:"Object",stat:!0,forced:!o,sham:!o},{defineProperties:r(171)})},321:function(e,t,r){var n=r(1),o=r(2),c=r(15),i=r(26).f,a=r(6),u=o((function(){i(1)}));n({target:"Object",stat:!0,forced:!a||u,sham:!a},{getOwnPropertyDescriptor:function(e,t){return i(c(e),t)}})},323:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));r(47),r(25),r(94),r(320),r(168),r(321),r(172),r(95),r(96);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}},358:function(e,t,r){},428:function(e,t,r){"use strict";r(358)},520:function(e,t,r){"use strict";r.r(t);r(65),r(66),r(315);var n=r(323),o={functional:!0,props:{name:String,age:Number},render:function(e,t){var r=t.props,n=arguments[0];return n("li",["Name：",r.name,"，Age：",r.age])}},c={name:"JsxMap",components:{},props:{},data:function(){return{list:[{name:"Alex",age:18},{name:"John",age:16}]}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{},render:function(){var e=arguments[0];return e("section",{class:"jsxMap"},[e("ul",[this.list.map((function(t){return e(o,{key:t.name,props:Object(n.a)({},t)})}))])])}},i=(r(428),r(43)),a=Object(i.a)(c,void 0,void 0,!1,null,null,null);t.default=a.exports}}]);