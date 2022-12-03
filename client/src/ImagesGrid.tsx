import axios from 'axios';
import { useState } from 'react';
import { ImageItemInformationResponse, imageResponse } from './Types';

interface ImagesGridProps {
    word: string,
}

type ImageInformation = {
    title: string,
    thumbnailLink: string,
    link: string,
    displayLink: string,
    height: number,
    width: number,
}

function ImagesGrid({ word }: ImagesGridProps) {

    const [images, setImages] = useState<ImageInformation[]>([]);

    const mapper = (data: ImageItemInformationResponse[]) => data.map((entry: ImageItemInformationResponse): ImageInformation => ({
        title: entry.title,
        thumbnailLink: entry.image.thumbnailLink,
        height: entry.image.thumbnailHeight,
        width: entry.image.thumbnailWidth,
        link: entry.link,
        displayLink: entry.displayLink,
    }
    ))


    const searchImages = () => {
        // //Iškelt cx
        // axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyD2sAmVstEK0SyHQOEqLPYnkKdvq4BvBkc&q=${word}&num=10&safe=high&cx=d5088021f995c413e&searchType=image&rights=cc_publicdomain&alt=json`)
        //     .then(res => {
        //         console.log(res)
        //     })

        setImages(mapper(imageResponse.data.items))
    }

    return (
        <>
            <button value='Ieškoti' onClick={searchImages} />
            {
                images?.map((image: ImageInformation) => {
                    return <img src={image.thumbnailLink} />
                })
            }
        </>
    )

}

export default ImagesGrid;