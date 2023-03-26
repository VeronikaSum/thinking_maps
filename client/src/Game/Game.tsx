import { FC, useEffect, useRef, useState } from "react";
import { ThinkingMapElement } from "./ThinkingMap";
import { Image } from "./Image";
import GameService from "../Services/GameService";
import { GameResponse, ImageResponse, Time } from "../Types";
import ImageService from "../Services/ImageService";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../Common/routes";
import { Timer } from "./Timer";
import $ from "jquery";

function shuffleArray(array: []) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

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
  const [size, setSize] = useState<string | undefined>(undefined);
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

  const divRef = useRef(null);
  const [width, setWidth] = useState<number | undefined>(0);

  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        setWidth($("#game-window").width());
        if (width) {
          $("#game-window").height(width);
          setSize(((width * 240) / 1000).toFixed(0));
        }
        console.log(width);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [width, size]);

  return (
    <>
      <Timer setGameTime={setTime} start={startGame} stop={gameEnd} />
      {allMistakes && <div>{allMistakes.length + " klaidos(-ų)"}</div>}
      <div className="card card-side">
        <div
          id="game-window"
          ref={divRef}
          className="bg-contain bg-[url('../resources/bubble-map.jpg')] bg-no-repeat w-[1000px] h-[1000px] ml-4 mr-4"
        >
          {size && width && mainImage && (
            <>
              <div
                className={`relative`}
                style={{
                  height: `${size}px`,
                  width: `${size}px`,
                  top: `${((width * 30) / 1000).toFixed(0)}px`,
                  left: `${(
                    (width * (width / 2 - parseInt(size) / 2)) /
                    width
                  ).toFixed(0)}px`,
                }}
              >
                <ThinkingMapElement size={size} />
              </div>
              <div
                className={`relative`}
                style={{
                  height: `${size}px`,
                  width: `${size}px`,
                  left: `${((width * 30) / 1000).toFixed(0)}px`,
                  bottom: `${((width * 40) / 1000).toFixed(0)}px`,
                }}
              >
                <ThinkingMapElement size={size} />
              </div>
              <div
                className={`relative`}
                style={{
                  height: `${size}px`,
                  width: `${size}px`,
                  left: `${((width * 730) / 1000).toFixed(0)}px`,
                  bottom: `${((width * 280) / 1000).toFixed(0)}px`,
                }}
              >
                <ThinkingMapElement size={size} />
              </div>

              <div
                className={`relative`}
                style={{
                  height: `${size}px`,
                  width: `${size}px`,
                  left: `${((width * 395) / 1000).toFixed(0)}px`,
                  bottom: `${((width * 325) / 1000).toFixed(0)}px`,
                }}
              >
                <img
                  src={"data:image/jpeg;base64," + mainImage.contentResized}
                  alt=""
                  className="rounded-[100px]"
                  width={"200px"}
                  height={`${size}`}
                />
              </div>

              <div
                className={`relative`}
                style={{
                  height: `${size}px`,
                  width: `${size}px`,
                  left: `${((width * 30) / 1000).toFixed(0)}px`,
                  bottom: `${((width * 400) / 1000).toFixed(0)}px`,
                }}
              >
                <ThinkingMapElement size={size} />
              </div>
              <div
                className={`relative`}
                style={{
                  height: `${size}px`,
                  width: `${size}px`,
                  left: `${((width * 730) / 1000).toFixed(0)}px`,
                  bottom: `${((width * 640) / 1000).toFixed(0)}px`,
                }}
              >
                <ThinkingMapElement size={size} />
              </div>
              <div
                className={`relative`}
                style={{
                  height: `${size}px`,
                  width: `${size}px`,
                  left: `${((width * 380) / 1000).toFixed(0)}px`,
                  bottom: `${((width * 710) / 1000).toFixed(0)}px`,
                }}
              >
                <ThinkingMapElement size={size} />
              </div>
            </>
          )}
        </div>
        <div className="w-1/3">
          <div>
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
    </>
  );
};
