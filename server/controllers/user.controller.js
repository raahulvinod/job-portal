import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Job from '../models/job.model.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// Signup
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ fullname, email, password });
    const token = generateToken(user._id);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Google Authentication
export const googleAuth = async (req, res) => {
  const { email, name, googleId } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      const randomPassword = crypto.randomBytes(8).toString('hex');
      user = await User.create({
        fullname: name,
        email,
        googleId,
        password: randomPassword,
        provider: 'google',
      });
    }
    const token = generateToken(user._id);
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Profile
export const getUser = async (req, res) => {
  const userId = req.user;

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch Applied Jobs by User
export const fetchAppliedJobByUser = async (req, res) => {
  const userId = req.user;

  try {
    const user = await User.findById(userId).populate({
      path: 'appliedJobs.jobId',
      select: 'jobTitle companyName employmentType jobLocation',
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ appliedJobs: user.appliedJobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Applied Job Status

export const updateAppliedJobStatus = async (req, res) => {
  const { jobId } = req.params;
  const { status, userId } = req.body;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Update the user's applied job status
    const appliedJobIndex = user.appliedJobs.findIndex(
      (appliedJob) => appliedJob.jobId.toString() === jobId
    );
    if (appliedJobIndex === -1) {
      return res
        .status(404)
        .json({ message: 'Applied job not found for user' });
    }
    user.appliedJobs[appliedJobIndex].status = status;
    await user.save();

    // Update the job's applied users status
    const appliedUserIndex = job.appliedUsers.findIndex(
      (appliedUser) => appliedUser.userId.toString() === userId
    );
    if (appliedUserIndex === -1) {
      return res
        .status(404)
        .json({ message: "User not found in job's applied users" });
    }
    job.appliedUsers[appliedUserIndex].status = status;
    await job.save();

    res.status(200).json({ message: 'Status updated successfully', status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
