import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../services/userService";
import type { User } from "../types/user";
import LoadingSpinner from "./spinner";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers();
      console.log("Loaded users:", data);
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {

    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) {
      return;
}

    try {
      setDeletingId(id);

      await deleteUser(id);

      toast.success("User deleted successfully");

      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );

    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Users</h2>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Age</th>
            <th className="px-6 py-3 text-left">City</th>
            <th className="px-6 py-3 text-left">State</th>
            <th className="px-6 py-3 text-left">Pin Code</th>
            <th className="px-6 py-3 text-left">View</th>
            <th className="px-6 py-3 text-left">Edit</th>
            <th className="px-6 py-3 text-left">Delete</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{user.age}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{user.city}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{user.state}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{user.pincode}</td>
              <td className="px-6 py-4">
                <Link
                    to={`/users/${user.id}`}
                    className="
                      bg-green-500
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
                    View
                  </Link>
              </td>
              <td className="px-6 py-4">
                <Link
                  to={`/edit/${user.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  Edit
                </Link>
              </td>
              <td>
                <button
                    onClick={() =>
                      handleDelete(user.id!)
                    }
                    disabled={
                      deletingId === user.id
                    }
                    className="
                      bg-red-500
                      text-white
                      px-3
                      py-1
                      rounded
                      disabled:bg-gray-400
                    "
                  >
                    {deletingId === user.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;