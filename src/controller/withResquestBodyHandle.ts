import { Context } from "koa";

/** 接受json数据 */
const takeJSONByCtx = (ctx: Context, contentType: string) => {
    return new Promise(resolve => {
        if (contentType !== 'application/json') { resolve(null) }
        let body = ''
        ctx.req.on('data', chunk => body += chunk)
        ctx.req.on('end', () => {
            let data = body
            try {
                data = JSON.parse(body)
            } catch(error) {data = body}
            ctx.bodyJSON = data
            resolve(null)
        })
    })
}

/**
 * 对请求体的数据进行处理
 */
export default async(ctx: Context, next: () => {}) => {
    const contentType = (ctx.header['content-type'] || ctx.header['CONTENT-TYPE'] || ctx.header['ContentType']) as string
    await takeJSONByCtx(ctx, contentType)
    await next()
}