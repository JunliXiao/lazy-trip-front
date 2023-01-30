// const users = fetch(
//     "https://spring-boot-rest-1-kbf6hmc46a-de.a.run.app/api/v1/users"
//   )
//     .then((res) => res.json())
//     .catch((err) => console.log(err));

const btn_get_all_users = document.getElementById("btn-get-all-users");    
const list_users = document.getElementById("list-users");

document.addEventListener("DOMContentLoaded", () => {
    btn_get_all_users.addEventListener("click", updateUserList);
});

function updateUserList() {
    list_users.innerHTML = "";
    fetch("https://reqres.in/api/users?page=2")
        .then((res) => res.json())
        .then((data) => data.data.forEach(element => {
            let newItem = document.createElement("li");
            let text = document.createTextNode(element.email);
            newItem.appendChild(text);
            list_users.appendChild(newItem);
        }))
        .catch((err) => console.log(err));

}