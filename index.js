const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const normalizeEvent = require('./normalizer');
const getPoints = require('./getPoints');
const increasePoints = require('./increasePoints');

exports.handler = async event => {

    const table = event.table || process.env.TABLE;
    if (!table) {
        throw new Error('No table name defined.');
    }

    const { pathParameters,data,method } = normalizeEvent(event);

    switch (method) {
        case 'POST':
            return await increasePoints(dynamo, table, data, pathParameters);
        default: 
            return await getPoints(dynamo, table, pathParameters);
            
    }
};