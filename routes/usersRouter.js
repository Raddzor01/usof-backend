import express from "express";

import TokenService from "../utils/tokenService.js";
import controller from "../controllers/usersController.js";

const router = express.Router();

router.patch('/avatar', TokenService.checkToken, controller.updateAvatar);
router.get('/', TokenService.checkToken, controller.getAllUsers);
router.post('/', TokenService.checkToken, controller.createUser);
router.get('/:userId', TokenService.checkToken, controller.getUserData);
router.patch('/:userId', TokenService.checkToken, controller.updateUserData);
router.delete('/:userId', TokenService.checkToken, controller.deleteUser);

export default router;