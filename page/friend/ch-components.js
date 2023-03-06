// 聊天室元件 Chatroom
class Chatroom extends HTMLElement {

  CHATROOM_ID;
  CHATROOM_NAME;
  CHATROOM_SINCE;

  constructor() {
    super();
  }

  connectedCallback() {
    this.CHATROOM_ID = this.getAttribute("chatroom-id");
    this.CHATROOM_NAME = this.getAttribute("chatroom-name");
    let dt = new Date(this.getAttribute("chatroom-created-at") * 1000);
    let since_string = `建立自 ${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}`;
    this.CHATROOM_SINCE = since_string;

    this.innerHTML = 
    `
    <li>
      <a class="is-size-5 py-4 _chatroom_name">
        ${this.CHATROOM_NAME}
        <span class="is-pulled-right has-text-success">
          <i class="fas fa-circle"></i>
        </span>
      </a>
    <li>
    `;

    // this.innerHTML = 
    // `
    // <div class="card mb-6 mr-6 has-background-light is-shadowless ">
    //   <div class="card-content">

    //     <div class="media">
    //       <div class="media-left">
    //       </div>

    //       <div class="media-content">
    //         <div class="columns">
    //           <div class="column">
    //             <div class="content">
    //               <p class="title is-4">${this.CHATROOM_NAME}</p>
    //               <!-- <p class="subtitle is-6">${this.CHATROOM_SINCE}</p> -->
    //             </div>
    //           </div>              
    //         </div>      
    //       </div>

    //       <div class="media-right">
    //         <button class="_start_chat button is-primary is-light is-medium has-text-weight-bold">
    //         C!
    //         </button>     
    //       </div>
    //   </div>
    // </div>
    // `;



    // 如果沒有設定聊天室本身的名字 (預設一個空格)，改用聊天室成員的暱稱或名字組成
    if(this.CHATROOM_NAME.trim().length === 0) {
      fetch(API_ROOT + API_CHAT_MEMBER + `?chatroom_id=${this.CHATROOM_ID}`)
        .then((res) => res.json())
        .then((members) => 
          {
            // 排除使用者本人
            let others = members.filter(m => m.id != specifier_id);
            let title_names = [];
            for (let i = 0; i < others.length; i++) {
              // 若有暱稱則用暱稱 (username)；若無，則用名字 (name)
              let name_show = others[i].hasOwnProperty("username") ? others[i].username : others[i].name;
              title_names.push(name_show);
              // 只取 3 位聊天室成員
              if (title_names.length == 3) break;
            }
            // 若排除本人的成員數超過三人，則說明有更多成員
            this.CHATROOM_NAME = others.length > 3 ? title_names.join("、") + " ..." : title_names.join("、");
            this.setAttribute("chatroom-name", this.CHATROOM_NAME);
            document.querySelector(`chatroom-component[chatroom-id="${this.CHATROOM_ID}"] a._chatroom_name`).firstChild.textContent = this.CHATROOM_NAME;
          }
        )
        .catch((err) => console.log(err));   
    }
     

    this.addEventListener("click", (event) => {

      toggleActiveMenuListItem(event);
      let newItem = document.createElement("chatlog-area-component");
      newItem.setAttribute("chatroom-id", this.CHATROOM_ID);
      newItem.setAttribute("chatroom-name", this.CHATROOM_NAME);

      document.querySelector("div._chat_log").innerHTML = '';
      document.querySelector("div._chat_log").appendChild(newItem);

    });

  }

  

}

