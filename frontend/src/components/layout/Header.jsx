import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "@styles/components/Header.module.css";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const ProfileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const OrdersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemCount = 0;

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      setIsMobileMenuOpen(false);
      showToast("You have been signed out successfully", "success");
      navigate("/");
    } catch (error) {
      showToast("Failed to sign out. Please try again.", "error");
    }
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Get scrollbar width before hiding
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Shop" },
    { path: "/products?category=women", label: "Women" },
    { path: "/products?category=men", label: "Men" },
    { path: "/products?category=accessories", label: "Accessories" },
    { path: "/about", label: "About" },
  ];

  // Check if a nav link is active based on path and query params
  const isLinkActive = (linkPath) => {
    const [pathname, search] = linkPath.split("?");
    const currentPathname = location.pathname;
    const currentSearch = location.search;

    // For home page, exact match
    if (linkPath === "/") {
      return currentPathname === "/" && !currentSearch;
    }

    // For links with query params (category links)
    if (search) {
      return currentPathname === pathname && currentSearch === `?${search}`;
    }

    // For /products without query (Shop link) - only active when no category filter
    if (linkPath === "/products") {
      return currentPathname === "/products" && !currentSearch.includes("category=");
    }

    // For other links, match pathname
    return currentPathname === pathname;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value.trim();
    if (searchQuery) {
      // Chỉ navigate với search param, không giữ category
      // để tìm kiếm trên toàn bộ sản phẩm
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      e.target.reset();
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>FASHION</span>
          <span className={styles.logoAccent}>Store</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`${styles.navLink} ${isLinkActive(link.path) ? styles.active : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Search */}
          <button
            className={styles.iconButton}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
          >
            <SearchIcon />
          </button>

          {/* User Account - with Dropdown for authenticated users */}
          {isAuthenticated ? (
            <div className={styles.userMenuWrapper} ref={userMenuRef}>
              <button
                className={styles.userMenuButton}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
              >
                <div className={styles.userAvatar}>
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.firstName} />
                  ) : (
                    <span>{user?.firstName?.[0]?.toUpperCase() || "U"}</span>
                  )}
                </div>
                <span className={styles.userName}>{user?.firstName || "Account"}</span>
                <ChevronDownIcon />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className={styles.userDropdown}>
                  <div className={styles.dropdownHeader}>
                    <p className={styles.dropdownName}>
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className={styles.dropdownEmail}>{user?.email}</p>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <Link
                    to="/profile"
                    className={styles.dropdownItem}
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <ProfileIcon />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/profile?tab=orders"
                    className={styles.dropdownItem}
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <OrdersIcon />
                    <span>My Orders</span>
                  </Link>
                  <Link
                    to="/profile?tab=wishlist"
                    className={styles.dropdownItem}
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <HeartIcon />
                    <span>Wishlist</span>
                  </Link>
                  <div className={styles.dropdownDivider} />
                  <button className={styles.dropdownItemLogout} onClick={handleLogout}>
                    <LogoutIcon />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className={styles.iconButton} aria-label="Login">
              <UserIcon />
            </Link>
          )}

          {/* Cart */}
          <Link to="/cart" className={styles.cartButton} aria-label="Shopping Cart">
            <CartIcon />
            {cartItemCount > 0 && <span className={styles.cartBadge}>{cartItemCount}</span>}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Search Bar (Expandable) */}
      <div className={`${styles.searchBar} ${isSearchOpen ? styles.searchOpen : ""}`}>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <input
            type="text"
            name="search"
            placeholder="Search for products..."
            className={styles.searchInput}
            autoComplete="off"
          />
          <button type="submit" className={styles.searchSubmit}>
            <SearchIcon />
          </button>
        </form>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`${styles.mobileNavLink} ${
                    isLinkActive(link.path) ? styles.active : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Auth Links */}
          <div className={styles.mobileAuthLinks}>
            {isAuthenticated ? (
              <>
                <div className={styles.mobileUserInfo}>
                  <div className={styles.mobileUserAvatar}>
                    {user?.firstName?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className={styles.mobileUserName}>
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className={styles.mobileUserEmail}>{user?.email}</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className={styles.mobileAuthLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ProfileIcon />
                  <span>My Profile</span>
                </Link>
                <Link
                  to="/profile?tab=orders"
                  className={styles.mobileAuthLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <OrdersIcon />
                  <span>My Orders</span>
                </Link>
                <Link
                  to="/profile?tab=wishlist"
                  className={styles.mobileAuthLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <HeartIcon />
                  <span>Wishlist</span>
                </Link>
                <button
                  className={`${styles.mobileAuthLink} ${styles.logoutLink}`}
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={styles.mobileAuthLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`${styles.mobileAuthLink} ${styles.registerLink}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
