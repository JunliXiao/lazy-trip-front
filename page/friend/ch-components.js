// 聊天室元件 Chatroom
class Chatroom extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = 
    `
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
            <div class="columns">
              <div class="column is-one-third">
                <div class="content">
                  <p class="title is-4">${this.getAttribute("chatroom-name")}</p>
                  <p class="subtitle is-6">Chatroom ID: ${this.getAttribute("chatroom-id")}</p>
                </div>
              </div>              
            </div>      
          </div>

          <div class="media-right">
            <button class="_start_chat button is-primary is-light is-medium has-text-weight-bold">
            CHAT!
            </button>     
          </div>
      </div>
    </div>
    `;

    this.querySelector("button._start_chat").addEventListener("click", (event) => {
      console.log(`Start chat in chatroom ${this.getAttribute("chatroom-id")}`)
    });
  }

}

// 聊天訊息紀錄 ChatLog
class ChatLog extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="card" style="height: 475px !important">
      <header class="card-header">
        <p class="card-header-title">Component</p>
        <button class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </header>
      <div class="card-content">
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          nec iaculis mauris.
          <a href="#">@bulmaio</a>. <a href="#">#css</a>
          <a href="#">#responsive</a>
          <br />
          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Save</a>
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
    `;
  }

}

customElements.define("chatroom-component", Chatroom);