// 聊天紀錄側邊面板 ChatLogSide (目前棄用)
class ChatLogSide extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let style = document.createElement("style");
    style.textContent = `
    @font-face {
      font-family: FakePearl-ExtraLight;
      src: url(https://cdn.jsdelivr.net/gh/max32002/FakePearl@1.1/webfont/FakePearl-ExtraLight.woff2) format("woff2"),
           url(https://cdn.jsdelivr.net/gh/max32002/FakePearl@1.1/webfont/FakePearl-ExtraLight.woff) format("woff");
    }

    * {
      box-sizing: border-box;
      font-family: "FakePearl-ExtraLight";
      color: rgb(39, 89, 109);
    }

    .floating-chat {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      bottom: 2%;
      right: 1%;
      width: 40px;
      height: 40px;
      transform: translateY(70px);
      transition: all 250ms ease-out;
      border-radius: 50%;
      opacity: 0;
      background-color: white;
      background-repeat: no-repeat;
      background-attachment: fixed;
    }
    .floating-chat.enter:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
      opacity: 1;
    }
    .floating-chat.enter {
      transform: translateY(0);
      opacity: 0.6;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.14);
    }
    .floating-chat.expand {
      width: 350px;
      max-height: 450px;
      height: 450px;
      border-radius: 5px;
      cursor: auto;
      opacity: 1;
    }
    .floating-chat :focus {
      outline: 0;
      border-color: #dd5b0b;
      box-shadow: 0 0 0 0.125rem rgba(221, 91, 11, 0.25);
    }
    .floating-chat button {
      background: transparent;
      border: 0;
      border-radius: 3px;
      cursor: pointer;
    }
    .floating-chat .chat {
      display: flex;
      flex-direction: column;
      position: absolute;
      opacity: 0;
      width: 1px;
      height: 1px;
      border-radius: 50%;
      transition: all 250ms ease-out;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .floating-chat .chat.enter {
      opacity: 1;
      border-radius: 0;
      margin: 10px;
      width: auto;
      height: auto;
    }
    .floating-chat .chat .header {
      flex-shrink: 0;
      padding-bottom: 10px;
      display: flex;
      background: transparent;
    }
    .floating-chat .chat .header .title {
      flex-grow: 1;
      flex-shrink: 1;
      font-weight: 600;
      padding: 0 5px;
    }
    .floating-chat .chat .header button {
      flex-shrink: 0;
    }
    .floating-chat .chat .messages {
      padding: 10px;
      margin: 0;
      list-style: none;
      overflow-y: scroll;
      overflow-x: hidden;
      flex-grow: 1;
      border-radius: 4px;
      background: transparent;
    }
    .floating-chat .chat .messages::-webkit-scrollbar {
      width: 5px;
    }
    .floating-chat .chat .messages::-webkit-scrollbar-track {
      border-radius: 5px;
      background-color: rgba(250, 250, 250, 0.7);
    }
    .floating-chat .chat .messages::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(125, 125, 125, 0.5);
    }
    .floating-chat .chat .messages li {
      position: relative;
      clear: both;
      display: inline-block;
      padding: 9px 13px;
      margin: 0 0 20px 0;
      font: 12px/16px;
      border-radius: 10px;
      background-color: rgb(241, 241, 241);
      word-wrap: break-word;
      max-width: 81%;
    }
    .floating-chat .chat .messages li:before {
      position: absolute;
      top: 0;
      width: 25px;
      height: 25px;
      border-radius: 25px;
      content: "";
      background-size: cover;
    }
    .floating-chat .chat .messages li:after {
      position: absolute;
      top: 10px;
      content: "";
      width: 0;
      height: 0;
      border-top: 10px solid rgba(195, 195, 195, 0.2);
    }
    .floating-chat .chat .messages li.self {
      animation: show-chat-odd 0.15s 1 ease-in;
      -moz-animation: show-chat-odd 0.15s 1 ease-in;
      -webkit-animation: show-chat-odd 0.15s 1 ease-in;
      float: right;
      margin-right: 45px;
    }
    .floating-chat .chat .messages li.self:before {
      right: -45px;
      background-image: url(https://github.com/Thatkookooguy.png);
    }
    .floating-chat .chat .messages li.self:after {
      border-right: 10px solid transparent;
      right: -10px;
    }
    .floating-chat .chat .messages li.other {
      animation: show-chat-even 0.15s 1 ease-in;
      -moz-animation: show-chat-even 0.15s 1 ease-in;
      -webkit-animation: show-chat-even 0.15s 1 ease-in;
      float: left;
      margin-left: 45px;
    }
    .floating-chat .chat .messages li.other:before {
      left: -45px;
      background-image: url(https://github.com/ortichon.png);
    }
    .floating-chat .chat .messages li.other:after {
      border-left: 10px solid transparent;
      left: -10px;
    }
    .floating-chat .chat .footer {
      flex-shrink: 0;
      display: flex;
      padding-top: 10px;
      max-height: 90px;
      background: transparent;
    }
    .floating-chat .chat .footer .text-box {
      border-radius: 3px;
      background: rgb(235, 235, 235);
      min-height: 100%;
      min-width: 80%;
      margin: 0 5px;     
      overflow-y: auto;
      padding: 2px 5px;
    }
    .floating-chat .chat .footer .text-box::-webkit-scrollbar {
      width: 5px;
    }
    .floating-chat .chat .footer .text-box::-webkit-scrollbar-track {
      border-radius: 5px;
      background-color: rgba(125, 125, 125, 0.7);
    }
    .floating-chat .chat .footer .text-box::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(250, 250, 250, 0.1);
    }
    button.close {
      border-radius: 50%;
    }
    .footer button {
      font-size: 20px;
    }
    button:hover {
      background-color: rgb(231, 231, 231);
    }
    `;
    
    this.shadowRoot.appendChild(style);
  }

  connectedCallback() {
    let container = document.createElement("div");
    container.setAttribute("style","position: fixed; bottom: 0%; right: 20%");
    container.innerHTML = `
    <div class="floating-chat enter expand">
      <div class="chat enter" style="">
          <div class="header">
              <span class="title">
                ${this.getAttribute("chatroom-name")}
              </span>
              <button class="close">
              ✖
              </button>      
          </div>
          <ul class="messages">
              <li class="self">嗷嗚嗚嗚，汪汪汪</li>
              <li class="self">我們是狗嗎？🐶</li>
              <li class="other">不對</li>
              <li class="self">你確定～？</li>
              <li class="other">是的.... -___-</li>
              <li class="self">如果我們不是狗.... 那我們就是猴子 🐵</li>
              <li class="other">我討厭你</li>
              <li class="self">別這樣嘛！這裡是香蕉，給你 🍌</li>
              <li class="other">......... -___-</li>
          </ul>
          <div class="footer">
              <button>❐</button>
              <div class="text-box" contenteditable="true" disabled="true"></div>
              <button id="sendMessage" class="send"><b>➢</b></button>
          </div>
      </div>
    </div>
    `;
    this.shadowRoot.appendChild(container);
    
    let messageList = this.shadowRoot.querySelector("ul.messages");

    this.shadowRoot.querySelector("button.close").addEventListener("click", () => {
      document.getElementById("cols-chatlog-area").removeChild(this);
    });

    this.shadowRoot.querySelector("button.send").addEventListener("click", () => {
      let msg = this.shadowRoot.querySelector("div.text-box").textContent.trim();
      if(msg == "") alert("聊天訊息內容不能空白");
      let newItem = document.createElement("li");
      newItem.textContent = msg;
      newItem.setAttribute("class", "self");
      messageList.appendChild(newItem);
    });

    const webSocket = new WebSocket(`ws://localhost:8080/lazy-trip-back/socket/${specifier_id}?chatroom_id=${this.getAttribute("chatroom-id")}`);

    webSocket.onopen = (event) => console.log("Connect Success!");

    webSocket.onmessage = (event) => {
      let messages = JSON.parse(event.data);
      messages.forEach(m => {
        let newItem = document.createElement("li");
        let newItemType = m.senderId == specifier_id ? "self" : "other";
        newItem.classList.add(newItemType);
        newItem.textContent = m.message;
        messageList.appendChild(newItem);
      });
    };
	
  }

}

