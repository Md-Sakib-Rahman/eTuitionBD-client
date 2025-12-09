import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaUserShield, FaTrash, FaSave, FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";
import toast from "react-hot-toast";
import Swal from "sweetalert2"; 

const AdminUserOverview = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "student",
    status: "active",
    image: "",
    studentData: {},
    tutorData: {}
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        
        const res = await axiosSecure.get(`/users/${id}`); 
        setUser(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, axiosSecure]);

  // 2. Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };


  const handleSaveChanges = async () => {
    setSaving(true);
    try {
     
      const updateData = {
        name: user.name,
        role: user.role,
        status: user.status,
     
      };

      const res = await axiosSecure.patch(`/users/admin-update/${id}`, updateData);
      
      if (res.data.modifiedCount > 0 || res.data.success) {
        toast.success("User profile updated successfully!");
      } else {
        toast.success("No changes detected.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user.");
    } finally {
      setSaving(false);
    }
  };

  
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! This user will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/users/${id}`);
          Swal.fire("Deleted!", "User has been deleted.", "success");
          navigate("/admin-dashboard"); 
        } catch (err) {
          toast.error("Failed to delete user.");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      
      {/* --- HEADER --- */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="btn btn-circle btn-ghost">
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-3xl font-bold">User Overview</h1>
          <p className="text-base-content/60">Manage permissions and details for {user.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
     
        <div className="lg:col-span-1 space-y-6">
          
         
          <div className="card bg-base-200 shadow-xl border border-base-300">
            <div className="card-body items-center text-center">
              <div className="avatar mb-4">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.image} alt="Profile" referrerPolicy="no-referrer" />
                </div>
              </div>
              <h2 className="card-title text-2xl">{user.name}</h2>
              <p className="text-sm opacity-70">{user.email}</p>
              
              <div className="flex gap-2 mt-4">
                <span className={`badge badge-lg capitalize ${
                  user.role === 'admin' ? 'badge-error text-white' : 
                  user.role === 'tutor' ? 'badge-primary text-white' : 'badge-ghost'
                }`}>
                  {user.role}
                </span>
                <span className={`badge badge-lg capitalize ${
                   user.status === 'active' ? 'badge-success' : 'badge-warning'
                }`}>
                  {user.status || 'Active'}
                </span>
              </div>
            </div>
          </div>

        
          <div className="card bg-red-50 border border-red-200">
            <div className="card-body">
              <h3 className="card-title text-red-600 text-sm uppercase">Danger Zone</h3>
              <p className="text-xs text-red-800">
                Deleting this user will remove all their posts, applications, and history.
              </p>
              <button 
                onClick={handleDelete}
                className="btn btn-error btn-sm text-white mt-2 w-full gap-2"
              >
                <FaTrash /> Delete User
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <h3 className="card-title mb-6 flex items-center gap-2">
                <FaUserShield className="text-primary" /> Edit User Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
               
                <div className="form-control">
                  <label className="label font-bold">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={user.name} 
                    onChange={handleInputChange}
                    className="input input-bordered" 
                  />
                </div>

                
                <div className="form-control">
                  <label className="label font-bold">Email</label>
                  <input 
                    type="email" 
                    value={user.email} 
                    readOnly
                    className="input input-bordered bg-base-200 cursor-not-allowed" 
                  />
                  <label className="label">
                    <span className="label-text-alt text-error">Email cannot be changed directly</span>
                  </label>
                </div>

                
                <div className="form-control">
                  <label className="label font-bold text-primary">Assign Role</label>
                  <select 
                    name="role"
                    value={user.role} 
                    onChange={handleInputChange}
                    className="select select-bordered select-primary w-full"
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                
                <div className="form-control">
                  <label className="label font-bold">Account Status</label>
                  <select 
                    name="status"
                    value={user.status} 
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                  >
                    <option value="active">Active</option>
                    <option value="banned">Banned</option>
                    <option value="requested">Requested</option>
                  </select>
                </div>

              </div>

              
              <div className="divider my-6">Additional Data</div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                   <FaPhone className="text-base-content/50" />
                   <div>
                     <p className="font-bold">Phone</p>
                     <p>{user.tutorData?.phone || user.studentData?.phone || "N/A"}</p>
                   </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                   <FaMapMarkerAlt className="text-base-content/50" />
                   <div>
                     <p className="font-bold">Address</p>
                     <p>{user.tutorData?.address || user.studentData?.address || "N/A"}</p>
                   </div>
                </div>
              </div>

             
              <div className="card-actions justify-end mt-8">
                <button 
                  onClick={() => navigate(-1)} 
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveChanges} 
                  className="btn btn-primary min-w-[150px]"
                  disabled={saving}
                >
                  {saving ? <span className="loading loading-spinner"></span> : (
                    <>
                      <FaSave /> Save Changes
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminUserOverview;