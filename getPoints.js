const response = require('./response');
const getPoints = async (dynamo, table, pathParameters) => {
    try {
        const params = {
            TableName: table,
        };
        let data = {};
        if (pathParameters && pathParameters['clientId']) {
            data = await dynamo
                .get({
                    ...params,
                    Key: {
                        clientId: pathParameters['clientId'],
                    },
                })
                .promise();
        } else {
            
            data = await dynamo.scan(params).promise(); // get bonus data with no clientId parameters
        }
        if(!data) return await response(400, data, 'not found');
        return  await response(200, data, 'success');
    } catch (err) {
        return await response(500, 'Internal Server Error', 'error');
    }
}
module.exports = getPoints;