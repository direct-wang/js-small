/**
 * Created by Administrator on 2016/5/5 0005.
 */
/**
 * Created by Administrator on 2016/4/25 0025.
 */
/*****************************************数组去重*************************************************/
function getArrayEX(arr) {
    //数组去重
    var arrIndex = [];
    arrIndex[0] = arr[0];
    for (var i = 0;i<arr.length;i++){
        if(arrIndex.indexOf(arr[i])!=-1){
            continue;
        }else{
            arrIndex.push(arr[i]);
        }
    }
    return arrIndex;
}
/*****************************************获取样式的兼容性函数******************************************************/
function getStyle(obj,attr){
    if(obj && obj.currentStyle){
        return obj.currentStyle[attr];//兼容IE678
    }else{
        return window.getComputedStyle(obj,null)[attr];
    }
}

function setInnerText(element, content) {
//能力检测
    if (typeof element.innerText === "string") {
        element.innerText = content;
    }else{
        element.textContent = content;
    }
}

/*****************************window.onload*************************************************************/
function addLoad(fun) {
    var oldLoad = window.onload;    //保存之前的window.onload的函数
    //判断
    if(typeof window.onload != "function"){ //这里说明以前没有window.load内没用函数
        window.onload = fun;

    }else{//这里说明以前有函数，先执行以前的函数，在执行新加入;
        window.onload = function () {
            oldLoad();
            fun();
        }
    }
}

//-------------------------------------------------------

function getInnerText(element) {
    //能力检测
    if(typeof element.innerText === "string"){
        return element.innerText;
    }else{
        return element.textContent;
    }
}

//----------------------------------------------------------
//浏览器兼容-找到下一个元素节点
function getNextElement (element){
    if(element.nextElementSibling){
        return element.nextElementSibling;
    }else{
        //找到下一个节点,循环直到找到为止
        var el = element.nextSibling;
        while(el && 1 !== el.nodeType){
            el = el.nextSibling;
        }
        return el;
    }
}

//------------------------------------------------------------
//浏览器兼容-找到上一个元素节点

function getPreviousElement(element){
    if(element.previousElementSibling){
        return element.previousElementSibling
    }else{
        //找到上一个节点,循环到找到为止
        var el = element.previousSibling;
        while(el && 1!==el.nodeType){
            el = el.previousSibling;
        }
        return el;
    }
}

//------------------------------------------------------------
//浏览器兼容-找到第一个子元素节点

function getFirstElement(element){
    if(element.firstElementChild){
        return element.firstElementChild;
    }else{
        var el = element.firstChild;
        while(el && 1 !== el.nodeType){
            el = el.nextSibling;
        }
        return el;
    }
}

//-------------------------------------------------------------
//浏览器兼容-找到最后一个元素节点

function getLastElement(element){
    if(element.lastElementChild){
        return element.lastElementChild;
    }else{
        var el = element.lastChild;
        while(el && 1!== el.nodeType){
            el = el.previousSibling;
        }
        return el;
    }
}


//---------------------------------------------------------
//id封装
function my$(id){
    return document.getElementById(id);
}

//---------------------------------------------------------
//scroll函数封装
function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}


//---------------------------动画函数--------------------------------
//动画函数
function animate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = 20;
        step = obj.offsetLeft < target ? step : -step;
        leader = leader + step;
        if (Math.abs(obj.offsetLeft - target) > Math.abs(step)) {
            obj.style.left = leader + "px";
        } else {
            obj.style.left = target + "px";
            clearInterval(obj.timer);
        }
    }, 15)
}

/**
 * 无缝滚动
 * @param obj 事件执行者
 * @param step 目标距离
 * @param time 时间间隔
 * @param type 状态
 */
function animateAudo(obj,step,time,type) {

    if(!type){
        clearInterval(obj.timer);
    }else{
        obj.timer = setInterval(function () {
            var leader = obj.offsetLeft;
            var send = step;
            if(leader>(-obj.offsetWidth+obj.children[0].offsetWidth)){
                leader = leader + send;
                obj.style.left = leader + "px";
            } else{
                obj.style.left = send+"px";
            }
        },time);
    }

}

/**
 * 缓动框架--多个数值属性
 * @param obj 事件执行者
 * @param json 事件执行者属性集合
 * @param callback 回调函数
 */
function slowAnimate(obj, json,tm, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;//true表示可以清理
        for (var k in json) {
            //k:v
            //k:json[k]
            //属性名:属性目标值
            if (k == "opacity") {
                var leader = getStyle(obj, k) * 100;
                //虽然getStyle获取到的是字符串类型 但是参与运算后会自动转换
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                obj.style[k] = (leader + step) / 100;
            } else if (k == "zIndex") {
                obj.style[k] = json[k];
            } else {
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                obj.style[k] = leader + step + "px";
            }
            if (leader != target) {
                flag = false;//告诉标记 我这个值还没达到不要清理
            }

        }
        //遍历完成之后再检查
        if (flag) {
            clearInterval(obj.timer);
            if (callback) {
                callback();
            }
        }
    }, tm)
}
/****************************************正则匹配********************************************/
/**
 * 用于表单验证
 * @param obj
 * @param reg 正则匹配规则
 */
function check(obj,reg) {
    obj.onblur = function () {
        var span = obj.nextElementSibling;
        if(reg.test(obj.value)){
            span.innerHTML = "输入正确";
            span.className = "right";
        }else{
            span.innerHTML = "输入错误";
            span.className = "wrong";
        }
    };
}

/********************************去掉字符串两边空格*****************************************/

/**
 * 去掉字符串两边空格
 * @param str
 * @returns {any}
 * @constructor
 */
function Strim(str) {
    return str.stream?str.stream(/\s/,''): str.replace(/^\s|\s$/,'');
}