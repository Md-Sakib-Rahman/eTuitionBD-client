import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router"; // Fixed imports
import { FaChevronDown, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";
import toast from "react-hot-toast";

const StudentTuitionPosts = () => {
  const [posts, setPosts] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axiosSecure.get("/my-posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchMyPosts();
  }, [axiosSecure]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post? This cannot be undone.")) {
      try {
        const res = await axiosSecure.delete(`/posts/${id}`);
        if (res.data.success) {
          toast.success("Post deleted successfully");
          
          setPosts((prev) => prev.filter((post) => post._id !== id));
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to delete post");
      }
    }
  };

 
  const activePosts = posts.filter((p) => p.status === "approved" || p.status === "pending");
  const bookedPosts = posts.filter((p) => p.status === "booked");
  const completedPosts = posts.filter((p) => p.status === "completed");

 
  const PostTable = ({ data, showActions = true }) => {
    if (data.length === 0) {
      return <div className="p-6 text-center text-base-content/50 italic">No posts in this section.</div>;
    }
    return (
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-base-200/50">
              <th>Subject</th>
              <th>Class/Grade</th>
              <th>Status</th>
              <th>Budget</th>
              <th>Date</th>
              {showActions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((post) => (
              <tr key={post._id} className="hover:bg-base-100">
                <td className="font-bold">
                  {post.subject}
                  <Link to={`/student-dashboard/post-details/${post._id}`} className="ml-2 text-xs text-primary btn btn-ghost btn-xs">
                    <FaEye /> View
                  </Link>
                </td>
                <td>{post.classGrade}</td>
                <td>
                  <span
                    className={`badge badge-sm ${
                      post.status === "approved" ? "badge-success" :
                      post.status === "pending" ? "badge-warning" :
                      post.status === "booked" ? "badge-info" : "badge-ghost"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td>${post.budget}</td>
                <td className="text-xs">{new Date(post.createdAt).toLocaleDateString()}</td>
                
                {showActions && (
                  <td className="flex gap-2">
                    {post.status !== "booked" && post.status !== "completed" ? (
                      <>
                        <Link to={`/student-dashboard/edit-post/${post._id}`} className="btn btn-xs btn-outline btn-info">
                          <FaEdit />
                        </Link>
                        <button onClick={() => handleDelete(post._id)} className="btn btn-xs btn-outline btn-error">
                          <FaTrash />
                        </button>
                      </>
                    ) : (
                      <span className="text-xs opacity-50">Locked</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="w-[95%] mx-auto text-sm p-6 md:p-10">
      
      
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">My Tuition Posts</h1>
        <Link to="/student-dashboard/post-job" className="btn btn-primary shadow-lg">
          Create New Post +
        </Link>
      </div>

      <div className="space-y-6">

        
        <div className="collapse collapse-arrow bg-base-100 border border-base-300 shadow-sm">
          <input type="checkbox" defaultChecked /> 
          <div className="collapse-title text-lg font-medium bg-base-200 text-primary">
            Looking for Tutors ({activePosts.length})
          </div>
          <div className="collapse-content p-0">
            <PostTable data={activePosts} />
          </div>
        </div>

        {/* 2. Booked / Ongoing Posts (Tutor Hired) */}
        <div className="collapse collapse-arrow bg-base-200 border border-base-300 shadow-sm">
          <input type="checkbox" defaultChecked /> 
          <div className="collapse-title text-lg font-medium  text-primary">
             Ongoing / Booked Tuitions ({bookedPosts.length})
          </div>
          <div className="collapse-content p-0">
            <PostTable data={bookedPosts} showActions={false} />
          </div>
        </div>

        
        <div className="collapse collapse-arrow  border border-base-300 shadow-sm opacity-80">
          <input type="checkbox" /> 
          <div className="collapse-title text-lg font-medium text-base-content">
             Completed History ({completedPosts.length})
          </div>
          <div className="collapse-content p-0">
            <PostTable data={completedPosts} showActions={false} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentTuitionPosts;

