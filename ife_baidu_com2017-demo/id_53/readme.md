# 封装DOM动画类库（二）


#任务目的
- 理解DOM动画的本质
- 深入理解JS DOM动画实现原理
- 学习和掌握javascript类库的设计与开发
- 通过封装类库合理使用设计模式，理解设计模式及其带来好处
- 打造属于自己的动画操作流

# 任务描述
- 在任务《封装DOM动画类库（一）》基础上继续完善动画库，实现更多选项
- 能够完成链式调用，实现动画队列。（参考jquery的queue或者ES6的generator）
- 增加定义动画序列和调用动画序列功能，参考velocity.js的UI Pack插件的Sequence部分
- 增加预定义动画功能，参考velocity.js的UI Pack插件的pre-registered effects
- 完成reverse、finish等命令
- 支持transform动画、颜色过渡动画

# 任务注意事项
- 使用requestAnimationFrame代替定时器
- 最好采用面向对象方式开发，对外提供umd规范接口
- 运用合理的设计模式：此库可以用到迭代器模式、外观模式、策略模式、命令模式等
- 代码拥有良好的注释
- 尽量实现较多的缓动效果
- 尽量提高动画性能
- 动画库尽量能兼容老版浏览器

# 在线学习参考资料
- velocity.js
- http://velocityjs.org/
- velocity.js UI pack插件
- http://velocityjs.org/#uiPack
- 慕课网课程- Velocity.js实现弹出式相框
- http://www.imooc.com/learn/471
- 慕课网课程-原生js实现帧动画库
- http://www.imooc.com/learn/659
- 实现tween.js
- http://www.zhangxinxu.com/wordpress/?p=5828
- ES6 generator
- http://es6.ruanyifeng.com/#docs/generator
- JQuery queue
- http://jquery.cuishifeng.cn/queue.html