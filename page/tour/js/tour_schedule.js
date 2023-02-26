// 將主行程的標題、起訖日期、封面圖渲染在頁面上
let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);
let tourId = params.get("tourId");

// +想去哪裡玩的DOM元素，以及抓取其data-date
let btnAddTrip;
let currentDate;
let tourSchedule_arr = [];
let attraction_arr = [];
let date_change;

//修改景點時，觸發產生的變數
let targetAttraction;
let findDate;
let targetAttractionId;
let targetAttractionDate;
let getTourScheDate;
let getTourScheId;

function init() {
  $.ajax({
    url: `http://localhost:8080/lazy-trip-back/tourQueryOne?tourId=${tourId}`,
    type: "GET",
    success: function (data) {
      initRenderTourData(data);
      $.ajax({
        url: `http://localhost:8080/lazy-trip-back/tourScheQueryOne?tourId=${tourId}`,
        type: "GET",
        success: function (data) {
          console.log(data);
          initRenderTourScheData(data);
        },
        error: function (xhr) {
          console.log("error");
        },
      });
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
    <div class="icon" style="">
      <div class="return return_tripList">
        <a href="#" class="return">          
          <i class="fas fa-arrow-left"></i>
        </a>
      </div>
      <div class="check">
        <a href="#" class="return">
          <i class="fas fa-check-circle"></i>  
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
    date_change = new Date(
      new Date(data.startDate).getTime() + i * 24 * 3600 * 1000
    )
      .toISOString()
      .slice(0, 10);
    tour_date += `
      <li class="day">
        <p>${date_change}</p>
        <p>第${i + 1}天</p>
      </li>
      `;
    $("ul.date_detail").html(tour_date);

    tourSchedule_title += `
      <div class="dayTrip" data-date=${date_change}>
        <header>
          <h2 class="dayTripBlock_label">
            <span>第${i + 1}天 | ${date_change}</span>
          </h2>
        </header>
        <section class="dayTripBlock" data-date=${date_change}></section>
        <div class="add_trip_box" data-date=${date_change}>
          <button class="button add_trip">+ 想去哪裡玩</button>
        </div>
      </div>
      <br />
      `;
  }
  $("div.schedule.lodge").html(tourSchedule_title);
}

function initRenderTourScheData(data) {
  // 遍歷每個日期的 DOM 元素
  $("section.dayTripBlock[data-date]").each(function () {
    let dayTrip = $(this);
    let date = dayTrip.attr("data-date");
    // 篩選對應日期的資料
    let targetData = data.filter((obj) => obj.date === date);

    // 依序渲染每個資料至對應的 DOM 元素上
    targetData.forEach((obj) => {
      let dayTripBlock_all = `
      <div class="dayTripBlock_all" data-attrid=${obj.attractionId} data-scheid=${obj.tourScheduleId}>
        <ul class="dayTripBlock_locationInfo">
          <li class="dayTripBlock_locationInfoImg">
            <img src=${obj.attractionVO.attractionImg}/>
          </li>
        <li class="dayTripBlock_locationInfoBlock">
          <ul class="dayTripBlock_locationInfoBlockDetail">
            <li class="dayTripBlock_locationInfoBlockDetail_time">
              <span>${obj.stayTime}</span><span>分鐘</span>
              <span>${obj.startTime}</span> - <span>${obj.endTime}</span>
            </li>
            <li class="attraction_title">
              ${obj.attractionVO.attractionTitle}
            </li>
            <li class="address">${obj.attractionVO.location}</li>
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
          <p>約 ${obj.carRouteTime}</p>
        </div>
      </div>`;
      dayTrip.append(dayTripBlock_all);
    });

    // 將資料放入tourSchedule_arr內
  });
}

// 點擊"想去哪裡玩"button，開啟右方資訊輸入欄
$(document).on("click", "div.add_trip_box > button.add_trip", function () {
  $("div.add_info").addClass("show");
  $("div.add_info > .create_plan_trip > ul > li.text").text("新增景點");
  $("li.addAttractionBtn").html(`
    <button class="button add_attraction">加入景點</button>
    `);
  btnAddTrip = $(this).closest("div.add_trip_box");
  currentDate = btnAddTrip.attr("data-date");
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
    targetAttraction = $(this).closest("div.dayTripBlock_all");
    getTourScheId = targetAttraction.attr("data-scheid");
    getTourScheDate = $(this).closest("section.dayTripBlock").attr("data-date");
    targetAttraction = $(this).closest("div.dayTripBlock_all");
    findDate = $(this).closest("section.dayTripBlock");
    targetAttractionId = targetAttraction.attr("data-attrId");
    targetAttractionDate = findDate.attr("data-date");
    $("div.add_info").addClass("show");
    $("div.add_info > .create_plan_trip > ul > li.text").text("修改景點資訊");
    $("li.addAttractionBtn").html(`
    <button class="button edit_attraction">修改</button>
    `);

    let currentStayTime = $(this)
      .closest("ul.dayTripBlock_locationInfo")
      .find("span:first-child")
      .text()
      .trim();
    let currentStartTime = $(this)
      .closest("ul.dayTripBlock_locationInfo")
      .find("span:nth-child(3)")
      .text()
      .trim();
    $("#start_time").val(currentStartTime);
    $("#stay_time").val(currentStayTime);
  }
);

// 更新
$(document).on("click", "button.edit_attraction", function () {
  //點擊"修改"後，將頁面收回，並將button改回成"加入景點"
  $("div.add_info").removeClass("show");
  $("li.addAttractionBtn").html(`
    <button class="button add_attraction">加入景點</button>
    `);

  let start_time = $("#start_time").val();
  let stay_time = $("#stay_time").val();
  let attractionId = parseInt($("p.attractionId").text());
  //更新DB
  $.ajax({
    url: `http://localhost:8080/lazy-trip-back/tourScheUpdate`,
    type: "POST",
    data: JSON.stringify({
      tourScheduleId: getTourScheId,
      date: getTourScheDate,
      startTime: start_time,
      stayTime: stay_time,
      endTime: endTimeCalculateForEdit(start_time, stay_time),
      carRouteTime: carRoute_time,
      attractionId: attractionId,
    }),
    dataType: "json",
    contentType: "application/json",
    success: function (tourScheData) {
      console.log(tourScheData);
      // 取得當前attractionId的景點資訊
      $.ajax({
        url: `http://localhost:8080/lazy-trip-back/attractionQueryOne?attractionId=${tourScheData.attractionId}`,
        type: "GET",
        success: function (AttractionData) {
          console.log(AttractionData);
          // 將資料渲染到頁面上
          targetAttraction.html(`
            <ul class="dayTripBlock_locationInfo">
                 <li class="dayTripBlock_locationInfoImg">
                   <img src=${AttractionData.attractionImg}/>
                 </li>
                 <li class="dayTripBlock_locationInfoBlock">
                   <ul class="dayTripBlock_locationInfoBlockDetail">
                     <li class="dayTripBlock_locationInfoBlockDetail_time">
                       <span>${tourScheData.stayTime}</span><span>分</span>
                       <span>${tourScheData.startTime}</span> - <span>${tourScheData.endTime}</span>
                    </li>
                    <li class="attraction_title">
                      ${AttractionData.attractionTitle}
                    </li>
                    <li class="address">${AttractionData.location}</li>
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
                <p>約 ${tourScheData.carRouteTime}</p>
              </div>
          `);
        },
        error: function (xhr) {
          console.log("error");
        },
      });
    },
    error: function (xhr) {
      console.log("error");
    },
  });
  $("#start_time").val("");
  $("#stay_time").val("");
});

// ===================回到行程總表頁面======================== //
$(document).on("click", ".return_tripList", function () {
  console.log(222);
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

        // const origin = current_position
        //   ? new google.maps.LatLng(current_position.lat, current_position.lng)
        //   : selected_attraction.location;

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
let attraction_Map = {};
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
      if (!attraction_Map[currentDate]) {
        attraction_Map[currentDate] = [];
      }
      attraction_Map[currentDate].push({
        attractionTitle: data.attractionTitle,
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        attractionImg: data.attractionImg,
        carRouteTime: carRoute_time,
        attractionId: data.attractionId,
        memberId: 2,
      });

      attraction_arr.push({
        attractionTitle: data.attractionTitle,
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        attractionImg: data.attractionImg,
        carRouteTime: carRoute_time,
        attractionId: data.attractionId,
      });
      $("div.attraction_detail_show").html("");
      renderAttractionToShowBox(attraction_arr);
    },
    error: function (xhr) {
      console.log("error");
    },
  });
}
// 將景點資訊渲染到show box內
function renderAttractionToShowBox(attraction_arr) {
  let new_attraction = "";
  for (let i = 0; i < attraction_arr.length; i++) {
    new_attraction = `<div data-attrid=${attraction_arr[i].attractionId}>
                    <div><img src="${attraction_arr[i].attractionImg}" style="max-width: 100px; max-height: 100px;"></div>
                    <h3 class="attractionTitle">${attraction_arr[i].attractionTitle}</h3>
                    <p class="location">${attraction_arr[i].location}</p>
                    <p class="carRouteTime">${attraction_arr[i].carRouteTime}</p>
                    <p class="latitude">${attraction_arr[i].latitude}</p>
                    <p class="longitude">${attraction_arr[i].longitude}</p>
                    <p class=attractionId>${attraction_arr[i].attractionId}</p>
                </div>`;
  }
  $("div.attraction_detail_show").html(new_attraction);
}

