import { Text, View } from 'tamagui'
import { MangaList } from '../../components/MangaList'

export default function TabOneScreen() {
  return (
    <View flex={1} alignItems="center">
      <MangaList />
    </View>
  )
}
