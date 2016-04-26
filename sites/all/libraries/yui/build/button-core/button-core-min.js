/*
YUI 3.7.3 (build 5687)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("button-core",function(e,t){function r(e){this.initializer(e)}var n=e.ClassNameManager.getClassName;r.prototype={TEMPLATE:"<button/>",constructor:r,initializer:function(e){this._initNode(e),this._initAttributes(e),this._renderUI(e)},_initNode:function(t){t.host?this._host=e.one(t.host):this._host=e.Node.create(this.TEMPLATE)},_initAttributes:function(t){var n=this._host,i=n.one("."+r.CLASS_NAMES.LABEL)||n;t.label=t.label||this._getLabel(i),e.AttributeCore.call(this,r.ATTRS,t)},_renderUI:function(e){var t=this.getNode(),n=t.get("tagName").toLowerCase();t.addClass(r.CLASS_NAMES.BUTTON),n!=="button"&&n!=="input"&&t.set("role","button")},enable:function(){this.set("disabled",!1)},disable:function(){this.set("disabled",!0)},getNode:function(){return this._host},_getLabel:function(){var e=this.getNode(),t=e.get("tagName").toLowerCase(),n;return t==="input"?n=e.get("value"):n=(e.one("."+r.CLASS_NAMES.LABEL)||e).get("text"),n},_uiSetLabel:function(e){var t=this.getNode(),n=t.get("tagName").toLowerCase();return n==="input"?t.set("value",e):(t.one("."+r.CLASS_NAMES.LABEL)||t).set("text",e),e},_uiSetDisabled:function(e){var t=this.getNode();return t.getDOMNode().disabled=e,t.toggleClass(r.CLASS_NAMES.DISABLED,e),e}},r.ATTRS={label:{setter:"_uiSetLabel",getter:"_getLabel",lazyAdd:!1},disabled:{value:!1,setter:"_uiSetDisabled",lazyAdd:!1}},r.NAME="button",r.CLASS_NAMES={BUTTON:n("button"),DISABLED:n("button","disabled"),SELECTED:n("button","selected"),LABEL:n("button","label")},r.ARIA_STATES={PRESSED:"aria-pressed",CHECKED:"aria-checked"},r.ARIA_ROLES={BUTTON:"button",CHECKBOX:"checkbox",TOGGLE:"toggle"},e.mix(r.prototype,e.AttributeCore.prototype),e.ButtonCore=r},"3.7.3",{requires:["attribute-core","classnamemanager","node-base"]});
