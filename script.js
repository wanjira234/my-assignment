// DOM Elements
const imageElements = document.querySelectorAll('.image-container img');
const studentForm = document.getElementById('student-form');
const studentTable = document.querySelector('#student-table tbody');

// Add animations to the images on hover
imageElements.forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.1)';
    });

    image.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1.0)';
    });
});

// Handle form submission
studentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get student information
    const name = document.getElementById('name').value;
    const admissionNumber = document.getElementById('admission-number').value;

    // Create a new row in the table to display the student data
    const newRow = studentTable.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    cell1.textContent = name;
    cell2.textContent = admissionNumber;

    // Add a delete button to the new row
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        studentTable.deleteRow(newRow.rowIndex);
    });
    cell3.appendChild(deleteButton);

    // Clear the form
    studentForm.reset();

    // Store student information in local storage (optional)
    const studentData = {
        name,
        admissionNumber
    };
    const studentDataList = JSON.parse(localStorage.getItem('studentDataList')) || [];
    studentDataList.push(studentData);
    localStorage.setItem('studentDataList', JSON.stringify(studentDataList));
});

// Load and display student data from local storage (optional)
const storedStudentDataList = JSON.parse(localStorage.getItem('studentDataList')) || [];
for (const data of storedStudentDataList) {
    const newRow = studentTable.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    cell1.textContent = data.name;
    cell2.textContent = data.admissionNumber;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        studentTable.deleteRow(newRow.rowIndex);
    });
    cell3.appendChild(deleteButton);
}
