const tourTitle = document.getElementById("tourTitle");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const tourImg = document.getElementById("tourImg");
const memberId = document.getElementById("memberId");
let member_Id = 2;
let tag_set = new Set(["進行中", "想去"]);
let tour_arr = [];
let tag_obj = {};
let base64;
tourImg.addEventListener("change", function () {
  let reader = new FileReader();
  reader.readAsDataURL(this.files[0]);
  reader.addEventListener("load", function () {
    base64 = reader.result.replace(/^data:.*?;base64,/, "");
  });
});
function init() {
  // 主行程初始渲染
  $.ajax({
    url: `http://localhost:8080/lazy-trip-back/tourQueryOne?memberId=${member_Id}`,
    type: "GET",
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
    complete: function (xhr) {
      initTag();
    },
  });
}

function initTag() {
  // 標籤初始渲染
  $.ajax({
    url: `http://localhost:8080/lazy-trip-back/tourTagQueryByMember?memberId=${member_Id}`,
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      initRenderTagInfo(data);
      data.forEach((item) => {
        tag_set.add(item);
      });
    },
    error: function (xhr) {
      console.log("error");
    },
    complete: function (xhr) {
      let tourId_arr = [];
      for (let i = 0; i < tour_arr.length; i++) {
        tourId_arr.push(tour_arr[i].tourId);
      }
      // tourTag
      let req = tourId_arr.map((tourId) => {
        return $.ajax({
          url: `http://localhost:8080/lazy-trip-back/tourTagQueryByTour?tourId=${tourId}&memberId=${member_Id}`,
          type: "GET",
          dataType: "json",
          contentType: "application/json",
        });
      });
      Promise.all(req)
        .then((responses) => {
          for (let i = 0; i < tourId_arr.length; i++) {
            tag_obj[tourId_arr[i]] = responses[i];
          }
          renderTagToEachTour(tag_obj);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
}

$(document).on("click", "i.fa-tag", function renderTagMessageBox() {
  // let tag_li_checkbox =
  let targetCard = $(this).closest("div.column.item").attr("data-card");
});

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
        renderOneTourData(tour_arr);
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
                        <input type="file" class="update_tour_img -none">
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
// 創立主行程的渲染function
function renderOneTourData(tour_arr) {
  let new_card = "";
  for (let i = tour_arr.length; i >= tour_arr.length; i--) {
    new_card += `<div data-card=${tour_arr[i - 1].tourId} class="column item">
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
                        <img class="trip_item_img" src="data:image/*;base64,${
                          tour_arr[i - 1].tourImg
                        }" alt="" />
                        <input type="file" class="update_tour_img -none">
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="trip_item_block">
                        <h2 class="title is-4">${tour_arr[i - 1].tourTitle}</h2>
                        <input type="text" class="tour_name_update -none" placeholder="更新行程名稱…" value=${
                          tour_arr[i - 1].tourTitle
                        }>
                        <time class="startDate">${
                          tour_arr[i - 1].startDate
                        }</time> ~ 
                        <time class="endDate">${tour_arr[i - 1].endDate}</time>
                        <input type="date" class="tour_startDate_update -none" placeholder="更新起始日期…" value=${
                          tour_arr[i - 1].startDate
                        }>
                        <input type="date" class="tour_endDate_update -none" placeholder="更新結束日期…" value=${
                          tour_arr[i - 1].endDate
                        }>
                        <div class="trip_tag_place">
                          <ul style="display: flex"></ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
  }
  $("div.wrapper").append(new_card);
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

// 點擊創建新標籤產生新標籤
let targetTour;
$(document).on("click", "i.fa-tag", function () {
  // 清空tagMessageBox勾選欄位
  let tag_li = $(`ul.trip_tag_detail li.trip_tag_el`);
  tag_li.find("input#trip_tag_el_checkbox").prop("checked", false);
  targetTour = $(this).closest("div.column.item");
  // 更新tagMessageBox的標籤勾選資訊
  let key;
  for (let i = 0; i < Object.keys(tag_obj).length; i++) {
    if (targetTour.attr("data-card") === Object.keys(tag_obj)[i]) {
      key = Object.keys(tag_obj)[i];
      for (let j = 0; j < tag_obj[key].length; j++) {
        targetTag_li = $(
          `ul.trip_tag_detail li.trip_tag_el[data-tag=${tag_obj[key][j]}]`
        );
        if (targetTag_li.attr("data-tag") === tag_obj[key][j]) {
          targetTag_li.find("input#trip_tag_el_checkbox").prop("checked", true);
        }
      }
    }
  }
});
// 產生新tag
$(".contents > .trip_tag_create").on("click", function createNewTag() {
  let inputText = $(".trip_tag_input").val();
  $.ajax({
    url: `http://localhost:8080/lazy-trip-back/tourTagCreate`,
    type: "POST",
    data: JSON.stringify({
      memberId: 2,
      tourTagTitle: inputText,
    }),
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      // 對本地Set新增
      tag_set.add(inputText);
      renderTagInfo(inputText);
      alert("儲存成功");
    },
    error: function (xhr) {
      console.log("error");
    },
  });
});

function renderTagToEachTour(tag_obj) {
  for (let key in tag_obj) {
    let value = tag_obj[key];
    let elem = $(`div[data-card="${key}"] div.trip_tag_place ul`);
    let str = "";
    for (let i = 0; i < value.length; i++) {
      str += `<li data-tag=${value[i]}>${value[i]}</li>`;
    }
    elem.html(str);
  }
}

function renderTagInfo(inputText) {
  let tagDetail = "";
  tagDetail = `<li data-tag=${inputText} class="trip_tag_el"><input type="checkbox" name="trip_tag_el_checkbox" id="trip_tag_el_checkbox" /><span>${inputText}</span><button class="button delete"></button></li>`;
  $(".contents > ul.trip_tag_detail").prepend(tagDetail);
  // select選單動態新增option tag
  let optionTag = "";
  optionTag = `<option value=${inputText}>${inputText}</option>`;
  $("select#trip_tag").append(optionTag);
  $(".trip_tag_input").val("");
}

function initRenderTagInfo(data) {
  for (let i = 0; i < data.length; i++) {
    let tagDetail = "";
    tagDetail = `<li data-tag=${data[i]} class="trip_tag_el"><input type="checkbox" name="trip_tag_el_checkbox" id="trip_tag_el_checkbox" /><span>${data[i]}</span><button class="button delete"></button></li>`;
    $(".contents > ul.trip_tag_detail").prepend(tagDetail);
    // select選單動態新增option tag
    let optionTag = "";
    optionTag = `<option value=${data[i]}>${data[i]}</option>`;
    $("select#trip_tag").append(optionTag);
  }
  $(".trip_tag_input").val("");
}

// 標籤管理頁面 -- 勾選觸發新增至主行程card與刪除功能
$("ul.trip_tag_detail").on("change", "input#trip_tag_el_checkbox", function () {
  let targetTagPlace = targetTour.find("div.trip_tag_place > ul");
  let targetTourId = targetTour.attr("data-card");
  let tourTagTitle = $(this).closest("li.trip_tag_el").attr("data-tag");

  let that = $(this);
  if ($(this).prop("checked")) {
    $.ajax({
      url: `http://localhost:8080/lazy-trip-back/tourTagCreate`,
      type: "POST",
      data: JSON.stringify({
        memberId: member_Id,
        tourTagTitle: tourTagTitle,
        tourId: targetTourId,
      }),
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        alert("新增成功");
        let textContent = that.closest("li.trip_tag_el").find("span").text();
        // 更新tag_obj
        for (let i = 0; i < Object.keys(tag_obj).length; i++) {
          if (parseInt(Object.keys(tag_obj)[i]) != targetTourId) {
            // 創立新的key(tourId)
            console.log(111);
          } else {
            console.log(222);
            tag_obj[targetTourId].push(textContent);
            console.log(333);
          }
        }
        // 渲染到tourTagMessageBox管理頁面上
        $(`<li data-tag=${textContent}>${textContent}</li>`).prependTo(
          targetTagPlace
        );
      },
      error: function (xhr) {
        console.log("error");
      },
    });
  } else {
    $.ajax({
      url: `http://localhost:8080/lazy-trip-back/tourTagOnTourDelete?tourId=${targetTourId}&memberId=${member_Id}&tourTagTitle=${tourTagTitle}`,
      type: "DELETE",
      success: function (data) {
        alert(data);
        let currentDataTag = that.closest("li.trip_tag_el").attr("data-tag");
        let renderTargetTag = targetTour.find("div.trip_tag_place > ul > li");
        for (let i = 0; i < renderTargetTag.length; i++) {
          if (currentDataTag === $(renderTargetTag[i]).attr("data-tag")) {
            renderTargetTag[i].remove();
          }
        }
        // 更新tag_obj
        for (let i = 0; i < Object.keys(tag_obj).length; i++) {
          if (parseInt(Object.keys(tag_obj)[i]) != targetTourId) {
            const index = tag_obj[targetTourId].indexOf(currentDataTag);
            if (index > -1) {
              tag_obj[targetTourId].splice(index, 1);
            }
          }
        }
      },
      error: function (xhr) {
        console.log("error");
      },
    });
  }
});

