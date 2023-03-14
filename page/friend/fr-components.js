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
        <button class="_add_friend button is-primary is-light has-text-weight-bold">
          <span class="icon is-small"><i class="fas fa-plus"></i></span>
          <span>加好友</span>
        </button> 
        </button>
        <button class="_block button is-danger is-light has-text-weight-bold">
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
      addRequest(specifier_id, other_id);
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
        <button class="_unfriend button is-info is-light has-text-weight-bold">
          <span class="icon is-small"><i class="fas fa-minus"></i></span>
          <span>解除</span> 
        </button> 
      </div> 
      `
    );

    this.innerHTML = this.card_html;

    this.querySelectorAll("span.icon").forEach(s => s.addEventListener("click", () => console.log("Icon clicked")))
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
        <button class="_cancel button is-warning is-light has-text-weight-bold">
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
      cancelRequest(other_id);
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
          <button class="_accept button is-success is-light has-text-weight-bold">
            <span class="icon is-small"><i class="fas fa-check"></i></span>
            <span>接受</span>
          </button>
          <button class="_decline button is-warning is-light has-text-weight-bold">
            <span class="icon is-small"><i class="fas fa-xmark"></i></span>
            <span>婉拒</span>
          </button>
          <button class="_block button is-danger is-light has-text-weight-bold">
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
      acceptRequest(other_id);
    });

    this.querySelector("button._decline").addEventListener("click", (event) => {
      let other_id = event.target.closest("received-request-component").getAttribute("member-id");
      if(!confirm("確認婉拒？")) return;
      declineRequest(other_id);
    });
  }

}

customElements.define('suggestion-component', Suggestion);
customElements.define('friend-component', Friend);
customElements.define('sent-request-component', SentRequest);
customElements.define('received-request-component', ReceivedRequest);