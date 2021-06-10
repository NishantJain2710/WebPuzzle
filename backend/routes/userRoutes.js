import express from 'express'
import{
    registerUser,
    showParticipants,
    deleteParticipant,
    loginUser,
    checkForAttempt,
}from '../controllers/userController.js'

import {protect, organizer} from '../middleware/authMiddleware.js'

const router = express.Router()



router
    .route('/register')
        .post(registerUser)
        
router.get('/showParticipants',protect, organizer  ,showParticipants)
router.delete('/deleteParticipant/:id',protect, organizer ,deleteParticipant)
router.get('/attemptcheck/:id',protect,checkForAttempt)
router.post('/login',loginUser)

export default router;