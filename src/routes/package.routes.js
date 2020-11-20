const { Router } = require('express');
const { savePackage, getPackageByLoadId, getCurriers, getPackageType, deletePackage, updatePackage } = require('../controllers/packageController');
const { tokenRequired } = require('../middlewares/auth.middleware');
const { packageVerify } = require('../middlewares/package.middleware');
const router = Router();

router.post('/', [tokenRequired, packageVerify], savePackage);
router.delete('/', [tokenRequired], deletePackage);
router.put('/', [tokenRequired], updatePackage);
router.get('/byLoadId', [tokenRequired], getPackageByLoadId);

router.get('/curriers', [tokenRequired], getCurriers);

router.get('/packageType', [tokenRequired], getPackageType);

module.exports = router;