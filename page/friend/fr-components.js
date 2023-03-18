

// 結果卡片元件 ResultCard
class ResultCard extends HTMLElement {

  card_html;
  name;
  username;

  constructor() {
    super();
  }

  buildCard(button_html) {
    // src="https://bulma.io/images/placeholders/96x96.png"
    this.card_html = `
    <div class="card mb-6 mx-6">
      <div class="card-content">

        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img
                src="${API_ROOT}${API_IMG_AVATAR}?member_id=${this.getAttribute("member-id")}"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="media-content">

            <div class="columns">
              <div class="column is-one-third">
                <div class="content">
                  <span class="title is-4">${this.username}</span><span class="is-6">&nbsp;&nbsp;&nbsp;&nbsp;${this.name}</span><br>
                  <p class="subtitle is-6">@${this.getAttribute("member-account")}</p>
                </div>
              </div>              
            </div>
        
          </div>
          <div class="media-right">
            ${button_html}      
          </div>
      </div>

    </div>
  `;
  }

  setNameAndUsername() {
    this.name = this.getAttribute("member-name");
    this.username = this.getAttribute("member-username") == undefined ? this.getAttribute("member-name") : this.getAttribute("member-username");
  }

  toastActionResult(colorType, resultText) {
    bulmaToast.toast({
      message: `<h1><b>${resultText}</b></h1>`,
      type: colorType,
      "position": "top-right",
      "offsetTop": "55px",
      dismissible: true,
      pauseOnHover: true,
      animate: { in: 'fadeIn', out: 'fadeOut' },
    });
  }

}

// 你可能感興趣 Suggestion
class Suggestion extends ResultCard {

  
  constructor() {
    super();
  }

  connectedCallback() {
    this.setNameAndUsername();
    this.buildCard(
      `
      <div class="buttons are-medium">
        <button class="_add_friend button ${PRIMARY_LIGHT} has-text-weight-bold">
          <span class="icon is-small"><i class="fas fa-plus"></i></span>
          <span>加好友</span>
        </button> 
        </button>
        <button class="_block button ${DANGER_LIGHT} has-text-weight-bold">
          <span class="icon is-small"><i class="fas fa-ban"></i></span>
          <span>封鎖</span> 
        </button> 
      </div>  
      `
    );

    this.innerHTML = this.card_html;

    this.querySelector("button._add_friend").addEventListener("click", (event) => {
      let other_id = event.target.closest("suggestion-component").getAttribute("member-id");
      if(!confirm("確認邀請？")) return;
      // addRequest(specifier_id, other_id);
      this.toastActionResult(PRIMARY, '你已對對方提出好友邀請');
    });

    this.querySelector("button._block").addEventListener("click", (event) => {
      let other_id = event.target.closest("suggestion-component").getAttribute("member-id");
      if(!confirm("確認封鎖對方？")) return;
      // block(other_id);
      this.toastActionResult(DANGER, '你已封鎖對方');
    });
    
  }

}

// 好友 Friend
class Friend extends ResultCard {

  constructor() {
    super();
  }

  connectedCallback() {
    this.setNameAndUsername();
    this.buildCard(
      `
      <div class="buttons are-medium">
        <button class="_unfriend button ${INFO_LIGHT} has-text-weight-bold">
          <span class="icon is-small"><i class="fas fa-minus"></i></span>
          <span>解除好友</span> 
        </button> 
      </div> 
      `
    );

    this.innerHTML = this.card_html;

    this.querySelector("button._unfriend").addEventListener("click", (event) => {
      let other_id = event.target.closest("friend-component").getAttribute("member-id");
      if(!confirm("確認解除好友？")) return;
      // unfriend(other_id);
      this.toastActionResult(INFO, '你跟對方已解除好友');
    });
  }

}

// 送出邀請 SentRequest
class SentRequest extends ResultCard {

  constructor() {
    super();
  }

  connectedCallback() {
    this.setNameAndUsername();
    this.buildCard(
      `
      <div class="buttons are-medium">
        <button class="_cancel button ${WARNING_LIGHT} has-text-weight-bold">
          <span class="icon is-small"><i class="fas fa-xmark"></i></span>
          <span>取消</span>
        </button>
      <div>
      `
    );

    this.innerHTML = this.card_html;

    this.querySelector("button._cancel").addEventListener("click", (event) => {
      let other_id = event.target.closest("sent-request-component").getAttribute("member-id");
      if(!confirm("確認取消？")) return;
      // cancelRequest(other_id);
      this.toastActionResult(WARNING, '你已取消好友邀請');
    });
  }

}

// 收到邀請 ReceivedRequest
class ReceivedRequest extends ResultCard {

  constructor() {
    super();
  }
  connectedCallback() {
    this.setNameAndUsername();
    this.buildCard(
      `
        <div class="buttons are-medium">
          <button class="_accept button ${SUCCESS_LIGHT} has-text-weight-bold">
            <span class="icon is-small"><i class="fas fa-check"></i></span>
            <span>接受</span>
          </button>
          <button class="_decline button ${WARNING_LIGHT} has-text-weight-bold">
            <span class="icon is-small"><i class="fas fa-xmark"></i></span>
            <span>婉拒</span>
          </button>
          <button class="_block button ${DANGER_LIGHT} has-text-weight-bold">
            <span class="icon is-small"><i class="fas fa-ban"></i></span>
            <span>封鎖</span>
          </button>   
        </div>     
      `
    )

    this.innerHTML = this.card_html;

    this.querySelector("button._accept").addEventListener("click", (event) => {
      let other_id = event.target.closest("received-request-component").getAttribute("member-id");
      if(!confirm("確認接受？")) return;
      // acceptRequest(other_id);
      this.toastActionResult(SUCCESS, '你已接受對方好友邀請');
    });

    this.querySelector("button._decline").addEventListener("click", (event) => {
      let other_id = event.target.closest("received-request-component").getAttribute("member-id");
      if(!confirm("確認婉拒？")) return;
      // declineRequest(other_id);
      this.toastActionResult(WARNING, '你已婉拒對方好友邀請');
    });

    this.querySelector("button._block").addEventListener("click", (event) => {
      let other_id = event.target.closest("received-request-component").getAttribute("member-id");
      if(!confirm("確認封鎖對方？")) return;
      // block(other_id);
      this.toastActionResult(DANGER, '你已封鎖對方');
    });
  }

}

// 封鎖名單 Blocklist
class Blocklist extends ResultCard {

  constructor() {
    super();
  }

  connectedCallback() {
    this.setNameAndUsername();
    this.buildCard(
      `
      <div class="buttons are-medium">
        <button class="_unfriend button is-info is-light has-text-weight-bold">
          <span class="icon is-small"><i class="fas fa-minus"></i></span>
          <span>解除封鎖</span> 
        </button> 
      </div> 
      `
    );

    this.innerHTML = this.card_html;

    this.querySelector("button._unfriend").addEventListener("click", (event) => {
      let other_id = event.target.closest("blocklist-component").getAttribute("member-id");
      if(!confirm("確認解除封鎖？")) return;
      // unblock(other_id);
      this.toastActionResult(DANGER, '你已解除對對方的封鎖');
    });
  }

}


customElements.define('suggestion-component', Suggestion);
customElements.define('friend-component', Friend);
customElements.define('sent-request-component', SentRequest);
customElements.define('received-request-component', ReceivedRequest);
customElements.define('blocklist-component', Blocklist);