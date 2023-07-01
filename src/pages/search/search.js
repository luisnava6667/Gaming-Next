import { BasicLayout } from '@/layouts'
import { useEffect } from 'react'
import { size } from 'lodash'
import { Container } from 'semantic-ui-react'
import { GridGames, Separator, NoResult, Pagination } from '@/components/Shared'
export default function SearchPage(props) {
  const { games, pagination, searchText } = props
  const hasResults = size(games) > 0
  useEffect(() => {
    document.getElementById('search-games').focus()
  }, [])

  return (
    <>
      <BasicLayout relative isOpenSearch>
        <Container>
          <Separator height={50} />
          <h2>Buscando: {searchText}</h2>
          {hasResults ? (
            <>
              <GridGames games={games} />
              <Separator height={30} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : (
            <>
              <NoResult text='No se han encontrado resultado' />
              <Separator height={440} />
            </>
          )}
          <Separator height={100} />
        </Container>
      </BasicLayout>
    </>
  )
}
