// const users = fetch(
//     "https://spring-boot-rest-1-kbf6hmc46a-de.a.run.app/api/v1/users"
//   )
//     .then((res) => res.json())
//     .catch((err) => console.log(err));

const btn_show_friends = document.getElementById("btn-show-friends");
const list_users = document.getElementById("list-users");
const friends_summary = document.getElementById("friends_summary");
// const api_root = "https://spring-boot-rest-1-kbf6hmc46a-de.a.run.app";
const api_root = "http://127.0.0.1:8080";

document.addEventListener("DOMContentLoaded", () => {
    btn_show_friends.addEventListener("click", showFriends);
});

function showFriends() {
    friends_summary.innerHTML = '';
    
    fetch(api_root + "/api/v1/users")
        .then((res) => res.json())
        .then((friends) => friends.forEach(fr => {
            let newItem = document.createElement("friend-component");
            newItem.setAttribute("fullname", fr.fullname);
            newItem.setAttribute("username", fr.username);
            friends_summary.appendChild(newItem);
        }))
        .catch((err) => console.log(err));
}