class Card extends HTMLElement {
  card_html = `
  <div class="card mb-4">
    <header class="card-header">
    <div class="media-content card-header-title">
        <figure class="image is-48x48 mr-3">
        <img
            src="https://bulma.io/images/placeholders/96x96.png"
            alt="Placeholder image"
            class="is-rounded"
        />
        </figure>
        <span class="title is-5 mb-4 mem_username">John Smith</span>
    </div>

    <button class="card-header-icon" aria-label="more options">
        <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
    </button>
    </header>
    <div class="card-image">
    <figure class="image is-4by3">
        <img
        src="https://bulma.io/images/placeholders/1280x960.png"
        alt="Placeholder image"
        />
    </figure>
    </div>
    <div class="card-content">
    <div class="media">
        <div class="media-left"></div>
    </div>

    <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
        <a href="#">#css</a> <a href="#">#responsive</a>
        <br />
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
    </div>
</div>`;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.card_html;
  }
}

customElements.define("card-component", Card);
