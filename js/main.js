'use strict';

var TOTAL_ADS = 8;
var adsOptions = {
  TYPES: [
  'palace',
  'flat',
  'house',
  'bungalo'
],
  LOCATION: {
    X: {
      MIN: 300,
      MAX: 900
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  }
};

var adsArr = [];
var template = document.querySelector('template');
var map = document.querySelector('.map');
var mapPinTemplate = template.content.querySelector('.map__pin');

var getRandomFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createAdObj = function (i) {
var adObj = {
  author: {
    avatar: 'img/avatars/user' + (i < 8 ? '0' : '') + (i + 1) + '.png'
    },
  offer: {
    type: adsOptions.TYPES[getRandomFromInterval(0, adsOptions.TYPES.length - 1)],
    },
    location: {
    x: getRandomFromInterval(adsOptions.LOCATION.X.MIN, adsOptions.LOCATION.X.MAX),
    y: getRandomFromInterval(adsOptions.LOCATION.Y.MIN, adsOptions.LOCATION.Y.MAX)
    }
  }
};

for (var k = 0; k < TOTAL_ADS; k++) {
  adsArr[k] = createAdObj(k);
}

//Удалем ублока .map  класс .map--faded
map.classList.remove('map--faded');

var createPinMarkup = function (pinData) {
  var pinItem = mapPinTemplate.cloneNode(true);
    pinItem.querySelector('img').src = pinData.author.avatar;
    pinItem.style.left = pinData.location.x + 'px';
    pinItem.style.top = pinData.location.y + 'px';
    pinItem.querySelector('img').alt = pinData.offer.title;
  return pinItem;
};

var renderPinsMarkup = function (pinsData) {
  var mapPinsFragment = document.createDocumentFragment();
  for (var j = 0; j < pinsData.length; j++) {
    mapPinsFragment.appendChild(createPinMarkup(pinsData[j]));
  }
  mapPins.appendChild(mapPinsFragment);
};

renderPinsMarkup(adsArr);
