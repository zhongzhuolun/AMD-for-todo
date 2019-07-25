// 不需要依赖
define(function() {
	function clock() {
		var flag = 0;
		if (canvas.getContext) {
			var ctx = canvas.getContext("2d");
			setInterval(function() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				move();
			}, 1000);

			function move() {
				//数据和坐标初始化
				ctx.save();
				ctx.lineWidth = 8;
				ctx.strokeStyle = "rgb(130, 110, 110)";
				ctx.lineCap = "round";
				ctx.translate(200, 200);
				ctx.rotate(-90 * Math.PI / 180);
				ctx.beginPath();
				//外层空心圆盘初始化
				ctx.save();
				ctx.lineWidth = 14;
				ctx.strokeStyle = "#ca8f90";
				ctx.beginPath();
				ctx.arc(0, 0, 140, 0, 360 * Math.PI / 180);
				ctx.stroke();
				ctx.restore();
				//时针刻度
				ctx.save();
				for (var i = 0; i < 12; i++) {
					ctx.rotate(30 * Math.PI / 180);
					ctx.beginPath();
					ctx.moveTo(100, 0);
					ctx.lineTo(120, 0);
					ctx.stroke();
				}
				ctx.restore();
				//分针刻度
				ctx.save();
				ctx.lineWidth = 4;
				for (var i = 0; i < 60; i++) {
					if (i % 5 != 0) {
						ctx.beginPath();
						ctx.moveTo(117, 0);
						ctx.lineTo(120, 0);
						ctx.stroke();
					}
					ctx.rotate(6 * Math.PI / 180);
				}
				ctx.restore();
				var date = new Date();
				var s = date.getSeconds();
				var m = date.getMinutes() + s / 60;
				var h = date.getHours() + m / 60;
				if (h > 12) {
					h = h - 12;
				}
				//时针
				ctx.save();
				ctx.lineWidth = 14;
				ctx.rotate(h * 30 * Math.PI / 180);
				ctx.beginPath();
				ctx.moveTo(-20, 0);
				ctx.lineTo(80, 0);
				ctx.stroke();
				ctx.restore();
				//分针
				ctx.save();
				ctx.lineWidth = 10;
				ctx.rotate(m * 6 * Math.PI / 180);
				ctx.beginPath();
				ctx.moveTo(-28, 0);
				ctx.lineTo(112, 0);
				ctx.stroke();
				ctx.restore();
				//秒针
				ctx.save();
				ctx.lineWidth = 6;
				ctx.strokeStyle = "#ca8f90";
				ctx.fillStyle = "#ca8f90";
				ctx.rotate(s * 6 * Math.PI / 180);
				ctx.beginPath();
				ctx.moveTo(-30, 0);
				ctx.lineTo(83, 0);
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(0, 0, 10, 0, 360 * Math.PI / 180);
				ctx.fill();
				ctx.beginPath();
				ctx.arc(96, 0, 10, 0, 360 * Math.PI / 180);
				ctx.stroke();
				ctx.restore();
				ctx.restore();
			}
		}
	}
	return {clock: clock};
	
})
