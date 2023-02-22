const tourTitle = document.getElementById("tourTitle");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const tourImg = document.getElementById("tourImg");
const memberId = document.getElementById("memberId");
let tour_arr = [];
let base64;
tourImg.addEventListener("change", function () {
  let reader = new FileReader();
  reader.readAsDataURL(this.files[0]);
  reader.addEventListener("load", function () {
    base64 = reader.result.replace(/^data:.*?;base64,/, "");
  });
});
function init() {
  $.ajax({
    url: "http://localhost:8080/lazy-trip-back/tourQueryAll",
    type: "GET",
    // data: JSON.stringify({
    //   memberId: 1,
    // }), // 將物件資料(不用雙引號) 傳送到指定的 url
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        tour_arr.push({
          tourId: data[i].tourId,
          tourTitle: data[i].tourTitle,
          startDate: data[i].startDate,
          endDate: data[i].endDate,
          tourImg: data[i].tourImg,
          memberId: data[i].memberId,
        });
      }
      renderTourData(data);
    },
    error: function (xhr) {
      console.log("error");
    },
  });
}

$(function () {
  init();
});

// addData
document
  .querySelector("button.button.trip_create_btn")
  .addEventListener("click", function addTourData() {
    $.ajax({
      url: "http://localhost:8080/lazy-trip-back/tourCreate",
      type: "POST",
      data: JSON.stringify({
        tourTitle: tourTitle.value,
        startDate: startDate.value,
        endDate: endDate.value,
        tourImg: base64,
        memberId: 2,
      }),
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        tour_arr.push({
          tourId: data.tourId,
          tourTitle: data.tourTitle,
          startDate: data.startDate,
          endDate: data.endDate,
          tourImg: base64,
          memberId: 2,
        });
        document.querySelector("div.wrapper").innerHTML = "";
        renderTourData(tour_arr);
      },
      error: function (xhr) {
        console.log("error");
      },
    });
  });

// 將資料渲染到主視窗
function renderTourData(tour_arr) {
  let new_card = "";
  for (let i = 0; i < tour_arr.length; i++) {
    new_card += `<div data-card=${tour_arr[i].tourId} class="column item">
                  <div class="card">
                    <div class="card-image">
                      <div class="icon_total">
                      <a href="#" class="trip_pen">
                          <span class="icon"><i class="fas fa-pen"></i></span>
                      </a>
                        <a href="#" class="trip_tag">
                          <span class="icon"><i class="fas fa-tag"></i></span>
                        </a>
                        <a href="#" class="trip_edit">
                          <span class="icon"><i class="fas fa-edit"></i></span>
                        </a>
                        <a href="#" class="trip_delete">
                          <span class="icon"><i class="fas fa-trash"></i></span>
                        </a>
                      </div>
                      <figure class="image is-2by1" style="overflow: hidden">
                        <img class="trip_item_img" src="data:image/*;base64,${tour_arr[i].tourImg}" alt="" />
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="trip_item_block">
                        <h2 class="title is-4">${tour_arr[i].tourTitle}</h2>
                        <input type="text" class="tour_name_update -none" placeholder="更新行程名稱…" value=${tour_arr[i].tourTitle}>
                        <time class="startDate">${tour_arr[i].startDate}</time> ~ 
                        <time class="endDate">${tour_arr[i].endDate}</time>
                        <input type="date" class="tour_startDate_update -none" placeholder="更新起始日期…" value=${tour_arr[i].startDate}>
                        <input type="date" class="tour_endDate_update -none" placeholder="更新結束日期…" value=${tour_arr[i].endDate}>
                        <div class="trip_tag_place">
                          <ul style="display: flex"></ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
  }
  $("div.wrapper").html(new_card);
}

// ====================刪除行程的提示視窗=========================

$(document).on("click", "a.trip_delete", function (e) {
  e.stopPropagation();
  let targetDataCard_id;
  let targetCard;
  $(".trip_delete_lightbox").removeClass("none");
  targetCard = $(this).closest("div.column.item");
  targetDataCard_id = targetCard.attr("data-card");

  // 點擊確認刪除後執行
  $("div.trip_delete_lightbox button.trip_delete_btn").on("click", function () {
    $.ajax({
      url: `http://localhost:8080/lazy-trip-back/tourDelete?tourId=${targetDataCard_id}`,
      type: "DELETE",
      success: function (data) {
        targetCard.fadeOut(1000, function () {
          $(this).remove();
        });
        for (let i = 0; i < tour_arr.length; i++) {
          if (parseInt(targetDataCard_id) === tour_arr[i].tourId) {
            tour_arr.splice(i, 1);
          }
        }
        console.log(tour_arr);
      },
      error: function (xhr) {
        console.log("error");
      },
    });
  });
});

