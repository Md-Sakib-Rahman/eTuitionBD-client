import React, { useEffect, useState } from "react";
import { FaSearch, FaUserCog, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";
import toast from "react-hot-toast";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        const res = await axiosSecure.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [axiosSecure]);


  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  const handleViewUser = (id) => {
    navigate(`/admin-dashboard/admin-user-overview/${id}`);
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
      
     
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FaUserCog className="text-primary" /> User Management
          </h1>
          <p className="text-base-content/60 mt-1">
            Total Users: {users.length}
          </p>
        </div>

        <div className="join w-full md:w-auto shadow-sm">
          <input
            type="text"
            className="input input-bordered join-item w-full md:w-80"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary join-item">
            <FaSearch />
          </button>
        </div>
      </div>

      
      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-2xl border border-base-200">
        <table className="table">
          
          <thead className="bg-base-200 text-base-content/70">
            <tr>
              <th>#</th>
              <th>User Info</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-base-content/50">
                  No users found matching "{searchTerm}"
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr 
                  key={user._id} 
                  className="hover:bg-base-200/50 cursor-pointer transition-colors"
                  onClick={() => handleViewUser(user._id)} 
                >
                  <th>{index + 1}</th>
                  
                  
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10">
                          <img 
                            src={user.image || "https://via.placeholder.com/40"} 
                            alt="Avatar" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-xs opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>

                
                  <td>
                    <span className={`badge badge-sm font-semibold capitalize ${
                        user.role === 'admin' ? 'badge-error text-white' :
                        user.role === 'tutor' ? 'badge-primary text-white' :
                        'badge-ghost'
                    }`}>
                        {user.role}
                    </span>
                  </td>

                
                  <td>
                    <div className={`badge badge-xs gap-2 ${
                        user.status === 'active' ? 'badge-success' : 'badge-warning'
                    }`}>
                         {user.status || 'Active'}
                    </div>
                  </td>

                  <td className="text-sm font-mono">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                 
                  <td className="text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleViewUser(user._id);
                      }}
                      className="btn btn-ghost btn-xs text-primary"
                    >
                      <FaEye /> View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;