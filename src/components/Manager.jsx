import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [revealedPasswords, setRevealedPasswords] = useState([]); // track which passwords are visible

  // --- Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("passwords");
    if (stored) setPasswordArray(JSON.parse(stored));
  }, []);

  // --- Password strength checker
  useEffect(() => {
    const pwd = form.password;
    if (!pwd) setPasswordStrength("");
    else if (pwd.length < 6) setPasswordStrength("Weak");
    else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(pwd))
      setPasswordStrength("Strong");
    else setPasswordStrength("Medium");
  }, [form.password]);

  // --- Utility toast
  const notify = (msg, type = "success") =>
    toast(msg, {
      type,
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });

  // --- Copy text to clipboard
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    notify("Copied to clipboard!");
  };

  // --- Toggle show password input
  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };

  // --- Save password
  const savePassword = () => {
    const { site, username, password } = form;
    if (!site.trim() || !username.trim() || !password.trim()) {
      notify("Please fill out all fields!", "error");
      return;
    }
    if (!/^https?:\/\//.test(site)) {
      notify("Please include http:// or https:// in the website URL!", "error");
      return;
    }
    const newPassword = { ...form, id: uuidv4() };
    const updated = [...passwordArray, newPassword];
    setPasswordArray(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
    setForm({ site: "", username: "", password: "" });
    setPasswordStrength("");
    notify("Password saved!");
  };

  // --- Delete password
  const deletePassword = (id) => {
    const confirmed = window.confirm(
      "Do you really want to delete this password?"
    );
    if (confirmed) {
      const filtered = passwordArray.filter((item) => item.id !== id);
      setPasswordArray(filtered);
      localStorage.setItem("passwords", JSON.stringify(filtered));
      notify("Password deleted!");
    }
  };

  // --- Edit password
  const editPassword = (id) => {
    const target = passwordArray.find((item) => item.id === id);
    if (target) {
      setForm(target);
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
    }
  };

  // --- Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- Toggle reveal in table
  const toggleReveal = (id) => {
    setRevealedPasswords((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <>
      <ToastContainer theme="light" />
      <div className="pt-24 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto min-h-[88.2vh]">
        {/* --- Header --- */}
        <h1 className="text-4xl font-bold text-center transition-all duration-300 hover:scale-105">
          <span className="text-cyan-500"> &lt;</span>Secure
          <span className="text-cyan-500">Bits/&gt;</span>
        </h1>
        <p className="text-cyan-900 text-lg text-center pt-2 max-w-2xl mx-auto">
          Secure Bits is a lightweight, privacy-first password manager. Store,
          manage, and protect your credentials securely—all locally.
        </p>

        {/* --- Form --- */}
        <div className="flex flex-col p-4 text-black gap-8 items-center mt-8 animate-fadeIn">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL (with http/https)"
            className="rounded-full border border-cyan-500 w-full p-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none transition-all duration-200"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-cyan-500 w-full p-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none transition-all duration-200"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative w-full md:w-[48%]">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-cyan-500 w-full p-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none transition-all duration-200"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1 transition-transform duration-200 hover:scale-110"
                  width={26}
                  src="icons/eye.png"
                  alt="Toggle visibility"
                />
              </span>
            </div>
          </div>

          {/* --- Password Strength Indicator --- */}
          {passwordStrength && (
            <p
              className={`text-sm font-medium -mt-4 ${
                passwordStrength === "Strong"
                  ? "text-green-600"
                  : passwordStrength === "Medium"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              Strength: {passwordStrength}
            </p>
          )}

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-cyan-400 hover:bg-cyan-300 transition-all duration-200 rounded-full px-8 py-2 w-fit border border-cyan-900 hover:scale-105 shadow-md"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        {/* --- Password Table --- */}
        <div className="passwords animate-fadeIn">
          <h2 className="font-bold text-2xl py-4 text-center md:text-left">
            Your Passwords
          </h2>
          {passwordArray.length === 0 ? (
            <div className="text-center text-gray-600 italic">
              No passwords to show
            </div>
          ) : (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10 shadow-md">
              <thead className="bg-cyan-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-cyan-100">
                {passwordArray.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-cyan-200 transition-all duration-200"
                  >
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-800 hover:underline"
                        >
                          {item.site}
                        </a>
                        <div
                          className="cursor-pointer"
                          onClick={() => copyText(item.site)}
                          title="Copy site URL"
                        >
                          <lord-icon
                            style={{ width: "25px", height: "25px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span>{item.username}</span>
                        <div
                          className="cursor-pointer"
                          onClick={() => copyText(item.username)}
                          title="Copy username"
                        >
                          <lord-icon
                            style={{ width: "25px", height: "25px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span>
                          {revealedPasswords.includes(item.id)
                            ? item.password
                            : "•".repeat(item.password.length)}
                        </span>
                        <img
                          src={
                            revealedPasswords.includes(item.id)
                              ? "icons/eyecross.png"
                              : "icons/eye.png"
                          }
                          alt="Toggle password visibility"
                          width={22}
                          className="cursor-pointer transition-transform duration-200 hover:scale-110"
                          onClick={() => toggleReveal(item.id)}
                        />
                        <div
                          className="cursor-pointer"
                          onClick={() => copyText(item.password)}
                          title="Copy password"
                        >
                          <lord-icon
                            style={{ width: "25px", height: "25px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <span
                        className="cursor-pointer mx-1"
                        onClick={() => editPassword(item.id)}
                        title="Edit"
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/exymduqj.json"
                          trigger="hover"
                          stroke="bold"
                          state="hover-line"
                          colors="primary:#121331,secondary:#66a1ee"
                          style={{ width: "30px", height: "30px" }}
                        ></lord-icon>
                      </span>
                      <span
                        className="cursor-pointer mx-1"
                        onClick={() => deletePassword(item.id)}
                        title="Delete"
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/exkbusmy.json"
                          trigger="hover"
                          colors="primary:#ff0000"
                          style={{ width: "30px", height: "30px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* --- Tailwind Animation Classes --- */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Manager;
