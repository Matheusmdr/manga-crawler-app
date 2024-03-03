import {
  Button,
  Card,
  CardBackground,
  CardFooter,
  H2,
  Image,
  Paragraph,
  ScrollView,
  Text,
  View,
  XStack,
} from "tamagui";
import { MangaApiResponse } from "../../types/manga";
import { useCallback, useEffect, useState } from "react";
import { MangaItem } from "./components/MangaItem";
import { useManga } from "../../hooks/useManga";
import { FlatList, Pressable } from "react-native";

type MangaList = {};

export function MangaList() {
  const [mangaList, setMangaList] = useState<MangaApiResponse["data"]>([]);
  const [coverImages, setCoverImages] = useState<{ [key: string]: string }>({});
  const { fetchMangasList, fetchCoverImages } = useManga();

  const fetchData = useCallback(async () => {
    const mangas = await fetchMangasList();
    const covers = await fetchCoverImages(mangas);
    setMangaList(mangas);
    setCoverImages(covers);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View
      flex={1}
      width="100%"
      backgroundColor="$background"
      paddingHorizontal="$2"
    >
      <FlatList
        data={mangaList}
        numColumns={2}
        renderItem={({ item: manga }) => (
          <MangaItem
            key={manga.id}
            data={{
              id: manga.id,
              title: manga.attributes.title.en,
              imgUri: coverImages[manga.id] ?? "",
            }}
          />
        )}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
}
