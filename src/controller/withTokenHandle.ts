import { Context } from "koa";
import { ExceptionToken } from "../exceptions";
import {ServiceToken} from '../services/ServiceToken'
/**
 * 对接口进行统一token校验，如果不合法直接抛出异常
 */
export default async(ctx: Context, next: () => {}) => {
    
    const fillterRouter = /(token\/get\b)|(user\/temporary\b)/i
    if (fillterRouter.test(ctx.url) === true) {
        return await next()
    }
    
    const token = ctx.header.token as string
    if (!token) { throw new ExceptionToken.Miss() }
    ServiceToken.hasIn(token)

    await next()
}