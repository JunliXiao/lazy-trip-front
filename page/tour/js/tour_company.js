const company_id = 2;

let tourCom_arr = [];
let tourSchedule_arr = [];
let attraction_arr = [];
let tourTotalInfo_arr = [];
let attractionId;
let base64;

const basic_info_li = document.querySelector("li#li-basic-info");
const search_add_attraction_li = document.querySelector(
  "li#li-search-add-attraction"
);
const mamage_attraction_li = document.querySelector("li#li-mamage-attraction");
const create_attraction_li = document.querySelector("li#li-create-attraction");
const basic_info_div_card = document.querySelector("div.card.basic-info");
const basic_schedule_info = document.querySelector("div.basic-schedule-info");
const search_add_attraction_div_card = document.querySelector(
  "div.card.search-add-attraction"
);
const mamage_attraction_div_card = document.querySelector(
  "div.card.mamage-attraction"
);
const create_attraction_div_card = document.querySelector(
  "div.card.create-attraction"
);
// 行程基本資料
const trip_name = $("input#trip_name");
const trip_start_date = $("input#trip_start_date");
const trip_end_date = $("input#trip_end_date");
const people = $("input#people");
const trip_price = $("input#trip_price");
const trip_img_upload = document.querySelector("input#trip_img_upload");
const trip_feature = document.querySelector("input#trip_feature");
const trip_comfirm_btn = $("button.trip_comfirm_btn");
const trip_clear_btn = $("button.trip_clear_btn");

// 查詢 / 加入景點
let targetTourIdByButtons;
const trip_date = $("input#trip_date");
const attraction_search = $("input#attraction_search");
const attraction_time = $("input#attraction_time");
const attraction_stay_min = $("input#attraction_stay_min");
const buttons_tour_info = $("div.buttons.tour_info");

// 行程管理
const tbody_tour = $("tbody.tbody_tour");

const tbody_sche = $("tbody.tbody_sche");

// google map
let current_position;
let selected_attraction;

// 監聽DOM元素
basic_info_li.addEventListener("click", function () {
  basic_info_li.querySelector("a").classList.add("is-active");
  search_add_attraction_li.querySelector("a").classList.remove("is-active");
  mamage_attraction_li.querySelector("a").classList.remove("is-active");
  basic_info_div_card.classList.remove("-none");
  search_add_attraction_div_card.classList.add("-none");
  mamage_attraction_div_card.classList.add("-none");
  basic_schedule_info.classList.add("-none");
});
search_add_attraction_li.addEventListener("click", function () {
  basic_info_li.querySelector("a").classList.remove("is-active");
  search_add_attraction_li.querySelector("a").classList.add("is-active");
  mamage_attraction_li.querySelector("a").classList.remove("is-active");
  basic_info_div_card.classList.add("-none");
  search_add_attraction_div_card.classList.remove("-none");
  mamage_attraction_div_card.classList.add("-none");
  basic_schedule_info.classList.add("-none");
});
mamage_attraction_li.addEventListener("click", function () {
  basic_info_li.querySelector("a").classList.remove("is-active");
  search_add_attraction_li.querySelector("a").classList.remove("is-active");
  mamage_attraction_li.querySelector("a").classList.add("is-active");
  basic_info_div_card.classList.add("-none");
  search_add_attraction_div_card.classList.add("-none");
  mamage_attraction_div_card.classList.remove("-none");
  basic_schedule_info.classList.remove("-none");
});

$(function () {
  init();
  add_BasicInfo();
  initRenderToAddAttractionButtons();
  initRenderToManageTour();
  deleteTour();
  selectTourByButtons();
  addAttractionIntoDB();
});

function init() {}

trip_img_upload.addEventListener("change", function () {
  const reader = new FileReader();
  reader.readAsDataURL(this.files[0]);
  reader.addEventListener("load", function () {
    base64 = reader.result.replace(/^data:.*?;base64,/, "");
  });
});

