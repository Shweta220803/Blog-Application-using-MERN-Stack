function About() {
  return (
    <div className="container mx-auto my-12 p-6 space-y-12">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 border-b-4 border-blue-600 pb-2">
        About
      </h1>

      <section className="space-y-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          Hello! Welcome to my Blog application.{" "}
          <strong className="text-blue-800 font-semibold">I am Shweta Bharti</strong>, 
          a passionate Full-Stack Developer with expertise in both front-end and back-end technologies. 
          I am committed to learning new technologies and inspiring others to achieve their dreams. 
          My work reflects my drive to create dynamic, responsive, and user-friendly web applications.
        </p>
        <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600">
          "Technology is best when it brings people together." — Matt Mullenweg
        </blockquote>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-blue-800">Technical Expertise</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong className="text-gray-800">Front-End:</strong> Proficient in React.js, JavaScript, with expertise in HTML5, CSS3, Bootstrap, Tailwind CSS and responsive design to craft visually appealing interfaces.
          </li>
          <li>
            <strong className="text-gray-800">Back-End:</strong> Skilled in server-side technologies like Node.js and Express.js, along with database management using MySQL and MongoDB.
          </li>
          <li>
            <strong className="text-gray-800">Programming Languages:</strong> Experienced in Java, C++, C .
          </li>
          <li>
            <strong className="text-gray-800">Professional Growth:</strong> Completed internships and training in Java, SQL, and React, building robust expertise in software development.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-blue-800">Professional Highlights</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            Developed and deployed multiple full-stack applications, showcasing exceptional problem-solving and attention to detail.
          </li>
          <li>
            Worked with cross-functional teams to deliver high-quality software solutions within tight deadlines.
          </li>
          <li>
            Continuously learning and adapting to the latest technologies to stay competitive in the tech landscape.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-blue-800">
          Achievements and Personal Interests
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          I take pride in my academic achievements, including securing the 
          <strong className="text-gray-800"> 2nd rank at the state level</strong> during my diploma in 2022 and 
          <strong className="text-gray-800"> 1st rank at the institute level</strong> for two consecutive years. These milestones reflect my dedication and hard work.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Outside of academics, I am passionate about software development, working on real-world solutions, and engaging in creative pursuits like blogging and teaching. Sharing knowledge and motivating others is a key part of my journey.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg shadow-lg">
          <p className="text-lg text-gray-800">
            If you'd like to collaborate on projects or share your thoughts, feel free to connect with me. Together, we can create innovative solutions and make a difference!
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
