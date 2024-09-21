import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
  minPrice: {
    type: Number,
    required: true,
  },
  maxPrice: {
    type: Number,
    required: true,
  },
  salaryType: {
    type: String,
    enum: ['Yearly', 'Monthly', 'Hourly'],
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  postingDate: {
    type: Date,
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ['No Experience', 'Any experience', 'Entry', 'Mid', 'Senior'],
    required: true,
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
  },
  description: {
    type: String,
    required: true,
  },
  skills: [
    {
      value: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
    },
  ],
  postedBy: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
