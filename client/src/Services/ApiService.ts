import { ImageRequest, SearchWordRequest } from "../Types";
import http from "../Common/http-common";
import qs from "qs";

class ApiService {
    async getSimilarWords(request: SearchWordRequest) {
        const url = `api/words`
        return http.get(url, {
            params: {
                searchWord: request.searchWord,
                searchWordType: request.searchWordType
            }
        }).then((res) => { return res.data })
    }

    async getImagesByKeywords(request: ImageRequest) {
        const url = 'api/images';
        return []
        return http.get(url, {
            params: {
                ...request
            }
        }).then((res) => { return res.data })
    }

    async generateMapImages(links: string[]) {
        const url = 'api/map';
        return http.get(url, {
            params: {
                links: links
            }
        },
        ).then((res) => { return res.data })
    }
}

export default new ApiService();