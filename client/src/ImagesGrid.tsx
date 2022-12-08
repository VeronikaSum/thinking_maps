import { ImageInformation } from "./Types";

interface ImagesGridProps {
    data: ImageInformation[],
}

function ImagesGrid({ data }: ImagesGridProps) {
    console.log(data)
    return (
        <>
            {
                data.map((image: ImageInformation) => {
                    return <>
                        {image.searchWord}
                        <img src={image.thumbnailLink} />
                    </>
                })
            }
        </>
    )

}

export default ImagesGrid;