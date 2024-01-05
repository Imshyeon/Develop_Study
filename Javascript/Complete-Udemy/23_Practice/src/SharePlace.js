import { Modal } from "./UI/Model.js";
import { Map } from "./UI/Map.js";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  selectPlace(coordinates) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "현재 브라우저에서 위치 특성을 이용할 수 없습니다. - 최신 브라우저를 사용하거나 직접 주소를 입력해주세요."
      );
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "loading location.. plz wait!"
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      (successResult) => {
        modal.hide();
        console.log(successResult);
        const userLocation = {
          lat: successResult.coords.latitude, // 위도
          lng: successResult.coords.longitude, // 경도
        }; // User의 좌표
        this.selectPlace(userLocation);
      },
      (error) => {
        modal.hide();
        alert("위치를 파악할 수 없습니다. 직접 주소를 입력해주세요.");
      }
    );
  }

  findAddressHandler() {}
}

new PlaceFinder();
