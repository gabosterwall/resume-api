const mongoose = require('mongoose')

/*
const resumeSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, 'Please add a text value.']
        },
    },
    {
        timestamps: true,
    }
)
*/

const resumeSchema = mongoose.Schema(
    {
        contact: {
            name: {
                type: String,
                required: [true, 'Please add a name.'],
            },
            email: {
                type: String,
                required: [true, 'Please add an email.'],
            }, 
            linkedin: {
                type: String
            },
            github: {
                type: String
            }
        },
        skills: {
            languages: {
                type: [String],
                default: [],
            },
            technologiesFrameworks: {
                type: [String],
                default: [],
            },
        },
        education: [
            {
                degree: {
                    type: String,
                    required: [true, 'Please add a degree.'],
                },
                school: {
                    type: String,
                    required: [true, 'Please add a school.'],
                },
                graduationYear: {
                    type: Number,
                    required: [true, 'Please add a graduation year.'],
                },
                coursework: {
                    type: [String],
                    required: [true, 'Please add relevant courses.']
                }
            },
        ],
        experience: [
            {
                position: {
                    type: String,
                    required: [true, 'Please add a position.'],
                },
                organization: {
                    type: String,
                    required: [true, 'Please add a organization.'],
                },
                startDate: {
                    type: String,
                    required: [true, 'Please add a start date.'],
                },
                endDate: {
                    type: String,
                },
                responsibilities: {
                    type: [String],
                },
            },
        ],
        projects: [
            {
                title: {
                    type: String,
                    required: [true, 'Please add a project title.'],
                },
                description: {
                    type: String,
                    required: [true, 'Please add a project description.'],
                },
                technologies: {
                    type: [String],
                },
                url: {
                    type: String,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Resume', resumeSchema)