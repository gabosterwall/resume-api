import asyncHandler from 'express-async-handler'
import Resume from '../models/resumeModel.js'


// @desc    Get whole resume
// @route   GET /resume
// @access  Private
const getResume = asyncHandler(async (req, res) => {
    const resume = await Resume.find()
    
    res.status(200).json(resume)
})

// @desc    Get specific section of resume
// @route   GET /resume/:id
// @access  Private
const getSection = asyncHandler(async (req, res) => {
    if(!req.params.id){
        res.status(400)
        throw new Error('Section not specified.')
    }

    if(req.params.id.toLocaleLowerCase() === 'weaknesses'){
        res.status(404)
        throw new Error('I have no weaknesses...')
    }

    if(req.params.id.toLocaleLowerCase() !== 'contact' && req.params.id.toLocaleLowerCase() !== 'skills' && req.params.id.toLocaleLowerCase() !== 'education' && req.params.id.toLocaleLowerCase() !== 'experience' && req.params.id.toLocaleLowerCase() !== 'projects'){
        res.status(404)
        throw new Error('Section not found.')
    }

    const section = await Resume.find({}, `${req.params.id.toLocaleLowerCase()}`)

    res.status(200).json(section)
})

/*

// @desc    Get contact section of the resume
// @route   GET /api/resume/contact
// @access  Private
const getConctact = asyncHandler(async (req, res) => {
    const contact = await Resume.find({}, 'contact')

    res.status(200).json(contact)
})

// @desc    Get skills section of the resume
// @route   GET /api/resume/skills
// @access  Private
const getSkills = asyncHandler(async (req, res) => {
    const skills = await Resume.find({}, 'skills')

    res.status(200).json(skills)
})

// @desc    Get education section of the resume
// @route   GET /api/resume/education
// @access  Private
const getEducation = asyncHandler(async (req, res) => {
    const education = await Resume.find({}, 'education')

    res.status(200).json(education)
})

// @desc    Get experience section of the resume
// @route   GET /api/resume/experience
// @access  Private
const getExperience = asyncHandler(async (req, res) => {
    const experience = await Resume.find({}, 'experience')

    res.status(200).json(experience)
})

// @desc    Get projects section of the resume
// @route   GET /api/resume/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Resume.find({}, 'projects')

    res.status(200).json(projects)
})

// @desc    Get weaknesses (easter egg)
// @route   GET /api/resume/weaknesses
// @access  Private
const getWeaknesses = asyncHandler(async (req, res) => {
    res.status(404)
    throw new Error('There are no weaknesses to be found!')
})

*/

// @desc    Set whole resume
// @route   POST /api/resume
// @access  Private (Admin Only)
const setResume =  asyncHandler(async (req, res) => {
    if(req.user.admin){
        res.status(403)
        throw new Error('Not authorized, admin permission only.')
    }

    const {contact, skills, education, experience, projects} = req.body

    if(!contact || !skills || !education || !experience || !projects ){
        res.status(400)
        throw new Error('Please add values to all resume sections.')
    }

    const resume = await Resume.create({
        contact,
        skills,
        education,
        experience,
        projects
    })

    res.status(200).json(resume)
})

// @desc    Set new education
// @route   POST /api/resume/education
// @access  Private (Admin Only)
const setNewEducation = asyncHandler(async (req, res) => {
    if(req.user.admin){
        res.status(403)
        throw new Error('Not authorized, admin permission only.')
    }

    const {degree, school, graduationYear, coursework} = req.body

    if (!degree || !school || !graduationYear || !coursework) {
        res.status(400)
        throw new Error('Please fill every education field.')
    }

    const resume = await Resume.findOne()

    const updatedResume = await Resume.updateOne(
        {_id: resume._id},
        {
            $push: {
                education: {
                    degree,
                    school,
                    graduationYear,
                    coursework
                }
            }
        },
        {new: true}
    )

    if(!updatedResume){
        res.status(400)
        throw new Error('Could not set new project.')
    }
    
    res.status(200).json(updatedResume)
})

