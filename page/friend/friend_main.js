// const users = fetch(
//     "https://spring-boot-rest-1-kbf6hmc46a-de.a.run.app/api/v1/users"
//   )
//     .then((res) => res.json())
//     .catch((err) => console.log(err));

const specifier_id = 4;
const btn_show_friends = document.getElementById("btn-show-friends");
const btn_show_sent_requests = document.getElementById("btn-show-sent-requests");
const btn_show_received_requests = document.getElementById("btn-show-received-requests");
const btn_add_request = document.getElementById("btn-add-request");
const btn_submit_request = document.getElementById("btn-submit-request");

const friends_summary = document.getElementById("friends_summary");
// const api_root = "https://spring-boot-rest-1-kbf6hmc46a-de.a.run.app";
const api_root = "http://127.0.0.1:8080";

document.addEventListener("DOMContentLoaded", () => {
    btn_show_friends.addEventListener("click", showFriends);
    btn_show_sent_requests.addEventListener("click", showSentRequests);
    btn_show_received_requests.addEventListener("click", showReceivedRequests);
    btn_add_request.addEventListener("click", addRequest);
    btn_submit_request.addEventListener("click", submitRequest);

    setBulmaModal();

});

function showFriends() {
    friends_summary.innerHTML = '';

    
    fetch(api_root + `/friends?member_id=${specifier_id}`)
        .then((res) => res.json())
        .then((friends) => friends.forEach(fr => {
            let newItem = document.createElement("friend-component");
            newItem.setAttribute("fullname", fr["member_name"]);
            newItem.setAttribute("username", fr["member_account"]); 
            friends_summary.appendChild(newItem);
        }))
        .catch((err) => console.log(err));
}

function showSentRequests() {
    friends_summary.innerHTML = '';

    
    fetch(api_root + `/requests?member_id=${specifier_id}`)
        .then((res) => res.json())
        .then((friends) => friends.forEach(fr => {
            let newItem = document.createElement("friend-component");
            newItem.setAttribute("fullname", fr["member_name"]);
            newItem.setAttribute("username", fr["member_account"]);
            friends_summary.appendChild(newItem);
        }))
        .catch((err) => console.log(err));
}

function showReceivedRequests() {
    console.log("show received requests");
}

function addRequest() {
    console.log("Add Request clicked");
}

function submitRequest() {
    const addressee_id = document.getElementById("ipt-addressee-id").value;
    console.log(`Requester ID: ${specifier_id}; Addressee ID: ${addressee_id}`);

    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
      fetch(`http://localhost:8080/lazy-trip-back/friends/request?requester_id=${specifier_id}&addressee_id=${addressee_id}`, requestOptions)
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