import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-800 text-white shadow z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <Link
          to="/"
          className="font-bold text-xl sm:text-2xl flex items-center"
        >
          <span className="text-cyan-400">&lt;</span>
          <span>Secure</span>
          <span className="text-cyan-400">Bits/&gt;</span>
        </Link>
        <div className="flex space-x-6 text-sm sm:text-base font-medium">
          {["/", "/about", "/contact"].map((path, i) => {
            const label =
              path === "/"
                ? "Home"
                : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <Link
                key={i}
                to={path}
                className="relative text-white hover:text-cyan-400 transition after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-[width] hover:after:w-full"
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
