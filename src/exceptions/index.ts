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