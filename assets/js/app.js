let cl = console.log;

// CRUD >> 
// Creat >>
// read >>
// update >>
// delete >>

const studentForm = document.getElementById("studentForm");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const stdInfo = document.getElementById("stdInfo");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");

let stdArray =[];

cl(stdArray);
if(getDataFromLS()){
	
stdArray = getDataFromLS();
templating(stdArray);
} 


function getDataFromLS(){
	return JSON.parse(localStorage.getItem("studentInfo"));
}

function uuidv4(){
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c){
		var r =(Math.random() * 16) | 0,
		
		v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
} 



const onSubmitHandler = (e) => {
	e.preventDefault();
	let obj = {
		firstName: fname.value,
		lastName : lname.value,
		email    :    email.value,
		contact  : contact.value,
		id : uuidv4(),
		};
		cl(obj);
		stdArray.push(obj);
		localStorage.setItem('studentInfo',JSON.stringify(stdArray));
		studentForm.reset();
		templating(stdArray);
	
};

function templating(arr){
		let result ='';
		arr.forEach((ele,i) => {
			result += `<tr>
						 <td>${i + 1}</td>
						 <td>${ele.firstName}</td>
						 
						 <td>${ele.lastName}</td>
						 <td>${ele.email }</td>
						 <td>${ele.contact}</td>
						<td><button class="btn btn-success" data-id="${ele.id}" onclick="onEditHandler(this)">Edit</button></td>
						 <td><button class="btn btn-danger" data-id="${ele.id}" onclick="onDeleteHandler(this)">Delete</button></td>
					   </tr>`;
		});
		stdInfo.innerHTML = result;
}

const onEditHandler = (ele) => {
	// cl("Edit",ele)
	let getId = ele.dataset.id;
	localStorage.setItem('setId',getId);
// let getId = ele.getAttribute('data-id');
	// cl(getEleBtn.dataset.id)
	let getLocalData = getDataFromLS();
	// cl(getLocalDate);
	let getObj = getLocalData.filter((e) => e.id === getId);
		// cl(getObj);
		
	fname.value = getObj[0].firstName;
	lname.value = getObj[0].lastName;
	email.value = getObj[0].email;
	contact.value = getObj[0].contact;
	updateBtn.classList.remove('d-none');
	submitBtn.classList.add('d-none');
	
};

const onUpdateHandler = (e) => {
	cl('Upadting Data....')

let getId = localStorage.getItem('setId');
cl(getId);
let getLocalData = getDataFromLS();
getLocalData.forEach(ele => {
	if(ele.id === getId){
		ele.firstName = fname.value;
		ele.lastName = lname.value;
		ele.email = email.value;
		ele.contact = contact.value;
	}
})
localStorage.setItem('studentInfo', JSON.stringify(getLocalData));
templating(getLocalData);
studentForm.reset();
}

const onDeleteHandler = (ele) => {
	cl("Delete",ele);
	let getId = ele.getAttribute('data-id');
	cl(getId);
	
	
	let getLocalData = getDataFromLS();
	let newLocalData = getLocalData.filter(ele => ele.id != getId)
	templating(newLocalData);
	localStorage.setItem('studentInfo',JSON.stringify(newLocalData));
};

studentForm.addEventListener("submit", onSubmitHandler);
updateBtn.addEventListener('click', onUpdateHandler);
// stdArray = JSON.parse(localStorage.getItem('studentInfo'));
