const Tools = require("./tools");
const plane = require("./plane");
class Enemy {
  constructor(type) {
    this.type = type;
    this.init();
  }
  init() {
    switch (this.type) {
      case 1:
        this.ele = Tools.createDiv("enemy-small");
        this.speed = 5;
        //敌机的血量
        this.hp = 1;
        break;
      case 2:
        this.ele = Tools.createDiv("enemy-middle");
        this.speed = 3;
        this.hp = 8;
        break;
      case 3:
        this.ele = Tools.createDiv("enemy-large");
        this.speed = 1;
        this.hp = 15;
        break;
    }
  }
  move(bodyMain) {
    var min = bodyMain.offsetLeft;
    var max = min + bodyMain.offsetWidth - this.ele.offsetWidth;
    var left = Math.random() * (max - min) + min;

    this.ele.style.top = "0px";
    this.ele.style.left = left + "px";
    var eLeft = this.ele.offsetLeft,
      eRight = eLeft + this.ele.offsetWidth;
    this.timer = setInterval(function() {
      this.ele.style.top = this.ele.offsetTop + this.speed + "px";
      //检测跟子弹的碰撞
      var eTop = this.ele.offsetTop,
        eBottom = eTop + this.ele.offsetHeight;

      for (var i = 0; i < plane.aBullets.length; i++) {
        //取每一个子弹的坐标
        var bLeft = plane.aBullets[i].ele.offsetLeft,
          bRight = bLeft + plane.aBullets[i].ele.offsetWidth,
          bTop = plane.aBullets[i].ele.offsetTop,
          bBottom = bTop + plane.aBullets[i].ele.offsetHeight;
        if (bTop < eBottom && bRight > eLeft && bLeft < eRight && bBottom > eTop) {
          //敌机跟子弹碰撞了
          plane.aBullets[i].die();
          //如果血量减到0，敌机就die
          if (--this.hp == 0) {
            this.die();
          }
        }
      }
      //检测敌机跟自己的碰撞
      var pTop = plane.ele.offsetTop,
        pBottom = pTop + plane.ele.offsetHeight,
        pLeft = plane.ele.offsetLeft,
        pRight = pLeft + plane.ele.offsetWidth;
      if (!(pRight < eLeft || eRight < pLeft || eBottom < pTop || pBottom < eTop)) {
        if (confirm("你死了，重新开始吗？")) {
          //干掉自己
          document.body.removeChild(plane.ele);
          window.location.reload();
        }

      }


      if (this.ele.offsetTop > bodyMain.offsetHeight) {
        this.die();
      }
    }.bind(this), 30);
  }
  die() {
    clearInterval(this.timer);
    document.body.removeChild(this.ele);
  }
}

module.exports = Enemy;

