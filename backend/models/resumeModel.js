import mongoose from 'mongoose'

const resumeSchema = mongoose.Schema(
    {
        contact: {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            }, 
            network: {
                type: Map,
                of: String,
                default: {},
            },
        },
        skills: {
            languages: {
                type: [String],
            },
            technologies: {
                type: [String],
            },
        },
        education: [
            {
                degree: {
                    type: String,
                    required: true,
                },
                school: {
                    type: String,
                    required: true,
                },
                graduationYear: {
                    type: String,
                    required: true
                },
                coursework: {
                    type: [String],
                    required: true
                }
            },
        ],
        experience: [
            {
                position: {
                    type: String,
                    required: true
                },
                organization: {
                    type: String,
                    required: true
                },
                startDate: {
                    type: String,
                    required: true
                },
                endDate: {
                    type: String,
                },
                responsibilities: {
                    type: [String]
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
                    required: true,
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

const Resume = mongoose.model('Resume', resumeSchema)

export default Resume