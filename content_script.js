function main() {
  'use strict';

  var $rawName = document.querySelector('#body > #content_1_0');
  if (!$rawName) {
    return;
  }

  var rawName = $rawName.textContent;

  // TODO: 海外未発売カードに対応 (/が無い)
  const re = /《([^/]+)\/([^》]+)》/;
  var matchArray = rawName.match(re);
  console.log(matchArray);
  if (!matchArray || matchArray.length < 3) {
    return;
  }

  var enName = matchArray[2];
  var url = 'http://yugioh.wikia.com/api.php?action=imageserving&format=json&wisTitle=' + encodeURI(enName);
  console.log(url);

  fetch(url).then(function (response) {
    console.log(response);
    return response.json();
  }).then(function (json) {
    var imageUrl = json.image.imageserving;
    console.log(imageUrl);
    var img = document.createElement('img');
    img.id = 'image-viewer_img';
    img.src = imageUrl;
    var $body = document.querySelector('#body');
    $body.insertBefore(img, $rawName.nextSibling);
  }).catch(function (error) {
    console.error(error);
  });
}

main();
