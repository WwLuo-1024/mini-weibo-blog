/**
 * @description json schema validate
 * @author Luo Wang
 */

const Ajv = require('ajv')
const ajv = new Ajv({
    // allErrors: true //输出所有的错误 （可能不止不满足一个规则）
})

/**
 * json schema validate
 * @param {Object} schema json schema rules
 * @param {Object} data  Data to be verified
 */
function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = validate