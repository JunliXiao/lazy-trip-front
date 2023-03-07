
let roomList = [];
let base64;
let compaynID;

function init() {
  $.ajax({
    url: "http://localhost:8080/lazy-trip-back/roomtypeservlet",
    type: "POST",
    data: {
      action:'getAllByCompanyID',
      companyID:'2'
    }, // 將物件資料(不用雙引號) 傳送到指定的 url

    success: function (data) {
        console.log(data);
      for (let i = 0; i < data.length; i++) {
        roomList.push({
          roomTypeID: data[i].roomTypeID,
          companyID: data[i].companyID,
          roomTypeName: data[i].roomTypeName,
          roomTypePerson: data[i].roomTypePerson,
          roomTypeQuantity: data[i].roomTypeQuantity,
          roomTypePrice: data[i].roomTypePrice,
          roomTypeImgVO: data[i].roomTypeImgVO
        });
      }
      document.querySelector("tbody.roomList").innerHTML = "";
      renderTourData(roomList);
      console.log(roomList);
    },
    error: function (xhr) {
      console.log("error");
    },
  });
}
$(function () {
  init();
});
// 將資料渲染到主視窗
function renderTourData(roomList) {
    let newList = "";
    for (let i = 0; i < roomList.length; i++) {
      newList+=`<tr data-card=${roomList[i].roomTypeID} class="this" >
                  <th>${roomList[i].roomTypeName}</th>
                  <td>${roomList[i].roomTypePerson}</td>
                  <td>${roomList[i].roomTypeQuantity}</td>
                  <td>${roomList[i].roomTypeImgVO.roomTypeImg}</td>
                  <td>照片</td>
                  <td>${roomList[i].roomTypePrice}</td>
                  <td> <button class="button is-primary">修改</button></td>
                  <td> <button class="button is-primary">刪除</button></td>
                </tr>`;
    }
    $("tbody.roomList").html(newList);
  }


