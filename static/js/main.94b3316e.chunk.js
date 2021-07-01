(this["webpackJsonpmy-app"] = this["webpackJsonpmy-app"] || []).push([[0],{

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(24);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./src/index.css
var src = __webpack_require__(113);

// EXTERNAL MODULE: ./src/App.css
var App = __webpack_require__(114);

// EXTERNAL MODULE: ./node_modules/antd/dist/antd.css
var antd = __webpack_require__(115);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 1 modules
var slicedToArray = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__(77);

// EXTERNAL MODULE: ./node_modules/gpu.js/dist/gpu-browser.js
var gpu_browser = __webpack_require__(50);

// EXTERNAL MODULE: ./node_modules/antd/es/switch/index.js + 3 modules
var es_switch = __webpack_require__(210);

// EXTERNAL MODULE: ./node_modules/antd/es/slider/index.js + 14 modules
var slider = __webpack_require__(208);

// EXTERNAL MODULE: ./node_modules/antd/es/form/index.js + 48 modules
var es_form = __webpack_require__(207);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(16);

// CONCATENATED MODULE: ./src/lib/gpuRun.ts
var gpu=new gpu_browser["GPU"]();var gpuRun_GPURunner=/*#__PURE__*/function(){function GPURunner(N,width,hight){Object(classCallCheck["a" /* default */])(this,GPURunner);this.N=void 0;this.width=void 0;this.hight=void 0;this.max_distance=void 0;this.circleInfos=void 0;this.calculate=void 0;this.N=N;this.width=width;this.hight=hight;this.max_distance=hight>width?hight:width;this.circleInfos=[];this.calculate=this.newCalculate();}Object(createClass["a" /* default */])(GPURunner,[{key:"newCalculate",value:function newCalculate(){return gpu.createKernel(function(circleInfos,length){/* @ts-ignore */var a=this.constants.TWO_PI*(this.thread.z/1.00+Math.random())/this.constants.N;var cosA=Math.cos(a);var sinA=Math.sin(a);var x=this.thread.x;var y=this.thread.y;// 	/* @ts-ignore */
var dx=x-circleInfos[0][0][0];var dy=y-circleInfos[0][0][1];var st=Math.sqrt(dx*dx+dy*dy)-circleInfos[0][0][2];var distance=0;var lightIndex=-1;if(st<this.constants.MIN_STEP_LEN){return 0;}for(var i=0;i<this.constants.MAX_STEP&&distance<this.constants.max_distance;i++){// 	/* @ts-ignore */
var ox=x+distance*cosA;var oy=y+distance*sinA;for(var index=0;index<length;index++){var ddx=ox-circleInfos[index][0][0];var ddy=oy-circleInfos[index][0][1];var dt=Math.sqrt(ddx*ddx+ddy*ddy)-circleInfos[index][0][2];if(dt<st){st=dt;lightIndex=index;}}/* @ts-ignore */if(st<this.constants.MIN_STEP_LEN){return lightIndex;}distance=distance+st;}return-1;},{constants:{N:this.N,max_distance:this.max_distance,PI:Math.PI,TWO_PI:2*Math.PI,MIN_STEP_LEN:0.1,MAX_STEP:30},output:[this.hight,this.width,this.N]});}},{key:"init",value:function init(N,width,hight){this.N=N;this.width=width;this.hight=hight;this.max_distance=hight>width?hight:width;}},{key:"setN",value:function setN(N){this.N=N;this.calculate=this.newCalculate();}},{key:"setCircles",value:function setCircles(circleInfos){this.circleInfos=circleInfos;}},{key:"run",value:function run(){return this.calculate(this.circleInfos,this.circleInfos.length);}}]);return GPURunner;}();
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(9);

// CONCATENATED MODULE: ./src/page/light/GPUCircle.tsx
var GPUCircle_width=window.innerWidth;var GPUCircle_hight=window.innerHeight;var GPUCircle_gpu=new gpu_browser["GPU"]();function circleInfosToGPUCircle(infos){var ret=[];var _iterator=Object(createForOfIteratorHelper["a" /* default */])(infos),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var info=_step.value;ret.push([[info.x,info.y,info.r],[info.light.r,info.light.g,info.light.b]]);}}catch(err){_iterator.e(err);}finally{_iterator.f();}return ret;}var render=null;var initCanvas=function initCanvas(){render=GPUCircle_gpu.createKernel(function(circles,lightInfos,N){/* @ts-ignore */var r=0;var g=0;var b=0;for(var index=0;index<N;index++){var lightIndex=lightInfos[index][this.thread.x][this.thread.y];if(lightIndex>=0){r=r+circles[lightIndex][1][0];g=g+circles[lightIndex][1][1];b=b+circles[lightIndex][1][2];}}r=r/N;if(r>1){r=1;}g=g/N;if(g>1){g=1;}b=b/N;if(b>1){b=1;}this.color(r,g,b,1);}).setOutput([GPUCircle_width,GPUCircle_hight]).setGraphical(true);var dom=window.document.getElementById('GPUCircle');if(dom){dom.innerHTML='';dom.appendChild(render.canvas);}};/* @ts-ignore */var circleInfos=[];function addCircleInfos(info){circleInfos.push({x:info.x*GPUCircle_hight,y:info.y*GPUCircle_width,r:info.r*GPUCircle_hight,light:info.light});}addCircleInfos({x:1,y:1,r:0.1,light:{r:0,g:0,b:2}});var circleSDF=function circleSDF(x,y,info){var dx=x-info.x;var dy=y-info.y;return Math.sqrt(dx*dx+dy*dy)-info.r;};var GPUCircle_findCircle=function findCircle(x,y){var _iterator2=Object(createForOfIteratorHelper["a" /* default */])(circleInfos),_step2;try{for(_iterator2.s();!(_step2=_iterator2.n()).done;){var circleInfo=_step2.value;var r=circleSDF(x,y,circleInfo);if(r<=0){return circleInfo;}}}catch(err){_iterator2.e(err);}finally{_iterator2.f();}return null;};var number=5;for(var index=0;index<number;index++){addCircleInfos({x:0,y:0,r:0.1*Math.random(),light:{r:2*Math.random(),g:2*Math.random(),b:2*Math.random()}});}var GPUCircle_frame=function frame(runner){var gpuCircle=circleInfosToGPUCircle(circleInfos);runner.setCircles(gpuCircle);var lightInfo=runner.run();/* @ts-ignore */render(gpuCircle,lightInfo,runner.N);};var getXYFromEvent=function getXYFromEvent(event){var pageX=event.pageX,pageY=event.pageY;var x=GPUCircle_hight-pageY;var y=pageX;return{x:x,y:y};};var state="sleep";var GPUCircle_N=2;var selectCircle=null;function GPUCircle(){var _useState=Object(react["useState"])(false),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),openWindow=_useState2[0],setOpenWindow=_useState2[1];var runner=new gpuRun_GPURunner(GPUCircle_N,GPUCircle_width,GPUCircle_hight);function Run(){GPUCircle_frame(runner);window.requestAnimationFrame(Run);}var onNChange=function onNChange(value){GPUCircle_N=value;initCanvas();runner.setN(value);};var onClick=function onClick(event){var _getXYFromEvent=getXYFromEvent(event),x=_getXYFromEvent.x,y=_getXYFromEvent.y;selectCircle=GPUCircle_findCircle(x,y);};var onOpenWindow=function onOpenWindow(value){setOpenWindow(value);};var onMouseDown=function onMouseDown(event){var _getXYFromEvent2=getXYFromEvent(event),x=_getXYFromEvent2.x,y=_getXYFromEvent2.y;var circle=GPUCircle_findCircle(x,y);if(!circle){return;}state="start";selectCircle=circle;};var onMouseMove=function onMouseMove(event){if(state!=="start"||selectCircle===null){return;}var _getXYFromEvent3=getXYFromEvent(event),x=_getXYFromEvent3.x,y=_getXYFromEvent3.y;selectCircle.x=x;selectCircle.y=y;};var onMouseUp=function onMouseUp(event){if(state==="start"){state="sleep";}};Object(react["useEffect"])(function(){initCanvas();Run();});return/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{children:[/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{id:"GPUCircle",onClick:onClick,onMouseDown:onMouseDown,onMouseMove:onMouseMove,onMouseUp:onMouseUp}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"stop-bar",style:{background:"#fff"},children:[selectCircle&&/*#__PURE__*/Object(jsx_runtime["jsx"])(es_form["a" /* default */].Item,{label:"\u5F00\u542F\u64CD\u4F5C\u9762\u677F",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(es_switch["a" /* default */],{onChange:onOpenWindow})}),/*#__PURE__*/Object(jsx_runtime["jsx"])(es_form["a" /* default */].Item,{label:"\u6E32\u67D3\u8D28\u91CF",required:true,tooltip:"r",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(slider["a" /* default */],{min:1,max:60,onAfterChange:onNChange,defaultValue:GPUCircle_N})})]}),selectCircle&&openWindow&&/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{className:"tool-bar",children:/*#__PURE__*/Object(jsx_runtime["jsxs"])(es_form["a" /* default */],{labelCol:{span:4},wrapperCol:{span:18},children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(es_form["a" /* default */].Item,{label:"\u534A\u5F84r",required:true,tooltip:"r",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(slider["a" /* default */],{range:true,defaultValue:[0,100]})}),/*#__PURE__*/Object(jsx_runtime["jsx"])(es_form["a" /* default */].Item,{label:"R",required:true,tooltip:"R",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(slider["a" /* default */],{range:true,defaultValue:[0,100]})}),/*#__PURE__*/Object(jsx_runtime["jsx"])(es_form["a" /* default */].Item,{label:"G",required:true,tooltip:"G",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(slider["a" /* default */],{range:true,defaultValue:[0,100]})}),/*#__PURE__*/Object(jsx_runtime["jsx"])(es_form["a" /* default */].Item,{label:"B",required:true,tooltip:"B",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(slider["a" /* default */],{range:true,defaultValue:[0,100]})})]})})]});}
// CONCATENATED MODULE: ./src/App.tsx
function App_App(){return/*#__PURE__*/Object(jsx_runtime["jsx"])(jsx_runtime["Fragment"],{children:/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{className:"App",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(GPUCircle,{})})});}/* harmony default export */ var src_App = (App_App);
// CONCATENATED MODULE: ./src/reportWebVitals.ts
var reportWebVitals=function reportWebVitals(onPerfEntry){if(onPerfEntry&&onPerfEntry instanceof Function){__webpack_require__.e(/* import() */ 3).then(__webpack_require__.bind(null, 211)).then(function(_ref){var getCLS=_ref.getCLS,getFID=_ref.getFID,getFCP=_ref.getFCP,getLCP=_ref.getLCP,getTTFB=_ref.getTTFB;getCLS(onPerfEntry);getFID(onPerfEntry);getFCP(onPerfEntry);getLCP(onPerfEntry);getTTFB(onPerfEntry);});}};/* harmony default export */ var src_reportWebVitals = (reportWebVitals);
// CONCATENATED MODULE: ./src/index.tsx
react_dom_default.a.render(/*#__PURE__*/Object(jsx_runtime["jsx"])(react_default.a.StrictMode,{children:/*#__PURE__*/Object(jsx_runtime["jsx"])(src_App,{})}),document.getElementById('root'));// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
src_reportWebVitals();

/***/ })

},[[205,1,2]]]);
//# sourceMappingURL=main.94b3316e.chunk.js.map