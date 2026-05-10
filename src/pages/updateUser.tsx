import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../components/userForm";
import { getUserById, updateUser } from "../services/userService";
import type { User } from "../types/user";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/spinner";


const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] =useState(true);


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
      setPageLoading(false);
    }
  };

  const handleUpdate = async (updatedUser: User) => {
    try {
      setLoading(true);
      
      (updatedUser as any).id = id
      await updateUser(updatedUser);

      toast.success("User updated successfully!");

      navigate("/");
    } catch (error) {
      toast.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Edit User
      </h1>

      <UserForm
        initialData={user}
        onSubmit={handleUpdate}
        isLoading={loading}
      />
    </div>
  );
};

export default EditUserPage;