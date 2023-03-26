import { CSSProperties, FC, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { ImageGameResponse, ImageTypes } from "./ImageTypes";

interface ThinkingMapElementProps {
  size: string | undefined;
}

export function ThinkingMapElement({ size }: ThinkingMapElementProps) {
  const style: CSSProperties = {
    height: `${size}px`,
    width: `${size}px`,
    color: "gray",
    borderRadius: "50%",
  };

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
    <div ref={dropTarget} style={{ ...style, backgroundColor }}>
      {image && image.correct && size && (
        <img
          className={`rounded-[50%] flex justify-center`}
          src={"data:image/jpeg;base64," + image.contentResized}
          width={`${parseInt(size)}px`}
        />
      )}
    </div>
  );
}
