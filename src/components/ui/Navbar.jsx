
import React, { useState } from "react";
import { ShoppingBag, Menu, Search } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore"; // Adjust the import path
import { Link, useNavigate } from "react-router-dom";
import NikeLogo from "../../assets/favicon.ico";


const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  href,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full transition-colors";
  const variantStyles = {
    default: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-100 text-gray-600 hover:bg-gray-200",
    outline: "bg-transparent border border-gray-300 hover:bg-gray-100",
  };
  const sizeStyles = {
    default: "px-4 py-2 text-sm",
    icon: "w-10 h-10 p-2",
    sm: "px-3 py-1 text-xs",
  };
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link to={href} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

const Navbar = () => {
  const { token, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-4">
        {/* Logo and Navigation Links */}
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <img src={NikeLogo} alt="Nike Logo - Homepage" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/products" className="hover:text-gray-600 transition-colors">
              Products
            </Link>
            <Link to="/men" className="hover:text-gray-600 transition-colors">
              Men
            </Link>
            <Link to="/women" className="hover:text-gray-600 transition-colors">
              Women
            </Link>
            <Link to="/kids" className="hover:text-gray-600 transition-colors">
              Kids
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full focus-within:ring focus-within:ring-gray-300">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="bg-transparent outline-none placeholder:text-gray-500 text-sm w-32"
              aria-label="Search for products"
            />
          </div>

          {/* Login Section */}
          <div className="flex items-center gap-4">
            {token ? (
              <>
                <Button variant="secondary" onClick={handleLogout}>
                  Logout
                </Button>
                <Button variant="default" href="/profile">
                  My Profile
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" onClick={() => navigate("/register")}>
                  Join Us
                </Button>
                <Button variant="default" onClick={() => navigate("/login")}>
                  Login
                </Button>
              </>
            )}
          </div>

          {/* Cart Button */}
          <Button
            variant="outline"
            size="icon"
            aria-label="View Cart"
            onClick={() => navigate("/cart")}
          >
            <ShoppingBag className="w-5 h-5" />
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
          <nav className="flex flex-col items-start p-4 gap-4">
            <Link to="/products" className="hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link to="/men" className="hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              Men
            </Link>
            <Link to="/women" className="hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              Women
            </Link>
            <Link to="/kids" className="hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              Kids
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
