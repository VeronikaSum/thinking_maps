import { useEffect, useState } from "react";
import ThinkingMapService from "../Services/ThinkingMapService";
import { CreateGameMapRequest, Group, ThinkingMapEntity } from "../Types";
import GroupService from "../Services/GroupService";
import { useAuth0 } from "@auth0/auth0-react";
import GameService from "../Services/GameService";

export default function BrowseMaps() {
  const { user } = useAuth0();
  const [data, setData] = useState<ThinkingMapEntity[]>();
  const [groups, setGroups] = useState<Group[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [triedSubmitting, setTriedSubmitting] = useState<boolean>(false);
  const [selectedMapId, setSelectedMapId] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  console.log(selectedGroup);

  useEffect(() => {
    ThinkingMapService.getAllThinkingMaps().then((res) => setData(res));
  }, []);

  useEffect(() => {
    if (user?.sub) {
      GroupService.getAllGroupsByAuthId(user?.sub).then((res) =>
        setGroups(res)
      );
    }
  }, [user]);

  const createGameMap = () => {
    setTriedSubmitting(true);
    if (selectedMapId === null || selectedGroup.length === 0) {
      setShowError(true);
      return;
    }
    const request: CreateGameMapRequest = {
      mapId: selectedMapId,
      groupId: selectedGroup,
      userAuthId: user!.sub!,
    };
    GameService.createGame(request);
  };

  const resetFields = () => {
    setSelectedGroup("");
    setTriedSubmitting(false);
    setSelectedMapId(null);
    setShowError(false);
  };

  console.log(groups);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {data.map((map) => {
          return (
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img src={map.content} alt={map.mainWord} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{map.title}</h2>
                <p>Burbulo - apibūdinimo: {map.mainWord}</p>
                <div className="card-actions justify-end">
                  <label
                    htmlFor="my-modal"
                    className="btn"
                    onClick={() => {
                      resetFields();
                      setSelectedMapId(map.id);
                    }}
                  >
                    Rinktis
                  </label>
                </div>
              </div>
            </div>
          );
        })}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Ar norite sukurti žaidimą su šiuo žemėlapiu? Pasirinkite grupę su
              kuria žaidimą norite susieti:
            </h3>
            <p className="py-4">
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target?.value)}
              >
                <option value=""></option>
                {groups.map((group) => {
                  return (
                    <option value={group.id}>{group.name.toUpperCase()}</option>
                  );
                })}
              </select>
              {showError && triedSubmitting && (
                <p className="text-red-600">
                  Negalima kurti žaidimo be pasirinktos grupės
                </p>
              )}
            </p>
            <div className="modal-action">
              <label
                htmlFor={selectedGroup ? "my-modal" : ""}
                className="btn"
                onClick={() => {
                  createGameMap();
                }}
              >
                Sukurti
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
