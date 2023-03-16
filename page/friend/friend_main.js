// ======= URL 和使用者 =======
let loc = window.location;
const PROT_HTTP = "http:";
const PROT_WS = "ws:";
const HOSTNAME = loc.hostname;
const PORT = loc.port == "80" ? '' : ':8080';

let params = new URLSearchParams(loc.search);
let specifier_id = params.has("specifier_id") ? params.get("specifier_id") : 4;
// const specifier_id = parseCookieTokens(document.cookie).get("memId");

let specifier_username;

// ======= 後端服務端點 =======
const API_ROOT = `${PROT_HTTP}//${HOSTNAME}${PORT}/lazy-trip-back`;
const API_FRIEND = "/api/friend";
const API_FRIEND_REQUEST = "/api/friend/request";
const API_CHAT = "/api/chat";
const API_CHAT_MEMBER = "/api/chat/member";
const API_IMG_AVATAR = "/img/avatar.png";

const WS_ROOT = `${PROT_WS}//${HOSTNAME}${PORT}/lazy-trip-back`;

// ======= 資料物件類型 =======
const TYPE_SUGGESTION = "suggestion";
const TYPE_FRIEND = "friend";
const TYPE_SENT_REQUEST = "sent-request";
const TYPE_RECEIVED_REQUEST = "received-request";
const TYPE_CHATROOM = "chatroom";
const TYPE_BLOCKLIST = "blocklist";

// ======= UI 節點 =======
const node_show_suggestions = document.getElementById("li-suggestions");
const node_show_friends = document.getElementById("li-friends");
const node_show_sent_requests = document.getElementById("li-sent-requests");
const node_show_received_requests = document.getElementById("li-received-requests");
const node_show_chatrooms = document.getElementById("li-chatrooms");
const node_show_blocklists = document.getElementById("li-blocklists");
const node_no_result = document.getElementById("div-no-result");
const node_results = document.getElementById("div-results");

// ======= 頁面初始化 =======
document.addEventListener("DOMContentLoaded", () => {
    node_show_suggestions.addEventListener("click", (event) => {
      selectFromMenu(event);
      showContent(TYPE_SUGGESTION);
    });
    node_show_friends.addEventListener("click",(event) => {
      selectFromMenu(event);
      showContent(TYPE_FRIEND);
    });
    node_show_sent_requests.addEventListener("click", (event) => {
      selectFromMenu(event);
      showContent(TYPE_SENT_REQUEST);
    });
    node_show_received_requests.addEventListener("click", (event) => {
      selectFromMenu(event);
      showContent(TYPE_RECEIVED_REQUEST);
    });
    node_show_chatrooms.addEventListener("click", (event) => {
      selectFromMenu(event);
      showContent(TYPE_CHATROOM);
    });
    node_show_blocklists.addEventListener("click", (event) => {
      selectFromMenu(event);
      showContent(TYPE_BLOCKLIST);
    });
   
    setBulmaModal();
    showContent(TYPE_SUGGESTION);

    fetch(`${API_ROOT}/page/member/find?id=${specifier_id}`)
            .then(response => response.json())
            .then(result => {
              specifier_username = (result.username != undefined && result.username != "") ? result.username : result.name;
              console.log(specifier_username);
            })
            .catch(error => console.log('error', error));
  }
);

// ======= 版面內容控制 =======
function selectFromMenu(event) {
    event.target.closest("ul.menu-list").childNodes.forEach(node => {
      if (node.nodeName == "LI") {
        let a = node.firstElementChild;
        if(a.classList.contains("is-active")) a.classList.remove("is-active");
      } else if (node.nodeName == "CHATROOM-COMPONENT") {
        let a_list = $(node).find("a");
        if(a_list[0].classList.contains("is-active")) a_list[0].classList.remove("is-active");
      }
    });
    event.target.classList.add("is-active");
}

