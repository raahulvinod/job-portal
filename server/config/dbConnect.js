import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI, { autoIndex: true })
      .then((data) => {
        console.log(`Database connected with ${data.connection.host}`);
      });
  } catch (error) {
    console.log(error.message);
    setTimeout(connectDb, 5000);
  }
};

export default connectDb;
