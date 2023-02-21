// 將主行程的標題、起訖日期、封面圖渲染在頁面上
let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);
let tourId = params.get("tourId");
function init() {
  $.ajax({
    url: `http://localhost:8080/lazy-trip-back/tourQueryOne?tourId=${tourId}`,
    type: "GET",
    success: function (data) {
      initRenderTourData(data);
    },
    error: function (xhr) {
      console.log("error");
    },
  });
}

$(function () {
  init();
});

function initRenderTourData(data) {
  let tour_info = "";
  tour_info = `
  <div class="top" style= background-image:url(data:image/*;base64,${data.tourImg})>
    <div>
      <div class="return">
        <a href="#" class="return">
          <span class="icon return_tripList">
            <i class="fas fa-arrow-left"></i>
          </span>
        </a>
      </div>
    </div>
    <div class="top_text">
      <div class="title_date">
        <ul>
          <li class="title">${data.tourTitle}</li>
          <li class="date">${data.startDate} ~ ${data.endDate}</li>
        </ul>
      </div>
    </div>
  </div>
  `;
  $("div.top").html(tour_info);
  // 求得起訖天數差
  let startDateCal = new Date(data.startDate);
  let endDateCal = new Date(data.endDate);
  let diffTime = Math.abs(endDateCal - startDateCal);
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let tour_date = "";
  let tourSchedule_title = "";
  for (let i = 0; i <= diffDays; i++) {
    let date_change = new Date(
      new Date(data.startDate).getTime() + i * 24 * 3600 * 1000
    ).toLocaleDateString();
    tour_date += `
      <li class="day">
        <p>${date_change}</p>
        <p>第${i + 1}天</p>
      </li>
      `;
    $("ul.date_detail").html(tour_date);

    tourSchedule_title += `
      <div data-date=${date_change}>
        <header>
          <h2 class="dayTripBlock_label">
            <span>第${i + 1}天 - ${date_change}</span>
          </h2>
        </header>
        <section class="dayTripBlock"></section>
        <div class="add_trip_box" data-date=${date_change}>
          <button class="button add_trip">+ 想去哪裡玩</button>
        </div>
      </div>
      <br />
      `;
  }
  $("div.schedule.lodge").html(tourSchedule_title);
}

function renderTourScheData() {}

// 點擊"想去哪裡玩"button，開啟右方資訊輸入欄
let btnAddTripDate;
$(document).on("click", "div.add_trip_box > button.add_trip", function () {
  $("div.add_info").addClass("show");
  $("div.add_info > .create_plan_trip > ul > li.text").text("新增景點");
  $("button.button.add_attraction").text("加入景點");

  btnAddTripDate = $(this).closest("div.add_trip_box").attr("data-date");
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
$(document).on("click", ".return_tripList", function () {
  location = "http://localhost:8080/lazy-trip-back/tour/tour.html";
});

// =========================崁入google地圖============================== //
let map;
let current_position;
let selected_attraction;
let marker;
let directions_service;
let directions_renderer;
let info_window;
let carRoute_time;

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
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
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
              placeId: selected_attraction.place_id,
            },
            travelMode: "DRIVING", // 交通模式 DRIVING, WALKING
          },
          function (response, status) {
            if (status === "OK") {
              directions_renderer.setDirections(response);
              if (!info_window) {
                info_window = new google.maps.InfoWindow();
              }
              info_window.setContent(
                `
                <div><img src="${selected_attraction.photo.getUrl()}" style="max-width: 100px; max-height: 100px;"></div>
                <h3>${selected_attraction.name}</h3>
                <div>地址：${selected_attraction.address}</div>
                <div>評分：${selected_attraction.rating}</div>
                <div>汽車時間：${response.routes[0].legs[0].duration.text}</div>
                `
              );
              info_window.open(map, marker);
              carRoute_time = response.routes[0].legs[0].duration.text;
              addAttractionIntoDB(selected_attraction);
            }
          }
        );
      });
    });
  }
}
//=====================將google map查詢的景點資訊，渲染到attraction_detail_show===========================//
let attraction_arr = [];
function addAttractionIntoDB(selected_attraction) {
  // addData
  $.ajax({
    url: "http://localhost:8080/lazy-trip-back/attractionCreate",
    type: "POST",
    data: JSON.stringify({
      attractionTitle: selected_attraction.name,
      location: selected_attraction.address,
      latitude: selected_attraction.latitude,
      longitude: selected_attraction.longitude,
      attractionImg: selected_attraction.photo.getUrl(),
    }),
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      attraction_arr.push({
        attractionTitle: data.attractionTitle,
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        attractionImg: data.attractionImg,
        carRouteTime: carRoute_time,
        attractionId: data.attractionId,
        memberId: 2,
      });
      $("div.attraction_detail_show").html("");
      renderAttractionToShowBox(attraction_arr);
    },
    error: function (xhr) {
      console.log("error");
    },
  });
}

