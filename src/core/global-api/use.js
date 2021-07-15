/* @flow */

import { toArray } from '../util/index'

export function initUse(Vue: GlobalAPI) {
    Vue.use = function(plugin: Function | Object) {
        const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
        if (installedPlugins.indexOf(plugin) > -1) {
            return this
        }

        // additional parameters
        //去掉第一个参数，返回一个数组
        const args = toArray(arguments, 1)

        //this插入第一个位置 Vue Vue.install()
        args.unshift(this)

        //如果传入的是一个带有install()方法的对象
        if (typeof plugin.install === 'function') {
            plugin.install.apply(plugin, args)
        } else if (typeof plugin === 'function') {
            plugin.apply(null, args)
        }
        installedPlugins.push(plugin)

        // 返回vue构造函数
        return this
    }
}