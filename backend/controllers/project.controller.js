const Project = require('../models/project.model.js');
const User = require("../models/user.model.js");
const expressValidator = require('express-validator');
const projectService = require('../services/project.service.js')



exports.createProject = async(req, res) => {
    const errros = expressValidator.validationResult(req);

    if (!errros.isEmpty()) {
        return res.status(400).json({
            errros: errros.array()
        })
    }


    try {
        const { name } = req.body;

        const loggedInUser = await User.findOne({ email: req.user.email });

        const userid = loggedInUser._id;




        const newProject = await projectService.createProjectService({ name, userid })


        res.status(200).json({
            newProject
        })

    } catch (e) {
        console.log(e)
        res.status(401).json({ msg: "Error in creating the project" });
    }





}



exports.getAllproject = async(req, res) => {
    try {

        const loggedInUser = await User.findOne({
            email: req.user.email
        })

        const allUserProjects = await projectService.getAllProjectByUserId({ userId: loggedInUser._id })

        return res.status(200).json({
            projects: allUserProjects
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }
};


exports.addUserToProject = async(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { projectId, users } = req.body

        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })


        const project = await projectService.addUsersToProject({
            projectId,
            users,
            userId: loggedInUser._id
        })

        return res.status(200).json({
            project,
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }


}


exports.getProjectById = async(req, res) => {

    const { projectId } = req.params;

    try {

        const project = await projectService.getProjectById({ projectId });

        return res.status(200).json({
            project
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }

}