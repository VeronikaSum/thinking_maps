import { useState } from "react";
import Form from "../Components/Form";
import Table from "../Components/Table";
import { SearchWordRequest, Similar, SimilarWord } from "../Types";
import ApiService from "../Services/ApiService";
import Navbar from "../Components/Navbar";
import { v4 as uuid } from 'uuid';

function MainPage() {

    const [similarWords, setSimilarWords] = useState<SimilarWord[]>([]);
    const [mainWord, setMainWord] = useState('');

    const onSubmit = async (data: SearchWordRequest) => {
        const map = (data: Similar[]) => data.map((itemSimilarWord) => ({
            id: uuid(),
            ...itemSimilarWord,
            checked: false,
        }));

        await ApiService.getSimilarWords(data)
            .then(res => {
                setSimilarWords(map(res));
                setMainWord(data.searchWord)
            });
    }

    return (
        <div className='bg-gradient-to-r from-purple-200 min-h-screen pb-16'>
            <Navbar />
            <h1 className="text-center text-3xl font-bold mt-0 mb-6">Apibūdinimas – burbulo žemėlapis</h1>
            <Form onSubmit={onSubmit} />
            {
                similarWords.length !== 0 && (
                    <Table data={similarWords} word={mainWord} />
                )
            }
        </div>

    )

}

export default MainPage;