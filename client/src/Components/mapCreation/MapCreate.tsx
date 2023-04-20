import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  CheckedItem,
  CreateGameMapRequest,
  GenerateMapRequest,
  Group,
  ThinkingMapEntity,
} from "../../Types";
import ThinkingMapService from "../../Services/ThinkingMapService";
import WordAndImageSelection from "./WordAndImageSelection";
import GameService from "../../Services/GameService";
import GroupService from "../../Services/GroupService";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../Common/routes";

interface MapCreateProps {
  word: string;
}

function MapCreate({ word }: MapCreateProps) {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const mainWord: CheckedItem = {
    id: uuid(),
    word: word,
    canBeDeleted: false,
  };
  const [thinkingMap, setThinkingMap] = useState<ThinkingMapEntity | null>(
    null
  );

  const [groups, setGroups] = useState<Group[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [triedSubmitting, setTriedSubmitting] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isFilesUploading, setIsFilesUploading] = useState<boolean>(false);
  const [addedCorrectItems, setAddedCorrectItems] = useState<CheckedItem[]>([]);
  const [addedIncorrectItems, setAddedIncorrectItems] = useState<CheckedItem[]>(
    []
  );

  useEffect(() => {
    if (user?.sub) {
      GroupService.getAllGroupsByAuthId(user?.sub).then((res) =>
        setGroups(res)
      );
    }
  }, [user]);

  const createGameMap = async () => {
    setTriedSubmitting(true);
    if (title === "" || selectedGroup.length === 0) {
      setErrorText(
        "Negalima kurti žaidimo be pasirinktos grupės arba pavadinimo"
      );
      setShowError(true);
      return;
    }
    await generateMap();
  };

  const createGameMapWithoutGroup = async () => {
    setTriedSubmitting(true);
    if (title === "") {
      setErrorText("Negalima kurti žaidimo be pavadinimo");
      setShowError(true);
      return;
    }
    await generateMap();
  };

  const generateMap = async () => {
    let imageNames: string[] = [];
    for (var i = 0; i < addedCorrectItems.length; i++) {
      imageNames.push(addedCorrectItems[i].word);
    }

    for (var i = 0; i < addedIncorrectItems.length; i++) {
      imageNames.push(addedIncorrectItems[i].word);
    }

    const request: GenerateMapRequest = {
      mapTitle: title,
      mainWord: word,
      imageNames: imageNames,
    };

    var formData = new FormData();
    formData.append("request", JSON.stringify(request));

    addedCorrectItems.forEach(async (item: CheckedItem) => {
      if (item.image && item.image !== null) {
        formData.append(`images`, item.image, item.word);
      }
      return formData;
    });

    addedIncorrectItems.forEach(async (item: CheckedItem) => {
      if (item.image && item.image !== null) {
        formData.append(`images`, item.image, item.word + "0");
      }
      return formData;
    });

    await ThinkingMapService.postThinkingMap(formData).then((data) => {
      if (selectedGroup) {
        setThinkingMap(data);
        const request: CreateGameMapRequest = {
          mapId: data.id,
          groupId: selectedGroup,
          userAuthId: user!.sub!,
        };
        GameService.createGame(request).then(() => {
          navigate(routes.gameDetailsView);
        });
      }
    });
  };

  return (
    <>
      <WordAndImageSelection
        header="Teisingų apibūdinimų pridėjimas"
        helpText="Pridėkite 6 teisingus apibūdinimus jūsų pasirinktam žodžiui. Pirmasis elementas apačioje - žemėlapio pagrindinis žodis."
        placeholder="Įveskite teisingus apibūdinimus"
        setAddedItems={setAddedCorrectItems}
        setUploadCompleted={setIsFilesUploading}
        mainWord={mainWord}
      />
      <div className="mt-4" />
      <WordAndImageSelection
        header="Neteisingų apibūdinimų pridėjimas"
        helpText="Pridėkite 5 neteisingus apibūdinimus jūsų pasirinktam žodžiui."
        placeholder="Įveskite neteisingus apibūdinimus"
        setAddedItems={setAddedIncorrectItems}
        setUploadCompleted={setIsFilesUploading}
      />
      <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
        {!(
          addedCorrectItems.filter((item) => !!item.image).length < 7 &&
          addedIncorrectItems.filter((item) => !!item.image).length < 5 &&
          !isFilesUploading
        ) && (
          <label htmlFor="my-modal" className="btn">
            Generuoti žemėlapį
          </label>
        )}
      </div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Ar norite generuoti žaidimą su šiuo žemėlapiu? Įveskite žemėlapio
            pavadinimą bei pasirinkite grupę su kuria žaidimą norite susieti.
            Sugeneruotą žaidimą rasite puslapyje "Mano žaidimai":
          </h3>
          <p className="py-4">
            <div>
              <input
                className="input input-bordered w-full max-w-xs mb-4"
                placeholder="Pavadinimas"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setShowError(false);
                }}
              />
            </div>
            <div>
              <select
                className="select select-bordered w-full max-w-xs"
                value={selectedGroup}
                onChange={(e) => {
                  setSelectedGroup(e.target?.value);
                  setShowError(false);
                }}
              >
                <option value=""></option>
                {groups.map((group) => {
                  return (
                    <option value={group.id}>{group.name.toUpperCase()}</option>
                  );
                })}
              </select>
            </div>
            {showError && triedSubmitting && (
              <p className="text-red-600">{errorText}</p>
            )}
          </p>
          <div className="modal-action">
            <label htmlFor={"my-modal"} className="btn btn-secondary">
              Grįžti
            </label>
            <label
              htmlFor={selectedGroup ? "my-modal" : ""}
              className="btn btn-secondary"
              onClick={() => {
                createGameMapWithoutGroup().then(() =>
                  navigate(routes.mainPage)
                );
              }}
            >
              Kurti tik žemėlapį
            </label>
            <label
              htmlFor={selectedGroup ? "my-modal" : ""}
              className="btn"
              onClick={() => {
                createGameMap();
              }}
            >
              Kurti žaidimą
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default MapCreate;