$(document).on("click", "button.add_attraction", function addTourScheduleBox() {
  let stay_time = document.getElementById("stay_time").value;
  let start_time = document.getElementById("start_time").value;
  let endTime = endTimeCalculate(start_time, stay_time);
  // 當執行加入景點時，將景點放入tourSchedule_arr內
  for (let i = attraction_arr.length; i >= attraction_arr.length; i--) {
    tourSchedule_arr.push({
      tourScheduleId: null,
      date: currentDate,
      startTime: start_time,
      stayTime: stay_time,
      endTime: endTime,
      tourId: tourId,
      memberId: 2,
      attraction_info: {
        attractionTitle: attraction_arr[i - 1].attractionTitle,
        location: attraction_arr[i - 1].location,
        latitude: attraction_arr[i - 1].latitude,
        longitude: attraction_arr[i - 1].longitude,
        attractionImg: attraction_arr[i - 1].attractionImg,
        carRouteTime: attraction_arr[i - 1].carRouteTime,
        attractionId: attraction_arr[i - 1].attractionId,
      },
    });
  }
  renderAttractionToTourInfo(tourSchedule_arr, start_time, stay_time);
  // 清空查詢input#search_input和TourScheduleBox的景點資訊
  $("#search_input").val("");
  $("div.attraction_detail_show").html("");
  $("#stay_time").val("");
  $("#start_time").val("");
});