function showContent(type) {
  // type: suggestion, friend, sent-request, received-request, chatroom, blocklist

  node_results.innerHTML = '';
  document.querySelector("control-panel-component").setAttribute("control-target", type);

  const component_type = type + "-component";
  let ajax_call_url;
  let node_to_append = node_results;

  switch (type) {
    case TYPE_SUGGESTION:
    case TYPE_FRIEND:
    case TYPE_BLOCKLIST:
      ajax_call_url = `${API_ROOT}${API_FRIEND}?member_id=${specifier_id}&query_type=${type}`;
      fetchDataToAppend(ajax_call_url, component_type, node_to_append);
      break;
    case TYPE_SENT_REQUEST:
    case TYPE_RECEIVED_REQUEST:
      const direction = type.split("-")[0];
      ajax_call_url = `${API_ROOT}${API_FRIEND_REQUEST}?member_id=${specifier_id}&direction=${direction}`;
      fetchDataToAppend(ajax_call_url, component_type, node_to_append);
      break;
    case TYPE_CHATROOM:
      createChatLayout();
      node_to_append = document.querySelector("ul._chatroom_list");
      ajax_call_url = `${API_ROOT}${API_CHAT}?member_id=${specifier_id}`;
      fetch(ajax_call_url)
            .then((res) => res.json())
            .then((body) => {
              if(body.dataList.length == 0) {
                node_no_result.style.display = "block";
                return;
              } else {
                node_no_result.style.display = "none";
              }
              
              body.dataList.forEach(data => {
                let newItem = document.createElement(component_type);
                newItem = prepareAttributes(newItem, data, body.dataType)
                newItem.setAttribute("chatroom-active", chatMembersObservable.activeChatrooms.has(data["id"]));
                node_to_append.appendChild(newItem);
                });
              })
            .catch((err) => console.log(err));
      break;
  }

  function fetchDataToAppend(ajax_call_url, component_type, node_to_append) {
    fetch(ajax_call_url)
          .then((res) => res.json())
          .then((body) => {
            if(body.dataList.length == 0) {
              node_no_result.style.display = "block";
              return;
            } else {
              node_no_result.style.display = "none";
            }
            
            body.dataList.forEach(data => {
              let newItem = document.createElement(component_type);
              node_to_append.appendChild(prepareAttributes(newItem, data, body.dataType));
          });
        })
          .catch((err) => console.log(err));
  }

  function prepareAttributes(element, data, affix) {
    // DOM element, object, string
    for (const [key, value] of Object.entries(data)) {
      const suffix = key.replace(/[A-Z]/g, s => '-' + s.toLowerCase()); // 例：createdAt -> created-at
      element.setAttribute(`${affix}-${suffix}`, value);
    }
    return element;
  }

  function createChatLayout() {
    let layout = `
      <div class="columns _chat_layout p-0 m-0">
        <div class="column is-one-third _chatroom_container p-0 m-0">
          <aside class="menu" style="width: 100%">
            <ul
              class="menu-list _chatroom_list has-text-left"
            ></ul>
          </aside>
        </div>
        <div class="column _chat_log m-0 p-0"></div>
      </div>
    `;
    node_results.innerHTML = layout;
  }

}

// ======= 好友功能控制 =======
function addRequest(requesterId, addresseeId) {
    fetch(API_ROOT + API_FRIEND_REQUEST + `?requester_id=${requesterId}&addressee_id=${addresseeId}`, requestMethod('POST'))
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

function acceptRequest(other_id) {
    fetch(`${API_ROOT}${API_FRIEND_REQUEST}?requester_id=${other_id}&addressee_id=${specifier_id}&action=accept`, requestMethod('PUT'))
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));  
}

function cancelRequest(other_id) {  
    fetch(`${API_ROOT}${API_FRIEND_REQUEST}?requester_id=${specifier_id}&addressee_id=${other_id}`, requestMethod('DELETE'))
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));  
}

function declineRequest(other_id) {
    fetch(`${API_ROOT}${API_FRIEND_REQUEST}?requester_id=${other_id}&addressee_id=${specifier_id}`, requestMethod('DELETE'))
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));  
}

function unfriend(other_id) {
  // 須適用於不同的好友邀請方向
  console.log(`解除好友 other_id = ${other_id}`);
}

function block(other_id) {
  fetch(`${API_ROOT}${API_FRIEND_REQUEST}?requester_id=${other_id}&addressee_id=${specifier_id}&action=block`, requestMethod('PUT'))
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error)); 
}

function unblock(other_id) {
  fetch(`${API_ROOT}${API_FRIEND_REQUEST}?requester_id=${other_id}&addressee_id=${specifier_id}`, requestMethod('DELETE'))
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error)); 
}

// ======= 輔助功能 =======
// 解析 cookie 字串
function parseCookieTokens(cookie) {
  let tokens = cookie.split("; ");
  let map = new Map();
  for (let token of tokens) {
    let keyValue = token.split("=");
    map.set(keyValue[0], keyValue[1]);
  }
  return map;
}
 
/**
 * 方便 Fetch API 呼叫使用
 * @param {string} method 請求方法的英文大寫，例：PUT、PATCH
 * @returns 設定請求的 options 物件
 */
function requestMethod(method) {
  return {
    method: method,
    redirect: 'follow'
  };
}

/**
 * 為監聽 input change 事件的函數設定「去彈跳」 (debounce) 期間
 * Source: Implementing Debounce in Vanilla JavaScript, from Code with Ahsan on YouTube
 * URL: https://youtu.be/kSiuXLfF9HM
 */
function debounce(debouncedFunction, duration) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      debouncedFunction.apply(this, args);
      timer = null;
    }, duration);
  }
}

// ======= Modal 控制 =======
function setBulmaModal() {
  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal, excluding accept button
  (document.querySelectorAll('.modal-background, .modal-close, .delete, ._modal_cancel') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
}

function openModal($el) {
  $el.classList.add('is-active');
}

function closeModal($el) {
  const modalType = document.querySelector(".modal.is-active").parentElement.tagName;
  switch (modalType) {
    case "CHATROOM-SETTING-MODAL":
      $el.classList.remove('is-active');
      break;
    case "CREATE-CHATROOM-MODAL":
      $el.classList.remove('is-active');
      $el.querySelector("div._chatroom_members").innerHTML = ``;
      $el.querySelector("ul._search_results").innerHTML = ``;
      $el.querySelector("#ipt-search-text").value = ``;
      $el.querySelector("div.menu p").style["display"] = "none";
      break;
  }
}

function closeAllModals() {
  (document.querySelectorAll('.modal') || []).forEach(($modal) => {
    closeModal($modal);
  });
}