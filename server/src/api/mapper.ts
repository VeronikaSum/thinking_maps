import { SimilarWord, SimilarWordsResponseType } from "./apiTypes";

export const similarWordsMapper = (data: SimilarWordsResponseType[]) => data.map((entry: SimilarWordsResponseType): SimilarWord => ({
    word: entry.word,
    score: entry.score,
    frequency: entry.tags[0].substring(2),
}
))
