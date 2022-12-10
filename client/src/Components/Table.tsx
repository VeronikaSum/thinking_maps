import { useState } from "react";
import { CheckedItem, GenerateMapRequest, SimilarWord, ThinkingMapEntity } from "../Types";
import { v4 as uuid } from 'uuid';
import ThinkingMapService from "../Services/ThinkingMapService";
import Resizer from "react-image-file-resizer";

interface TableProps {
    data: SimilarWord[],
    word: string,
}

function Table({ data, word }: TableProps) {

    const mainWord: CheckedItem = {
        id: uuid(),
        word: word,
        canBeDeleted: false,
        image: null,
    }

    const [checkedItems, setCheckedItems] = useState<CheckedItem[]>([mainWord]);
    const [inputValue, setInputValue] = useState('');
    const [file, setFile] = useState<File>()
    const [thinkingMap, setThinkingMap] = useState<ThinkingMapEntity | null>(null)
    const [open, setOpen] = useState(false)

    async function handleChange(event: React.ChangeEvent<HTMLInputElement>, checkedItem: CheckedItem) {
        if (event.target.files !== null && event.target.files[0] !== null) {
            setFile(event.target.files[0])
            if (file) {
                setCheckedItems(checkedItems.map(item => {
                    if (item.id === checkedItem.id) {
                        return { ...item, image: file };
                    }

                    return item;
                }));
            }
        }
    }

    const selectItem = (entry: SimilarWord) => {
        setCheckedItems([...checkedItems, {
            id: entry.id,
            word: entry.word,
            canBeDeleted: true,
            image: null,
        }])

    }


    const addNewItem = (value: string) => {
        if (inputValue !== '') {
            setCheckedItems([...checkedItems, {
                id: uuid(),
                word: value,
                canBeDeleted: true,
                image: null,
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

        checkedItems.forEach((item: CheckedItem) => {
            if (item.image !== null) {
                console.log(item.image)
                formData.append(`images`, item.image, item.word)
            }
            return formData;
        })
        ThinkingMapService.postThinkingMap(formData).then(data => {
            console.log(data)
            setThinkingMap(data)
        });
        console.log(thinkingMap)
    }

    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="mx-auto">
                <input value={inputValue} onInput={e => setInputValue(e.currentTarget.value)} type="text" placeholder="Įveskite savo žodį" className="input input-bordered w-full max-w-xs mb-2" />
                <button onClick={() => {
                    addNewItem(inputValue)
                }} className="btn w-full mb-4">Įvesti</button>
                <div className="h-80 overflow-y-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Siūlomi žodžiai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((entry: SimilarWord) => {
                                    return (
                                        <tr key={entry.id} onClick={() => {
                                            selectItem(entry)
                                        }}>
                                            <td>{entry.word.toLowerCase()}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                {checkedItems.map((item: CheckedItem) => {
                    return (
                        <>
                            <div className="ml-8 form-control w-full">
                                <label className="label">
                                    <span className="label-text text-lg	">Pridėkite paveiksliuką žodžiui <span className="font-bold">{item.word.toUpperCase()}</span></span>
                                    {item.canBeDeleted &&
                                        (<svg onClick={() => removeItem(item.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                        </svg>
                                        )}
                                </label>
                                <input onChange={(e) => { handleChange(e, item) }} type="file" accept="image/*" className="file-input file-input-sm file-input-bordered w-full max-w-xs" />
                            </div>
                        </>
                    )
                })}
                <button onClick={() => { generateMap() }}>Generuoti žemėlapį</button>
            </div>
            {thinkingMap !== null && (
                <img src={thinkingMap.content} />
            )}
        </div>
    )
}

export default Table;