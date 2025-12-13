import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaEdit,
  FaTrash,
  FaTimes,
  FaCheck,
  FaUserEdit,
  FaHourglassHalf,
} from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContextProvider";
import useAxiosSecure from "../../AxiosInstance/AxiosSecureInstance";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const PostDetails = () => {
  const { id } = useParams();
  const { userData, setUserData } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    bio: "",
    qualifications: "",
    hourlyRate: "",
    phone: "",
  });

  const isAuthor = userData?.uid && post?.studentId?._id === userData?._id;
  const isTutor = userData?.role === "tutor";
  const isProfileComplete =
    userData?.tutorData?.bio &&
    userData?.tutorData?.qualifications &&
    userData?.tutorData?.hourlyRate;
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosSecure.get(`/posts/${id}`);
        setPost(res.data);

        if (userData?.email === res.data.studentId?.email) {
          fetchApplications();
        }
        if (userData?.role === "tutor") {
          checkApplicationStatus();
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userData) fetchPost();
  }, [id, userData, axiosSecure]);

  const handleConfirmTutor = (applicationId) => {
    navigate(`/student-dashboard/payment/${applicationId}`);
  };

  const checkApplicationStatus = async () => {
    try {
      const res = await axiosSecure.get(`/posts/${id}/check-application`);
      if (res.data.hasApplied) {
        setApplicationStatus(res.data.status);
      } else {
        setApplicationStatus(null);
      }
    } catch (err) {
      console.error("Failed to check status", err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axiosSecure.get(`/posts/${id}/applications`);
      setApplications(res.data);
    } catch (err) {
      console.error("Failed to load apps", err);
    }
  };

  const handleApply = async () => {
    try {
      await axiosSecure.post("/apply-job", { postId: id });
      
      setApplicationStatus("pending");
      Swal.fire({
                position: "top-end",
                width: 400,
                height: 300,
                theme:"dark", 
                icon: "success",
                title: "Applied for the job !",
                showConfirmButton: false,
                timer: 1500,
              });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply");
    }
  };

  const handleRejectTutor = async (appId) => {
    if (!window.confirm("Are you sure you want to reject this tutor?")) return;
    try {
      const res = await axiosSecure.patch(`/applications/${appId}/reject`);
      if (res.data.success) {
        toast.success("Application Rejected");
        setApplications((prev) =>
          prev.map((app) =>
            app._id === appId ? { ...app, status: "rejected" } : app
          )
        );
      }
    } catch (err) {
      toast.error("Failed to reject application");
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
        const res = await axiosSecure.delete(`/posts/${id}`);
        if (res.data.success) {
          toast.success("Post deleted successfully");
          navigate("/student-dashboard/studenttuitionposts");
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete post");
      }
        
      }
    });
    
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch("/users/me", {
        tutorData: {
          ...userData.tutorData,
          bio: updateFormData.bio,
          qualifications: updateFormData.qualifications,
          hourlyRate: Number(updateFormData.hourlyRate),
          phone: updateFormData.phone,
        },
      });

      if (res.data.success) {
        toast.success("Profile Updated! Waiting for Admin Approval.");

        const updatedUser = {
          ...userData,
          tutorData: {
            ...userData.tutorData,
            ...updateFormData,
          },
        };
        setUserData(updatedUser);
        setShowUpdateModal(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center h-screen items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  if (!post)
    return (
      <div className="text-center mt-20 text-xl font-bold">Post not found</div>
    );

  const student = post.studentId || {};

  return (
    <div className="min-h-screen bg-base-100 p-6 md:p-10 max-w-6xl mx-auto mt-16">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`badge ${
                post.status === "approved"
                  ? "badge-success"
                  : post.status === "pending"
                  ? "badge-warning"
                  : "badge-ghost"
              } capitalize`}
            >
              {post.status}
            </span>
            <span className="text-sm text-base-content/60">
              Posted {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-4xl font-bold">{post.subject} Tutor Needed</h1>
          <p className="text-xl mt-1 text-base-content/70">
            for {post.classGrade} ({post.medium})
          </p>
        </div>
        {isAuthor && (
          <div className="flex gap-2">
            <Link
              to={`/student-dashboard/edit-post/${post._id}`}
              className="btn btn-outline btn-primary gap-2"
            >
              <FaEdit /> Edit
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-outline btn-error gap-2"
            >
              <FaTrash /> Delete
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <h3 className="font-bold text-lg mb-2">Student Info:</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                  <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        student.image ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      alt="Student"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold text-lg">
                    {student.name || "Unknown Student"}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-base-content/70">
                    <FaMapMarkerAlt className="text-error" />
                    {post.area}, {post.district}
                  </div>
                </div>
              </div>
              <div className="divider"></div>
              <h3 className="font-bold text-lg mb-2">Description</h3>
              <p className="whitespace-pre-line text-base-content/80">
                {post.description || "No additional description provided."}
              </p>
            </div>
          </div>

          {isAuthor && (
            <div className="card bg-base-100 border-2 border-primary/20 shadow-lg mt-10">
              <div className="card-body">
                <h3 className="card-title text-primary">
                  Applicants ({applications.length})
                </h3>

                {applications.length === 0 ? (
                  <div className="text-center py-6 bg-base-200 rounded-lg">
                    No applicants yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Tutor</th>
                          <th>Ratings</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((app) => (
                          <tr
                            key={app._id}
                            className={
                              app.status === "rejected"
                                ? "opacity-50 bg-base-200"
                                : ""
                            }
                          >
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                    <img
                                      src={
                                        app.tutorId?.image ||
                                        "https://via.placeholder.com/50"
                                      }
                                      alt="Avatar"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold">
                                    {app.tutorId?.name || "Unknown"}
                                  </div>
                                  <div className="text-sm opacity-50">
                                    {app.tutorId?.email}
                                  </div>
                                  {app.status === "rejected" && (
                                    <span className="badge badge-error badge-xs text-white mt-1">
                                      Rejected
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>
                              ⭐{" "}
                              {app.tutorId?.tutorData?.averageRating || "New"}
                            </td>
                            <th className="text-center">
                              {app.status === "pending" ? (
                                <div className="flex flex-col md:flex-row gap-2 justify-center">
                                  <button
                                    onClick={() => handleConfirmTutor(app._id)}
                                    className="btn btn-success btn-xs text-white"
                                  >
                                    <FaCheck /> Hire
                                  </button>
                                  <button
                                    onClick={() => handleRejectTutor(app._id)}
                                    className="btn btn-error btn-xs text-white"
                                  >
                                    <FaTimes /> Reject
                                  </button>
                                </div>
                              ) : (
                                <span className="text-xs font-semibold uppercase">
                                  {app.status}
                                </span>
                              )}
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl border border-base-300 sticky top-24">
            <div className="card-body">
              <h3 className="text-lg font-bold text-base-content/60">
                Job Summary
              </h3>

              <div className="flex items-center gap-3 mt-4">
                <FaMoneyBillWave className="text-xl text-green-600" />
                <div>
                  <p className="text-xs font-bold uppercase text-base-content/50">
                    Budget
                  </p>
                  <p className="text-2xl font-bold">{post.budget} USD</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <FaClock className="text-xl text-blue-600" />
                <div>
                  <p className="text-xs font-bold uppercase text-base-content/50">
                    Duration
                  </p>
                  <p className="text-xl font-bold">{post.duration} Hours</p>
                </div>
              </div>
              <div className="divider"></div>

              {isTutor ? (
                userData.status === "requested" ? (
                  isProfileComplete ? (
                    <button
                      disabled
                      className="btn btn-disabled w-full text-base-content/50"
                    >
                      <FaHourglassHalf /> Waiting for Admin Approval
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowUpdateModal(true)}
                      className="btn btn-warning w-full text-lg text-white"
                    >
                      <FaUserEdit /> Update Your Profile
                    </button>
                  )
                ) : (
                  <button
                    onClick={handleApply}
                    className={`btn w-full text-lg ${
                      applicationStatus === "rejected"
                        ? "bg-red-700 text-white"
                        : "btn-primary"
                    }`}
                    disabled={
                      userData.status !== "active" || applicationStatus !== null
                    }
                  >
                    {userData.status === "pending"
                      ? "Account Pending Approval"
                      : applicationStatus === "rejected"
                      ? "Application Rejected"
                      : applicationStatus
                      ? "Already Applied"
                      : "Apply Now"}
                  </button>
                )
              ) : !isAuthor ? (
                <div className="alert alert-info text-sm">
                  Only Tutors can apply.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {showUpdateModal && (
        <dialog id="update_profile_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Complete Your Profile</h3>
            <p className="text-sm text-base-content/70 mb-4">
              You must update your details before applying for jobs.
            </p>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bio/Tagline</span>
                </label>
                <input
                  type="text"
                  required
                  className="input input-bordered w-full"
                  placeholder="e.g. Expert Math Tutor with 5 years experience"
                  value={updateFormData.bio}
                  onChange={(e) =>
                    setUpdateFormData({
                      ...updateFormData,
                      bio: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Qualifications</span>
                </label>
                <input
                  type="text"
                  required
                  className="input input-bordered w-full"
                  placeholder="e.g. BSc in Physics, Dhaka University"
                  value={updateFormData.qualifications}
                  onChange={(e) =>
                    setUpdateFormData({
                      ...updateFormData,
                      qualifications: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Hourly Rate (USD)</span>
                </label>
                <input
                  type="number"
                  required
                  className="input input-bordered w-full"
                  placeholder="e.g. 15"
                  value={updateFormData.hourlyRate}
                  onChange={(e) =>
                    setUpdateFormData({
                      ...updateFormData,
                      hourlyRate: e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update & Apply
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowUpdateModal(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default PostDetails;