// 聊天紀錄區域 ChatLogArea
class ChatLogArea extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let style = document.createElement("style");
    style.textContent = `
    @font-face {
      font-family: FakePearl-ExtraLight;
      src: url(https://cdn.jsdelivr.net/gh/max32002/FakePearl@1.1/webfont/FakePearl-ExtraLight.woff2) format("woff2"),
           url(https://cdn.jsdelivr.net/gh/max32002/FakePearl@1.1/webfont/FakePearl-ExtraLight.woff) format("woff");
    }

    * {
      box-sizing: border-box;
      font-family: "FakePearl-ExtraLight";
      color: rgb(39, 89, 109);
    }
    .floating-chat {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      background-color: white;
      background-repeat: no-repeat;
      background-attachment: fixed;
    }
    .floating-chat.enter {
      transform: translateY(0);
    }
    .floating-chat.expand {
      width: 723px;
      height: 548px;
      cursor: auto;
      opacity: 1;
    }
    .floating-chat :focus {
      outline: 0;
      border-color: #dd5b0b;
      box-shadow: 0 0 0 0.125rem rgba(221, 91, 11, 0.25);
    }
    .floating-chat button {
      background: transparent;
      border: 0;
      border-radius: 3px;
      cursor: pointer;
    }
    .floating-chat .chat {
      display: flex;
      flex-direction: column;
      position: absolute;
      width: 1px;
      height: 1px;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .floating-chat .chat.enter {
      opacity: 1;
      margin: 10px;
      width: auto;
      height: auto;
    }
    .floating-chat .chat .messages {
      padding: 10px;
      margin: 0;
      list-style: none;
      overflow-y: scroll;
      overflow-x: hidden;
      flex-grow: 1;
    }
    .floating-chat .chat .messages::-webkit-scrollbar {
      width: 5px;
    }
    .floating-chat .chat .messages::-webkit-scrollbar-track {
      border-radius: 5px;
      background-color: rgba(250, 250, 250, 0.7);
    }
    .floating-chat .chat .messages::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(125, 125, 125, 0.5);
    }
    
    .floating-chat .chat .footer {
      flex-shrink: 0;
      display: flex;
      padding-top: 10px;
      max-height: 90px;
      background: transparent;
    }
    .floating-chat .chat .footer .text-box {
      border-radius: 3px;
      background: rgb(235, 235, 235);
      min-height: 100%;
      min-width: 80%;
      margin: 0 5px;     
      overflow-y: auto;
      padding: 2px 5px;
    }
    .floating-chat .chat .footer .text-box::-webkit-scrollbar {
      width: 5px;
    }
    .floating-chat .chat .footer .text-box::-webkit-scrollbar-track {
      border-radius: 5px;
      background-color: rgba(125, 125, 125, 0.7);
    }
    .floating-chat .chat .footer .text-box::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(250, 250, 250, 0.1);
    }
    .footer button {
      font-size: 20px;
    }
    button:hover {
      background-color: rgb(231, 231, 231);
    }
    `;
    
    this.shadowRoot.appendChild(style);
  }

  connectedCallback() {
    let container = document.createElement("div");
    container.innerHTML = `
    <div class="floating-chat enter expand">
      <div class="chat enter">
          <ul class="messages _msg_list">
          </ul>
          <div class="footer">
              <button>❐</button>
              <div class="text-box" contenteditable="true" disabled="true"></div>
              <button id="sendMessage" class="send"><b>➢</b></button>
          </div>
      </div>
    </div>
    `;
    this.shadowRoot.appendChild(container);
    
    let messageList = this.shadowRoot.querySelector("ul._msg_list");

    this.shadowRoot.querySelector("button.send").addEventListener("click", () => {
      let msg = this.shadowRoot.querySelector("div.text-box").textContent.trim();
      if(msg == "") {
        alert("聊天訊息內容不能空白");
      } else {
        // let newItem = document.createElement("li");
        // newItem.textContent = msg;
        // newItem.setAttribute("class", "self");
        // messageList.appendChild(newItem);
        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);  
        let messageContent = new Object();
        messageContent.senderId = specifier_id;
        messageContent.chatroomId = this.getAttribute("chatroom-id");
        messageContent.message = msg;
        messageContent.sentAt = timestamp;
        let wrapper = new Object();
        wrapper.messageType = "new-message";
        wrapper.messageContent = messageContent;
        wrapper.memberId = specifier_id;
        wrapper.chatroomId = this.getAttribute("chatroom-id");
        webSocket.send(JSON.stringify(wrapper));
      }
    });

    const webSocket = new WebSocket(`ws://localhost:8080/lazy-trip-back/chat-ws/${specifier_id}?chatroom_id=${this.getAttribute("chatroom-id")}`);

    webSocket.onopen = (event) => console.log("Connect Success!");

    webSocket.onmessage = (event) => {
      // console.log(event);
      let wrapper = JSON.parse(event.data);
      
      if (wrapper.messageType == "reload-history") {

        let messages = wrapper.messageContent;
        if(messages.length == 0) return;
        messages.forEach(m => {
          let newItem =  m.senderId == specifier_id ? document.createElement("msg-self") : document.createElement("msg-other");
          newItem.textContent = m.message;
          messageList.appendChild(newItem);
        });

      } else if (wrapper.messageType == "new-message") {

        let msg = wrapper.messageContent;
        let newItem = msg.senderId == specifier_id ? document.createElement("msg-self") : document.createElement("msg-other");
        newItem.textContent = msg.message;
        messageList.appendChild(newItem);

      } else if (wrapper.messageType == "online") {

        console.log(`Member ID ${wrapper.memberId} is online`);

      } else if (wrapper.messageType == "offline") {

        console.log(`Member ID ${wrapper.memberId} is offline`);

      }

      
    };
	
  }
}

