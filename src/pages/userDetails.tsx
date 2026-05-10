import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import LoadingSpinner from "../components/spinner";

import { getUserById } from "../services/userService";
import type { User } from "../types/user";

const UserDetailsPage = () => {
  const { id } = useParams();

  const [user, setUser] = useState<User>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadUser(id);
    }
  }, [id]);

  const loadUser = async (userId) => {
    try {
      const data = await getUserById(userId);
      console.log("Loaded user:", data);
      setUser(data);
    } catch (error) {
      toast.error("Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">User not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          User Details
        </h1>

        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          Back
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          <div className="px-6 py-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">ID</p>
            <p className="text-sm text-gray-900">{user.id}</p>
          </div>

          <div className="px-6 py-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Name</p>
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
          </div>

          <div className="px-6 py-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Age</p>
            <p className="text-sm text-gray-900">{user.age}</p>
          </div>

          <div className="px-6 py-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">City</p>
            <p className="text-sm text-gray-900">{user.city}</p>
          </div>

          <div className="px-6 py-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">State</p>
            <p className="text-sm text-gray-900">{user.state}</p>
          </div>

          <div className="px-6 py-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Pin Code</p>
            <p className="text-sm text-gray-900">{user.pincode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;