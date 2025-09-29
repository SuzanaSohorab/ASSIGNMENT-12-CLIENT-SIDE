import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
const Banner = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


const handleSearch = async () => {
  if (!keyword.trim()) return;

  setLoading(true);
  try {
    
    const { data } = await axios.get(
      `http://localhost:5000/posts/search/keyword?keyword=${keyword}`,
     
    );

    console.log("Search result:", data);
    setResults(data);
  } catch (error) {
    console.error("Search error:", error);
  } finally {
    setLoading(false);
  }
};

  

  return (
    <section className="bg-[#2c3e50] text-white py-32 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-2">
        WELCOME TO DEMANDER FORUM
      </h1>
      <p className="text-lg italic mb-8">
        The most popular forum on the internet!
      </p>

      {/* ✅ Search Box */}
      <div className="flex w-full max-w-xl">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search posts by tag (e.g. React, JavaScript)..."
          className="flex-grow px-4 py-3 rounded-l-md text-white focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-[#3498db] px-6 flex items-center justify-center rounded-r-md hover:bg-[#2980b9]"
        >
          <FaSearch className="text-white text-lg" />
        </button>
      </div>

      {/* ✅ Search Results */}
      <div className="mt-8 w-full max-w-3xl text-left">
        {loading ? (
          <p className="text-gray-300 italic">Searching...</p>
        ) : results.length > 0 ? (
          results.map((post) => (
            <div
              key={post._id}
              className="bg-white text-black p-4 rounded-lg shadow mb-4"
            >
              <h2 className="font-bold text-xl">{post.title}</h2>
              <p className="text-sm text-gray-500">
                Tag: {post.tag}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-300 italic">No results found</p>
        )}
      </div>
    </section>
  );
};

export default Banner;
