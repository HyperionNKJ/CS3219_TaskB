let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: '200',
        message: 'ModTrack default API success!'
    });
});

// Import contact controller
var moduleController = require('./moduleController');
// Module routes
router.route('/modules')
    .get(moduleController.index)
    .post(moduleController.new);
router.route('/modules/:module_id')
    .get(moduleController.view)
    .put(moduleController.update)
    .delete(moduleController.delete);

// Export API routes
module.exports = router;
