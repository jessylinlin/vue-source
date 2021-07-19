/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile(
    template: string,
    options: CompilerOptions
): CompiledResult {
    //1 模板转换为ast抽象语法树 返回解析完的ast对象
    const ast = parse(template.trim(), options)
    if (options.optimize !== false) {
        //2 优化语法树
        optimize(ast, options)
    }
    // 3 ast转换为字符串格式js代码 --此时js代码是字符串格式
    const code = generate(ast, options)
    return {
        ast,
        render: code.render,
        //静态渲染函数 生成静态vnode 树
        staticRenderFns: code.staticRenderFns
    }
})