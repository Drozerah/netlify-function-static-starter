// const { formattedReturn } = require('../utils/netlify_helpers')

exports.handler = async (event, context) => {
  try {
    // return event Object
    console.log(event) // !DEBUG
    return {
      statusCode: 200,
      body: JSON.stringify(event)
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