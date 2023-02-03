const attraction_arr = [{}];

// 點擊"想去哪裡玩"button，開啟右方資訊輸入欄
$("div.add_trip_box > button.add_trip").on("click", function () {
  $("div.add_info").addClass("show");
  $("div.add_info > .create_plan_trip > ul > li.text").text("新增景點");
  $("button.button.add_attraction").text("加入景點");
});

// 點擊右方資訊輸入欄的"返回"，將欄位隱藏
$("div.create_plan_trip > ul > li > div.return").on("click", function () {
  $("div.add_info").removeClass("show");
});

// ====================筆記彈跳視窗========================= //
$(document).on(
  "click",
  "ul.location > li.note > i.fas.fa-book-open",
  function (e) {
    $(".attraction_note_lightbox").removeClass("none");
    e.stopPropagation();
  }
);

// 取消按鈕
$("div.attraction_note_lightbox button.trip_close_btn").on(
  "click",
  function () {
    $(".attraction_note_lightbox").addClass("none");
  }
);

// 點擊半透明區塊，執行取消關閉作用
$(".attraction_note_lightbox").on("click", function () {
  $(".attraction_note_lightbox").addClass("none");
});

// 點擊contents區塊，不會關閉
$(".attraction_note_lightbox > .contents").on("click", function (e) {
  e.stopPropagation();
});

//======================景點修改內容======================== //
$(document).on(
  "click",
  "li.dayTripBlock_featureEdit > i.fas.fa-edit",
  function () {
    $("div.add_info").addClass("show");
    $("div.add_info > .create_plan_trip > ul > li.text").text("修改景點資訊");
    $("button.button.add_attraction").text("修改");
  }
);

// ===================回到行程總表頁面======================== //
$(".return_tripList").on("click", function () {
  location = "../LazyTrip-Yifan/2.html";
});

// =========================崁入google地圖============================== //
let map;
let current_position;
let selected_attraction;
let marker;
let directions_service;
let directions_renderer;
let info_window;

function initMap() {
  const center = {
    lat: 25.553118,
    lng: 121.0211024,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: center,
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      current_position = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.setCenter(current_position);
      map.setZoom(16);

      const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("search_input"),
        {
          // 查詢的範圍
          bounds: {
            east: current_position.lng + 0.001,
            west: current_position.lng - 0.001,
            south: current_position.lat - 0.001,
            north: current_position.lat + 0.001,
          },
          // false代表非僅限上述範圍內查詢
          strictBounds: false,
        }
      );
      autocomplete.addListener("place_changed", function () {
        const place = autocomplete.getPlace();

        selected_attraction = {
          location: place.geometry.location,
          place_id: place.place_id,
          name: place.name,
          address: place.formatted_address,
          photo: place.photos[0],
          rating: place.rating,
        };
        // 將搜尋到的結果渲染畫面，且給予marker
        map.setCenter(selected_attraction.location);
        if (!marker) {
          marker = new google.maps.Marker({
            map: map,
          });
        }
        marker.setPosition(selected_attraction.location);

        if (!directions_service) {
          directions_service = new google.maps.DirectionsService();
        }
        if (!directions_renderer) {
          directions_renderer = new google.maps.DirectionsRenderer({
            map: map,
          });
        }
        directions_renderer.set("directions", null);
        directions_service.route(
          {
            origin: new google.maps.LatLng(
              current_position.lat,
              current_position.lng
            ),
            destination: {
              place_id: selected_attraction.place_id,
            },
            travelMode: "DRIVING",
          },
          function (response, status) {
            if (status === "OK") {
              directions_renderer.setDirections(response);
              if (!info_window) {
                info_window = new google.maps.infoWindow();
              }
              info_window.setContent(
                `
              <h3>${selected_attraction.name}</h3>
              <div>地址：${selected_attraction.address}</div>
              <div>評分：${selected_attraction.rating}</div>
              <div>照片：${selected_attraction.photo}</div>
              <div>步行時間：${response.routes[0].legs[0].duration.text}</div>
              `
              );
              info_window.open(map, marker);
            }
          }
        );
      });
    });
  }
}