function add_BasicInfo() {
  $("button.trip_comfirm_btn").on("click", function () {
    $.ajax({
      url: `http://localhost:8080/lazy-trip-back/tourComCreate`,
      type: "POST",
      data: JSON.stringify({
        tourTitle: trip_name.val().trim(),
        startDate: trip_start_date.val().trim(),
        endDate: trip_end_date.val().trim(),
        tourPerson: people.val().trim(),
        cost: trip_price.val().trim(),
        tourImg: base64,
        companyId: company_id,
      }),
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        tourCom_arr.push({
          tourTitle: trip_name.val().trim(),
          startDate: trip_start_date.val().trim(),
          endDate: trip_end_date.val().trim(),
          tourPerson: people.val().trim(),
          cost: trip_price.val().trim(),
          tourImg: base64,
          companyId: company_id,
          tourComId: data.tourComId,
        });
        console.log(tourCom_arr);
      },
      error: function (xhr) {
        console.log("error");
      },
      complete: function (xhr) {
        renderToManageTour(tourCom_arr);
        renderToButtons(tourCom_arr);
      },
    });
  });
}

function renderToManageTour(tourCom_arr) {
  let str = "";
  for (let i = tourCom_arr.length; i >= tourCom_arr.length; i--) {
    str = `
        <tr data-tourid=${tourCom_arr[i - 1].tourComId}>
          <th class="trip_name">${tourCom_arr[i - 1].tourTitle}</th>
          <th class="-none update_trip_name"><input type="text" name="update_trip_name" id="update_trip_name" class="update_trip_name" value=${
            tourCom_arr[i - 1].tourTitle
          }></th>
          <td class="trip_start_date">${tourCom_arr[i - 1].startDate}</td>
          <td class="-none update_trip_start_date"><input type="date" name="update_trip_start_date" id="update_trip_start_date" class="update_trip_start_date" value=${
            tourCom_arr[i - 1].startDate
          }></td>
          <td class="trip_end_date">${tourCom_arr[i - 1].endDate}</td>
          <td class="-none update_trip_end_date"><input type="date" name="update_trip_end_date" id="update_trip_end_date" class="update_trip_end_date" value=${
            tourCom_arr[i - 1].endDate
          }></td>
          <td class="people">${tourCom_arr[i - 1].tourPerson}</td>
          <td class="-none update_people"><input type="number" name="update_people" id="update_people" class="update_people" value=${
            tourCom_arr[i - 1].tourPerson
          }></td>
          <td class="trip_price">${tourCom_arr[i - 1].cost}</td>
          <td class="-none update_trip_price"><input type="number" name="update_trip_price" id="update_trip_price" class="update_trip_price" value=${
            tourCom_arr[i - 1].cost
          }></td>
          <td class="tour_img">
            <img class="tour_img" src="data:image/*;base64,${
              tourCom_arr[i - 1].tourImg
            }" style="width: 50px; height: 50px"/>
          </td>
          <td class="-none">
            <img class="update_tour_img" src="data:image/*;base64,${
              tourCom_arr[i - 1].tourImg
            }" style="width: 50px; height: 50px"/>
          </td>
          <td><button class="trip_detail">明細</button></td>
          <td><button class="edit_tour_btn">修改</button></td>
          <td><button class="delete_tour_btn">刪除</button></td>
      </tr>
        `;
  }
  tbody_tour.append(str);
}

function renderToButtons() {
  let str = "";
  for (let i = tourCom_arr.length; i >= tourCom_arr.length; i--) {
    str = `
      <button class="button tour_info" data-tourid=${
        tourCom_arr[i - 1].tourComId
      }>${tourCom_arr[i - 1].tourTitle}</button>
    `;
  }
  buttons_tour_info.append(str);
}

function selectTourByButtons() {
  $(document).on("click", "button.button.tour_info", function () {
    targetTourIdByButtons = $(this).attr("data-tourid");
    let tour_title = $("h3.tour_title");
    let tour_date = $("h5.tour_date");
    for (let i = 0; i < tourCom_arr.length; i++) {
      if (parseInt(targetTourIdByButtons) === tourCom_arr[i].tourComId) {
        tour_title.html(`${tourCom_arr[i].tourTitle}`);
        tour_date.html(
          `${tourCom_arr[i].startDate} ~ ${tourCom_arr[i].endDate}`
        );
      }
    }
  });
}

function initRenderToAddAttractionButtons() {
  $.ajax({
    url: `http://localhost:8080/lazy-trip-back/tourComQueryOne?companyId=${company_id}`,
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      console.log(data);
      tourCom_arr = data;
      let str = "";
      for (let i = 0; i < tourCom_arr.length; i++) {
        str += `
        <button class="button tour_info" data-tourid=${tourCom_arr[i].tourComId}>${tourCom_arr[i].tourTitle}</button>
        `;
      }
      buttons_tour_info.html(str);
    },
    error: function (xhr) {
      console.log("error");
    },
    complete: function (xhr) {},
  });
}

