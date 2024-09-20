export const getAllJobs = async (req, res) => {
  try {
    // Your code here
  } catch (error) {
    // Handle the error
  }
};

export const postJob = async (req, res) => {
  try {
    const body = req.body;
    body.createAt = new Date();
    console.log(body);
  } catch (error) {
    // Handle the error
  }
};
