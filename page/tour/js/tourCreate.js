const tourTitle = document.getElementById("tourTitle");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const tourImg = document.getElementById("tourImg");
const memberId = document.getElementById("memberId");
let base64;
tourImg.addEventListener("change", function() {
	let reader = new FileReader();
	reader.readAsDataURL(this.files[0]);
	reader.addEventListener("load", function() {
		base64 = reader.result;
	});
});
document.querySelector("button").addEventListener("click", function() {
	$.ajax({
		url: "http://localhost:8081/Trip/tourCreate",
		type: "POST",
		data: JSON.stringify({
			tourTitle: tourTitle.value,
			startDate: startDate.value,
			endDate: endDate.value,
			memberId: memberId.value,
			tourImg: base64,
		}),
		dataType: "json",
		contentType: "application/json",
		success: function(data) {
			console.log(111)
			console.log(data);
		},
		error: function(xhr) {
			console.log("error");
		},
		complete: function(xhr) {
			// request 完成之後執行(在 success / error 事件之後執行)
			console.log(xhr);
		},
	});
});