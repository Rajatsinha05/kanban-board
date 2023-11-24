const { Router } = require('express');
const { signupHandler, loginHandler } = require('../controllers/user.controller');
const router = Router();

// routes with associated handlers
router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.get("/",(req,res)=>{
    res.send("kgfl")
})

module.exports = router;
