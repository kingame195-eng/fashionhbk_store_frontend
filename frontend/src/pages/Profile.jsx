import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { profileService } from "../services";
import styles from "./Profile.module.css";

// Icons
const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

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

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const SaveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const CancelIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const OrdersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className={styles.spinner} width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
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

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading, logout, updateUser } = useAuth();
  const { showToast } = useToast();

  // Active tab state
  const [activeTab, setActiveTab] = useState("profile");

  // Profile editing state
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Initialize profile data when user loads
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/profile" } } });
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Handle profile input change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    if (!profileData.firstName.trim()) {
      showToast("First name is required", "error");
      return;
    }

    setIsSaving(true);
    try {
      const updatedUser = await profileService.updateProfile({
        firstName: profileData.firstName.trim(),
        lastName: profileData.lastName.trim(),
        phone: profileData.phone.trim(),
      });
      updateUser(updatedUser);
      setIsEditing(false);
      showToast("Profile updated successfully!", "success");
    } catch (error) {
      showToast(error.message || "Failed to update profile", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setProfileData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
    });
    setIsEditing(false);
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (passwordErrors[name]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate password form
  const validatePasswordForm = () => {
    const errors = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Change password
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) return;

    setIsChangingPassword(true);
    try {
      await profileService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword,
        passwordData.confirmPassword
      );
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showToast("Password changed successfully!", "success");
    } catch (error) {
      const message = error.message || "Failed to change password";
      if (message.includes("incorrect") || message.includes("wrong")) {
        setPasswordErrors({ currentPassword: "Current password is incorrect" });
      } else {
        showToast(message, "error");
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      showToast("You have been signed out successfully", "success");
      navigate("/");
    } catch {
      showToast("Failed to sign out", "error");
    }
  };

  // Loading state
  if (authLoading) {
    return (
      <div className={styles.loadingContainer}>
        <SpinnerIcon />
        <p>Loading your profile...</p>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.firstName} />
              ) : (
                <span>{user.firstName?.[0]?.toUpperCase() || "U"}</span>
              )}
            </div>
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>
                {user.firstName} {user.lastName}
              </h3>
              <p className={styles.userEmail}>{user.email}</p>
              {user.role === "admin" && <span className={styles.adminBadge}>Admin</span>}
            </div>
          </div>

          <nav className={styles.sideNav}>
            <button
              className={`${styles.navItem} ${activeTab === "profile" ? styles.active : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <UserIcon />
              <span>Profile Information</span>
            </button>
            <button
              className={`${styles.navItem} ${activeTab === "security" ? styles.active : ""}`}
              onClick={() => setActiveTab("security")}
            >
              <LockIcon />
              <span>Security</span>
            </button>
            <button
              className={`${styles.navItem} ${activeTab === "orders" ? styles.active : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <OrdersIcon />
              <span>My Orders</span>
            </button>
            <button
              className={`${styles.navItem} ${activeTab === "wishlist" ? styles.active : ""}`}
              onClick={() => setActiveTab("wishlist")}
            >
              <HeartIcon />
              <span>Wishlist</span>
            </button>
            <button className={`${styles.navItem} ${styles.logoutBtn}`} onClick={handleLogout}>
              <LogoutIcon />
              <span>Sign Out</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Profile Information</h2>
                {!isEditing ? (
                  <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
                    <EditIcon />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className={styles.editActions}>
                    <button
                      className={styles.cancelBtn}
                      onClick={handleCancelEdit}
                      disabled={isSaving}
                    >
                      <CancelIcon />
                      <span>Cancel</span>
                    </button>
                    <button
                      className={styles.saveBtn}
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                    >
                      {isSaving ? <SpinnerIcon /> : <SaveIcon />}
                      <span>{isSaving ? "Saving..." : "Save"}</span>
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      className={styles.input}
                      placeholder="Enter your first name"
                    />
                  ) : (
                    <p className={styles.value}>{user.firstName || "-"}</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      className={styles.input}
                      placeholder="Enter your last name"
                    />
                  ) : (
                    <p className={styles.value}>{user.lastName || "-"}</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <p className={styles.value}>
                    <EmailIcon />
                    {user.email}
                  </p>
                  <span className={styles.hint}>Email cannot be changed</span>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      className={styles.input}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p className={styles.value}>{user.phone || "Not provided"}</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Member Since</label>
                  <p className={styles.value}>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "-"}
                  </p>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Account Status</label>
                  <span className={`${styles.statusBadge} ${styles.statusActive}`}>Active</span>
                </div>
              </div>
            </section>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Change Password</h2>
              </div>

              <form onSubmit={handleChangePassword} className={styles.passwordForm}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Current Password</label>
                  <div className={styles.passwordInputWrapper}>
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className={`${styles.input} ${passwordErrors.currentPassword ? styles.inputError : ""}`}
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() =>
                        setShowPasswords((prev) => ({ ...prev, current: !prev.current }))
                      }
                    >
                      {showPasswords.current ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {passwordErrors.currentPassword && (
                    <span className={styles.errorText}>{passwordErrors.currentPassword}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>New Password</label>
                  <div className={styles.passwordInputWrapper}>
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className={`${styles.input} ${passwordErrors.newPassword ? styles.inputError : ""}`}
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowPasswords((prev) => ({ ...prev, new: !prev.new }))}
                    >
                      {showPasswords.new ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {passwordErrors.newPassword && (
                    <span className={styles.errorText}>{passwordErrors.newPassword}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Confirm New Password</label>
                  <div className={styles.passwordInputWrapper}>
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className={`${styles.input} ${passwordErrors.confirmPassword ? styles.inputError : ""}`}
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() =>
                        setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))
                      }
                    >
                      {showPasswords.confirm ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && (
                    <span className={styles.errorText}>{passwordErrors.confirmPassword}</span>
                  )}
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isChangingPassword}>
                  {isChangingPassword ? (
                    <>
                      <SpinnerIcon />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <LockIcon />
                      <span>Update Password</span>
                    </>
                  )}
                </button>
              </form>
            </section>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>My Orders</h2>
              </div>
              <div className={styles.emptyState}>
                <OrdersIcon />
                <h3>No orders yet</h3>
                <p>When you place an order, it will appear here.</p>
                <button className={styles.primaryBtn} onClick={() => navigate("/products")}>
                  Start Shopping
                </button>
              </div>
            </section>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>My Wishlist</h2>
              </div>
              <div className={styles.emptyState}>
                <HeartIcon />
                <h3>Your wishlist is empty</h3>
                <p>Save items you love to your wishlist.</p>
                <button className={styles.primaryBtn} onClick={() => navigate("/products")}>
                  Explore Products
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
