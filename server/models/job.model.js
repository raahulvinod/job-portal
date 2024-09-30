import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  companyLogo: { type: String, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  salaryType: { type: String, enum: ['Year', 'Month', 'Hour'], required: true },
  jobLocation: { type: String, required: true },
  postingDate: { type: Date, required: true },
  experienceLevel: {
    type: String,
    enum: ['No Experience', 'Any experience', 'Entry', 'Mid', 'Senior'],
    required: true,
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
  },
  description: { type: String, required: true },
  skills: [{ type: String, required: true }],
  email: {
    type: String,
    required: true,
  },

  // Reference to the admin (employer) who posted the job
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  appliedUsers: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: {
        type: String,
        enum: ['Applied', 'Reviewed', 'Rejected', 'Selected'],
        default: 'Applied',
      },
    },
  ],
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
