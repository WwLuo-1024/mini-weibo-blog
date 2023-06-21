/**
 * @description uset api test
 * @author Luo Wang
 */

const serve = require('koa-static')
const server = require('../server')

//用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender:1
}


//存储cookie
let COOKIE = ''

//注册
test('User Sign Up', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser)
    expect(res.body.errno).toBe(0)
})

//重复注册
test('User register repeatedly, should fail', async() => {
    const res = await server
        .post('/api/user/register')
        .send(testUser)
    expect(res.body.errno).not.toBe(0)
})

//查询用户是否存在
test('the username of the query should be exist', async() => {
    const res = await server
        .post('/api/user/isExist')
        .send({userName})
    expect(res.body.errno).toBe(0)
})

//json schema检测
test('json schema检测, incorrect format', async () => {
    const res = await server
        .post('/api/user/register')
        .send({
            userName: '123', //用户名不是字母（或下划线）开头
            password: 'a', //最小长度不是3
            gender: 'male' //不是数字
        })
    expect(res.body.errno).not.toBe(0)
})

//登录
test('login, should success', async() => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName,
            password
        })
    expect(res.body.errno).toBe(0)

    //获取cookie
    COOKIE = res.header['set-cookie'].join(';')
})

//删除
test('It should be successful to delete user', async () => {
    const res = await server
        .post('/api/user/delete')
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

//再次查询用户，应该不存在
test('The user should be not exist after deleting', async() => {
    const res = await server
        .post('/api/user/isExist')
        .send({userName})
    expect(res.body.errno).not.toBe(0)
})