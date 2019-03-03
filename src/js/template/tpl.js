/*TMODJS:{"version":"1.0.0"}*/
!function () {

    function template (filename, content) {
        return (
            /string|function/.test(typeof content)
            ? compile : renderFile
        )(filename, content);
    };


    var cache = template.cache = {};
    var String = window.String;

    function toString (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    function escapeFn (s) {
        return escapeMap[s];
    }


    function escapeHTML (content) {
        return toString(content)
        .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };


    var isArray = Array.isArray || function(obj) {
        return ({}).toString.call(obj) === '[object Array]';
    };


    function each (data, callback) {
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    function resolve (from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
        var dirname = ('./' + from).replace(/[^/]+$/, "");
        var filename = dirname + to;
        filename = filename.replace(/\/\.\//g, "/");
        while (filename.match(DOUBLE_DOT_RE)) {
            filename = filename.replace(DOUBLE_DOT_RE, "/");
        }
        return filename;
    };


    var utils = template.utils = {

        $helpers: {},

        $include: function (filename, data, from) {
            filename = resolve(from, filename);
            return renderFile(filename, data);
        },

        $string: toString,

        $escape: escapeHTML,

        $each: each
        
    };


    var helpers = template.helpers = utils.$helpers;


    function renderFile (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: 'Render Error',
            message: 'Template not found'
        });
        return data ? fn(data) : fn; 
    };


    function compile (filename, fn) {

        if (typeof fn === 'string') {
            var string = fn;
            fn = function () {
                return new String(string);
            };
        }

        var render = cache[filename] = function (data) {
            try {
                return new fn(data, filename) + '';
            } catch (e) {
                return showDebugInfo(e)();
            }
        };

        render.prototype = fn.prototype = utils;
        render.toString = function () {
            return fn + '';
        };

        return render;
    };


    function showDebugInfo (e) {

        var type = "{Template Error}";
        var message = e.stack || '';

        if (message) {
            // 利用报错堆栈信息
            message = message.split('\n').slice(0,2).join('\n');
        } else {
            // 调试版本，直接给出模板语句行
            for (var name in e) {
                message += "<" + name + ">\n" + e[name] + "\n\n";
            }  
        }

        return function () {
            if (typeof console === "object") {
                console.error(type + "\n\n" + message);
            }
            return type;
        };
    };


    template.get = function (filename) {
        return cache[filename.replace(/^\.\//, '')];
    };


    template.helper = function (name, helper) {
        helpers[name] = helper;
    };


    if (typeof define === 'function') {define(function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}
    
    /*v:1*/
template('Header',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,logoImg=$data.logoImg,userName=$data.userName,teacher=$data.teacher,$out='';$out+='<div class="header">\r\n  <div class="top-logo-wrap">\r\n    <div class="top-logo-con">\r\n      <div class="logo">\r\n        <img class="logoImg" src="';
$out+=$escape(logoImg);
$out+='" alt="">\r\n      </div>\r\n      <div class="search-wrap">\r\n        <div class="course-or-textbook">\r\n          <span>课程</span>\r\n          <i class="icon iconfont icon-drop-down"></i>\r\n          <ul class="choose-search-category">\r\n            <li>课程</li>\r\n            <li>教材</li>\r\n          </ul>\r\n        </div>\r\n        <input type="text" name="searchCon" class="searchCon">\r\n        <i class="icon iconfont icon-fangdajing searchBtn"></i>\r\n      </div>\r\n      <div class="userinfo-wrap">\r\n        <div class="msg-box">\r\n          <i class="icon iconfont icon-xiaoxi"></i>\r\n        </div>\r\n        <div class="user-option">\r\n          <img src="/assets/img/bookCover.png" alt="">\r\n          <span class="user-name">';
$out+=$escape(userName);
$out+='</span>\r\n          <i class="icon iconfont icon-drop-down"></i>\r\n          <ul class="option-drop-list">\r\n            <li>\r\n              <a href="#">我的资源</a>\r\n            </li>\r\n            <li>\r\n              <a href="#">我的订单</a>\r\n            </li>\r\n            <li>\r\n              <a href="#">个人资料</a>\r\n            </li>\r\n            <li>\r\n              <a href="#">退出登录</a>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n        <div class="stu-or-teacher">\r\n          <span>';
$out+=$escape(teacher);
$out+='</span>\r\n          <i class="icon iconfont icon-drop-down"></i>\r\n          <ul class="choose-drop-list">\r\n            <li>学生端</li>\r\n            <li>教师端</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class="top-nav-wrap">\r\n    <div class="top-nav-con">\r\n      <div class="top-nav-con-l">\r\n        <ul class="top-nav-list">\r\n          <li class="cur">\r\n            <a href="http://localhost:30000/view/student/index.html">首页</a>\r\n          </li>\r\n          <li>\r\n            <a href="http://localhost:30000/view/student/module.html">课程</a>\r\n          </li>\r\n          <li>\r\n            <a href="http://localhost:30000/view/student/textbook.html">教材</a>\r\n          </li>\r\n        <li class="nav-sep">|</li>\r\n        <li class="myStudy">\r\n          <a href="http://localhost:30000/view/student/myStudy.html">我的学习</a>\r\n        </li>\r\n      </ul>\r\n      </div>\r\n      <div class="top-nav-con-r">\r\n        <div class="clearfix">\r\n          <span class="invite-code">\r\n            <a href="#">通过课程邀请码加入课程</a>\r\n          </span>\r\n          <span class="nav-sep">|</span>\r\n          <span class="serial-number">\r\n            <a href="#">通过序列号获取资源权限</a>\r\n          </span>\r\n        </div>\r\n      </div>\r\n      <div class="special"></div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';
return new String($out);
});/*v:1*/
template('Lessons',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$each($data,function($value,$index){
$out+='\n<li>\n    <a href="">\n        <img src="';
$out+=$escape($value.img_src);
$out+='" alt="">\n        <span class="course-name">';
$out+=$escape($value.title);
$out+='</span>\n    </a>\n</li>\n';
});
$out+='\n';
return new String($out);
});/*v:1*/
template('moduleNav',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,parentCateName=$data.parentCateName,childCateName=$data.childCateName,$out='';$out+='<ul class="nav-list">\r\n    <li>\r\n      <a href="http://localhost:30000/api/view/student/index.html">首页</a>\r\n    </li>\r\n    <li class="sep">></li>\r\n    <li>\r\n      <a href="http://localhost:30000/api/view/student/module.html">课程</a>\r\n    </li>\r\n    <li class="sep">></li>\r\n    <li>\r\n      <a href="#">';
$out+=$escape(parentCateName);
$out+='</a>\r\n    </li>\r\n    <li class="sep">></li>\r\n    <li class="cur-position">\r\n      <a href="#">';
$out+=$escape(childCateName);
$out+='</a>\r\n    </li>\r\n  </ul>\r\n';
return new String($out);
});/*v:1*/
template('systemDialog',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,userName=$data.userName,name=$data.name,email=$data.email,telephone=$data.telephone,courseNum=$data.courseNum,courseTakingNum=$data.courseTakingNum,teacherIdentity=$data.teacherIdentity,status=$data.status,$out='';$out+='<form action="" id="editForm">\r\n  <table style="margin: 20px">\r\n    <tr>\r\n      <input type="hidden" name="id" value=';
$out+=$escape(id);
$out+='>\r\n    </tr>\r\n    <tr>\r\n      <td>用户名</td>\r\n      <td>\r\n        <input type="text" name="userName" value="';
$out+=$escape(userName);
$out+='">\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td>姓名</td>\r\n      <td>\r\n        <input type="text" name="name" value="';
$out+=$escape(name);
$out+='">\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td>邮箱</td>\r\n      <td>\r\n        <input type="email" name="email" value="';
$out+=$escape(email);
$out+='">\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td>手机</td>\r\n      <td>\r\n        <input type="text" name="telephone" value="';
$out+=$escape(telephone);
$out+='">\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td>课程数</td>\r\n      <td>\r\n        <input type="number" name="courseNum" value="';
$out+=$escape(courseNum);
$out+='">\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td>开课中</td>\r\n      <td>\r\n        <input type="number" name="courseTakingNum" value="';
$out+=$escape(courseTakingNum);
$out+='">\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td>教师身份</td>\r\n      <td>\r\n        ';
if(+teacherIdentity === 1){
$out+='\r\n        <label>\r\n          <input type="radio" name="teacherIdentity" value="1" checked>有</label>\r\n          <input type="radio" name="teacherIdentity" value="0">无</label>\r\n          ';
}else if(+teacherIdentity === 0){
$out+='\r\n          <label>\r\n              <input type="radio" name="teacherIdentity" value="1">有</label>\r\n          <input type="radio" name="teacherIdentity" value="0" checked>无</label>\r\n        ';
}
$out+='\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td>用户状态</td>\r\n      <td>\r\n        ';
if(+status=== 1){
$out+='\r\n        <label>\r\n          <input type="radio" name="status" value="1" checked>已激活</label>\r\n          <input type="radio" name="status" value="0">未激活</label>\r\n          ';
}else if(+status === 0){
$out+='\r\n          <label>\r\n              <input type="radio" name="status" value="1">已激活</label>\r\n          <input type="radio" name="status" value="0" checked>未激活</label>\r\n        ';
}
$out+='\r\n      </td>\r\n    </tr>\r\n  </table>\r\n</form>\r\n';
return new String($out);
});

}()