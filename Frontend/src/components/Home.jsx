import Hero from "../home/Hero";
import Trending from "../Home/Trending";
import Devotional from "../Home/Devotional";
import Creator from "../Home/Creator";

function Home() {
  return (
    <div className="bg-gray-100 text-gray-800">
      <div className="max-w-screen-xl mx-auto">
        <Hero />
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12">
        <Trending />
      </div>
      <div className="bg-white text-gray-900 py-12">
        <Devotional />
      </div>
      <div className="bg-gray-900 text-white py-12">
        <Creator />
      </div>
    </div>
  );
}

export default Home;
