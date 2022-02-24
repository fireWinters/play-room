export default {

    // 服务器的ip地址，如果是线上服务器。写入线上服务器的ip
    runIp: '127.0.0.1',

    // 服务器端口
    runPort: 3001,

    // 开启debug调试，发生异常不会隐藏写入日志。而是直接抛出
    debug: false,

    // 用户登录密钥有效期， 登录密钥可换取token。 单位毫秒
    signTime: 0, // 0为永久有效， 除非用户更换密码
    //signTime: 30 * 24 * 3600 * 1000, // 30天有效

    // 过期时间为2小时
    expTime: 2 * 3600 * 1000,

    // 加密用的hash
    hash: 'yFan',

    /** 数据库配置 */
    database: {
        // 数据库地址
        host: '192.168.100.201',
        // 数据库用户名
        user: 'root',
        // 数据库密码
        password: 'root',
        // 端口，可缺省默认 3306
        port: 3306,
        // 数据库名
        database: 'az_play_room',
        // 表前缀
        table_prefix: 'az_',
    }
}