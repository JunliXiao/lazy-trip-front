// 好友 Friend
class Friend extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
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
              <p class="title is-4">${this.getAttribute("fullname")}</p>
              <p class="subtitle is-6">@${this.getAttribute("username")}</p>
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
  }

}

customElements.define('friend-component', Friend);