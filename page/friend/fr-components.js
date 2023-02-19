// 你可能感興趣 Suggestion
class Suggestion extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="box">
        陌生會員
      </div>
    `
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

    this.querySelector("button._cancel").addEventListener("click", () => console.log("CANCEL clicked"));
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
            <button class="_cancel button is-danger is-medium">婉拒</button>         
          </div>
      </div>


      </div>
    </div>
  `;

    this.querySelector("button._cancel").addEventListener("click", () => console.log("DECLINE clicked"));
  }

}

customElements.define('friend-component', Friend);
customElements.define('sent-request-component', SentRequest);
customElements.define('received-request-component', ReceivedRequest);