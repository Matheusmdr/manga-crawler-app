export interface MangaApiResponse {
  result: string
  response: string
  data: MangaData[]
  limit: number
  offset: number
  total: number
}

export interface MangaData {
  id: string
  type: string
  attributes: {
    title: { [key: string]: string }
    altTitles: { [key: string]: string }[]
    description: { [key: string]: string }
    isLocked: boolean
    links: { [key: string]: string }
    originalLanguage: string
    lastVolume: string
    lastChapter: string
    publicationDemographic: string
    status: string
    year: number
    contentRating: string
    chapterNumbersResetOnNewVolume: boolean
    latestUploadedChapter: string
    tags: MangaTag[]
    state: string
    version: number
    createdAt: string
    updatedAt: string
  }
  relationships: Relationship[]
}

interface MangaTag {
  id: string
  type: string
  attributes: {
    name: { [key: string]: string }
    description: { [key: string]: string }
    group: string
    version: number
  }
  relationships: Relationship[]
}

interface Relationship {
  id: string
  type: string
  related: string
  attributes: { [key: string]: unknown }
}


export interface Chapter {
  id: string;
  type: string;
  attributes: {
      volume: null | number;
      chapter: string;
      title: null | string;
      translatedLanguage: string;
      externalUrl: null | string;
      publishAt: string;
      readableAt: string;
      createdAt: string;
      updatedAt: string;
      pages: number;
      version: number;
  };
  relationships: {
      id: string;
      type: string;
  }[];
}
