/**
 * 基础异常类
 */
export class BaseExceotion extends Error{
    msg = '网络异常～'
    errorCode = 999
    code = 500

    constructor(msg?: string, errorCode?:number, code?: number) {
        super(msg)
        if (msg) {  this.msg = msg }
        if (errorCode) {  this.errorCode = errorCode }
        if (code) {  this.code = code }
        Object.setPrototypeOf(this, BaseExceotion.prototype)
    }
}

/**
 * 参数校验错误类
 */
 export class ParamExceotion extends BaseExceotion{
    msg = '参数校验异常'
    errorCode = 10000
    code = 400
}

/**
 * agetv站点的错误异常
 */
export namespace ExceptionACG{
    export class NotDetail extends BaseExceotion{
        code = 204
        msg = '嗨呀～内容跑掉了'
        errorCode = 20100
    }

    export class MissPlayLink extends BaseExceotion{
        code = 204
        msg = '嗨呀～播放链接不见了'
        errorCode = 20101
    }
}

/**
 * 用户相关的异常
 */
export namespace ExceptionUser{

    export class MissSign extends BaseExceotion{
        code = 401
        msg = 'sign已失效,请重新登录～'
        errorCode = 30100;
    }

    export class MissUser extends BaseExceotion{
        code = 403
        msg = '当前sign已失效,请重新登录～'
        errorCode = 30200
    }
}

/**
 * token相关的异常
 */
 export namespace ExceptionToken{

    export class Miss extends BaseExceotion{
        code = 403
        msg = '当前token不存在或已过期'
        errorCode = 40100;
    }
}