import { SearchWordRequest } from "../Types";
import http from "../Common/http-common";

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
}

export default new ApiService();