// @desc    Set new experience
// @route   POST /api/resume/experience
// @access  Private (Admin Only)
const setNewExperience = asyncHandler(async (req, res) => {
    if(req.user.admin){
        res.status(403)
        throw new Error('Not authorized, admin permission only.')
    }

    const {position, organization, startDate, endDate, responsibilities} = req.body

    if (!position || !organization || !startDate || !endDate || !responsibilities) {
        res.status(400)
        throw new Error('Please fill every experience field.')
    }

    const resume = await Resume.findOne()

    const updatedResume = await Resume.updateOne(
        {_id: resume._id},
        {
            $push: {
                education: {
                    position,
                    organization,
                    startDate,
                    endDate,
                    responsibilities
                }
            }
        },
        {new: true}
    )

    if(!updatedResume){
        res.status(400)
        throw new Error('Could not set new experience.')
    }
    
    res.status(200).json(updatedResume)
})

// @desc    Set new project
// @route   POST /api/resume/projects
// @access  Private (Admin Only)
const setNewProject = asyncHandler(async (req, res) => {
    if(req.user.admin){
        res.status(403)
        throw new Error('Not authorized, admin permission only.')
    }

    const {title, description, technologies, url} = req.body

    if (!title || !description || !technologies || !url) {
        res.status(400)
        throw new Error('Please fill every project field.')
    }

    const resume = await Resume.findOne()

    const updatedResume = await Resume.updateOne(
        {_id: resume._id},
        {
            $push: {
                projects: {
                    title,
                    description,
                    technologies,
                    url
                }
            }
        },
        {new: true}
    )

    if(!updatedResume){
        res.status(400)
        throw new Error('Could not set new project.')
    }
    
    res.status(200).json(updatedResume)
})

// @desc    Update contact
// @route   PATCH /api/resume/contact
// @access  Private (Admin Only)
const updateContact =  asyncHandler(async (req, res) => {
    if(req.user.admin){
        res.status(403)
        throw new Error('Not authorized, admin permission only.')
    }

    const {name, email, network} = req.body

    if(!name && !email && !network){
        res.status(400)
        throw new Error('At least one field must be updated.')
    }

    const resume = await Resume.findOne()

    if (!resume) {
        res.status(400)
        throw new Error('Resume not found.')
    }
    
    const updatedResume = await Resume.findOneAndUpdate(
        resume,
        {
            $set: {
                'contact.name': name || resume.contact.name,
                'contact.email': email || resume.contact.email,
                'contact.network': network || resume.contact.network,
            },
        },
        { new: true }
    )

    if (!updatedResume) {
        res.status(400)
        throw new Error('Update failed.')
    }

    res.status(200).json(updatedResume)
})

// @desc    Update skills
// @route   PATCH /api/resume/skills
// @access  Private (Admin Only)
const updateSkills =  asyncHandler(async (req, res) => {
    if(req.user.admin){
        res.status(403)
        throw new Error('Not authorized, admin permission only.')
    }

    const {languages, technologies} = req.body

    if(!languages && !technologies){
        res.status(400)
        throw new Error('At least one field must be updated.')
    }

    const resume = await Resume.findOne()

    if (!resume) {
        res.status(400)
        throw new Error('Resume not found.')
    }
    
    const updatedResume = await Resume.findOneAndUpdate(
        resume,
        {
            $set: {
                'skills.languages': languages || resume.skills.languages,
                'skills.technologies': technologies || resume.skills.technologies,
            },
        },
        { new: true }
    )

    if (!updatedResume) {
        res.status(400)
        throw new Error('Update failed.')
    }

    res.status(200).json(updatedResume)
})

