const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const normalizeEvent = require('./normalizer');
const response = require('./response');

exports.handler = async event => {
    if (process.env.DEBUG) {
        console.log({
            message: 'Received event',
            data: JSON.stringify(event),
        });
    }

    const table = event.table || process.env.TABLE;
    if (!table) {
        throw new Error('No table name defined.');
    }

    const { data } = normalizeEvent(event);
    
    
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    
    const paramsDB = {
        TableName: table,
        Key: {
            email: data.email
            
        }
    };
     
    let dataDB = await dynamo.get(paramsDB).promise();
    data.pontos += dataDB.Item.saldo;
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    const params = {
        TableName: table,
        Key: {
            email: data.email
        },
        UpdateExpression: 'set #a = :x, #b = :d',
        ExpressionAttributeNames: {
            '#a': 'saldo',
            '#b': 'updated_at',
        },
        ExpressionAttributeValues: {
            ':x': data.pontos,
            ':d': new Date().toISOString(),
        },
    };

    try {
        await dynamo.update(params).promise();

        console.log({
            message: 'Record has been update',
            data: JSON.stringify(params),
        });

        return response(200, dataDB.Item);
    } catch (err) {
        console.error(err);
        return response(500, 'Somenthing went wrong');
    }
};
