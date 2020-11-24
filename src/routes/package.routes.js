const { Router } = require('express');
const { savePackage, getPackageByLoadId, getCurriers, getPackageType, deletePackage, updatePackage, getPackageByQuery, registerPackage } = require('../controllers/packageController');
const { tokenRequired, tokenEmployee } = require('../middlewares/auth.middleware');
const { packageVerify, verifyIsLoadReady } = require('../middlewares/package.middleware');
const router = Router();

router.post('/', [tokenRequired, packageVerify, verifyIsLoadReady], savePackage);
router.delete('/', [tokenRequired], deletePackage);
router.put('/', [tokenRequired], updatePackage);
router.get('/byLoadId', [tokenRequired], getPackageByLoadId);

router.get('/curriers', [tokenRequired], getCurriers);

router.get('/packageType', [tokenRequired], getPackageType);
router.get('/byQuery', [tokenEmployee], getPackageByQuery);

router.put('/register', [tokenEmployee], registerPackage);

module.exports = router;