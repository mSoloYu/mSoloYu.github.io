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
    	Init: "init",
      VrWuspace: "vrwuspace",
      EventUtil: "eventutil"
    }
});

// require(['jquery', 'underscore', 'vr'], function ($, _, Backbone){
require(['jquery', 'Init', 'VrWuspace'], function ($, Init, VrWuspace){
	$(function(){
	　　VrWuspace.initNav();
  　　VrWuspace.initMenu();
	　　VrWuspace.initCross();
    VrWuspace.initEvent();
	});
});