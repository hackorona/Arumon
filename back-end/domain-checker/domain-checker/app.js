const axios = require("axios");

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, _context) => {
  try {
    const storeId =
      event &&
      event.queryStringParameters &&
      event.queryStringParameters.storeId;
    const uri = storeId && `https://${storeId}.myshopify.com/`;
    const response = await axios(uri);

    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        uri,
        message: response.statusText,
      }),
    };
  } catch (err) {
    const { response } = err;

    // Handle 404 error as normal processing
    if (response.status === 404) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message: response.statusText,
        }),
      };
    }

    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: response.statusText,
      }),
    };
  }
};
