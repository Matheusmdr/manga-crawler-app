import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  H1,
  H2,
  Image,
  Paragraph,
  ScrollView,
  Spinner,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";
import { Chapter, MangaData } from "../../types/manga";
import { useManga } from "../../hooks/useManga";
import { LinearGradient } from "tamagui/linear-gradient";
import { ImageBackground, Pressable, TouchableOpacity } from "react-native";
import { Clock, Filter, MoreVertical, Search, User } from "lucide-react-native";
import { MainInfo } from "../../components/MangaInfo";
import { ChapterList } from "../../components/MangaInfo/components/Chapters";

type mangaState = {
  manga: MangaData | null;
  coverImage: string | null;
  author: string | null;
  chapters: Chapter[] | null;
};
export default function MangaScreen() {
  const { id } = useLocalSearchParams();
  const [manga, setManga] = useState<mangaState>({
    manga: null,
    coverImage: null,
    author: null,
    chapters: null,
  });
  const [loading, setLoading] = useState(true);
  const { fetchManga, fetchCoverImages, fetchAuthor, fetchChapters } =
    useManga();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const manga = await fetchManga(id as string);
      const covers = await fetchCoverImages([manga]);
      const authorRelationship = manga.relationships.find(
        (relation: { type: string }) => relation.type === "author"
      );
      const author = await fetchAuthor(authorRelationship.id);
      const chapters = await fetchChapters(id as string, ["en"]);
      setManga({
        manga,
        coverImage: covers[manga.id] ?? null,
        author: author?.attributes.name ?? null,
        chapters: chapters,
      });
    } catch (error) {
      // biome-ignore lint/suspicious/noConsoleLog: <explanation>
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View flex={1} alignContent="center" justifyContent="center">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <Spinner />
      </View>
    );
  }
  return (
    <ScrollView flex={1}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          title: "",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: true,
          headerTitleAlign: "center",
          headerRight: () => (
            <XStack columnGap="$4">
              <TouchableOpacity activeOpacity={0.7}>
                <Search size={20} color={"#fff"} />
              </TouchableOpacity>
              <Pressable>
                <Filter size={20} color={"#fff"} />
              </Pressable>
              <Pressable>
                <MoreVertical size={20} color={"#fff"} />
              </Pressable>
            </XStack>
          ),
        }}
      />
      {manga.coverImage?.trim() && (
        <ImageBackground
          resizeMode="cover"
          source={{
            uri: manga.coverImage,
          }}
          blurRadius={10}
        >
          <LinearGradient
            height={200}
            width="100%"
            colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.5)", "transparent"]}
            start={[-0.5, 1]}
            end={[-0.5, -1]}
          />
        </ImageBackground>
      )}
      <YStack style={{ width: "100%" }} paddingHorizontal={10} rowGap={10}>
        <MainInfo
          data={{
            author: manga.author ?? "",
            status: manga.manga?.attributes.status ?? "",
            description: manga.manga?.attributes.description.en ?? "",
            title: manga.manga?.attributes.title.en ?? "",
            tags:
              manga.manga?.attributes.tags.map((tag) => ({
                id: tag.id,
                name: tag.attributes.name.en,
              })) ?? [],
            uri: manga.coverImage ?? "",
          }}
        />
        <ChapterList data={manga.chapters} />
      </YStack>
    </ScrollView>
  );
}
