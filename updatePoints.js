const response = require('./response');

const updatePoints = async (dynamo, table, data, bonus, pathParameters) => {
    const params = {
        TableName: table,
        Key: {
            clientId: pathParameters['clientId'],
        },
        UpdateExpression: 'set #a = :x, #b = :d, #c = :e',// creating the identifys to objects
        ExpressionAttributeNames: {
            '#a': 'points',
            '#b': 'created_at',
            '#c': 'updated_at',
        },
        ExpressionAttributeValues: {
            ':x': data.points + bonus.Item.points,
            ':d': bonus.Item.created_at,
            ':e': new Date().toISOString(),
        },
    };
    
    try {
       await dynamo.update(params).promise(); // update bonus data

        return await response(200, { 
            clientId: pathParameters['clientId'],
            points: data.points + bonus.Item.points,
            created_at: bonus.Item.created_at,
            updated_at: new Date().toISOString()
        }, 'success');
    } catch (err) {
        return response(500, 'Internal Server Error','error');
    }
}

module.exports = updatePoints;