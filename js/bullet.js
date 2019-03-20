const Tools = require("./tools");
function Bullet() {

}
Bullet.prototype = {
  constructor: Bullet,
  init: function(plane) {//因为不可出现循环形式；
    this.plane = plane;
    this.ele = Tools.createDiv("bullet");
    var left = plane.ele.offsetLeft + plane.ele.offsetWidth / 2 - this.ele.offsetWidth / 2;
    var top = plane.ele.offsetTop - this.ele.offsetHeight;
    this.ele.style.top = top + "px";
    this.ele.style.left = left + "px";
    this.move();
    return this;
  },
  move: function() {
    //子弹移动
    var _this = this;
    this.timer = setInterval(function() {
      _this.ele.style.top = _this.ele.offsetTop - 10 + "px";
      //子弹是否超出屏幕
      if (_this.ele.offsetTop < -50) {
        _this.die();
      }
    }, 30);
  },
  die: function() {
    clearInterval(this.timer);
    this.ele.className = "bullet_die";
    setTimeout(function() {
      this.ele.className = "bullet_die2";
      document.body.removeChild(this.ele);
    }.bind(this), 100);

    //从plane的数子弹组里把自己移除
    for (var i = 0; i < this.plane.aBullets.length; i++) {
      if (this.plane.aBullets[i] === this) {
        this.plane.aBullets.splice(i, 1);
      }
    }
  }
}

module.exports = Bullet;