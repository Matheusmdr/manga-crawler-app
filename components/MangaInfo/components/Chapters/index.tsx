import { FlatList } from "react-native";
import { Chapter } from "../../../../types/manga";
import { ChapterItem } from "./ChapterItem";
import { Paragraph, YStack } from "tamagui";

interface ChapterListProps {
  data: Chapter[] | null; 
}

export function ChapterList({ data }: ChapterListProps) {
  return (
    <YStack justifyContent="center" alignItems="center" rowGap={10} marginTop={"$2"}>
      <Paragraph color={"white"} size={"$5"} alignSelf="flex-start">{data?.length} Chapters</Paragraph>
      {data && data.map((chapter) => <ChapterItem key={chapter.id} data={chapter} />)}
    </YStack>
  
  );
}
