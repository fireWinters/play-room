import { Context } from "koa"
import ServiceLog from "../services/ServiceLog";
import {BaseExceotion} from "../exceptions";
/**
 * 捕获全局异常的句柄，将错误信息统一的格式输出
 */
export default async (ctx: Context, next: () => {}) => {
    try {
        const result = await next()
        
    } catch (error) {
        let code = 500
        const result = { errorCode: 999,  msg: '网络异常～' }
        if (error instanceof BaseExceotion) {
            result.errorCode = error.errorCode
            result.msg = error.msg || error.message
            code = error.code || code
        } else {
            const content = `${ctx.method} ${ctx.url}
header: ${JSON.stringify(ctx.header)}`
            // 写入日志
            ServiceLog.writeToDay(error, content)
        }
        ctx.state = code
        ctx.body = JSON.stringify(result)
    }
}