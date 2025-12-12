import React, { useEffect, useState } from "react";
import { FaWallet, FaBriefcase, FaFileContract, FaChartLine, FaChartPie } from "react-icons/fa"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";
import toast from "react-hot-toast";

const TutorReport = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosSecure.get("/tutor/analytics");
        setStats(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [axiosSecure]);

  const COLORS = ['#FFBB28', '#10B981', '#EF4444']; 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!stats) return <div className="text-center p-10">No data available.</div>;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FaChartPie className="text-primary"/> Tutor Analytics
        </h1>
        <p className="text-base-content/60">Track your earnings and application success rate.</p>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <div className="stat bg-base-100 shadow-md border border-base-200 rounded-xl overflow-hidden">
          <div className="stat-figure text-success">
            <FaWallet className="text-3xl" />
          </div>
          <div className="stat-title">Total Earnings</div>
          <div className="stat-value text-success text-2xl md:text-3xl">${stats.totalEarnings}</div>
          <div className="stat-desc truncate">Withdrawn to wallet</div>
        </div>

        <div className="stat bg-base-100 shadow-md border border-base-200 rounded-xl overflow-hidden">
          <div className="stat-figure text-warning">
            <FaFileContract className="text-3xl" />
          </div>
          <div className="stat-title">Pending Balance</div>
          <div className="stat-value text-warning text-2xl md:text-3xl">${stats.pendingBalance}</div>
          <div className="stat-desc truncate">Held in Escrow</div>
        </div>

        <div className="stat bg-base-100 shadow-md border border-base-200 rounded-xl overflow-hidden">
          <div className="stat-figure text-primary">
            <FaBriefcase className="text-3xl" />
          </div>
          <div className="stat-title">Active Jobs</div>
          <div className="stat-value text-primary text-2xl md:text-3xl">{stats.totalJobs}</div>
          <div className="stat-desc truncate">Ongoing & Completed</div>
        </div>

        <div className="stat bg-base-100 shadow-md border border-base-200 rounded-xl overflow-hidden">
          <div className="stat-title">Total Applications</div>
          <div className="stat-value text-base-content text-2xl md:text-3xl">{stats.totalApplications}</div>
          <div className="stat-desc truncate">Jobs you applied for</div>
        </div>

      </div>

    
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        
        <div className="card bg-base-100 shadow-xl border border-base-200 p-6">
          <h2 className="text-xl font-bold mb-6">Recent Earnings by Subject</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.earningsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="subject" tick={{fontSize: 12}} interval={0} />
                <YAxis />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px' }}
                />
                <Bar 
                  dataKey="amount" 
                  fill="#10B981" 
                  radius={[4, 4, 0, 0]} 
                  barSize={50} 
                  name="Earned ($)" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

       
        <div className="card bg-base-100 shadow-xl border border-base-200 p-6">
          <h2 className="text-xl font-bold mb-6">Application Success Rate</h2>
          <div className="h-[300px] w-full flex justify-center">
            {stats.totalApplications === 0 ? (
                <div className="flex items-center justify-center text-base-content/40 italic">
                    No applications sent yet
                </div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={stats.applicationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                    >
                    {stats.applicationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" iconType="circle" />
                </PieChart>
                </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TutorReport;