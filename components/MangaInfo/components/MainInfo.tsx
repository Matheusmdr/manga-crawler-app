import { ChevronDown, Clock, User } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  Button,
  Image,
  Paragraph,
  ScrollView,
  Text,
  XStack,
  YStack,
} from "tamagui";

interface MainInfoProps {
  data: {
    uri: string;
    title: string;
    author: string;
    status: string;
    description: string;
    tags: {
      id: string;
      name: string;
    }[];
  };
}

export function MainInfo({ data }: MainInfoProps) {
  const [more, setMore] = useState(false);
  return (
    <YStack rowGap={"$4"}>
      <XStack columnGap={10} alignItems="center">
        {data.uri && (
          <Image
            source={{
              uri: data.uri,
              width: 100,
              height: 150,
            }}
            borderRadius={10}
          />
        )}
        <YStack maxWidth={"70%"}>
          <Paragraph color={"white"} size={"$5"} wordWrap="break-word">
            {data.title ?? ""}
          </Paragraph>
          <XStack alignItems="center" columnGap={"$2"}>
            <User size={10} color={"white"} />
            <Paragraph>{data.author}</Paragraph>
          </XStack>
          <XStack alignItems="center" columnGap={"$2"}>
            <Clock size={10} color={"white"} />
            <Paragraph>{data.status ?? ""}</Paragraph>
          </XStack>
        </YStack>
      </XStack>
      <YStack rowGap={"$2"} alignContent="center" alignItems="center">
        <Paragraph
          animation={more ? "bouncy" : undefined}
          numberOfLines={more ? undefined : 3}
          color={"white"}
          size={"$2"}
          width={"100%"}
        >
          {data.description ?? ""}
        </Paragraph>
        <TouchableOpacity onPress={() => setMore(!more)}>
          <ChevronDown
            size={20}
            transform={[{ rotate: more ? "180deg" : "0deg" }]}
            color={"white"}
          />
        </TouchableOpacity>
      </YStack>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.tags?.map((tag) => (
          <Button
            key={tag.id}
            fontSize={"$1"}
            height={"$2"}
            paddingHorizontal="$3"
            borderRadius={30}
            marginHorizontal={"$0.5"}
          >
            {tag.name}
          </Button>
        ))}
      </ScrollView>
    </YStack>
  );
}
