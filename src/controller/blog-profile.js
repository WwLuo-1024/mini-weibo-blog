/**
 * @description 个人主页 controller
 * @author Luo Wang
 */

const { getBlogListByUser } = require('../services/blog')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
/**
 * @param {string} userName 
 * @param {number} [pageIndex=0] 
 */
async function getProfileBlogList(userName, pageIndex = 0) {
    //services
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize: PAGE_SIZE
    })

    const blogList = result.blogList
    //拼接返回数据
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}

module.exports = {
    getProfileBlogList
}