import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  age: z
    .number()
    .min(0, "Age must be 0 or more"),
  
  city: z
    .string()
    .min(2, "City must be at least 2 characters"),

  state: z
    .string()
    .min(2, "State must be at least 2 characters"),

  pincode: z
    .number()
    .min(4, "Pin Code must be at least 4 digits"),
});

type UserFormData = z.infer<typeof userSchema>;

interface Props {
  initialData?: UserFormData;
  onSubmit: (user: UserFormData) => void;
  isLoading?: boolean;
}

  const UserForm = ({
  initialData,
  onSubmit,
  isLoading,
  }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),

    defaultValues: {
      name: initialData?.name || "",
      age: initialData?.age || 0,
      city: initialData?.city || "",
      state: initialData?.state || "",
      pincode: initialData?.pincode || 0,
    },
  });



  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
        <input
          type="text"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Age</label>
        <input
          type="number"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          min={0}
          {...register("age", {
            required: "Age is required",
            valueAsNumber: true,
            min: { value: 0, message: "Age must be 0 or more" },
          })}
        />
        {errors.age && <p className="text-red-500 text-xs mt-1.5">{errors.age.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
        <input
          type="text"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          {...register("city", { required: "City is required" })}
        />
        {errors.city && <p className="text-red-500 text-xs mt-1.5">{errors.city.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
        <input
          type="text"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          {...register("state", { required: "State is required" })}
        />
        {errors.state && <p className="text-red-500 text-xs mt-1.5">{errors.state.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Pin Code</label>
        <input
          type="number"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          {...register("pincode", { required: "Pin Code is required", valueAsNumber: true, min: { value: 4, message: "Pin Code must be at least 4 digits" } })}
        />
        {errors.pincode && <p className="text-red-500 text-xs mt-1.5">{errors.pincode.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
      >
        {isLoading ? "Saving..." : "Save User"}
      </button>
    </form>
  );
};

export default UserForm;