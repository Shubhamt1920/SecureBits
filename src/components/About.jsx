import React from "react";

const About = () => {
  const features = [
    {
      title: "🔐 Secure Storage",
      desc: "We use local storage to keep your data safe and private on your own device.",
    },
    {
      title: "⚡ Lightning Fast",
      desc: "Instant password management with a clean, responsive UI built in React.",
    },
    {
      title: "🧠 Easy to Use",
      desc: "Minimal design with powerful features. Anyone can use it without tech know-how.",
    },
    {
      title: "🆓 100% Free",
      desc: "No signups. No subscriptions. Just install and start managing your passwords!",
    },
  ];

  const techStack = [
    { name: "HTML", emoji: "📄", color: "text-orange-600" },
    { name: "CSS", emoji: "🎨", color: "text-blue-600" },
    { name: "JavaScript", emoji: "📜", color: "text-yellow-500" },
    { name: "React", emoji: "⚛️", color: "text-cyan-600" },
    { name: "Tailwind", emoji: "💨", color: "text-sky-500" },
  ];

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-8 md:px-12 lg:px-20 text-center text-neutral-800">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        About <span className="text-cyan-600">SecureBits</span>
      </h1>
      <p className="text-lg sm:text-xl mb-10 text-gray-700">
        Your minimalist, private, and fast password manager built for everyone
        🛡️
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {features.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl shadow-md border border-gray-200 bg-white bg-opacity-90 hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 max-w-3xl mx-auto text-left">
        <h2 className="text-3xl font-bold mb-4 text-cyan-700">
          🌟 Our Mission
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          At <span className="font-semibold text-cyan-600">SecureBits</span>, we
          believe that password managers should be simple, secure, and
          accessible to everyone. That's why we've built a tool that works{" "}
          <strong>without internet access</strong>, stores your data locally,
          and offers an elegant, intuitive interface.
        </p>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Whether you're a student, developer, or someone who just wants their
          passwords organized, SecureBits is for you. 💙
        </p>
      </div>

      <div className="mt-20 max-w-3xl mx-auto text-center pb-8">
        <h2 className="text-3xl font-bold mb-6 text-cyan-700">🧰 Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center px-4 py-3 rounded-xl border border-gray-200 bg-white bg-opacity-90 shadow hover:scale-105 transition-transform duration-300"
            >
              <span className={`text-3xl ${tech.color}`}>{tech.emoji}</span>
              <span className="mt-2 font-medium text-lg">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
