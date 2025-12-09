import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPaperPlane, FaMoneyBillWave, FaClock } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContextProvider";
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";
import { useNavigate } from "react-router";
import toast from "react-hot-toast"; 

const PostJob = () => {
  const { userData } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      studentName: userData?.displayName, 
      studentEmail: userData?.email,      
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    const jobData = {
      subject: data.subject,
      classGrade: data.classGrade,
      medium: data.medium,
      duration: Number(data.duration), 
      budget: Number(data.budget),     
      district: data.district,
      area: data.area,
      address: data.address,
      description: data.description,
      // Note: Status defaults to 'pending' on backend automatically
    };

    try {
      const res = await axiosSecure.post("/posts", jobData);
      
      if (res.data.success) {
        // Message updated to reflect the Admin Approval workflow
        toast.success("Job submitted! Pending admin approval.");
        navigate("/student-dashboard/studenttuitionposts");  
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Post a Tuition Job</h1>
        <p className="text-base-content/70">Find the perfect tutor for your specific needs.</p>
      </div>

      <div className="card bg-base-200 shadow-xl border border-base-300 max-w-4xl mx-auto">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* --- SECTION 1: READ ONLY INFO --- */}
            <div className="form-control flex flex-col">
              <label className="label font-semibold">Student Name</label>
              <input
                type="text"
                readOnly
                className="input input-bordered bg-base-300 text-base-content/60 cursor-not-allowed"
                {...register("studentName")}
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label font-semibold">Student Email</label>
              <input
                type="email"
                readOnly
                className="input input-bordered bg-base-300 text-base-content/60 cursor-not-allowed"
                {...register("studentEmail")}
              />
            </div>

            <div className="divider md:col-span-2 text-primary font-bold">Job Details</div>

            {/* --- SECTION 2: JOB INFO --- */}
            <div className="form-control flex flex-col">
              <label className="label font-semibold">Subject</label>
              <input
                type="text"
                placeholder="e.g. Higher Math, Physics"
                className={`input input-bordered ${errors.subject ? "input-error" : ""}`}
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && <span className="text-error text-xs mt-1">{errors.subject.message}</span>}
            </div>

            <div className="form-control flex flex-col">
              <label className="label font-semibold">Class / Grade</label>
              <select
                className={`select select-bordered ${errors.classGrade ? "select-error" : ""}`}
                {...register("classGrade", { required: "Class is required" })}
              >
                <option value="">Select Grade</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="HSC-1">HSC 1st Year</option>
                <option value="HSC-2">HSC 2nd Year</option>
                <option value="O-Level">O-Level</option>
                <option value="A-Level">A-Level</option>
              </select>
              {errors.classGrade && <span className="text-error text-xs mt-1">{errors.classGrade.message}</span>}
            </div>

            <div className="form-control flex flex-col">
              <label className="label font-semibold">Medium</label>
              <select
                className={`select select-bordered ${errors.medium ? "select-error" : ""}`}
                {...register("medium", { required: "Medium is required" })}
              >
                <option value="">Select Medium</option>
                <option value="Bangla Medium">Bangla Medium</option>
                <option value="English Medium">English Medium</option>
                <option value="English Version">English Version</option>
                <option value="Madrasa">Madrasa</option>
              </select>
              {errors.medium && <span className="text-error text-xs mt-1">{errors.medium.message}</span>}
            </div>

            {/* --- SECTION 3: TIME & MONEY --- */}
            <div className="form-control flex flex-col">
              <label className="label font-semibold">Duration (Hours)</label>
              <div className="relative">
                <FaClock className="absolute top-4 left-4 text-base-content/40" />
                <input
                  type="number"
                  placeholder="e.g. 2"
                  className={`input input-bordered pl-10 w-full ${errors.duration ? "input-error" : ""}`}
                  {...register("duration", { 
                    required: "Duration is required",
                    min: { value: 1, message: "Min 1 hour" },
                    max: { value: 5, message: "Max 5 hours" }
                  })}
                />
              </div>
              {errors.duration && <span className="text-error text-xs mt-1">{errors.duration.message}</span>}
            </div>

            <div className="form-control flex flex-col">
              <label className="label font-semibold">Total Budget (USD)</label>
              <div className="relative flex flex-col">
                <FaMoneyBillWave className="absolute top-4 left-4 text-base-content/40" />
                <input
                  type="number"
                  placeholder="e.g. 50"
                  className={`input input-bordered pl-10 w-full ${errors.budget ? "input-error" : ""}`}
                  {...register("budget", { 
                    required: "Budget is required",
                    min: { value: 5, message: "Min budget is 5 USD" }
                  })}
                />
              </div>
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                   This is the total amount you will pay the tutor for this session.
                </span>
              </label>
              {errors.budget && <span className="text-error text-xs mt-1">{errors.budget.message}</span>}
            </div>

            <div className="divider md:col-span-2 text-primary font-bold">Location</div>

            {/* --- SECTION 4: LOCATION (Required for Challenges) --- */}
            <div className="form-control flex flex-col">
              <label className="label font-semibold">District</label>
              <select
                className={`select select-bordered ${errors.district ? "select-error" : ""}`}
                {...register("district", { required: "District is required" })}
              >
                <option value="">Select District</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Sylhet">Sylhet</option>
                {/* Add more districts as needed for your filter challenge */}
              </select>
              {errors.district && <span className="text-error text-xs mt-1">{errors.district.message}</span>}
            </div>

            <div className="form-control flex flex-col">
              <label className="label font-semibold">Area</label>
              <input
                type="text"
                placeholder="e.g. Dhanmondi, GEC Circle"
                className={`input input-bordered ${errors.area ? "input-error" : ""}`}
                {...register("area", { required: "Area is required" })}
              />
              {errors.area && <span className="text-error text-xs mt-1">{errors.area.message}</span>}
            </div>

            <div className="form-control md:col-span-2 flex flex-col">
              <label className="label font-semibold">Full Address</label>
              <input
                type="text"
                placeholder="House No, Road No..."
                className="input input-bordered"
                {...register("address")}
              />
            </div>

             <div className="form-control md:col-span-2 flex flex-col">
              <label className="label font-semibold">Additional Description</label>
              <textarea
                className={`textarea ${errors.description ? "input-error" : ""} textarea-bordered h-24`}
                placeholder="Any specific requirements for the tutor?"
                {...register("description", { required: "Description is required" })}
              ></textarea>
              {errors.description && <span className="text-error text-xs mt-1">{errors.description.message}</span>}
            </div>

            {/* --- SUBMIT --- */}
            <div className="form-control mt-6 md:col-span-2 w-full">
              <button 
                type="submit" 
                className="btn btn-primary w-full md:w-1/2 mx-auto"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner"></span> : <><FaPaperPlane /> Post Job</>}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;