// 聊天訊息範本
class ChatMessageTemplate extends HTMLElement {

  style;

  constructor() {
    super();

    this.style = document.createElement("style");
    this.style.textContent = 
    `
    @font-face {
      font-family: FakePearl-ExtraLight;
      src: url(https://cdn.jsdelivr.net/gh/max32002/FakePearl@1.1/webfont/FakePearl-ExtraLight.woff2) format("woff2"),
           url(https://cdn.jsdelivr.net/gh/max32002/FakePearl@1.1/webfont/FakePearl-ExtraLight.woff) format("woff");
    }

    * {
      box-sizing: border-box;
      font-family: "FakePearl-ExtraLight";
      color: rgb(39, 89, 109);
    }
    li {
      position: relative;
      clear: both;
      display: inline-block;
      padding: 9px 13px;
      margin: 0 0 20px 0;
      font: 12px/16px;
      border-radius: 10px;
      background-color: rgb(241, 241, 241);
      word-wrap: break-word;
      max-width: 81%;
    }
    li:before {
      position: absolute;
      top: 0;
      width: 25px;
      height: 25px;
      border-radius: 25px;
      content: "";
      background-size: cover;
    }
    li:after {
      position: absolute;
      top: 10px;
      content: "";
      width: 0;
      height: 0;
      border-top: 10px solid rgba(195, 195, 195, 0.2);
    } 
    `;
  }
}

