const account1 = {
  userid: "b319049",
  username: "Shubham",
  pin: 1111,
  categ: "Undergrad",
  gender: "Male",
  email: "shubhammanohar20@gmail.com",
  phone: "8340686505",
  bookid: [456, 457, 458],
  issdt: ["01/11/2021", "02/11/2021", "03/11/2021"],
  expt: ["26/11/2021", "28/11/2021", "29/11/2021"],
  rsbkid: [489, 510],
  rsdt: ["04/11/2021", "06/11/2021"],
};

const account2 = {
  userid: "b419049",
  username: "Sambit",
  pin: 2222,
  categ: "Undergrad",
  gender: "Male",
  email: "sambit49@gmail.com",
  phone: "9178973931",
  bookid: [123, 128, 129],
  issdt: ["01/10/2021", "02/10/2021", "03/10/2021"],
  expt: ["26/10/2021", "28/10/2021", "29/10/2021"],
  rsbkid: [056, 210],
  rsdt: ["05/10/2021", "07/10/2021"],
};

const account3 = {
  userid: "b419042",
  username: "Pratik",
  pin: 3333,
  categ: "faculty",
  gender: "Male",
  email: "pratikkumar@gmail.com",
  phone: "9040086005",
  bookid: [345, 346, 347],
  issdt: ["01/09/2021", "02/09/2021", "03/09/2021"],
  expt: ["26/09/2021", "28/09/2021", "29/09/2021"],
  rsbkid: [156, 110],
  rsdt: ["03/09/2021", "07/09/2021"],
};

const account4 = {
  userid: "b419010",
  username: "Aditya",
  pin: 4444,
  categ: "Postgrad",
  gender: "Male",
  email: "adityamohanty@gmail.com",
  phone: "9740646505",
  bookid: [278, 289, 290],
  issdt: ["01/08/2021", "02/08/2021", "03/08/2021"],
  expt: ["26/08/2021", "28/08/2021", "29/08/2021"],
  rsbkid: [186, 140],
  rsdt: ["02/08/2021", "07/08/2021"],
};
const booklist = {
  bkid: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
  bktitle: [
    "A time to kill",
    "A Passage to India",
    "A Suitable Boy",
    "Origin Of Species",
    "Paradise Lost",
    "Meghdoot",
    "Seva Sadan",
    "Jungle Book",
    "Time Machine",
    "India Divided",
  ],
  bkauthor: [
    "John Grisham",
    "E.M Foster",
    "Vikram Seth",
    "Charles Darwin",
    "John Miton",
    "Kalidasa",
    "Premchand",
    "Ruskin Bond",
    "H.G. Wells",
    "Dr. Rajendra Prasad",
  ],
  rack: [11, 22, 44, 32, 4, 2, 12, 13, 14, 23],
};
const accounts = [account1, account2, account3, account4];

const dashboard = document.querySelector(".nav1");
const Booksavail = document.querySelector(".nav2");
const profile = document.querySelector(".nav3");
const app1 = document.querySelector(".app1");
const app2 = document.querySelector(".app2");
const app3 = document.querySelector(".app3");
//profile selection
const usenam = document.querySelector(".usen");
const uside = document.querySelector(".usid");
const gender = document.querySelector(".gen");
const cate = document.querySelector(".cat");
const phone = document.querySelector(".phn");
const emaile = document.querySelector(".email");
//updating the issued book table
const containertable = document.querySelector(".table");
const containertableee = document.querySelector(".tableee");
//unreserve
const unreserve = document.querySelector(".uner");
//for book list
const booklists = document.querySelector(".tabotable");
const input = document.querySelector(".bkiduns");
//iss btn
const issue = document.querySelector(".issbtn");
const searchse = document.querySelector(".searchs");
const reserve = document.querySelector(".rebtn");

Booksavail.addEventListener("click", function (e) {
  Booksavail.classList.add("active");
  dashboard.classList.remove("active");
  profile.classList.remove("active");
  app2.classList.remove("hide");
  app1.classList.add("hide");
  app3.classList.add("hide");
});
profile.addEventListener("click", function (e) {
  Booksavail.classList.remove("active");
  dashboard.classList.remove("active");
  profile.classList.add("active");
  app2.classList.add("hide");
  app1.classList.add("hide");
  app3.classList.remove("hide");
});
dashboard.addEventListener("click", function (e) {
  Booksavail.classList.remove("active");
  dashboard.classList.add("active");
  profile.classList.remove("active");
  app2.classList.add("hide");
  app1.classList.remove("hide");
  app3.classList.add("hide");
});

