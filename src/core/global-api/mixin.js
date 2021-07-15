/* @flow */

import { mergeOptions } from '../util/index'

export function initMixin(Vue: GlobalAPI) {
    Vue.mixin = function(mixin: Object) {
        //拷贝option 注册的全局选项
        this.options = mergeOptions(this.options, mixin)
        return this
    }
}