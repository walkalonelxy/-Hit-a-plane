const Tools = require("./tools");
const Bullet = require("./bullet");
var plane = {
  aBullets: [], //存放所有发射的子弹
  init: function(bodyMain) {
    this.ele = Tools.createDiv("my-warplain");
    this.ele.style.left = (Tools.getBody().width - this.ele.offsetWidth) / 2 + "px";
    this.ele.style.bottom = "0px";
    this.move(bodyMain);
    return this;
  },
  move: function(bodyMain) {
    //让飞机跟随鼠标移动
    document.onmousemove = function(e) {
      e = e || window.event;
      var left = e.clientX - this.ele.offsetWidth / 2;
      if (left < bodyMain.offsetLeft) left = bodyMain.offsetLeft;
      if (left > bodyMain.offsetLeft + bodyMain.offsetWidth - this.ele.offsetWidth) left = bodyMain.offsetLeft + bodyMain.offsetWidth - this.ele.offsetWidth;
      this.ele.style.left = left + "px";
      this.ele.style.top = e.clientY - this.ele.offsetHeight / 2 + "px";
    }.bind(this);
  },
  fire: function(hard) {
    //每隔一小段时间创建子弹
    //根据hard决定子弹的射速
    //间隔时间跟难度成反比
    var time = 1 / hard * 400;
    setInterval(function() {
      this.aBullets.push(new Bullet().init(plane));
      /*var b = new Bullet();
      b.init();
      this.aBullets.push(b);*/
    }.bind(this), time);

  }
}

module.exports = plane;