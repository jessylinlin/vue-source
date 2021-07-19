/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters(Vue: GlobalAPI) {
    /**
     * Create asset registration methods.
     */
    ASSET_TYPES.forEach(type => {
        Vue[type] = function(
            id: string,
            definition: Function | Object
        ): Function | Object | void {
            if (!definition) {
                //Vue.options中存储directive extend component
                return this.options[type + 's'][id]
            } else {
                /* istanbul ignore if */
                if (process.env.NODE_ENV !== 'production' && type === 'component') {
                    validateComponentName(id)
                }
                //原始Object  Object.prototype.toString.calll(obj) === '[object Object]'
                if (type === 'component' && isPlainObject(definition)) {
                    definition.name = definition.name || id

                    //vue.extend 普通选项对象转换为vue.component构造函数
                    // this.options._base === Vue
                    definition = this.options._base.extend(definition)
                }
                if (type === 'directive' && typeof definition === 'function') {
                    definition = { bind: definition, update: definition }
                }
                //全局注册 存储资源赋值
                //this.options['components'] =definition
                this.options[type + 's'][id] = definition
                return definition
            }
        }
    })
}