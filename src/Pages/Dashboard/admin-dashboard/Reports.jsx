import React, { useEffect, useState } from "react";
import { FaMoneyBillWave, FaChalkboardTeacher, FaCheckCircle, FaClock, FaExchangeAlt } from "react-icons/fa";

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";
import toast from "react-hot-toast";

const Reports = () => {
  const axiosSecure = useAxiosSecure();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axiosSecure.get("/getallsessions");
        setSessions(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load session history");
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [axiosSecure]);

  
  const totalVolume = sessions.reduce((sum, session) => sum + session.amount, 0);
  
  const pendingVolume = sessions
    .filter(s => s.status === 'ongoing')
    .reduce((sum, s) => sum + s.amount, 0);

  const ongoingCount = sessions.filter(s => s.status === 'ongoing').length;
  const completedCount = sessions.filter(s => s.status === 'completed').length;

 
  const financeData = [
    { name: 'Total Earnings', value: totalVolume },
    { name: 'Pending Escrow', value: pendingVolume }
  ];


  const statusData = [
    { name: 'Active Escrow', value: ongoingCount },
    { name: 'Completed Payouts', value: completedCount }
  ];

  const COLORS = ['#4f46e5', '#f59e0b']; 

 
  const filteredSessions = sessions.filter(session => {
    if (filter === "all") return true;
    return session.status === filter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      
    
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <p className="text-base-content/60">Overview of platform earnings, transactions, and performance.</p>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat bg-base-100 shadow-md border border-base-200 rounded-xl">
          <div className="stat-figure text-primary">
            <FaMoneyBillWave className="text-3xl" />
          </div>
          <div className="stat-title">Total Volume</div>
          <div className="stat-value text-primary">${totalVolume.toLocaleString()}</div>
          <div className="stat-desc">All time transaction volume</div>
        </div>

        <div className="stat bg-base-100 shadow-md border border-base-200 rounded-xl">
          <div className="stat-figure text-warning">
            <FaClock className="text-3xl" />
          </div>
          <div className="stat-title">Pending Balance</div>
          <div className="stat-value text-warning">${pendingVolume.toLocaleString()}</div>
          <div className="stat-desc">Currently held in Escrow</div>
        </div>

        <div className="stat bg-base-100 shadow-md border border-base-200 rounded-xl">
          <div className="stat-figure text-success">
            <FaCheckCircle className="text-3xl" />
          </div>
          <div className="stat-title">Completed Payouts</div>
          <div className="stat-value text-success">{completedCount}</div>
          <div className="stat-desc">Successfully released funds</div>
        </div>
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
       
        <div className="card bg-base-100 shadow-xl border border-base-200 p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
             <FaMoneyBillWave className="text-primary"/> Financial Overview
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={60} name="Amount ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

       
        <div className="card bg-base-100 shadow-xl border border-base-200 p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
             <FaChalkboardTeacher className="text-warning"/> Session Distribution
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

   
      <div role="tablist" className="tabs tabs-boxed w-fit mb-6 bg-base-200/50 p-1">
        <a 
          role="tab" 
          className={`tab ${filter === 'all' ? 'tab-active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All History
        </a>
        <a 
          role="tab" 
          className={`tab ${filter === 'ongoing' ? 'tab-active' : ''}`}
          onClick={() => setFilter('ongoing')}
        >
          Ongoing (Escrow)
        </a>
        <a 
          role="tab" 
          className={`tab ${filter === 'completed' ? 'tab-active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </div>

      
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200/50 text-base-content/70">
              <tr>
                <th>Transaction ID</th>
                <th>Subject & Class</th>
                <th>Student</th>
                <th>Tutor</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-base-content/50 italic">
                    No sessions found.
                  </td>
                </tr>
              ) : (
                filteredSessions.map((session) => (
                  <tr key={session._id}>
                    <td>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <FaExchangeAlt className="text-base-content/30" />
                        <span className="tooltip tooltip-right" data-tip={session.transactionId}>
                           {session.transactionId?.slice(0, 12)}...
                        </span>
                      </div>
                      <div className="text-[10px] text-base-content/50 mt-1">
                        {new Date(session.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">{session.postId?.subject || "Unknown"}</div>
                      <div className="text-xs opacity-60">{session.postId?.classGrade}</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-8 h-8">
                            <img src={session.studentId?.image || "https://via.placeholder.com/40"} alt="S" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-xs">{session.studentId?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-8 h-8">
                            <img src={session.tutorId?.image || "https://via.placeholder.com/40"} alt="T" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-xs">{session.tutorId?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-bold text-primary">
                      ${session.amount}
                    </td>
                    <td>
                      <span className={`badge badge-sm font-semibold ${
                        session.status === 'completed' 
                          ? 'badge-success text-white' 
                          : 'badge-warning text-base-content'
                      }`}>
                        {session.status === 'completed' ? 'Released' : 'Escrowed'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;

