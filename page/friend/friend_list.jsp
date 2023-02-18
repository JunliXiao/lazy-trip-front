<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@ taglib uri = "http://java.sun.com/jsp/jstl/core"
prefix = "c" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Bulma 自訂 -->
    <link rel="stylesheet" href="asset/css/my-bulma.css" />
    <!-- 自定義 CSS -->
    <link rel="stylesheet" href="#" />
    <!-- Font Awesome -->
    <script
      src="https://kit.fontawesome.com/0548105e54.js"
      crossorigin="anonymous"
    ></script>
    <!-- 共用元件 -->
    <script defer src="asset/js/components.js" type="text/javascript"></script>
    <!-- 好友元件 -->
    <script
      defer
      src="page/friend/fr-components.js"
      type="text/javascript"
    ></script>
    <!-- 初始化 Bulma -->
    <script defer src="asset/js/bulma-init.js"></script>
    <title>Document</title>
  </head>
  <body>
    <!-- 導覽列 -->
    <header-component></header-component>

    <!-- 內容 -->
    <div class="columns">
      <div class="column">
        <div class="section">
          <!-- 好友列表 -->
          <div class="block">
            <div class="buttons">
              <button
                id="btn-show-friends"
                class="button is-success is-outlined"
              >
                所有好友
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-three-quarters">
        <div class="section">
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <div class="content">
                  <h1>我的好友</h1>
                </div>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <div class="buttons has-addons is-right">
                  <button class="button">AA</button>
                  <button class="button">BB</button>
                  <button class="button">CC</button>
                  <button class="button">DD</button>
                </div>
              </div>
            </div>
          </nav>

          <hr />
          <div id="friends_summary" class="block">
            <c:forEach items="${requestScope.friends}" var="fr">
              <friend-component
                member-name="<c:out value="${fr.name}"/>"
                member-account="<c:out value="${fr.account}"/>"
              ></friend-component>
            </c:forEach>
          </div>

          <div class="content" style="display: none">
            <h3>Oops！找不到任何好友！</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- 頁尾 -->
    <footer-component></footer-component>
  </body>
</html>