// @desc    Update Education
// @route   PATCH /api/resume/education/:id
// @access  Private (Admin Only)
const updateEducation =  asyncHandler(async (req, res) => {
    if(req.user.admin){
        res.status(403)
        throw new Error('Not authorized, admin permission only.')
    }

    req.body._id = req.params.id

    const {degree, school, graduationYear, coursework} = req.body

    if (!degree && !school && !graduationYear && !coursework) {
        res.status(400)
        throw new Error('At least one field must be updated.')
    }

    const resume = await Resume.findOne()
    
    const updatedResume = await Resume.findOneAndUpdate(
        {'education._id': req.params.id },
        {
            $set: {
                'education.$.degree': degree || resume.education.$.degree,
                'education.$.school': school || resume.education.$.school,
                'education.$.graduationYear': graduationYear || resume.education.$.graduationYear,
                'education.$.coursework': coursework || resume.education.$.coursework,
            }
        },
        {new: true}
    )

    if (!updatedResume) {
        res.status(400)
        throw new Error('Update failed.')
    }
    

    res.status(200).json(updatedResume)
    
})

// @desc    Update experience
// @route   PATCH /api/resume/experience/:id
// @access  Private (Admin Only)
const updateExperience =  asyncHandler(async (req, res) => {
    if(req.user.admin){
        res.status(403)
        throw new Error('Not authorized, admin permission only.')
    }

    req.body._id = req.params.id

    const {position, organization, startDate, endDate, responsibilities} = req.body

    if (!position && !organization && !startDate && !endDate && !responsibilities) {
        res.status(400)
        throw new Error('At least one field must be updated.')
    }

    const resume = await Resume.findOne()
    
    const updatedResume = await Resume.findOneAndUpdate(
        {'experience._id': req.params.id },
        {
            $set: {
                'experience.$.position': position || resume.experience.$.position,
                'experience.$.organization': organization || resume.experience.$.organization,
                'experience.$.startDate': startDate || resume.experience.$.startDate,
                'experience.$.endDate': endDate || resume.experience.$.endDate,
                'experience.$.responsibilities': responsibilities || resume.experience.$.responsibilities
            }
        },
        {new: true}
    )

    if (!updatedResume) {
        res.status(400)
        throw new Error('Update failed.')
    }
    

    res.status(200).json(updatedResume)
    
})

// @desc    Update projects
// @route   PATCH /api/resume/projects/:id
// @access  Private (Admin Only)
const updateProjects =  asyncHandler(async (req, res) => {
    if(req.user.admin){
        res.status(403)
        throw new Error('Not authorized, admin permission only.')
    }

    req.body._id = req.params.id

    const {title, description, technologies, url} = req.body

    if (!title && !description && !technologies && !url) {
        res.status(400)
        throw new Error('At least one field must be updated.')
    }

    const resume = await Resume.findOne()
    
    const updatedResume = await Resume.findOneAndUpdate(
        {'projects._id': req.params.id },
        {
            $set: {
                'projects.$.title': title || resume.projects.$.title,
                'projects.$.description': description || resume.projects.$.description,
                'projects.$.technologies': technologies || resume.projects.$.technologies,
                'projects.$.url': url || resume.projects.$.url,
            }
        },
        {new: true}
    )

    if (!updatedResume) {
        res.status(400)
        throw new Error('Update failed.')
    }

    res.status(200).json(updatedResume)
    
})

/*
// @desc    Delete resume
// @route   Delete /api/resume
// @access  Private
const deleteResume =  asyncHandler(async (req, res) => {
    const resume = await Resume.findById(req.params.id)

    if(!resume){
        res.status(400)
        throw new Error('Resume not found.')
    }

    await Resume.remove()

    res.status(200).json({id: req.params.id})
})
*/

export {
    getResume,
    getSection,
    setResume,
    setNewEducation,
    setNewExperience,
    setNewProject,
    updateContact,
    updateSkills,
    updateEducation,
    updateExperience,
    updateProjects,

}