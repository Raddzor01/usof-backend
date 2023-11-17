import express from "express";

import controller from "../controllers/authController.js";

const router = express.Router();

router.post('/register', controller.registration);
router.post('/login', controller.login);
router.post('/password-reset/:confirmToken', controller.set_new_password);
router.post('/password-reset', controller.password_reset);
router.post('/logout', controller.logout);

export default router;