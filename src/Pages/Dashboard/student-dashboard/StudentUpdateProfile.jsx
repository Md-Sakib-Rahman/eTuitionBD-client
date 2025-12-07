import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router"; // or "react-router-dom"
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContextProvider";
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance"; // Use your secure hook!
import toast from "react-hot-toast"; // Assuming you have toast, or use console.log

const StudentUpdateProfile = () => {
  const { userData, setUserData, loader } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  // 1. Setup Form with Default Values from existing userData
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: userData?.studentData?.phone || "",
      address: userData?.studentData?.address || "",
      institute: userData?.studentData?.institute || "",
      grade: userData?.studentData?.grade || "",
    },
  });

  // 2. Submit Handler
  const onSubmit = async (data) => {
    setSaving(true);
    
    // Structure the data to match your Schema
    const updatePayload = {
      studentData: {
        phone: data.phone,
        address: data.address,
        institute: data.institute,
        grade: data.grade,
      },
    };

    try {
      // Send PATCH request
      const res = await axiosSecure.patch("/users/me", updatePayload);

      if (res.data.success) {
        // A. Update Local Context (Instant UI update)
        const updatedUser = { 
            ...userData, 
            studentData: updatePayload.studentData 
            
        };
        setUserData(updatedUser);

        // B. Show Success & Redirect
        // toast.success("Profile updated successfully!"); 
        console.log("Success");
        navigate("/student-dashboard"); // Go back to overview
      }
    } catch (err) {
      console.error("Update Failed:", err);
      // toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loader) return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <div className="min-h-screen bg-base-100 p-6 md:p-10 ">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-ghost btn-sm gap-2 pl-0 hover:bg-transparent text-base-content/60"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold mt-2">Update Profile</h1>
          <p className="text-base-content/70">Complete your details to get better recommendations.</p>
        </div>
      </div>

      {/* --- FORM CARD --- */}
      <div className="card bg-base-200 shadow-xl border border-base-300 w-[95%] mx-auto max-md:flex max-md:flex-col max-md:items-center ">
        <div className="card-body max-md:w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            
            {/* Row 1: Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-md:w-full">
              <div className="form-control flex flex-col max-md:w-full">
                <label className="label font-semibold">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+880 1XXX XXXXXX"
                  className={`input max-md:w-full input-bordered ${errors.phone ? "input-error" : ""}`}
                  {...register("phone", { 
                    required: "Phone number is required",
                    pattern: {
                        value: /^[0-9+ ]{11,15}$/,
                        message: "Invalid phone number"
                    }
                   })}
                />
                {errors.phone && <span className="text-error text-xs mt-1">{errors.phone.message}</span>}
              </div>

              <div className="form-control flex flex-col">
                <label className="label font-semibold">Address / Area</label>
                <input
                  type="text"
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className={`input input-bordered max-md:w-full ${errors.address ? "input-error" : ""}`}
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && <span className="text-error text-xs mt-1">{errors.address.message}</span>}
              </div>
            </div>

            <div className="divider">Academic Info</div>

            {/* Row 2: Academic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control flex flex-col">
                <label className="label font-semibold">Institute Name</label>
                <input
                  type="text"
                  placeholder="e.g. Chittagong College"
                  className={`input max-md:w-full input-bordered ${errors.institute ? "input-error" : ""}`}
                  {...register("institute", { required: "Institute is required" })}
                />
                 {errors.institute && <span className="text-error text-xs mt-1">{errors.institute.message}</span>}
              </div>

              <div className="form-control flex flex-col">
                <label className="label font-semibold">Current Class / Grade</label>
                <select 
                    className={`select select-bordered max-md:w-full ${errors.grade ? "select-error" : ""}`}
                    {...register("grade", { required: "Please select your grade" })}
                >
                    <option value="" disabled>Select your class</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="SSC / O-Level">SSC / O-Level</option>
                    <option value="HSC / A-Level">HSC / A-Level</option>
                    <option value="University">University</option>
                </select>
                {errors.grade && <span className="text-error text-xs mt-1">{errors.grade.message}</span>}
              </div>
            </div>

            {/* Actions */}
            <div className="card-actions justify-end mt-6">
              <button 
                type="button" 
                onClick={() => navigate(-1)} 
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary gap-2 min-w-[120px]"
                disabled={saving}
              >
                {saving ? <span className="loading loading-spinner loading-sm"></span> : <><FaSave /> Save Changes</>}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentUpdateProfile;