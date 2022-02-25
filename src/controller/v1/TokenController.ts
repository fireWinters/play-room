import { GET, route } from "awilix-koa";
import { Context } from "koa";
import {ServiceUser} from '../../services/ServiceUser';
import {ServiceToken} from '../../services/ServiceToken';
import { ExceptionUser } from "../../exceptions";

@route('/v1/token')
export class TokenController {

    /**
    * @api {GET} /v1/token/get 根据sign码获取token
    * @apiName 获取token
    * @apiGroup Token
    * @apiVersion 1.0.0
    * 
    * @apiSuccess  {Number} code 成功时返回 200
    * @apiHeaderExample {json} Header-Example:
    * {
    *   "sign": "登录或者注册临时用户返回"
    * }
    *  
    * @apiSuccessExample {type} Success-Response:
    * {
    *      msg: 'ok',
    *      data: {token: '调用接口的临时凭证'},
    *      errorCode: 0
    * }
    */
    @route('/get')
    @GET()
    async get(ctx: Context): Promise<{token: string}>{
        const sign: string = ctx.header.sign as string
        if (!sign) { throw new ExceptionUser.MissSign('sign不存在！') }
        const udata = await ServiceUser.decodeLoginSign(sign)
        const token = ServiceToken.login(udata)
        return {token}
    }
}