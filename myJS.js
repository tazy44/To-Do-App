var theCol = document.getElementById('theAppCol');
var h6List = document.getElementsByTagName('h6');
var addButton = document.getElementById('addButton');
var editButtons = document.getElementsByClassName('editButton');
var checkboxes = document.getElementsByClassName('form-check-input');
var deleteButtons = document.getElementsByClassName('deleteButton');
var addInput = document.getElementById('addInput');

function insertAfter (newElement, targetElement) {
	"use strict";
	// target is what you want it to go after. Look for this elements parent.
	var parent = targetElement.parentNode;

	// if the parents lastchild is the targetElement...
	if (parent.lastChild === targetElement) {
	// add the newElement after the target element.
		parent.appendChild(newElement);
	} else {
	// else the target has siblings, insert the new element between the target and it's next sibling.
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function addNewLabel (labelText, that) {
	var newLabel = document.createElement('LABEL');
	newLabel.setAttribute('style', 'width: 60.8%;');
	if (that.parentElement.previousElementSibling === h6List[2] || that.checked) {
		//The second condition in the if statement enables the toggleCompletion function to work properly
		newLabel.innerHTML = '<input class="form-check-input" type="checkbox" checked="checked"> ' + labelText;
		newLabel.className = 'form-check-label completed';
	} else {
		newLabel.innerHTML = '<input class="form-check-input" type="checkbox"> ' + labelText;
		newLabel.className = 'form-check-label';
	}
	return newLabel;
}

function addNewEditButton () {
	var newEditButton = document.createElement('BUTTON');
	newEditButton.type = 'button';
	newEditButton.className = 'btn editButton';
	newEditButton.innerHTML = 'Edit';
	return newEditButton;
}

function addNewDeleteButton () {
	var newDeleteButton = document.createElement('BUTTON');
	newDeleteButton.setAttribute('style', 'margin: 0 0 0 19%;');
	newDeleteButton.type = 'button';
	newDeleteButton.className = 'btn deleteButton';
	newDeleteButton.innerHTML = 'Delete';
	return newDeleteButton;
}

//Add a new task
function addNewItem () {
	"use strict";
	var addInputText = addInput.value;
	if (addInputText !== "") {
		
		var newLabel = addNewLabel(addInputText, this);	
		var newEditButton = addNewEditButton();
		var newDeleteButton = addNewDeleteButton();
		
		insertAfter(newLabel, h6List[1]);
		insertAfter(newEditButton, newLabel);
		insertAfter(newDeleteButton, newEditButton);
		
		//Attaching the event handlers to the new elements
		newEditButton.onclick = toggleEdit;
		newLabel.firstChild.onclick = toggleCompletion;
		newDeleteButton.onclick = deleteItem;
	}
};
	
//Edit an existing task
function toggleEdit () {
		var prev = this.previousElementSibling;
		var next = this.nextElementSibling;
		if (prev.className === 'form-check-label' || prev.className === 'form-check-label completed') {
			
			var editText = prev.innerHTML;
			
			editText = prev.className==='form-check-label completed' ? editText.slice(67) : editText.slice(49);
			
			var editBar = document.createElement('INPUT');
			editBar.type = 'text';
			editBar.className = 'form-control mb-2 mr-sm-2 mb-sm-0 editInput';
			editBar.value = editText;
			editBar.style.marginLeft = '5%';
			
			var newEditButton = addNewEditButton();
			//The next line overwrites the default innerHTML property set in addNewEditButton function
			newEditButton.innerHTML = 'Done editing';
			
			var editForm = document.createElement('FORM');
			editForm.className = 'form-inline';
			
			editForm.appendChild(document.createTextNode(" ")); //Because appendChild method only works with nodes
			editForm.appendChild(editBar);
			editForm.appendChild(newEditButton);
			theCol.insertBefore(editForm, this);
			prev.parentNode.removeChild(prev);
			next.parentNode.removeChild(next);
			this.parentNode.removeChild(this);
			
			//Attaching the event handlers to the new elements
			newEditButton.onclick = toggleEdit;
			
		} else {
			
			var newLabel = addNewLabel(prev.value, this);
			var newEditButton = addNewEditButton();
			var newDeleteButton = addNewDeleteButton();
			
			theCol.insertBefore(newLabel, this.parentNode);
			insertAfter(newEditButton, newLabel);
			insertAfter(newDeleteButton, newEditButton);
			this.parentNode.parentNode.removeChild(this.parentNode); //Removing the entire form
			
			//Attaching the event handlers to the new elements
			newEditButton.onclick = toggleEdit;
			newLabel.firstChild.onclick = toggleCompletion;
			newDeleteButton.onclick = deleteItem;
			
		}	
	}

//Check & uncheck a task
function toggleCompletion () {
	
		var oldLabel = this.parentNode;
		var item = oldLabel.innerHTML;
		oldLabel.nextElementSibling.parentNode.removeChild(oldLabel.nextElementSibling);
		oldLabel.nextElementSibling.parentNode.removeChild(oldLabel.nextElementSibling);
		oldLabel.parentNode.removeChild(oldLabel);
		var newEditButton = addNewEditButton();
		var newDeleteButton = addNewDeleteButton();
	
	if (this.checked) { //Mark task as complete
		
		item = item.slice(49);
		var newLabel = addNewLabel(item, this);
		insertAfter(newLabel, h6List[2]);
		
	} else {//Mark task as incomplete
		
		item = item.slice(67);
		var newLabel = addNewLabel(item, this);
		insertAfter(newLabel, h6List[1]);
		
	}
		
		insertAfter(newEditButton, newLabel);
		insertAfter(newDeleteButton, newEditButton);
	
		//Attaching the event handlers to the new elements
		newLabel.firstChild.onclick = toggleCompletion;
		newEditButton.onclick = toggleEdit;
		newDeleteButton.onclick = deleteItem;
}

//Delete a task
function deleteItem () {
	this.previousElementSibling.parentNode.removeChild(this.previousElementSibling);
	this.previousElementSibling.parentNode.removeChild(this.previousElementSibling);
	this.parentNode.removeChild(this);
}

addButton.onclick = addNewItem;

for (var i = 0; i < editButtons.length; i++) {
	//Adding () to the function would make an instant call causing the 'this' keyword to be undefined
	//Another way around this is to save the function in a variable & assign the variable to the onclick event
	editButtons[i].onclick = toggleEdit;
}

for (var i = 0; i < deleteButtons.length; i++) {
	deleteButtons[i].onclick = deleteItem;
}

for (var i = 0; i < checkboxes.length; i++) {
	checkboxes[i].onclick = toggleCompletion;
}