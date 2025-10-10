"use client";

import { motion } from 'framer-motion';
import { BsGithub, BsLinkedin, BsEnvelope, BsRocket, BsLightbulb, BsCode, BsShieldCheck } from 'react-icons/bs';

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Yash Kavaiya",
      role: "DevOps Engineer & AI Specialist",
      image: "/Images/yash.jpg", // You can replace with actual image path
      bio: "Passionate about automating infrastructure and leveraging AI to solve complex DevOps challenges.",
      skills: ["Cloud Infrastructure", "CI/CD", "AI/ML", "Container Orchestration"],
      github: "https://github.com/Yash-Kavaiya",
      linkedin: "#",
      email: "yash@example.com"
    },
    {
      name: "Sonigra Chetan",
      role: "DevOps Engineer & Security Specialist",
      image: "/Images/chetan.jpg", // You can replace with actual image path
      bio: "Focused on building secure, scalable systems and implementing best practices in DevOps workflows.",
      skills: ["Security Scanning", "Performance Monitoring", "Load Testing", "Incident Response"],
      github: "#",
      linkedin: "#",
      email: "chetan@example.com"
    }
  ];

  const values = [
    {
      icon: <BsRocket size={32} />,
      title: "Innovation",
      description: "Constantly exploring new AI technologies to enhance DevOps practices"
    },
    {
      icon: <BsLightbulb size={32} />,
      title: "Automation",
      description: "Automating repetitive tasks to increase efficiency and reduce human error"
    },
    {
      icon: <BsCode size={32} />,
      title: "Excellence",
      description: "Delivering high-quality solutions with attention to detail"
    },
    {
      icon: <BsShieldCheck size={32} />,
      title: "Security",
      description: "Prioritizing security in every aspect of our DevOps workflows"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500">
            About Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a team of passionate DevOps engineers dedicated to revolutionizing operations through AI-powered automation and intelligent workflows.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 rounded-2xl p-8 mb-16 border border-indigo-100"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            To empower development teams with cutting-edge AI agents that streamline DevOps processes, 
            enhance security, and improve operational efficiency. We believe in the power of automation 
            to transform how software is built, deployed, and maintained.
          </p>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="text-indigo-600 mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border border-gray-100"
              >
                <div className="bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 h-32"></div>
                <div className="p-8 -mt-16">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-white shadow-lg bg-gradient-to-r from-indigo-100 to-blue-100 flex items-center justify-center">
                    <span className="text-5xl font-bold text-indigo-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-indigo-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 mb-6">{member.bio}</p>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 text-sm rounded-full border border-indigo-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex justify-center gap-4">
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gray-100 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-500 hover:text-white text-gray-600 transition-all"
                      >
                        <BsGithub size={20} />
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gray-100 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-500 hover:text-white text-gray-600 transition-all"
                      >
                        <BsLinkedin size={20} />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="p-3 rounded-full bg-gray-100 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-500 hover:text-white text-gray-600 transition-all"
                      >
                        <BsEnvelope size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Let's Build Something Amazing Together</h2>
          <p className="text-lg mb-6 opacity-90">
            Interested in collaborating or learning more about our AI-powered DevOps solutions?
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Get in Touch
          </button>
        </motion.div>
      </div>
    </div>
  );
}
