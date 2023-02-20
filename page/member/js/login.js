$(function () {
  const account = $("input#input-username");
  const password = $("input#input-password");

  $("button#btn-login").on("click", function () {
    // e.preventDefault();
    fetch("http://localhost:8080/lazy-trip-back/login", {
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
        } else {
          resp.json().then((body) => {
            alert(`errorMsg: ${body.errorMessage}`);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    document.getElementById("btn-signup").addEventListener("click", () => {
      window.location.href = "signup.html";
    });
  });

  $("");
});
