/**
 * @description 微博 View路由
 * @author Luo Wang
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans, getFollowers } = require('../../controller/user-relation')
//首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {})
})

//个人主页
router.get('/profile', loginRedirect, async (ctx, next) => { //默认访问自己的页面
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => { //访问他人主页
    //当前登录用户的信息
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    let curUserInfo
    const { userName: curUserName } = ctx.params
    const isMe = myUserName === curUserName
    if (isMe) {
        //是当前登录用户
        curUserInfo = myUserInfo
    } else {
        //不是当前登录用户
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) {
            //用户名不存在
            return
        }
        curUserInfo = existResult.data
    }

    //获取微博第一页数据
    //controller
    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
    
    //获取粉丝
    //controller
    const fansResult = await getFans(curUserInfo.id) //当前主页用户的id
    const { count: fansCount, fansList } = fansResult.data
    
    //我是否关注了此人
    const amIFollowed = fansList.some(item => {
        return item.userName === myUserName
    })

    //获取关注人列表
    //controller
    const followersResult = await getFollowers(curUserInfo.id)
    const { count: followersCount, followersList } = followersResult.data
    
    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
            fansData: {
                count: fansCount,
                list: fansList
            },
            amIFollowed,
            followersData: {
                count: followersCount,
                list: followersList
            }
        }
    })
})

//广场页
router.get('/square', loginRedirect, async (ctx, next) => {
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

module.exports = router