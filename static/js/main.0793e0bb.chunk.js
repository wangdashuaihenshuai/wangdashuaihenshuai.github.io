(this["webpackJsonpmy-app"] = this["webpackJsonpmy-app"] || []).push([[0],{

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(6);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./src/index.css
var src = __webpack_require__(15);

// EXTERNAL MODULE: ./src/App.css
var App = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/gpu.js/dist/gpu-browser.js
var gpu_browser = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(9);

// CONCATENATED MODULE: ./src/lib/gpuRun.ts
var gpu=new gpu_browser["GPU"]();var gpuRun_GPURunner=/*#__PURE__*/function(){function GPURunner(N,width,hight){Object(classCallCheck["a" /* default */])(this,GPURunner);this.N=void 0;this.width=void 0;this.hight=void 0;this.max_distance=void 0;this.circleInfos=void 0;this.calculate=void 0;this.N=N;this.width=width;this.hight=hight;this.max_distance=hight>width?hight:width;this.circleInfos=[];this.calculate=this.newCalculate();}Object(createClass["a" /* default */])(GPURunner,[{key:"newCalculate",value:function newCalculate(){return gpu.createKernel(function(circleInfos,length){/* @ts-ignore */var a=this.constants.TWO_PI*(this.thread.z/1.00+Math.random())/this.constants.N;var cosA=Math.cos(a);var sinA=Math.sin(a);var x=this.thread.x;var y=this.thread.y;// 	/* @ts-ignore */
var dx=x-circleInfos[0][0][0];var dy=y-circleInfos[0][0][1];var st=Math.sqrt(dx*dx+dy*dy)-circleInfos[0][0][2];var distance=0;var lightIndex=-1;if(st<this.constants.MIN_STEP_LEN){return 0;}for(var i=0;i<this.constants.MAX_STEP&&distance<this.constants.max_distance;i++){// 	/* @ts-ignore */
var ox=x+distance*cosA;var oy=y+distance*sinA;for(var index=0;index<length;index++){var ddx=ox-circleInfos[index][0][0];var ddy=oy-circleInfos[index][0][1];var dt=Math.sqrt(ddx*ddx+ddy*ddy)-circleInfos[index][0][2];if(dt<st){st=dt;lightIndex=index;}}/* @ts-ignore */if(st<this.constants.MIN_STEP_LEN){return lightIndex;}distance=distance+st;}return-1;},{constants:{N:this.N,max_distance:this.max_distance,PI:Math.PI,TWO_PI:2*Math.PI,MIN_STEP_LEN:0.1,MAX_STEP:50},output:[this.hight,this.width,this.N]});}},{key:"init",value:function init(N,width,hight){this.N=N;this.width=width;this.hight=hight;this.max_distance=hight>width?hight:width;}},{key:"setCircles",value:function setCircles(circleInfos){this.circleInfos=circleInfos;}},{key:"run",value:function run(){return this.calculate(this.circleInfos,this.circleInfos.length);}}]);return GPURunner;}();
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(1);

// CONCATENATED MODULE: ./src/page/light/GPUCircle.tsx
var GPUCircle_width=window.innerWidth;var GPUCircle_hight=window.innerHeight;var GPUCircle_gpu=new gpu_browser["GPU"]();function circleInfosToGPUCircle(infos){var ret=[];var _iterator=Object(createForOfIteratorHelper["a" /* default */])(infos),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var info=_step.value;ret.push([[info.x,info.y,info.r],[info.light.r,info.light.g,info.light.b]]);}}catch(err){_iterator.e(err);}finally{_iterator.f();}return ret;}/* @ts-ignore */var render=GPUCircle_gpu.createKernel(function(circles,lightInfos,N){/* @ts-ignore */var r=0;var g=0;var b=0;for(var index=0;index<N;index++){var lightIndex=lightInfos[index][this.thread.x][this.thread.y];if(lightIndex>=0){r=r+circles[lightIndex][1][0];g=g+circles[lightIndex][1][1];b=b+circles[lightIndex][1][2];}}this.color(r/N,g/N,b/N,1);}).setOutput([GPUCircle_width,GPUCircle_hight]).setGraphical(true);var canvas=render.canvas;var circleInfos=[];function addCircleInfos(info){circleInfos.push({x:info.x*GPUCircle_hight,y:info.y*GPUCircle_width,r:info.r*GPUCircle_hight,light:info.light});}addCircleInfos({x:0.5,y:0.5,r:0.1,light:{r:2,g:0,b:2}});addCircleInfos({x:0.3,y:0.3,r:0.1,light:{r:0,g:2,b:0}});function GPUCircle(){var _useState=Object(react["useState"])(32),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),N=_useState2[0],setN=_useState2[1];console.log(setN);// function Run() {
// 	render();
// 	window.requestAnimationFrame(Run)
// }
Object(react["useEffect"])(function(){var dom=window.document.getElementById('GPUCircle');if(dom){dom.appendChild(canvas);var runner=new gpuRun_GPURunner(N,GPUCircle_width,GPUCircle_hight);var gpuCircle=circleInfosToGPUCircle(circleInfos);runner.setCircles(gpuCircle);var lightInfo=runner.run();console.log(lightInfo,GPUCircle_width,GPUCircle_hight);/* @ts-ignore */render(gpuCircle,lightInfo,N);}},[N]);return/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{id:"GPUCircle"});}
// CONCATENATED MODULE: ./src/App.tsx
function App_App(){return/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{className:"App",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(GPUCircle,{})});}/* harmony default export */ var src_App = (App_App);
// CONCATENATED MODULE: ./src/reportWebVitals.ts
var reportWebVitals=function reportWebVitals(onPerfEntry){if(onPerfEntry&&onPerfEntry instanceof Function){__webpack_require__.e(/* import() */ 3).then(__webpack_require__.bind(null, 37)).then(function(_ref){var getCLS=_ref.getCLS,getFID=_ref.getFID,getFCP=_ref.getFCP,getLCP=_ref.getLCP,getTTFB=_ref.getTTFB;getCLS(onPerfEntry);getFID(onPerfEntry);getFCP(onPerfEntry);getLCP(onPerfEntry);getTTFB(onPerfEntry);});}};/* harmony default export */ var src_reportWebVitals = (reportWebVitals);
// CONCATENATED MODULE: ./src/index.tsx
react_dom_default.a.render(/*#__PURE__*/Object(jsx_runtime["jsx"])(react_default.a.StrictMode,{children:/*#__PURE__*/Object(jsx_runtime["jsx"])(src_App,{})}),document.getElementById('root'));// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
src_reportWebVitals();

/***/ })

},[[36,1,2]]]);
//# sourceMappingURL=main.0793e0bb.chunk.js.map