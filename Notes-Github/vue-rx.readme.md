# 拷贝日期：2016-12-12
> 说明：尤大改了，本人懒，看心情再说
> 不翻译：

> subscriptions 订阅(名词)：这不翻，自已背下来吧，因为也是 api，不翻，你才看懂代码

> subscribe 订阅(动词)：这不翻，自已背下来吧，因为也是 api，不翻，你才看懂代码

> observables 被观察的对象，这不翻，自已背下来吧，因为也是 api，不翻，你才看懂代码



# vue-rx

Simple [RxJS](https://github.com/Reactive-Extensions/RxJS) binding for Vue.js. 

> Vue.js的簡單RxJS綁定

It also supports subscriptions for generic observables that implement the `.subscribe` and `.unsubscribe` (or `.dispose`) interface. 

>  `.subscribe` and `.unsubscribe` (or `.dispose`) 是原来的 rx.js observable 的 api

> vue-rx 可以订阅那些被观察的对象。（不懂没关系…我继续讲）

For example, you can use it to subscribe to `most.js` or Falcor streams, but some features require RxJS to work.

> 范例中，你能订阅 `most.js` 或者Falcor streams，但要求 RxJS 运行

### Installation 安装

#### NPM + ES2015

``` bash
npm install vue vue-rx rxjs --save
```

``` js
import Vue from 'vue'
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'

// tada!
Vue.use(VueRx, Rx)
```

#### Tips for Reducing Bundle Size 提示：减小打包后的大小

In most cases, you probably don't need the full build of Rx. 

> 在大多數情況下，你不需要完整版的rx

You can reduce the amount of code included in your bundle by doing the following:

> 按下列动作，来减少打包的东西


``` js
import Vue from 'vue'
import VueRx from 'vue-rx'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription' // Disposable if using RxJS4

// tada!
Vue.use(VueRx, { Observable, Subscription })
```

#### Global Script 全局脚本

Just make sure to include `vue-rx.js` after Vue.js and RxJS. It will be installed automatically.

> 确认依序将 Vue.js, RxJS , `vue-rx.js` include , 它将自动安装

### Usage 使用

> 注：vue 会有一个新的 option `subscriptions` ，这里是订阅功能
> 

``` js
// provide Rx observables with the `subscriptions` option
new Vue({
  el: '#app',
  subscriptions: {
    msg: messageObservable
  }
})
```

``` html
<!-- bind to it normally in templates -->
<div>{{ msg }}</div>
```

The `subscriptions` options can also take a function so that you can return unique observables for each component instance:

> `subscriptions` options , 也是一个 function, 每个组件的实例， 可以 return RsJS 的 observables


``` js
Vue.component('foo', {
  subscriptions: function () {
    return {
      msg: Rx.Observable.create(...)
    }
  }
})
```

The observables are exposed as `vm.$observables`:

> observables 另一种 api用法 `vm.$observables`

``` js
var vm = new Vue({
  subscriptions: {
    msg: messageObservable
  }
})

vm.$observables.msg.subscribe(msg => console.log(msg))
```

#### `$watchAsObservable(expOrFn, [options])`

> This feature requires RxJS.来自 RxJS

This is a prototype method added to instances.
> 这是 原型的方法，新增至 实例中。

 You can use it to create an observable from a value watcher. The emitted value is in the format of `{ newValue, oldValue }`:

> 你可以用它，从 watcher 建立一个 observable. 这个 发射的值，有制式的格式 `{ newValue, oldValue }`

``` js
var vm = new Vue({
  data: {
    a: 1
  },
  subscriptions () {
    // declaratively map to another property with Rx operators
    return {
      aPlusOne: this.$watchAsObservable('a')
        .pluck('newValue')
        .map(a => a + 1)
    }
  }
})

// or produce side effects...
vm.$watchAsObservable('a')
  .subscribe(
    ({ newValue, oldValue }) => console.log('stream value', newValue, oldValue),
    err => console.error(err),
    () => console.log('complete')
  )
```

The optional `options` object accepts the same options as `vm.$watch`.

#### `$subscribeTo(observable, next, error, complete)`

This is a prototype method added to instances. 
> 这原型方法，新增到实例中

You can use it to subscribe to an observable, but let VueRx manage the dispose/unsubscribe.

> 你能 订阅一个被观察的对象，以让 vue-rx 管理 部署与取消

``` js
var vm = new Vue({
  mounted () {
    this.$subscribeTo(Rx.Observable.interval(1000), function (count) {
      console.log(count)
    })
  }
})
```

#### `$fromDOMEvent(selector, event)`

> This feature requires RxJS.

This is a prototype method added to instances. 
> 这原型方法，新增到实例中

Use it to create an observable from DOM events within the instances' element. 

> 从 dom 建立 observable 对象

This is similar to `Rx.Observable.fromEvent`, but usable inside the `subscriptions` function even before the DOM is actually rendered.

> 这模拟 `Rx.Observable.fromEvent`，但有一个要求，这函数要在 dom 渲染前使用。

``` js
var vm = new Vue({
  subscriptions () {
    return {
      inputValue: this.$fromDOMEvent('input', 'keyup').pluck('target', 'value')
    }
  }
})
```

### Caveats 警告

You cannot use the `watch` option to watch subscriptions, 

> `watch` 不能使用 subscriptions

because it is processed before the subscriptions are set up. 

> 因为 `watch` 在 subscriptions 之前，处理

But you can use `$watch` in the `created` hook instead.

> 但你可以 使用 `$watch` 在 `created` 生命周期来代替

### Example

See `/examples` for some simple examples.

### License

[MIT](http://opensource.org/licenses/MIT)
