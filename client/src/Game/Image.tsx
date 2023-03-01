import type { CSSProperties, FC } from "react";
import { useDrag } from "react-dnd";
import { ImageTypes } from "./ImageTypes";

const style: CSSProperties = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
};

export interface ImageProps {
  name: string;
  content: string;
  correct: boolean;
}

interface DropResult {
  name: string;
}

export const Image: FC<ImageProps> = function Image({
  name,
  content,
  correct,
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: correct ? ImageTypes.CORRECT : ImageTypes.INCORRRECT,
    item: { name, type: correct ? ImageTypes.CORRECT : ImageTypes.INCORRRECT },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult && item.type === ImageTypes.CORRECT) {
        alert(`CORRECT You dropped ${item.name} into ${dropResult.name}!`);
      }

      if (item && dropResult && item.type === ImageTypes.INCORRRECT) {
        alert(`INCORRECT You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} style={{ ...style }} data-testid={`image`}>
      {name}
      <img
        ref={drag}
        src={"data:image/jpeg;base64," + content}
        alt=""
        width={"200px"}
        style={{ opacity }}
      />
    </div>
  );
};
