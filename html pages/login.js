const username = document.querySelector(".unq");
const submit = document.querySelector(".submit");
const pass = document.querySelector(".pass");
const category = document.querySelector("#inputGroupSelect03");
const link = document.querySelector(".link");
let currentacc;

const account1 = {
  userid: "b319049",
  username: "Shubham",
  pin: 1111,
  categ: "Undergrad",
};

const account2 = {
  userid: "b419049",
  username: "Sambit",
  pin: 2222,
  categ: "Undergrad",
};

const account3 = {
  userid: "b419042",
  username: "Pratik",
  pin: 3333,
  categ: "faculty",
};

const account4 = {
  userid: "b419010",
  username: "Aditya",
  pin: 4444,
  categ: "Postgrad",
};

const accounts = [account1, account2, account3, account4];
// login operation

submit.addEventListener("click", function (e) {
  e.preventDefault();
  let count = 0;
  accounts.forEach(function (acc, i) {
    if (username.value === acc.userid) {
      currentacc = acc;

      count++;
    }
  });
  if (count === 0) {
    alert("Invalid username");
  }
  if (pass.value == currentacc.pin) {
    link.click();
    var a = currentacc.userid;
    localStorage.setItem("myValue", a);
    window.location.href = "das.html";

    var b = category.value;
    localStorage.setItem("myVal", b);
    window.location.href = "das.html";
  } else {
    alert("Invalid password");
  }
});

// next home page js
