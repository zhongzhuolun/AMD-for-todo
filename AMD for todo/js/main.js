(function () {	
		 //配置
		  require.config({
		    //基本路径
		    baseUrl: 'js/',
		    //映射: 模块标识名: 路径
		    paths: {
		      //自定义模块
		      'tools': 'modules/tools',
			  'zarek': 'modules/zarek',
			  'control': 'control/control',
			  'view': 'view/view',
			  'clock': 'view/clock',
			  'event': 'modules/event',
			  'handleArray': 'modules/handleArray',
			  'init': 'modules/init',
			  'loginRegister': 'modules/loginRegister' 
		    }
		  });
		  //引入模块使用
		   // 1. 引入初始化模块
		  require(['init'], function (init) {
		    init.init();	
		  });
		  // 2.引入处理数组模块
		  require(['handleArray'], function (handleArray) {
		  });
		  // 3.引入事件模块
		  require(['event'], function (event) {
		  	event.event();
		  });
		  // 4.引入视图中的时钟模块
		  require(['clock'], function (clock) {
		  	clock.clock();
		  });
		  // 5.引入视图中的视图模块
		  require(['view'], function (view) {
		  	view.view();
		  });
		  // 6.引入登录注册模块
		  require(['loginRegister'], function (loginRegister) {
		  	loginRegister.loginRegister();
		  });
		  
	
 
})()