import {
  useMsal,
} from "@azure/msal-react";

export default function LogoutButton() {

  const { instance } = useMsal();

  const handleLogout = () => {

    instance.logoutPopup();
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}