import { POST, GET, route } from "awilix-koa";
import { Context } from "koa";
import { interfaceUser } from "../../interface/interfacaUser";
import { randomName, date } from "../../utils/utils";
import {USER_LEVEL} from '../../menu/USER_LEVEL';
import {ServiceUser} from '../../services/ServiceUser';
import {ServiceToken} from '../../services/ServiceToken'
import { ParamExceotion } from "../../exceptions";

/**
 * 用户相关的模块
 */
@route('/v1/user')
export class UserController{
    
    /**
    * @api {GET} /v1/users/temporary 注册临时用户
    * @apiName 注册临时用户
    * @apiGroup 用户相关
    * @apiVersion 1.0.0
    * 
    * @apiSuccess  {Number} code 成功时返回 200
    * 
    * @apiSuccessExample {type} Success-Response:
    * {
    *      msg: 'ok',
    *      data: {sign: '用来换取token的sign密钥，过期时间很长。用户修改了密码会失效'},
    *      errorCode: 0
    * }
    */
    @route('/temporary')
    @GET()
    async autoRegister(): Promise<{sign: string}>{
        const password = ServiceUser.codePassword(`${Date.now()}${Math.random()}`)
        const userData: interfaceUser.detail = {
            nickname: randomName(),
            level: USER_LEVEL.TEMPRORAAY,
            create_date: date('y-m-d h:i:s'),
            password: password
        }
        const udata = await ServiceUser.createUser(userData)
        const sign = ServiceUser.codeLoginSign(udata)
        return { sign: sign }
    }

    /**
    * @api {POST} /v1/users/upname 更新用户昵称
    * @apiName 更新用户昵称
    * @apiGroup 用户相关
    * @apiVersion 1.0.0
    * 
    * @apiBody {String} nickname   用户昵称
    * 
    * @apiSuccess  {Number} code 成功时返回 200
    * @apiHeaderExample {json} Header-Example:
    * {
    *   "token": "通过sign码可换取"
    * }
    *  
    * @apiSuccessExample {type} Success-Response:
    * {
    *      msg: 'ok',
    *      data: {nickname: '更新的用户名'},
    *      errorCode: 0
    * }
    */
    @route('/upname')
    @POST()
    async upname(ctx: Context) {
        const body = ctx.bodyJSON
        if (!body?.nickname) { throw new ParamExceotion('nickname不能为空') }
        if (/^(.{1,8})$/.test(body.nickname) === false) { throw new ParamExceotion(' nickname字数必须大于0且小于9') }
        const token = ServiceToken.get(ctx.header.token as string)
        const changedRows = await ServiceUser.upData(token.id, {nickname: body.nickname})
        return {changedRows}
    }

}