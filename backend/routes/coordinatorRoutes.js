import express from 'express'
import {
    addQuestion,  
    deleteQuestion, 
    editQuestion, 
    showQuestions,
    getQuestionById,
    showQuestionsOnly,
    updateTime,
    showTime,
} from '../controllers/coordinatorController.js'

import {protect, organizer} from '../middleware/authMiddleware.js'


const router = express.Router();

router.get('/allQuestions',protect, organizer,showQuestions);
router.post('/addQuestions',protect, organizer,addQuestion);
router.delete('/deleteQuestion/:id',protect, organizer,deleteQuestion);
router.put('/editQuestion/:id', protect, organizer,editQuestion);
router.get('/questionDetails/:id',protect, organizer, getQuestionById)
router
    .route('/time')
        .get(showTime)
        .put(protect, organizer,updateTime)
router.get('/questionsOnly',protect, showQuestionsOnly)

export default router;