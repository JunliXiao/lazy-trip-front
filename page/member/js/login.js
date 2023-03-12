$(function () {
  const account = $("input#input-username");
  const password = $("input#input-password");
  const check = $("div.content-member");
  $(document).on(
    "keydown",
    "input#input-username, input#input-password",
    function (e) {
      if (e.keyCode == 13) {
        $("button#btn-login").click();
      }
    }
  );
  window.addEventListener("pageshow", function (e) {
    $(document).find("input#myonoffswitch").prop("checked", true);
  });

  $("input#myonoffswitch").on("change", function () {
    $("div.content-member").toggleClass("-on");
    $("div.content-company").toggleClass("-on");
    $("p.msg").empty();
  });

  $("button#btn-login").on("click", function () {
    $("p.msg").text();
    if (check.hasClass("-on")) {
      fetch("login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account: account.val(),
          password: password.val(),
        }),
      })
        .then((resp) => {
          if (resp.redirected) {
            location.href = resp.url;
            alert("登入成功");
          } else {
            resp.json().then((body) => {
              $("p.msg").text(body.errorMessage);
              $("p.msg").css("color", "red");
              // alert(`errorMsg: ${body.errorMessage}`);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // 廠商登入資料
      console.log("company");
    }
  });
});
