(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{339:function(n,e,i){"use strict";function r(){return(r=Object.assign||function(n){for(var e,i=1;i<arguments.length;i++)for(var r in e=arguments[i])Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}).apply(this,arguments)}var s=["attrs","props","domProps"],o=["class","style","directives"],t=["on","nativeOn"],c=function(n,e){return function(){n&&n.apply(this,arguments),e&&e.apply(this,arguments)}};n.exports=function(n){return n.reduce((function(n,e){for(var i in e)if(n[i])if(-1!==s.indexOf(i))n[i]=r({},n[i],e[i]);else if(-1!==o.indexOf(i)){var a=n[i]instanceof Array?n[i]:[n[i]],p=e[i]instanceof Array?e[i]:[e[i]];n[i]=a.concat(p)}else if(-1!==t.indexOf(i))for(var l in e[i])if(n[i][l]){var u=n[i][l]instanceof Array?n[i][l]:[n[i][l]],f=e[i][l]instanceof Array?e[i][l]:[e[i][l]];n[i][l]=u.concat(f)}else n[i][l]=e[i][l];else if("hook"==i)for(var d in e[i])n[i][d]=n[i][d]?c(n[i][d],e[i][d]):e[i][d];else n[i]=e[i];else n[i]=e[i];return n}),{})}},340:function(n,e,i){},407:function(n,e,i){"use strict";var r=i(340);i.n(r).a},493:function(n,e,i){"use strict";i.r(e);i(166),i(94),i(46);var r=i(339),s=i.n(r),o={functional:!0,render:function(n,e){var i=e.props,r=e.slots;return i.permission?r().default:n("p",["permission denied"])}},t={name:"JsxConditionalRender",components:{},props:{},data:function(){return{permission:!1}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{},render:function(){var n=this,e=arguments[0];return e("div",[e("div",{class:"custom-control custom-checkbox"},[e("input",s()([{on:{change:function(e){var i=n.permission,r=e.target,s=!!r.checked;if(Array.isArray(i)){var o=n._i(i,null);r.checked?o<0&&(n.permission=i.concat([null])):o>-1&&(n.permission=i.slice(0,o).concat(i.slice(o+1)))}else n.permission=s}},attrs:{type:"checkbox",id:"permission"},class:"custom-control-input",domProps:{checked:Array.isArray(n.permission)?this._i(n.permission,null)>-1:n.permission}},{directives:[{name:"model",value:n.permission,modifiers:{}}]}])),e("label",{class:"custom-control-label",attrs:{for:"permission"}},["permission ",this.permission?"granted":"denied"])]),e(o,{attrs:{permission:this.permission}},[e("p",[e("code",["slots().default"]),"：permission granted"])])])}},c=(i(407),i(43)),a=Object(c.a)(t,void 0,void 0,!1,null,null,null);e.default=a.exports}}]);