window.onload = function () {

  //상단 메뉴 이모지 컨트롤
  const main = document.getElementById('main');
  const profile = document.getElementById('profile');
  const photo = document.getElementById('photo');
  const location = document.getElementById('location');

  getTopFromEachElement();

  window.addEventListener('scroll', getTopFromEachElement);

  function getTopFromEachElement() {
    const mainTop = Math.abs(main.getBoundingClientRect().top);
    const profileTop = Math.abs(profile.getBoundingClientRect().top);
    const photoTop = Math.abs(photo.getBoundingClientRect().top);
    const locationTop = Math.abs(location.getBoundingClientRect().top);

    const minimum = Math.min(mainTop, profileTop, photoTop, locationTop);

    switch (minimum) {
      case mainTop: turnOnEmoji('main'); break;
      case profileTop: turnOnEmoji('profile'); break;
      case photoTop: turnOnEmoji('photo'); break;
      case locationTop: turnOnEmoji('location'); break;
    }
  }

  //다음 지도 api
  const container = document.getElementById('map');
  const options = {
    center: new daum.maps.LatLng(37.48696198627081, 127.03344609502346), //지도의 중심좌표.
	  level: 3 //지도의 레벨(확대, 축소 정도)
  };

  const map = new daum.maps.Map(container, options); //맵 생성

  const imageSrc = '/assets/img/marker.png', // 마커이미지의 주소입니다    
        imageSize = new daum.maps.Size(64, 69), // 마커이미지의 크기입니다
        imageOption = {offset: new daum.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        
  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption),
      markerPosition = new daum.maps.LatLng(37.48696198627081, 127.03344609502346); // 마커가 표시될 위치입니다

  // 마커를 생성합니다
  var marker = new daum.maps.Marker({
      position: markerPosition, 
      image: markerImage // 마커이미지 설정 
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map); 

  const iwContent = '<div style="padding:5px;">브라이드밸리', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new daum.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

  // 인포윈도우를 생성합니다
  const infowindow = new daum.maps.InfoWindow({
      position : iwPosition, 
      content : iwContent 
  });
    
  // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
  infowindow.open(map, marker); 

  // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
  const zoomControl = new daum.maps.ZoomControl();
  map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
}

function turnOnEmoji(id) {
  const navs = document.querySelectorAll('.nav .nav-menu');
  for (let i = 0; i < navs.length; i++) {
    const nav = navs[i];
    if (nav.id === `nav-${id}`) {
      navs[i].classList.add('on');
    } else {
      navs[i].classList.remove('on');
    }
  }
}

let slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  let i;
  const x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}
