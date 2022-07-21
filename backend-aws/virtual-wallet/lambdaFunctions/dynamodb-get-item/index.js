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

<<<<<<< HEAD
    // const { pathParameters } = normalizeEvent(event);
=======
    const { pathParameters } = normalizeEvent(event);
>>>>>>> b872e1ed08dbc0b43dce09525e4b3aa801e728a3
    const { dataReq } = normalizeEvent(event);

    const params = {
        TableName: table,
    };

    try {
        let data = {};
<<<<<<< HEAD
        if (dataReq && dataReq['email']) {
=======
        if (pathParameters && pathParameters['email']) {
>>>>>>> b872e1ed08dbc0b43dce09525e4b3aa801e728a3
            data = await dynamo
                .get({
                    ...params,
                    Key: {
<<<<<<< HEAD
                        email: dataReq['email'],
=======
                        email: pathParameters['email'],
>>>>>>> b872e1ed08dbc0b43dce09525e4b3aa801e728a3
                    },
                })
                .promise();
        } else {
            data = await dynamo.scan(params).promise();
        }

        console.log({
            message: 'Records found',
            data: JSON.stringify(data),
        });

        return response(200, data);
    } catch (err) {
        console.error(err);
        return response(500, 'Somenthing went wrong');
    }
};
