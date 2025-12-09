import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContextProvider";
import useAxiosSecure from "../../AxiosInstance/AxiosSecureInstance";
import toast from "react-hot-toast";

const PostDetails = () => {
  const { id } = useParams();
  const { userData } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);


  const isAuthor = userData?.uid && post?.studentId?._id === userData?._id;
  const isTutor = userData?.role === 'tutor';


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosSecure.get(`/posts/${id}`);
        setPost(res.data);
        
        
        if (userData?.email === res.data.studentId?.email) {
            fetchApplications();
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userData) fetchPost();
  }, [id, userData, axiosSecure]);

 
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
          await axiosSecure.post('/apply-job', { postId: id });
          toast.success("Applied successfully!");
      } catch(err) {
          toast.error(err.response?.data?.message || "Failed to apply");
      }
  };

  const handleConfirmTutor = async (applicationId) => {
      toast.success("Tutor Confirmed! Redirecting to payment...");
  };

  const handleDelete = async () => {
    if(window.confirm("Are you sure you want to delete this post? This cannot be undone.")) {
        try {
            const res = await axiosSecure.delete(`/posts/${id}`);
            if(res.data.success) {
                toast.success("Post deleted successfully");
                navigate("/student-dashboard/studenttuitionposts"); 
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to delete post");
        }
    }
  };

  if (loading) return (
    <div className="flex justify-center h-screen items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
  
  if (!post) return <div className="text-center mt-20 text-xl font-bold">Post not found</div>;


  const student = post.studentId || {};

  return (
    <div className="min-h-screen bg-base-100 p-6 md:p-10 max-w-6xl mx-auto mt-16">
      
    
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
            <div className="flex items-center gap-2 mb-2">
               
                <span className={`badge ${
                    post.status === 'approved' ? 'badge-success' : 
                    post.status === 'pending' ? 'badge-warning' : 'badge-ghost'
                } capitalize`}>
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
                <Link to={`/student-dashboard/edit-post/${post._id}`} className="btn btn-outline btn-primary gap-2">
                    <FaEdit /> Edit
                </Link>
                <button onClick={handleDelete} className="btn btn-outline btn-error gap-2">
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
                                    src={student.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                                    alt="Student" 
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            {/* Live Name from User Collection */}
                            <p className="font-bold text-lg">{student.name || "Unknown Student"}</p>
                            <div className="flex items-center gap-1 text-sm text-base-content/70">
                                <FaMapMarkerAlt className="text-error" />
                                {/* Job location preference */}
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
                        <p className="text-sm text-base-content/60 mb-4">Tutors who have applied for this job.</p>

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
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.map((app) => (
                                            <tr key={app._id}>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={app.tutorId?.image || "https://via.placeholder.com/50"} alt="Avatar" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{app.tutorId?.name || "Unknown"}</div>
                                                            <div className="text-sm opacity-50">{app.tutorId?.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    ⭐ {app.tutorId?.tutorData?.averageRating || "New"}
                                                </td>
                                                <th>
                                                    <button 
                                                        onClick={() => handleConfirmTutor(app._id)}
                                                        className="btn btn-primary btn-xs"
                                                    >
                                                        Confirm & Hire
                                                    </button>
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
                    <h3 className="text-lg font-bold text-base-content/60">Job Summary</h3>
                    
                    <div className="flex items-center gap-3 mt-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                            <FaMoneyBillWave className="text-xl" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase text-base-content/50">Budget</p>
                            <p className="text-2xl font-bold">{post.budget} USD</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                            <FaClock className="text-xl" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase text-base-content/50">Duration</p>
                            <p className="text-xl font-bold">{post.duration} Hours</p>
                        </div>
                    </div>

                    <div className="divider"></div>

                    {isTutor ? (
                        <button 
                            onClick={handleApply}
                            className="btn btn-primary w-full text-lg"
                            
                            disabled={post.status !== 'approved'}
                        >
                            {post.status === 'pending' ? "Pending Approval" : "Apply Now"}
                        </button>
                    ) : !isAuthor ? (
                        <div className="alert alert-info text-sm">
                            Log in as a Tutor to apply.
                        </div>
                    ) : null}

                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default PostDetails;