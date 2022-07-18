module.exports = function (status, body, message) { //creating pattern to responses 
  return {
      statusCode: status,
      body: JSON.stringify({message, body}),
      headers: {
          'Content-Type': 'application/json',
      },
  };
};