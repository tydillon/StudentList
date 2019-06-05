// declaring variables

const ul = document.getElementsByClassName('student-list');
const li = document.getElementsByClassName('student-item');
const page = document.getElementById('page');
const searcher = document.getElementById('search');
// const top = document.getElementsByClassName('top');



// shows or hides list items
const showPage = (list, first, last) => {
   for (let i=0; i<list.length; i++) {
      if (i >= first && i <= last) {
         list[i].style.display = "block";
      } else {
         list[i].style.display = "none";
      }
   }
}

//adds links to the bottom of the page for pagination and adds functionality to them.
const appendPageLinks = (list) => {
   //Create a div, give it the pagination class, and append it to the page div
   let pagdiv = document.createElement("div");
   pagdiv.setAttribute('class', 'pagination')
   page.appendChild(pagdiv);
   //Add a ul to the pagination div
   let pagul = document.createElement('ul');
   pagdiv.appendChild(pagul);
   //sets page numbers
   let pagnum = Math.floor(list.length / 10) + 1;
   for (let i = 0; i < pagnum; i++){
      //creates each pagination link and content, then appends to the pagination ul
      let pagli = document.createElement("li");
      pagli.innerHTML = `<a>${i+1}</a>`;
      pagul.appendChild(pagli);
      //sets the first and last list item displayed based on which link is selected
      let paglink = () => {
         let first = (i * 10);
         let last = (i * 10) + 9;
         //runs the showPage function on our list with the parameters
         showPage(li, first, last);
      }
      //sets up the event listeners for each of the pagination links
      pagli.addEventListener('click', paglink, false)
   }
}

//interactive searchbar
const interSearch = () => {
   let filter = searcher.value.toUpperCase();
   for (let j = 0; j < li.length; j++) {
      let h3 = li[j].getElementsByTagName('h3')[0];
      let txtValue = h3.textContent || h3.innerText;
      //indexOf returns the index of an item in an array. if item is not present, it returns -1. 
      //here I'm asking for the indexOf the thing I typed in the searchbar.
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
         //If the index is greater than -1, display it
         li[j].style.display = "block";
      } else {
         //if the index is smaller than -1, don't display it.
         li[j].style.display = "none";
      }
   }
}



// searcher.addEventListener('input', () => {
//    if (searcher.value === '') {
//       for (let k = 0; k < li.length; k++) {
//          if (k < 10) {
//             li[k].style.display = "block";
//          } else {
//             li[k].style.display = "none";
//          }
//       }
//    }
// }, false)

//sets first view of students
showPage(li, 0, 9)
//makes links function
appendPageLinks(li)