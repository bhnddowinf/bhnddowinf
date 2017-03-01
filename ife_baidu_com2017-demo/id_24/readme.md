
# 动态数据绑定（五）

http://ife.baidu.com/course/detail/id/24?t=1488118617506#learn

# 课程概述

    作业提交截止时间：04-24

# 任务目的
    综合应用本系列的所有知识点
# 任务描述
这是“动态数据绑定”的最后一题了，希望你能坚持到最后。在第四题的基础上，我们考虑如何做到："当数据发生改变时，重新渲染 DOM。" 此目标又可以分为两层难度。

相对简单的目标：数据任意部分发生了变化，都重新渲染 DOM。
相对困难的目标：数据的某一部分发生了变动，只重新渲染对应这部分数据的 DOM。
举个例子。

    let app = new Vue({
      el: '#app',
      data: {
        user: {
          name: 'youngwind',
          age: 25
        },
        school: 'bupt',
        major: 'computer'
      }
    });
    <!-- 页面中原本的 html 模板片段 -->
    <div id="app">
        <p>姓名：{{user.name}}</p>
        <p>年龄：{{user.age}}</p>
    </div>


相对简单的目标是说：无论是修改数据的哪一部分（包括没有在页面中出现的 school 和 major 这两部分），DOM 都会重新渲染。（即便前后渲染结果一致）
相对困难的目标是说：只有当 user.name 和 user.age 发生改变的时候，DOM 才会重新渲染；而 school 和 major 的变化不会引发重新渲染。

最后，无论你选择哪种难度，能完成本题，就已经很棒了！

如果你想了解更多这个系列的后续，可以访问我的博客。同时也欢迎通过邮件与我联系，进行更多的交流。

# 任务注意事项
- 不能使用任何第三方的库
- 程序执行环境为浏览器

# 在线学习参考资料
vue早期源码学习系列之四：如何实现动态数据绑定

[梁少峰的 blog] (https://github.com/youngwind/blog)

[动态数据绑定（五] (https://github.com/youngwind/blog/issues/87)

[BUPT-HJM good student](https://github.com/BUPT-HJM/study-js/blob/master/study-vue/baidu-ife-2017/dataBind-5.html)