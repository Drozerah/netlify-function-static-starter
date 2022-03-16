// const { formattedReturn } = require('../utils/netlify_helpers')

exports.handler = async (event, context) => {

  // return context Object
  return {
    statusCode: 200,
    body: JSON.stringify(context)
  }
}