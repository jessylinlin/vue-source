import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

/* 
  Vue构造函数
   参数：options 
 */
function Vue(options) {
    if (process.env.NODE_ENV !== 'production' &&
        !(this instanceof Vue) //必须用new 调用
    ) {
        warn('Vue is a constructor and should be called with the `new` keyword')
    }
    this._init(options)
}

//给Vue原型挂载方法
//初始化_init()
initMixin(Vue)

//初始化$data $props 
stateMixin(Vue)

// 初始化事件相关方法  $on $once $off $emit
eventsMixin(Vue)

// 初始化生命周期相关方法 ._update $forceUpdate $destroy 
lifecycleMixin(Vue)

//混入render $nextTick
renderMixin(Vue)

export default Vue