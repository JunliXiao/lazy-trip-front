// 自訂一些共用的 UI 元件，頁面只要引進這份 js 檔，即可使用
// 用法：在適合的位置加入 <header-component></header-component>
// 參考來源：https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

// 頁首 Header (置頂導覽列)
class Header extends HTMLElement {

  header_html = `
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
            <a href="/page/group/group_new_group.html" class="navbar-item"> 新的揪團 </a>
          </div>
        </div>

        <a href="/page/group/group_all.html" class="navbar-item"> 揪團 </a>

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
            <a class="navbar-item"> 我的文章 </a>
            <hr class="navbar-divider" />
            <a href="../../index_not_in.html" class="navbar-item"> 登出 </a>
          </div>
        </div>
      </div>
    </div>
    </nav>`;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.header_html;
  }
}

// 頁尾 Footer
class Footer extends HTMLElement {

  footer_html = `
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
    </footer>`;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.footer_html;
  }
}

// 測試用
class Example extends HTMLElement {

  constructor() {
    super();
    this.addEventListener("click", () => {console.log(`Hello ${this.getAttribute('foo')}`)});
  }

  connectedCallback() {
    this.innerHTML = `<button class='button is-info is-outlined'>${this.textContent}</button>`;
  }
}

customElements.define('header-component', Header);
customElements.define('footer-component', Footer);
customElements.define('example-component', Example);