export type SearchWordRequest = {
    searchWord: string,
    searchWordType: SearchWordType
}

export type ImageRequest = {
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
    thumbnailLink: string,
    thumbnailHeight: number,
    thumbnailWidth: number,
}

export type ImageInformation = {
    searchWord: string,
    title: string,
    thumbnailLink: string,
    height: number,
    width: number,
}

export enum SearchWordType {
    ADJECTIVE = 'adjective',
    NOUN = 'noun'
}











// export type SimilarWord = {
//     word: string,
//     frequency: string,
//     score: number,
// }

// export type ResponseType = {
//     word: string,
//     tags: string[],
//     score: number,
// }

// type Image = {
//     contextLink: string,
//     height: number,
//     width: number,
//     byteSize: number,
//     thumbnailLink: string,
//     thumbnailHeight: number,
//     thumbnailWidth: number,
// }

// export type ImageItemInformationResponse = {
//     kind: string,
//     title: string,
//     htmlTitle: string,
//     link: string,
//     displayLink: string,
//     snippet: string,
//     htmlSnippet: string,
//     mime: string,
//     fileFormat: string,
//     image: Image,
// }

// type Url = {
//     type: string,
//     template: string,
// }

// type Request = {
//     title: string,
//     totalResults: number,
//     searchTerms: string,
//     count: number,
//     startIndex: number,
//     inputEncoding: string,
//     outputEncoding: string,
//     safe: string,
//     cx: string,
//     rights: string,
//     searchType: string,

// }

// export type ImageItemResponse = {
//     kind: string,
//     url: Url,
//     queries: Request[],
//     nextPage: Request[],
//     context: any
//     searchInformation: any
//     spelling: any
//     items: ImageItemInformationResponse[],
//     status: number,
//     statusText: string,
//     headers: any,
//     config: any
//     request: any
// }

// export type ImageResponse = {
//     data: ImageItemResponse
// }

