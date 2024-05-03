<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>
// import autofit from 'autofit.js'
export default {
  name: 'App',
  // created () {
  //   // if (localStorage.pagecount) {
  //   //   localStorage.pagecount=Number(localStorage.pagecount) + 1
  //   // } else {
  //   //   localStorage.pagecount = 1
  //   // }
  // }
  // mounted(){
  //   autofit.init({
  //       dh: 1080,
  //       dw: 1920,
  //       el:"body",
  //       resize: true,
  //     }
  //   )
  // },
  // destroyed(){
  //   autofit.off()
  // }
  
}
</script>

<style>
.icon {
  width: 3em; height: 5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin-top: 5px;
	margin-left: 15px;
	cursor: pointer;
}

.el-textarea__inner, .el-dialog, input{
    background-color: #ade3e3 !important;
}
.el-dialog, .el-pager li {
  background: #ade3e3 !important;
}
.el-button {
    background-color: #097d88;
    /* IE10、Firefox and Opera，IE9以及更早的版本不支持 */
    animation-name: breath;                         /* 动画名称 */
    animation-duration: 3s;                         /* 动画时长3秒 */
    animation-timing-function: ease-in-out;         /* 动画速度曲线：以低速开始和结束 */
    animation-iteration-count: infinite;            /* 播放次数：无限 */

    /* Safari and Chrome */
    -webkit-animation-name: breath;                 /* 动画名称 */
    -webkit-animation-duration: 2s;                 /* 动画时长3秒 */
    -webkit-animation-timing-function: ease-in-out; /* 动画速度曲线：以低速开始和结束 */
    -webkit-animation-iteration-count: infinite;    /* 播放次数：无限 */
  }
  @keyframes breath {
  from { opacity: 0.1; }                          /* 动画开始时的不透明度 */
      20%  { opacity:   1; }    
      40%  { opacity:   0.8; }
      60%  { opacity:   0.6; }
      80%  { opacity:   0.4; }                      /* 动画50% 时的不透明度 */
      90%  { opacity:   0.2; }
      to   { opacity: 0.1; }                          /* 动画结束时的不透明度 */    
  }
  
  @-webkit-keyframes breath {
      from { opacity: 0.1; }                          /* 动画开始时的不透明度 */
      50%  { opacity:   1; }                          /* 动画50% 时的不透明度 */
      to   { opacity: 0.1; }                          /* 动画结束时的不透明度 */
  }
.el-textarea {
  /* z-index: -1; */
}
.app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: auto;
  background: #ade3e3;
  z-index: -2;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.el-textarea__inner {
display: block;
resize: vertical;
padding: 5px 15px;
line-height: 1.5;
-webkit-box-sizing: border-box;
box-sizing: border-box;
width: 100%;
font-size: inherit;
color: #606266;
background-color:#ade3e3 !important;
background-image: none;
border: 1px solid #dcdfe6;
border-top-color: rgb(220, 223, 230);
border-right-color: rgb(220, 223, 230);
border-bottom-color: rgb(220, 223, 230);
border-left-color: rgb(220, 223, 230);
border-radius: 4px;
-webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
</style>
