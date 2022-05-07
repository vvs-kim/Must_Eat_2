import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { SearchInput, SearchResult } from 'components'
import { searchIpState, searchResState } from 'recoil/atom/map'

const SearchContainer = () => {
  const [searchIp] = useRecoilState(searchIpState)
  const [searchRes, setSearchRes] = useRecoilState(searchResState)
  
  /* map */
  const mapPosition = {
    latCdnt: 37.5396264,
    lngCdnt: 126.9465531
  }
  const { latCdnt, lngCdnt } = mapPosition
  

  /* global kakao */
  const keywordSearch = () => {

    const searchOption = {
      category_group_code: 'FD6',      
      x: 126.86483931801229,
      y: 37.55108043514493      
    }

    const places = new kakao.maps.services.Places()
    places.keywordSearch(searchIp, keywordSearchCallBack, searchOption)
  }

  const keywordSearchCallBack = (res, status) => {
    const resStatus = kakao.maps.services.Status
    if (status === resStatus.OK) {
      const mapOptions = {
        center: new kakao.maps.LatLng(latCdnt, lngCdnt),
        level: 8
      }
      const container = document.getElementById('map')
      const mapObj = new kakao.maps.Map(container, mapOptions)
      const showMarker = place => {
        new kakao.maps.Marker({
          map: mapObj,
          position: new kakao.maps.LatLng(place.y, place.x)
        })
      }

      setSearchRes(res)
      res.forEach(place => showMarker(place))
    } else if (status === resStatus.ZERO_RESULT) {
      alert('검색 결과가 없습니다!')
      console.log(status)
    } else {
      alert('서버 응답에 문제가 있습니다!')
      console.log(status)
    }
  }

  return (
    <Container>
      <SearchInput
        onSearch={() => keywordSearch()}
      />
      <SearchResult searchRes={searchRes}/>
    </Container>
  )
}

const Container = styled.div`
  background: white;
  position: absolute;
  z-index: 20;
  width: 390px;
  height: 100vh;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%), 5px 0 15px 0 rgb(0 0 0 / 10%);
`

export default SearchContainer