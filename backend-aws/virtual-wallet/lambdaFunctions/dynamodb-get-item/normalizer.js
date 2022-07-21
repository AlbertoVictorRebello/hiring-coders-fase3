const normalizeEvent = event => {
    return {
        method: event['requestContext']['http']['method'],
        dataReq: event['body'] ? JSON.parse(event['body']) : {},
        querystring: event['queryStringParameters'] || {},
        pathParameters: event['pathParameters'] || {},
    };
};

module.exports = normalizeEvent;
