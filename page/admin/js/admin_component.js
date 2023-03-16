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
          
          <p class="menu-label">功能列表</p>
          <ul class="menu-list">
            <li>
              <a href="member_table.html" class="has-icon">
                <span class="icon has-update-mark"
                  ><i class="mdi mdi-table"></i
                ></span>
                <span class="menu-item-label">會員管理</span>
              </a>
            </li>
            <li>
              <a href="company_table.html" class="has-icon">
                <span class="icon"
                  ><i class="mdi mdi-table"></i
                ></span>
                <span class="menu-item-label">廠商管理</span>
              </a>
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
      
      `;
  }
}
{
  /* <p class="menu-label">General</p>
          <ul class="menu-list">
            <li>
              <a href="index.html" class="has-icon">
                <span class="icon"><i class="mdi mdi-desktop-mac"></i></span>
                <span class="menu-item-label">首頁</span>
              </a>
            </li>
          </ul> */
  /* <li>
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
            </li> */
}
class Header extends HTMLElement {
  header_html = `
    <nav id="navbar-main" class="navbar is-fixed-top">
        <div class="navbar-brand">
          <a class="navbar-item is-hidden-desktop jb-aside-mobile-toggle">
            <span class="icon"
              ><i class="mdi mdi-forwardburger mdi-24px"></i
            ></span>
          </a>
          <div class="navbar-item has-control"></div>
        </div>
        <div class="navbar-brand is-right">
          <a
            class="navbar-item is-hidden-desktop jb-navbar-menu-toggle"
            data-target="navbar-menu"
          >
            <span class="icon"><i class="mdi mdi-dots-vertical"></i></span>
          </a>
        </div>
        <div class="navbar-menu fadeIn animated faster" id="navbar-menu">
          <div class="navbar-end">
            <div
              class="navbar-item has-dropdown has-dropdown-with-icons has-divider is-hoverable"
            >
              <a class="navbar-link is-arrowless admin_main" >
                
                <span>Sample Menu</span>
                
              </a>
              
            </div>

            <a title="Log out" class="navbar-item is-desktop-icon-only admin_logout">
              <span class="icon"><i class="mdi mdi-logout"></i></span>
              <span>Log out</span>
            </a>
          </div>
        </div>
      </nav>
        `;
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.header_html;
    $(document).on("click", "a.admin_main", function () {
      let ori = location.origin;
      location.href = ori + "/lazy-trip-back/page/admin/member_table.html";
    });
    $(document).on("click", "a.admin_logout", function () {
      let ori = location.origin;
      // location.href = ori + "/lazy-trip-back/page/logout.html";
      fetch("logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          if (resp.redirected) {
            alert("登出成功");
            location.href = resp.url;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
    $(function () {
      // Function-----------------
      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
      }
      // ---------------------
      let admin = getCookie("adminUsername");
      if (admin != null) {
        $(".admin_main")
          .find("span")
          .text("管理員    " + `${admin}`);
      }
    });

    // 下拉式選單
    // <div class="navbar-item has-dropdown has-dropdown-with-icons has-divider is-hoverable">
    //   <a class="navbar-link is-arrowless">
    //     <span class="icon">
    //       <i class="mdi mdi-menu"></i>
    //     </span>
    //     <span>Sample Menu</span>
    //     <span class="icon">
    //       <i class="mdi mdi-chevron-down"></i>
    //     </span>
    //   </a>
    //   <div class="navbar-dropdown">
    //     <a href="profile.html" class="navbar-item">
    //       <span class="icon">
    //         <i class="mdi mdi-account"></i>
    //       </span>
    //       <span>My Profile</span>
    //     </a>
    //     <a class="navbar-item">
    //       <span class="icon">
    //         <i class="mdi mdi-settings"></i>
    //       </span>
    //       <span>Settings</span>
    //     </a>
    //     <a class="navbar-item">
    //       <span class="icon">
    //         <i class="mdi mdi-email"></i>
    //       </span>
    //       <span>Messages</span>
    //     </a>
    //     <hr class="navbar-divider" />
    //     <a class="navbar-item">
    //       <span class="icon">
    //         <i class="mdi mdi-logout"></i>
    //       </span>
    //       <span>Log Out</span>
    //     </a>
    //   </div>
    // </div>;
  }
}

customElements.define("aside-component", Aside);
customElements.define("header-component", Header);
