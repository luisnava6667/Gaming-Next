import { BasicLayout } from '@/layouts'
import { Game } from '@/components/Game'
import { Seo, Separator } from '@/components/Shared'
export default function GamePage(props) {
  const { game } = props
  const wallpaper = game.attributes.wallpaper
  return (
    <div>
      <Seo
        title={game.attributes.title}
        description={`${game.attributes.summary}`}
      />
      <BasicLayout>
        <Game.HeaderWallpaper image={wallpaper.data.attributes.url} />
        <Game.Panel gameId={game.id} game={game.attributes} />
        <Separator height={50} />
        <Game.Info game={game.attributes} />
        <Separator height={30} />
        <Game.Media
          video={game.attributes.video}
          screenshots={game.attributes.screenshots.data}
        />
        <Separator height={50} />
      </BasicLayout>
    </div>
  )
}
