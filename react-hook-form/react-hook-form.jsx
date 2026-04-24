import React from "react";
import { useForm } from "react-hook-form";
import { registerApi } from "../../services/authServices";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...payload } = data;
      const res = await registerApi(payload);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-2xl bg-gray-200 rounded-md p-5">
        <h2>Register</h2>
        <form
          className="grid md:grid-cols-2 gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be atleast 3 charecters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "only letters are allowed",
                },
              })}
              placeholder="Enter your Name "
              className="border rounded-md border-gray-400 px-3 py-2 focus:outline-none  focus:ring-2 focus:ring-green-500 "
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label>Email </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors}
          </div>

          <div>
            <label> Password</label>

            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain uppercase, lowercase, number, and special character",
                },
              })}
            />
          </div>
          <div>
            <label>Confirm Password</label>

            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
          </div>
          <button
            type="submit"
            className="md:col-span-2 bg-green-500 px-3 py-2 rounded-md text-white "
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
