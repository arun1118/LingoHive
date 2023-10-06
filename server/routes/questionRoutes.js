import express from 'express';
const router=express.Router()

// import { getAllProblems,addProblem,getSingleProblem, updateProblem, deleteProblem } from '../controller/control.js';
import { getAllQuestions, getAllQuestionsOneLanguage } from '../controller/questionController.js';

router.route('/').get(getAllQuestions);
// router.route('/').post(addProblem);
router.route('/:languageSelected').get(getAllQuestionsOneLanguage);
// router.route('/:problemId').get(getSingleProblem);
// router.route('/:problemId').patch(updateProblem);
// router.route('/:problemId').delete(deleteProblem);

export default router;