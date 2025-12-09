import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { FaSave, FaArrowLeft, FaClock, FaMoneyBillWave } from "react-icons/fa";
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";
import toast from "react-hot-toast";

const EditPost = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loadingData, setLoadingData] = useState(true);
  const [updating, setUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosSecure.get(`/posts/${id}`);
        const post = res.data;

        setValue("subject", post.subject);
        setValue("classGrade", post.classGrade);
        setValue("medium", post.medium);
        setValue("duration", post.duration);
        setValue("budget", post.budget);
        setValue("description", post.description);
        
        
        
        setLoadingData(false);
      } catch (err) {
        toast.error("Failed to load post data");
        navigate("/student-dashboard/my-posts");
      }
    };

    fetchPost();
  }, [id, axiosSecure, setValue, navigate]);

  // 2. Submit Update
  const onSubmit = async (data) => {
    setUpdating(true);
    
    // Convert numbers ensuring they are valid
    const updatePayload = {
        ...data,
        duration: Number(data.duration),
        budget: Number(data.budget)
    };

    try {
      const res = await axiosSecure.put(`/posts/${id}`, updatePayload);
      if (res.data.success) {
        toast.success("Post Updated Successfully!");
        navigate(`/student-dashboard/post-details/${id}`); // Go back to details
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update post");
    } finally {
      setUpdating(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex justify-center h-screen items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8 ">
        <button 
            onClick={() => navigate(-1)} 
            className="btn btn-ghost btn-circle"
        >
            <FaArrowLeft />
        </button>
        <div>
            <h1 className="text-3xl font-bold">Edit Job Post</h1>
            <p className="text-base-content/70">Update details for your tuition request.</p>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl border border-base-300 max-w-4xl mx-auto">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* --- JOB INFO --- */}
            <div className="form-control flex flex-col">
              <label className="label font-semibold">Subject</label>
              <input
                type="text"
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
            </div>

            {/* --- TIME & MONEY --- */}
            <div className="form-control flex flex-col">
              <label className="label font-semibold">Duration (Hours)</label>
              <div className="relative">
                <FaClock className="absolute top-4 left-4 text-base-content/40" />
                <input
                  type="number"
                  className={`input input-bordered pl-10 w-full ${errors.duration ? "input-error" : ""}`}
                  {...register("duration", { required: true, min: 1 })}
                />
              </div>
            </div>

            <div className="form-control flex flex-col">
              <label className="label font-semibold">Total Budget (USD/BDT)</label>
              <div className="relative">
                <FaMoneyBillWave className="absolute top-4 left-4 text-base-content/40" />
                <input
                  type="number"
                  className={`input input-bordered pl-10 w-full ${errors.budget ? "input-error" : ""}`}
                  {...register("budget", { required: true, min: 5 })}
                />
              </div>
            </div>

            {/* --- DESCRIPTION --- */}
             <div className="form-control md:col-span-2 flex flex-col">
              <label className="label font-semibold">Additional Description</label>
              <textarea
                className="textarea textarea-bordered h-32"
                {...register("description", { required: "Description is required" })}
              ></textarea>
              {errors.description && <span className="text-error text-xs mt-1">{errors.description.message}</span>}
            </div>

            {/* --- SUBMIT --- */}
            <div className="form-control mt-6 md:col-span-2 flex flex-col">
              <button 
                type="submit" 
                className="btn btn-primary w-full md:w-1/2 mx-auto"
                disabled={updating}
              >
                {updating ? <span className="loading loading-spinner"></span> : <><FaSave /> Update Post</>}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;