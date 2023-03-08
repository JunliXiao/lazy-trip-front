// 結果卡片元件 ResultCard
class ResultCard extends HTMLElement {

  card_html;

  constructor() {
    super();
  }

  buildCard(button_html) {
    this.card_html = `
    <div class="card mb-6 mx-6">
      <div class="card-content">

        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img
                src="https://bulma.io/images/placeholders/96x96.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="media-content">

            <div class="columns">
              <div class="column is-one-third">
                <div class="content">
                  <p class="title is-4">${this.getAttribute("member-name")}</p>
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

}

// 你可能感興趣 Suggestion
class Suggestion extends ResultCard {
  
  constructor() {
    super();
  }

  connectedCallback() {
    this.buildCard(
      `
        <button class="_add_friend button is-primary is-light is-medium has-text-weight-bold">
        加好友
        </button> 
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
    this.buildCard(
      `
        <span class="icon is-large is-clickable">
          <i class="fas fa-lg fa-message"></i>
        </span>
        <span class="icon is-large is-clickable">
          <i class="fas fa-lg fa-people-group"></i>
        </span>              
        <span class="icon is-large is-clickable">
          <i class="fas fa-lg fa-user-xmark"></i>
        </span> 
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
    this.buildCard(
      `
        <button class="_cancel button is-warning is-light is-medium has-text-weight-bold">取消</button>
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
    this.buildCard(
      `
        <div class="buttons">
          <button class="_accept button is-success is-light is-medium has-text-weight-bold">接受</button>
          <button class="_decline button is-warning is-light is-medium has-text-weight-bold">婉拒</button>  
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