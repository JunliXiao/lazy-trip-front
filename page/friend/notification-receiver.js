class Observable {

  subject;
  activeChatrooms;
  observers;

  constructor(subject) {
    this.subject = subject;
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer);
    return () => {
      this.observers = this.observers.filter(o => o !== observer);
    };
  }

  notify() {
    // let arr = [];
    // this.subject.forEach( value => arr.push(value));
    // let activeChatroomsSet = new Set(arr.flatMap(e => e));
    this.observers.forEach(observer => observer.update(this.activeChatrooms));
  }

  setSubject(subject) {
    this.subject = subject;
  }

  updateSubject(data) {
    if(data.status == "online") {
      this.subject.set(data.memberId, data.commonChatroomsId);
    } else if (data.status == "offline") {
      this.subject.delete(data.memberId);
    }
    this.updateChatroomsFromSubject();
  }

  getSubject() {
    return this.subject;
  }

  updateChatroomsFromSubject() {
    let arr = [];
    this.subject.forEach( value => arr.push(value));
    this.activeChatrooms = new Set(arr.flatMap(e => e));
  }

}

class Observer {

  chatroom_id;

  constructor(chatroom_id) {
    this.chatroom_id = parseInt(chatroom_id);
  }

  update(activeChatrooms) {
    if (activeChatrooms.has(this.chatroom_id)) {
      document.querySelector(`chatroom-component[chatroom-id="${this.chatroom_id}"]`).setAttribute("chatroom-active", "true");
    } else {
      document.querySelector(`chatroom-component[chatroom-id="${this.chatroom_id}"]`).setAttribute("chatroom-active", "false");
    }
  }
}

let chatMembersObservable = new Observable();

const notification_ws = new WebSocket(`${WS_ROOT}/notification-ws/${specifier_id}`);

notification_ws.onopen = (event) => {
  console.log("成功連線到 notification-ws")
};

notification_ws.onmessage = (event) => {
  const newStatus = JSON.parse(event.data);

  if (newStatus.updateType == "response") {
    const friend = document.querySelector(`friend-component[member-id="${newStatus.memberId}"]`);
    if (friend != undefined) {
      if(newStatus.status == 'offline') return;
      friend.setAttribute("member-online", "true");
      let span = document.createElement("span");
      span.innerHTML = '<i class="fas fa-circle"></i>';
      span.classList.add("has-text-success");
      friend.querySelector('div.columns div.is-one-third div.content a').append(span);
    }
  }

  if(newStatus.updateType == "ring") {
    const colorArr = ["is-primary", "is-link", "is-info", "is-warning", "is-danger", "is-success"];
    let index = Math.floor(Math.random() * 6);
    bulmaToast.toast({
      message: `<h1><b>${newStatus.status}</b></h1>`,
      type: colorArr[index],
      position: "top-right",
      offsetTop: "55px",
      dismissible: true,
      pauseOnHover: true,
      duration: 2000,
      animate: { in: 'fadeIn', out: 'fadeOut' },
    });
  }
 
  if (newStatus.status == "online-batch") {
    let map = new Map();
    for (let key of Object.keys(newStatus.onlineMembers)) {
      map.set(parseInt(key), newStatus.onlineMembers[key]);
    }
    chatMembersObservable.setSubject(map);
    chatMembersObservable.updateChatroomsFromSubject();
  } else if (newStatus.updateType == "server-push") {
    chatMembersObservable.updateSubject(newStatus);
    chatMembersObservable.notify();
  }
  
};

