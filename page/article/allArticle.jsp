<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.*"%>
<%@ page import="article.model.*"%>


<%
    ArticleService articleSvc = new ArticleService();
    List<ArticleVO> list = articleSvc.getAll();
    pageContext.setAttribute("list",list);
%>

<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>推薦文章</title>
    <link rel="stylesheet" href="../asset/css/my-bulma.css" />
    <link rel="stylesheet" href="./css/allArticle.css" />
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
              
			  <FORM METHOD="post" ACTION="<%=request.getContextPath()%>/article/ArticleServlet2">
			     <input type="hidden" name="memberId"  value="${articleVO.memberId}">
			     <input type="hidden" name="action"	value="getMember_For_Display">
			     <a class="navbar-item" href="myArticle.jsp"> 我的文章</a> </FORM>
              

              
              
              
              
              <hr class="navbar-divider" />
              <a href="index_not_in.html" class="navbar-item"> 登出 </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

     <div class="columns" style="
                margin: 15px 5px 15px;
                display: flex;
  				align-items: center;
    ">
    <b style="font-size: 40px;" > 推薦文章 </b>
    
    <a href="addArticle.jsp"><button class="button is-link is-outlined" style="margin-left: 990px ">
    新增
    </button></a>
    </div>
    
    
<section class="section">

		<div class="container">
			<div class="columns is-centered">
				<div class="column is-half">
					<form method="post"
						action="<%=request.getContextPath()%>/article/ArticleServlet2">
						<div class="field has-addons">
							<div class="control is-expanded">
								<input class="input is-rounded" type="text" placeholder="輸入關鍵字"
									name="select">
							</div>
							<div class="control">
								<button class="button is-link is-outlined">搜尋</button>
							</div>
						</div>
						<input type="hidden" name="action" value="search">
					</form>
				</div>
			</div>
		</div>







		<table
      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth "
    >
		<tr>
		<th class="has-background-primary-light has-text-primary">文章編號</th>
		<th class="has-background-primary-light has-text-primary">文章標題</th>
		<th class="has-background-primary-light has-text-primary">文章內容</th>
<!-- 		<th class="has-background-primary-light has-text-primary">文章圖片</th> -->
		<th class="has-background-primary-light has-text-primary">發布時間</th>
		<th class="has-background-primary-light has-text-primary">修改時間</th>
		<th class="has-background-primary-light has-text-primary">會員編號</th>
		<th class="has-background-primary-light has-text-primary">行程編號</th>
		<th class="has-background-primary-light has-text-primary">查看文章</th>
	</tr>
	<c:forEach var="articleVO" items="${list}" >
		<tr>
			<td>${articleVO.articleId}</td>
			<td>${articleVO.articleTitle}</td>
			<td>${articleVO.articleContent}</td>
<%-- 			<td>${articleVO.articleImage}</td> --%>
			<td>${articleVO.articleDate}</td>
			<td>${articleVO.articleDateChange}</td>
			<td>${articleVO.memberId}</td>
			<td>${articleVO.tourId}</td>
			<td>
			  <FORM METHOD="post" ACTION="<%=request.getContextPath()%>/article/ArticleServlet2" style="margin-bottom: 0px;">
			     <button class="button is-info is-outlined">查詢</button>
			     <input type="hidden" name="articleId"  value="${articleVO.articleId}">
			     <input type="hidden" name="action"	value="getOne_For_Display"></FORM>
			</td>
		</tr>
	</c:forEach>

    </table>
</section>
    
    
    
    
    

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