// export const imageResponse =
// {
//     "data": {
//         "kind": "customsearch#search",
//         "url": {
//             "type": "application/json",
//             "template": "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json"
//         },
//         "queries": {
//             "request": [
//                 {
//                     "title": "Google Custom Search - happy cow",
//                     "totalResults": "408000",
//                     "searchTerms": "happy cow",
//                     "count": 10,
//                     "startIndex": 1,
//                     "inputEncoding": "utf8",
//                     "outputEncoding": "utf8",
//                     "safe": "high",
//                     "cx": "d5088021f995c413e",
//                     "rights": "cc_publicdomain",
//                     "searchType": "image"
//                 }
//             ],
//             "nextPage": [
//                 {
//                     "title": "Google Custom Search - happy cow",
//                     "totalResults": "408000",
//                     "searchTerms": "happy cow",
//                     "count": 10,
//                     "startIndex": 11,
//                     "inputEncoding": "utf8",
//                     "outputEncoding": "utf8",
//                     "safe": "high",
//                     "cx": "d5088021f995c413e",
//                     "rights": "cc_publicdomain",
//                     "searchType": "image"
//                 }
//             ]
//         },
//         "context": {
//             "title": "nuotraukos"
//         },
//         "searchInformation": {
//             "searchTime": 0.780311,
//             "formattedSearchTime": "0.78",
//             "totalResults": "408000",
//             "formattedTotalResults": "408,000"
//         },
//         "spelling": {
//             "correctedQuery": "happycow",
//             "htmlCorrectedQuery": "<b><i>happycow</i></b>"
//         },
//         "items": [
//             {
//                 "kind": "customsearch#result",
//                 "title": "File:Happy Cow (19805268310).jpg - Wikimedia Commons",
//                 "htmlTitle": "File:<b>Happy Cow</b> (19805268310).jpg - Wikimedia Commons",
//                 "link": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Happy_Cow_%2819805268310%29.jpg",
//                 "displayLink": "commons.wikimedia.org",
//                 "snippet": "File:Happy Cow (19805268310).jpg - Wikimedia Commons",
//                 "htmlSnippet": "File:<b>Happy Cow</b> (19805268310).jpg - Wikimedia Commons",
//                 "mime": "image/jpeg",
//                 "fileFormat": "image/jpeg",
//                 "image": {
//                     "contextLink": "https://commons.wikimedia.org/wiki/File:Happy_Cow_(19805268310).jpg",
//                     "height": 1600,
//                     "width": 1067,
//                     "byteSize": 874586,
//                     "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwNuFhDrel2v0hdr74gUbDCaucwE-iFqSLlVkEUowTOXffJBGHGzum5w&s",
//                     "thumbnailHeight": 150,
//                     "thumbnailWidth": 100
//                 }
//             },
//             {
//                 "kind": "customsearch#result",
//                 "title": "HD wallpaper: happy, cow, field, farm, animal, smile, photogenic ...",
//                 "htmlTitle": "HD wallpaper: <b>happy</b>, <b>cow</b>, field, farm, animal, smile, photogenic ...",
//                 "link": "https://c0.wallpaperflare.com/preview/540/603/750/happy-cow-field-farm.jpg",
//                 "displayLink": "www.wallpaperflare.com",
//                 "snippet": "HD wallpaper: happy, cow, field, farm, animal, smile, photogenic ...",
//                 "htmlSnippet": "HD wallpaper: <b>happy</b>, <b>cow</b>, field, farm, animal, smile, photogenic ...",
//                 "mime": "image/jpeg",
//                 "fileFormat": "image/jpeg",
//                 "image": {
//                     "contextLink": "https://www.wallpaperflare.com/happy-cow-field-farm-animal-smile-photogenic-mountain-wallpaper-aetzn",
//                     "height": 595,
//                     "width": 910,
//                     "byteSize": 111401,
//                     "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRONMa0FfCZ2rPDF5Uzu7xrEqMsQtbm0wkFMnn_aLe5KfkrDmkQiWBCkEQ&s",
//                     "thumbnailHeight": 96,
//                     "thumbnailWidth": 147
//                 }
//             },
//             {
//                 "kind": "customsearch#result",
//                 "title": "File:Happy Cow (19805268310).jpg - Wikimedia Commons",
//                 "htmlTitle": "File:<b>Happy Cow</b> (19805268310).jpg - Wikimedia Commons",
//                 "link": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Happy_Cow_%2819805268310%29.jpg/320px-Happy_Cow_%2819805268310%29.jpg",
//                 "displayLink": "commons.wikimedia.org",
//                 "snippet": "File:Happy Cow (19805268310).jpg - Wikimedia Commons",
//                 "htmlSnippet": "File:<b>Happy Cow</b> (19805268310).jpg - Wikimedia Commons",
//                 "mime": "image/jpeg",
//                 "fileFormat": "image/jpeg",
//                 "image": {
//                     "contextLink": "https://commons.wikimedia.org/wiki/File:Happy_Cow_(19805268310).jpg",
//                     "height": 480,
//                     "width": 320,
//                     "byteSize": 61427,
//                     "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyPaNyP1Dm3LWICMWiLA1QevDufXs4p2ABUgyeoQqFQh0gCyKXMfr9V0&s",
//                     "thumbnailHeight": 129,
//                     "thumbnailWidth": 86
//                 }
//             },
//             {
//                 "kind": "customsearch#result",
//                 "title": "Color cartoon cow vector drawing | Free SVG",
//                 "htmlTitle": "Color cartoon <b>cow</b> vector drawing | Free SVG",
//                 "link": "https://freesvg.org/img/happy-cow.png",
//                 "displayLink": "freesvg.org",
//                 "snippet": "Color cartoon cow vector drawing | Free SVG",
//                 "htmlSnippet": "Color cartoon <b>cow</b> vector drawing | Free SVG",
//                 "mime": "image/png",
//                 "fileFormat": "image/png",
//                 "image": {
//                     "contextLink": "https://freesvg.org/color-cartoon-cow-vector-drawing",
//                     "height": 600,
//                     "width": 600,
//                     "byteSize": 61682,
//                     "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0tjUuEAnSlPFeo_ICGFr_Kjf7TZ9HDOjM8-RiCAEp4jL2w2zzND3qN7Jw&s",
//                     "thumbnailHeight": 135,
//                     "thumbnailWidth": 135
//                 }
//             },
//             {
//                 "kind": "customsearch#result",
//                 "title": "Free Images : grass, field, farm, meadow, pasture, grazing ...",
//                 "htmlTitle": "Free Images : grass, field, farm, meadow, pasture, grazing ...",
//                 "link": "https://get.pxhere.com/photo/grass-field-farm-meadow-animal-cow-cattle-pasture-grazing-livestock-mammal-agriculture-beef-grassland-vertebrate-mare-concerns-milk-cow-animal-husbandry-chew-the-cud-happy-cows-cattle-farming-dairy-cow-cattle-like-mammal-690207.jpg",
//                 "displayLink": "pxhere.com",
//                 "snippet": "Free Images : grass, field, farm, meadow, pasture, grazing ...",
//                 "htmlSnippet": "Free Images : grass, field, farm, meadow, pasture, grazing ...",
//                 "mime": "image/jpeg",
//                 "fileFormat": "image/jpeg",
//                 "image": {
//                     "contextLink": "https://pxhere.com/en/photo/690207",
//                     "height": 3000,
//                     "width": 4000,
//                     "byteSize": 4037811,
//                     "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStd-fShK28Brcnw17HdGI77s9B2lpI--zuvchvYeP-Iah6wJneiglFUQ4&s",
//                     "thumbnailHeight": 113,
//                     "thumbnailWidth": 150
//                 }
//             },
//             {
//                 "kind": "customsearch#result",
//                 "title": "File:Happy Cow (19805268310).jpg - Wikimedia Commons",
//                 "htmlTitle": "File:<b>Happy Cow</b> (19805268310).jpg - Wikimedia Commons",
//                 "link": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Happy_Cow_%2819805268310%29.jpg/160px-Happy_Cow_%2819805268310%29.jpg",
//                 "displayLink": "commons.wikimedia.org",
//                 "snippet": "File:Happy Cow (19805268310).jpg - Wikimedia Commons",
//                 "htmlSnippet": "File:<b>Happy Cow</b> (19805268310).jpg - Wikimedia Commons",
//                 "mime": "image/jpeg",
//                 "fileFormat": "image/jpeg",
//                 "image": {
//                     "contextLink": "https://commons.wikimedia.org/wiki/File:Happy_Cow_(19805268310).jpg",
//                     "height": 240,
//                     "width": 160,
//                     "byteSize": 17082,
//                     "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9n_zG6G98bk15D_-6CIoq1anhoV51NVEqx02eR5B5KTed5gxzLyw7&s",
//                     "thumbnailHeight": 110,
//                     "thumbnailWidth": 73
//                 }
//             },
//             {
//                 "kind": "customsearch#result",
//                 "title": "1049 Royalty-Free Happy Cow Photos, orientation: vertical | PickPik",
//                 "htmlTitle": "1049 Royalty-Free <b>Happy Cow</b> Photos, orientation: vertical | PickPik",
//                 "link": "https://i1.pickpik.com/photos/388/52/975/cow-funny-ruminant-cute-thumb.jpg",
//                 "displayLink": "www.pickpik.com",
//                 "snippet": "1049 Royalty-Free Happy Cow Photos, orientation: vertical | PickPik",
//                 "htmlSnippet": "1049 Royalty-Free <b>Happy Cow</b> Photos, orientation: vertical | PickPik",
//                 "mime": "image/jpeg",
//                 "fileFormat": "image/jpeg",
//                 "image": {
//                     "contextLink": "https://www.pickpik.com/search?q=Happy+Cow&orientation=vertical",
//                     "height": 300,
//                     "width": 200,
//                     "byteSize": 18505,
//                     "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUwFuo0GmPTmg1RHDK8Uif4xZ8_sXhy2bQSoPkKK_QcJaMzCHNF09f1Q&s",
//                     "thumbnailHeight": 116,
//                     "thumbnailWidth": 77
//                 }
//             },
//             {
//                 "kind": "customsearch#result",
//                 "title": "Free Images : grass, bird, wildlife, pasture, livestock, mammal ...",
//                 "htmlTitle": "Free Images : grass, bird, wildlife, pasture, livestock, mammal ...",
//                 "link": "https://get.pxhere.com/photo/grass-bird-wildlife-cow-cattle-pasture-livestock-mammal-agriculture-beef-fauna-cows-animals-vertebrate-herbivores-milk-cow-animal-husbandry-happy-cows-cattle-farming-537218.jpg",
//                 "displayLink": "pxhere.com",
//                 "snippet": "Free Images : grass, bird, wildlife, pasture, livestock, mammal ...",
//                 "htmlSnippet": "Free Images : grass, bird, wildlife, pasture, livestock, mammal ...",
//                 "mime": "image/jpeg",
//                 "fileFormat": "image/jpeg",
//                 "image": {
//                     "contextLink": "https://pxhere.com/en/photo/537218",
//                     "height": 3456,
//                     "width": 5184,
//                     "byteSize": 4703215,
//                     "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0zuLT8LfMe1b0rB4ndkYwXeBNC1oj7f500hcryeDkOqv-IgKElqR-fcY&s",
//                     "thumbnailHeight": 100,
//                     "thumbnailWidth": 150
//                 }
//             },
//             {
//                 "kind": "customsearch#result",
//                 "title": "8 Royalty-Free Happy Cow Photos | PickPik",
//                 "htmlTitle": "8 Royalty-Free <b>Happy Cow</b> Photos | PickPik",
//                 "link": "https://i0.pickpik.com/photos/213/468/15/happy-cows-beef-milk-cow-cows-thumb.jpg",
//                 "displayLink": "www.pickpik.com",
//                 "snippet": "8 Royalty-Free Happy Cow Photos | PickPik",
//                 "htmlSnippet": "8 Royalty-Free <b>Happy Cow</b> Photos | PickPik",
//                 "mime": "image/jpeg",
//                 "fileFormat": "image/jpeg",
//                 "image": {
//                     "contextLink": "https://www.pickpik.com/search?q=Happy+Cow",
//                     "height": 300,
//                     "width": 450,
//                     "byteSize": 40991,
//                     "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTSsbe-qtRDbJ3cQQ5LpZXQgwsFcwawFUCF0d3MDSejH2LzqP66ror&s",
//                     "thumbnailHeight": 85,
//                     "thumbnailWidth": 127
//                 }
//             },
//             {
//                 "kind": "customsearch#result",
//                 "title": "Happy Cow Day 2 Free Stock Photo - Public Domain Pictures",
//                 "htmlTitle": "<b>Happy Cow</b> Day 2 Free Stock Photo - Public Domain Pictures",
//                 "link": "https://www.publicdomainpictures.net/pictures/160000/nahled/happy-cow-day-2.jpg",
//                 "displayLink": "www.publicdomainpictures.net",
//                 "snippet": "Happy Cow Day 2 Free Stock Photo - Public Domain Pictures",
//                 "htmlSnippet": "<b>Happy Cow</b> Day 2 Free Stock Photo - Public Domain Pictures",
//                 "mime": "image/jpeg",
//                 "fileFormat": "image/jpeg",
//                 "image": {
//                     "contextLink": "https://www.publicdomainpictures.net/en/view-image.php?image=154116&picture=happy-cow-day-2",
//                     "height": 615,
//                     "width": 615,
//                     "byteSize": 102934,
//                     "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP4F-CUOLN0Iaih0uoesbGwM-knXh2LsXMoTTgk-X0mmthDitrVU0nFK8&s",
//                     "thumbnailHeight": 136,
//                     "thumbnailWidth": 136
//                 }
//             }
//         ]
//     },
//     "status": 200,
//     "statusText": "",
//     "headers": {
//         "cache-control": "private",
//         "content-encoding": "gzip",
//         "content-length": "2646",
//         "content-type": "application/json; charset=UTF-8",
//         "date": "Mon, 28 Nov 2022 21:56:28 GMT",
//         "server": "ESF",
//         "vary": "Origin, X-Origin, Referer"
//     },
//     "config": {
//         "transitional": {
//             "silentJSONParsing": true,
//             "forcedJSONParsing": true,
//             "clarifyTimeoutError": false
//         },
//         "adapter": [
//             "xhr",
//             "http"
//         ],
//         "transformRequest": [
//             null
//         ],
//         "transformResponse": [
//             null
//         ],
//         "timeout": 0,
//         "xsrfCookieName": "XSRF-TOKEN",
//         "xsrfHeaderName": "X-XSRF-TOKEN",
//         "maxContentLength": -1,
//         "maxBodyLength": -1,
//         "env": {},
//         "headers": {
//             "Accept": "application/json, text/plain, */*"
//         },
//         "method": "get",
//         "url": "https://www.googleapis.com/customsearch/v1?key=AIzaSyD2sAmVstEK0SyHQOEqLPYnkKdvq4BvBkc&q=happy+cow&num=10&safe=high&cx=d5088021f995c413e&searchType=image&rights=cc_publicdomain&alt=json"
//     },
//     "request": {}
// }

