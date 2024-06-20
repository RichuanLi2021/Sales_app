const express = require('express');
const router = express.Router();

const partsList = require('./parts_list');
const clientValidate = require('./auth_client');
const posPrepare = require('./prepare_pos');
const posList = require('./pos_list');
const posDetails = require('./pos_details');
const posSubmit = require('./submit_pos');

router.use('/parts_list', partsList);
router.use('/auth_client', clientValidate);
router.use('/prepare-pos', posPrepare);
router.use('/pos_list', posList);
router.use('/pos-details', posDetails);
router.use('/submit-pos', posSubmit);

module.exports = router;