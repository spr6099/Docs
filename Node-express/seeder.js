import User from "../models/auth_model.js";

export const createDefaultUser = async () => {
  try {
    // const existingUser = User.findOne({ email: "sandeep.pr3@gmail.com" });
    // if (existingUser) {
    //   console.log("user alreday exists");
    //   return;
    // }

    const user = new User({
      email: "sandeep.pr3@gmail.com",
      password: "123",
    });
    await user.save();
    console.log("default user is created");
  } catch (error) {
    console.log(error);
  }
};
