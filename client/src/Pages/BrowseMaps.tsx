import { useEffect, useState } from "react";
import ThinkingMapService from "../Services/ThinkingMapService";
import { ThinkingMapEntity } from "../Types";

export default function BrowseMaps() {
  const [data, setData] = useState<ThinkingMapEntity[]>();

  useEffect(() => {
    ThinkingMapService.getAllThinkingMaps().then((res) => setData(res));
  }, []);

  if (!data) {
    return <></>;
  }

  return (
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
                <button className="btn btn-primary">Kurti grupę</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
