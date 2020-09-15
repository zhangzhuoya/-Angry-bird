function createEle(eleName, classArr, styleObj) {
  var dom = document.createElement(eleName);
  for (var index = 0; index < classArr.length; index++) {
    dom.classList.add(classArr[index]);
  }
  for (var i in styleObj) {
    dom.style[i] = styleObj[i];
  }
  return dom;
}
function setLocal(key, value) {
  if (typeof value === "object" && value !== null) {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
}
function getLocal(key) {
  var value = localStorage.getItem(key);
  if (value === null) {
    return value;
  }
  if (value[0] === "[" || value[0] === "}") {
    return JSON.parse(value);
  }
  return value;
}
function formatNum(num) {
    if(num<10){
        return '0'+num;
    }
    return num;
    
}