// 來自自己的訊息
class SelfMessage extends ChatMessageTemplate {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let moreStyle = 
    `
    li.self {
      animation: show-chat-odd 0.15s 1 ease-in;
      -moz-animation: show-chat-odd 0.15s 1 ease-in;
      -webkit-animation: show-chat-odd 0.15s 1 ease-in;
      float: right;
      margin-right: 45px;
    }
    li.self:before {
      right: -45px;
      background-image: url(https://github.com/Thatkookooguy.png);
    }
    li.self:after {
      border-right: 10px solid transparent;
      right: -10px;
    }
    `;

    this.style.textContent += moreStyle;
    this.shadowRoot.appendChild(this.style);
  }

  connectedCallback() {
    let newItem = document.createElement("li");
    newItem.setAttribute("class","self");
    newItem.textContent = this.textContent;
    this.shadowRoot.appendChild(newItem);
  }

}

// 來自別人的訊息
class OtherMessage extends ChatMessageTemplate {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let moreStyle = 
    `
    li.other {
      animation: show-chat-even 0.15s 1 ease-in;
      -moz-animation: show-chat-even 0.15s 1 ease-in;
      -webkit-animation: show-chat-even 0.15s 1 ease-in;
      float: left;
      margin-left: 45px;
    }
    li.other:before {
      left: -45px;
      background-image: url(https://github.com/ortichon.png);
    }
    li.other:after {
      border-left: 10px solid transparent;
      left: -10px;
    }
    `;

    this.style.textContent += moreStyle;
    this.shadowRoot.appendChild(this.style);
  }

  connectedCallback() {
    let newItem = document.createElement("li");
    newItem.setAttribute("class","other");
    newItem.textContent = this.textContent;
    this.shadowRoot.appendChild(newItem);
  }

}

customElements.define("chatroom-component", Chatroom);
customElements.define("chatlog-side-component", ChatLogSide);
customElements.define("chatlog-area-component", ChatLogArea);
customElements.define("msg-self", SelfMessage);
customElements.define("msg-other", OtherMessage);