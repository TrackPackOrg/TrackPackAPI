const { Router } = require('express');
const { saveTracking, reportTracking, getTrackingByLoadId, updateLocation, getTrackingByQuery, dispatchTracking, getDispatchTracking } = require('../controllers/trackingController');
const { tokenRequired, tokenEmployee } = require('../middlewares/auth.middleware');
const { loadVerifyDispatch, validateTrackingFields } = require('../middlewares/tracking.middleware');
const router = Router();

router.post('/', [tokenRequired, validateTrackingFields,loadVerifyDispatch], saveTracking);
router.post('/report', [tokenEmployee], reportTracking);
router.get('/byLoadId', [tokenRequired], getTrackingByLoadId)

router.post('/updateLocation', [tokenEmployee], updateLocation);
router.get('/byQuery', [tokenEmployee], getTrackingByQuery);

router.post('/dispatch', [tokenEmployee], dispatchTracking);

router.get('/dispatch', [tokenEmployee], getDispatchTracking);

module.exports = router;