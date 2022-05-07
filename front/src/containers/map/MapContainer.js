import { useEffect } from 'react'

import { MapComponent } from 'components'
import apiKey from 'key.json'

const MapContainer = () => {

  /* api */
  const api = {
    key: apiKey.API_KEY_KAKAO_MAP_LOCAL,
    url: 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=',
    services: '&libraries=services'
  }
  const { key, url, services } = api

  /* map */
  const mapPosition = {
    latCdnt: 37.5396264,
    lngCdnt: 126.9465531
  }
  const { latCdnt, lngCdnt } = mapPosition

  /* global kakao */
  // 최초 렌더링 시 스크립트에 api 정보 추가
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap()
    } else {
      const script = document.createElement('script')
      script.onload = () => kakao.maps.load(initMap)
      script.src = url + key + services
      document.head.appendChild(script)
    }
  })
  
  const initMap = () => {
    const mapOptions = {
      center: new kakao.maps.LatLng(latCdnt, lngCdnt),
      level: 8
    }
    const container = document.getElementById('map')
    new kakao.maps.Map(container, mapOptions)
  }

  return (
    <>
      <MapComponent />
    </>
  )
}

export default MapContainer