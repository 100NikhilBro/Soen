const express = require('express');
const { createProject, getAllproject, addUserToProject, getProjectById } = require('../controllers/project.controller');
const router = express.Router();
const { body } = require('express-validator');
const authUser = require('../middlewares/auth.middleware');

router.post("/createProject", authUser, [
    body('name').isString().notEmpty().withMessage("name is required")
], createProject);


router.get('/all',
    authUser,
    getAllproject
)

router.put('/add-user',
    authUser, [
        body('projectId').isString().withMessage('Project ID is required'),
        body('users').isArray({ min: 1 }).withMessage('Users must be an array of strings').bail()
        .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string')
    ],
    addUserToProject
)

router.get('/get-project/:projectId',
    authUser,
    getProjectById
)



module.exports = router;