import { GET, route } from "awilix-koa";
import { Context } from "koa";

@route('/v1/api')
export class ApiController{

    @route('/index')
    @GET()
    async index(ctx: Context): Promise<string>{
        return 'hello word'
    }
}