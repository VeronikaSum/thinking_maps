import { useState } from "react";
import Form from "../Components/Form";
import Table from "../Components/Table";
import ApiService from "../Services/ApiService";
import { SearchWordRequest, SimilarWord } from "../Types";

function MainPage() {

    const [similarWords, setSimilarWords] = useState<SimilarWord[]>([]);

    const onSubmit = async (data: SearchWordRequest) => {
        console.log(data)
        await ApiService.getSimilarWords(data).then(res => { setSimilarWords(res) });
    }

    return (
        <>
            <Form onSubmit={onSubmit} />
            {
                similarWords.length !== 0 && (
                    <Table headers={['Žodis', 'Įvertis', 'Dažnumas']} data={similarWords} />
                )
            }

        </>
    )

}

export default MainPage;