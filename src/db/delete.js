const { Blog, User } = require('./model')

!(async function () {
    // //Delete One Blog
    // const delBlogRes = await Blog.destroy({
    //     where: {
    //         id: 4
    //     }
    // })
    // console.log('delBlogs', delBlogRes > 0)

    //Delete
    const delUserRes = await User.destroy({
        where: {
            id: 1
        }
    })
    console.log('delUserRes', delUserRes)
})()