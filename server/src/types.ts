export type MapElement = {
    word: string,
    image: FormData,
}

export type GenerateMapRequest = {
    mapTitle: string,
    mainWord: string,
    selectedWords: string[]
}

export type ImageType = {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}