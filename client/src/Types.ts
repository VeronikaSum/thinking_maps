export type SearchWordRequest = {
    searchWord: string,
}

export type GenerateMapRequest = {
    mapTitle: string,
    mainWord: string,
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
    image: File | null,
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
    displayLink: string,
    thumbnailLink: string,
    height: number,
    width: number,
}

export type ThinkingMapEntity = {
    id: number,
    title: string,
    mainWord: string,
    createdAt: string,
    content: string,
}

export const similar = {
    data: [
        {
            "word": "eurų.",
            "score": 962,
            "frequency": "407.210664"
        },
        {
            "word": "mažas",
            "score": 997,
            "frequency": "343.154023"
        },
        {
            "word": "senas",
            "score": 999,
            "frequency": "298.550312"
        },
        {
            "word": "didelis",
            "score": 994,
            "frequency": "275.026919"
        },
        {
            "word": "baltas",
            "score": 996,
            "frequency": "183.830588"
        },
        {
            "word": "juodas",
            "score": 1001,
            "frequency": "158.776520"
        },
        {
            "word": "menkas",
            "score": 989,
            "frequency": "102.777063"
        },
        {
            "word": "gyventi",
            "score": 956,
            "frequency": "101.428005"
        },
        {
            "word": "didelis",
            "score": 998,
            "frequency": "96.433467"
        },
        {
            "word": "Ieško",
            "score": 926,
            "frequency": "94.785566"
        },
        {
            "word": "miręs",
            "score": 993,
            "frequency": "74.610065"
        },
        {
            "word": "vyrų",
            "score": 983,
            "frequency": "61.475124"
        },
        {
            "word": "moteris",
            "score": 984,
            "frequency": "60.743413"
        },
        {
            "word": "rudas",
            "score": 928,
            "frequency": "60.545354"
        },
        {
            "word": "mėlynas",
            "score": 959,
            "frequency": "57.556140"
        },
        {
            "word": "gražu, gražus",
            "score": 979,
            "frequency": "49.557927"
        },
        {
            "word": "Vidaus",
            "score": 995,
            "frequency": "48.054663"
        },
        {
            "word": "Gimtoji",
            "score": 955,
            "frequency": "44.418475"
        },
        {
            "word": "Paprastų",
            "score": 970,
            "frequency": "37.644405"
        },
        {
            "word": "keista",
            "score": 968,
            "frequency": "36.201433"
        },
        {
            "word": "Laukinių",
            "score": 1000,
            "frequency": "35.295696"
        },
        {
            "word": "geltonas",
            "score": 988,
            "frequency": "31.527960"
        },
        {
            "word": "Auginami",
            "score": 945,
            "frequency": "30.807245"
        },
        {
            "word": "riebalai",
            "score": 992,
            "frequency": "29.675867"
        },
        {
            "word": "Didžiulis",
            "score": 981,
            "frequency": "29.036738"
        },
        {
            "word": "pragaras",
            "score": 942,
            "frequency": "27.207462"
        },
        {
            "word": "gražu, gražus",
            "score": 952,
            "frequency": "26.894503"
        },
        {
            "word": "pilkas",
            "score": 991,
            "frequency": "26.445549"
        },
        {
            "word": "Serga",
            "score": 973,
            "frequency": "25.913114"
        },
        {
            "word": "Tomas",
            "score": 985,
            "frequency": "24.488356"
        },
        {
            "word": "sveikas",
            "score": 936,
            "frequency": "23.106615"
        },
        {
            "word": "Golden",
            "score": 939,
            "frequency": "23.076029"
        },
        {
            "word": "piktas",
            "score": 976,
            "frequency": "21.832293"
        },
        {
            "word": "Cool",
            "score": 954,
            "frequency": "21.296924"
        },
        {
            "word": "šlapias",
            "score": 929,
            "frequency": "20.832479"
        },
        {
            "word": "Didžiulį",
            "score": 947,
            "frequency": "20.128119"
        },
        {
            "word": "apvalkalas",
            "score": 961,
            "frequency": "19.559029"
        },
        {
            "word": "parankinis",
            "score": 963,
            "frequency": "15.482346"
        },
        {
            "word": "Spalvos",
            "score": 938,
            "frequency": "15.384330"
        },
        {
            "word": "pilka",
            "score": 980,
            "frequency": "15.154686"
        },
        {
            "word": "apelsinas",
            "score": 941,
            "frequency": "14.948611"
        },
        {
            "word": "Stuburo",
            "score": 977,
            "frequency": "14.458709"
        },
        {
            "word": "milžinas",
            "score": 949,
            "frequency": "13.959948"
        },
        {
            "word": "nėščia",
            "score": 934,
            "frequency": "12.692452"
        },
        {
            "word": "ašigalis",
            "score": 974,
            "frequency": "12.272744"
        },
        {
            "word": "alkanas",
            "score": 975,
            "frequency": "11.259211"
        },
        {
            "word": "Išsigandęs",
            "score": 946,
            "frequency": "10.574096"
        },
        {
            "word": "Damn",
            "score": 943,
            "frequency": "10.395393"
        },
        {
            "word": "mylimas",
            "score": 957,
            "frequency": "9.431588"
        },
        {
            "word": "Suplėšyti",
            "score": 948,
            "frequency": "9.273121"
        },
        {
            "word": "Persų",
            "score": 986,
            "frequency": "8.958077"
        },
        {
            "word": "Liesos",
            "score": 933,
            "frequency": "7.952016"
        },
        {
            "word": "Akimis",
            "score": 969,
            "frequency": "6.898685"
        },
        {
            "word": "Dėmėtojo",
            "score": 965,
            "frequency": "5.993364"
        },
        {
            "word": "Mėgstamiausia",
            "score": 972,
            "frequency": "5.682554"
        },
        {
            "word": "Damned",
            "score": 930,
            "frequency": "5.617327"
        },
        {
            "word": "tingus",
            "score": 944,
            "frequency": "4.143456"
        },
        {
            "word": "Trumpaplaukis",
            "score": 960,
            "frequency": "3.705327"
        },
        {
            "word": "Patenkintas",
            "score": 931,
            "frequency": "2.523350"
        },
        {
            "word": "Dryžuotas",
            "score": 964,
            "frequency": "2.220460"
        },
        {
            "word": "Sutramdyti",
            "score": 971,
            "frequency": "2.171414"
        },
        {
            "word": "Tailed",
            "score": 950,
            "frequency": "2.102270"
        },
        {
            "word": "Patarlė",
            "score": 958,
            "frequency": "1.352095"
        },
        {
            "word": "Aptakus",
            "score": 966,
            "frequency": "1.120671"
        },
        {
            "word": "Siamo",
            "score": 990,
            "frequency": "0.978571"
        },
        {
            "word": "Maltos",
            "score": 935,
            "frequency": "0.625691"
        },
        {
            "word": "Laukinių",
            "score": 967,
            "frequency": "0.516682"
        },
        {
            "word": "purringas",
            "score": 932,
            "frequency": "0.307908"
        },
        {
            "word": "nuplikytas",
            "score": 951,
            "frequency": "0.282377"
        },
        {
            "word": "Meno salos",
            "score": 953,
            "frequency": "0.275420"
        },
        {
            "word": "decerebratas",
            "score": 982,
            "frequency": "0.194301"
        },
        {
            "word": "neanestezuotas",
            "score": 927,
            "frequency": "0.138168"
        },
        {
            "word": "vėžlys",
            "score": 940,
            "frequency": "0.125848"
        },
        {
            "word": "civeta",
            "score": 987,
            "frequency": "0.107384"
        },
        {
            "word": "išsigandęs",
            "score": 978,
            "frequency": "0.023657"
        },
        {
            "word": "fraidy",
            "score": 937,
            "frequency": "0.011579"
        }
    ]

}