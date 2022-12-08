import { SimilarWord } from "../Types";

interface TableProps {
    headers: string[],
    data: SimilarWord[],
}

function Table({ headers, data }: TableProps) {
    return (<>
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>{headers[0]}</th>
                        <th>{headers[1]}</th>
                        <th>{headers[2]}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((entry: SimilarWord) => {
                            return (
                                <tr key={entry.word + entry.score}>
                                    <td>{entry.word.toLowerCase()}</td>
                                    <td>{entry.score}</td>
                                    <td>{entry.frequency}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div></>)
}

export default Table;