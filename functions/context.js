// const { formattedReturn } = require('../utils/netlify_helpers')

exports.handler = async (event, context) => {
  try {
    // return context Object
    console.log(context) // !DEBUG
    return {
      statusCode: 200,
      body: JSON.stringify(context)
    }
  } catch (error) {
    // error case
    console.error(err)
    return {
      statusCode: 500,
      body: {}
    }
  }
}