import { CSSProperties, FC, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { ImageGameResponse, ImageTypes } from "./ImageTypes";
import { Image } from "./Image";

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

export const ThinkingMapElement: FC = () => {
  const addImageToMap = (item: ImageGameResponse) => {
    if (item.correct) {
      setImage(item);
    }
  };

  const [image, setImage] = useState<ImageGameResponse | undefined>(undefined);
  const [occupied, setOccupied] = useState(false);
  const [{ canDrop, isOver, item }, dropTarget] = useDrop(
    () => ({
      accept: [ImageTypes.CORRECT, ImageTypes.INCORRRECT],
      drop: (item: any) => addImageToMap(item),
      canDrop: () => !occupied,
      collect: (monitor) => ({
        monitor: monitor,
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        item: monitor.getItem(),
      }),
    }),
    [occupied]
  );

  useEffect(() => {
    if (image && image.correct) {
      setOccupied(true);
    }
  }, [image]);

  const isActive = canDrop && isOver;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }

  return (
    <div
      ref={dropTarget}
      style={{ ...style, backgroundColor }}
      data-testid="thinking_map"
    >
      {image && image.correct && (
        <img
          src={"data:image/jpeg;base64," + image.contentResized}
          alt=""
          width={"200px"}
        />
      )}
    </div>
  );
};
