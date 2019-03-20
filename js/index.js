const Engine = require("./engine");
require("!style-loader!css-loader!../css/dahuiji.css");
window.onload = function () {
  new Engine();
}