function renderAttractionToShowBox(attraction_arr) {
  let new_attraction = "";
  for (let i = 0; i < attraction_arr.length; i++) {
    new_attraction = `<div data-attaction=${attraction_arr[i].attractionId}>
                    <div><img src="${attraction_arr[i].attractionImg}" style="max-width: 100px; max-height: 100px;"></div>
                    <h3>${attraction_arr[i].attractionTitle}</h3>
                    <p>${attraction_arr[i].location}</p>
                </div>`;
  }
  $("div.attraction_detail_show").html(new_attraction);
}

let tourSchedule_arr = [];
$("button.button.add_attraction").on("click", function addTourScheduleBox() {
  let stay_time = document.getElementById("stay_time").value;
  let start_time = document.getElementById("start_time").value;
  // 當執行加入景點時，將景點放入tourSchedule_arr內
  tourSchedule_arr.push({
    tourSchedule_date: btnAddTripDate,
    start_time: start_time,
    stay_time: stay_time,
    tourId: tourId,
    memberId: 2,

    attraction_info: attraction_arr,
  });

  // 將景點渲染到div.schedule.lodge
  let new_dayTripInfo = "";
  for (let i = 0; i < tourSchedule_arr.length; i++) {
    new_dayTripInfo = `
      <ul class="dayTripBlock_locationInfo">
        <li class="dayTripBlock_locationInfoImg">
          <img src=${tourSchedule_arr[i].attraction_info[i].attractionImg}/>
        </li>
        <li class="dayTripBlock_locationInfoBlock">
          <ul class="dayTripBlock_locationInfoBlockDetail">
            <li class="dayTripBlock_locationInfoBlockDetail_time">
              <span>${tourSchedule_arr[i].stay_time}分</span>
              <span>${tourSchedule_arr[i].start_time} - ${"12:00"}</span>
            </li>
            <li class="attraction_title">
              ${tourSchedule_arr[i].attraction_info[i].attractionTitle}
            </li>
            <li class="address">${
              tourSchedule_arr[i].attraction_info[i].location
            }</li>
          </ul>
        </li>
        <li class="dayTripBlock_featureNote">
          <i class="fas fa-book-open"></i>
        </li>
        <li class="dayTripBlock_featureEdit">
          <i class="fas fa-edit"></i>
        </li>
        <li class="dayTripBlock_featureDelete delete"></li>
      </ul>
      <div class="dayTripBlock_carRouteTime">
        <span class="icon"><i class="fas fa-car"></i></span>
        <p>約 ${tourSchedule_arr[i].attraction_info[i].carRouteTime}</p>
      </div>
      `;
  }
  // if (String(btnAddTripDate) === String($("section.dayTripBlock").attr("data-card"))) {
  $("section.dayTripBlock").append(new_dayTripInfo);
  // }
  // console.log(String($("section.dayTripBlock").attr("data-date")));
  // console.log("btnAddTripDate:" + String(btnAddTripDate));
});

function endTimeCalculate(start_time, stay_time) {
  let start_date = new Date(start_time);
  console.log(start_date);
  let endTime = new Date(
    parseInt(start_date.getTime()) + parseInt(stay_time) * 60000
  );
  console.log(endTime);
  return endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
