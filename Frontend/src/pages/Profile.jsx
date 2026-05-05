import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validateName } from "../utils/validation";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("cb_auth_token");

      if (!token) {
        setError("Not authenticated. Please sign in first.");
        navigate("/signin");
        return;
      }

      const response = await fetch(`${apiBaseUrl}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data.user);
      setFormData({ name: data.user.name, email: data.user.email });
      setError(null);
    } catch (err) {
      setError(err.message || "Unable to fetch profile");
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setUpdateError(null);
    setUpdateSuccess(false);

    // Validate fields
    const nameVal = validateName(formData.name);
    const emailVal = validateEmail(formData.email);
    
    setNameError(nameVal.error);
    setEmailError(emailVal.error);
    
    if (!nameVal.isValid || !emailVal.isValid) {
      setUpdateError("Please fix all errors before saving");
      return;
    }

    try {
      const token = localStorage.getItem("cb_auth_token");

      if (!token) {
        setUpdateError("Session expired. Please sign in again.");
        navigate("/signin");
        return;
      }

      const response = await fetch(`${apiBaseUrl}/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const data = await response.json();
      setProfile(data.user);
      setIsEditing(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);

      // Update localStorage with new user data
      localStorage.setItem("cb_auth_user", JSON.stringify(data.user));
    } catch (err) {
      setUpdateError(err.message || "Failed to update profile");
      console.error("Profile update error:", err);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({ name: profile.name, email: profile.email });
      setIsEditing(false);
    }
  };

  if (loading) {
    return (
      <div className="page-wrap py-14">
        <div className="max-w-2xl">
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="page-wrap py-14">
        <div className="max-w-2xl rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => navigate("/signin")}
            className="mt-3 inline-block rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap py-14">
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
          <p className="mt-2 text-slate-600">Manage your profile information</p>
        </div>

        {/* Success Message */}
        {updateSuccess && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-green-600">Profile updated successfully</p>
          </div>
        )}

        {/* Error Message */}
        {updateError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-red-600">{updateError}</p>
          </div>
        )}

        {/* Profile Card */}
        {profile && (
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            {!isEditing ? (
              <>
                {/* Display Mode */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Full Name</label>
                    <p className="mt-1 text-slate-900">{profile.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Email Address</label>
                    <p className="mt-1 text-slate-900">{profile.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Member Since</label>
                    <p className="mt-1 text-slate-900">
                      {new Date(profile.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                  >
                    Edit Profile
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Edit Mode */}
                <form onSubmit={handleSave} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={() => setNameError(validateName(formData.name).error)}
                      className={`mt-1 w-full rounded-lg border px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 ${
                        nameError 
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                      required
                    />
                    {nameError && <p className="mt-1 text-sm text-red-600">{nameError}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={() => setEmailError(validateEmail(formData.email).error)}
                      className={`mt-1 w-full rounded-lg border px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 ${
                        emailError 
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                      required
                    />
                    {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
