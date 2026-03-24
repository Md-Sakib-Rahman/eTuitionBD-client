import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaSlidersH, FaSortAmountDown, FaInbox, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TuitionCard from "./TuitionCard/TuitionCard";
import LoadingSpinner from "../../Components/GlobalLoader";

const Tuitions = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/all-posts`);
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (!searchTerm) return true;
    return post.subject.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOrder === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === "asc") return a.budget - b.budget;
    if (sortOrder === "desc") return b.budget - a.budget;
    return 0;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-base-100 py-20 px-6 lg:px-12 mt-10 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-16 text-left">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            Marketplace
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-black text-base-content tracking-tighter mb-4"
          >
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Opportunities.</span>
          </motion.h1>
          <p className="text-base-content/50 max-w-lg font-medium">
            Browse through verified tuition posts and find the perfect match for your expertise. 
            Showing <span className="text-base-content font-bold">{sortedPosts.length}</span> active tuitions.
          </p>
        </header>

        {/* Filter & Search Bar - Dashboard Style */}
        <div className="bg-base-200/50 backdrop-blur-md border border-white/5 p-4 rounded-2xl mb-12 flex flex-col md:flex-row items-center gap-4 shadow">
          
          {/* Search Input Container */}
          <div className="relative w-full">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 text-sm" />
            <input
              type="text"
              placeholder="Search by subject (e.g. Physics, IELTS)..."
              className="input bg-base-100 border-white/10 focus:border-primary focus:outline-none w-full pl-12 rounded-xl text-sm font-medium transition-all"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="p-3 bg-base-100 border border-white/10 rounded-xl text-primary">
              <FaSortAmountDown className="text-sm" />
            </div>
            <select 
              className="select bg-base-100 border-white/10 focus:border-primary focus:outline-none w-full md:w-56 rounded-xl text-xs font-black uppercase tracking-widest"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Latest Posts</option>
              <option value="desc">Budget: High to Low</option>
              <option value="asc">Budget: Low to High</option>
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        <AnimatePresence mode="wait">
          {sortedPosts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-base-200/30 rounded-3xl border border-dashed border-white/10"
            >
              <div className="bg-base-300 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-500">
                <FaInbox className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-base-content">No Match Found</h3>
              <p className="text-base-content/40 text-sm max-w-xs mx-auto mt-2 font-medium">
                We couldn't find any tuitions matching "{searchTerm}". Try broadening your search terms.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key={currentPage + searchTerm + sortOrder}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentPosts.map((post) => (
                <TuitionCard key={post._id} post={post} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination Section */}
        {sortedPosts.length > postsPerPage && (
          <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <p className="text-[10px] uppercase font-black text-base-content/30 tracking-[0.3em]">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="btn btn-square btn-outline border-white/10 hover:bg-primary hover:border-primary disabled:opacity-20"
              >
                <FaChevronLeft className="text-xs" />
              </button>

              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 rounded-lg text-xs font-black transition-all duration-300
                      ${currentPage === index + 1 
                        ? "bg-primary text-white shadow-[0_0_20px_rgba(var(--color-primary),0.4)]" 
                        : "bg-base-200 text-base-content/60 hover:bg-base-300 border border-white/5"}`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="btn btn-square btn-outline border-white/10 hover:bg-primary hover:border-primary disabled:opacity-20"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tuitions;