function initRenderToManageTour() {
  $.ajax({
    url: `http://localhost:8080/lazy-trip-back/tourComQueryOne?companyId=${company_id}`,
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      console.log(data);
      tourCom_arr = data;
      let str = "";
      for (let i = 0; i < tourCom_arr.length; i++) {
        str += `
        <tr data-tourid=${tourCom_arr[i].tourComId}>
          <th class="trip_name">${tourCom_arr[i].tourTitle}</th>
          <th class="-none update_trip_name"><input type="text" name="update_trip_name" id="update_trip_name" class="update_trip_name" value=${tourCom_arr[i].tourTitle}></th>
          <td class="trip_start_date">${tourCom_arr[i].startDate}</td>
          <td class="-none update_trip_start_date"><input type="date" name="update_trip_start_date" id="update_trip_start_date" class="update_trip_start_date" value=${tourCom_arr[i].startDate}></td>
          <td class="trip_end_date">${tourCom_arr[i].endDate}</td>
          <td class="-none update_trip_end_date"><input type="date" name="update_trip_end_date" id="update_trip_end_date" class="update_trip_end_date" value=${tourCom_arr[i].endDate}></td>
          <td class="people">${tourCom_arr[i].tourPerson}</td>
          <td class="-none update_people"><input type="number" name="update_people" id="update_people" class="update_people" value=${tourCom_arr[i].tourPerson}></td>
          <td class="trip_price">${tourCom_arr[i].cost}</td>
          <td class="-none update_trip_price"><input type="number" name="update_trip_price" id="update_trip_price" class="update_trip_price" value=${tourCom_arr[i].cost}></td>
          <td class="tour_img">
            <img class="tour_img" src="data:image/*;base64,${tourCom_arr[i].tourImg}" style="width: 50px; height: 50px"/>
          </td>
          <td class="-none">
            <img class="update_tour_img" src="data:image/*;base64,${tourCom_arr[i].tourImg}" style="width: 50px; height: 50px"/>
          </td>
          <td><button class="trip_detail">明細</button></td>
          <td><button class="edit_tour_btn">修改</button></td>
          <td><button class="delete_tour_btn">刪除</button></td>
      </tr>
        `;
      }
      tbody_tour.html(str);
    },
    error: function (xhr) {
      console.log("error");
    },
    complete: function (xhr) {},
  });
}

function deleteTour() {
  $(document).on("click", ".delete_tour_btn", function () {
    let targetTour = $(this).closest("tr");
    let targetTourId = targetTour.attr("data-tourid");
    $.ajax({
      url: `http://localhost:8080/lazy-trip-back/tourComDelete?tourComId=${targetTourId}`,
      type: "DELETE",
      success: function (data) {
        targetTour.remove();
        for (let i = 0; i < tourCom_arr.length; i++) {
          if (parseInt(targetTourId) === tourCom_arr[i].tourComId) {
            tourCom_arr.splice(i, 1);
          }
        }
        console.log(tourCom_arr);
      },
      error: function (xhr) {
        console.log("error");
      },
    });
  });
}

