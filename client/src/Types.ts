export type SearchWordRequest = {
    searchWord: string,
}

export type GenerateMapRequest = {
    mapTitle: string,
    mainWord: string,
}

export type Similar = {
    word: string,
    frequency: string,
    score: number,
}

export type SimilarWord = {
    id: string,
    word: string,
    frequency: string,
    score: number,
    checked: boolean,
}

export type CheckedItem = {
    id: string,
    canBeDeleted: boolean,
    word: string,
    image?: File,
}

export type ThinkingMapEntity = {
    id: number,
    title: string,
    mainWord: string,
    createdAt: string,
    content: string,
}