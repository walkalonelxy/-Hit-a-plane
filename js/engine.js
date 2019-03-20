//导入依赖的三个模块；
const Tools = require("./tools");
const plane = require("./plane");
const Enemy = require("./enemy");
function Engine() {
  this.ele = Tools.$id("body_main");//导出的对象才有$id这个方法
  this.init();
}

Engine.prototype.init = function() {
  var _this = this;
  var ul = Tools.$id("options");
  var aLi = ul.children;
  for (var i = 0; i < aLi.length; i++) {
    aLi[i].onclick = function() {
      //获取游戏难度
      _this.hard = this.value;
      //移出ul
      _this.ele.removeChild(ul);
      //开始入场动画
      _this.startAnimation();

    }
  }

}

Engine.prototype.startAnimation = function() {
  //创建logo和放屁飞机
  var logo = Tools.createDiv("logo");
  var loading = Tools.createDiv("loading");
  var index = 0;
  var timer = setInterval(function() {
    var str = "url(images/loading" + ((++index) % 3 + 1) + ".png)";
    console.log(str);
    loading.style.backgroundImage = str;
  }, 600);

  setTimeout(function() {
    clearInterval(timer);
    document.body.removeChild(logo);
    document.body.removeChild(loading);
    this.startGame();
  }.bind(this), 1500);

  //背景图移动
  var top = 0;
  this.timer = setInterval(function() {
    top -= 10;
    this.ele.style.backgroundPositionY = top + "px";
  }.bind(this), 30);

}
Engine.prototype.startGame = function() {
  //创建飞机
  plane.init(this.ele).fire(this.hard);
  //创建敌机
  setInterval(function() {
    //生成随机数
    //50% 小飞机 1  20%中飞机 2 10%大飞机 3 20%不产生飞机
    var rand = Math.random();
    if (rand > 0.5) {
      new Enemy(1).move(this.ele);
    } else if (rand > 0.3) {
      new Enemy(2).move(this.ele);
    } else if (rand > 0.2) {
      new Enemy(3).move(this.ele);
    }
  }.bind(this), 400);

}

module.exports = Engine;