// 點擊行程管理 - 修改，執行修改程序
$(document).on("click", ".edit_tour_btn", function () {
  let update_trip_name;
  let update_trip_start_date;
  let update_trip_end_date;
  let update_people;
  let update_trip_price;
  // let update_tour_img;
  let targetTour = $(this).closest("tr");
  let targetTourId = targetTour.attr("data-tourid");

  if ($(this).attr("data-edit") == undefined) {
    $(this).attr("data-edit", true);
    $(this).closest("tr").find("th.trip_name").toggleClass("-none");
    $(this).closest("tr").find("td.trip_start_date").toggleClass("-none");
    $(this).closest("tr").find("td.trip_end_date").toggleClass("-none");
    $(this).closest("tr").find("td.people").toggleClass("-none");
    $(this).closest("tr").find("td.trip_price").toggleClass("-none");
    $(this).closest("tr").find("th.update_trip_name").toggleClass("-none");
    $(this)
      .closest("tr")
      .find("td.update_trip_start_date")
      .toggleClass("-none");
    $(this).closest("tr").find("td.update_trip_end_date").toggleClass("-none");
    $(this).closest("tr").find("td.update_people").toggleClass("-none");
    $(this).closest("tr").find("td.update_trip_price").toggleClass("-none");
  } else {
    update_trip_name = $(this)
      .closest("tr")
      .find("input.update_trip_name")
      .val();

    update_trip_start_date = $(this)
      .closest("tr")
      .find("input.update_trip_start_date")
      .val()
      .trim();
    update_trip_end_date = $(this)
      .closest("tr")
      .find("input.update_trip_end_date")
      .val()
      .trim();
    update_people = $(this)
      .closest("tr")
      .find("input.update_people")
      .val()
      .trim();
    update_trip_price = $(this)
      .closest("tr")
      .find("input.update_trip_price")
      .val()
      .trim();
    // update_tour_img = $(this)
    //   .closest("tr")
    //   .find("input.update_tour_img")
    //   .src()
    //   .trim();
    if (update_trip_name == "") {
      alert("請輸入行程名稱");
    } else {
      let targetTour = $(this).closest("tr");
      let that = this;
      //-------------------------
      $.ajax({
        url: "http://localhost:8080/lazy-trip-back/tourComUpdate",
        type: "POST",
        data: JSON.stringify({
          tourTitle: update_trip_name,
          startDate: update_trip_start_date,
          endDate: update_trip_end_date,
          tourPerson: update_people,
          cost: update_trip_price,
          tourImg: targetTour
            .find("img.tour_img")
            .attr("src")
            .replace(/^data:.*?;base64,/, ""),
          companyId: company_id,
          tourComId: targetTourId,
        }),
        dataType: "json",
        success: function (data) {
          targetTour
            .find("th.trip_name")
            .html(update_trip_name)
            .toggleClass("-none");
          targetTour
            .find("th.update_trip_name")
            .html(
              `<input type="text" name="update_trip_name" id="update_trip_name" class="update_trip_name" value=${update_trip_name}>`
            )
            .toggleClass("-none");
          targetTour
            .find("td.update_trip_start_date")
            .html(
              `<input type="date" name="update_trip_start_date" id="update_trip_start_date" class="update_trip_start_date" value=${update_trip_start_date}>`
            )
            .toggleClass("-none");
          targetTour
            .find("td.trip_start_date")
            .html(update_trip_start_date)
            .toggleClass("-none");
          targetTour
            .find("td.update_trip_end_date")
            .html(
              `<input type="date" name="update_trip_end_date" id="update_trip_end_date" class="update_trip_end_date" value=${update_trip_end_date}>`
            )
            .toggleClass("-none");
          targetTour
            .find("td.trip_end_date")
            .html(update_trip_end_date)
            .toggleClass("-none");
          targetTour
            .find("td.update_people")
            .html(
              `<input type="number" name="update_people" id="update_people" class="update_people" value=${update_people}>`
            )
            .toggleClass("-none");
          targetTour.find("td.people").html(update_people).toggleClass("-none");
          targetTour
            .find("td.update_trip_price")
            .html(
              `<input type="number" name="update_trip_price" id="update_trip_price" class="update_trip_price" value=${update_trip_price}>`
            )
            .toggleClass("-none");
          targetTour
            .find("td.trip_price")
            .html(update_trip_price)
            .toggleClass("-none");
          $(that).removeAttr("data-edit");

          // 更新 tour_arr
          for (let i = 0; i < tourCom_arr.length; i++) {
            if (parseInt(targetTourId) === tourCom_arr[i].tourComId) {
              tourCom_arr[i].tourTitle = update_trip_name;
              tourCom_arr[i].startDate = update_trip_start_date;
              tourCom_arr[i].endDate = update_trip_end_date;
              tourCom_arr[i].tourPerson = update_people;
              tourCom_arr[i].cost = update_trip_price;
            }
          }
        },
        error: function (xhr) {
          console.log("error");
        },
      });
      //-------------------------
    }
  }
});

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
      setAutocompleteBounds();
    });
  } else {
    setAutocompleteBounds();
  }

  function setAutocompleteBounds() {
    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("attraction_search"),
      {
        bounds: current_position
          ? {
              east: current_position.lng + 0.01,
              west: current_position.lng - 0.01,
              south: current_position.lat - 0.01,
              north: current_position.lat + 0.01,
            }
          : undefined,
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
      console.log(selected_attraction);
    });
  }
}

