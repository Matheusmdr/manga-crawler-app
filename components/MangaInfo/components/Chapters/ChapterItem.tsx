import { Card, CardHeader, H6, Text } from "tamagui";
import { Chapter } from "../../../../types/manga";
import { format } from "date-fns";

interface ChapterItemProps {
  data: Chapter;
}

export function ChapterItem({ data }: ChapterItemProps) {
  return (
    <>
      {data.attributes.chapter && (
        <Card width={"100%"} backgroundColor={"$backgroundTransparent"} bordered>
          <CardHeader>
            <Text color={"white"} fontSize={"$4"}>
              Chapter {data.attributes.chapter}
            </Text>
            <Text fontSize={"$1"}>              
              Published at {format(data.attributes.publishAt, "P")}
            </Text>
          </CardHeader>
        </Card>
      )}
    </>
  );
}
