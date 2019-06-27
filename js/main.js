'use strict';

var TOTAL_ADS = 8;
var adsOptions = {
  TYPES: [
  'palace',
  'flat',
  'house',
  'bungalo'
  ],
  CHECKINS: [
    '12:00',
    '13:00',
    '14:00'
  ],
  CHECKOUTS: [
    '12:00',
    '13:00',
    '14:00'
  ],
  FEATURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
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
var adTemplate = template.content.querySelector('.map__card');
var popupPhoto = template.content.querySelector('.popup__photo');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var typesMap = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var getRandomFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomCutArr = function (arr) {
  var copyArr = arr.slice(0);
  var length = getRandomFromInterval(0, copyArr.length);
  copyArr.slice(0, length);
  return copyArr;
};

var createAds = function (i) {
var ads = {
  author: {
    avatar: 'img/avatars/user' + imageAddress + '.png'
    },
  offer: {
    price: getRandomFromInterval(adsOptions.PRICE.MIN, adsOptions.PRICE.MAX),
    type: adsOptions.TYPES[getRandomFromInterval(0, adsOptions.TYPES.length - 1)],
    rooms: getRandomFromInterval(adsOptions.ROOMS.MIN, adsOptions.ROOMS.MAX),
    guests: getRandomFromInterval(adsOptions.GUESTS.MIN, adsOptions.GUESTS.MAX),
    checkin: adsOptions.CHECKINS[getRandomFromInterval(0, adsOptions.CHECKINS.length - 1)],
    checkout: adsOptions.CHECKOUTS[getRandomFromInterval(0, adsOptions.CHECKOUTS.length - 1)],
    features: randomCutArr(randomShuffleArr(adsOptions.FEATURES)),
    description: ''
    },
    location: {
      x: getRandomFromInterval(adsOptions.LOCATION.X.MIN, adsOptions.LOCATION.X.MAX) - PIN_SIZE.WIDTH / 2,
      y: getRandomFromInterval(adsOptions.LOCATION.Y.MIN, adsOptions.LOCATION.Y.MAX) - PIN_SIZE.HEIGHT
    }
  };
  adObj.offer.address = adObj.location.x + ', ' + adObj.location.y;
  return adObj;
};

//Массив номеров
var getImageAddress = function () {
  return getRandomArray(TOTAL_ADS, function () {
    var number = getRandomNumber(1, TOTAL_ADS).toString();
    return number.length === 1 ? '0' + number : number;
  }, true);
};

//Удалем ублока .map  класс .map--faded
map.classList.remove('map--faded');

//создаем метку на карте
var createPinMarkup = function (pinData) {
  var pinItem = mapPinTemplate.cloneNode(true);
    pinItem.querySelector('img').src = pinData.author.avatar;
    pinItem.style.left = pinData.location.x + 'px';
    pinItem.style.top = pinData.location.y + 'px';
    pinItem.querySelector('img').alt = pinData.offer.title;
  return pinItem;
};

var createPin = function (ad) {
  var div = document.createElement('div');
  div.classList.add('pin');
  div.style.left = ad.location.x - PIN_SIZE.WIDTH / 2 + 'px';
  div.style.top = ad.location.y - PIN_SIZE.HEIGHT + 'px';
  div.innerHTML = '<img src="' + ad.author.avatar + '" class="rounded" width="40" height="40">';
  return div;
};

var getFragment = function (Arr, fn) {
  var fragment = document.createDocumentFragment();

  array.forEach(function (elem) {
    fragment.appendChild(fn(elem));
  });

  return fragment;
};

var createAd = function (adsData) {
  var ads = adTemplate.cloneNode(true);
  ads.querySelector('.map__card img').src = adsData.author.avatar;
  ads.querySelector('.popup__text--price').textContent = adsData.offer.price + ' ₽/ночь';
  ads.querySelector('.popup__type').textContent = typesMap[adsData.offer.type];
  ads.querySelector('.popup__text--capacity').textContent = adsData.offer.rooms + ' комнаты для ' + adsData.offer.guests + ' гостей';
  ads.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsData.offer.checkin + ', выезд до ' + adsData.offer.checkout;
  ads.querySelector('.popup__features').innerHTML = '';
  ads.querySelector('.popup__features').appendChild(createFeatureFragment(adsData));
  ads.querySelector('.popup__description').textContent = adsData.offer.description;
  return ads;
};

mapFiltersContainer.insertAdjacentElement('beforebegin', createAd(adsArr[0]));
