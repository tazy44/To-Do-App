var theCol = document.getElementById('theAppCol');
var h6List = document.getElementsByTagName('h6');
var addButton = document.getElementById('addButton');
var editButtons = document.getElementsByClassName('editButton');

function insertAfter(newElement, targetElement) {
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

//Add a new task
addButton.onclick = function () {
	"use strict";
	var addInputText = document.getElementById('addInput').value;
	if (addInputText !== "") {
		
		var newLabel = document.createElement('LABEL');
		newLabel.setAttribute('style', 'width: 60.8%;');
		newLabel.innerHTML = '<input class="form-check-input" type="checkbox"> ' + addInputText;
		newLabel.className = 'form-check-label';
		
		var newEditButton = document.createElement('BUTTON');
		newEditButton.type = 'button';
		newEditButton.className = 'btn editButton';
		newEditButton.innerHTML = 'Edit';
		
		var newDeleteButton = document.createElement('BUTTON');
		newDeleteButton.setAttribute('style', 'margin: 0 0 0 19%;');
		newDeleteButton.type = 'button';
		newDeleteButton.className = 'btn deleteButton';
		newDeleteButton.innerHTML = 'Delete';
		
		theCol.insertBefore(newLabel, h6List[2]);
		insertAfter(newEditButton, newLabel);
		insertAfter(newDeleteButton, newEditButton);
		newEditButton.onclick = toggleEdit;
	}
};
	
//Edit an existing task
function toggleEdit () {
		var prev = this.previousElementSibling;
		var next = this.nextElementSibling;
		if (prev.className === 'form-check-label' || prev.className === 'form-check-label completed') {
			
			var editText = prev.innerHTML.slice(49);
			
			var editCheckbox = document.createElement('INPUT');
			editCheckbox.type = 'checkbox';
			editCheckbox.className = 'form-check-input';
			
			var editBar = document.createElement('INPUT');
			editBar.type = 'text';
			editBar.className = 'form-control mb-2 mr-sm-2 mb-sm-0 editInput';
			editBar.value = editText;
			
			var newEditButton = document.createElement('BUTTON');
			newEditButton.type = 'button';
			newEditButton.className = 'btn editButton';
			newEditButton.innerHTML = 'Edit';

			var newDeleteButton = document.createElement('BUTTON');
			newDeleteButton.setAttribute('style', 'margin: 0 0 0 19%;');
			newDeleteButton.type = 'button';
			newDeleteButton.className = 'btn deleteButton';
			newDeleteButton.innerHTML = 'Delete';
			
			var editForm = document.createElement('FORM');
			editForm.className = 'form-inline';
			
			editForm.appendChild(editCheckbox);
			editForm.appendChild(document.createTextNode(" ")); //Because appendChild method only works with nodes
			editForm.appendChild(editBar);
			editForm.appendChild(newEditButton);
			editForm.appendChild(newDeleteButton);
			theCol.insertBefore(editForm, this);
			prev.parentNode.removeChild(prev);
			next.parentNode.removeChild(next);
			this.parentNode.removeChild(this);
			newEditButton.onclick = toggleEdit; //Recursion
			
		} else {
			
			var newLabel = document.createElement('LABEL');
			newLabel.setAttribute('style', 'width: 60.8%;');
			newLabel.innerHTML = '<input class="form-check-input" type="checkbox"> ' + prev.value;
			newLabel.className = 'form-check-label';

			var newEditButton = document.createElement('BUTTON');
			newEditButton.type = 'button';
			newEditButton.className = 'btn editButton';
			newEditButton.innerHTML = 'Edit';

			var newDeleteButton = document.createElement('BUTTON');
			newDeleteButton.setAttribute('style', 'margin: 0 0 0 19%;');
			newDeleteButton.type = 'button';
			newDeleteButton.className = 'btn deleteButton';
			newDeleteButton.innerHTML = 'Delete';
			
			theCol.insertBefore(newLabel, this.parentNode);
			insertAfter(newEditButton, newLabel);
			insertAfter(newDeleteButton, newEditButton);
			this.parentNode.parentNode.removeChild(this.parentNode); //Removing the entire form
			newEditButton.onclick = toggleEdit; //Recursion
			
		}
	}

for (var i = 0; i < editButtons.length; i++) {
	//Adding () to the function would make an instant call causing the 'this' keyword to be undefined
	//Another way around this is to save the function in a variable & assign the variable to the onclick event
	editButtons[i].onclick = toggleEdit;
}

//Mark task as complete

//Mark task as incomplete

//Delete a task