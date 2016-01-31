(function(window) {
  "use strict"
  //函数工具
  var log = function(str) {
    console.log(str);
  }

  function selectByClassName(className) {
    var parent = document.getElementsByTagName("*");
    var selectItems = [];
    for (var i = 0; i < parent.length; i++)
      (parent[i].className == className) && selectItems.push(parent[i])
    return selectItems;
  }

  var light_selector = function(str) {
    //将传入的选择器语句赋值给内置属性
    //log(str);
    this.selector_string = str;
    //log(this.selector_string);
    //返回被选择的元素的数组
    this.selectorItems = [];
    this.select();
    return this.selectorItems;
  }

  var select_pro = light_selector.prototype;
  select_pro.select = function() {
      var select_key = this.selector_string.charAt(0);
      var select_object = this.selector_string.slice(1);
      log(select_key);
      if (select_key == ".") {
        this.selectorItems = selectByClassName(select_object);
      } else if (select_key == "#") {
        this.selectorItems[0] = document.getElementById(select_object);
      } else {
        this.selectorItems = document.getElementsByTagName(this.selector_string);
      }
    }
    //暴露方法到全局
  window.select = function(str) {
    return new light_selector(str);
  }
})(window)
