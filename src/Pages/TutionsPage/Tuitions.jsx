import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import TuitionCard from "./TuitionCard/TuitionCard.jsx"; // Import the card component

const Tuitions = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Logic States
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest', 'asc', 'desc'

  // Pagination States
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

  // --- 1. FILTER LOGIC (Subject Only) ---
  const filteredPosts = posts.filter((post) => {
    if (!searchTerm) return true;
    return post.subject.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // --- 2. SORT LOGIC ---
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOrder === "asc") {
      return a.budget - b.budget; // Low to High
    } else if (sortOrder === "desc") {
      return b.budget - a.budget; // High to Low
    }
    return 0;
  });

  // --- 3. PAGINATION LOGIC ---
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-10 px-5 md:px-20 mt-16">
      
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Available Tuitions</h1>
        <p className="text-base-content/60">Find the perfect tuition job.</p>
      </div>

      {/* CONTROLS ROW (Search + Sort) */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 max-w-5xl mx-auto">
        
        {/* Search Bar */}
        <div className="join w-full md:max-w-md shadow-sm">
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="Search by subject..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className="btn btn-primary join-item">
            <FaSearch />
          </button>
        </div>

        {/* Sort Dropdown */}
        <select 
            className="select select-bordered w-full md:w-auto shadow-sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
        >
            <option value="newest">Newest First</option>
            <option value="desc">Budget: High to Low</option>
            <option value="asc">Budget: Low to High</option>
        </select>
      </div>

      {/* NO DATA STATE */}
      {sortedPosts.length === 0 && (
        <div className="text-center py-20 bg-base-200 rounded-xl">
          <h3 className="text-xl font-semibold">No tuitions found.</h3>
          <p className="text-base-content/60">Try adjusting your search.</p>
        </div>
      )}

      {/* JOB GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {currentPosts.map((post) => (
            <TuitionCard key={post._id} post={post} />
        ))}
      </div>

      {/* PAGINATION CONTROLS */}
      {sortedPosts.length > postsPerPage && (
        <div className="flex justify-center mt-12">
          <div className="join">
            <button
              className="join-item btn"
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              «
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`join-item btn ${
                  currentPage === index + 1 ? "btn-active" : ""
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="join-item btn"
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tuitions;