
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-chat-engine-pretty.cjs.production.min.js')
} else {
  module.exports = require('./react-chat-engine-pretty.cjs.development.js')
}
