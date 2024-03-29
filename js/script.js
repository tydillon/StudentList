// declaring variables

const ul = document.getElementsByClassName('student-list')
const li = document.getElementsByClassName('student-item')
const page = document.getElementById('page')
const pageHeader = document.getElementById('page-header')
let errMes = document.createElement('p')
errMes.setAttribute('id', 'errorMessage')
errMes.textContent = 'Your search returned no students. Please try again'
page.appendChild(errMes).style.display = 'none'

// shows or hides list items
const showPage = (list, first, last) => {
  for (let i = 0; i < list.length; i++) {
    i >= first && i <= last
      ? (list[i].style.display = 'block')
      : (list[i].style.display = 'none')
  }
}

//adds links to the bottom of the page for pagination and adds functionality to them.
const appendPageLinks = list => {
  //Create a div, give it the pagination class, and append it to the page div
  let pagdiv = document.createElement('div')
  pagdiv.setAttribute('class', 'pagination')
  pagdiv.setAttribute('id', 'pagdiv')
  page.appendChild(pagdiv)
  //Add a ul to the pagination div
  let pagul = document.createElement('ul')
  pagul.setAttribute('id', 'pagul')
  pagdiv.appendChild(pagul)
  //sets page numbers
  let pagnum = Math.floor(list.length / 10) + 1
  for (let i = 0; i < pagnum; i++) {
    //creates each pagination link and content, then appends to the pagination ul
    let pagli = document.createElement('li')
    pagli.setAttribute('class', 'pagli')
    pagli.innerHTML = `<a class="">${i + 1}</a>`
    pagul.appendChild(pagli)
    //sets the first and last list item displayed based on which link is selected
    let paglink = () => {
      let first = i * 10
      let last = i * 10 + 9
      //runs the showPage function on our list with the parameters
      showPage(li, first, last)
    }
    //sets up the event listeners for each of the pagination links
    pagli.addEventListener('click', paglink, false)
  }
}

//interactive searchbar

//creating the searchbar
//<input type="text" id="search" class="student-search" onkeyup="interSearch()" placeholder="Search for names..">
const makeBar = () => {
  let searchBar = document.createElement('input')
  searchBar.setAttribute('type', 'text')
  searchBar.setAttribute('id', 'search')
  searchBar.setAttribute('class', 'student-search')
  searchBar.setAttribute('onkeyup', 'interSearch()')
  searchBar.setAttribute('placeholder', 'Search for names...')
  pageHeader.appendChild(searchBar)
}

// adapted from: https://www.w3schools.com/howto/howto_js_filter_lists.asp
const interSearch = () => {
  const searcher = document.getElementById('search')
  let filter = searcher.value.toUpperCase()
  let pagdiv = document.getElementById('pagdiv')
  for (let j = 0; j < li.length; j++) {
    let h3 = li[j].getElementsByTagName('h3')[0]
    let txtValue = h3.textContent || h3.innerText
    //If the search bar is blank, this for loop sets the first 10 elements to be visible again
    if (searcher.value === '') {
      for (let k = 0; k < li.length; k++) {
        k < 10
          ? (li[k].style.display = 'block')
          : (li[k].style.display = 'none')
      }
      pagdiv.style.display = 'block'
      //indexOf returns the index of an item in an array. if item is not present, it returns -1.
      //here I'm asking for the indexOf the thing I typed in the searchbar.
    } else if (txtValue.toUpperCase().indexOf(filter) > -1) {
      //If the index is greater than -1, display it
      li[j].style.display = 'block'
      pagdiv.style.display = 'none'
    } else {
      //if the index is smaller than -1, don't display it.
      li[j].style.display = 'none'
      pagdiv.style.display = 'none'
    }
  }
  //this displays the error message when there are no results in the search
  !document.querySelectorAll('li[style="display: block;"]').length
    ? (errMes.style.display = 'block')
    : (errMes.style.display = 'none')
}

//sets first view of students
showPage(li, 0, 9)
makeBar()
//makes links function
appendPageLinks(li)

//declares pagul and pagli for event listener
const pagul = document.getElementById('pagul')
const pagli = document.getElementsByClassName('pagli')
const list = pagul.querySelectorAll('a')
list[0].setAttribute('class', 'active')
//active links
const setActClass = e => {
  //selects the a elements from pagination links
  for (let i = 0; i < pagli.length; i++) {
    //clears the class from pagination links
    list[i].removeAttribute('class')
  }
  //sets the active class to the selected link
  e.target.setAttribute('class', 'active')
}
//calls the event listener on the pagination links for active class
pagul.addEventListener('click', setActClass, false)

// console.log(document.querySelectorAll('li[style="display: none;"]'))
