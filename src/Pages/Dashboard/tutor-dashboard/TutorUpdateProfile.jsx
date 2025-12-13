import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContextProvider";
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance"; 
import Swal from "sweetalert2";

const TutorUpdateProfile = () => {
  const { userData, setUserData, loader } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: userData?.tutorData?.phone || "",
      address: userData?.tutorData?.address || "",
      qualifications: userData?.tutorData?.qualifications || "",
      experience: userData?.tutorData?.experience || "",
      hourlyRate: userData?.tutorData?.hourlyRate || "",
      subjects: userData?.tutorData?.subjects?.join(", ") || "", 
      bio: userData?.tutorData?.bio || "",
    },
  });

  
  const onSubmit = async (data) => {
    setSaving(true);

    const subjectsArray = data.subjects
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== ""); 

    const updatePayload = {
      tutorData: {
        phone: data.phone,
        address: data.address,
        qualifications: data.qualifications,
        experience: Number(data.experience), 
        hourlyRate: Number(data.hourlyRate), 
        subjects: subjectsArray,             
        bio: data.bio,
      },
    };

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/users/me`;
      const res = await axiosSecure.patch(url, updatePayload);
      // const res = await axiosSecure.patch("/users/me", updatePayload);

      if (res.data.success) {
       
        const updatedUser = {
          ...userData,
          tutorData: updatePayload.tutorData,
        };
        setUserData(updatedUser);

        
        console.log("Success");
        Swal.fire({
                  position: "top-end",
                  width: 400,
                  height: 300,
                  theme:"dark", 
                  icon: "success",
                  title: "Update Success !",
                  showConfirmButton: false,
                  timer: 1500,
                });
        navigate("/tutor-dashboard");
      }
    } catch (err) {
      console.log("Error URL:", err.config?.url); 
      console.log("Error Response:", err.response?.data);

      console.error("Update Failed:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loader) return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <div className="min-h-screen bg-base-100 p-6 md:p-10">
      
       
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-sm gap-2 pl-0 hover:bg-transparent text-base-content/60"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold mt-2">Update Tutor Profile</h1>
          <p className="text-base-content/70">
            Keep your professional details updated to attract students.
          </p>
        </div>
      </div>

      
      <div className="card bg-base-200 shadow-xl border border-base-300 w-[95%] mx-auto max-md:flex max-md:flex-col max-md:items-center">
        <div className="card-body max-md:w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            
             
            <div className="divider text-primary font-bold">Contact Details</div>
            
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
                      message: "Invalid phone number",
                    },
                  })}
                />
                {errors.phone && (
                  <span className="text-error text-xs mt-1">{errors.phone.message}</span>
                )}
              </div>

              <div className="form-control flex flex-col">
                <label className="label font-semibold">Address / Area</label>
                <input
                  type="text"
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className={`input input-bordered max-md:w-full ${errors.address ? "input-error" : ""}`}
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && (
                  <span className="text-error text-xs mt-1">{errors.address.message}</span>
                )}
              </div>
            </div>

        
            <div className="divider text-primary font-bold">Professional Info</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               
              <div className="form-control flex flex-col ">
                <label className="label font-semibold">Qualification</label>
                <input
                  type="text"
                  placeholder="e.g. B.Sc in CSE, University of Dhaka"
                  className={`input max-md:w-full input-bordered ${errors.qualifications ? "input-error" : ""}`}
                  {...register("qualifications", { required: "Qualification is required" })}
                />
                {errors.qualifications && (
                  <span className="text-error text-xs mt-1">{errors.qualifications.message}</span>
                )}
              </div>

            
              <div className="form-control flex flex-col">
                <label className="label font-semibold">Experience (Years)</label>
                <input
                  type="number"
                  placeholder="e.g. 4"
                  className={`input max-md:w-full input-bordered ${errors.experience ? "input-error" : ""}`}
                  {...register("experience", { required: "Experience is required", min: 0 })}
                />
                {errors.experience && (
                  <span className="text-error text-xs mt-1">{errors.experience.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="form-control flex flex-col">
                <label className="label font-semibold">Hourly Rate (BDT)</label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  className={`input max-md:w-full input-bordered ${errors.hourlyRate ? "input-error" : ""}`}
                  {...register("hourlyRate", { required: "Hourly rate is required", min: 1 })}
                />
                {errors.hourlyRate && (
                  <span className="text-error text-xs mt-1">{errors.hourlyRate.message}</span>
                )}
              </div>

            
              <div className="form-control flex flex-col">
                <label className="label font-semibold">Subjects (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="Math, Physics, English"
                  className={`input max-md:w-full input-bordered ${errors.subjects ? "input-error" : ""}`}
                  {...register("subjects", { required: "At least one subject is required" })}
                />
                <label className="label">
                    <span className="label-text-alt text-base-content/60">Separate multiple subjects with commas</span>
                </label>
                {errors.subjects && (
                  <span className="text-error text-xs mt-1">{errors.subjects.message}</span>
                )}
              </div>
            </div>

            
            <div className="form-control flex flex-col">
                <label className="label font-semibold">Bio / About Me</label>
                <textarea
                  className={`textarea textarea-bordered h-24 ${errors.bio ? "textarea-error" : ""}`}
                  placeholder="Tell students about your teaching style, achievements, etc."
                  {...register("bio", { required: "Bio is required" })}
                ></textarea>
                {errors.bio && (
                  <span className="text-error text-xs mt-1">{errors.bio.message}</span>
                )}
            </div>

             
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
                {saving ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <FaSave /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TutorUpdateProfile;