// 點擊delete執行tag刪除
$("ul.trip_tag_detail").on(
  "click",
  "button.button.delete",
  function deleteTag() {
    let targetDataCard_id;
    let targetCard;
    targetTag_li = $(this).closest("li.trip_tag_el");
    let tourTagTitle = $(this).prev("span").text();
    targetCard = $(this).closest("div.column.item");
    targetDataCard_id = targetCard.attr("data-card");
    $.ajax({
      url: `http://localhost:8080/lazy-trip-back/tourTagDelete?memberId=${member_Id}&tourTagTitle=${tourTagTitle}`,
      type: "DELETE",
      success: function (data) {
        alert(data);
        targetTag_li.remove();
        // 對本地Set刪除
        for (let value of tag_set.values()) {
          if (targetTag_li.attr("data-tag") === value) tag_set.delete(value);
        }
        // select選單動態刪除option tag
        let optionTag = $("select#trip_tag").find("option");
        for (let i = 0; i < optionTag.length; i++) {
          if (tourTagTitle === $(optionTag[i]).val()) {
            $(`#trip_tag option[value=${$(optionTag[i]).val()}]`).remove();
          }
        }
      },
      error: function (xhr) {
        console.log("error");
      },
    });
  }
);

// 主行程的查詢功能
$("input#tour_search").on("keyup", function (e) {
  if (e.keyCode === 13) {
    let queryStr = $("input#tour_search").val();
    $.ajax({
      url: `http://localhost:8080/lazy-trip-back/tourTitleQuery?queryStr=${queryStr}`,
      type: "GET",
      success: function (data) {
        $("div.column.wrapper").html("");
        console.log(data);
        renderTourData(data);
        renderTagToEachTour(tag_obj);
      },
      error: function (xhr) {
        console.log("error");
      },
    });
  }
});

