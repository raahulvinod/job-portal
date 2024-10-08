import Job from '../models/job.model.js';
import User from '../models/user.model.js';

export const postJob = async (req, res) => {
  const body = req.body;

  try {
    const newJob = new Job({
      ...body,
      postedBy: req.user,
    });

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
  const userId = req.user;
  const updateData = req.body;

  try {
    // Find the job by ID
    const job = await Job.findById(id);

    // If no job found
    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
      });
    }

    // Check if the user is the one who created the job
    if (job.postedBy.toString() !== userId) {
      return res.status(403).json({
        message: 'You are not authorized to update this job',
      });
    }

    // Update the job
    const updatedJob = await Job.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      message: 'Job updated successfully',
      job: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating job',
      error: error.message,
    });
  }
};

// Delete a job by ID
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;

  try {
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
      });
    }

    // Check if the job was posted by the logged-in user
    if (job.postedBy.toString() !== userId) {
      return res.status(403).json({
        message: 'You are not authorized to delete this job',
      });
    }

    // Delete the job
    await Job.findByIdAndDelete(id);

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

export const getJobByUser = async (req, res) => {
  try {
    const userId = req.user;

    // Find jobs where 'postedBy' field matches the userId
    const jobs = await Job.find({ postedBy: userId });

    if (jobs.length === 0) {
      return res.status(404).json({
        message: 'No jobs found for this user',
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

// Apply job
export const applyJob = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;

  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const alreadyApplied = job.appliedUsers.some(
      (appliedUser) => appliedUser.userId.toString() === userId
    );
    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: 'You have already applied for this job' });
    }

    job.appliedUsers.push({ userId, status: 'Applied' });
    await job.save();

    const user = await User.findById(userId);
    user.appliedJobs.push({ jobId: id, status: 'Applied' });
    await user.save();

    res.status(200).json({ message: 'Job application successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Find job applied users
export const findAppliedUsers = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the job by ID
    const job = await Job.findById(id).populate(
      'appliedUsers.userId',
      'fullname email'
    );

    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
      });
    }

    // Get the list of applied users for this job
    const appliedUsers = job.appliedUsers.map((appliedUser) => ({
      userId: appliedUser.userId._id,
      name: appliedUser.userId.fullname,
      email: appliedUser.userId.email,
      status: appliedUser.status,
    }));

    res.status(200).json({
      message: 'Job and applied users fetched successfully',
      jobId: job._id,
      jobTitle: job.title,
      companyName: job.companyName,
      jobLocation: job.jobLocation,
      employmentType: job.employmentType,
      postingDate: job.postingDate,
      companyLogo: job.companyLogo,
      appliedUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching job and applied users',
      error: error.message,
    });
  }
};
