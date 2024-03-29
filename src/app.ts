import {createContainer, Lifetime} from 'awilix'
import { scopePerRequest, loadControllers } from 'awilix-koa'
import exceptionHandle from './exceptions/ExceptionHandle'
import withResultHandle from './controller/withResultHandle'
import withResquestBodyHandle from './controller/withResquestBodyHandle'
import withTokenHandle from './controller/withTokenHandle'
import Koa from 'koa'
import config from './config'

const app = new Koa() 

// 异常捕获
app.use(exceptionHandle)

// 请求体处理
app.use(withResquestBodyHandle)

// 统一返回的数据格式类型
app.use(withResultHandle)

// 登录校验
app.use(withTokenHandle)

// 创建容器
const contriller = createContainer()

// 路由注入容器中
app.use(scopePerRequest(contriller))

// 加载控制器路由
app.use(loadControllers(`${__dirname}/controller/*/*.ts`, {
    formatName: 'camelCase',
    resolverOptions: {
        lifetime: Lifetime.SINGLETON
    }
}))

const ip: string = config.runIp
const port: number = config.runPort
app.listen(port, ip, () => {
    console.log(`http://${ip}:${port}`)
})