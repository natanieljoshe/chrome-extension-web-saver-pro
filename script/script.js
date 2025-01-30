let myLinks = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"));

if (linksFromLocalStorage) {
  myLinks = linksFromLocalStorage;
  renderLinks(myLinks);
}

//render the list of the link
function renderLinks(links) {
  let linksItems = "";
  for (let i = 0; i < links.length; i++) {
    // Ensure the link starts with "https://" if not already present
    let link = links[i].startsWith("http") ? links[i] : `https://${links[i]}`;

    linksItems += `
      <li> 
          <a target='_blank' href='${link}'>
          ${links[i]}
          </a> 
      </li>
      `;
  }
  ulEl.innerHTML = linksItems;
}

//tab button event listener
tabBtn.addEventListener("click", function () {
  //grab the URL of the current tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLinks.push(tabs[0].url);
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
    renderLinks(myLinks);
  });
});

//delete button event listener
deleteBtn.addEventListener("click", function () {
   confirmation = confirm("Are you sure you want to delete?")

  if (confirmation) {
    localStorage.clear();
    myLinks = [];
    renderLinks(myLinks);
  }
});

//input button event listener
inputBtn.addEventListener("click", function () {
  //to add value tot he array (if not empty)
  if (inputEl.value.trim() !== "") {
    myLinks.push(inputEl.value);
  }

  //to save into the local storage
  localStorage.setItem("myLinks", JSON.stringify(myLinks));

  //to print out the value
  renderLinks(myLinks);

  //to clear the field
  inputEl.value = "";
});