// 取消按鈕
$("div.trip_delete_lightbox button.trip_close_btn").on("click", function () {
  $(".trip_delete_lightbox").addClass("none");
});

// 點擊半透明區塊，執行取消關閉作用
$(".trip_delete_lightbox").on("click", function () {
  $(".trip_delete_lightbox").addClass("none");
});

// 點擊contents區塊，不會關閉
$(".trip_delete_lightbox > .contents").on("click", function (e) {
  e.stopPropagation();
});

// ====================創建行程之浮動視窗========================

$("button.btn_create_trip").on("click", function (e) {
  $(".trip_create_lightbox").removeClass("none");
  e.stopPropagation();
});

// 取消按鈕
$("div.trip_create_lightbox button.trip_close_btn").on("click", function () {
  $(".trip_create_lightbox").addClass("none");
});

// 點擊半透明區塊，執行取消關閉作用
$(".trip_create_lightbox").on("click", function () {
  $(".trip_create_lightbox").addClass("none");
});

// 點擊contents區塊，不會關閉
$(".trip_create_lightbox > .contents").on("click", function (e) {
  e.stopPropagation();
});

// ======================行程標題與日期修改====================== //
$(document).on("click", "a.trip_pen", function () {
  let update_tour_name;
  let tour_startDate_update;
  let tour_endDate_update;
  let targetCard;
  let targetDataCard_id;
  targetCard = $(this).closest("div.column.item");
  targetDataCard_id = targetCard.attr("data-card");
  if ($(this).attr("data-edit") == undefined) {
    $(this).attr("data-edit", true);
    $(this).closest("div.card").find("h2").toggleClass("-none");
    $(this).closest("div.card").find("time").toggleClass("-none");
    $(this)
      .closest("div.card")
      .find("input.tour_name_update")
      .toggleClass("-none");
    $(this)
      .closest("div.card")
      .find("input.tour_startDate_update")
      .toggleClass("-none");
    $(this)
      .closest("div.card")
      .find("input.tour_endDate_update")
      .toggleClass("-none");
  } else {
    update_tour_name = $(this)
      .closest("div.card")
      .find("input.tour_name_update")
      .val()
      .trim();
    tour_startDate_update = $(this)
      .closest("div.card")
      .find("input.tour_startDate_update")
      .val()
      .trim();
    tour_endDate_update = $(this)
      .closest("div.card")
      .find("input.tour_endDate_update")
      .val()
      .trim();
    if (update_tour_name == "") {
      alert("請輸入行程名稱");
    } else {
      let closest_card = $(this).closest("div.card");
      let that = this;
      $.ajax({
        url: "http://localhost:8080/lazy-trip-back/tourUpdate",
        type: "POST",
        data: JSON.stringify({
          tourTitle: update_tour_name,
          startDate: tour_startDate_update,
          endDate: tour_endDate_update,
          tourImg: closest_card
            .find("img.trip_item_img")
            .attr("src")
            .replace(/^data:.*?;base64,/, ""),
          memberId: 2,
          tourId: targetDataCard_id,
        }),
        dataType: "json",
        success: function (data) {
          closest_card.find("h2").html(update_tour_name).toggleClass("-none");
          closest_card
            .find("time.startDate")
            .html(tour_startDate_update)
            .toggleClass("-none");
          closest_card
            .find("time.endDate")
            .html(tour_endDate_update)
            .toggleClass("-none");
          closest_card
            .find("input.tour_name_update")
            .val(update_tour_name)
            .toggleClass("-none");
          closest_card.find("input.tour_startDate_update").toggleClass("-none");
          closest_card.find("input.tour_endDate_update").toggleClass("-none");
          $(that).removeAttr("data-edit");

          // 更新 tour_arr
          for (let i = 0; i < tour_arr.length; i++) {
            if (parseInt(targetDataCard_id) === tour_arr[i].tourId) {
              tour_arr[i].tourTitle = update_tour_name;
              tour_arr[i].startDate = tour_startDate_update;
              tour_arr[i].endDate = tour_endDate_update;
            }
          }
        },
        error: function (xhr) {
          console.log("error");
        },
      });
    }
  }
});

