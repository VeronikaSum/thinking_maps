import { ImageInformation, ImageItemInformationResponse, SimilarWord, SimilarWordsResponseType } from "./apiTypes";

export const similarWordsMapper = (data: SimilarWordsResponseType[]) => data.map((entry: SimilarWordsResponseType): SimilarWord => ({
    word: entry.word,
    score: entry.score,
    frequency: entry.tags[0].substring(2),
}
))

export const imageMapper = (data: ImageItemInformationResponse[], keyword: string) => data.map((entry: ImageItemInformationResponse): ImageInformation => ({
    searchWord: keyword,
    title: entry.title,
    thumbnailLink: entry.image.thumbnailLink,
    height: entry.image.thumbnailHeight,
    width: entry.image.thumbnailWidth,
}
))