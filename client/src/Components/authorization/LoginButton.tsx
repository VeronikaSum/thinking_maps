import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="btn btn-outline btn-primary"
      onClick={() => loginWithRedirect()}
    >
      Prisijungti
    </button>
  );
};

export default LoginButton;
