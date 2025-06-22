import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState("");

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  useEffect(() => {
    const pwd = form.password;
    if (!pwd) {
      setPasswordStrength("");
    } else if (pwd.length < 6) {
      setPasswordStrength("Weak");
    } else if (
      pwd.length >= 6 &&
      /[a-z]/.test(pwd) &&
      /[A-Z]/.test(pwd) &&
      /\d/.test(pwd) &&
      /[\W_]/.test(pwd)
    ) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium");
    }
  }, [form.password]);

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      const newPassword = { ...form, id: uuidv4() };
      const updatedPasswords = [...passwordArray, newPassword];

      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));

      setform({ site: "", username: "", password: "" });

      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error: Password not saved!");
    }
  };

  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      const filtered = passwordArray.filter((item) => item.id !== id);
      setPasswordArray(filtered);
      localStorage.setItem("passwords", JSON.stringify(filtered));
      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer theme="light" />
      <div className="pt-24 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto min-h-[88.2vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-cyan-500"> &lt;</span>Secure
          <span className="text-cyan-500">Bits/&gt;</span>
        </h1>
        <p className="text-cyan-900 text-lg text-center pt-2">
          Secure Bits is a lightweight, secure, and privacy-first password
          manager. It helps you store, manage, and protect your credentials with
          ease. Enjoy features like auto-copy, visibility toggling, and security
          checks—all locally and privately.
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center mt-8">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-cyan-500 w-full p-4 py-1 min-h-[44px]"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-cyan-500 w-full p-4 py-1 min-h-[44px]"
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
                className="rounded-full border border-cyan-500 w-full p-4 py-1 min-h-[44px]"
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
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="Toggle visibility"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-cyan-400 hover:bg-cyan-300 rounded-full px-8 py-2 w-fit border border-cyan-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-cyan-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-cyan-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center gap-2">
                          <a href={item.site} target="_blank" rel="noreferrer">
                            {item.site}
                          </a>
                          <div
                            className="cursor-pointer"
                            onClick={() => copyText(item.site)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                              }}
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
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span>{"*".repeat(item.password.length)}</span>{" "}
                          {/* Show asterisks matching password length */}
                          <div
                            className="cursor-pointer"
                            onClick={() => copyText(item.password)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="justify-center py-2 border border-white text-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => editPassword(item.id)}
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
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