// ======================標籤的浮動視窗==========================
$(document).on("click", "a.trip_tag", function (e) {
  $(".trip_tag_lightbox").removeClass("none");
  e.stopPropagation();
});

// 點擊半透明區塊，執行取消關閉作用
$(".trip_tag_lightbox").on("click", function () {
  $(".trip_tag_lightbox").addClass("none");
});

// 點擊contents區塊，不會關閉
$(".trip_tag_lightbox > .contents").on("click", function (e) {
  e.stopPropagation();
});

let tag_arr = [];

// $(function () {
//   function aaa() {
//     let a = document.querySelectorAll("li.trip_tag_el");
//     for (let i = 0; i < a.length; i++) {
//       a[i].addEventListener("click", function () {
//         console.log(a[i]);
//       });
//     }
//   }
// });

// 點擊創建新標籤產生新標籤
$(".contents > .trip_tag_create").on("click", function () {
  let time = new Date();
  tag_arr.push({
    id: time.getTime(),
    text: $(".trip_tag_input").val(),
  });
  $(".contents > ul.trip_tag_detail").prepend(
    "<li class='trip_tag_el'><input type='checkbox' name='trip_tag_el_checkbox' id='trip_tag_el_checkbox' />" +
      "<span>" +
      $(".trip_tag_input").val() +
      "</span><button class='button delete'></button></li>"
  );
  // select選單動態新增option tag (未完成)
  $("<option value=''>" + $("li.trip_tag_el").text() + "</option>").appendTo(
    ".trip_create_lightbox > .contents > select#trip_tag"
  );
  $(".trip_tag_input").val("");
  console.log(tag_arr);
});

//新增標籤渲染至主行程的區塊內，並執行增減功能
$("ul.trip_tag_detail").on("change", "input#trip_tag_el_checkbox", function () {
  // console.log($(this).closest("li"));
  // console.log($(this).closest("li").text());
  if ($(this).prop("checked")) {
    // $("div.trip_tag_place > ul").prepend($(this).closest("li").text() + " ");
    $(
      "<li style='background-color: rgba(144,238,144,0.4); border-radius: 10px; padding: 4px; margin: 2px;'>" +
        $(this).closest("li").text() +
        "</li>"
    ).prependTo("div.trip_tag_place > ul");
  } else {
    let a = document.querySelectorAll("div.trip_tag_place > ul > li");
    for (let i = 0; i < a.length; i++) {
      if ($(this).closest("li").text() == a[i].textContent) {
        a[i].remove();
      }
    }
  }
});

// 點擊delete執行tag刪除
$("ul.trip_tag_detail").on("click", "button.button.delete", function () {
  // console.log($(this));
  $(this).closest("li").remove();
});

// ================edit編輯觸發跳轉下個視窗=======================
$(document).on("click", "a.trip_edit", function (e) {
  let targetDataCard_id;
  let targetCard;
  let targetStartDate;
  let targetEndDate;
  targetCard = $(this).closest("div.column.item");
  targetDataCard_id = targetCard.attr("data-card");
  targetStartDate = targetCard.find("time.startDate").text();
  targetEndDate = targetCard.find("time.endDate").text();
  location = `http://localhost:8080/lazy-trip-back/tour/tourSchedule.html?tourId=${targetDataCard_id}&memberId=${2}&startDate=${targetStartDate}&endDate=${targetEndDate}`;
  e.preventdefault();
});
