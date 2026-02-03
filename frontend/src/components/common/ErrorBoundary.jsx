import { Component } from "react";

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console in development
    console.error("Error Boundary caught an error:", error, errorInfo);

    // Store error info for display
    this.setState({ errorInfo });

    // TODO: Log to external service (Sentry, LogRocket, etc.)
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, { extra: errorInfo });
    // }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div style={styles.container}>
          <div style={styles.content}>
            <div style={styles.icon}>⚠️</div>
            <h1 style={styles.title}>Oops! An error occurred</h1>
            <p style={styles.message}>
              We apologize for the inconvenience. Please try again or contact support if the problem
              continues.
            </p>

            <div style={styles.actions}>
              <button onClick={this.handleRetry} style={styles.retryButton}>
                Try Again
              </button>
              <button onClick={() => (window.location.href = "/")} style={styles.homeButton}>
                Go Home
              </button>
            </div>

            {/* Show error details in development */}
            {import.meta.env.DEV && this.state.error && (
              <details style={styles.details}>
                <summary style={styles.summary}>Error Details (Development only)</summary>
                <pre style={styles.errorStack}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "2rem",
    backgroundColor: "#f9fafb",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  content: {
    textAlign: "center",
    maxWidth: "500px",
  },
  icon: {
    fontSize: "4rem",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 0.5rem",
  },
  message: {
    fontSize: "1rem",
    color: "#6b7280",
    margin: "0 0 1.5rem",
    lineHeight: "1.6",
  },
  actions: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  retryButton: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#fff",
    backgroundColor: "#3b82f6",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  homeButton: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#374151",
    backgroundColor: "#fff",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  details: {
    marginTop: "2rem",
    textAlign: "left",
  },
  summary: {
    cursor: "pointer",
    color: "#6b7280",
    fontSize: "0.875rem",
  },
  errorStack: {
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "#fef2f2",
    borderRadius: "0.5rem",
    fontSize: "0.75rem",
    overflow: "auto",
    maxHeight: "200px",
    color: "#dc2626",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
};

export default ErrorBoundary;
