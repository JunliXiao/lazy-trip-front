// 結果卡片元件 ResultCard
class ResultCard extends HTMLElement {

  card_html;

  constructor() {

  }

  buildCard(button_part) {
    this.card_html = `
    <style>
      .icon .fas:hover{
        font-size: 1.4em;
        transition: 0.2s ease-out-elastic;
      } 
    </style>
    <div class="card mb-6">
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
            <p class="title is-4">${this.getAttribute("member-name")}</p>
            <p class="subtitle is-6">@${this.getAttribute("member-account")}</p>
          </div>
          <div class="media-right">
            ${button_part}      
          </div>
      </div>


      </div>
    </div>
  `;
  }

}

// 你可能感興趣 Suggestion
class Suggestion extends HTMLElement {
  
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <style>
      .icon .fas:hover{
        font-size: 1.4em;
        transition: 0.2s ease-out-elastic;
      } 
    </style>
    <div class="card mb-6">
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
            <p class="title is-4">${this.getAttribute("member-name")}</p>
            <p class="subtitle is-6">@${this.getAttribute("member-account")}</p>
          </div>
          <div class="media-right">
            <button class="_add_friend js-modal-trigger button is-primary is-medium" data-target="modal-js-example">
              加好友
            </button>         
          </div>
      </div>


      </div>
    </div>
  `;

    // setBulmaModal();
    this.querySelector("button._add_friend").addEventListener("click", (event) => {
      let other_id = event.target.closest("suggestion-component").getAttribute("member-id");
      if(!confirm("確認邀請？")) return;
      addRequest(specifier_id, other_id);
    });
  }

}

// 好友 Friend
class Friend extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <style>
      .icon .fas:hover{
        font-size: 1.4em;
        transition: 0.2s ease-out-elastic;
      } 
    </style>
    <div class="card mb-6">
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
            <p class="title is-4">${this.getAttribute("member-name")}</p>
            <p class="subtitle is-6">@${this.getAttribute("member-account")}</p>
          </div>
          <div class="media-right">
            <span class="icon is-large is-clickable">
              <i class="fas fa-lg fa-message"></i>
            </span>
            <span class="icon is-large is-clickable">
              <i class="fas fa-lg fa-people-group"></i>
            </span>              
            <span class="icon is-large is-clickable">
              <i class="fas fa-lg fa-user-xmark"></i>
            </span>          
          </div>
        </div>
  
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris.
        </div>
      </div>
    </div>
  `;

    this.querySelectorAll("span.icon").forEach(s => s.addEventListener("click", () => console.log("Icon clicked")))
  }

}

// 送出邀請 SentRequest
class SentRequest extends HTMLElement {

  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <style>
      .icon .fas:hover{
        font-size: 1.4em;
        transition: 0.2s ease-out-elastic;
      } 
    </style>
    <div class="card mb-6">
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
            <p class="title is-4">${this.getAttribute("member-name")}</p>
            <p class="subtitle is-6">@${this.getAttribute("member-account")}</p>
          </div>
          <div class="media-right">
            <button class="_cancel button is-warning is-medium">取消</button>         
          </div>
      </div>


      </div>
    </div>
  `;

    this.querySelector("button._cancel").addEventListener("click", (event) => {
      let other_id = event.target.closest("sent-request-component").getAttribute("member-id");
      if(!confirm("確認取消？")) return;
      cancelRequest(other_id);
    });
  }

}

// 收到邀請 ReceivedRequest
class ReceivedRequest extends HTMLElement {

  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <style>
      .icon .fas:hover{
        font-size: 1.4em;
        transition: 0.2s ease-out-elastic;
      } 
    </style>
    <div class="card mb-6">
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
            <p class="title is-4">${this.getAttribute("member-name")}</p>
            <p class="subtitle is-6">@${this.getAttribute("member-account")}</p>
          </div>
          <div class="media-right">
            <div class="buttons">
              <button class="_accept button is-success is-medium">接受</button>
              <button class="_decline button is-danger is-medium">婉拒</button>         
            </div>
          </div>  
      </div>


      </div>
    </div>
  `;
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