import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import Table from './Table';
import { SimilarWord, ResponseType as ResponseType, json, responseAdjectiveBig } from './Types';
import ImagesGrid from './ImagesGrid';

function TextInput() {
    const { register, handleSubmit } = useForm();
    const [similarWords, setSimilarWords] = useState<SimilarWord[]>([]);

    const mapper = (data: ResponseType[]) => data.map((entry: ResponseType): SimilarWord => ({
        word: entry.word,
        score: entry.score,
        frequency: entry.tags[0].substring(2),
    }
    ))

    const onSubmit = (data: any) => {
        // if (data.wordType === 'noun') {
        //     console.log('Dailtavardis')
        //     axios.get(`https://api.datamuse.com/words?rel_jjb=${data.word}&max=25&md=f`)
        //         .then(res => {
        //             const { data } = res;

        //             const array: SimilarWord[] = mapper(data);
        //             array.sort(function (a, b) { return +b.frequency - +a.frequency })
        //             setSimilarWords(array)
        //         })
        // } else {
        //     console.log('Būdvardis')
        //     axios.get(`https://api.datamuse.com/words?rel_jja=${data.word}&max=25&md=f`)
        //         .then(res => {
        //             const { data } = res;
        //             const array: SimilarWord[] = mapper(data);
        //             array.sort(function (a, b) { return +b.frequency - +a.frequency })
        //             setSimilarWords(array)
        //         })
        // }

        const array: SimilarWord[] = mapper(responseAdjectiveBig);
        array.sort(function (a, b) { return +b.frequency - +a.frequency })
        setSimilarWords(array)
        console.log(similarWords)


        // const array: SimilarWord[] = mapper(json);
        // array.sort(function (a, b) { return +b.frequency - +a.frequency })
        // setSimilarWords(array)
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <select defaultValue="noun" {...register("wordType", {})}>
                        <option value="noun">Daiktavardis</option>
                        <option value="adjective">Būdvardis</option>
                    </select>
                </div>
                <div>
                    <input type="text" placeholder="Žodis" {...register("word", {})} />
                </div>
                <input type="submit" />
            </form>
            {
                similarWords.length != 0 && (<Table headers={['Žodis', 'Įvertis', 'Dažnumas']} data={similarWords} />)
            }
            <ImagesGrid word='happy+cow' />
        </>
    );
}

export default TextInput;