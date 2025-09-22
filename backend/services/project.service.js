const Project = require('../models/project.model.js');

exports.createProjectService = async({ name, userid }) => {


    if (!name && !userid) {
        throw new Error("name and user required");
    }


    let project;
    try {
        const existingProject = await Project.findOne({ name });

        if (existingProject) {
            throw new Error('Project name already exists');
        }


        project = await Project.create({
            name,
            users: [userid]
        });
    } catch (error) {
        throw error;
    }

    return project;
}




exports.getAllProjectByUserId = async({ userId }) => {
    if (!userId) {
        throw new Error('UserId is required')
    }

    const allUserProjects = await Project.find({
        users: userId
    })

    return allUserProjects
}





exports.addUsersToProject = async({ projectId, users, userId }) => {

    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }

    if (!users) {
        throw new Error("users are required")
    }

    if (!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error("Invalid userId(s) in users array")
    }

    if (!userId) {
        throw new Error("userId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId")
    }


    const project = await Project.findOne({
        _id: projectId,
        users: userId
    })

    console.log(project)

    if (!project) {
        throw new Error("User not belong to this project")
    }

    const updatedProject = await Project.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    })

    return updatedProject



}





exports.getProjectById = async({ projectId }) => {
    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }

    const project = await Project.findOne({
        _id: projectId
    }).populate('users')

    return project;
}
