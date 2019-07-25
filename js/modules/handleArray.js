// 依赖于初始化方法和自定义对象法
define(['zarek', 'init'],function($, init) {
	var handleArray = {
		// 判断数组只有一个true
		// 判断数组有多个true
		// 判断是否全为true
		// 判断数组只有一个false	
		// 判断数组有多个false
		// 判断是否全为false
		checkTrue: function(arr, bool) {
			// 如果想要判断true，则传入true，否则，传入false
			var count = 0;
			var len = arr.length;
			for (var i = 0; i < len; i++) {
				if (arr[i] == true) {
					count++;
				}
			}
			if (bool) {
				switch (count) {
					case 0:
						return "notrue";
						break;
					case (len - 1):
						return "all true";
						break;
					case 1:
						return "a true";
						break;
					default:
						return "over true";
						break;
				}
			} else {
				switch (count) {
					case 0:
						return "all false";
						break;
					case len:
						return "no false";
						break;
					case len - 1:
						return "a false";
						break;
					default:
						return "over false";
						break;
				}
			}
		},
		// 定义一个专门用来检测列表项是否全为true的函数
		isAllTrue: function(arr) {
			var count = 0;
			var len = arr.length;
			for (var i = 0; i < len; i++) {
				if (arr[i] == true) {
					count++;
				}
			}
			if (count == len) {
				return true;
			} else {
				return false;
			}
		},
		// 定义一个专门用来检测列表项是否存在true的函数
		isHasTrue: function(arr) {
			var count = 0;
			var len = arr.length;
			for (var i = 0; i < len; i++) {
				if (arr[i] == true) {
					count++;
				}
			}
			if (count > 0 && count <= len) {
				return true;
			} else {
				return false;
			}
		},	
		// 定义一个函数专门用来重置状态数组
		resetArray: function(arr) {
			var len = arr.length
			for (var i = 0; i < len; i++) {
				for (var j = 0; j < len - i; j++) {
					if (arr[j]) {
						arr.splice(j, 1);
						break;
					}
				}
			}
		},
		resetLocalArray: function(arr) {
			var len = arr.length
			for (var i = 0; i < len; i++) {
				for (var j = 0; j < len - i; j++) {
					if (arr[j].condition) {
						arr.splice(j, 1);
						break;
					}
				}
			}
		},
		// 定义一个函数专门获取列表中所有为true的序号的函数
		getAllTrueItems: function(arr) {
			var allTrueArr = [];
			var allTrueIndex = handleArray.getAllTrueIndex(arr);
			var allItems = $lists.get(0).children;
			for (var i = 0; i < allTrueIndex.length; i++) {
				allTrueArr[i] = allItems[allTrueIndex[i]];
			}
			return $(allTrueArr);
		},
		// 定义一个函数专门获取列表中所有为false的序号的函数
		getAllFalseIndex: function(arr) {
			var itemsArray = [];
			for (var i = 0; i < arr.length; i++) {
				if (!arr[i]) {
					itemsArray.push(i);
				}
			}
			return itemsArray;
		},
		// 定义一个函数专门获取列表中所有为true的序号的函数
		getAllTrueIndex: function(arr) {
			var itemsArray = [];
			for (var i = 0; i < arr.length; i++) {
				if (arr[i]) {
					itemsArray.push(i);
				}
			}
			return itemsArray;
		},
		// 定义一个函数专门获取所有为false的items
		getAllFalse: function(arr) {
			var allFalseArr = [];
			var allFalseIndex = handleArray.getAllFalseIndex(arr);
			var allItems = $lists.get(0).children;
			for (var i = 0; i < allFalseIndex.length; i++) {
				allFalseArr[i] = allItems[allFalseIndex[i]];
			}
			return $(allFalseArr);
		},
		// 定义一个函数专门用于交换数组中两个下标所对应的值
		swop: function(arr, i, j) {
			var t;
			t = arr[i];
			arr[i] = arr[j];
			arr[j] = t;
		},
		// 定义一个函数专门用于处理数组的删除和插入
		popInsert: function(arr, index, preIndex) {
			var temp = arr.splice(index, 1);
			arr.splice(preIndex, 0, temp[0]);
		}
	}
	return handleArray;
})
