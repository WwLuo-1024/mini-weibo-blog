/**
 * @description utils controller
 * @author Luo Wang
 */

const path = require('path')
const { ErrorModel, SuccessModel } = require("../model/ResModel")
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

//存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
//文件最大提交1M
const MIX_SIZE = 1024 * 1024 * 1024

//是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * Save File
 * @param {string} name 
 * @param {string} type 
 * @param {number} size 
 * @param {string} filePath 
 * @returns 
 */
async function saveFile({name, type, size, filePath}) {
    //文件大小超过最大限制
    if (size > MIX_SIZE) {
        //由于koaForm已经将图片文件上传至了服务器，因此需要删除掉文件
        await fse.remove(filePath) //所有文件操作都是异步的
        return new ErrorModel(uploadFileSizeFailInfo)
    }

    //移动文件
    const fileName = Date.now() + '.' + name //防止重名 文件被覆盖
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
    await fse.move(filePath, distFilePath)

    //返回信息 '/Avator.jpg'
    return new SuccessModel({
        url: '/' + fileName
    })

}

module.exports = {
    saveFile
}