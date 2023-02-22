$(function () {
  // Function-----------------
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  //   ---------------
  let username = getCookie("memUsername");

  if (username != null) {
    $("span.username").text(username);
  } else {
    let html = `
    <div class="navbar-item">
    <div class="buttons">
      <a class="button is-primary" href="page/signup.html">
        <strong> 註冊 </strong>
      </a>
      <a class="button is-light" href="page/login.html"> 登入 </a>
    </div>
  </div>`;
    $("div.member").empty();
    $("div.member").append(html);
  }
});
