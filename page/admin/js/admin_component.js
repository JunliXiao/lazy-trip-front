class Aside extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <aside class="aside is-placed-left is-expanded">
        <div class="aside-tools">
          <div class="aside-tools-label">
            <span><b>LAZY</b> 後台 </span>
          </div>
        </div>
        <div class="menu is-menu-main">
          <p class="menu-label">General</p>
          <ul class="menu-list">
            <li>
              <a href="index.html" class="has-icon">
                <span class="icon"><i class="mdi mdi-desktop-mac"></i></span>
                <span class="menu-item-label">首頁</span>
              </a>
            </li>
          </ul>
          <p class="menu-label">功能列表</p>
          <ul class="menu-list">
            <li>
              <a href="tables.html" class="is-active has-icon">
                <span class="icon has-update-mark"
                  ><i class="mdi mdi-table"></i
                ></span>
                <span class="menu-item-label">會員管理</span>
              </a>
            </li>
            <li>
              <a href="forms.html" class="has-icon">
                <span class="icon"
                  ><i class="mdi mdi-square-edit-outline"></i
                ></span>
                <span class="menu-item-label">Forms</span>
              </a>
            </li>
            <li>
              <a href="profile.html" class="has-icon">
                <span class="icon"><i class="mdi mdi-account-circle"></i></span>
                <span class="menu-item-label">Profile</span>
              </a>
            </li>
            <li>
              <a class="has-icon has-dropdown-icon">
                <span class="icon"><i class="mdi mdi-view-list"></i></span>
                <span class="menu-item-label">Submenus</span>
                <div class="dropdown-icon">
                  <span class="icon"><i class="mdi mdi-plus"></i></span>
                </div>
              </a>
              <ul>
                <li>
                  <a href="#void">
                    <span>Sub-item One</span>
                  </a>
                </li>
                <li>
                  <a href="#void">
                    <span>Sub-item Two</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <!-- <p class="menu-label">About</p>
          <ul class="menu-list">
            <li>
              <a
                href="https://github.com/vikdiesel/admin-one-bulma-dashboard"
                target="_blank"
                class="has-icon"
              >
                <span class="icon"><i class="mdi mdi-github-circle"></i></span>
                <span class="menu-item-label">GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="https://justboil.me/bulma-admin-template/free-html-dashboard/"
                class="has-icon"
              >
                <span class="icon"><i class="mdi mdi-help-circle"></i></span>
                <span class="menu-item-label">About</span>
              </a>
            </li>
          </ul> -->
        </div>
      </aside>
      <section class="section is-title-bar">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <ul>
                <li>後台</li>
                <li>會員管理</li>
              </ul>
            </div>
          </div>
          <!-- <div class="level-right">
            <div class="level-item">
              <div class="buttons is-right">
                <a
                  href="https://github.com/vikdiesel/admin-one-bulma-dashboard"
                  target="_blank"
                  class="button is-primary"
                >
                  <span class="icon"
                    ><i class="mdi mdi-github-circle"></i
                  ></span>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div> -->
        </div>
      </section>
      `;
  }
}

customElements.define("aside-component", Aside);
