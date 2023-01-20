# Lazy Trip

## 關於
緯育 TGA105 第 3 組專題製作，網站前端部分。

## 分工
瀚賢：會員系統、後台  
奕帆：會員行程、廠商行程  
常富：訂單  
俊立：頁首頁尾、好友  
思德：揪團  
力維：廠商房型、優惠券  
永澄：首頁、推薦文章  

## 目錄結構
asset 存放共同資源，如每一頁都會使用的 css、js、圖檔；sass 為自訂 Bulma 框架時所使用；vendor 存放外部函式庫的原始碼。  
page 存放每個人負責的功能對應的資料夾，各自存放專屬其功能的 html、css 等資源。  
基本上，大家應該都是只編輯自己資料夾的內容，某些人或某些時候才會去編輯共同的首頁、頁首或 asset 等。
- root
  - asset
    - css
    - img
    - js
    - sass
    - vendor
  - page
    - article
    - comapny
    - friend
    - group
    - member
    - order
    - tour
    - 登入頁、404 錯誤頁等
  - 首頁、README 文件等
  
## Bulma 框架
### 概念
### 使用方式