import { MangaApiResponse } from "../types/manga";

export function useManga() {
  const fetchChapters = async (id: string, languages: string[]) => {
    const language = languages.join("&translatedLanguage[]=");
    const response = await fetch(
      `https://api.mangadex.org/manga/${id}/feed?translatedLanguage[]=${language}&order[chapter]=desc`
    );
    const data = await response.json();
    return data.data;
  };

  const fetchAuthor = async (id: string) => {
    const response = await fetch(`https://api.mangadex.org/author/${id}`);
    const data = await response.json();
    return data.data;
  };

  const fetchManga = async (id: string) => {
    const response = await fetch(`https://api.mangadex.org/manga/${id}`);
    const data = await response.json();
    return data.data;
  };

  const fetchMangasList = async () => {
    const response = await fetch("https://api.mangadex.org/manga");
    const data = (await response.json()) as MangaApiResponse;
    return data.data;
  };

  const fetchCoverImages = async (mangaList: MangaApiResponse["data"]) => {
    const covers: { [key: string]: string } = {};
    for (const manga of mangaList) {
      try {
        const response = await fetch(
          `https://api.mangadex.org/cover?manga[]=${manga.id}`
        );
        const data = await response.json();
        const coverId = data.data[0]?.attributes.fileName;
        if (coverId) {
          covers[
            manga.id
          ] = `https://uploads.mangadex.org/covers/${manga.id}/${coverId}`;
        }
      } catch (error) {
        console.error("Error fetching cover image:", error);
      }
    }
    return covers;
  };

  return {
    fetchChapters,
    fetchAuthor,
    fetchManga,
    fetchMangasList,
    fetchCoverImages,
  };
}
