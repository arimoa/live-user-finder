const inputEl = document.getElementById("input");
const ulEl = document.getElementById("ul");
const loadingEl = document.getElementById("loading");
const alertEl = document.getElementById("alert");
let usersList;

async function fetchData() {
  const apiURL = "https://randomuser.me/api/?results=50";

  const response = await fetch(apiURL, { method: "GET" });
  const data = await response.json();
  usersList = data.results;
  loadingEl.classList.add("hidden");
  for (let i = 0; i < usersList.length; i++) {
    const liEl = document.createElement("li");
    liEl.innerHTML = `<img src='${usersList[i].picture.large}' alt='${usersList[i].name.last}' />
    <div class="user-information">
      <p class="user-name">${usersList[i].name.first} ${usersList[i].name.last}</p>
      <p class="user-phone"><span class="material-symbols-outlined">
      call
      </span><span> ${usersList[i].phone}</span></p>
      <p class="user-location"><span class='material-symbols-outlined'>
      location_on
      </span><span> ${usersList[i].location.country}</span></p>
    </div>`;
    ulEl.appendChild(liEl);
  }
}
fetchData();
function filterFun() {
  let liElements = document.querySelectorAll("li");
  let userValue = inputEl.value.toLowerCase();
  regExp = new RegExp(`${userValue}`, `i`);
  if (userValue.length > 0) {
    for (let i = 0; i < liElements.length; i++) {
      if (
        !regExp.test(
          liElements[i].children[1].children[0].innerHTML.toLowerCase()
        )
      ) {
        liElements[i].classList.add("hidden");
      } else {
        liElements[i].classList.remove("hidden");
      }
    }
    let hiddenItems = document.getElementsByClassName("hidden");
    if (hiddenItems.length - 1 < usersList.length) {
      alertEl.style.display = "none";
    } else if (hiddenItems.length - 1 == usersList.length) {
      alertEl.style.display = "block";
    }
  } else if (userValue.length === 0) {
    for (let i = 0; i < usersList.length; i++) {
      liElements[i].classList.remove("hidden");
    }
  }
}

inputEl.addEventListener("keyup", filterFun);
