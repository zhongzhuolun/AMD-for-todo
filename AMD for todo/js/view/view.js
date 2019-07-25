// 需要依赖于数组方法，初始化方法, 工具方法，自定义对象方法, 控制方法
define(['zarek', 'tools', 'handleArray', 'init', 'control'], function($, tools, handleArray, init, controller) { 
		function view() {
			$('.btn').on('mouseenter', function(e) {
				e = e || window.event;
				var ball = $('<span class="box"></span>');
				var left = e.pageX - $('.btn').get(0).offsetLeft;
				var top = e.pageY - $('.btn').get(0).offsetTop;
				ball.css({
					'left': left + 'px',
					'top': top + 'px'
				});
				$('.btn').append(ball);
				ball.on('animationend', function() {
					ball.remove();
				}); //每次在执行完动画把“水波”从文档中移出；
			});
		}
		return {view: view};
})