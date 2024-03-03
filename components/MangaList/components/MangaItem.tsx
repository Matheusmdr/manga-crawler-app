import { Link } from 'expo-router'
import { ImageBackground } from 'react-native'
import { Card, CardFooter, CardBackground, Image, H2, Paragraph } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

interface MangaItemProps {
  data: {
    id: string
    title: string
    imgUri: string
  }
}

export function MangaItem({ data }: MangaItemProps) {
  return (
    <Link
      href={{
        pathname: '/manga/[id]',
        params: { id: data.id },
      }}
      style={{ marginBottom: 15 }}
      asChild
    >
      <Card width={'48%'} height={260} >
        <CardBackground>
          {data.imgUri.trim() && (
            <ImageBackground
              borderRadius={5}
              resizeMode="cover"
              width={130}
              height={600}
              source={{
                width: 600,
                height: 300,
                uri: data.imgUri,
              }}
            >
              <LinearGradient
                height="100%"
                width="100%"
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                start={[1, 1]}
                end={[0, 0]}
              />
            </ImageBackground>
          )}
        </CardBackground>
        <CardFooter padding={4}>
          <Paragraph color={'#fff'} textAlign="left" size={14}>
            {data.title?.slice(0, 15) + (data.title?.length > 15 ? '...' : '')}
          </Paragraph>
        </CardFooter>
      </Card>
    </Link>
  )
}
