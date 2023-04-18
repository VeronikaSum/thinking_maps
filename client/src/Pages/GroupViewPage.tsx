import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import AddGroupForm from "../Components/AddGroupForm";
import GroupService from "../Services/GroupService";
import UserService from "../Services/UserService";
import { User, Group } from "../Types";

export default function GroupViewPage() {
  const { user: auth0User } = useAuth0();
  const [user, setUser] = useState<User | null>();
  const [groups, setGroups] = useState<Group[] | null>();
  const [addGroup, setAddGroup] = useState<boolean>(false);

  useEffect(() => {
    setGroups(groups);
  }, [groups, addGroup]);

  useEffect(() => {
    if (auth0User && auth0User.sub) {
      UserService.getUserByAuthId(auth0User?.sub!).then((res) => {
        setUser(res);
      });
    }
  }, [auth0User?.sub]);

  useEffect(() => {
    if (auth0User && auth0User.sub) {
      GroupService.getAllGroupsByAuthId(auth0User?.sub!).then((res) => {
        setGroups(res);
      });
    }
  }, [auth0User?.sub]);

  return (
    <div className="grid flex-grow bg-base-100 card rounded-box place-items-center mx-auto shadow-xl mt-4 ml-4">
      <div className="card-body">
        <h2 className="card-title text-center text-2xl font-bold ">Grupės</h2>
        {groups && (
          <table className="table mx-auto">
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
  );
}