function addAttractionIntoDB() {
  $(".comfirm_add_attraction_btn").on("click", function () {
    $.ajax({
      url: `http://localhost:8080/lazy-trip-back/attractionCreate`,
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        attractionTitle: selected_attraction.name,
        location: selected_attraction.address,
        latitude: selected_attraction.latitude,
        longitude: selected_attraction.longitude,
        attractionImg: selected_attraction.photo.getUrl(),
      }),
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        attraction_arr.push({
          attractionTitle: data.attractionTitle,
          location: data.location,
          latitude: data.latitude,
          longitude: data.longitude,
          attractionImg: data.attractionImg,
          attractionId: data.attractionId,
        });
        attractionId = data.attractionId;
      },
      error: function (xhr) {
        console.log("error");
      },
      complete: function (xhr) {
        addAttractionToTourSchedule(attractionId);
      },
    });
  });
}

function endTimeCalculate(start_time, stay_time) {
  let start_date = new Date(trip_date.val() + " " + start_time);
  let endTime = new Date(
    parseInt(start_date.getTime()) + parseInt(stay_time) * 60000
  );
  return endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function addAttractionToTourSchedule() {
  tourSchedule_arr.push({
    tourComId: targetTourIdByButtons,
    attractionId: attractionId,
    date: trip_date.val(),
    startTime: attraction_time.val(),
    stayTime: attraction_stay_min.val(),
    endTime: endTimeCalculate(attraction_time.val(), attraction_stay_min.val()),
  });
  let transfer_arr = [
    {
      tourComId: targetTourIdByButtons,
      attractionId: attractionId,
      date: trip_date.val(),
      startTime: attraction_time.val(),
      stayTime: attraction_stay_min.val(),
      endTime: endTimeCalculate(
        attraction_time.val(),
        attraction_stay_min.val()
      ),
    },
  ];
  $.ajax({
    url: "http://localhost:8080/lazy-trip-back/tourScheComCreate",
    type: "POST",
    data: JSON.stringify(transfer_arr),
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      // 回傳 tour_schedule_com_id
      console.log(data);
      for (let i = tourSchedule_arr.length; i >= tourSchedule_arr.length; i--) {
        tourSchedule_arr[i - 1].tourScheduleComId = data[0];
      }
      // 清除資訊
      trip_date.val("");
      attraction_search.val("");
      attraction_time.val("");
      attraction_stay_min.val("");
    },
    error: function (xhr) {
      console.log("error");
    },
  });
}

function initRenderScheduleToManageTour(targetTourId) {
  $.ajax({
    url: `http://localhost:8080/lazy-trip-back/tourScheComQueryOne?tourComId=${targetTourId}`,
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      tourTotalInfo_arr = data;
      // 渲染到頁面上
      let str = "";
      for (let i = 0; i < tourTotalInfo_arr.length; i++) {
        str += `
          <tr data-scheid=${tourTotalInfo_arr[i].tourScheduleComId}>
            <th>${tourTotalInfo_arr[i].date}</th>
            <td>${tourTotalInfo_arr[i].startTime}</td>
            <td>${tourTotalInfo_arr[i].endTime}</td>
            <td>${tourTotalInfo_arr[i].stayTime}</td>
            <td>${tourTotalInfo_arr[i].attractionVO.attractionTitle}</td>
            <td>${tourTotalInfo_arr[i].attractionVO.location}</td>
            <td><button class="delete_tour_sche_btn">刪除</button></td>
          </tr>
        `;
      }
      tbody_sche.html(str);
    },
    error: function (xhr) {
      console.log("error");
    },
    complete: function (xhr) {},
  });
}

// 點擊行程管理 - 明細，渲染日行程與景點至頁面
$(document).on("click", "button.trip_detail", function () {
  let targetTourId = $(this).closest("tr").attr("data-tourid");
  initRenderScheduleToManageTour(targetTourId);
});

// 點擊景點管理 - 刪除，執行刪除
$(document).on("click", "button.delete_tour_sche_btn", function () {
  let tourScheId = $(this).closest("tr").attr("data-scheid");
  let that = this;
  $.ajax({
    url: `http://localhost:8080/lazy-trip-back/tourScheComDelete?tourScheduleComId=${tourScheId}`,
    type: "DELETE",
    success: function (data) {
      $(that).closest("tr").remove();
      for (let i = 0; i < tourTotalInfo_arr.length; i++) {
        if (parseInt(tourScheId) === tourTotalInfo_arr[i].tourScheduleComId) {
          tourTotalInfo_arr.splice(i, 1);
        }
      }
    },
    error: function (xhr) {
      console.log("error");
    },
  });
});
