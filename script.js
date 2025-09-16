
const form = document.getElementById('student-form');
const nameInput = document.getElementById('student-name');
const idInput = document.getElementById('student-id');
const ageInput = document.getElementById('student-age');
const classInput = document.getElementById('student-class');
const studentTableBody = document.querySelector('#student-list tbody');


function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.forach(student => addStudentToTable(student));
}

function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
}


function addStudentToTable(student) {
    const row = document.createElement('tr');
    row.dataset.id = student.id; 
    row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.class}</td>
        <td><button class="remove-btn">সরিয়ে ফেলুন</button></td>
    `;
    studentTableBody.appendChild(row);
}


function removeStudent(id) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
   
    students = students.filter(student => student.id !== id);
   
    saveStudents(students);
    
    const rowToRemove = document.querySelector(`tr[data-id="${id}"]`);
    if (rowToRemove) {
        rowToRemove.remove();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const newStudent = {
        name: nameInput.value,
        id: idInput.value,
        age: ageInput.value,
        class: classInput.value
    };

    const students = JSON.parse(localStorage.getItem('students')) || [];
    const isDuplicate = students.some(student => student.id === newStudent.id);
    if (isDuplicate) {
        alert('এই আইডি দিয়ে একজন শিক্ষার্থী ইতিমধ্যে যুক্ত আছে।');
        return;
    }

    students.push(newStudent);
    saveStudents(students);
    addStudentToTable(newStudent);

    form.reset();
});


studentTableBody.addEventListener('click', (e) => {
    
    if (e.target.classList.contains('remove-btn')) {
       
        const row = e.target.closest('tr');
        const studentId = row.dataset.id;
        
        removeStudent(studentId);
    }
});

document.addEventListener('DOMContentLoaded', loadStudents);
