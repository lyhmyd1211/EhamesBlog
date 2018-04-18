import moment from 'moment';
/**
 * 判断是否存在类名
 * @param {} elements DOM元素
 * @param {} cName 是否存在的类名
 */
export function hasClass(elements, cName) {     
  return !!elements.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)'));
}
/**
 * 为某个DOM添加类名
 * @param {} elements 需要添加类名的DOM
 * @param {} cName 需要添加的类名
 */
export function addClass(elements, cName) {
  if (!hasClass(elements, cName)) {
    elements.className += ' ' + cName;
  }
}
/**
 * 移除某个DOM的类名
 * @param {*} elements 需要移除类名的Dom
 * @param {*} cName 需要语移除的类名
 */
export function removeClass(elements, cName) {
  if (hasClass(elements, cName)) {
    elements.className = elements.className.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), ' ');
  }
}
/**
 * 
 * @param {*} cName 要获取高度的DOM
 */
export function getElementClientHeight(cName){
  return document.getElementById(cName).clientHeight;
}
/** 
 * 获取当前滚动条所在位置
*/
export function getScrollTop(){
  let scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  // console.log('当前', scrollTop);
  
  return scrollTop;
}
/**
 * TODO
 * @param {*} position 滚动到何处
 * @param {*} step 步长
 * @param {*} current 滚动条当前位置
 */
export function ScrollToAnimate(position,step,current){
  let start = 0;
  let timer = setInterval(() => {
    if ((current - start)>=position) {
      start += step;
      window.scrollTo(0, current - start);
    }else{
      clearInterval(timer);
    }
  }, 0);
}
/** 
 * 获取滚动条位置百分比
*/
export function getScrollPercent(){
  let percent = 0;
  percent = Math.round((getScrollTop() - document.body.offsetHeight) / (document.getElementById('root').offsetHeight - document.body.offsetHeight * 2) * 100);
  return percent;
}
/**
 * 
 * @param {*} date date类型时间
 * @param {*} type 获取的类型:'year','month','date'
 */
export function getDate(date,type){
  let time = new Date(date);
  switch (type) {
  case 'year':
    return time.getFullYear(); 
  case 'month':
    return time.getMonth()+1;
  case 'date':
    return time.getDate();
  default:
    return 'error';
  }
}
/**
 * 
 * @param {*} date 日期
 * @param {*} type 格式化内容 year-返回xxxx年 month-返回xx月 date-返回xx日
 */
export function formatMoment(date,type){
  let time = moment(date);
  switch (type) {
  case 'year':
    return time.year()+'年';
  case 'month':
    return (time.month() + 1) < 10 ? '0' + (time.month() + 1) +'月': (time.month() + 1)+'月';
  case 'date':
    return time.date() < 10 ? '0' + time.date()  : time.date();
  default:
    return 'error';
  }
}
/** 
 * 生成UUID
*/
export function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
/**
 * 获取文章目录
 * @param {*} element 文章根DOM
 */
export function getCataLog(element){
  let cataLog = [];
  let tag = ['H1', 'H2', 'H3'];
  cataLog = Array.from(element.querySelectorAll('h1,h2,h3'));
  console.log('cataLog',cataLog);
  return cataLog.map(item=>{
    function getNextNode(el){
      if (el.nextElementSibling !== null && tag.findIndex(_ => _===el.tagName) === -1) {
        return getNextNode(el.nextElementSibling);
      }else{
        return el;
      }
    }
    return { type: 'cataLog-' + item.tagName, text: item.innerText, node: item, nextNode: getNextNode(item.nextElementSibling) };
  }); 
  
}
