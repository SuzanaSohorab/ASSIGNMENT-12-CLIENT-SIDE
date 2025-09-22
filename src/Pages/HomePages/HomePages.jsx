import { useState, useEffect } from "react";

import { FaSortAmountDown } from "react-icons/fa";
import Banner from "../../Components/Banner";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByPopularity, setSortByPopularity] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // ✅ Fetch all data (posts, announcements, tags) from backend
  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));

    fetch("http://localhost:5000/announcements")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data));

    fetch("http://localhost:5000/tags")
      .then((res) => res.json())
      .then((data) => setTags(data));
  }, []);

  // ✅ Handle search (backend filtering by tags)
  const handleSearch = async () => {
    if (!searchQuery) return;
    const res = await fetch(`http://localhost:5000/posts/search?tag=${searchQuery}`);
    const data = await res.json();
    setPosts(data);
    setCurrentPage(1); // reset to first page
  };

  // ✅ Sort posts by popularity (UpVote - DownVote)
  const handleSortByPopularity = () => {
    setSortByPopularity(true);
    const sorted = [...posts].sort(
      (a, b) => (b.upVote - b.downVote) - (a.upVote - a.downVote)
    );
    setPosts(sorted);
  };

  // ✅ Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div>
      {/* ✅ Banner with search */}
      <Banner
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {/* ✅ Tags Section */}
      <section className="max-w-6xl mx-auto px-4 my-10">
        <h2 className="text-xl font-bold mb-4">Browse by Tags</h2>
        <div className="flex gap-3 flex-wrap">
          {tags.map((tag) => (
            <button
              key={tag._id}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-blue-500 hover:text-white"
              onClick={() => {
                setSearchQuery(tag.name);
                handleSearch();
              }}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </section>

      {/* ✅ Announcements Section (only if exists) */}
      {announcements.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 my-10 bg-yellow-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Announcements</h2>
          {announcements.map((a) => (
            <div key={a._id} className="border-b py-2">
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-gray-700">{a.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* ✅ Sort by Popularity Button */}
      <div className="max-w-6xl mx-auto px-4 flex justify-end mb-6">
        <button
          onClick={handleSortByPopularity}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <FaSortAmountDown /> Sort by Popularity
        </button>
      </div>

      {/* ✅ Posts Section */}
      <section className="max-w-6xl mx-auto px-4 grid gap-6">
        {currentPosts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-md p-4 rounded-lg border"
          >
            <div className="flex items-center gap-3">
              <img
                src={post.authorImage || "/default-profile.png"}
                alt="author"
                className="w-10 h-10 rounded-full"
              />
              <p className="font-semibold">{post.authorName}</p>
            </div>
            <h3 className="text-xl font-bold mt-2">{post.title}</h3>
            <p className="text-gray-600">{post.description.slice(0, 100)}...</p>
            <div className="flex gap-3 mt-3 text-sm text-gray-600">
              <span>Tags: {post.tag}</span>
              <span>Comments: {post.commentCount || 0}</span>
              <span>Votes: {post.upVote - post.downVote}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ✅ Pagination */}
      <div className="flex justify-center my-10 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
