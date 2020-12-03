const { Router } = require('express');
const { saveTracking, reportTracking, getTrackingByLoadId, updateLocation } = require('../controllers/trackingController');
const { tokenRequired, tokenEmployee } = require('../middlewares/auth.middleware');
const { loadVerifyDispatch, validateTrackingFields } = require('../middlewares/tracking.middleware');
const router = Router();

router.post('/', [tokenRequired, validateTrackingFields,loadVerifyDispatch], saveTracking);
router.post('/report', [tokenEmployee], reportTracking);
router.get('/byLoadId', [tokenRequired], getTrackingByLoadId)

router.post('/updateLocation', [tokenEmployee], updateLocation);


module.exports = router;