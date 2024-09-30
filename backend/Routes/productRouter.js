const ensuringAuthorization = require("../Middleware/auth");
const router = require("express").Router();

router.get("/", ensuringAuthorization, (req, res) => {
    console.log("----- logged-in user details -----", req.user);
    res.status(200).json([
        {
            name: "mobile", 
            price: 10000
        },
        {
            name: "tv", 
            price: 50000
        }
    ]);
});

module.exports = router;
