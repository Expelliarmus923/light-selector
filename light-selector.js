(function(window) {
  "use strict"
  //函数工具
  var _log = function(str) {
    console.log(str);
  }
  //追加数组
  function append(oldArray,newArray){
    var len = oldArray.length;
    for(var i =0;i<newArray.length;i++){
      oldArray[len++] = newArray[i];
    }
    return oldArray;
  }
  //通过类名找到元素
  function findByClassName(parentNode,className) {
    var parent = parentNode.getElementsByTagName("*");
    var selectItems = [];
    for (var i = 0; i < parent.length; i++)
      (parent[i].className == className) && selectItems.push(parent[i])
    return selectItems;
  }

  //通过标签找到元素。
  function findByTagName(parentNode,TagName){
    if(parentNode.getElementsByTagName(TagName))
    return parentNode.getElementsByTagName(TagName);
  }

  //通过ID找到元素
  function findById(id){
    if(document.getElementById(id))
    return document.getElementById(id);
  }

  var light_selector = function(str) {
    //将传入的选择器语句赋值给内置属性
    this.selector_string = str;
    //返回被选择的元素的数组
    this.selectorItems = [];
    return this.init();
  }

  var select_pro = light_selector.prototype;
  select_pro.init = function(){
    var select_keys = [];
    var selectorItems = [];
    select_keys = append([],this.selector_string.split(" "));
    var select_0 = this.fristClassSelect(select_keys[0]);
    var select_1 = [];
    for(var i = 0; i<select_0.length;i++){
      this.fristClassSelect(select_keys[1],select_0[i],select_1);
    }
    return select_1;
  }
  //顶级类名选择器 root 需传入父类元素，默认document
  select_pro.fristClassSelect = function(str,root,selectorItems) {
      var _root = root||document;
      var _selectorItems = selectorItems||[];
      var select_key = str.charAt(0);
      var select_object = str.slice(1);
      if (select_key == ".") {
        _selectorItems = append(_selectorItems,findByClassName(_root,select_object));
      } else if (select_key == "#") {
        _selectorItems = append(_selectorItems,findById(select_object));
      } else {
        _selectorItems = append(_selectorItems,findByTagName(_root,str));
      }
      return _selectorItems;
    }
    //暴露方法到全局
  window.select = function(str) {
    return new light_selector(str);
  }
})(window)
