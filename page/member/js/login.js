$(function () {
  const account = $("input#input-username");
  const password = $("input#input-password");

  $("button#btn-login").on("click", function () {
    $("p.msg").text();
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
  });
});
