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
 * agetv站点的错误异常
 */
export namespace ExceptionACG{
    export class NotDetail extends BaseExceotion{
        code = 204
        msg = '嗨呀～内容跑掉了'
        errorCode = 10100
    }

    export class NotPlayLink extends BaseExceotion{
        code = 204
        msg = '嗨呀～播放链接不见了'
        errorCode = 10101
    }
}