$(document).on("click", "div.trip_tag_place > ul > li", function () {
  let tourTagContent = $(this).text();
  $.ajax({
    url: `http://localhost:8080/lazy-trip-back/tourQueryByTourTagTitle?tourTagTitle=${tourTagContent}&memberId=${member_Id}`,
    type: "GET",
    success: function (data) {
      console.log(data);
      $(`div.column.item[data-card]`).each(function () {
        let card = $(this);
        let dataCard = card.attr("data-card");
        if (data.indexOf(dataCard) == -1) {
          card.addClass("-none");
        } else {
          card.removeClass("-none");
        }
      });
    },
    error: function (xhr) {
      console.log("error");
    },
  });
});

// 標籤管理頁面 -- 搜尋功能
$(document).on("keyup", "#trip_tag_search", function (e) {
  if (e.keyCode === 13) {
    let queryStr = $("#trip_tag_search").val();
    $.ajax({
      url: `http://localhost:8080/lazy-trip-back/tourTagQuery?queryStr=${queryStr}&memberId=${member_Id}`,
      type: "GET",
      success: function (data) {
        console.log(data);
        $("ul.trip_tag_detail").html("");
        let str = "";
        for (let i = 0; i < data.length; i++) {
          str += `
          <li data-tag=${data[i]} class="trip_tag_el">
            <input type="checkbox" name="trip_tag_el_checkbox" id="trip_tag_el_checkbox"/>
            <span>${data[i]}</span>
            <button class="button delete"></button>         
          </li>`;
        }
        $("ul.trip_tag_detail").html(str);
      },
      error: function (xhr) {
        console.log("error");
      },
    });
  }
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
