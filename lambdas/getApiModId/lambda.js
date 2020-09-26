const mongoose = require('mongoose');

let conn = null;

const uri = 'mongodb+srv://kaijun-cs3219-taskb:kaijun-cs3219-taskb@cs3219-task-b.xique.mongodb.net/ModTrack?retryWrites=true&w=majority';

exports.handler = async function(event, context) {
  console.log(event)
  context.callbackWaitsForEmptyEventLoop = false;

  if (conn == null) {
    conn = mongoose.createConnection(uri, {
      bufferCommands: false,
      bufferMaxEntries: 0
    });

    await conn;
    conn.model('Module', new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      code: {
        type: String,
        required: true
      },
      mc: Number,
      grade: String,
      create_date: {
        type: Date,
        default: Date.now
      }
    }));
  }

  const Module = conn.model('Module');
  

  let response = await Module.findById(event.pathParameters.module_id)
    .then(module => {
      let response = {
        statusCode: 200,
        headers: {
          "x-custom-header": "CS3219 Task B"
        },
        body: JSON.stringify({
          status: "success",
          message: 'Module details loaded successfully',
          data: module
        })
      };
      console.log("GET /modules/:id SUCCESS")
      return response;
    }).catch(error => {
      console.log("GET /modules/:id FAILED")
      return error
    })
  return response;
};