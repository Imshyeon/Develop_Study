export class Map {
  constructor(coords) {
    // this.coordinates = coords;
    this.render(coords);
  }

  render(coordinates) {
    if (!google) {
      alert("지도 라이브러리를 로드할 수 없습니다. 다시 시도해주세요.");
      return;
    }

    const map = new google.maps.Map(document.getElementById("map"), {
      center: coordinates,
      zoom: 16,
    }); // 전역 google 변수

    new google.maps.Marker({
      position: coordinates,
      map: map,
    }); // Google Maps에게 마커를 해당 map에 배치하라고 알림.
  }
}
