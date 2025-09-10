const KakaoMap = () => {
    const handleLoadMap = () => {
        window.kakao.maps.load(() => {
            const mapContainer = document.getElementById("map");
            const mapOption = {
                center: new window.kakao.maps.LatLng(37.566535, 126.9779692),   //처음 위치
                level: 3,   //처음 레벨
            }
            const map = new window.kakao.maps.Map(mapContainer, mapOption);
            setMap(map);    //지도 상태 저장
        })
    }
    return(
        <>
            <Script src={`//dapi.kakao.com/v2/maps/sdk.js?
                    appkey=${process.env.Next_PUBLIC_APP_KEY}&libraries=clusterer,services
                    &autoload=false`}
            />
            <div id="map" className="relative w-full h-dvh"></div>
        </>
    )
}
export default KakaoMap