// const { formattedReturn } = require('../utils/netlify_helpers')

exports.handler = async (event, context) => {

  // return event Object
  return {
    statusCode: 200,
    body: JSON.stringify(event)
  }
}