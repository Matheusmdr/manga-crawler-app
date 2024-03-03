import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { Button, Text, View, XStack } from 'tamagui'
import { BookMarked, Filter, MoreVertical, Search } from 'lucide-react-native'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarStyle: {
          height: 60,
          paddingVertical: 5,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 12,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Biblioteca',
          tabBarIcon: ({ focused, color }) => <BookMarked size={20} color={color} />,
          headerRight: () => (
            <XStack columnGap="$4">
              <Pressable>
                <Search size={20} color={'#fff'} />
              </Pressable>
              <Pressable>
                <Filter size={20} color={'#fff'} />
              </Pressable>
              <Pressable>
                <MoreVertical size={20} color={'#fff'} />
              </Pressable>
            </XStack>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Biblioteca',
          tabBarIcon: ({ focused, color }) => <BookMarked size={20} color={color} />,

          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                <Text>Hello!</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Biblioteca',
          tabBarIcon: ({ focused, color }) => <BookMarked size={20} color={color} />,

          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                <Text>Hello!</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: 'Biblioteca',
          tabBarIcon: ({ focused, color }) => <BookMarked size={20} color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                <Text>Hello!</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  )
}
