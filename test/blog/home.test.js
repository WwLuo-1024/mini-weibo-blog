/**
 * @description main page test
 * @author Luo Wang
 */

const server = require("../server")
const { COOKIE } = require('../testUserInfo')

//存储微博ID
let BlOG_ID = ''

test('It should be successful to crate Blog', async () => {
    //定义测试内容
    const content = '单元测试自动创建的微博_' + Date.now()
    const image = '/xxx.png'

    //开始测试
    const res = await server
        .post('/api/blog/create')
        .send({
            content,
            image
        })
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)
    //记录微博ID
    BlOG_ID = res.body.data.id
})