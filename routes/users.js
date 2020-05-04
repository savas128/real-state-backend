const express = require("express");
const router = express.Router();

const { getUsers, addUser } = require("../services/users");
const {
  authenticateUser,
} = require("../middlewares/auth");
const { grantAccessWithCondition } = require("../services/auth")
const roles = require("../access-control/roles");
const { actions, resources } = require("../access-control/constants");

router.get("/", authenticateUser ,async (req, res, next) => {
  try {
    // check if user is admin and if so:
    const result = await getUsers();
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/apartments", authenticateUser, async (req, res) => {
  try {
    const canAccess = await grantAccessWithCondition(
      res.locals.user.role,
      actions.read,
      resources.apartments,
      { owner: req.params.id, requester: res.locals.user.id }
    );
    if (!canAccess) {
      res.status(401).json({status: 401});
    }
    res.send({canAccess: canAccess})
  } catch (error) {}
});

router.get("/:id/wishlist", )

module.exports = router;
