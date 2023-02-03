// ================nav and tabs====================
//第二步：函式
function tab_active() {
  let target_tab;
  switch (location.hash) {
    case "#tab1":
      target_tab = "tab1";
      break;
    case "#tab2":
      target_tab = "tab2";
      break;
    default:
      target_tab = "tab1";
  }

  $("a.tab").removeClass("-on");
  $("a.tab[data-target=" + target_tab + "]").addClass("-on");

  $("div.tab").removeClass("-on");
  $("div.tab." + target_tab).addClass("-on");
}

$(function () {
  // console.log(location);
  // console.log(location.hash);
  tab_active();
  // 第三步;

  $("a.tab").on("click", function (e) {
    e.preventDefault();

    /* 將頁籤列表移除所有 -on，再將指定的加上 -on */
    $(this).closest("ul").find("a.tab").removeClass("-on");
    $(this).addClass("-on");

    /* 找到對應的頁籤內容，加上 -on 來顯示 */
    $("div.tab").removeClass("-on");
    $("div.tab." + $(this).attr("data-target")).addClass("-on");

    // 第一步
    history.pushState(null, null, "#" + $(this).attr("data-target"));
  });
});

// 第二步 popstate事件觸發，執行tab_active()
window.addEventListener("popstate", function () {
  tab_active();
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

// 日期轉換方法，轉換成ISO表示
function toLocaleDate(date, day) {
  let raw_date = new Date(date);
  let date_ts = raw_date.getTime();
  raw_date.setTime(date_ts + day * 1000 * 60 * 60 * 24);
  return raw_date.toLocaleDateString();
}

// 行程圖片選取與展示
$(".all_img > img").on("click", function (e) {
  let change_src = e.target.getAttribute("src");
  $("#show_el > img").attr("src", change_src);
});

// 點擊創建行程，將資料渲染到主視窗
$("button.button.trip_create_btn").on("click", function () {
  const trip_name = $("#trip_name").val();
  const trip_start_date = $("#trip_date").val();
  const trip_stay = $("#trip_stay").val();
  const trip_tag = $("#trip_tag").val();
  const trip_pic = $(".trip_pic_box > #show_el > img").attr("src");
  let new_card = $(
    "<div class='column item'><div class='card'><div class='card-image'><div class='icon_total' style='right: 0; position: absolute; z-index: 10;'><div class='icon'><a href='#' class='trip_tag'><span class='icon'><i class='fas fa-tag'></i></span></a></div><div class='icon'><a href='#' class='trip_coedit'><i class='fas fa-users'></i></a></div><div class='icon'><a href='#' class='trip_edit'><i class='fas fa-edit'></i></a></div><div class='icon'><a href='#' class='trip_delete'><i class='fas fa-trash'></i></a></div></div><figure class='image is-2by1' style='overflow: hidden'><img class='trip_item_img' src='" +
      trip_pic +
      "' alt='' /></figure></div><div class='card-content' style='padding: 10px'><div class='trip_item_block'><h2 class='title is-4' style='margin: 0px'>" +
      trip_name +
      "</h2><time datetime='" +
      trip_start_date +
      "'>" +
      trip_start_date +
      " ~ " +
      toLocaleDate(trip_start_date, trip_stay) +
      "</time><div class='trip_tag_place'><ul style='display: flex'></ul></div></div></div></div></div>"
  );
  $(new_card).appendTo("div.column.wrapper");
});

let my_el;

// ====================刪除行程的提示視窗=========================
$(document).on("click", "a.trip_delete", function (e) {
  $(".trip_delete_lightbox").removeClass("none");
  //my_el = this...li
  e.stopPropagation();
});

// 取消按鈕
$("div.trip_delete_lightbox button.trip_close_btn").on("click", function () {
  $(".trip_delete_lightbox").addClass("none");
});

// 確認按鈕
$("div.trip_delete_lightbox button.trip_delete_btn").on("click", function () {
  console.log($(this));
});

// 點擊半透明區塊，執行取消關閉作用
$(".trip_delete_lightbox").on("click", function () {
  $(".trip_delete_lightbox").addClass("none");
});

// 點擊contents區塊，不會關閉
$(".trip_delete_lightbox > .contents").on("click", function (e) {
  e.stopPropagation();
});

// ==================邀請朋友連結碼的浮動視窗======================
$(document).on("click", "a.trip_coedit", function (e) {
  $(".trip_coedit_lightbox").removeClass("none");
  e.stopPropagation();
});

// 取消按鈕
$("div.trip_coedit_lightbox button.trip_close_btn").on("click", function () {
  $(".trip_coedit_lightbox").addClass("none");
});

// 點擊半透明區塊，執行取消關閉作用
$(".trip_coedit_lightbox").on("click", function () {
  $(".trip_coedit_lightbox").addClass("none");
});

// 點擊contents區塊，不會關閉
$(".trip_coedit_lightbox > .contents").on("click", function (e) {
  e.stopPropagation();
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

//查詢標籤

// 隨機產生顏色(X)
function randomRbgColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// ================edit編輯觸發跳轉下個視窗=======================
$("a.trip_edit").on("click", function () {
  location = "../3.html";
});
