/**
 * @description user model test
 * @author Luo Wang
 */

const { User }  = require('../../src/db/model/index')

test('User Model properties', () => {
    //build会构建一个内存的User实例，但不会提交到数据库中
    const user = User.build({
        userName: 'zhangsan',
        password: '123',
        nickName: '张三',
        //gender: 3,
        picture: '/xxx.png',
        city: '北京'
    })

    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('123')
    expect(user.nickName).toBe('张三')
    expect(user.gender).toBe(3)
    expect(user.picture).toBe('/xxx.png')
    expect(user.city).toBe('北京')
})