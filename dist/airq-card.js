/*! For license information please see airq-card.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class r{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const a=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new r(s,t,i)},o=(i,s)=>{if(e)i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:m,getPrototypeOf:u}=Object,p=globalThis,g=p.trustedTypes,_=g?g.emptyScript:"",f=p.reactiveElementPolyfillSupport,b=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!l(t,e),y={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;class A extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);r?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...d(t),...m(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return o(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s,this[s]=r.fromAttribute(e,t.type)??this._$Ej?.get(s)??null,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,r=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==r||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(t){}firstUpdated(t){}}A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[b("elementProperties")]=new Map,A[b("finalized")]=new Map,f?.({ReactiveElement:A}),(p.reactiveElementVersions??=[]).push("2.1.0");const x=globalThis,w=x.trustedTypes,S=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+C,P=`<${T}>`,N=document,M=()=>N.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,R="[ \t\n\f\r]",k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,L=/>/g,j=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,B=/"/g,q=/^(?:script|style|textarea|title)$/i,D=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=D(1),I=(D(2),D(3),Symbol.for("lit-noChange")),V=Symbol.for("lit-nothing"),W=new WeakMap,Z=N.createTreeWalker(N,129);function K(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let r,a=2===e?"<svg>":3===e?"<math>":"",o=k;for(let e=0;e<i;e++){const i=t[e];let n,l,h=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===k?"!--"===l[1]?o=H:void 0!==l[1]?o=L:void 0!==l[2]?(q.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=j):void 0!==l[3]&&(o=j):o===j?">"===l[0]?(o=r??k,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,n=l[1],o=void 0===l[3]?j:'"'===l[3]?B:z):o===B||o===z?o=j:o===H||o===L?o=k:(o=j,r=void 0);const d=o===j&&t[e+1].startsWith("/>")?" ":"";a+=o===k?i+P:h>=0?(s.push(n),i.slice(0,h)+E+i.slice(h)+C+d):i+C+(-2===h?e:d)}return[K(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,a=0;const o=t.length-1,n=this.parts,[l,h]=G(t,e);if(this.el=J.createElement(l,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Z.nextNode())&&n.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=h[a++],i=s.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?et:"?"===o[1]?it:"@"===o[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(C)&&(n.push({type:6,index:r}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),Z.nextNode(),n.push({type:2,index:++r});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===T)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)n.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const i=N.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===I)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const a=O(e)?void 0:e._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??N).importNode(e,!0);Z.currentNode=s;let r=Z.nextNode(),a=0,o=0,n=i[0];for(;void 0!==n;){if(a===n.index){let e;2===n.type?e=new Y(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new rt(r,this,t)),this._$AV.push(e),n=i[++o]}a!==n?.index&&(r=Z.nextNode(),a++)}return Z.currentNode=N,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),O(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new J(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Y(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let a=!1;if(void 0===r)t=Q(this,t,e,0),a=!O(t)||t!==this._$AH&&t!==I,a&&(this._$AH=t);else{const s=t;let o,n;for(t=r[0],o=0;o<r.length-1;o++)n=Q(this,s[i+o],e,o),n===I&&(n=this._$AH[o]),a||=!O(n)||n!==this._$AH[o],n===V?t=V:t!==V&&(t+=(n??"")+r[o+1]),this._$AH[o]=n}a&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class st extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??V)===I)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(J,Y),(x.litHtmlVersions??=[]).push("3.3.0");const ot=globalThis;class nt extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Y(e.insertBefore(M(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const lt=ot.litElementPolyfillSupport;lt?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.0");const ht={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},ct=(t=ht,e,i)=>{const{kind:s,metadata:r}=i;let a=globalThis.litPropertyMetadata.get(r);if(void 0===a&&globalThis.litPropertyMetadata.set(r,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t)}}throw Error("Unsupported decorator location: "+s)};function dt(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}var mt,ut,pt;(pt=mt||(mt={})).language="language",pt.system="system",pt.comma_decimal="comma_decimal",pt.decimal_comma="decimal_comma",pt.space_comma="space_comma",pt.none="none",function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ut||(ut={})),new Set(["fan","input_boolean","light","switch","group","automation"]);var gt=function(t,e,i,s){s=s||{},i=null==i?{}:i;var r=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return r.detail=i,t.dispatchEvent(r),r};new Set(["call-service","divider","section","weblink","cast","select"]);var _t=function(t,e,i,s){var r,a=arguments.length,o=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(o=(a<3?r(o):a>3?r(e,i,o):r(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o};let ft=class extends nt{constructor(){super(...arguments),this._settingsSchema=[{name:"title",selector:{text:{}}},{name:"room",selector:{text:{}}},{name:"columns",selector:{number:{min:1,step:1,mode:"box"}}}],this._temperatureRangeToggleSchema=[{name:"temperature_optimal_range_enabled",selector:{boolean:{}}}],this._betterThermostatToggleSchema=[{name:"better_thermostat_enabled",selector:{boolean:{}}}],this._betterThermostatEntitySchema=[{name:"better_thermostat_entity",selector:{entity:{domain:"climate"}}}],this._betterThermostatToleranceSchema=[{name:"better_thermostat_tolerance",required:!0,selector:{number:{min:.1,max:2,step:.1,mode:"box"}}}],this._temperatureScalePaddingSchema=[{name:"temperature_scale_padding",required:!0,selector:{number:{min:1,max:15,step:1,mode:"slider"}}}],this._temperatureRangeSchema=[{name:"temperature_optimal_min",selector:{number:{mode:"box",step:.1}}},{name:"temperature_optimal_max",selector:{number:{mode:"box",step:.1}}}]}setConfig(t){this._config={...t,better_thermostat_tolerance:t.better_thermostat_tolerance??1,temperature_scale_padding:t.temperature_scale_padding??10,temperature_optimal_range_enabled:!t.better_thermostat_enabled&&t.temperature_optimal_range_enabled}}_computeLabel(t){return{title:"Title",room:"Room (optional)",columns:"Number of columns (leave blank for automatic)",temperature_optimal_range_enabled:"Eigenen Optimalbereich verwenden",temperature_optimal_min:"Optimalbereich min (°C)",temperature_optimal_max:"Optimalbereich max (°C)",better_thermostat_enabled:"Better Thermostat nutzen",better_thermostat_entity:"",better_thermostat_tolerance:"Toleranz um den Sollwert (°C)",temperature_scale_padding:"Temperaturskala-Bereich"}[t.name]??t.name}_computeHelper(t){return"temperature_scale_padding"===t.name?"Erweitert den Optimalbereich auf beiden Seiten um den gewählten Wert (z. B. 10 °C darunter und darüber).":void 0}_getBetterThermostatTarget(){const t=this._config.better_thermostat_entity,e=t?this.hass.states[t]:void 0;if(!e||"unavailable"===e.state)return;const i=e.attributes.temperature;if("number"!=typeof i&&"string"!=typeof i)return;const s=Number(i);return Number.isFinite(s)?s:void 0}_hasValidTemperatureRange(){const t=this._config.temperature_optimal_min,e=this._config.temperature_optimal_max;return void 0!==t&&void 0!==e&&Number.isFinite(t)&&Number.isFinite(e)&&t<e}_settingsChanged(t){const e={...this._config,...t.detail.value};null==e.better_thermostat_tolerance&&(e.better_thermostat_tolerance=this._config.better_thermostat_tolerance??1),null==e.temperature_scale_padding&&(e.temperature_scale_padding=this._config.temperature_scale_padding??10);const i=e.temperature_optimal_range_enabled&&!this._config.temperature_optimal_range_enabled;e.better_thermostat_enabled&&!this._config.better_thermostat_enabled?e.temperature_optimal_range_enabled=!1:i&&(e.better_thermostat_enabled=!1),e.better_thermostat_enabled&&e.temperature_optimal_range_enabled&&(e.temperature_optimal_range_enabled=!1),this._config=e,gt(this,"config-changed",{config:this._config})}render(){return this.hass&&this._config?F`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._settingsSchema}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._settingsChanged}
        ></ha-form>
        ${["co2","voc","pm25","temperature","humidity","rating"].map((t=>F`
            <div class="sensor-entry">
              <label>${t.toUpperCase()}</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${this._config.entities?.[t]||""}
                .configValue=${t}
                @value-changed=${e=>{this._config.entities={...this._config.entities,[t]:e.detail.value},gt(this,"config-changed",{config:this._config})}}
                allow-custom-entity
              ></ha-entity-picker>
              ${"temperature"===t?F`
                <ha-form
                  class="temperature-range-toggle"
                  .hass=${this.hass}
                  .data=${this._config}
                  .schema=${this._temperatureRangeToggleSchema}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${this._settingsChanged}
                ></ha-form>
                ${this._config.temperature_optimal_range_enabled?F`
                  <ha-form
                    .hass=${this.hass}
                    .data=${this._config}
                    .schema=${this._temperatureRangeSchema}
                    .computeLabel=${this._computeLabel}
                    @value-changed=${this._settingsChanged}
                  ></ha-form>
                  ${this._hasValidTemperatureRange()?"":F`
                    <ha-alert alert-type="warning">
                      Bitte beide Temperaturwerte eingeben. Der untere Wert muss kleiner als der obere sein.
                    </ha-alert>
                  `}
                `:""}
                <ha-form
                  class="better-thermostat-toggle"
                  .hass=${this.hass}
                  .data=${this._config}
                  .schema=${this._betterThermostatToggleSchema}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${this._settingsChanged}
                ></ha-form>
                ${this._config.better_thermostat_enabled?F`
                  <ha-form
                    class="better-thermostat-entity"
                    .hass=${this.hass}
                    .data=${this._config}
                    .schema=${this._betterThermostatEntitySchema}
                    .computeLabel=${this._computeLabel}
                    @value-changed=${this._settingsChanged}
                  ></ha-form>
                  ${void 0===this._getBetterThermostatTarget()?F`
                    <ha-alert alert-type="warning">
                      Bitte eine Climate-Entität mit einem gültigen Attribut „temperature“ auswählen.
                    </ha-alert>
                  `:""}
                  <ha-form
                    .hass=${this.hass}
                    .data=${this._config}
                    .schema=${this._betterThermostatToleranceSchema}
                    .computeLabel=${this._computeLabel}
                    @value-changed=${this._settingsChanged}
                  ></ha-form>
                `:""}
                <ha-form
                  class="temperature-scale-slider"
                  .hass=${this.hass}
                  .data=${this._config}
                  .schema=${this._temperatureScalePaddingSchema}
                  .computeLabel=${this._computeLabel}
                  .computeHelper=${this._computeHelper}
                  @value-changed=${this._settingsChanged}
                ></ha-form>
              `:""}
            </div>
          `))}
      </div>
    `:F``}};ft.styles=a`
    .sensor-entry {
      margin-bottom: 12px;
      padding: 6px;
      border: 1px solid #ddd;
      border-radius: 6px;
    }
    .temperature-range-toggle {
      display: block;
      margin-top: 24px;
    }
    .better-thermostat-toggle,
    .better-thermostat-entity {
      display: block;
      margin-top: 24px;
    }
    .temperature-scale-slider {
      display: block;
      margin-top: 24px;
    }
    .sensor-entry label {
      display: block;
      font-weight: bold;
      margin-bottom: 4px;
    }
  `,_t([dt({attribute:!1})],ft.prototype,"hass",void 0),_t([dt({state:!0,attribute:!1})],ft.prototype,"_config",void 0),ft=_t([(t=>(e,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)})("airq-card-editor")],ft);var bt=function(t,e,i,s){var r,a=arguments.length,o=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(o=(a<3?r(o):a>3?r(e,i,o):r(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o};console.info("%c AIRQ CARD  v1.1 ","color: white; background: green; font-weight: bold;");const $t={co2:{min:400,max:1e3,unit:"ppm",icon:"mdi:molecule-co2",absoluteMin:400,absoluteMax:1300},voc:{min:0,max:500,unit:"ppb",icon:"mdi:chemical-weapon",absoluteMin:0,absoluteMax:1e3},pm25:{min:0,max:35,unit:"µg/m³",icon:"mdi:blur",absoluteMin:0,absoluteMax:50},temperature:{min:18,max:26,unit:"°C",icon:"mdi:thermometer",absoluteMin:-20,absoluteMax:60},humidity:{min:30,max:60,unit:"%",icon:"mdi:water-percent",absoluteMin:0,absoluteMax:100}},vt=[{max:5,label:"Sehr gut",range:"0–5",color:"#2e7d32",gradientStart:0},{max:10,label:"Gut",range:"5–10",color:"#8bc34a",gradientStart:5},{max:15,label:"Mäßig",range:"10–15",color:"#fbc02d",gradientStart:10},{max:25,label:"Schlecht",range:"15–25",color:"#fb8c00",gradientStart:15},{max:50,label:"Sehr schlecht",range:"25–50",color:"#e53935",gradientStart:25,includeMax:!0},{max:1/0,label:"Kritisch",range:"> 50",color:"#7f0000",gradientStart:50.001}];function yt(t){return vt.find((e=>e.includeMax?t<=e.max:t<e.max))??vt[vt.length-1]}const At={excellent:"excellent",ausgezeichnet:"excellent",good:"good",gut:"good",moderate:"moderate",mäßig:"moderate",maessig:"moderate",poor:"poor",schlecht:"poor",unhealthy:"unhealthy",ungesund:"unhealthy"},xt={excellent:"Ausgezeichnet",good:"Gut",moderate:"Mäßig",poor:"Schlecht",unhealthy:"Ungesund"};class wt extends nt{setConfig(t){if(!t.entities)throw new Error("Entities required");if(void 0!==t.columns&&(!Number.isInteger(t.columns)||t.columns<1))throw new Error("Columns must be a positive integer");const e=t.better_thermostat_tolerance??1;if(!Number.isFinite(e)||e<.1||e>2)throw new Error("Better Thermostat tolerance must be between 0.1 and 2.0 °C");const i=t.temperature_scale_padding??10;if(!Number.isInteger(i)||i<1||i>15)throw new Error("Temperature scale padding must be an integer between 1 and 15 °C");this.config={...t,better_thermostat_tolerance:e,temperature_scale_padding:i,temperature_optimal_range_enabled:!t.better_thermostat_enabled&&t.temperature_optimal_range_enabled}}static getConfigElement(){return Promise.resolve(document.createElement("airq-card-editor"))}static getStubConfig(){return{type:"custom:airq-card",title:"Luftqualität",entities:{}}}_getBetterThermostatTarget(){const t=this.config.better_thermostat_entity,e=t?this.hass.states[t]:void 0;if(!e||"unavailable"===e.state)return;const i=e.attributes.temperature;if("number"!=typeof i&&"string"!=typeof i)return;const s=Number(i);return Number.isFinite(s)?s:void 0}renderBar(t,e){if(!e)return F``;const i=this.hass.states[e];if(!i||"unavailable"===i.state)return F``;const s=i.state,r=Number(s),a=(this.hass,(Math.round(100*(r+Number.EPSILON))/100).toFixed(2));console.log("Raw:",s,"Numeric:",r,"Formatted:",a);const o=i.attributes.friendly_name||t.toUpperCase(),n=$t[t],l=this.config._customThresholds?.[t]||{},h="temperature"===t&&!0===this.config.better_thermostat_enabled,c=h?this._getBetterThermostatTarget():void 0,d=this.config.better_thermostat_tolerance??1,m=this.config.temperature_scale_padding??10;let u="temperature"===t?n.min:l.min??n.min,p="temperature"===t?n.max:l.max??n.max;if(h&&void 0!==c)u=c-d,p=c+d;else if("temperature"===t&&this.config.temperature_optimal_range_enabled){const t=this.config.temperature_optimal_min,e=this.config.temperature_optimal_max;void 0!==t&&void 0!==e&&Number.isFinite(t)&&Number.isFinite(e)&&t<e?(u=t,p=e):(u=n.min,p=n.max)}const g="temperature"===t?u-m:l.min??n.absoluteMin,_="temperature"===t?p+m:l.max??n.absoluteMax,f=n.unit,b=n.icon,$="pm25"===t&&Number.isFinite(r)?yt(r):void 0,v=$?`${o} — ${$.label}: ${$.range} ${f}`:h&&void 0===c?`${o} — Better Thermostat: Zieltemperatur nicht verfügbar`:`${o} — optimal (${u}–${p} ${f})`,y=Math.max(0,Math.min(100,(r-g)/(_-g)*100)),A="pm25"===t&&Number.isFinite(r)?function(t,e,i){if(Number.isFinite(t)&&Number.isFinite(e)&&!(e<=t))return`linear-gradient(to right, ${[{value:t,color:yt(t).color},...vt.filter((i=>i.gradientStart>t&&i.gradientStart<e)).map((t=>({value:t.gradientStart,color:t.color}))),{value:e,color:i>50&&e<=50?vt[vt.length-1].color:yt(e).color}].map((i=>`${i.color} ${(i.value-t)/(e-t)*100}%`)).join(", ")})`}(g,_,r):void 0,x=h&&void 0!==c?function(t,e,i,s){if(!Number.isFinite(t)||!Number.isFinite(e)||!Number.isFinite(i)||!Number.isFinite(s)||e<=t)return;const r=i-s,a=i+s,o="#2196f3",n="#2e7d32",l="#fbc02d",h="#fb8c00",c="#e53935",d="#7f0000";let m;if(a<=t){const i=e-t;m=[{value:t,color:l},{value:t+i/3,color:h},{value:t+2*i/3,color:c},{value:e,color:d}]}else if(r>e)m=[{value:t,color:"#0d47a1"},{value:e,color:o}];else if(m=[{value:t,color:r>t?o:n}],r>t&&r<e&&m.push({value:r,color:o},{value:r,color:n}),a<e){const t=e-a;m.push({value:a,color:n},{value:a,color:l},{value:a+t/3,color:h},{value:a+2*t/3,color:c},{value:e,color:d})}else m.push({value:e,color:n});return`linear-gradient(to right, ${m.map((i=>`${i.color} ${(i.value-t)/(e-t)*100}%`)).join(", ")})`}(g,_,c,d):void 0,w=A??x;return F`
      <div
        class="bar-container"
        @click=${()=>gt(this,"hass-more-info",{entityId:e})}
        style="cursor: pointer;"
        title="${v}"
      >
        <ha-icon class="icon" icon="${b}"></ha-icon>
        <div class="bar-wrapper">
          <div class="value-above">${a} ${f}</div>


          <div class="bar">
            <div class="gradient" style=${w?`background: ${w};`:""}></div>
            <div class="mask" style="left: ${y}%; right: 0;"></div>
          </div>
          <div class="tooltip">${v}</div>
        </div>
      </div>
    `}isValueHealthy(t,e,i){return t>=e&&t<=i}render(){const{title:t,room:e,entities:i}=this.config,s=this.config.show_bars??Object.keys(i),r=s.filter((t=>$t[t])).map((t=>this.renderBar(t,i[t]))),a=(s.filter((t=>$t[t])).every((t=>{const e=i[t],s=e?this.hass.states[e]:void 0;if(!s||"unavailable"===s.state)return!1;const r=parseFloat(s.state),{min:a,max:o}=$t[t];return this.isValueHealthy(r,a,o)})),i.rating);let o="",n="moderate";if(a&&this.hass.states[a]){o=this.hass.states[a].state??"";const t=o.toLowerCase().trim();t&&Object.prototype.hasOwnProperty.call(At,t)?n=At[t]:console.warn(`[AirQualityCard] Unknown air quality rating: "${o}" — defaulting to "moderate"`)}const l=o?xt[n]||o:"",h=[[t,e].filter(Boolean).join(" "),l].filter(Boolean).join(" - ");return F`
      <ha-card>
        <div class="card-wrapper">
          <div class="header">
            <div class="title">${h}</div>
          </div>
          <div
            class="attributes"
            style=${this.config.columns?`grid-template-columns: repeat(${this.config.columns}, minmax(0, 1fr));`:""}
          >
            ${r}
          </div>
        </div>
      </ha-card>
    `}}wt.styles=a`
    ha-card {
      padding: 15px;
      overflow: visible;
      max-width: 100%;
      box-sizing: border-box;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .title {
      color: var(--ha-card-header-color, var(--primary-text-color));
      font-family: var(--ha-card-header-font-family, inherit);
      font-size: var(--ha-card-header-font-size, var(--ha-font-size-2xl));
      letter-spacing: -0.012em;
      line-height: var(--ha-line-height-condensed);
      font-weight: var(--ha-font-weight-normal);
    }
    .attributes {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 12px;
      width: 100%;
    }
    .bar-container {
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;
    }
    .icon {
      margin-right: 8px;
      font-size: 24px;
    }
    .bar {
      flex-grow: 1;
      height: 10px;
      border-radius: 3px;
      background: var(--primary-background-color);
      position: relative;
      overflow: hidden;
    }
    .value-above {
    text-align: right;
    font-size: 12px;
    color: var(--secondary-text-color);
    margin-bottom: 6px;
    padding-right: 2px;
    }

    .gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right,
        #1e8449 0%,
        #27ae60 25%,
        #2ecc71 50%,
        #f1c40f 60%,
        #e67e22 75%,
        #c0392b 90%,
        #922b21 100%);
      z-index: 1;
    }

    .mask {
      position: absolute;
      top: 0;
      bottom: 0;
      background: var(--primary-background-color);
      z-index: 2;
      right: 0;
    }

    .bar-wrapper {
      position: relative;
      flex-grow: 1;
    }

    .tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-8px);
      background: #555;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s;
      z-index: 10;
    }

    .bar-wrapper:hover .tooltip {
      visibility: visible;
      opacity: 1;
    }
  `,bt([dt({attribute:!1})],wt.prototype,"hass",void 0),bt([dt()],wt.prototype,"config",void 0),customElements.get("airq-card")||customElements.define("airq-card",wt),window.customCards=window.customCards||[],window.customCards.push({type:"airq-card",name:"Luftqualität",description:"Zeigt Luftqualitätssensoren mit Wertebereichen und Farbverläufen.",preview:!0}),console.info("🧪 Registering card..."),customElements.whenDefined("airq-card").then((()=>{console.info("✅ airq-card is defined and ready.")})),customElements.get("airq-card")?console.info("✅ airq-card already defined"):(console.warn("🚨 airq-card not defined yet, defining now..."),customElements.define("airq-card",wt))})();