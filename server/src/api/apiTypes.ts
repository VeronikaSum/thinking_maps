import { SearchWordType } from "src/Types"

export type SearchWordRequest = {
    searchWord: string,
    searchWordType: SearchWordType
}

export type ImageRequest = {
    mainWord: string,
    keywords: string[],
}

export type SimilarWordsResponseType = {
    word: string,
    tags: string[],
    score: number,
}

export type SimilarWord = {
    word: string,
    frequency: string,
    score: number,
}

export type ImageItemInformationResponse = {
    kind: string,
    title: string,
    htmlTitle: string,
    link: string,
    displayLink: string,
    snippet: string,
    htmlSnippet: string,
    mime: string,
    fileFormat: string,
    image: Image,
}

type Image = {
    contextLink: string,
    height: number,
    width: number,
    byteSize: number,
    displayLink: string,
    thumbnailLink: string,
    thumbnailHeight: number,
    thumbnailWidth: number,
}

export type ImageInformation = {
    searchWord: string,
    title: string,
    thumbnailLink: string,
    displayLink: string,
    height: number,
    width: number,
}