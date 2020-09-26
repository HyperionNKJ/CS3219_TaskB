const mongoose = require('mongoose');
var qs = require('querystring')

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
  let body = qs.parse(event.body)

  let response = await Module.findById(event.pathParameters.module_id)
    .then(_module => {
      _module.name = body.name ? body.name : _module.name;
      _module.code = body.code;
      _module.mc = body.mc;
      _module.grade = body.grade;
      return _module;
    })
    .then((_module) => {
      return _module.save()
    })
    .then(result => {
      let response = {
        statusCode: 200,
        headers: {
          "x-custom-header": "CS3219 Task B"
        },
        body: JSON.stringify({
          status: "success",
          message: 'Module info updated successfully',
          data: result
        })
      };
      console.log("PUT /modules/:id SUCCESS")
      return response;
    })
    .catch(error => {
      console.log("PUT /modules/:id FAILED")
      return error
    })
    return response;
};