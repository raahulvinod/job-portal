import Job from '../models/job.model.js';

// Create a new job
export const postJob = async (req, res) => {
  const body = req.body;

  try {
    const newJob = new Job(body);
    const savedJob = await newJob.save();

    res.status(201).json({
      message: 'Job created successfully',
      job: savedJob,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating job',
      error: error.message,
    });
  }
};

// Update a job by ID
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, updates, {
      new: true, // return the updated document
      runValidators: true, // ensure the updates match the schema
    });

    if (!updatedJob) {
      return res.status(404).json({
        message: 'Job not found',
      });
    }

    res.status(200).json({
      message: 'Job updated successfully',
      job: updatedJob,
    });
  } catch (error) {
    console.error('Error updating job:', error.message);
    res.status(500).json({
      message: 'Error updating job',
      error: error.message,
    });
  }
};

// Delete a job by ID
export const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({
        message: 'Job not found',
      });
    }

    res.status(200).json({
      message: 'Job deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting job',
      error: error.message,
    });
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(200).json({
      message: 'Jobs fetched successfully',
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching jobs',
      error: error.message,
    });
  }
};

// Get a job by ID
export const getJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
      });
    }

    res.status(200).json({
      message: 'Job fetched successfully',
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching job',
      error: error.message,
    });
  }
};

// Get jobs by postedBy email
export const getJobByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    // Find jobs where the 'postedBy' field matches the email
    const jobs = await Job.find({ postedBy: email });

    if (jobs.length === 0) {
      return res.status(404).json({
        message: 'No jobs found for this email',
      });
    }

    res.status(200).json({
      message: 'Jobs fetched successfully',
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching jobs',
      error: error.message,
    });
  }
};
