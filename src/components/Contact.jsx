import React from "react";

const Contact = () => {
  return (
    <div className="min-h-[88vh] pt-20 px-6 sm:px-10 flex flex-col items-center text-center pb-2">
      <h1 className="text-4xl sm:text-5xl font-bold text-cyan-600 mb-6">Contact Us</h1>
      <p className="text-gray-700 text-lg max-w-2xl mb-10">
        Have questions, feedback, or want to contribute to <span className="font-semibold text-cyan-700">SecureBits</span>? We'd love to hear from you!
      </p>

      <form
        className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md border border-cyan-100 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Form submitted! (You can hook this to Formspree or similar)");
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-6 rounded-full transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
