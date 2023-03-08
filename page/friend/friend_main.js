// 事件觸發 UI 常數
const node_show_suggestions = document.getElementById("li-suggestions");
const node_show_friends = document.getElementById("li-friends");
const node_show_sent_requests = document.getElementById("li-sent-requests");
const node_show_received_requests = document.getElementById("li-received-requests");
const node_show_chatrooms = document.getElementById("li-chatrooms");
const node_add_request = document.getElementById("btn-add-request");
const node_submit_request = document.getElementById("btn-submit-request");
const node_summary = document.getElementById("div-no-result");
const node_results = document.getElementById("div-results");

// Requester, Addressee / Specifier, Other
let params = new URLSearchParams(window.location.search);
const specifier_id = params.has("specifier_id") ? params.get("specifier_id") : 4;

// API 路徑
const API_ROOT = "http://127.0.0.1:8080/lazy-trip-back";
const API_FRIEND = "/api/friend";
const API_FRIEND_REQUEST = "/api/friend/request";
const API_CHAT = "/api/chat";
const API_CHAT_MEMBER = "/api/chat/member";

// 頁面初始化
document.addEventListener("DOMContentLoaded", () => {
    node_show_suggestions.addEventListener("click", (event) => {
        toggleActiveMenuListItem(event);
        showSuggestions();
    });
    node_show_friends.addEventListener("click",(event) => {
        toggleActiveMenuListItem(event);
        showFriends();
    });
    node_show_sent_requests.addEventListener("click", (event) => {
        toggleActiveMenuListItem(event);
        showRequests("sent");
    });
    node_show_received_requests.addEventListener("click", (event) => {
        toggleActiveMenuListItem(event);
        showRequests("received");
    });
    node_show_chatrooms.addEventListener("click", (event) => {
        toggleActiveMenuListItem(event);
        showChatrooms();
  });
    node_submit_request.addEventListener("click", submitRequest);

    setBulmaModal();
    showSuggestions();

});

// 使用之函數
function toggleActiveMenuListItem(event) {
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

function showSuggestions() {
    clearResults();

    fetch(API_ROOT + API_FRIEND + `?member_id=${specifier_id}&query_type=suggestion`)
        .then((res) => res.json())
        .then((friends) => {
          if(friends.length == 0) {
            node_summary.style.display = "block";
            return;
          } else {
            node_summary.style.display = "none";
          }

          friends.forEach(fr => {
            let newItem = document.createElement("suggestion-component");
            newItem.setAttribute("member-id", fr["id"]);
            newItem.setAttribute("member-name", fr["name"]);
            newItem.setAttribute("member-account", fr["account"]); 
            node_results.appendChild(newItem);
        }); 
      })
        .catch((err) => console.log(err));
}

function showFriends() {
    clearResults();

    fetch(API_ROOT + API_FRIEND + `?member_id=${specifier_id}&query_type=friend`)
        .then((res) => res.json())
        .then((friends) => {
          if(friends.length == 0) {
            node_summary.style.display = "block";
            return;
          } else {
            node_summary.style.display = "none";
          }
          
          friends.forEach(fr => {
            let newItem = document.createElement("friend-component");
            newItem.setAttribute("member-id", fr["id"]);
            newItem.setAttribute("member-name", fr["name"]);
            newItem.setAttribute("member-account", fr["account"]); 
            node_results.appendChild(newItem);
        });
      })
        .catch((err) => console.log(err));
}

function showRequests(direction) {
    clearResults();

    fetch(API_ROOT + API_FRIEND_REQUEST + `?member_id=${specifier_id}&direction=${direction}`)
        .then((res) => res.json())
        .then((friends) => {
          if(friends.length == 0) {
            node_summary.style.display = "block";
            return;
          } else {
            node_summary.style.display = "none";
          }
          
          friends.forEach(fr => {
            let newItem = direction == "sent" 
                ? document.createElement("sent-request-component") 
                : document.createElement("received-request-component");
            newItem.setAttribute("member-id", fr["id"]);    
            newItem.setAttribute("member-name", fr["name"]);
            newItem.setAttribute("member-account", fr["account"]);
            node_results.appendChild(newItem);
        });
      })
        .catch((err) => console.log(err));
}

function showChatrooms() {
  clearResults();
  createChatLayout();
  let node_chatroom_list = document.querySelector("ul._chatroom_list");

  fetch(API_ROOT + API_CHAT + `?member_id=${specifier_id}`)
  .then((res) => res.json())
  .then((chatrooms) => {
    if(chatrooms.length == 0) {
      node_summary.style.display = "block";
      return;
    } else {
      node_summary.style.display = "none";
    }
    
    chatrooms.forEach(ch => {
      let newItem = document.createElement("chatroom-component");
      newItem.setAttribute("chatroom-id", ch["id"]);
      newItem.setAttribute("chatroom-name", ch["name"]);
      newItem.setAttribute("chatroom-created-at", ch["createdAtUnix"]);
      node_chatroom_list.appendChild(newItem);
      });
    })
  .catch((err) => console.log(err));

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

function addRequest(requesterId, addresseeId) {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    fetch(API_ROOT + API_FRIEND_REQUEST + `?requester_id=${requesterId}&addressee_id=${addresseeId}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

function acceptRequest(other_id) {
    var requestOptions = {
      method: 'PUT',
      redirect: 'follow'
    };

    fetch(API_ROOT + 
          API_FRIEND_REQUEST + 
          `?requester_id=${other_id}&addressee_id=${specifier_id}&action=accept`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));  
}

function cancelRequest(other_id) {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
  
    fetch(API_ROOT + 
          API_FRIEND_REQUEST + 
          `?requester_id=${specifier_id}&addressee_id=${other_id}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));  
}

function declineRequest(other_id) {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    fetch(API_ROOT + 
          API_FRIEND_REQUEST + 
          `?requester_id=${other_id}&addressee_id=${specifier_id}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));  
}

function submitRequest() {
    const addressee_id = document.getElementById("ipt-addressee-id").value;
    console.log(`Requester ID: ${specifier_id}; Addressee ID: ${addressee_id}`);

    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
      fetch(API_ROOT + api_friend_requests + `?requester_id=${specifier_id}&addressee_id=${addressee_id}`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

function setBulmaModal() {
      // Functions to open and close a modal
      function openModal($el) {
        $el.classList.add('is-active');
      }
    
      function closeModal($el) {
        $el.classList.remove('is-active');
      }
    
      function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
          closeModal($modal);
        });
      }
    
      // Add a click event on buttons to open a specific modal
      (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);
    
        $trigger.addEventListener('click', () => {
          openModal($target);
        });
      });
    
      // Add a click event on various child elements to close the parent modal
      (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
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

function clearResults() {
  node_results.innerHTML = '';
}