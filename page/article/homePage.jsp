<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LazyTrip.io</title>
    <!-- Bulma 自訂 -->
    <link rel="stylesheet" href="../asset/css/my-bulma.css" />
    <!-- 自定義 CSS -->
    <link rel="stylesheet" href="./css/homepage-style.css" />
    <!-- Font Awesome -->
    <script
      src="https://kit.fontawesome.com/0548105e54.js"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <!-- 導覽列 -->
    <nav
      class="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <!-- Logo -->
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <!-- <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          /> -->
          <strong>LazyTrip.io</strong>
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <!-- 靠左 -->
        <div class="navbar-start"></div>

        <!-- 靠右 -->
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item">
              <span class="icon"><i class="fas fa-plus"></i></span>
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item"> 新的行程 </a>
              <a class="navbar-item"> 新的揪團 </a>
            </div>
          </div>

          <a href="#" class="navbar-item"> 揪團 </a>

          <a href="#" class="navbar-item"> 行程 </a>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item">
              <span class="icon-text"
                ><span class="icon"><i class="fas fa-user"></i></span
                ><span>周杰倫</span></span
              >
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item"> 我的頁面 </a>
              <a class="navbar-item"> 我的訂單 </a>
              <a href="page/friend/friend_main.html" class="navbar-item">
                我的好友
              </a>
              <a class="navbar-item" href="myArticle.jsp"> 我的文章 </a>
              <a class="navbar-item" href="#"> 站內客服 </a>
              <hr class="navbar-divider" />
              <a href="index_not_in.html" class="navbar-item"> 登出 </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- 內容 -->

    <section
      class="hero is-medium has-background-primary-light has-text-centered"
    >
      <div id="picture-behind-search" class="hero-body">
        <p class="title">網頁維修中</p>
        <div class="columns">
          <div class="column"></div>
          <div class="column">
            <input
              class="input is-primary"
              type="text"
              placeholder="輸入你想去的地方..."
            />
            <div class="column">
              <button
                class="button is-primary"
                onclick="location.href='https://www.wibibi.com/info.php?tid=117'"
              >
                查詢
              </button>
            </div>
          </div>

          <div class="column"></div>
        </div>
      </div>
    </section>

    <div class="column"></div>
    <div class="columns is-centered">
      <h2><b><a class="hot" href="https://www.kkday.com/zh-tw">熱門行程</a></b></h2>
    </div>
    <div class="columns">
      <div class="column">
        <span>台中3天兩夜</span>
        <img src="../asset/img/dog.jpg" alt="">
      </div>
      <div class="column">花東5日遊
        <img src="../asset/img/dog.jpg" alt="">
      </div>
      <div class="column">夜遊台北
        <img src="../asset/img/dog.jpg" alt="">
      </div>
      <div class="column">台南古城
        <img src="../asset/img/dog.jpg" alt="">
      </div>
    </div>
    <hr>

    <div class="columns is-centered">
      <h2><b><a class="hot" href="https://www.kkday.com/zh-tw">揪團活動</a></b></h2>
    </div>
    <div class="columns">
      <div class="column">
        <span>台中3天兩夜</span>
        <img src="../asset/img/dog.jpg" alt="">
      </div>
      <div class="column">花東5日遊
        <img src="../asset/img/dog.jpg" alt="">
      </div>
      <div class="column">夜遊台北
        <img src="../asset/img/dog.jpg" alt="">
      </div>
      <div class="column">台南古城
        <img src="../asset/img/dog.jpg" alt="">
      </div>
    </div>
    <hr>

    <div class="columns is-centered">
      <h2><b><a class="hot" href="https://www.kkday.com/zh-tw">廠商推薦</a></b></h2>
    </div>
    <div class="columns">
      <div class="column">
        <span>台中3天兩夜</span>
        <img src="../asset/img/dog.jpg" alt="">
      </div>
      <div class="column">花東5日遊
        <img src="../asset/img/dog.jpg" alt="">
      </div>
      <div class="column">夜遊台北
        <img src="../asset/img/dog.jpg" alt="">
      </div>
      <div class="column">台南古城
        <img src="../asset/img/dog.jpg" alt="">
      </div>
    </div>
    <hr>

    <div class="columns is-centered">
      <h2><b><a class="hot" href="allArticle.jsp">推薦文章</a></b></h2>
    </div>
    <div class="columns">
      <div class="column">
        <span>台中3天兩夜</span>
        <img src="../asset/img/dog.jpg" alt="">
      </div>
      <div class="column">花東5日遊
        <img src="../asset/img/dog.jpg" alt="">
      </div>
      <div class="column">夜遊台北
        <img src="../asset/img/dog.jpg" alt="">
      </div>
      <div class="column">台南古城
        <img src="../asset/img/dog.jpg" alt="">
      </div>
    </div>
    <hr>


    <!-- 頁尾 -->
    <footer class="footer">
      <div class="columns">
        <div class="column">
          <div class="content">
            <h4>關於</h4>
            <p>
              <strong>LazyTrip.io</strong> 由 緯育 Java 雲端服務開發技術養成班
              TGA105 梯第三組所製作之結訓專題。
            </p>
          </div>
        </div>
        <div class="column">
          <div class="content">
            <h4>合作廠商</h4>
            <a href="#">後台登入</a>
          </div>
        </div>
      </div>
    </footer>

    <script src="../../asset/js/bulma-init.js"></script>
  </body>
</html>