function renderAttractionToTourInfo(tourSchedule_arr, start_time, stay_time) {
  // 將景點資訊渲染到div.schedule.lodge
  let new_dayTripInfo = "";

  for (let i = 0; i < tourSchedule_arr.length; i++) {
    new_dayTripInfo = `
  <div class="dayTripBlock_all" data-attrId=${
    tourSchedule_arr[i].attraction_info.attractionId
  }>
    <ul class="dayTripBlock_locationInfo">
      <li class="dayTripBlock_locationInfoImg">
        <img src=${tourSchedule_arr[i].attraction_info.attractionImg}/>
      </li>
      <li class="dayTripBlock_locationInfoBlock">
        <ul class="dayTripBlock_locationInfoBlockDetail">
          <li class="dayTripBlock_locationInfoBlockDetail_time">
            <span>${tourSchedule_arr[i].stayTime}</span><span>分</span>
            <span>${
              tourSchedule_arr[i].startTime
            }</span> - <span>${endTimeCalculate(start_time, stay_time)}</span>
          </li>
          <li class="attraction_title">
            ${tourSchedule_arr[i].attraction_info.attractionTitle}
          </li>
          <li class="address">${
            tourSchedule_arr[i].attraction_info.location
          }</li>
        </ul>
      </li>
      <li class="dayTripBlock_featureNote">
        <i class="fas fa-book-open"></i>
      </li>
      <li class="dayTripBlock_featureEdit">
        <i class="fas fa-edit"></i>
      </li>
      <li class="dayTripBlock_featureDelete delete" data-date=${currentDate}></li>
    </ul>
    <div class="dayTripBlock_carRouteTime">
      <span class="icon"><i class="fas fa-car"></i></span>
      <p>約 ${tourSchedule_arr[i].attraction_info.carRouteTime}</p>
    </div>
  </div>
    `;
  }
  let targetDayTripBlock = btnAddTrip
    .closest("div.dayTrip")
    .find("section.dayTripBlock");
  $(targetDayTripBlock).append(new_dayTripInfo);
}

