import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import authService from "../services/authService";
import styles from "./ResetPassword.module.css";

// Icons
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

const CheckCircleIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const XCircleIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, success, expired, error

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "",
    color: "",
  });

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    let label, color;
    if (score <= 2) {
      label = "Weak";
      color = "#ef4444";
    } else if (score <= 4) {
      label = "Medium";
      color = "#f59e0b";
    } else {
      label = "Strong";
      color = "#22c55e";
    }

    return { score, label, color };
  };

  // Validation
  const validatePassword = (password) => {
    if (!password) {
      return "Please enter a new password";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) {
      return "Please confirm your password";
    }
    if (confirmPassword !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Calculate password strength
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear errors
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Re-validate confirm password when password changes
    if (name === "password" && formData.confirmPassword) {
      const confirmError = validateConfirmPassword(formData.confirmPassword, value);
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "password") {
      error = validatePassword(value);
    } else if (name === "confirmPassword") {
      error = validateConfirmPassword(value, formData.password);
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
      await authService.resetPassword(token, formData.password, formData.confirmPassword);
      setStatus("success");
      showSuccess("Password reset successfully!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";

      if (err.response?.status === 400 && errorMessage.includes("expired")) {
        setStatus("expired");
      } else if (err.response?.status === 400 && errorMessage.includes("invalid")) {
        setStatus("error");
      } else {
        showError(errorMessage);
        setErrors({ submit: errorMessage });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect to login after success
  const handleGoToLogin = () => {
    navigate("/login");
  };

  // Token expired state
  if (status === "expired") {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.expiredIcon}>
            <XCircleIcon />
          </div>
          <h1 className={styles.expiredTitle}>Link Expired</h1>
          <p className={styles.expiredMessage}>
            The password reset link has expired or has already been used. Please request a new link.
          </p>
          <div className={styles.expiredActions}>
            <Link to="/forgot-password" className={styles.requestNewBtn}>
              Request New Link
            </Link>
            <Link to="/login" className={styles.backToLoginLink}>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (status === "error") {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.errorIcon}>
            <XCircleIcon />
          </div>
          <h1 className={styles.errorTitle}>Invalid Link</h1>
          <p className={styles.errorMessage}>
            The password reset link is invalid. Please check your email or request a new link.
          </p>
          <div className={styles.errorActions}>
            <Link to="/forgot-password" className={styles.requestNewBtn}>
              Request New Link
            </Link>
            <Link to="/login" className={styles.backToLoginLink}>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (status === "success") {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.successIcon}>
            <CheckCircleIcon />
          </div>
          <h1 className={styles.successTitle}>Password Reset Successful!</h1>
          <p className={styles.successMessage}>
            Your password has been changed. You can now log in with your new password.
          </p>
          <button onClick={handleGoToLogin} className={styles.loginBtn}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
            </svg>
            Log In Now
          </button>
        </div>
      </div>
    );
  }

  // Default form state
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <ShieldIcon />
          </div>
          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.subtitle}>
            Enter a new password for your account. Password should be at least 6 characters.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* New Password */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              New Password
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
                placeholder="Enter new password"
                className={styles.input}
                disabled={isSubmitting}
                autoComplete="new-password"
                autoFocus
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.password && (
              <span className={styles.errorText}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.password}
              </span>
            )}

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className={styles.strengthWrapper}>
                <div className={styles.strengthBar}>
                  <div
                    className={styles.strengthFill}
                    style={{
                      width: `${(passwordStrength.score / 6) * 100}%`,
                      backgroundColor: passwordStrength.color,
                    }}
                  />
                </div>
                <span className={styles.strengthLabel} style={{ color: passwordStrength.color }}>
                  {passwordStrength.label}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <div
              className={`${styles.inputWrapper} ${errors.confirmPassword ? styles.inputError : ""}`}
            >
              <span className={styles.inputIcon}>
                <LockIcon />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Re-enter new password"
                className={styles.input}
                disabled={isSubmitting}
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className={styles.errorText}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.confirmPassword}
              </span>
            )}

            {/* Password Match Indicator */}
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <span className={styles.matchText}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Passwords match
              </span>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && <div className={styles.submitError}>{errors.submit}</div>}

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <SpinnerIcon />
                Processing...
              </>
            ) : (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Reset Password
              </>
            )}
          </button>
        </form>

        {/* Password Tips */}
        <div className={styles.tips}>
          <h4>Tips for a strong password:</h4>
          <ul>
            <li>Use at least 8 characters</li>
            <li>Combine uppercase, lowercase, numbers and special characters</li>
            <li>Avoid using easily guessable personal information</li>
          </ul>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Link to="/login" className={styles.backLink}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
