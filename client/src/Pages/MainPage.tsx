import { useEffect, useState } from "react";
import Form from "../Components/Form";
import Table from "../Components/Table";
import ImagesGrid from "../ImagesGrid";
import { ImageInformation, ImageRequest, SearchWordRequest, Similar, similar, SimilarWord } from "../Types";
import ApiService from "../Services/ApiService";
import Navbar from "../Components/Navbar";

function MainPage() {

    const [similarWords, setSimilarWords] = useState<SimilarWord[]>([]);
    const [images, setImages] = useState<ImageInformation[]>([]);
    const [mainWord, setMainWord] = useState('');
    const [b64, setb64] = useState(null);

    const onSubmit = async (data: SearchWordRequest) => {

        const map = (data: Similar[]) => data.map((itemSimilarWord, index) => ({
            id: index,
            ...itemSimilarWord,
            checked: false,
        }));

        setSimilarWords(map(similar.data));
        setMainWord(data.searchWord)

        // console.log(similarWords)

        // await ApiService.getSimilarWords(data)
        //     .then(res => {
        //         setSimilarWords(res);
        //         setMainWord(data.searchWord)
        //     });
    }

    useEffect(() => {
        if (similarWords.length !== 0) {
            const keywords: string[] = [];
            console.log(similarWords)
            similarWords.slice(0, 6).forEach(word => keywords.push(word.word));
            const imageRequest: ImageRequest = {
                mainWord: mainWord,
                keywords: keywords
            }
            ApiService.getImagesByKeywords(imageRequest).then(res => setImages(res));
        }
    }, [similarWords])

    useEffect(() => {
        if (images.length !== 0) {
            const links: string[] = []
            images.forEach(image => links.push(image.thumbnailLink))
            ApiService.generateMapImages(links).then(res => setb64(res));
        }
    }, [images])

    return (
        <div className='bg-gradient-to-r from-purple-200 min-h-screen pb-16'>
            <Navbar />
            <Form onSubmit={onSubmit} />
            {
                similarWords.length !== 0 && (
                    <Table data={similarWords} />
                )
            }

            {
                images.length !== 0 && (
                    <ImagesGrid data={images} />
                )
            }

            {b64 !== null &&
                (< img src={b64} />)
            }
        </div>
    )

}

export default MainPage;