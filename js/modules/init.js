// 需要依赖工具方法，自定义对象法，数组方法，向外暴露一个初始化函数
define(['zarek', 'tools', 'handleArray', 'control'],function($, tools, handleArray, controller) {
// define(['zarek'],function($) {
	function init() {
		
		// 0 获取需要用到的元素，并且将其设置为全局变量，同时初始化一些需要的数据类型
		window.textValue = ""; // 初始化文本框的值
		window.$lists = $(".lists"); // 获取填充todo的ul
		window.$leftItem = $(".todo .footer .count strong") // 获取items left元素
		window.$count = parseInt($leftItem.text()); // 获取items left的值
		window.$footer = $(".todo .footer")[0]; // 获取底部的footer元素
		window.$checkAll = $(".check-all"); // 获取全选小图标
		window.$clearComplete = $(".clear-complete"); // 获取清除所有已完成项的按钮
		window.$control = $("#toggle-all"); // 获取控制小图标颜色状态的元素
		window.conditionArray = []; // 创建一个存储todo选中状态的数组
		window.$allBtn = $(".filters li").eq(0); // 获取All按钮
		window.$activeBtn = $(".filters li").eq(1); // 获取Active按钮
		window.$completeBtn = $(".filters li").eq(2); // 获取Complete按钮
		window.$index; // 创建全局变量$index以便动态修改label中的值使用
		window.$label; // 创建全局变量$label以便动态修改label中的值使用
		window.dataArray = []; // 创建一个专门用来将数据存储在localstorage中的数组
		window.$height; // 专门用于双击todo输入框的定位
		window.hash = window.location.hash; // 获取浏览器此时的hash值
		window.priorityArr = []; //定义一个专门用来存储置顶状态的数组
		window.$login = $("#login"); // 获取登录窗口
		window.$register = $("#regis"); // 获取注册窗口
		window.$loginBtn = $(".login-btn"); // 获取登录按钮
		window.$registerBtn = $(".registe-btn"); // 获取注册按钮
		window.$phoneInputL = $("#login-phone") // 获取登录手机号码输入框
		window.$pwdInputL = $("#login-password") // 获取登录密码输入框
		window.$phoneInputR = $("#regist-phone") // 获取注册手机号码输入框
		window.$pwdInputR = $("#regist-password") // 获取注册密码输入框
		window.$returnLogin = $(".return-login") // 获取返回登录的按钮
		window.$returnRegist = $(".login-to-regist") // 获取返回注册的按钮
		window.$closeBtn = $(".close") // 获取关闭按钮
		window.createTodo = createTodo;
		window.canvas = document.getElementById("canvas");
		handleLocal(); // 调用初始化数据函数
		tools.drag($login.get(0));
		tools.drag($register.get(0));
		// 定义一个函数专门用来处理localstorage中的数据
		function handleLocal() {
			// 获取localstorage中的每一条todo数据
			if (localStorage.datas) {
				var value = "";
				var condition = "";
				var completed = "";
				var topValue = "";
				var conditionValue = "";
				dataArray = eval(localStorage.datas);
				dataArray.forEach(function(element) {
					// 一般状态
					if (element.condition) {
						condition = " checked ";
						completed = " completed ";
						conditionValue = ' hide';
					} else {
						condition = "";
						completed = "";
						conditionValue = '';
					}
					// active状态
					if (hash == "#active") {
						$activeBtn.addClass("selected");
						$activeBtn.siblings().removeClass("selected");
						if (element.condition) {
							value = " hide ";
						} else {
							value = "";
						}
					} else if (hash == "#complete") {
						$completeBtn.addClass("selected");
						$completeBtn.siblings().removeClass("selected");
						// complete状态
						if (element.condition) {
							value = "";
						} else {
							value = " hide ";
						}
					}
					if (element.top) {
						topValue = ' togglecolor ';
					} else {
						topValue = '';
					}
					// 通过字符串形式生成一个item
					var item = "" +
						'<li class="item ' + value + '' + completed + '' + element.top + '">' +
						'<div class="view">' +
						'<input type="checkbox" class="toggle" ' + condition + '/>' +
						'<label class="text">' + element.val + '</label>' +
						'<button type="button" class="destroy"></button>' +
						'<button type="button" class="topping ' + topValue + '' + conditionValue +
						'"><i class="icon-uniE900"></i></button>' +
						'</div>' +
						'</li>';
					// 将item动态添加到ul中
					$lists.append(item);
					// $lists.prepend(item);
					// var children = $lists.children();
					// children.eq(children.length - 1).find(".text").text(element.val);
					// 将生成的每一个todo的状态存储在数组中
					conditionArray[conditionArray.length] = element.condition;
					// 显示底部元素
					if ($footer.style.display == "none") {
						$footer.style.display = "block";
					}
				})
				// 显示全选小图标,并且将其设置为未选中状态
				if (dataArray.length > 0) {
					$checkAll.addClass("show");
				}
				// 如果全为true，则使全选图标为选中状态
				if (handleArray.isAllTrue(conditionArray)) {
					$control.prop("checked", true);
				}
				// 设置left item的值
				$count = handleArray.getAllFalseIndex(conditionArray).length;
				$leftItem.text($count);
				// 设置clearcomplete按钮
				if (handleArray.isHasTrue(conditionArray)) {
					$clearComplete.addClass("completed");
				}
				return true;
			} else {
				return false;
			}
		}
		// 1.3 创建一个函数动态生成一条todo,并且将其插入列表中
		function createTodo(textValue) {
			var value = "";
			var posIndex, $posEle;
			var oldChildren = $lists.get(0).children;
			var $item;
			var data = {
				"val": textValue,
				"condition": false,
				"top": ""
			}
			// 1.3.1 判断筛选按钮的状态:如果为complete
			if ($completeBtn.hasClass("selected")) {
				// 1.3.2 为item加上hide的class类名，让其隐藏
				value = "hide";
			}
			// 1.3.3 通过字符串形式生成一个item
			var item = "" +
				'<li class="item ' + value + '">' +
				'<div class="view">' +
				'<input type="checkbox" class="toggle"/>' +
				'<label class="text">' + textValue + '</label>' +
				'<button type="button" class="destroy"></button>' +
				'<button type="button" class="topping"><i class="icon-uniE900"></i></button>' +
				'</div>' +
				'</li>';
			// 1.3.4 将item动态添加到ul中
			posIndex = handleArray.getAllFalse(conditionArray).length - 1;
			$posEle = handleArray.getAllFalse(conditionArray)[posIndex];
			// console.log(posIndex, handleArray.getAllFalse(conditionArray))
			$item = $(item);
			if (dataArray.length === 0) {
				// 1.3.5 将生成的每一个todo的状态存储在数组中
				conditionArray[conditionArray.length] = false;
				// 1.3.8 将数据存储在dataArray中		
				dataArray.push(data);
				// 1.3.9 将数据数组存储在localStorage中
				localStorage.datas = JSON.stringify(dataArray);
				$item.appendTo($lists);
			} else {
				$item.insertAfter($posEle);
				// 1.3.5 将生成的每一个todo的状态存储在数组中
				conditionArray[conditionArray.length] = false;
				// 1.3.8 将数据存储在dataArray中		
				dataArray.push(data);
				controller.resetTop(conditionArray.length - 1, posIndex + 1)
			}
			// 1.3.6 显示全选小图标,并且将其设置为未选中状态
			$checkAll.addClass("show");
			$control.prop("checked", false);
			// 1.3.7 显示底部元素
			if ($footer.style.display == "none") {
				$footer.style.display = "block";
			}
			// console.log(conditionArray)
		
		}
	}
	return {init};
	
})
