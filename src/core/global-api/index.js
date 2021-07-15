/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import {set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
    warn,
    extend,
    nextTick,
    mergeOptions,
    defineReactive
} from '../util/index'

export function initGlobalAPI(Vue: GlobalAPI) {
    // config
    const configDef = {}
    configDef.get = () => config
    if (process.env.NODE_ENV !== 'production') {
        configDef.set = () => {
            warn(
                'Do not replace the Vue.config object, set individual fields instead.'
            )
        }
    }

    //初始化静态config
    Object.defineProperty(Vue, 'config', configDef)

    // exposed util methods.
    // NOTE: these are not considered part of the public API - avoid relying on
    // them unless you are aware of the risk.
    Vue.util = {
        warn,
        extend,
        mergeOptions,
        defineReactive
    }

    //静态全局
    Vue.set = set
    Vue.delete = del
    Vue.nextTick = nextTick

    //新增响应式方法Vue.obsever
    // 2.6 explicit observable API
    Vue.observable = < T > (obj: T): T => {
        observe(obj)
        return obj
    }

    // 设置对象，无原型，提高性能
    //ASSET_TYPES 挂载三个成员对象  'components','directives','filters'存储全局组件指令过滤器
    Vue.options = Object.create(null)
    ASSET_TYPES.forEach(type => {
        Vue.options[type + 's'] = Object.create(null)
    })

    // this is used to identify the "base" constructor to extend all plain-object
    // components with in Weex's multi-instance scenarios.
    Vue.options._base = Vue

    //设置keep-alive 拷贝对象
    //拷贝 注册全局组件
    extend(Vue.options.components, builtInComponents)

    //  注册全局静态方法
    //  vue.use()
    initUse(Vue)

    // vue.mixin()
    initMixin(Vue)

    // vue.extend() 返回组件的构造函数
    initExtend(Vue)

    //Vue.directive()  component() filter() 参数一致
    initAssetRegisters(Vue)
}