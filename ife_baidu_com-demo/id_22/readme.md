# 动态数据绑定（四）

http://ife.baidu.com/course/detail/id/22?t=1488118444113#learn

#课程概述

作业提交截止时间：04-24

#任务目的
熟练使用原生 JS对操作 DOM 结构

#任务描述
这是“动态数据绑定”的第四题。有了前面的充分准备，相信你能搞定这一题。请实现如下的这样一个 Vue，传入参数是一个 Selector 和一个数据对象，程序需要将 HTML 模板片段渲染成正确的模样。 这就是一次性的静态数据绑定。

    let app = new Vue({
      el: '#app',
      data: {
        user: {
          name: 'youngwind',
          age: 25
        }
      }
    });
    <!-- 页面中原本的 html 模板片段 -->
    <div id="app">
        <p>姓名：{{user.name}}</p>
        <p>年龄：{{user.age}}</p>
    </div>
    <!-- 最终在页面中渲染出来的结果 -->
    <div id="app">
        <p>姓名：youngwind</p>
        <p>年龄：25</p>
    </div>

PS：此题尚未要求实现动态数据绑定

#任务注意事项
- 不能使用任何第三方的库
- 程序执行环境为浏览器