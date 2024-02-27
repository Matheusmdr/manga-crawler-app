import { Text, View } from 'tamagui'
import MangaCrawler from "manga-crawler"

export default function TabOneScreen() {
  const fetch = async () => {
   console.log('2')
   const res = await MangaCrawler.search("One Piece", "mangakakalot")
   console.log(res[0].name)
  }

  fetch()

  return (
    <View flex={1} alignItems="center">
      <Text fontSize={20}>Tab One</Text>
    </View>
  )
}
