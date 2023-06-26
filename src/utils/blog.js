/**
 * @description 微博数据相关的工具方法
 * @author Luo Wang
 */

const ejs = require('ejs')
const fs = require('fs')
const path = require('path')


//获取blog-list.ejs的文件内容
const BLOG_LIST_TPL = fs.readFileSync(
    path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()

/**
 * 根据blogList渲染出Html字符串
 * @param {Array} blogList 微博列表
 * @param {boolean} canReply 是否可以回复
 * @returns 
 */
function getBlogListStr(blogList = [], canReply = false) {
    return ejs.render(BLOG_LIST_TPL, {
        blogList,
        canReply
    })
}

module.exports = {
    getBlogListStr
}