// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon_search");

const url = 'search/';
let linkTag = searchWrapper.querySelector("a");
let webLink;

inputBox.addEventListener('keyup', (e) => {
  let userData = e.target.value; //user entered data
  let emptyArray = [];
  if (userData) {
    icon.onclick = () => {
      webLink = `${url}${userData}`;
      linkTag.setAttribute("href", webLink);
      linkTag.click();
    }
    emptyArray = suggestions.filter((data) => {
      //filtering array value and user characters to lowercase and return only those words which start with user entered chars
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      // passing return data inside li tag
      return `<li>${data}</li>`;
    });
    searchWrapper.classList.add("active"); //show autocomplete box
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchWrapper.classList.remove("active"); //hide autocomplete box
  }
});

inputBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent form submission if inside a form
    if (inputBox.value) {
      webLink = `${url}${inputBox.value}`;
      linkTag.setAttribute("href", webLink);
      linkTag.click();
    }
  }
});

function select(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
  icon.onclick = () => {
    webLink = `${url}${selectData}`;
    linkTag.setAttribute("href", webLink);
    linkTag.click();
  }
  searchWrapper.classList.remove("active");
}

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    let userValue = inputBox.value;
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join('');
  }
  suggBox.innerHTML = listData;
}