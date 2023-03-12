<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.article.model.*"%>
<%@ page import="java.util.*"%>

<%
ArticleVO articleVO = (ArticleVO) request.getAttribute("articleVO"); //EmpServlet.java(Concroller), 存入req的empVO物件

  ArticleService articleSvc = new ArticleService();
  List<ArticleVO> list = articleSvc.getOneByMember(1); //先將會員ID寫死為1
  pageContext.setAttribute("list",list);
%>

<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>我的文章</title>
<link rel="stylesheet" href="../asset/css/my-bulma.css" />
<link rel="stylesheet" href="" />
<script src="https://kit.fontawesome.com/0548105e54.js"
	crossorigin="anonymous"></script>


</head>
<body>
	<!-- 導覽列 -->
	<nav class="navbar has-shadow" role="navigation"
		aria-label="main navigation">
		<!-- Logo -->
		<div class="navbar-brand">
			<a class="navbar-item" href="https://bulma.io"> <!-- <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            /> --> <strong>LazyTrip.io</strong>
			</a> <a role="button" class="navbar-burger" aria-label="menu"
				aria-expanded="false" data-target="navbarBasicExample">
				<span aria-hidden="true"></span> <span aria-hidden="true"></span> <span
				aria-hidden="true"></span>
			</a>
		</div>

		<div id="navbarBasicExample" class="navbar-menu">
			<!-- 靠左 -->
			<div class="navbar-start"></div>

			<!-- 靠右 -->
			<div class="navbar-end">
				<div class="navbar-item has-dropdown is-hoverable">
					<a class="navbar-item"> <span class="icon"><i
							class="fas fa-plus"></i></span>
					</a>
					<div class="navbar-dropdown">
						<a class="navbar-item"> 新的行程 </a> <a class="navbar-item"> 新的揪團
						</a>
					</div>
				</div>

				<a href="#" class="navbar-item"> 揪團 </a> <a href="#"
					class="navbar-item"> 行程 </a>
				<div class="navbar-item has-dropdown is-hoverable">
					<a class="navbar-item"> <span class="icon-text"><span
							class="icon"><i class="fas fa-user"></i></span><span>周杰倫</span></span>
					</a>
					<div class="navbar-dropdown">
						<a class="navbar-item"> 我的頁面 </a> <a class="navbar-item"> 我的訂單
						</a> <a href="page/friend/friend_main.html" class="navbar-item">
							我的好友 </a>
							 <a class="navbar-item" href="myArticle.jsp"> 我的文章 </a>
						<hr class="navbar-divider" />
						<a href="index_not_in.html" class="navbar-item"> 登出 </a>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<div class="columns"
		style="margin: 15px 5px 15px; display: flex; align-items: center;">
		<b style="font-size: 40px;"> 我的文章 </b>
		<a href="addArticle.jsp"><button class="button is-link is-outlined" style="margin-left: 990px ">
    		新增
    	</button></a>

	</div>
<section class="section">
	<table
		class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" 
		style="table-layout:fixed;"
		>
		<tr>
			<th>文章編號</th>
			<th>文章標題</th>
			<th>文章內容</th>
			<th>發布時間</th>
			<th>修改時間</th>
			<th>行程編號</th>
			<th>查詢</th>
			<th>修改</th>
			<th>刪除</th>
		</tr>
			<c:forEach var="articleVO" items="${list}"  >
		<tr>
			<td>${articleVO.articleId}</td>
			<td style="overflow:hidden;text-overflow: ellipsis;">${articleVO.articleTitle}</td>
			<td>${articleVO.articleContent}</td>
			<td>${articleVO.articleDate}</td>
			<td>${articleVO.articleDateChange}</td>
			<td>${articleVO.tourId}</td>
			
			<td>
			  <FORM METHOD="post" ACTION="<%=request.getContextPath()%>/article/ArticleServlet2" style="margin-bottom: 0px;">
			     <button class="button is-info is-outlined">查詢</button>
			     <input type="hidden" name="articleId"  value="${articleVO.articleId}">
			     <input type="hidden" name="action"	value="getOne_For_Display"></FORM>
			</td>
			<td>
				<FORM METHOD="post"
					ACTION="<%=request.getContextPath()%>/article/ArticleServlet2"
					style="margin-bottom: 0px;">
					<a href="updateArticle.jsp"> <button class="button is-success is-outlined">修改</button></a>
					<input type="hidden" name="articleId" value="${articleVO.articleId}"> 
					<input type="hidden" name="action" value="getOne_For_Update">
				</FORM>
			</td>
			<td>
				<FORM METHOD="post"
					ACTION="<%=request.getContextPath()%>/article/ArticleServlet2"
					style="margin-bottom: 0px;">
					<button class="button is-danger is-outlined">刪除</button>
					<input type="hidden"  name="articleId" value="${articleVO.articleId}">
					<input	type="hidden" name="action" value="delete">
				</FORM>
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
						<strong>LazyTrip.io</strong> 由 緯育 Java 雲端服務開發技術養成班 TGA105
						梯第三組所製作之結訓專題。
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