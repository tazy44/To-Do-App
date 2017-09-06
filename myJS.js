var addButton = document.getElementById('addButton');
var theCol = document.getElementById('theAppCol');
var h6List = document.getElementsByTagName('h6');

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
		newEditButton.type = 'submit';
		newEditButton.className = 'btn editButton';
		newEditButton.innerHTML = 'Edit';
		
		var newDeleteButton = document.createElement('BUTTON');
		newDeleteButton.setAttribute('style', 'margin: 0 0 0 19%;');
		newDeleteButton.type = 'submit';
		newDeleteButton.className = 'btn deleteButton';
		newDeleteButton.innerHTML = 'Delete';
		
		theCol.insertBefore(newLabel, h6List[2]);
		insertAfter(newEditButton, newLabel);
		insertAfter(newDeleteButton, newEditButton);
	}
};

//Edit an existing task

//Mark task as complete

//Mark task as incomplete

//Delete a task