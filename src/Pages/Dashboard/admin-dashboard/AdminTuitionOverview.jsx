import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaArrowLeft, FaCheck, FaTimes, FaTrash, FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaUserGraduate } from "react-icons/fa";
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AdminTuitionOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

 
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosSecure.get(`/admin/tuitions/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load post details");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, axiosSecure]);

  
  const handleStatusChange = async (newStatus) => {
    setProcessing(true);
    try {
        const res = await axiosSecure.patch(`/admin/tuitions/${id}`, { status: newStatus });
        if(res.data.modifiedCount > 0) {
            toast.success(`Post marked as ${newStatus.toUpperCase()}`);
            setPost(prev => ({ ...prev, status: newStatus })); // Update UI locally
        }
    } catch (err) {
        toast.error("Failed to update status");
    } finally {
        setProcessing(false);
    }
  };

  
  const handleDelete = () => {
    Swal.fire({
      title: "Delete this post?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/admin/tuitions/${id}`);
          Swal.fire("Deleted!", "Post has been removed.", "success");
          navigate("/admin-dashboard/tuitions");
        } catch (err) {
          toast.error("Failed to delete post");
        }
      }
    });
  };

  if (loading) return <div className="flex justify-center h-screen items-center"><span className="loading loading-spinner loading-lg"></span></div>;
  if (!post) return <div className="text-center mt-20">Post not found</div>;

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="btn btn-circle btn-ghost">
            <FaArrowLeft />
        </button>
        <div>
            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">Tuition Overview</h1>
                <span className={`badge badge-lg capitalize ${
                    post.status === 'approved' ? 'badge-success text-white' : 
                    post.status === 'rejected' ? 'badge-error text-white' : 'badge-warning'
                }`}>
                    {post.status}
                </span>
            </div>
            <p className="text-base-content/60">Manage this tuition request</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: POST DETAILS */}
        <div className="lg:col-span-2 space-y-6">
            <div className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-4">{post.subject}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3 text-lg">
                            <FaUserGraduate className="text-primary" />
                            <span className="font-semibold">{post.classGrade} ({post.medium})</span>
                        </div>
                        <div className="flex items-center gap-3 text-lg">
                            <FaMapMarkerAlt className="text-error" />
                            <span>{post.area}, {post.district}</span>
                        </div>
                        <div className="flex items-center gap-3 text-lg">
                            <FaMoneyBillWave className="text-success" />
                            <span>{post.budget} USD</span>
                        </div>
                        <div className="flex items-center gap-3 text-lg">
                            <FaClock className="text-info" />
                            <span>{post.duration} Hours</span>
                        </div>
                    </div>

                    <div className="divider">Description</div>
                    <p className="whitespace-pre-line text-base-content/80">
                        {post.description}
                    </p>
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: ACTIONS & STUDENT INFO */}
        <div className="lg:col-span-1 space-y-6">
            
            {/* ADMIN ACTIONS CARD */}
            <div className="card bg-base-100 shadow-xl border border-primary/20">
                <div className="card-body">
                    <h3 className="card-title text-sm uppercase text-base-content/50">Admin Actions</h3>
                    
                    <div className="flex flex-col gap-3 mt-2">
                        {/* APPROVE BUTTON */}
                        <button 
                            onClick={() => handleStatusChange('approved')}
                            disabled={post.status === 'approved' || processing}
                            className="btn btn-success text-white w-full"
                        >
                            <FaCheck /> Approve Post
                        </button>

                        {/* REJECT BUTTON */}
                        <button 
                            onClick={() => handleStatusChange('rejected')}
                            disabled={post.status === 'rejected' || processing}
                            className="btn btn-warning text-white w-full"
                        >
                            <FaTimes /> Reject Post
                        </button>

                        <div className="divider my-1"></div>

                        {/* DELETE BUTTON */}
                        <button 
                            onClick={handleDelete}
                            className="btn btn-outline btn-error w-full"
                        >
                            <FaTrash /> Delete Permanently
                        </button>
                    </div>
                </div>
            </div>

            {/* STUDENT INFO CARD */}
            <div className="card bg-base-200 shadow-sm">
                <div className="card-body">
                    <h3 className="card-title text-sm uppercase text-base-content/50">Posted By</h3>
                    
                    <div className="flex items-center gap-4 mt-2">
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img src={post.studentId?.image || "https://via.placeholder.com/50"} alt="Student" />
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-bold truncate">{post.studentId?.name}</p>
                            <p className="text-xs text-base-content/60 truncate">{post.studentId?.email}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default AdminTuitionOverview;