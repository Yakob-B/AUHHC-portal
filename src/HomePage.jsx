import React, { useState } from "react";
import { Link } from "react-router-dom";
import schoolsData from "./schools.json";
import InteractiveCard from "./components/InteractiveCard";
import AnimatedCounter from "./components/AnimatedCounter";
import ProgressBar from "./components/ProgressBar";
import Tooltip from "./components/Tooltip";

const getAllDepartments = () => {
  const departments = [];
  for (const school of schoolsData) {
    for (const dept of school.departments) {
      departments.push({
        name: dept.name,
        schoolId: school.id,
        departmentId: dept.id,
      });
    }
  }
  return departments;
};

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [selectedStats, setSelectedStats] = useState("departments");
  const allDepartments = getAllDepartments();
  const matches = search.trim()
    ? allDepartments.filter(d => d.name.toLowerCase().includes(search.trim().toLowerCase()))
    : [];

  const totalSchools = schoolsData.length;
  const totalDepartments = allDepartments.length;
  const totalStudents = 15000; // Mock data
  const totalFaculty = 850; // Mock data

  const statsData = {
    departments: { count: totalDepartments, label: "Departments", icon: "🏛️" },
    schools: { count: totalSchools, label: "Schools", icon: "🎓" },
    students: { count: totalStudents, label: "Students", icon: "👥" },
    faculty: { count: totalFaculty, label: "Faculty", icon: "👨‍🏫" }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-gray-800">
      {/* Search Bar */}
      <div className="w-full flex flex-col items-center pt-10 pb-4 relative">
        <Tooltip content="Search for any department across all schools" position="bottom">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search departments..."
            className="w-full max-w-md px-4 py-3 rounded-lg shadow bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
          />
        </Tooltip>
        {/* Dropdown results */}
        {search && matches.length > 0 && (
          <div className="absolute top-full mt-2 w-full max-w-md bg-gray-900 rounded-lg shadow-lg z-10 border border-gray-700">
            {matches.map((dept, idx) => (
              <Link
                key={dept.schoolId + dept.departmentId}
                to={`/schools/${dept.schoolId}/departments/${dept.departmentId}`}
                className="block px-4 py-2 text-white hover:bg-purple-700 transition border-b border-gray-800 last:border-b-0"
                onClick={() => setSearch("")}
              >
                {dept.name}
              </Link>
            ))}
          </div>
        )}
        {search && matches.length === 0 && (
          <div className="absolute top-full mt-2 w-full max-w-md bg-gray-900 rounded-lg shadow-lg z-10 border border-gray-700 px-4 py-2 text-gray-400">
            No departments found.
          </div>
        )}
      </div>

      {/* Interactive Stats Section */}
      <div className="max-w-6xl mx-auto w-full px-8 mb-8">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Hachalu Hundessa Campus Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(statsData).map(([key, data]) => (
            <div
              key={key}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedStats === key ? 'ring-2 ring-purple-500 shadow-lg' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedStats(key)}
            >
              <div className="text-3xl mb-2">{data.icon}</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                <AnimatedCounter end={data.count} />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{data.label}</div>
            </div>
          ))}
        </div>
        
        {/* Progress Bar for Selected Stat */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {statsData[selectedStats].icon} {statsData[selectedStats].label} Overview
          </h4>
          <ProgressBar 
            progress={statsData[selectedStats].count} 
            max={Math.max(...Object.values(statsData).map(d => d.count))}
            variant="purple"
            showLabel={false}
          />
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Current count: <AnimatedCounter end={statsData[selectedStats].count} /> {statsData[selectedStats].label.toLowerCase()}
          </p>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl w-full p-8">
          {/* Interactive Cards */}
          <InteractiveCard
            title="Welcome"
            description="Welcome to the ultimate hub for discovering and understanding various departments and career paths. Whether you're a student choosing a major, a job seeker exploring new opportunities, or someone passionate about learning, you're in the right place."
            icon="🎯"
            variant="default"
            onClick={() => console.log('Welcome card clicked')}
          />
          
          <InteractiveCard
            title="What We Offer"
            description="Our platform offers comprehensive information about different departments—from their roles and responsibilities to potential career opportunities. We break down what each field entails, helping you understand its impact, challenges, and growth prospects."
            icon="📚"
            variant="success"
            onClick={() => console.log('What We Offer card clicked')}
          />
          
          <InteractiveCard
            title="Our Mission"
            description="Choosing the right path can be overwhelming, but with the right knowledge, it becomes an exciting journey. Our mission is to guide you through this process by providing clear, reliable insights to help you make informed decisions."
            icon="🌟"
            variant="warning"
            onClick={() => console.log('Our Mission card clicked')}
          />
          
          <InteractiveCard
            title="Your Journey"
            description="Explore detailed profiles of each department, learn about their contributions to various industries, and discover the skills you'll need to thrive in your chosen field. Whether you're planning your future or considering a career switch, we're here to support your journey every step of the way."
            icon="🚀"
            variant="danger"
            onClick={() => console.log('Your Journey card clicked')}
          />
        </div>
      </div>

      {/* Featured Departments Section */}
      <div className="max-w-6xl mx-auto w-full mt-8 px-8">
        <h3 className="text-xl font-bold text-white mb-4">Featured Departments</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {/* Food Process Engineering */}
          <InteractiveCard
            title="Food Process Engineering"
            description="Focuses on the transformation of raw agricultural products into safe, nutritious, and consumable food products using engineering principles."
            icon="🍞"
            variant="default"
            className="text-center"
          >
            <div className="text-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">School of Agricultural and Food Engineering</span>
              <Link to="/schools/school-agri-food/departments/food-process" className="text-purple-600 dark:text-purple-400 hover:underline">View</Link>
            </div>
          </InteractiveCard>

          {/* Architecture */}
          <InteractiveCard
            title="Architecture"
            description="Covers the art and science of designing buildings and structures with aesthetics, functionality, and sustainability in mind."
            icon="🏛️"
            variant="success"
            className="text-center"
          >
            <div className="text-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">School of Architecture and Urban Planning</span>
              <Link to="/schools/school-arch-plan/departments/architecture" className="text-purple-600 dark:text-purple-400 hover:underline">View</Link>
            </div>
          </InteractiveCard>

          {/* Civil Engineering */}
          <InteractiveCard
            title="Civil Engineering"
            description="Involves designing, constructing, and maintaining infrastructure projects like roads, bridges, and buildings."
            icon="🏗️"
            variant="warning"
            className="text-center"
          >
            <div className="text-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">School of Civil and Environmental Engineering</span>
              <Link to="/schools/school-civil-env/departments/civil" className="text-purple-600 dark:text-purple-400 hover:underline">View</Link>
            </div>
          </InteractiveCard>

          {/* Computer Science */}
          <InteractiveCard
            title="Computer Science"
            description="The CS Department is a hub for technological advancement, focusing on programming, cybersecurity, and problem-solving."
            icon="💻"
            variant="danger"
            className="text-center"
          >
            <div className="text-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">School of Informatics and Electrical Engineering</span>
              <Link to="/schools/school-informatics-electrical/departments/cs" className="text-purple-600 dark:text-purple-400 hover:underline">View</Link>
            </div>
          </InteractiveCard>

          {/* Mechanical Engineering */}
          <InteractiveCard
            title="Mechanical Engineering"
            description="Applies engineering principles to design, analyze, and manufacture mechanical systems."
            icon="⚙️"
            variant="default"
            className="text-center"
          >
            <div className="text-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">School of Mechanical and Industrial Engineering</span>
              <Link to="/schools/school-mech-industrial/departments/mechanical" className="text-purple-600 dark:text-purple-400 hover:underline">View</Link>
            </div>
          </InteractiveCard>
        </div>
      </div>

      {/* Getting Started Guide Section */}
      <div className="max-w-3xl mx-auto w-full mt-12 px-8">
        <h3 className="text-xl font-bold text-white mb-4">Getting Started Guide</h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="space-y-4">
            {[
              { step: 1, title: "Search or Browse Departments", desc: "Use the search bar or explore the list of schools and departments." },
              { step: 2, title: "Read Department Details", desc: "Learn about each department's focus, career paths, and requirements." },
              { step: 3, title: "Check Announcements", desc: "Stay updated with the latest news and events." },
              { step: 4, title: "Contact Support", desc: "Reach out if you have questions or need guidance." }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ/Help Section */}
      <div className="max-w-3xl mx-auto w-full mt-12 px-8 mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="space-y-4">
            {[
              { q: "How do I find a department?", a: "Use the search bar at the top or browse through the list of schools and departments." },
              { q: "Where can I see career opportunities for each department?", a: "Visit the department's detail page to view career paths and opportunities." },
              { q: "How do I contact support?", a: "Use the contact information at the bottom of the page or the support card." },
              { q: "Can I switch departments later?", a: "Yes, you can explore and switch departments as your interests evolve." }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                <p className="font-semibold text-purple-600 dark:text-purple-400 mb-1">{faq.q}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 text-center py-8 mt-8 w-full">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-white mb-2">Ambo University Portal</h4>
              <p className="text-sm">Discover your academic path and career opportunities</p>
            </div>
            <div className="flex space-x-4">
              <Tooltip content="Follow us on Facebook" position="top">
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </Tooltip>
              <Tooltip content="Follow us on Twitter" position="top">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200" aria-label="Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </Tooltip>
              <Tooltip content="Connect with us on LinkedIn" position="top">
                <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors duration-200" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </Tooltip>
              <Tooltip content="Follow us on Instagram" position="top">
                <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-200" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244z"/>
                  </svg>
                </a>
              </Tooltip>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <p>&copy; {new Date().getFullYear()} Ambo University Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;