// export const json: ResponseType[] = [
//     {
//         "word": "old",
//         "score": 1001,
//         "tags": [
//             "f:298.550312"
//         ]
//     },
//     {
//         "word": "sacred",
//         "score": 1000,
//         "tags": [
//             "f:22.841006"
//         ]
//     },
//     {
//         "word": "milch",
//         "score": 999,
//         "tags": [
//             "f:0.327740"
//         ]
//     },
//     {
//         "word": "holy",
//         "score": 998,
//         "tags": [
//             "f:38.833910"
//         ]
//     },
//     {
//         "word": "good",
//         "score": 997,
//         "tags": [
//             "f:414.056577"
//         ]
//     },
//     {
//         "word": "red",
//         "score": 996,
//         "tags": [
//             "f:99.240438"
//         ]
//     },
//     {
//         "word": "white",
//         "score": 995,
//         "tags": [
//             "f:183.830588"
//         ]
//     },
//     {
//         "word": "black",
//         "score": 994,
//         "tags": [
//             "f:158.776520"
//         ]
//     },
//     {
//         "word": "dead",
//         "score": 993,
//         "tags": [
//             "f:74.610065"
//         ]
//     },
//     {
//         "word": "fat",
//         "score": 992,
//         "tags": [
//             "f:29.675867"
//         ]
//     },
//     {
//         "word": "young",
//         "score": 991,
//         "tags": [
//             "f:188.434680"
//         ]
//     },
//     {
//         "word": "single",
//         "score": 990,
//         "tags": [
//             "f:142.090553"
//         ]
//     },
//     {
//         "word": "poor",
//         "score": 989,
//         "tags": [
//             "f:102.777063"
//         ]
//     },
//     {
//         "word": "fresh",
//         "score": 988,
//         "tags": [
//             "f:36.115851"
//         ]
//     },
//     {
//         "word": "whole",
//         "score": 987,
//         "tags": [
//             "f:176.811200"
//         ]
//     },
//     {
//         "word": "big",
//         "score": 986,
//         "tags": [
//             "f:96.433467"
//         ]
//     },
//     {
//         "word": "wild",
//         "score": 985,
//         "tags": [
//             "f:35.295696"
//         ]
//     },
//     {
//         "word": "brown",
//         "score": 984,
//         "tags": [
//             "f:60.545354"
//         ]
//     },
//     {
//         "word": "sea",
//         "score": 983,
//         "tags": [
//             "f:87.002513"
//         ]
//     },
//     {
//         "word": "best",
//         "score": 982,
//         "tags": [
//             "f:191.929251"
//         ]
//     },
//     {
//         "word": "sick",
//         "score": 981,
//         "tags": [
//             "f:25.913114"
//         ]
//     },
//     {
//         "word": "fine",
//         "score": 980,
//         "tags": [
//             "f:69.643965"
//         ]
//     },
//     {
//         "word": "average",
//         "score": 979,
//         "tags": [
//             "f:87.986031"
//         ]
//     },
//     {
//         "word": "mad",
//         "score": 978,
//         "tags": [
//             "f:13.987331"
//         ]
//     },
//     {
//         "word": "pregnant",
//         "score": 977,
//         "tags": [
//             "f:12.692452"
//         ]
//     }
// ];

