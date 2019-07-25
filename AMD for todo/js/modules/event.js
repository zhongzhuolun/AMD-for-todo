// 需要依赖于数组方法，初始化方法, 工具方法，自定义对象方法,需要向外暴露event对象
define(['zarek', 'tools', 'handleArray', 'init', 'control'], function($, tools, handleArray, init, controller) {
	function event() {
		// 1 监听文本框的输入和输出，创建todo，并且将其插入列表中,同时改变items left的值	
		// 1.1 当文本框失去焦点时
		$(".need").on('blur', function(ev) {
			// 1.1.1 获取文本中的值
			ev = ev || window.event;
			textValue = this.value.trim();
			if (textValue.length > 0 && textValue) {
				// 1.1.2 文本框中的值的长度大于零时创建一条todo
				createTodo(textValue);
				// 1.1.3 清空输入框中的值
				this.value = "";
				// 1.1.4 设置left items的值
				$leftItem.text(handleArray.getAllFalseIndex(conditionArray).length);
			}
		});
		// 1.2 当用户敲回车键或者tab键时
		$("body").on('keyup', function(ev) {
			ev = ev || window.event;

			if (ev.keyCode == 13 || ev.keyCode == 9) {
				// 2.1.1 判断当用户按下回车键或者tab键时，获取文本中的值
				textValue = $(".need").val().trim();
				if (textValue.length > 0 && textValue) {
					// 2.1.2 文本框中的值的长度大于零时创建一条todo
					createTodo(textValue);
					// 2.1.3 清空输入框中的值
					$(".need").val("");
					// 2.1.4 设置left items的值
					$leftItem.text(handleArray.getAllFalseIndex(conditionArray).length);
				}
				ev.preventDefault();
				return false;
			}
		});
		// 2 给输入框左边的全选小图标绑定一个点击事件
		$(".check-all").on('click', function() {
			// 2.1 点击时切换图标		
			var len = conditionArray.length;
			var $condition = $(".lists .item .toggle");
			var flag = true;
			var count = 0;
			var $item = $(".item");
			// console.log($item)
			var $tops = $(".lists .topping");
			// console.log($tops)
			dataArray = eval(localStorage.datas);
			// console.log(conditionArray)
			for (var i = 0; i < len; i++) {
				if (conditionArray[i] == true) {
					count++;
				}
			}
			// 2.2 判断列表的状态，同时判断筛选按钮的状态
			// 2.2.1 当列表项全为false时，点击后应该全为true，当列表项存在true时，点击应该全为true
			if (count == 0 || (count > 0 && count < len)) {
				$condition.prop("checked", true);
				$tops.hide().removeClass('togglecolor');
				$item.removeClass("top");
				for (var i = 0; i < len; i++) {
					conditionArray[i] = true;
					$control.prop("checked", false);
					dataArray[i].condition = true;
					dataArray[i].top = "";
				}
				// 2.2.2 设置left items的值
				$count = 0;
				$leftItem.text($count);
				localStorage.datas = JSON.stringify(dataArray);
				// 2.2.3 判断筛选按钮的状态:如果为active
				if ($activeBtn.hasClass('selected')) {
					// 2.2.4 隐藏所有的项目
					$item.hide();
					// 2.2.5 判断筛选按钮的状态:如果为complete	
				} else if ($completeBtn.hasClass('selected')) {
					// 2.2.6 隐藏所有的项目
					$item.show();
				}
			} else {
				// 2.3 当列表项全为true时，点击后应全为false
				$condition.prop("checked", false);
				$tops.show();
				for (var i = 0; i < len; i++) {
					conditionArray[i] = false;
					$control.prop("checked", true);
					dataArray[i].condition = false;
				}
				// 2.3.1 设置left items的值
				$count = conditionArray.length;
				$leftItem.text($count);
				localStorage.datas = JSON.stringify(dataArray);
				// 2.3.2 判断筛选按钮的状态:如果为complete
				if ($completeBtn.hasClass('selected')) {
					// 2.3.3 隐藏所有项目
					$item.hide();
					// console.log(1)
					// 2.3.4 判断筛选按钮的状态:如果为active
				} else if ($activeBtn.hasClass('selected')) {
					// 2.3.5 显示所有的项目
					$item.show();
				}
			}

			// 2.4 点击时切换todo列表的类名
			$(".lists .item ").toggleClass("completed");
			// 2.5 点击时切换clearcomplete
			$clearComplete.toggleClass("completed");
			// 2.6 如果列表项全为true，则应该为todo类名和clearccomplete都加上completed类名
			if (handleArray.isAllTrue(conditionArray)) {
				$(".lists .item ").addClass("completed");
				$clearComplete.addClass("completed");
			}

		});
		// document.querySelectorAll()
		// 3 给todo列表的CheckBox绑定事件，需要用到事件委托
		$lists.on("click", function(ev) {
			// 3.1 拿到被点击元素的序号,状态和其祖先元素li
			ev = ev || window.event;
			if ($(ev.target).attr('class') == 'toggle') {
				var $item = $(ev.target.parentNode.parentNode);
				var $children = $($lists.get(0).children);
				var index = [].indexOf.apply($children, $item);
				var condition = $(ev.target).prop("checked");
				var $posEle; 
				var posIndex;
				dataArray = eval(localStorage.datas);
				// 3.2 将点击后的状态存储在数组中
				conditionArray[index] = condition;
				dataArray[index].condition = condition;
				dataArray[index].top = '';
				localStorage.datas = JSON.stringify(dataArray);
				// 3.2.1 获取此时为false的最后一个的索引，获取获取此时为false的最后一个元素
				posIndex = handleArray.getAllFalse(conditionArray).length - 1;
				// console.log(posIndex)
				$posEle = handleArray.getAllFalse(conditionArray);
				// 3.3 点击时切换todo列表的类名
				$(".lists .item").eq(index).toggleClass("completed");
				// 3.8 点击时切换置顶状态的类名
				$(".lists .item .topping").eq(index).removeClass('togglecolor').toggle();
				$item.removeClass("top");
				// 3.4 修改全选小图标和clearcomplete的状态
				if (!conditionArray[index]) {
					$control.prop("checked", false);
					switch (handleArray.checkTrue(conditionArray, true)) {
						case "a true":
							$item.insertAfter($posEle[posIndex - 1]);
							controller.resetTop(index, posIndex);
							break;
						case "over true":
							if (!(handleArray.getAllTrueIndex(conditionArray)[0] === index)) {
								$item.insertAfter($posEle[posIndex - 1]);
								controller.resetTop(index, posIndex);
							}
							break;
						case "all true":
							$item.prependTo($lists);
							controller.resetTop(index, 0);
							break;
						case "no true":
							break;
						default:
							break;
					}
					if (!handleArray.isHasTrue(conditionArray)) {
						$clearComplete.removeClass("completed");
					}
				} else {
					switch (handleArray.checkTrue(conditionArray, true)) {
						case "a true":
						case "over true":
						case "all true":
							// 其实是只有一个false
							$item.insertAfter($posEle[posIndex]);
							controller.resetTop(index, posIndex + 1);
							break;
						default:
							break;
					}
					$clearComplete.addClass("completed");
				}
				if (handleArray.isAllTrue(conditionArray)) { // 如果状态数组全为true，则小图标应该为true，clearccomplete应加上completed类名
					$control.prop("checked", true);
					$clearComplete.addClass("completed");
				}
				// 3.5 判断筛选按钮的状态:如果为active
				if ($activeBtn.hasClass('selected')) {
					if (condition) {
						// 3.5.1 隐藏该项目
						console.log($item)
						$item.hide();
					}
				}
				// 3.6 判断筛选按钮的状态:如果为complete
				if ($completeBtn.hasClass('selected')) {
					if (!condition) {
						// 3.6.1 隐藏该项目
						$item.hide();
					}
				}
				// 3.7 设置left item的值
				$leftItem.text(handleArray.getAllFalseIndex(conditionArray).length);
			}
		});
		// 4 给删除按钮绑定一个点击事件，需要用到事件委托
		$lists.on("click", function(ev) {
			// 4.1 拿到被点击元素的序号
			ev = ev || window.event;
			if ($(ev.target).attr('class') == 'destroy') {
				var $item = $(ev.target.parentNode.parentNode);
				var $children = $($lists.get(0).children);
				var index = [].indexOf.apply($children, $item);
				// var index = $(".destroy").index(this);
				dataArray = eval(localStorage.datas);
				// 4.2 获取到当前被点击的关闭按钮的祖先元素li
				// var $parent = $(this).parents(".item");
				// 4.3 删除掉该元素
				$item.remove();
				// 4.4 重置状态数组
				conditionArray.splice(index, 1);
				dataArray.splice(index, 1);
				localStorage.datas = JSON.stringify(dataArray);
				if (handleArray.isHasTrue(conditionArray)) {
					$clearComplete.addClass("completed");
				} else {
					$clearComplete.removeClass("completed");
				}
				// 4.5 让left items的值减一
				$count = handleArray.getAllFalseIndex(conditionArray).length;
				$leftItem.text($count);
				// 4.6 如果conditionArray的长度为零，则让footed消失,全选小图标消失，clearcomplete消失
				if (conditionArray.length == 0) {
					$footer.style.display = "none";
					$checkAll.removeClass("show");
					$clearComplete.removeClass("completed");
				} else if (handleArray.isAllTrue(conditionArray)) { // 如果状态数组全为true，则小图标应该为true，clearccomplete应加上completed类名
					$control.prop("checked", true);
					$clearComplete.addClass("completed");
				}
			}

		});
		// 5 给clearcomplete按钮绑定点击函数
		$clearComplete.on('click', function() {
			// 5.1 获取列表中所有为true的项目		
			// var $allComplete =  $lists.get(0).children;
			var $allComplete = handleArray.getAllTrueItems(conditionArray);
			dataArray = eval(localStorage.datas);
			// 5.1.1 如果列表全为true,则需要隐藏掉footer和全选小图标
			if ($allComplete.length == conditionArray.length) {
				$footer.style.display = "none";
				$checkAll.removeClass("show");
			}
			// 5.2 让left items的值同步
			$count = handleArray.getAllFalseIndex(conditionArray).length;
			$leftItem.text($count);
			// 5.3 删除获取到的项目
			for (var i = 0; i < $allComplete.length; i++) {
				$allComplete[i].remove();
			}
			// 5.4 重置状态数组
			handleArray.resetArray(conditionArray);
			handleArray.resetLocalArray(dataArray);
			localStorage.datas = JSON.stringify(dataArray)
			// 5.5 移除clearcomplete按钮的completed状态
			$clearComplete.removeClass("completed");
		})
		// 6 给All按钮绑定单击响应函数
		$allBtn.on('click', function() {
			// 6.1 获取列表中所有的元素
			var $allItems = $($lists.get(0).children);
			// 6.2 排他操作
			$(this).addClass("selected");
			$(this).siblings().removeClass("selected");
			// 6.3 显示所有元素
			$allItems.show();
			hash = window.location.hash = "";
		})
		// 7 给Active按钮绑定单击响应函数
		$activeBtn.on('click', function() {
			// 7.1 找到所有为true的items
			var $allComplete = handleArray.getAllTrueItems(conditionArray);
			console.log($allComplete);
			var $allNoComplete = handleArray.getAllFalse(conditionArray);
			console.log($allNoComplete);
			// 7.2 排他操作
			$(this).addClass("selected");
			$(this).siblings().removeClass("selected");
			// 7.3 隐藏所有为true的items
			$allComplete.hide();
			// 7.4 显示所有为false的items
			$allNoComplete.show();
			hash = window.location.hash = "active";
		})
		// 8 给Complete按钮绑定单击响应函数
		$completeBtn.on('click', function() {
			// 8.1 找到所有为false的items,隐藏所有为false的items
			var $allNoComplete = handleArray.getAllFalse(conditionArray);
			var $allComplete = handleArray.getAllTrueItems(conditionArray);
			$allNoComplete.hide();
			// 8.2 排他操作
			$(this).addClass("selected");
			$(this).siblings().removeClass("selected");
			// 8.3 显示所有为true的items
			$allComplete.show();
			hash = window.location.hash = "complete";

		})
		// 9 监听todo中label的双击事件，需要用到事件委托
		$lists.on("dblclick", function(ev) {
			// 9.1 获取label中的值,以及在todo列表中的索引值
			ev = ev || window.event;
			if ($(ev.target).attr('class') == 'text') {
				var $item = $(ev.target.parentNode.parentNode);
				var $children = $($lists.get(0).children);
				$index = [].indexOf.apply($children, $item);
				var value = $(ev.target).html();
				$height = parseInt($item.css("height"));
				// console.log($height)
				$label = $(ev.target);
				// $index = $(".text").index(this);
				//9.2 动态生成一个input框
				controller.handleDbclick(value, $index, $label, $item);
				// 9.3 设置边框的样式
				$item.addClass("editing");
				// 9.4 隐藏label
				$(ev.target).hide();
			}
		})
		
		// 13.监听置顶按钮的点击事件，需要用到事件委托
		$lists.on('click', function(ev) {
			// 13.1 找到被点击的todo索引值,以及对应的todo和true中的第一个，获取localstorage中的值,获取false中的最后一个的位置
			ev = ev || window.event;
			if ($(ev.target).attr('class') == 'icon-uniE900') {
				var $item = $(ev.target.parentNode.parentNode.parentNode);
				var $children = $($lists.get(0).children);
				var index = [].indexOf.apply($children, $item);
				// console.log(index)
				var $posEle = handleArray.getAllTrueItems(conditionArray).eq(0);
				var posIndex = handleArray.getAllFalse(conditionArray).length - 1;
				dataArray = eval(localStorage.datas);
				// 13.2 点击时切换其颜色，置顶状态与删除按钮同一个颜色
				$(ev.target.parentNode).toggleClass('togglecolor');
				// 13.3 判断置顶的状态，如果为未置顶则使该todo置顶，如果为置顶，则将其置于第一个状态为true的todo之前，或者全为true的情况下，则保留原位置不变
				// 代表有为true的项
				if ($posEle.length > 0) {
					// 置顶
					if ($(ev.target.parentNode).hasClass('togglecolor')) {
						// 13.3.1 将list插入到ul中的第一项
						$item.prependTo($lists);
						dataArray[index].top = "top";
						// 13.3.2 为置顶todo增加一个高亮边框
						$item.addClass("top");
						// 13.3.3 重置状态数组
						controller.resetTop(index, 0);

					} else {
						// 取消置顶
						// 13.3.4 将list插入到所有为true的最后一项
						$item.insertBefore($posEle);
						// 13.3.5 移除todo的高亮边框
						$item.removeClass("top");
						dataArray[index].top = "";
						// 13.3.6 重置状态数组
						controller.resetTop(index, posIndex);
					}
				} else {
					// 代表没有为true的项
					if ($(ev.target.parentNode).hasClass('togglecolor')) {
						// 13.3.1 将list插入到ul中的第一项
						$item.prependTo($lists);
						// 13.3.1 为置顶todo增加一个高亮边框
						$item.addClass("top");
						dataArray[index].top = "top";
						controller.resetTop(index, 0);
					} else {
						// 13.3.1 移除todo的高亮边框
						$item.removeClass("top");
						dataArray[index].top = "";
						// 获取到置顶的最后一位的索引
						var lastTopIndex =controller.getLastTopIndex($($lists.get(0).children), 'top');
						console.log(lastTopIndex)
						$item.insertAfter($($lists.get(0).children).eq(lastTopIndex));
						// console.log(index, lastTopIndex)
						controller.resetTop(index, lastTopIndex);
					}
				}
			}

		});
	}
	return {
		event: event
	};

})
