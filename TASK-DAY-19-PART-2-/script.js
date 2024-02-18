// VARIABLES
let dogCardsElement = document.getElementById("dogCards");
let input = document.querySelector("#input");
let breedsList = document.querySelector("#breedsList");
let box = document.querySelector("#paginateBox");
box.style.visibility = "hidden";

// FUNCTION TO GET DATA FROM SERVER
async function fetchData(start, end) {
	dogCardsElement.innerHTML = "";
	try {
		let url = `https://dog.ceo/api/breed/${input.value}/images`; //Based on the Stanford Dogs Dataset
		let res = await fetch(url);
		let data = await res.json();
		if (res.status == 404) {
			console.log("STATUS == 404");
		} else {
			update(data, start, end);
		}
	} catch (error) {
		console.error("Error fetching dog data:", error);
		dogCardsElement.textContent = "An error occurred while fetching dog data.";
	}
}

//UPDATE DATA TO UI
function update(data, start, end) {
	pageNum.innerHTML = cur_page;
	
	box.style.visibility = "visible";

	for (let i = start; i < end; i++) {
		// console.log(data.message[i])
		if (i == data.message.length) {
			cur_page--;
			alert("Data got over go to previous pages");
			console.log("THE END");
		} else if (i <= data.message.length) {
			const card = document.createElement("div");
			card.className = "card";

			const image = document.createElement("img");
			image.className = "card-img-top";
			image.src = data.message[i];

			const open = document.createElement("div");
			open.className = "cardBody";
			open.innerHTML = `
    <a href="${data.message[i]}" class="cardLink" target="_blank">Click to Open in a new tab</a>
    `;

			card.append(image, open);
			dogCardsElement.appendChild(card);
		}
	}
}

//PAGINATION
var cur_page = 0;
var records_per_page = 8;

//PREVIOUS BUTTON
function prev_Page() {
	if (cur_page > 1) {
		changePage(cur_page - 1);
	}
}

//NEXT BUTTON 
function next_Page() {
	changePage(cur_page + 1);
}

//FUNCTION TO CHANGE THE PAGE
function changePage(num) {
	pageNum.innerHTML = "";
	if (num < 1) num = 1;

	var startPoint = (num - 1) * records_per_page;
	var endPoint = num * records_per_page;

	cur_page = num;
	fetchData(startPoint, endPoint);

	if (num === 1) {
		document.getElementById("prev").style.visibility = "hidden";
	} else {
		document.getElementById("prev").style.visibility = "visible";
	}

	console.log(cur_page);
}

//ASSIGNING BUTTONS TO NAVIGATE BETWEEN PAGES
var d = document.createElement("div");
d.setAttribute("class", "pagination-container");
d.id = "buttons";

var prev = document.createElement("a");
prev.href = `javascript:prev_Page()`;
prev.id = "prev";
prev.innerHTML = "←";

var next = document.createElement("a");
next.href = `javascript:next_Page()`;
next.id = "next";
next.innerHTML = "→";

var pageNum = document.createElement("div");
pageNum.id = "pageNum";

var arr = createAnchorList();

function createAnchorList() {
	var ar = [];
	for (let i = 1; i <= 10; i++) {
		var a = document.createElement("a");
		a.href = `javascript:changePage(${i})`;
		a.innerHTML = i;
		ar.push(a);
	}
	return ar;
}

box.appendChild(d);
d.append(
	prev,
	arr[0],
	arr[1],
	arr[2],
	arr[3],
	arr[4],
	arr[5],
	arr[6],
	arr[7],
	arr[8],
	arr[9],
	next,
	pageNum
);

//FUNCTION TO FETCH BREEDS NAME LIST
async function fetchData2() {
	try {
		let url = "https://dog.ceo/api/breeds/list/all"; //Based on the Stanford Dogs Dataset
		let res = await fetch(url);
		let data2 = await res.json();
		modify(data2);
	} catch (error) {
		console.error("Error fetching dog_name_lists:", error);
	}
}
fetchData2();

//FUNCTION TO SHOW AS OPTIONS 
function modify(data2) {
	let len = Object.keys(data2.message);
	len.forEach((elements) => {
		let options = document.createElement("option");
		options.innerHTML = elements;
		breedsList.append(options);
	});
}

//ADDING KEYBOARD EVENT FOR ENTER KEY
document.addEventListener("keyup", (event) => {
	if (event.key == "Enter") {
		changePage(1);
	}
});
