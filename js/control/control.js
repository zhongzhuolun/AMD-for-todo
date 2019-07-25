// 需要依赖于数组方法工具方法，自定义对象方法，初始化方法
define(['zarek', 'tools', 'handleArray', 'init'],function($, tools, handleArray, init) {
	// 定义一个专门用于存储处理数组的方法的对象
	var controller = {
		// 处理置顶前后状态数组和localstorage数组的状态
		resetTop: function(index, swopIndex) {
			handleArray.popInsert(conditionArray, index, swopIndex);
			handleArray.popInsert(dataArray, index, swopIndex);
			localStorage.datas = JSON.stringify(dataArray);
		},
		// 清除置顶状态
		clearTopping: function($obj, conditionArray, dataArray) {
			var len = $obj.length;
			if (len === 1) {
				dataArray[0].top = "";
				$obj.removeClass("top");
				$obj.find('.topping').removeClass('togglecolor');
			} else if (len > 1) {
				for (var i = 0; i < len; i++) {
					dataArray[i].top = "";
					$obj.eq(i).removeClass("top");
					$obj.eq(i).find('.topping').removeClass('togglecolor');
				}
			}
			localstorage.datas = JSON.stringify(dataArray);
		},
		// 定义一个专门用来处理双击label元素时动态修改元素内容的函数
		handleDbclick: function(value, $index, $label, $item) {
			value = tools.HTMLDecode(value);
			var $input = $("<input class='change' tyep='text'>");
			var height = $($label.get(0).parentNode).css("height");
			$input.attr("value", value);
			var resetIndex = $index;
			var n = $index;
			// 判断筛选按钮的状态:如果为complete
			if ($completeBtn.prop("class") == "selected") {
				n = 0;
				for (var i = 0; i < resetIndex; i++) {
					if (conditionArray[i]) {
						n++;
					}
				}
				// 判断筛选按钮的状态:如果为active
			} else if ($activeBtn.prop("class") == "selected") {
				n = 0;
				for (var i = 0; i < resetIndex; i++) {
					if (!conditionArray[i]) {
						n++;
					}
				}
			}
			$item.css("height", "58px");
			$input.css({
				"height": "58px",
				"text-decoration": "none",
				"top": n * 59 + "px"
			});
			//  判断此时label中的值是否有删除线，即此时状态是否为true
			if (conditionArray[$index]) {
				$input.addClass("checked");
			}
			$lists.append($input);
			// 12.监听动态生成的输入框的聚焦事件，将其中的内容选中
			$input.on("focus", function(ev) {
				ev = ev || window.event;
				// tools.selectText(ev.target, this.value.length, this.value.length) // 光标移动到最后一个
				ev.target.select();//内容全选
			
			})
			$input.get(0).focus();
			
			// 10 监听todo中input的失去焦点事件，需要用到事件委托
			$input.on("blur", function(ev) {
				// 10.1 获取input中的值,以及在todo列表中的索引值
				ev = ev || window.event;
					var value = $(ev.target).val();
					dataArray = eval(localStorage.datas);
					// 10.2 将边框样式还原
					$item.removeClass("editing");
					// 10.3 判断值的内容,如果为空的话
					if (value.length == 0) {
						// 10.3.1 将对应的item移除
						$item.remove();
						// 10.3.2 将状态数组对应的索引的值删除
						conditionArray.splice($index, 1);
						dataArray.splice($index, 1);
						// 10.3.3 重新设置leftitems的值
						$leftItem.text(handleArray.getAllFalseIndex(conditionArray).length);
						// 10.3.4 重新设置$count的值
						$count = handleArray.getAllFalseIndex(conditionArray).length;
					} else {
						// 10.3.5 将value的值设置给label
						$label.text(value);
						dataArray[$index].val = value;
						// 10.3.6 显示label
						$label.show();
					}
					localStorage.datas = JSON.stringify(dataArray);
					// 10.4 将input移除
					$input.off('blur');
					$(ev.target).remove();
					// 10.5 判断conditionArray的状态
					if (conditionArray.length == 0) {
						$footer.style.display = "none";
						$checkAll.removeClass("show");
						$clearComplete.removeClass("completed");
					} else if (handleArray.isAllTrue(conditionArray)) {
						// 如果状态数组全为true，则小图标应该为true，clearccomplete应加上completed类名
						$control.prop("checked", true);
						$clearComplete.addClass("completed");
					}
					$item.css("height", $height + "px");
					
			});
			// 11 监听todo中input的键盘事件，需要用到事件委托
			$input.on("keyup", function(ev) {
				// 	// 11.1 获取input中的值,以及在todo列表中的索引值
				ev = ev || window.event;
					var value = $(ev.target).val();
					if (ev.keyCode == 13 || ev.keyCode == 9) {
						//11.2 将边框样式还原
						$item.removeClass("editing");
						//11.3 判断是否还有input框，有则调用失去焦点的方法
						if (ev.target) {
							ev.target.blur();
							$input.off('keyup');
						}
						// 11.4 判断conditionArray的长度是否为零，若为零，则隐藏对应的按钮
						if (conditionArray.length == 0) {
							$footer.style.display = "none";
							$checkAll.removeClass("show");
							$clearComplete.removeClass("completed");
						}
						ev.preventDefault();
						return false;
					}
			});
			
		},
		// 定义一个专门用来获取置顶元素最后一位的索引
		getLastTopIndex: function($children, sele) {
			var index = 0;
			$children.each(function(key, value) {
				if ($(value).hasClass(sele)) {
					index++;
				} else {
					return true;
				}
			});
			return index;
		}	
	}
	return controller;
})
