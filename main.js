Vue.component("reverse-block", {
  props: {
    message: {
      type: String,
      required: true,
      default: "Hello Vue!",
    },
  },
  data() {
    return {};
  },
  template: `<div><div>{{message}}</div><button type="submit" @click="reverseMessage">Press</button></div>`,
  methods: {
    reverseMessage: function () {
      console.log("from submit");

      this.message = this.message.split("").reverse().join("");
    },
  },
});

Vue.component("user-form", {
  data() {
    return {
      nickname: "",
      email: "",
      answer: "",
      users: [],
    };
  },
  template: `
        <div>
            <div>
                <label>Enter the NickName: </label>
                <input v-model="nickname" />
            </div>
            <div>
                <label>Enter the Email: </label>
                <input v-model="email" />
            </div>
            <button @click="addUser">Add User</button>
                <p>ANSWER-BOT: {{answer}}</p>
                <button @click="getUsers">Get users</button>
                <div v-if="users.length > 0" v-for= "(user, index) in users"> {{index + 1}}. nickname: {{user.nickName}}; Email: {{user.email}} </div>
                <div v-else> There are no users</div>
            
        </div>
    `,
  methods: {
    getUsers: function () {
      this.answer = "Думаю...";
      var vm = this;
      fetch("https://localhost:44364/api/users")
        .then((response) => response.json())
        .then((users) => {
          vm.users = users;
          vm.answer = "Done";
        })
        .catch(function (error) {
          vm.answer = "Ошибка! Не могу связаться с API. " + error;
        });
    },
    addUser: function () {
      if (this.nickname.trim() === "" || this.email.trim() === "") {
        this.answer = "there are no content!!!";
        return;
      }

      const user = {
        nickName: this.nickname,
        email: this.email,
      };

      fetch("https://localhost:44364/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((result) => {
          this.answer = "response: " + result;
        })
        .catch(function (error) {
          this.answer = "Ошибка! Не могу связаться с API. " + error;
        });
    },
  },
});

var app = new Vue({
  el: "#app",
  data: {
    message: "Привет, Vue.js!",
    nickname: "",
    email: "",
  },
  methods: {
    reverseMessage: function () {
      console.log("from submit");

      this.message = this.message.split("").reverse().join("");
    },
  },
});
