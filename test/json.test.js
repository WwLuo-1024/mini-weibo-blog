/**
 * @description json test
 * @author Luo Wang
 */

const server = require('./server')

test('json Interface returns correct data', async () => {
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title: 'koa2 json'
    })

    expect(res.body.title).toBe('koa2 json')
})

// test('login Interface returns correct data', async () => {
//     const res = await server.post('/login').send({
//         userName: 'zhangsan',
//         password: '123'
//     })

//     expect(res.body).toEqual({
//         title: 'koa2 json'
//     })

//     expect(res.body.title).toBe('koa2 json')
// })