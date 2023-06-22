/**
 * @description verification of blog data format
 * @author Luo Wang
 */

const validate = require('./_validate')

//校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string'
        },
        image: {
            type: 'string',
            maxLength: 255
        }
    }
}

//执行校验
/**
 * 
 * @param {Object} data user data
 * @returns 
 */
function blogValidate(data = {}) {
    return validate(SCHEMA, data)
}

module.exports = blogValidate