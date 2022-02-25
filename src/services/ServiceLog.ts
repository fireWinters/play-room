import {writeFile} from 'fs';
import {touchPath} from '../utils/utils'

// 如果保存路径不存在则进行创建
const savePath = `${__dirname}/../../runtime/log`
touchPath(savePath)

/**
 * 简单的日志写入类
 */
export default class ServiceLog {

    // 日志保存的路径
    static savePath = savePath

    /**
     * 将异常写入到当天的日志
     * @param error 发生异常的错误实例
     */
    static writeToDay(error: Error, other: string = ''): void {
        const date = new Date()
        const path = `${this.savePath}/${[date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')}.txt`
        const content = `${[date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/')} ${[date.getHours(), date.getMinutes(), date.getSeconds()].join(':')} 
${other}
${error.stack}

`
        writeFile(path, content, {flag: 'a'}, () => {})
    }
}
