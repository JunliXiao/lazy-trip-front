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

customElements.define("chatroom-component", Chatroom);