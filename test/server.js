/**
 * @description jest server
 * @author Luo Wang
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)