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

    const {
        data: { email },
    } = normalizeEvent(event);

    const params = {
        TableName: table,
        Key: {
            email: email
        }
    };

    try {
        await dynamo.delete(params).promise();

        console.log({
            message: 'Record has been deleted',
            data: JSON.stringify(params)
        });

        return response(200, `Record ${email} has been deleted`);
    } catch (err) {
        console.error(err);
        return response(500, 'Somenthing went wrong');
    }
};
