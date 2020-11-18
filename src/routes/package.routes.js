const { Router } = require('express');
const { savePackage, getPackageByLoadId } = require('../controllers/packageController');
const { tokenRequired } = require('../middlewares/auth.middleware');
const { packageVerify } = require('../middlewares/package.middleware');
const router = Router();

router.post('/', [tokenRequired, packageVerify], savePackage);
router.get('/byLoadId', [tokenRequired], getPackageByLoadId);

module.exports = router;