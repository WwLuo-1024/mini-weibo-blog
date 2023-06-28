/**
 * @description main page controller
 * @author Luo Wang
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE } = require('../conf/constant')
const xss = require('xss')

/**
 * Create blog
 * @param {number} param0.userId 
 * @param {string} param0.content 
 * @param {string} param0.image 
 */
async function create({ userId, content, image }) {
    //service
    try {
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        })
        return new SuccessModel(blog)
    } catch (err) {
        console.error(err.message, err.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}


/**
 * 获取首页微博列表
 * @param {number} userId 
 * @param {number} pageIndex 
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    // service
    const result = await getFollowersBlogList({userId, pageIndex, pageSize: PAGE_SIZE})
    const { count, blogList } = result

    //返回
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

module.exports = {
    create,
    getHomeBlogList
}