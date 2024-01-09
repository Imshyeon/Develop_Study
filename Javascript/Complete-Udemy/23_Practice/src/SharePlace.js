import { Modal } from "./UI/Model.js";
import { Map } from "./UI/Map.js";
import {
  getCoordsFromAddress,
  getAddressFromCoords,
} from "./Utility/Location.js";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById("share-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener("click", this.sharePlaceHandler);
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  sharePlaceHandler() {
    const sharedLinkInputElement = document.getElementById("share-link");

    if (!navigator.clipboard) {
      sharedLinkInputElement.select(); // select : select 이벤트를 트리거하는 건 전체 콘텐츠를 선택하고 마킹한다. => cmd+c 를 통해 복사할 수 있게..
      return;
    }
    navigator.clipboard
      .writeText(sharedLinkInputElement.value)
      .then(() => {
        alert("클립보드에 복사되었습니다!");
      })
      .catch((err) => {
        console.log(err);
        sharedLinkInputElement.select();
      });
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }

    fetch("http://localhost:3000/add-location", {
      method: "POST",
      body: JSON.stringify({
        address: address,
        lat: coordinates.lat,
        lng: coordinates.lng,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const locationId = data.locId;
        this.shareBtn.disabled = false;
        const sharedLinkInputElement = document.getElementById("share-link");
        sharedLinkInputElement.value = `${
          location.origin
        }/my-place?location=${locationId}`; // location.origin: 현재 도메인
      });
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
      async (successResult) => {
        console.log(successResult);
        const coordinate = {
          lat: successResult.coords.latitude, // 위도
          lng: successResult.coords.longitude, // 경도
        }; // User의 좌표
        const address = await getAddressFromCoords(coordinate);
        modal.hide();
        this.selectPlace(coordinate, address);
      },
      (error) => {
        modal.hide();
        alert("위치를 파악할 수 없습니다. 직접 주소를 입력해주세요.");
      }
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector("input").value;
    if (!address || address.trim().length === 0) {
      alert("유효하지 않은 주소입니다. 다시 입력해주세요.");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "loading location.. plz wait!"
    );
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address); // async, await을 사용했기 때문에 Promise를 반환..
      this.selectPlace(coordinates, address);
    } catch (err) {
      alert(err.message);
    }
    modal.hide();
  }
}

new PlaceFinder();
