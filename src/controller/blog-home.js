/**
 * @description main page controller
 * @author Luo Wang
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog } = require('../services/blog')
const { createBlogFailInfo } = require('../model/ErrorInfo')
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

module.exports = {
    create
}