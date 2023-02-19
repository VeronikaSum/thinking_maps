import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "../Types";
import UserService from "../Services/UserService";

function Profile() {
  const { user: auth0User } = useAuth0();
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    UserService.getUserByAuthId(auth0User?.sub!).then((res) => {
      setUser(res);
    });
  }, [auth0User]);

  return (
    <div className="flex w-full">
      <div className="grid flex-grow bg-base-100 card w-96 rounded-box place-items-center shadow-xl mt-4 mr-4">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl font-bold ">
            Profilio duomeys
          </h2>
          <p>Vardas</p>
          {user?.firstName}
          <p>Pavarde</p>
          {user?.lastName}
          <p>Įstaiga</p>
          {user?.institution}
          <p>El. paštas</p>
          {user?.email}
        </div>
      </div>
      <div className="divider divider-horizontal " />
      <div className="grid flex-grow bg-base-100 card rounded-box place-items-center w-96 shadow-xl mt-4 ml-4">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl font-bold ">
            Jūsų grupės
          </h2>
          <button className="btn btn-primary mx-auto btn-wide">
            Pridėti grupę
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
