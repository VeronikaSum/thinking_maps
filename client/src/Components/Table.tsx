import { useEffect, useState } from "react";
import { CheckedItem, GenerateMapRequest, SimilarWord, ThinkingMapEntity } from "../Types";
import { v4 as uuid } from 'uuid';
import ThinkingMapService from "../Services/ThinkingMapService";

interface TableProps {
    data: SimilarWord[],
    word: string,
}

function Table({ data, word }: TableProps) {

    const mainWord: CheckedItem = {
        id: uuid(),
        word: word,
        canBeDeleted: false,
    }

    const [checkedItems, setCheckedItems] = useState<CheckedItem[]>([mainWord]);
    const [inputValue, setInputValue] = useState('');
    const [thinkingMap, setThinkingMap] = useState<ThinkingMapEntity | null>(null)
    const [isFilesUploading, setIsFilesUploading] = useState<boolean>(false);

    async function handleChange(event: React.ChangeEvent<HTMLInputElement>, checkedItem: CheckedItem) {
        if (event.target.files !== null && event.target.files[0] !== null) {
            setCheckedItems(checkedItems.map(item => {
                if (event.target.files != null && item.id === checkedItem.id) {
                    setIsFilesUploading(true)
                    return { ...item, image: event.target.files[0] };
                }
                return item;
            }));
        }
    }

    useEffect(() => {
        setIsFilesUploading(false)
    }, [checkedItems])


    const selectItem = (entry: SimilarWord) => {
        setCheckedItems([...checkedItems, {
            id: entry.id,
            word: entry.word,
            canBeDeleted: true,
        }])

    }

    const addNewItem = (value: string) => {
        if (inputValue !== '') {
            setCheckedItems([...checkedItems, {
                id: uuid(),
                word: value,
                canBeDeleted: true,
            }])
            setInputValue('')
        }

    }

    const removeItem = (id: string) => {
        setCheckedItems(checkedItems.filter((item) =>
            item.id !== id))

    }

    const generateMap = () => {
        const request: GenerateMapRequest = {
            mapTitle: 'Test',
            mainWord: word,
        }

        var formData = new FormData();
        formData.append('request', JSON.stringify(request));

        checkedItems.forEach(async (item: CheckedItem) => {
            if (item.image && item.image !== null) {
                formData.append(`images`, item.image, item.word)
            }
            return formData;
        })
        ThinkingMapService.postThinkingMap(formData).then(data => {
            setThinkingMap(data)
        });
        
    }

    return (
        <><div className="grid grid-cols-2 gap-2">
            <div className="mx-auto">
                <input value={inputValue} onInput={e => setInputValue(e.currentTarget.value)} type="text" placeholder="Įveskite savo žodį" className="input input-bordered w-full max-w-xs mb-2" />
                <button onClick={() => {
                    addNewItem(inputValue);
                }} className="btn w-full mb-4">Įvesti</button>
                <div className="h-80 overflow-y-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Siūlomi žodžiai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((entry: SimilarWord) => {
                                return (
                                    <tr key={entry.id} onClick={() => {
                                        selectItem(entry);
                                    }}>
                                        <td>{entry.word.toLowerCase()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                {checkedItems.map((item: CheckedItem) => {
                    return (
                        <>
                            <div className="ml-8 form-control">
                                <label className="label">
                                    <span className="label-text .justify-start text-lg	">Pridėkite paveiksliuką žodžiui <span className="font-bold">{item.word.toUpperCase()}</span></span>
                                    {item.canBeDeleted &&
                                        (<svg onClick={() => removeItem(item.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                        </svg>
                                        )}
                                </label>
                                <input onChange={(e) => { handleChange(e, item); }} type="file" accept="image/*" className="file-input file-input-sm file-input-bordered w-full max-w-xs" />
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
            <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
                <button disabled={checkedItems.filter(item => !!item.image).length < 7 &&  !isFilesUploading} className="btn" onClick={() => { generateMap(); }}>Generuoti žemėlapį</button>
                {thinkingMap !== null && (
                    <img src={thinkingMap.content} />
                )}
            </div></>
    )
}

export default Table;