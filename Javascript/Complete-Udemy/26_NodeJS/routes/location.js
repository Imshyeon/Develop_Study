const express = require("express");

const router = express.Router();

const locationStorage = {
  locations: [],
};

router.post("/add-location", (req, res, next) => {
  locationStorage.locations.push({
    id: Math.random(),
    address: req.body.address,
    coords: { lat: req.body.lat, lng: req.body.lng },
  });
    res.json({message:'Stored Location'})
}); // 오직 이 주소로 post 요청이 들어와야만 해당 함수에 입력될 수 있다.

router.get("/location", (req, res, next) => {});

module.exports = router;