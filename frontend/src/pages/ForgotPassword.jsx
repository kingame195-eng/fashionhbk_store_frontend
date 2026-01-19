import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import authService from "../services/authService";
import styles from "./ForgotPassword.module.css";

// Icons
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
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

const LockIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function ForgotPassword() {
  const { showSuccess, showError } = useToast();

  // Form state
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validate email
  const validateEmail = (emailValue) => {
    if (!emailValue.trim()) {
      return "Please enter your email address";
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      return "Invalid email address";
    }

    return "";
  };

  // Handle input change
  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError("");
    }
  };

  // Handle blur for validation
  const handleBlur = () => {
    const validationError = validateEmail(email);
    setError(validationError);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await authService.forgotPassword(email.trim().toLowerCase());
      setIsSuccess(true);
      showSuccess("Password reset instructions sent!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again later.";

      // Handle specific error cases
      if (err.response?.status === 404) {
        setError("This email is not registered in our system");
      } else if (err.response?.status === 429) {
        setError("You have sent too many requests. Please wait a few minutes and try again.");
      } else {
        setError(errorMessage);
      }
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state - Email sent
  if (isSuccess) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.successIcon}>
            <CheckCircleIcon />
          </div>
          <h1 className={styles.successTitle}>Email sent!</h1>
          <p className={styles.successMessage}>
            We have sent password reset instructions to <strong>{email}</strong>
          </p>
          <div className={styles.successInstructions}>
            <h3>Next steps:</h3>
            <ol>
              <li>Check your inbox</li>
              <li>
                If you don't see the email, check your <strong>Spam</strong> or{" "}
                <strong>Junk</strong> folder
              </li>
              <li>Click the link in the email to reset your password</li>
              <li>
                The link will expire in <strong>1 hour</strong>
              </li>
            </ol>
          </div>
          <div className={styles.successActions}>
            <button
              onClick={() => {
                setIsSuccess(false);
                setEmail("");
              }}
              className={styles.resendBtn}
            >
              Resend email
            </button>
            <Link to="/login" className={styles.backToLoginBtn}>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <LockIcon />
          </div>
          <h1 className={styles.title}>Forgot your password?</h1>
          <p className={styles.subtitle}>
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* Email Input */}
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>
            <div className={`${styles.inputWrapper} ${error ? styles.inputError : ""}`}>
              <span className={styles.inputIcon}>
                <EmailIcon />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="example@email.com"
                className={styles.input}
                disabled={isSubmitting}
                autoComplete="email"
                autoFocus
              />
            </div>
            {error && (
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
                {error}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <SpinnerIcon />
                Sending...
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
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                Send reset instructions
              </>
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className={styles.footer}>
          <Link to="/login" className={styles.backLink}>
            <ArrowLeftIcon />
            Back to login
          </Link>
        </div>

        {/* Help Text */}
        <div className={styles.helpText}>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className={styles.registerLink}>
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
