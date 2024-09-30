import { useLoaderData, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import CreatableSelect from 'react-select/creatable';
import toast from 'react-hot-toast';

const UpdateJob = () => {
  const { id } = useParams();
  const { job } = useLoaderData();

  const {
    _id,
    jobTitle,
    companyName,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    companyLogo,
    employmentType,
    description,
    postedBy,
    skills,
  } = job || {};

  const navigate = useNavigate();

  const initialSkills = skills
    ? skills.map((skill) => ({
        value: skill.value || skill,
        label: skill.label || skill,
      }))
    : [];

  const [selectedOptions, setSelectedOptions] = useState(initialSkills);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (job) {
      setValue('jobTitle', jobTitle);
      setValue('companyName', companyName);
      setValue('minPrice', minPrice);
      setValue('maxPrice', maxPrice);
      setValue('salaryType', salaryType);
      setValue('jobLocation', jobLocation);
      setValue('postingDate', postingDate ? postingDate.split('T')[0] : '');
      setValue('experienceLevel', experienceLevel);
      setValue('companyLogo', companyLogo);
      setValue('employmentType', employmentType);
      setValue('description', description);
      setValue('postedBy', postedBy);
    }
  }, [job, setValue]);

  const onSubmit = async (data) => {
    // Convert selected options to an array of strings for skills
    data.skills = selectedOptions.map((option) => option.value);

    try {
      const response = await fetch(`http://localhost:8000/api/jobs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Job updated successfully:', result);
        toast.success('Job updated successfully!');
        navigate('/my-job');
      } else {
        console.error('Failed to update job:', result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Error updating job. Please try again later.');
    }
  };

  const options = [
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'Express', label: 'Express' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'Vue.js', label: 'Vue.js' },
    { value: 'Next.js', label: 'Next.js' },
    { value: 'Figma', label: 'Figma' },
    { value: 'UI Design', label: 'UI Design' },
    { value: 'UX Design', label: 'UX Design' },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#FAFAFA] py-10px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                {...register('jobTitle')}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                {...register('companyName')}
                className="create-job-input"
              />
            </div>
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="number"
                {...register('minPrice')}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="number"
                {...register('maxPrice')}
                className="create-job-input"
              />
            </div>
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register('salaryType')} className="create-job-input">
                <option value={salaryType}>{salaryType}</option>
                <option value="Hour">Hourly</option>
                <option value="Month">Monthly</option>
                <option value="Year">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                {...register('jobLocation')}
                className="create-job-input"
              />
            </div>
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                {...register('postingDate')}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register('experienceLevel')}
                className="create-job-input"
              >
                <option value={experienceLevel}>{experienceLevel}</option>
                <option value="No Experience">No Experience</option>
                <option value="Entry">Entry</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-lg">Required Skill Sets</label>
            <CreatableSelect
              options={options}
              value={selectedOptions}
              onChange={setSelectedOptions}
              isMulti
              className="create-job-input py-4"
            />
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                {...register('companyLogo')}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register('employmentType')}
                className="create-job-input"
              >
                <option value={employmentType}>{employmentType}</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              {...register('description')}
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
              rows={6}
              placeholder="Job Description"
            />
          </div>

          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted By</label>
            <input
              type="email"
              {...register('email')}
              className="create-job-input"
            />
          </div>

          <div className="w-full text-right">
            <input
              className="my-5 inline-block mt-12 bg-gray-900 hover:bg-gray-600 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
              type="submit"
              value="Update Job"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
