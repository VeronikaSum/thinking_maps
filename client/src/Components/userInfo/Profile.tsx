import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Group, User } from "../../Types";
import UserService from "../../Services/UserService";
import GroupService from "../../Services/GroupService";
import AddGroupForm from "../AddGroupForm";

function Profile() {
  const { user: auth0User } = useAuth0();
  const [user, setUser] = useState<User | null>();
  const [groups, setGroups] = useState<Group[] | null>();
  const [addGroup, setAddGroup] = useState<boolean>(false);

  useEffect(() => {
    setGroups(groups);
  }, [groups, addGroup]);

  useEffect(() => {
    if (auth0User && auth0User.sub) {
      GroupService.getAllGroupsByAuthId(auth0User?.sub!).then((res) => {
        setGroups(res);
      });
    }
  }, [auth0User?.sub]);

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
      <div className="divider divider-horizontal " />
      <div className="grid flex-grow bg-base-100 card rounded-box place-items-center w-96 shadow-xl mt-4 ml-4">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl font-bold ">
            Jūsų grupės
          </h2>
          {groups && (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Pavadinimas</th>
                  <th>Vaikai</th>
                  <th>Veiksmai</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => {
                  return (
                    <tr key={group.id}>
                      <th>{group.name}</th>
                      {group.child && (
                        <th>
                          {group.child.map((child) => {
                            return `${child.firstName} ${child.lastName} \n`;
                          })}
                        </th>
                      )}
                      <th>
                        <button className="btn btn-outline btn-secondary">
                          Ištrinti
                        </button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className="overflow-x-auto">
            <button
              className="btn btn-primary mx-auto btn-wide mb-6"
              onClick={() => {
                setAddGroup(!addGroup);
              }}
            >
              Pridėti grupę
            </button>
            {addGroup && (
              <AddGroupForm
                authId={user!.authId}
                setGroups={setGroups}
                onSucess={() => setAddGroup(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
