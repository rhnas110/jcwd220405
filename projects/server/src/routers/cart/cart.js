const router = require("express").Router();
const { cart } = require("../../controllers/cart");

router.get("/cart/:user", cart.userCart);
router.post("/cart/:user", cart.userAddToCart);
router.post("/cart/d/:user", cart.userDeleteCart);
router.patch("/cart/:user", cart.userUpdateCart);
router.post("/cart/s/:user", cart.userSelectCart);
router.post("/cart/sa/:user", cart.selectAllCart);
router.delete("/cart/ds/:user", cart.deleteSelectedCart);
router.post("/cart/b/:user", cart.buyNow);

module.exports = router;
