import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { GameResponse, Group, User } from "../../Types";
import UserService from "../../Services/UserService";
import GroupService from "../../Services/GroupService";
import AddGroupForm from "../AddGroupForm";
import GameService from "../../Services/GameService";
import { useNavigate } from "react-router-dom";
import pathToUrl from "../../Common/pathToUrl";
import { routes } from "../../Common/routes";

function Profile() {
  const { user: auth0User } = useAuth0();
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    if (auth0User && auth0User.sub) {
      UserService.getUserByAuthId(auth0User?.sub!).then((res) => {
        setUser(res);
      });
    }
  }, [auth0User?.sub]);

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
    </div>
  );
}

export default Profile;
