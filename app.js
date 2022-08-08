showNotes();//here we need to call the function because at start only the already available notes must be displayed...
let title = document.getElementById('own');
let addBtn = document.getElementById('addbtn');
addBtn.addEventListener('click', function (e) {

   let addTitle = document.getElementById("addtitle");
   let addTxt = document.getElementById("addtxt");
   let notes = localStorage.getItem("notes");

   if (notes == null) {
      notesObj = [];              //notesObj is an array...
   }
   else {
      notesObj = JSON.parse(notes); //convert into string...
   }
   //notesObj.push(title.value);
   let myObj = {title : addTitle.value ,text : addTxt.value};//make as object literal and then push
   notesObj.push(myObj);
   localStorage.setItem("notes", JSON.stringify(notesObj));
   addTxt.value = " ";
   addTitle.value=" ";
   //console.log(notesObj);
   showNotes();
});
//function to add note to local storage....
function showNotes() {
   let notes = localStorage.getItem("notes");
   if (notes == null) {
      notesObj = [];
   }
   else {
      notesObj = JSON.parse(notes);
   }
   let html = "";
   notesObj.forEach(function (element, index) {
      html += `<div class="notesCard my-2 mx-2 card" style="width: 18rem;">
      <div class="card-body">
          <h5 class="card-title"> ${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
      </div>
  </div> `;
   });
   let notesElm = document.getElementById('notes');
   if (notesObj.length != 0) {
      notesElm.innerHTML = html;
   }
   else {
      notesElm.innerHTML = `Nothing to show !!! Use Add a Note section above to add the Note.....!!!!`
   }
}

//function to delete note frpm local storage.....
function deleteNote(index) {
   //console.log("I am deleting....", index);
   let notes = localStorage.getItem("notes");
   if (notes == null) {
      notesObj = [];
   }
   else {
      notesObj = JSON.parse(notes);
   }
   notesObj.splice(index,1);
   localStorage.setItem("notes", JSON.stringify(notesObj));
   showNotes();
}


//code for search bar....
 let search = document.getElementById('searchtxt');
 search.addEventListener("input",function(){

   //console.log("input event fired...");
   let inputVal = search.value.toLowerCase() ;
   //console.log("input event fired!!!",inputVal);
   let noteCards = document.getElementsByClassName('notesCard');
   Array.from(noteCards).forEach(function(element){
             let cardtxt = element.getElementsByTagName("p")[0].innerText;
             if(cardtxt.includes(inputVal)){
               element.style.display = "block";
             }
             else{
               element.style.display = "none";
             }
            // console.log(cardtxt);
   });
 });

 

