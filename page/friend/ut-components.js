class ControlPanel extends HTMLElement {

  CONTROL_TARGET; // suggestions, friends, sent-requests, received-requests, chatrooms

  RESULTS_FILTER_HTML = 
    `
    <div class="buttons has-addons is-right">
      <button class="button">AA</button>
      <button class="button">BB</button>
    </div>
    `;

  CHAT_CONTROL_HTML = 
    `
    <button class="button is-outlined is-primary mr-4">
      <span class="icon is-clickable">
        <i class="fas fa-comment-dots"></i>
      </span>
      <span><b>新的訊息</b><span>
    </button>
    <button class="button is-outlined is-success js-modal-trigger" data-target="modal-new-chatroom">
      <span class="icon is-clickable">
        <i class="fas fa-user-group"></i>
      </span>
      <span><b>新聊天室</b><span>
    </button>
    `;

  static observedAttributes = ["control-target"];

  constructor() {
    super();
    this.innerHTML = 
      `
      <nav class="level pt-6 px-6">
                  <div class="level-left">
                    <div class="level-item">
                      <!-- 搜尋框 -->
                      <div class="field has-addons">
                        <p class="control">
                          <input class="input" type="text" placeholder="根據會員暱稱" />
                        </p>
                        <p class="control">
                          <button class="button">搜尋感興趣的會員</button>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="level-right">
                    <div class="level-item">
                      <div class="buttons has-addons is-right">
                        <button class="button">AA</button>
                        <button class="button">BB</button>
                      </div>
                    </div>
                  </div>
                </nav>
      `;
  }

  connectedCallback() {

  }

  attributeChangedCallback(attr, prev, curr) {
    let node_right_part =  document.querySelector("control-panel-component div.level-right div.level-item");
    switch (attr) {
      case "control-target":
        switch (curr) {
          case "suggestions":
            updateSearchButton("搜尋感興趣的會員"); 
            if (prev == "chatrooms") node_right_part.innerHTML = this.RESULTS_FILTER_HTML;
            break;
          case "friends":
            updateSearchButton("搜尋好友");
            if (prev == "chatrooms") node_right_part.innerHTML = this.RESULTS_FILTER_HTML;
            break;
          case "sent-requests":
            updateSearchButton("搜尋送出邀請");
            if (prev == "chatrooms") node_right_part.innerHTML = this.RESULTS_FILTER_HTML;
            break;
          case "received-requests":
            updateSearchButton("搜尋收到邀請");
            if (prev == "chatrooms") node_right_part.innerHTML = this.RESULTS_FILTER_HTML;
            break;
          case "chatrooms":
            updateSearchButton("搜尋聊天室");
            document.querySelector("control-panel-component div.level-right div.level-item").innerHTML = this.CHAT_CONTROL_HTML;
            const $trigger = document.querySelector(`button[data-target="modal-new-chatroom"]`);
            const modal = $trigger.dataset.target;
            const $target = document.getElementById(modal);

            $trigger.addEventListener("click", () => {
              openModal($target);
            });
            break;
        }
        break;
    }

    function updateSearchButton(newText) {
      document.querySelector("control-panel-component div.level-left p.control button").textContent = newText;
    }
  }

}

customElements.define("control-panel-component", ControlPanel);