requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
      jquery: "https://cdn.bootcss.com/jquery/2.2.2/jquery.min",
      // Init: "init.min",
      // VrWuspace: "vrwuspace.min",
      // EventUtil: "eventutil.min"
      // 以下为开发环境配置
      Init: "init",
      VrWuspace: "vrwuspace",
      EventUtil: "eventutil"
    }
});

// require(['jquery', 'underscore', 'vr'], function ($, _, Backbone){
require(['jquery', 'Init'], function ($, Init){
	$(function(){
	　　Init.start();
	});
});