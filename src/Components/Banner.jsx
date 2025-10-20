import { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion"; // 👈 Import Framer Motion

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
        `https://assignment-12-server-side-gilt.vercel.app/posts/search/keyword?keyword=${searchTerm}`
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
    <section className="relative text-white pt-70 m-5 flex flex-col items-center text-center overflow-hidden min-h-screen">
      {/* 🔹 Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src="/public/videos/1472546_Education_People_3840x2160.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      {/* 🔹 Animated Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        WELCOME TO SUAL FORUM
      </motion.h1>

      {/* 🔹 Animated Paragraph */}
      <motion.p
        className="text-lg text-gray-200 mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        The most popular forum on the internet!
      </motion.p>

      {/* 🔹 Animated Search Bar */}
      <motion.div
        className="flex w-full max-w-2xl bg-white rounded-md shadow-md overflow-hidden mb-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
      >
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
          className="bg-[#456882] px-6 flex items-center justify-center hover:bg-indigo-700"
        >
          <FaSearch className="text-white text-lg" />
        </button>
      </motion.div>

      {/* 🔹 Animated Tags */}
      <motion.div
        className="flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
      >
        <span className="text-gray-200">Tag :</span>
        {tags.map((tag, i) => (
          <motion.button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="px-4 py-2 bg-white/10 hover:bg-white hover:text-indigo-600 text-white rounded-md text-sm transition"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
          >
            {tag}
          </motion.button>
        ))}
      </motion.div>

      {/* 🔹 Search Results */}
      <div className="mt-10 w-full max-w-4xl text-left">
        {loading ? (
          <p className="text-gray-200 italic text-center">🔎 Searching...</p>
        ) : results.length > 0 ? (
          <div className="grid gap-6">
            {results.map((post) => (
              <motion.div
                key={post._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-semibold text-xl text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500">
                  <span className="font-medium mt-2 text-gray-700">Tag:</span>{" "}
                  {post.tag}
                </p>
              </motion.div>
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
