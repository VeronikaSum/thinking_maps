import { useState } from "react";
import { v4 as uuid } from "uuid";
import { CheckedItem, GenerateMapRequest, ThinkingMapEntity } from "../Types";
import ThinkingMapService from "../Services/ThinkingMapService";
import WordAndImageSelection from "./WordAndImageSelection";

interface MapCreateProps {
  word: string;
}

function MapCreate({ word }: MapCreateProps) {
  const mainWord: CheckedItem = {
    id: uuid(),
    word: word,
    canBeDeleted: false,
  };
  const [thinkingMap, setThinkingMap] = useState<ThinkingMapEntity | null>(
    null
  );

  const [isFilesUploading, setIsFilesUploading] = useState<boolean>(false);
  const [addedCorrectItems, setAddedCorrectItems] = useState<CheckedItem[]>([]);
  const [addedIncorrectItems, setAddedIncorrectItems] = useState<CheckedItem[]>(
    []
  );

  const generateMap = () => {
    const request: GenerateMapRequest = {
      mapTitle: "Test",
      mainWord: word,
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

    ThinkingMapService.postThinkingMap(formData).then((data) => {
      setThinkingMap(data);
    });
  };

  return (
    <>
      <WordAndImageSelection
        header="Teisingų apibūdinimų pridėjimas"
        placeholder="Įveskite teisingus apibūdinimus"
        setAddedItems={setAddedCorrectItems}
        setUploadCompleted={setIsFilesUploading}
        mainWord={mainWord}
      />
      <div className="mt-4" />
      <WordAndImageSelection
        header="Neteisingų apibūdinimų pridėjimas"
        placeholder="Įveskite neteisingus apibūdinimus"
        setAddedItems={setAddedIncorrectItems}
        setUploadCompleted={setIsFilesUploading}
      />
      <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
        <button
          disabled={
            addedCorrectItems.filter((item) => !!item.image).length < 7 &&
            addedIncorrectItems.filter((item) => !!item.image).length < 5 &&
            !isFilesUploading
          }
          className="btn"
          onClick={() => {
            generateMap();
          }}
        >
          Generuoti žemėlapį
        </button>
        {thinkingMap !== null && <img src={thinkingMap.content} />}
      </div>
    </>
  );
}

export default MapCreate;
