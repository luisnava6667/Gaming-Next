import Head from "next/head"

export  function Seo(props) {
    const {title= 'Gaming - Tus Juegos Favoritos', description=' Gaming es una tienda de videojuegos online, donde puedes encontrar tus juegos favoritos para todas las plataformas y al mejor precio.'} = props
    
  return (
    
      <Head>
        <title>{title}</title>
        <meta property="description" content={description} />

      </Head>
  )
}
