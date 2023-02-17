import { SetStateAction, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { CheckedItem } from "../Types";

interface WordAndImageSelectionProps {
  header: string;
  placeholder: string;
  setAddedItems: SetStateAction<any>;
  setUploadCompleted: SetStateAction<any>;
  mainWord?: CheckedItem;
}

export default function WordAndImageSelection({
  header,
  placeholder,
  setAddedItems,
  setUploadCompleted,
  mainWord,
}: WordAndImageSelectionProps) {
  const [checkedItems, setCheckedItems] = useState<CheckedItem[]>(
    mainWord ? [mainWord] : []
  );

  const maxProgressValue = mainWord ? 7 : 5;

  const [progressValue, setProgressValue] = useState<number>(0);

  const [inputValue, setInputValue] = useState("");
  const [isFilesUploading, setIsFilesUploading] = useState<boolean>(false);

  async function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    checkedItem: CheckedItem
  ) {
    if (event.target.files !== null && event.target.files[0] !== null) {
      setCheckedItems(
        checkedItems.map((item) => {
          if (event.target.files != null && item.id === checkedItem.id) {
            setIsFilesUploading(true);
            return { ...item, image: event.target.files[0] };
          }
          return item;
        })
      );
    }
  }

  useEffect(() => {
    setIsFilesUploading(false);
    setAddedItems(checkedItems);
    setUploadCompleted(isFilesUploading);
    setProgressValue(checkedItems.filter((item) => item.image).length);
  }, [checkedItems]);

  const addNewItem = (value: string) => {
    if (inputValue !== "") {
      setCheckedItems([
        ...checkedItems,
        {
          id: uuid(),
          word: value,
          canBeDeleted: true,
        },
      ]);
      setInputValue("");
    }
  };

  const removeItem = (id: string) => {
    setCheckedItems(checkedItems.filter((item) => item.id !== id));
  };

  return (
    <div className="card max-w-full bg-base-100 shadow-xl">
      <h1 className="text-center text-2xl font-bold mt-6 mb-6">{header}</h1>
      <progress
        className="progress progress-success w-56 justify-center flex flex-wrap"
        value={progressValue}
        max={maxProgressValue}
      />
      <div className="grid grid-cols-2 gap-2">
        <div className="mx-auto mt-2">
          <input
            value={inputValue}
            onInput={(e) => setInputValue(e.currentTarget.value)}
            type="text"
            placeholder={placeholder}
            className="input input-bordered w-full max-w-xs mb-2"
          />
          <button
            onClick={() => {
              addNewItem(inputValue);
            }}
            disabled={checkedItems.length === maxProgressValue}
            className="btn w-full mb-4"
          >
            Įvesti
          </button>
        </div>
        <div>
          {checkedItems.map((item: CheckedItem) => {
            return (
              <>
                <div className="ml-8 form-control">
                  <label className="label">
                    <span className="label-text .justify-start text-lg	">
                      Pridėkite paveiksliuką žodžiui{" "}
                      <span className="font-bold">
                        {item.word.toUpperCase()}
                      </span>
                    </span>
                    {item.canBeDeleted && (
                      <svg
                        onClick={() => removeItem(item.id)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    )}
                  </label>
                  <input
                    onChange={(e) => {
                      handleChange(e, item);
                    }}
                    type="file"
                    accept="image/*"
                    className="file-input file-input-sm file-input-bordered w-full max-w-xs"
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
