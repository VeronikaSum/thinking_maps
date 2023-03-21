import { CSSProperties, FC, useEffect, useState } from "react";
import { ThinkingMapElement } from "./ThinkingMap";
import { Image } from "./Image";
import GameService from "../Services/GameService";
import { GameResponse, ImageResponse, Time } from "../Types";
import ImageService from "../Services/ImageService";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../Common/routes";
import { Timer } from "./Timer";

function shuffleArray(array: []) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const style: CSSProperties = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
};

export const Game: FC = function Game() {
  const [game, setGame] = useState<GameResponse | null>(null);
  const [images, setImages] = useState<ImageResponse[]>([]);
  const [mainImage, setMainImages] = useState<ImageResponse | null>(null);
  const [updateImages, setUpdateImages] = useState<boolean>(false);
  const [selectedImageId, setSelectedImageId] = useState<string | undefined>(
    undefined
  );
  const [openStartModal, setOpenStartModal] = useState<boolean>(false);
  const [mistake, setMistake] = useState<string | undefined>(undefined);
  const [allMistakes, setAllMistakes] = useState<string[]>([]);
  const [time, setTime] = useState<number>(0);
  const [startGame, setStartGame] = useState(false);
  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      GameService.getById(id).then((res) => setGame(res));
    }
  }, [id]);

  useEffect(() => {
    if (game) {
      ImageService.getById(game.map.id).then((res) => {
        setMainImages(res.at(0));
        res.shift();
        shuffleArray(res);
        setImages(res);
      });

      setOpenStartModal(true);
      setAllMistakes([]);
    }
  }, [game]);

  useEffect(() => {
    var element = document.getElementById(
      "my-modal-start"
    ) as HTMLInputElement | null;
    if (element && openStartModal) {
      element.checked = openStartModal;
    }
  }, [openStartModal]);

  useEffect(() => {
    if (updateImages && selectedImageId) {
      setImages(
        images.filter((image) => {
          return image.id !== selectedImageId;
        })
      );
      setUpdateImages(false);
      setSelectedImageId(undefined);
    }
  }, [updateImages, selectedImageId]);

  useEffect(() => {
    if (mistake) {
      allMistakes.push(mistake);
      setAllMistakes(allMistakes);
    }
  }, [mistake, setMistake, setAllMistakes, allMistakes]);

  useEffect(() => {
    if (images.length === 5) {
      setGameEnd(true);
      var element = document.getElementById(
        "my-modal"
      ) as HTMLInputElement | null;
      if (element) {
        element.checked = true;
      }
    }
  }, [images]);

  return (
    <div>
      <Timer setGameTime={setTime} start={startGame} stop={gameEnd} />
      {allMistakes && <div>{allMistakes.length + " klaidos(-ų)"}</div>}
      {mainImage && (
        <div style={{ ...style }}>
          <img
            src={"data:image/jpeg;base64," + mainImage.contentResized}
            alt=""
            width={"200px"}
          />
        </div>
      )}
      <div style={{ overflow: "hidden", clear: "both" }}>
        <ThinkingMapElement />
        <ThinkingMapElement />
        <ThinkingMapElement />
        <ThinkingMapElement />
        <ThinkingMapElement />
        <ThinkingMapElement />
      </div>
      <div style={{ overflow: "hidden", clear: "both" }}>
        {images.map((image) => {
          return (
            <Image
              id={image.id}
              name={image.title.toLocaleUpperCase()}
              content={image.contentResized}
              correct={image.isCorrect}
              setUpdateImages={setUpdateImages}
              setSelectedImageId={setSelectedImageId}
              setMistake={setMistake}
            />
          );
        })}
      </div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Šaunu! Tau pavyko!</h3>
          <div className="modal-action">
            <label
              htmlFor={"my-modal"}
              className="btn"
              onClick={() => {
                navigate(routes.mainPage);
              }}
            >
              Baigti
            </label>
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-start" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Labas! Ar tu pasiruošęs?</h3>
          <div className="modal-action">
            <label
              htmlFor={"my-modal-start"}
              className="btn"
              onClick={() => {
                setOpenStartModal(false);
                setStartGame(true);
              }}
            >
              Pradėti
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
