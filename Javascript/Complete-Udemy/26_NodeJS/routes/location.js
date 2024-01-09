const express = require("express");
const router = express.Router();

const locationStorage = {
  locations: [],
};

router.post("/add-location", (req, res, next) => {
  const id = Math.random();

  locationStorage.locations.push({
    id: id,
    address: req.body.address,
    coords: { lat: req.body.lat, lng: req.body.lng },
  });
  res.json({ message: "Stored Location", locId: id });
}); // 오직 이 주소로 post 요청이 들어와야만 해당 함수에 입력될 수 있다.

router.get("/location/:locId", (req, res, next) => {
  const locationId = +req.params.locId; // /location/:locId => 해당 url에서 가져옴
  const location = locationStorage.locations.find((loc) => {
    return loc.id === locationId;
  });
  if (!location) {
    return res.status(404).json({ message: "Not Found!" });
  }
  res.json({ address: location.address, coordinates: location.coords });
});

module.exports = router;
