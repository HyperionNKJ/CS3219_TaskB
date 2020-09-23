// Import module model
Module = require('./moduleModel');
// Handle index actions
exports.index = function(req, res) {
  Module.get(function(err, modules) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
      console.log("GET /modules FAILED")
    } else {
      res.json({
        status: "success",
        message: "Modules retrieved successfully",
        data: modules
      });
      console.log("GET /modules SUCCESS")
    }
  });
};
// Handle create module actions
exports.new = function(req, res) {
  var _module = new Module();
  console.log(req.body)
  _module.name = req.body.name ? req.body.name : _module.name;
  _module.code = req.body.code;
  _module.mc = req.body.mc;
  _module.grade = req.body.grade;

  _module.save(function(err) {
    if (err) {
      res.json(err);
      console.log("POST /modules FAILED")
    } else {
      res.json({
        status: "success",
        message: 'New module created!',
        data: _module
      });
      console.log("POST /modules SUCCESS")
    }
  });
};
// Handle view module info
exports.view = function(req, res) {
  Module.findById(req.params.module_id, function(err, _module) {
    if (err) {
      res.send(err);
      console.log("GET /modules/:id FAILED")
    } else {
      res.json({
        status: "success",
        message: 'Module details loaded!',
        data: _module
      });
      console.log("GET /modules/:id SUCCESS")
    }
  });
};
// Handle update module info
exports.update = function(req, res) {
  Module.findById(req.params.module_id, function(err, _module) {
    if (err) {
      res.send(err);
      console.log("PUT /modules/:id FAILED")
    }
    _module.name = req.body.name ? req.body.name : _module.name;
    _module.code = req.body.code;
    _module.mc = req.body.mc;
    _module.grade = req.body.grade;
    _module.save(function(err) {
      if (err) {
        res.json(err);
        console.log("PUT /modules/:id FAILED")
      } else {
        res.json({
          status: "success",
          message: 'Module Info updated',
          data: _module
        });
        console.log("PUT /modules/:id SUCCESS")
      }
    });
  });
};
// Handle delete module
exports.delete = function(req, res) {
  Module.remove({
    _id: req.params.module_id
  }, function(err, _module) {
    if (err) {
      res.send(err);
      console.log("DELETE /modules/:id FAILED")
    } else {
      res.json({
        status: "success",
        message: 'Module deleted!',
        data: _module
      });
      console.log("DELETE /modules/:id SUCCESS")
    }
  });
};
