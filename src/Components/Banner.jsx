import { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const tags = ["React", "Javascript", "MongoDB", "Node.js"];

const Banner = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchTerm = keyword) => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/posts/search/keyword?keyword=${searchTerm}`
      );
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTagClick = (tag) => {
    setKeyword(tag);
    handleSearch(tag);
  };

  return (
    <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-20 flex flex-col items-center text-center relative">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
       WELCOME TO SUAL FORUM
      </h1>
      <p className="text-lg text-gray-200 mb-8">
        The most popular forum on the internet!
      </p>

      {/* Search Bar */}
      <div className="flex w-full max-w-2xl bg-white rounded-md shadow-md overflow-hidden mb-6">
       
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search keyword"
          className="flex-grow px-4 py-3 text-black focus:outline-none"
        />
        <button
          onClick={() => handleSearch()}
          className="bg-indigo-600 px-6 flex items-center justify-center hover:bg-indigo-700"
        >
          <FaSearch className="text-white text-lg" />
        </button>
      </div>

      {/* Popular Tags */}
      <div className="flex flex-wrap justify-center gap-3">
        <span className="text-gray-200">Tag :</span>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="px-4 py-2 bg-white/10 hover:bg-white hover:text-indigo-600 text-white rounded-md text-sm transition"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Search Results */}
      <div className="mt-10 w-full max-w-4xl text-left">
        {loading ? (
          <p className="text-gray-200 italic text-center">🔎 Searching...</p>
        ) : results.length > 0 ? (
          <div className="grid gap-6">
            {results.map((post) => (
              <div
                key={post._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border"
              >
                <h2 className="font-semibold text-xl text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 ">
                  <span className="font-medium mt-2 text-gray-700">Tag:</span>{" "}
                  {post.tag}
                </p>
              </div>
            ))}
          </div>
        ) : (
          keyword && (
            <p className="text-gray-200 italic text-center">
              ⚠️ No results found
            </p>
          )
        )}
      </div>
    </section>
  );
};

export default Banner;
