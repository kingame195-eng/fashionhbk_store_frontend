import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import styles from "./Login.module.css";

// Icons
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className={styles.spinner} width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading: authLoading, clearError } = useAuth();
  const { showToast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Clear auth errors on unmount
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  // Validation functions
  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Please enter your email address";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address (e.g., name@example.com)";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Please enter your password";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle blur for real-time validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (result.success) {
        showToast("Welcome back! You have successfully logged in.", "success");
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        // Handle specific error messages based on error codes
        let errorMessage =
          result.error || "Unable to login. Please check your information and try again.";

        // Map error codes to user-friendly messages (if backend returns English messages)
        if (result.error?.includes("incorrect") || result.error?.includes("INVALID_CREDENTIALS")) {
          errorMessage = "Email or password is incorrect. Please try again.";
        } else if (
          result.error?.includes("suspended") ||
          result.error?.includes("ACCOUNT_SUSPENDED") ||
          result.error?.includes("ACCOUNT_DEACTIVATED")
        ) {
          errorMessage = "Your account has been suspended. Please contact support.";
        } else if (
          result.error?.includes("expired") ||
          result.error?.includes("SESSION_EXPIRED") ||
          result.error?.includes("TOKEN_EXPIRED")
        ) {
          errorMessage = "Session has expired. Please log in again.";
        } else if (result.error?.includes("network") || result.error?.includes("Network")) {
          errorMessage = "Unable to connect to server. Please check your network connection.";
        } else if (
          result.error?.includes("TOO_MANY_LOGIN_ATTEMPTS") ||
          result.error?.includes("RATE_LIMIT")
        ) {
          errorMessage = "Too many login attempts. Please try again later.";
        }

        showToast(errorMessage, "error");
        setErrors((prev) => ({ ...prev, form: errorMessage }));
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again later.";

      if (error.message?.includes("Network") || error.message?.includes("fetch")) {
        errorMessage = "Unable to connect to server. Please check your network connection.";
      } else if (error.message?.includes("timeout")) {
        errorMessage = "Request timed out. Please try again.";
      }

      showToast(errorMessage, "error");
      setErrors((prev) => ({ ...prev, form: errorMessage }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className={styles.loadingContainer}>
        <SpinnerIcon />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Left side - Branding/Image */}
      <div className={styles.brandSide}>
        <div className={styles.brandContent}>
          <h1 className={styles.brandTitle}>Welcome Back</h1>
          <p className={styles.brandSubtitle}>
            Sign in to access your account and continue your shopping experience.
          </p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Exclusive member discounts</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Track your orders</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Save your favorites</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className={styles.formSide}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Sign In</h2>
            <p className={styles.formSubtitle}>
              Don't have an account?{" "}
              <Link to="/register" className={styles.link}>
                Create one
              </Link>
            </p>
          </div>

          {/* Error Alert */}
          {errors.form && (
            <div className={styles.errorAlert}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errors.form}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {/* Email Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <div className={`${styles.inputWrapper} ${errors.email ? styles.inputError : ""}`}>
                <span className={styles.inputIcon}>
                  <EmailIcon />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  className={styles.input}
                  autoComplete="email"
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={`${styles.inputWrapper} ${errors.password ? styles.inputError : ""}`}>
                <span className={styles.inputIcon}>
                  <LockIcon />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  className={styles.input}
                  autoComplete="current-password"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className={styles.options}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isSubmitting}
                />
                <span className={styles.checkmark}></span>
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <SpinnerIcon />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Social Login Divider */}
          <div className={styles.divider}>
            <span>or continue with</span>
          </div>

          {/* Social Login Buttons */}
          <div className={styles.socialButtons}>
            <button type="button" className={styles.socialButton} disabled>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Google</span>
            </button>
            <button type="button" className={styles.socialButton} disabled>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
