// 事件觸發 UI 常數
const node_show_suggestions = document.getElementById("li-suggestions");
const node_show_friends = document.getElementById("li-friends");
const node_show_sent_requests = document.getElementById("li-sent-requests");
const node_show_received_requests = document.getElementById("li-received-requests");
const node_add_request = document.getElementById("btn-add-request");
const node_submit_request = document.getElementById("btn-submit-request");
const node_summary = document.getElementById("div-no-result");
const node_results = document.getElementById("div-results");

// Requester, Addressee / Specifier, Other
const specifier_id = 4;

// API 路徑
const api_root = "http://127.0.0.1:8080/lazy-trip-back";
const api_friends = "/api/friends";
const api_friend_requests = "/api/friend-requests";
const api_friend_suggestions = "/api/friend-suggestions";

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
    node_submit_request.addEventListener("click", submitRequest);

    setBulmaModal();
    showSuggestions();

});

// 使用之函數
function toggleActiveMenuListItem(event) {
    document.querySelector("ul.menu-list li a.is-active").classList.remove("is-active");
    event.target.classList.add("is-active");
}

function showSuggestions() {
    node_results.innerHTML = '';

    fetch(api_root + api_friend_suggestions + `?member_id=${specifier_id}`)
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
    node_results.innerHTML = '';

    fetch(api_root + api_friends + `?member_id=${specifier_id}`)
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
            newItem.setAttribute("member-id", fr["member_id"]);
            newItem.setAttribute("member-name", fr["member_name"]);
            newItem.setAttribute("member-account", fr["member_account"]); 
            node_results.appendChild(newItem);
        });
      })
        .catch((err) => console.log(err));
}

function showRequests(direction) {
    node_results.innerHTML = '';

    fetch(api_root + api_friend_requests + `?member_id=${specifier_id}&direction=${direction}`)
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
            newItem.setAttribute("member-id", fr["member_id"]);    
            newItem.setAttribute("member-name", fr["member_name"]);
            newItem.setAttribute("member-account", fr["member_account"]);
            node_results.appendChild(newItem);
        });
      })
        .catch((err) => console.log(err));
}

function addRequest(requesterId, addresseeId) {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    fetch(api_root + api_friend_requests + `?requester_id=${requesterId}&addressee_id=${addresseeId}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

function acceptRequest(requesterId, addresseeId) {
    var requestOptions = {
      method: 'PUT',
      redirect: 'follow'
    };

    fetch(api_root + 
          api_friend_requests + 
          `?requester_id=${requesterId}&addressee_id=${addresseeId}&update_status=accept`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));  
}

function cancelRequest(requesterId, addresseeId) {
    var requestOptions = {
      method: 'PUT',
      redirect: 'follow'
    };
  
    fetch(api_root + 
          api_friend_requests + 
          `?requester_id=${requesterId}&addressee_id=${addresseeId}&update_status=cancel`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));  
}

function declineRequest(requesterId, addresseeId) {
    var requestOptions = {
      method: 'PUT',
      redirect: 'follow'
    };

    fetch(api_root + 
          api_friend_requests + 
          `?requester_id=${requesterId}&addressee_id=${addresseeId}&update_status=decline`, requestOptions)
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
      
      fetch(api_root + api_friend_requests + `?requester_id=${specifier_id}&addressee_id=${addressee_id}`, requestOptions)
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