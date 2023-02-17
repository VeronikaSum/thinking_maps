import { useState } from "react";
import Form from "../Components/Form";
import MapCreate from "../Components/MapCreate";
import { SearchWordRequest } from "../Types";

function MapCreatePage() {
  const [mainWord, setMainWord] = useState<string | null>(null);

  const onSubmit = async (data: SearchWordRequest) => {
    setMainWord(data.searchWord);
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold mt-0 mb-6">
        Apibūdinimas – burbulo žemėlapis
      </h1>
      <Form onSubmit={onSubmit} />
      {mainWord && <MapCreate word={mainWord} />}
    </>
  );
}

export default MapCreatePage;