// export const responseAdjectiveBig: ResponseType[] = [
//     {
//         "word": "man",
//         "score": 1001,
//         "tags": [
//             "f:430.851569"
//         ]
//     },
//     {
//         "word": "business",
//         "score": 1000,
//         "tags": [
//             "f:173.772647"
//         ]
//     },
//     {
//         "word": "deal",
//         "score": 999,
//         "tags": [
//             "f:80.077480"
//         ]
//     },
//     {
//         "word": "house",
//         "score": 998,
//         "tags": [
//             "f:236.008193"
//         ]
//     },
//     {
//         "word": "cities",
//         "score": 997,
//         "tags": [
//             "f:46.554233"
//         ]
//     },
//     {
//         "word": "city",
//         "score": 996,
//         "tags": [
//             "f:175.945864"
//         ]
//     },
//     {
//         "word": "eyes",
//         "score": 995,
//         "tags": [
//             "f:150.575008"
//         ]
//     },
//     {
//         "word": "difference",
//         "score": 994,
//         "tags": [
//             "f:94.290138"
//         ]
//     },
//     {
//         "word": "picture",
//         "score": 993,
//         "tags": [
//             "f:67.454781"
//         ]
//     },
//     {
//         "word": "problem",
//         "score": 992,
//         "tags": [
//             "f:217.905820"
//         ]
//     },
//     {
//         "word": "thing",
//         "score": 991,
//         "tags": [
//             "f:140.552279"
//         ]
//     },
//     {
//         "word": "room",
//         "score": 990,
//         "tags": [
//             "f:158.560480"
//         ]
//     },
//     {
//         "word": "ones",
//         "score": 989,
//         "tags": [
//             "f:61.350014"
//         ]
//     },
//     {
//         "word": "brother",
//         "score": 988,
//         "tags": [
//             "f:57.243431"
//         ]
//     },
//     {
//         "word": "game",
//         "score": 987,
//         "tags": [
//             "f:53.865368"
//         ]
//     },
//     {
//         "word": "tree",
//         "score": 986,
//         "tags": [
//             "f:55.037083"
//         ]
//     },
//     {
//         "word": "companies",
//         "score": 985,
//         "tags": [
//             "f:58.733872"
//         ]
//     },
//     {
//         "word": "smile",
//         "score": 984,
//         "tags": [
//             "f:30.268626"
//         ]
//     },
//     {
//         "word": "money",
//         "score": 983,
//         "tags": [
//             "f:142.643929"
//         ]
//     },
//     {
//         "word": "fish",
//         "score": 982,
//         "tags": [
//             "f:48.638919"
//         ]
//     },
//     {
//         "word": "boy",
//         "score": 981,
//         "tags": [
//             "f:64.466106"
//         ]
//     },
//     {
//         "word": "toe",
//         "score": 980,
//         "tags": [
//             "f:5.252116"
//         ]
//     },
//     {
//         "word": "mistake",
//         "score": 979,
//         "tags": [
//             "f:18.459601"
//         ]
//     },
//     {
//         "word": "guns",
//         "score": 978,
//         "tags": [
//             "f:16.964094"
//         ]
//     },
//     {
//         "word": "family",
//         "score": 977,
//         "tags": [
//             "f:254.593884"
//         ]
//     }
// ]