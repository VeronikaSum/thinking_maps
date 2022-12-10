import http from "../Common/http-common";

class ThinkingMapService {

    async postThinkingMap(request: FormData) {
        const url = `/thinking-map`
        return http.post(url, request, {
            data: request,
            headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => { return res.data })
    }
}

export default new ThinkingMapService();