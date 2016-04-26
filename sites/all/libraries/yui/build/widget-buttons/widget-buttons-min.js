/*
YUI 3.7.3 (build 5687)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-buttons",function(e,t){function p(e){return!!e.getDOMNode}function d(){this._stdModNode||e.error("WidgetStdMod must be added to a Widget before WidgetButtons."),this._buttonsHandles={}}var n=e.Array,r=e.Lang,i=e.Object,s=e.Plugin.Button,o=e.Widget,u=e.WidgetStdMod,a=e.ClassNameManager.getClassName,f=r.isArray,l=r.isNumber,c=r.isString,h=r.isValue;d.ATTRS={buttons:{getter:"_getButtons",setter:"_setButtons",value:{}},defaultButton:{readOnly:!0,value:null}},d.CLASS_NAMES={button:a("button"),buttons:o.getClassName("buttons"),primary:a("button","primary")},d.HTML_PARSER={buttons:function(e){return this._parseButtons(e)}},d.NON_BUTTON_NODE_CFG=["action","classNames","context","events","isDefault","section"],d.prototype={BUTTONS:{},BUTTONS_TEMPLATE:"<span />",DEFAULT_BUTTONS_SECTION:u.FOOTER,initializer:function(){this._mapButtons(this.get("buttons")),this._updateDefaultButton(),this.after({buttonsChange:e.bind("_afterButtonsChange",this),defaultButtonChange:e.bind("_afterDefaultButtonChange",this)}),e.after(this._bindUIButtons,this,"bindUI"),e.after(this._syncUIButtons,this,"syncUI")},destructor:function(){i.each(this._buttonsHandles,function(e){e.detach()}),delete this._buttonsHandles,delete this._buttonsMap,delete this._defaultButton},addButton:function(e,t,r){var i=this.get("buttons"),s,o;return p(e)||(e=this._mergeButtonConfig(e),t||(t=e.section)),t||(t=this.DEFAULT_BUTTONS_SECTION),s=i[t]||(i[t]=[]),l(r)||(r=s.length),s.splice(r,0,e),o=n.indexOf(s,e),this.set("buttons",i,{button:e,section:t,index:o,src:"add"}),this},getButton:function(e,t){if(!h(e))return;var n=this._buttonsMap,r;return t||(t=this.DEFAULT_BUTTONS_SECTION),l(e)?(r=this.get("buttons"),r[t]&&r[t][e]):arguments.length>1?n[t+":"+e]:n[e]},removeButton:function(e,t){if(!h(e))return this;var r=this.get("buttons"),s;return l(e)?(t||(t=this.DEFAULT_BUTTONS_SECTION),s=e,e=r[t][s]):(c(e)&&(e=this.getButton.apply(this,arguments)),i.some(r,function(r,i){s=n.indexOf(r,e);if(s>-1)return t=i,!0})),e&&s>-1&&(r[t].splice(s,1),this.set("buttons",r,{button:e,section:t,index:s,src:"remove"})),this},_bindUIButtons:function(){var t=e.bind("_afterContentChangeButtons",this);this.after({visibleChange:e.bind("_afterVisibleChangeButtons",this),headerContentChange:t,bodyContentChange:t,footerContentChange:t})},_createButton:function(t){var r,i,o,u,a,f,l,h;if(p(t))return e.one(t.getDOMNode()).plug(s);r=e.merge({context:this,events:"click",label:t.value},t),i=e.merge(r),o=d.NON_BUTTON_NODE_CFG;for(u=0,a=o.length;u<a;u+=1)delete i[o[u]];return t=s.createNode(i),l=r.context,f=r.action,c(f)&&(f=e.bind(f,l)),h=t.on(r.events,f,l),this._buttonsHandles[e.stamp(t,!0)]=h,t.setData("name",this._getButtonName(r)),t.setData("default",this._getButtonDefault(r)),n.each(n(r.classNames),t.addClass,t),t},_getButtonContainer:function(t,n){var r=u.SECTION_CLASS_NAMES[t],i=d.CLASS_NAMES.buttons,s=this.get("contentBox"),o,a;return o="."+r+" ."+i,a=s.one(o),!a&&n&&(a=e.Node.create(this.BUTTONS_TEMPLATE),a.addClass(i)),a},_getButtonDefault:function(e){var t=p(e)?e.getData("default"):e.isDefault;return c(t)?t.toLowerCase()==="true":!!t},_getButtonName:function(e){var t;return p(e)?t=e.getData("name")||e.get("name"):t=e&&(e.name||e.type),t},_getButtons:function(e){var t={};return i.each(e,function(e,n){t[n]=e.concat()}),t},_mapButton:function(e,t){var n=this._buttonsMap,r=this._getButtonName(e),i=this._getButtonDefault(e);r&&(n[r]=e,n[t+":"+r]=e),i&&(this._defaultButton=e)},_mapButtons:function(e){this._buttonsMap={},this._defaultButton=null,i.each(e,function(e,t){var n,r;for(n=0,r=e.length;n<r;n+=1)this._mapButton(e[n],t)},this)},_mergeButtonConfig:function(t){var n,r,i,s,o,u;return t=c(t)?{name:t}:e.merge(t),t.srcNode&&(s=t.srcNode,o=s.get("tagName").toLowerCase(),u=s.get(o==="input"?"value":"text"),n={disabled:!!s.get("disabled"),isDefault:this._getButtonDefault(s),name:this._getButtonName(s)},u&&(n.label=u),e.mix(t,n,!1,null,0,!0)),i=this._getButtonName(t),r=this.BUTTONS&&this.BUTTONS[i],r&&e.mix(t,r,!1,null,0,!0),t},_parseButtons:function(e){var t="."+d.CLASS_NAMES.button,r=["header","body","footer"],i=null;return n.each(r,function(e){var n=this._getButtonContainer(e),r=n&&n.all(t),s;if(!r||r.isEmpty())return;s=[],r.each(function(e){s.push({srcNode:e})}),i||(i={}),i[e]=s},this),i},_setButtons:function(e){function r(e,r){if(!f(e))return;var i,s,o,u;for(i=0,s=e.length;i<s;i+=1)o=e[i],u=r,p(o)||(o=this._mergeButtonConfig(o),u||(u=o.section)),o=this._createButton(o),u||(u=t),(n[u]||(n[u]=[])).push(o)}var t=this.DEFAULT_BUTTONS_SECTION,n={};return f(e)?r.call(this,e):i.each(e,r,this),n},_syncUIButtons:function(){this._uiSetButtons(this.get("buttons")),this._uiSetDefaultButton(this.get("defaultButton")),this._uiSetVisibleButtons(this.get("visible"))},_uiInsertButton:function(e,t,n){var r=d.CLASS_NAMES.button,i=this._getButtonContainer(t,!0),s=i.all("."+r);i.insertBefore(e,s.item(n)),this.setStdModContent(t,i,"after")},_uiRemoveButton:function(t,n,r){var i=e.stamp(t,this),s=this._buttonsHandles,o=s[i],u,a;o&&o.detach(),delete s[i],t.remove(),r||(r={}),r.preserveContent||(u=this._getButtonContainer(n),a=d.CLASS_NAMES.button,u&&u.all("."+a).isEmpty()&&(u.remove(),this._updateContentButtons(n)))},_uiSetButtons:function(e){var t=d.CLASS_NAMES.button,r=["header","body","footer"];n.each(r,function(n){var r=e[n]||[],i=r.length,s=this._getButtonContainer(n,i),o=!1,u,a,f,l;if(!s)return;u=s.all("."+t);for(a=0;a<i;a+=1)f=r[a],l=u.indexOf(f),l>-1?(u.splice(l,1),l!==a&&(s.insertBefore(f,a+1),o=!0)):(s.appendChild(f),o=!0);u.each(function(e){this._uiRemoveButton(e,n,{preserveContent:!0}),o=!0},this);if(i===0){s.remove(),this._updateContentButtons(n);return}o&&this.setStdModContent(n,s,"after")},this)},_uiSetDefaultButton:function(e,t){var n=d.CLASS_NAMES.primary;e&&e.addClass(n),t&&t.removeClass(n)},_uiSetVisibleButtons:function(e){if(!e)return;var t=this.get("defaultButton");t&&t.focus()},_unMapButton:function(e,t){var n=this._buttonsMap,r=this._getButtonName(e),i;r&&(n[r]===e&&delete n[r],i=t+":"+r,n[i]===e&&delete n[i]),this._defaultButton===e&&(this._defaultButton=null)},_updateDefaultButton:function(){var e=this._defaultButton;this.get("defaultButton")!==e&&this._set("defaultButton",e)},_updateContentButtons:function(e){var t=this.getStdModNode(e).get("childNodes");this.set(e+"Content",t.isEmpty()?null:t,{src:"buttons"})},_afterButtonsChange:function(e){var t=e.newVal,n=e.section,r=e.index,i=e.src,s;if(i==="add"){s=t[n][r],this._mapButton(s,n),this._updateDefaultButton(),this._uiInsertButton(s,n,r);return}if(i==="remove"){s=e.button,this._unMapButton(s,n),this._updateDefaultButton(),this._uiRemoveButton(s,n);return}this._mapButtons(t),this._updateDefaultButton(),this._uiSetButtons(t)},_afterContentChangeButtons:function(e){var t=e.src,n=e.stdModPosition,r=!n||n===u.REPLACE;r&&t!=="buttons"&&t!==o.UI_SRC&&this._uiSetButtons(this.get("buttons"))},_afterDefaultButtonChange:function(e){this._uiSetDefaultButton(e.newVal,e.prevVal)},_afterVisibleChangeButtons:function(e){this._uiSetVisibleButtons(e.newVal)}},e.WidgetButtons=d},"3.7.3",{requires:["button-plugin","cssbutton","widget-stdmod"]});
