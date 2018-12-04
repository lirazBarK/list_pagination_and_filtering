/*
This project is showing a list of students, 10 student per page,
and it also allows you to search in real time for a student in the list.
 */

document.addEventListener('DOMContentLoaded', () => {
const ul = document.querySelector('.student-list');
const li = document.querySelector('.student-item cf');
const mainPage = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const paginationDiv = document.createElement('div');
const newUl = document.createElement('ul');
const list = ul.children;
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');

searchDiv.className = 'student-search';
searchInput.type = 'text';
searchInput.placeholder = 'Search for students...';
searchButton.textContent = 'Search';
pageHeader.prepend(searchDiv);
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);

paginationDiv.className = 'pagination';
paginationDiv.appendChild(newUl);
mainPage.appendChild(paginationDiv);

const noMatch = document.createElement('span');
noMatch.textContent = 'No matches were found';
mainPage.appendChild(noMatch);
noMatch.style.display = 'none';

//When this function is called it shows the list of 10 students based on the number of the page your on
const showPage = (list, page) => {
  const skip = 10 * (page-1);
  const limit = skip + 9;
  for (let i = 0; i < list.length; i++ ){
    if( i <= limit && i >= skip) {
      list[i].style.display = '';
    }else {
      list[i].style.display = 'none';
    }
    }
  };

/*This function creates the page number li based on the length of the students list, and appends it to
  the ul in the paginationDiv*/
const createPageLinks = list => {
  while(newUl.firstElementChild){
  newUl.removeChild(newUl.firstElementChild)
}
  const pages = Math.ceil(list.length / 10);
  for(let i = 1; i <= pages; i++) {
    let page = i;
    let newLi = document.createElement('li');
    let newAnchor = document.createElement('a');
    newAnchor.textContent = page;
    if(page === 1) {
    newAnchor.className = "active";
  }else{
    newAnchor.className = "";
  }
    newLi.appendChild(newAnchor);
    newUl.appendChild(newLi)
  };

}

 createPageLinks(list);
 showPage(list, 1);

 /*When this function is called it filters and show only the students that includes the text
 that entered in the 'searchInput' input */
const eventFunc = () => {
  const value = searchInput.value.trim();
  if(value) {
  const filteredList = Array.from(list).filter((li) => {
      const studentName =li.querySelector('h3').textContent;
      const studentEmail = li.querySelector('span.email').textContent;
      if(studentName.includes(value)) {
      return studentName.includes(value);
    }else {
      return studentEmail.includes(value)
    }
    });
    if(filteredList.length > 0) {
    noMatch.style.display = 'none'
    showPage(list, -1);
    showPage(filteredList, 1);
    createPageLinks(filteredList);
  }else{
    showPage(list, -1);
    createPageLinks(filteredList);
    noMatch.style.display = 'block';
  }
  }else {
    showPage(list, 1);
    createPageLinks(list);
  }
}

//Show the students in the list based on the page number and add css to that anchor attribute
paginationDiv.addEventListener('click', (e) => {
  const a = e.target;
  const li = newUl.getElementsByTagName("li")
  for(let i = 0; i < li.length; i++) {
    li[i].childNodes[0].className ="";
  }
  a.className = 'active';
 showPage(list, a.textContent);
});

searchInput.addEventListener('keyup' , () => {
  eventFunc();
})

searchButton.addEventListener('click' , () => {
  eventFunc();
})

});