$(document).on(
  "click",
  ".dayTripBlock_featureDelete.delete",
  function deleteTourScheduleData() {
    // 找尋DOM元素，刪除景點用途
    targetAttraction = $(this).closest("div.dayTripBlock_all");
    getTourScheId = targetAttraction.attr("data-scheid");

    // 串接刪除API
    $.ajax({
      url: `http://localhost:8080/lazy-trip-back/tourScheDelete?tourScheduleId=${getTourScheId}`,
      type: "DELETE",
      success: function (data) {
        targetAttraction.fadeOut(1000, function () {
          $(this).remove();
        });
      },
      error: function (xhr) {
        console.log("error");
      },
    });
  }
);

function endTimeCalculate(start_time, stay_time) {
  let start_date = new Date(currentDate + " " + start_time);
  let endTime = new Date(
    parseInt(start_date.getTime()) + parseInt(stay_time) * 60000
  );
  return endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function endTimeCalculateForEdit(start_time, stay_time) {
  let start_date = new Date(getTourScheDate + " " + start_time);
  let endTime = new Date(
    parseInt(start_date.getTime()) + parseInt(stay_time) * 60000
  );
  return endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
$(document).on("click", "div.check", function () {
  let tourSchedule_arr_ready = [];
  // 將資料整理成tourSchedule_arr_ready陣列
  for (let i = 0; i < tourSchedule_arr.length; i++) {
    tourSchedule_arr_ready.push({
      date: tourSchedule_arr[i].date,
      startTime: tourSchedule_arr[i].startTime,
      stayTime: tourSchedule_arr[i].stayTime,
      endTime: tourSchedule_arr[i].endTime,
      attractionId: tourSchedule_arr[i].attraction_info.attractionId,
      carRouteTime: tourSchedule_arr[i].attraction_info.carRouteTime,
      tourId: tourId,
    });
  }
  // 將tourSchedule_arr_ready加入到DB內;
  $.ajax({
    url: `http://localhost:8080/lazy-trip-back/tourScheCreate`,
    type: "POST",
    data: JSON.stringify(tourSchedule_arr_ready),
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      arrData = Object.values(data);
      // 將primary key加入tourSchedule_arr中
      for (let i = 0; i < tourSchedule_arr.length; i++) {
        tourSchedule_arr[i].tourScheduleId = arrData[i];
      }
      // 將tourSheduleId加在DOM上
      $("div.dayTripBlock_all[data-attrid]").each(function () {
        let id = $(this).attr("data-attrid");
        let obj = tourSchedule_arr.find(function (item) {
          return parseInt(item.attraction_info.attractionId) === parseInt(id);
        });
        if (obj) {
          $(this).attr("data-scheId", obj.tourScheduleId);
        }
      });
      alert("儲存成功");
    },

    error: function (xhr) {
      console.log("error");
    },
  });
});
