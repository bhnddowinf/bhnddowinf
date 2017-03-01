
# 封装DOM动画类库（一）

#课程概述

作业提交截止时间：04-24

#任务目的
- 理解DOM动画的本质
- 深入理解JS DOM动画实现原理
- 学习和掌握javascript类库的设计与开发-
- 通过封装类库合理使用设计模式，理解设计模式及其带来好处

#任务描述
- 动画库API（接口文档）设计参考velocity.js，参考其源码实现，类似：Animation(DOM元素集合，变化CSS属性集合，选项)或者Animation(DOM元素集合).animation(变化CSS属性集合，选项)。
- 动画选项设计靠拢CSS3动画概念（duration，time-function/easing，delay，iteration-count／loop），采用补间动画设计，其中time-function/easing选项最好采用贝塞尔曲线算法实现，并与定义好ease，ease-in,ease-out等等。
- 适当设计回调函数选项（begin，complete，progress）。
- 设计动画命令，用于调用常用动画（比如淡入淡出Animation(DOM元素集合).fadeIn(选项)）和动画控制（比如停止动画：Animation(DOM元素集合).stop()）。

# 任务注意事项
- 使用requestAnimationFrame代替定时器
- 最好采用面向对象方式开发，对外提供umd接口
- 运用合理的设计模式：此库可以用到迭代器模式、外观模式、策略模式、命令模式等
- 代码拥有良好的注释
- 尽量实现较多的缓动效果
- 尽量提高动画性能
- 动画库尽量能兼容老版浏览器

# 在线学习参考资料
- velocity.js
- http://velocityjs.org/
- 慕课网课程- Velocity.js实现弹出式相框
- http://www.imooc.com/learn/471
- 实现tween.js
- http://www.zhangxinxu.com/wordpress/?p=5828
- 慕课网课程-js动画效果
- http://www.imooc.com/learn/167
- 慕课网课程-原生js实现帧动画库
- http://www.imooc.com/learn/659
- CSS动画 VS JS动画，哪个更快
- https://davidwalsh.name/css-js-animation