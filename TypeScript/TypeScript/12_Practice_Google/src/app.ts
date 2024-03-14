import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyBwXhlspBZwf-kAjV6pWsx9VIxNrFdP3uk";

type GoogleGeocodingResponse = {
  results: {
    geometry: { location: { lat: number; lng: number } };
    formatted_address: string;
  }[];
  status: "OK" | "ZERO_RESULTS";
};

// declare var google: any;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // Google API
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status != "OK") {
        throw new Error("데이터를 가져올 수 없다.");
      }
      const coordinates = response.data.results[0].geometry.location;
      const title = response.data.results[0].formatted_address;
      console.log(coordinates);

      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: coordinates,
          zoom: 8,
        }
      );

      new google.maps.Marker({
        map: map,
        position: coordinates,
        title: title,
      });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
