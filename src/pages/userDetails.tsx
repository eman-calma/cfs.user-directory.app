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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            User Details
          </h1>

          <Link
            to="/"
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back
          </Link>
        </div>

        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <p className="text-gray-500 text-sm font-medium mb-1">
              ID
            </p>
            <p className="text-lg text-gray-800">
              {user.id}
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <p className="text-gray-500 text-sm font-medium mb-1">
              Name
            </p>
            <p className="text-lg text-gray-800">
              {user.name}
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <p className="text-gray-500 text-sm font-medium mb-1">
              Age
            </p>
            <p className="text-lg text-gray-800">
              {user.age}
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <p className="text-gray-500 text-sm font-medium mb-1">
              City
            </p>
            <p className="text-lg text-gray-800">
              {user.city}
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <p className="text-gray-500 text-sm font-medium mb-1">
              State
            </p>
            <p className="text-lg text-gray-800">
              {user.state}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">
              Pin Code
            </p>
            <p className="text-lg text-gray-800">
              {user.pincode}
            </p>
          </div>
        </div>
        </div>
    </div>
  );
};

export default UserDetailsPage;