import { useEffect, useState } from "react";
import { CheckedItem, SimilarWord } from "../Types";

interface TableProps {
    data: SimilarWord[],
}

function Table({ data }: TableProps) {
    const [checkedItems, setCheckedItems] = useState<CheckedItem[]>([]);
    const [checkedItem, setCheckedItem] = useState<SimilarWord | null>(null)

    // useEffect(() => {
    //     if (checkedItem) {
    //         if (checkedItem.checked) {
    //             setCheckedItems([...checkedItems, {
    //                 id: checkedItem.id,
    //                 word: checkedItem.word,
    //                 checked: checkedItem.checked,
    //                 image: null,
    //             }])
    //         } else {
    //             setCheckedItems(checkedItems.filter((item) =>
    //                 item.id !== checkedItem.id))
    //         }
    //         setCheckedItem(null);
    //     }
    // }, [checkedItem])

    const selectItem = (entry: SimilarWord) => {
        setCheckedItems([...checkedItems, {
            id: entry.id,
            word: entry.word,
            checked: entry.checked,
            image: null,
        }])

    }

    const removeItem = (id: number) => {
        setCheckedItems(checkedItems.filter((item) =>
            item.id !== id))

    }

    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="h-96 overflow-y-auto">
                <table className="table mx-auto w-max">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Siūlomi žodžiai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((entry: SimilarWord) => {
                                return (
                                    <tr key={entry.word + entry.score} onClick={() => {
                                        selectItem(entry)
                                    }}>
                                        <td>{entry.id + 1}</td>
                                        <td>{entry.word.toLowerCase()}</td>
                                        {/* <td><input type="checkbox" checked={entry.checked} onChange={() => {
                                            entry.checked = !entry.checked;
                                            setCheckedItem(entry);
                                        }} className="checkbox" /></td> */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div>
                {checkedItems.map((item: CheckedItem) => {
                    return (
                        <>
                            <div className="ml-8 form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Pridėkite paveiksliuką žodžiui {item.word}</span>
                                    <svg onClick={() => removeItem(item.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                    </svg>

                                </label>
                                <input type="file" className="file-input file-input-sm file-input-bordered w-full max-w-xs" />

                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default Table;