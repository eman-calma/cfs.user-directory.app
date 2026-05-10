import { useNavigate } from "react-router-dom";
import UserForm from "../components/userForm";
import { createUser } from "../services/userService";
import type { User } from "../types/user";
import toast from "react-hot-toast";
import { useState } from "react";



const CreateUserPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleCreate = async (user: User) => {
    try {
      setLoading(true);

      await createUser(user);

      toast.success("User created successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error("Failed to create user");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="max-w-lg mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Create User
      </h1>

      <UserForm onSubmit={handleCreate} isLoading={loading}/>
    </div>
  );
};

export default CreateUserPage;