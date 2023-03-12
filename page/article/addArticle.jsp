<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.article.model.*"%>
<%@ page import="com.articleImage.model.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.sql.*"%>


<%
// String adminId = "1";
// String memberId = "1";

ArticleVO articleVO = (ArticleVO) request.getAttribute("articleVO"); //EmpServlet.java(Concroller), 存入req的empVO物件
%>

<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>新增文章</title>
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
				aria-expanded="false" data-target="navbarBasicExample"> <span
				aria-hidden="true"></span> <span aria-hidden="true"></span> <span
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
						<a class="navbar-item"> 新的行程 </a> <a class="navbar-item"> 新的揪 團
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
							我的好友 </a> <a class="navbar-item" href="myArticle.jsp"> 我的文章 </a>
						<hr class="navbar-divider" />
						<a href="index_not_in.html" class="navbar-item"> 登出 </a>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<div class="columns"
		style="margin: 15px 5px 15px; display: flex; align-items: center;">
		<b style="font-size: 40px;"> 新增文章 </b>
		<!-- 		<button class="button is-link is-outlined " style="margin-left: 990px">新增</button> -->

	</div>


	<%-- 錯誤表列 --%>
	<c:if test="${not empty errorMsgs}">
		<font style="color: red">請修正以下錯誤:</font>
		<ul>
			<c:forEach var="message" items="${errorMsgs}">
				<li style="color: red">${message}</li>
			</c:forEach>
		</ul>
	</c:if>

	<section class="section">
	<FORM METHOD="post" ACTION="ArticleServlet2" name="form1" enctype="multipart/form-data">
		<table style="margin-left: 10px">
			<tr>
				<td>文章標題:</td>
				<td><input type="TEXT" name="articleTitle" size="45"
					placeholder="請輸入標題"
					value="<%=(articleVO == null) ? "" : articleVO.getArticleTitle()%>" /></td>
			</tr>
			<tr>
				<td>文章內容:</td>
				<td>
					<div class="control is-loading">
						<textarea class="textarea" name="articleContent"
							placeholder="請輸入內容"><%=(articleVO == null) ? "" : articleVO.getArticleContent()%>
 		 		</textarea>
					</div>
				</td>
			</tr>

			<tr>
				<td>新增圖片：</td>
				<td>
					<div id="file-js-example" class="file has-name">
						<label class="file-label">
						 <input class="file-input"
							type="file" name="articleImage"  value="<%=(articleVO == null) ? "" : articleVO.getArticleImage()%>">
							 <span class="file-cta">
								<span class="file-icon"> <i class="fas fa-upload"></i>
							</span> <span class="file-label"> 選擇圖片 </span>
						</span> <span class="file-name"> 未選擇圖片 </span>
						</label>
					</div>
				</td>
			</tr>
			

<!-- 			<tr> -->
<!-- 				<td>新增圖片：</td> -->
<%-- 				<td><input type="file" name="articleImage" value="<%=(articleVO == null) ? "" : articleVO.getArticleImage()%>"></td> --%>
<!-- 			</tr> -->

			<tr>
				<td>日期:</td>
				<td><input name="articleDate" id="f_date1" type="text"
					readonly="readonly" style="border: none"></td>
			</tr>

			<tr>
				<td>行程編號:</td>
				<td><input type="TEXT" name="tourId" size="45"
					readonly="readonly" style="border: none"
					value="<%=(articleVO == null) ? "1" : articleVO.getTourId()%>" /></td>
			</tr>

			
		</table>
		<br> <input type="hidden" name="action" value="insert">
		<button class="button is-link is-outlined" style="margin-left: 10px">送出新增
		</button>


	</FORM>
	</section>
	
	
<script>
  const fileInput = document.querySelector('#file-js-example input[type=file]');
  fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
      const fileName = document.querySelector('#file-js-example .file-name');
      fileName.textContent = fileInput.files[0].name;
    }
  }
</script>



	<%
	java.sql.Timestamp articleDate = null;
	try {
		articleDate = articleVO.getArticleDate();
	} catch (Exception e) {
		articleDate = new java.sql.Timestamp(System.currentTimeMillis());
	}
	%>
	<link rel="stylesheet" type="text/css"
		href="<%=request.getContextPath()%>/datetimepicker/jquery.datetimepicker.css" />
	<script src="<%=request.getContextPath()%>/datetimepicker/jquery.js"></script>
	<script
		src="<%=request.getContextPath()%>/datetimepicker/jquery.datetimepicker.full.js"></script>


	<script>
		$.datetimepicker.setLocale('zh');
		$('#f_date1').datetimepicker({
			theme : '',
			timepicker : true,
			step : 1,
			format : 'Y-m-d H:i:s', //format:'Y-m-d H:i:s',
			value : new Date(),
		});
	</script>






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