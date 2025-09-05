import { FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="bg-[#2c3e50] text-white py-32 flex flex-col items-center justify-center text-center">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mb-2">
        WELCOME TO DEMANDER FORUM
      </h1>
      {/* Subtitle */}
      <p className="text-lg italic mb-8">
        The most popular forum on the internet!
      </p>

      {/* Search Box */}
      <div className="flex w-full max-w-xl">
        <input
          type="text"
          placeholder="Enter a keyword..."
          className="flex-grow px-4 py-3 rounded-l-md text-gray-800 focus:outline-none"
        />
        <button className="bg-[#3498db] px-6 flex items-center justify-center rounded-r-md hover:bg-[#2980b9]">
          <FaSearch className="text-white text-lg" />
        </button>
      </div>
    </section>
  );
};

export default Banner;