var b = localStorage.getItem("myValue");
var c = localStorage.getItem("myVal");

accounts.forEach(function (acc, i) {
  if (acc.userid === b) {
    currentacc = acc;
  }
});
console.log(currentacc);
document.querySelector(".namehome").textContent = currentacc.username;

// updating profile information

const updateUI = function (account) {
  for (i = 0; i < account.bookid.length; i++) {
    const html = `
    <tr>
                <th scope="row">${i + 1}</th>
  
                <td>${account.bookid[i]}</td>
                <td>${account.issdt[i]}</td>
                <td>${account.expt[i]}</td>
              </tr>`;
    containertable.insertAdjacentHTML("beforeend", html);
  }
  //updating the reserve book table

  for (i = 0; i < account.rsbkid.length; i++) {
    const htmlm = `
    <tr>
                <th scope="row">${i + 1}</th>
  
                <td>${account.rsbkid[i]}</td>
                <td>${account.rsdt[i]}</td>
                
              </tr>`;
    containertableee.insertAdjacentHTML("beforeend", htmlm);
  }

  usenam.textContent = account.username;
  uside.textContent = account.userid;
  gender.textContent = account.gender;
  phone.textContent = account.phone;
  emaile.textContent = account.email;
  cate.textContent = c;
};

updateUI(currentacc);
//updating Book list
//updating Book list

for (i = 0; i < booklist.bkid.length; i++) {
  const htmlms = `
    <tr>
    <th scope="row">${i + 1}</th>

    <td>${booklist.bkid[i]}</td>
    <td>${booklist.bktitle[i]}</td>
    <td>${booklist.bkauthor[i]}</td>
    <td>${booklist.rack[i]}</td>
  </tr>`;
  booklists.insertAdjacentHTML("beforeend", htmlms);
}

//unreserve operation
unreserve.addEventListener("click", function () {
  // const indexOf = currentacc.rsbkid.indexOf(parseInt(input.value));

  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }

  currentacc.rsbkid = arrayRemove(currentacc.rsbkid, parseInt(input.value));
  containertableee.innerHTML = "";
  containertableee.innerHTML = `<thead>
  <tr>
    <th scope="col">SL NO</th>
    <th scope="col">Book ID</th>
    <th scope="col">Reservation Dt</th>
  </tr>
</thead>`;

  for (i = 0; i < currentacc.rsbkid.length; i++) {
    const htmlm = `
  <tr>
              <th scope="row">${i + 1}</th>

              <td>${currentacc.rsbkid[i]}</td>
              <td>${currentacc.rsdt[i]}</td>
              
            </tr>`;
    containertableee.insertAdjacentHTML("beforeend", htmlm);
  }
});
let capacity;
issue.addEventListener("click", function () {
  if (c == "UnderGraduate" || c == "PostGraduate") {
    capacity = 3;
  }
  if (c == "Faculty") {
    capacity = 4;
  }
  if (currentacc.bookid.length < capacity) {
    console.log(searchse.value);
    containertable.innerHTML = `<thead>
    <tr>
      <th scope="col">SL NO</th>
      <th scope="col">Book ID</th>
      <th scope="col">Issued Dt</th>
      <th scope="col">Expiry Dt</th>
    </tr>
  </thead>`;
    currentacc.bookid.push(searchse.value);
    currentacc.issdt.push("26/11/2021");
    currentacc.expt.push("10/12/2021");

    //
    for (i = 0; i < currentacc.bookid.length; i++) {
      const html = `
        <tr>
                    <th scope="row">${i + 1}</th>

                    <td>${currentacc.bookid[i]}</td>
                    <td>${currentacc.issdt[i]}</td>
                    <td>${currentacc.expt[i]}</td>
                  </tr>`;
      containertable.insertAdjacentHTML("beforeend", html);
    }
  } else {
    alert("cannot issue more than 3 books");
  }
});

reserve.addEventListener("click", function () {
  containertableee.innerHTML = `<thead>
  <tr>
    <th scope="col">SL NO</th>
    <th scope="col">Book ID</th>
    <th scope="col">Reservation Dt</th>
  </tr>
</thead>`;

  currentacc.rsbkid.push(searchse.value);
  currentacc.rsdt.push("26/11/2021");

  for (i = 0; i < currentacc.rsbkid.length; i++) {
    const htmlm = `
    <tr>
                <th scope="row">${i + 1}</th>
  
                <td>${currentacc.rsbkid[i]}</td>
                <td>${currentacc.rsdt[i]}</td>
                
              </tr>`;
    containertableee.insertAdjacentHTML("beforeend", htmlm);
  }
});

//search operation
