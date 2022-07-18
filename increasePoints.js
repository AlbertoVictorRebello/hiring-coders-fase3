const response = require('./response');
const updatePoints = require('./updatePoints');

const increasePoints = async (dynamo, table, data, pathParameters) => {
    if(! data.points || !(pathParameters && pathParameters['clientId']) ) return response(400, 'Invalid params or fields ', 'error'); // Verfy if points exists
    if( typeof data.points !== 'number' || Number.isNaN(data.points) )  return response(400, 'Invalid points value', 'error'); // Verfy if points is a number
    const params = {
        TableName: table,
        Item: {
            clientId: pathParameters['clientId'],
            points: data.points ?? 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
    };
    try {
        let bonus = {}
        bonus = await dynamo
            .get({
                ...params,
                Key: {
                    clientId: pathParameters['clientId'],
                },
            })
            .promise();
        if(bonus.Item) return await updatePoints(dynamo, table, data, bonus, pathParameters);// update data with bonus already exists calling put because is easier
        await dynamo.put(params).promise();
        return await response(201, params.Item, 'success');
    } catch (err) {
        return response(500, 'Internal Server Error1', 'error');
    }
}
module.exports = increasePoints;