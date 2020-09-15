function createEle(eleName,classArr,styleObj){
    var dom = document.createElement(eleName);
    for (var index = 0; index < classArr.length; index++) {
       dom.classList.add(classArr[index])       
   }
   for (var i in styleObj) {
     dom.style[i] = styleObj[i] 
    }
    return dom;
}