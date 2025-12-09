import React, { useEffect, useState } from "react";
import { Link, Links, Navigate } from "react-router";
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";
import toast from "react-hot-toast";

const StudentTuitionPosts = () => {
  const [posts, setPosts] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchMyPosts = async () => {
      const res = await axiosSecure.get("/my-posts");
      console.log(res.data);
      setPosts(res.data);
    };
    fetchMyPosts();
  }, [axiosSecure]);

  const handleDelete = async (id)=>{
        if(window.confirm("Are you sure you want to delete this post? This cannot be undone.")) {
        try {
            const res = await axiosSecure.delete(`/posts/${id}`);
            
            if(res.data.success) {
                toast.success("Post deleted successfully");
                Navigate("/"); 
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to delete post");
        }
    }
  }


  return (
    <div className="w-[95%] mx-auto text-sm p-10 max-sm:p-4">
      <div className="flex justify-end items-center my-10">
        <Link to="/student-dashboard/post-job" className="btn btn-primary">
          Create a new Post +
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>post description</th>
              <th>Budget</th>
              <th>created at</th>
              <th>Update/Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {posts.map((post , index) => {
              return (
                <tr key={index}>
                  <th>{index+1}</th>
                  <td>{post.description} <Link className="text-blue-500" to={`/student-dashboard/post-details/${post._id}`}>...view</Link></td>
                  <td>{post.budget}$</td>
                  <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                  <td className="text-sm">
                    <button onclick={()=>handleDelete(post._id)} className="btn bg-red-400 text-black">Delete</button>
                    <Link to={`/student-dashboard/edit-post/${post._id}`} className="btn bg-blue-400 text-black">Edit</Link>
                  </td>
                </tr>
              );
            })}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTuitionPosts;
