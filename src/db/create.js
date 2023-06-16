//insert

const { Blog, User } = require('./model')

!(async function () {
    //Create User
    const zhangsan = await User.create({
        userName: 'zhangsan',
        password: '123',
        nickName: '张三'
    })

    //Insert Into Users(...) VALUES(...)
    console.log('zhangsan:', zhangsan.dataValues)
    const zhangsanId = zhangsan.dataValues.id

    const lisi = await User.create({
        userName: 'lisi',
        password: '123',
        nickName: '李四'
    })
    const lisiId = lisi.dataValues.id

    //Crate Blog
    const blog1 = await Blog.create({
        title: 'Title1',
        content: 'Content1',
        userId: zhangsanId
    })
    console.log('blog1', blog1.dataValues)

    const blog2 = await Blog.create({
        title: 'Title2',
        content: 'Contetn2',
        userId: zhangsanId
    })
    console.log('blog2', blog2.dataValues)

    const blog3 = await Blog.create({
        title: 'Title3',
        content: 'Contetn3',
        userId: lisiId
    })
    console.log('blog3', blog3.dataValues)

    const blog4 = await Blog.create({
        title: 'Title4',
        content: 'Contetn4',
        userId: lisiId
    })
    console.log('blog4', blog4.dataValues)
})()