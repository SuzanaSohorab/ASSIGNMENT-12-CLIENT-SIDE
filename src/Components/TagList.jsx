import React from "react";

const tags = [
  "React",
  "Javascript",
  "MongoDB",
  "Node.js",

];

const TagList = ({ onTagClick }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Tags</h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className="px-4 py-2 bg-gray-100 hover:bg-blue-500 hover:text-white text-gray-700 rounded-lg text-sm transition"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagList;
