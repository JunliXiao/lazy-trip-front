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
  if (newStatus.status == "online-batch") {
    let map = new Map();
    for (let key of Object.keys(newStatus.onlineMembers)) {
      map.set(parseInt(key), newStatus.onlineMembers[key]);
    }
    chatMembersObservable.setSubject(map);
    chatMembersObservable.updateChatroomsFromSubject();
  } else {
    chatMembersObservable.updateSubject(newStatus);
    chatMembersObservable.notify();
  }
  
};

