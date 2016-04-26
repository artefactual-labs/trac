/*
YUI 3.7.3 (build 5687)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("node-focusmanager",function(e,t){var n="activeDescendant",r="id",i="disabled",s="tabIndex",o="focused",u="focusClass",a="circular",f="UI",l="key",c=n+"Change",h="host",p={37:!0,38:!0,39:!0,40:!0},d={a:!0,button:!0,input:!0,object:!0},v=e.Lang,m=e.UA,g=function(){g.superclass.constructor.apply(this,arguments)};g.ATTRS={focused:{value:!1,readOnly:!0},descendants:{getter:function(e){return this.get(h).all(e)}},activeDescendant:{setter:function(t){var n=v.isNumber,i=e.Attribute.INVALID_VALUE,s=this._descendantsMap,o=this._descendants,u,a,f;return n(t)?(u=t,a=u):t instanceof e.Node&&s?(u=s[t.get(r)],n(u)?a=u:a=i):a=i,o&&(f=o.item(u),f&&f.get("disabled")&&(a=i)),a}},keys:{value:{next:null,previous:null}},focusClass:{},circular:{value:!0}},e.extend(g,e.Plugin.Base,{_stopped:!0,_descendants:null,_descendantsMap:null,_focusedNode:null,_lastNodeIndex:0,_eventHandlers:null,_initDescendants:function(){var t=this.get("descendants"),o={},u=-1,a,f=this.get(n),l,c,h=0;v.isUndefined(f)&&(f=-1);if(t){a=t.size();for(h=0;h<a;h++)l=t.item(h),u===-1&&!l.get(i)&&(u=h),f<0&&parseInt(l.getAttribute(s,2),10)===0&&(f=h),l&&l.set(s,-1),c=l.get(r),c||(c=e.guid(),l.set(r,c)),o[c]=h;f<0&&(f=0),l=t.item(f);if(!l||l.get(i))l=t.item(u),f=u;this._lastNodeIndex=a-1,this._descendants=t,this._descendantsMap=o,this.set(n,f),l&&l.set(s,0)}},_isDescendant:function(e){return e.get(r)in this._descendantsMap},_removeFocusClass:function(){var e=this._focusedNode,t=this.get(u),n;t&&(n=v.isString(t)?t:t.className),e&&n&&e.removeClass(n)},_detachKeyHandler:function(){var e=this._prevKeyHandler,t=this._nextKeyHandler;e&&e.detach(),t&&t.detach()},_preventScroll:function(e){p[e.keyCode]&&this._isDescendant(e.target)&&e.preventDefault()},_fireClick:function(e){var t=e.target,n=t.get("nodeName").toLowerCase();e.keyCode===13&&(!d[n]||n==="a"&&!t.getAttribute("href"))&&t.simulate("click")},_attachKeyHandler:function(){this._detachKeyHandler();var t=this.get("keys.next"),n=this.get("keys.previous"),r=this.get(h),i=this._eventHandlers;n&&(this._prevKeyHandler=e.on(l,e.bind(this._focusPrevious,this),r,n)),t&&(this._nextKeyHandler=e.on(l,e.bind(this._focusNext,this),r,t)),m.opera&&i.push(r.on("keypress",this._preventScroll,this)),m.opera||i.push(r.on("keypress",this._fireClick,this))},_detachEventHandlers:function(){this._detachKeyHandler();var t=this._eventHandlers;t&&(e.Array.each(t,function(e){e.detach()}),this._eventHandlers=null)},_attachEventHandlers:function(){var t=this._descendants,n,r,i;t&&t.size()&&(n=this._eventHandlers||[],r=this.get(h).get("ownerDocument"),n.length===0&&(n.push(r.on("focus",this._onDocFocus,this)),n.push(r.on("mousedown",this._onDocMouseDown,this)),n.push(this.after("keysChange",this._attachKeyHandler)),n.push(this.after("descendantsChange",this._initDescendants)),n.push(this.after(c,this._afterActiveDescendantChange)),i=this.after("focusedChange",e.bind(function(e){e.newVal&&(this._attachKeyHandler(),i.detach())},this)),n.push(i)),this._eventHandlers=n)},_onDocMouseDown:function(e){var t=this.get(h),n=e.target,r=t.contains(n),i,s=function(e){var n=!1;return e.compareTo(t)||(n=this._isDescendant(e)?e:s.call(this,e.get("parentNode"))),n};r&&(i=s.call(this,n),i?n=i:!i&&this.get(o)&&(this._set(o,!1),this._onDocFocus(e))),r&&this._isDescendant(n)?this.focus(n):m.webkit&&this.get(o)&&(!r||r&&!this._isDescendant(n))&&(this._set(o,!1),this._onDocFocus(e))},_onDocFocus:function(e){var t=this._focusTarget||e.target,n=this.get(o),r=this.get(u),i=this._focusedNode,s;this._focusTarget&&(this._focusTarget=null),this.get(h).contains(t)?(s=this._isDescendant(t),!n&&s?n=!0:n&&!s&&(n=!1)):n=!1,r&&(i&&(!i.compareTo(t)||!n)&&this._removeFocusClass(),s&&n&&(r.fn?(t=r.fn(t),t.addClass(r.className)):t.addClass(r),this._focusedNode=t)),this._set(o,n)},_focusNext:function(e,t){var r=t||this.get(n),i;this._isDescendant(e.target)&&r<=this._lastNodeIndex&&(r+=1,r===this._lastNodeIndex+1&&this.get(a)&&(r=0),i=this._descendants.item(r),i&&(i.get("disabled")?this._focusNext(e,r):this.focus(r))),this._preventScroll(e)},_focusPrevious:function(e,t){var r=t||this.get(n),i;this._isDescendant(e.target)&&r>=0&&(r-=1,r===-1&&this.get(a)&&(r=this._lastNodeIndex),i=this._descendants.item(r),i&&(i.get("disabled")?this._focusPrevious(e,r):this.focus(r))),this._preventScroll(e)},_afterActiveDescendantChange:function(e){var t=this._descendants.item(e.prevVal);t&&t.set(s,-1),t=this._descendants.item(e.newVal),t&&t.set(s,0)},initializer:function(e){this.start()},destructor:function(){this.stop(),this.get(h).focusManager=null},focus:function(e){v.isUndefined(e)&&(e=this.get(n)),this.set(n,e,{src:f});var t=this._descendants.item(this.get(n));t&&(t.focus(),m.opera&&t.get("nodeName").toLowerCase()==="button"&&(this._focusTarget=t))},blur:function(){var e;this.get(o)&&(e=this._descendants.item(this.get(n)),e&&(e.blur(),this._removeFocusClass()),this._set(o,!1,{src:f}))},start:function(){this._stopped&&(this._initDescendants(),this._attachEventHandlers(),this._stopped=!1)},stop:function(){this._stopped||(this._detachEventHandlers(),this._descendants=null,this._focusedNode=null,this._lastNodeIndex=0,this._stopped=!0)},refresh:function(){this._initDescendants(),this._eventHandlers||this._attachEventHandlers()}}),g.NAME="nodeFocusManager",g.NS="focusManager",e.namespace("Plugin"),e.Plugin.NodeFocusManager=g},"3.7.3",{requires:["attribute","node","plugin","node-event-simulate","event-key","event-focus"]});
