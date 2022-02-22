import { Context } from "koa";

/**
 * 最终返回的结果进行统一格式返回
 * {data: 最终返回的数据, msg: 'ok', errorCode: 0}
 */
export default async(ctx: Context, next: () => {}) => {
    const result = await next()
    let content: {
        data: string|any[]|object;
        msg: string;
        errorCode: number;
    } = {
        data: '',
        msg: 'ok',
        errorCode: 0
    }
    let code = 200
    if (typeof result === 'string') {
        content.data = result
        if (result === '') { code = 204 }
    } else if (result.toString() === '[object Object]') {
        content.data = result
        if (Object.keys(result).length === 0) { code = 204 }
    } else if (result instanceof Array) {
        content.data = result
        if (result.length === 0) { code = 204 }
    }
    ctx.state = code
    ctx.body = JSON.stringify(content)
}