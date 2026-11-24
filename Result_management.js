// Array to store all student records
const students = [];

const messageEl = document.getElementById("message");
const resultSection = document.getElementById("resultSection");

// Show an error or success message
function showMessage(text, isError) {
  messageEl.textContent = text;
  messageEl.className = isError ? "error" : "success";
}

// Calculate grade from percentage
function calculateGrade(percentage) {
  if (percentage >= 90) {
    return "A+";
  } else if (percentage >= 80) {
    return "A";
  } else if (percentage >= 70) {
    return "B";
  } else if (percentage >= 60) {
    return "C";
  } else if (percentage >= 50) {
    return "D";
  } else {
    return "F";
  }
}

// A mark is valid only between 0 and 100
function isValidMark(mark) {
  return mark >= 0 && mark <= 100;
}

// Add a student
function addStudent() {
  const name = document.getElementById("studentName").value.trim();
  const mathValue = document.getElementById("math").value;
  const scienceValue = document.getElementById("science").value;
  const computerValue = document.getElementById("computer").value;

  // Empty checks
  if (name === "") {
    showMessage("Please enter student name", true);
    return;
  }
  if (mathValue === "" || scienceValue === "" || computerValue === "") {
    showMessage("Please enter all subject marks", true);
    return;
  }

  const math = Number(mathValue);
  const science = Number(scienceValue);
  const computer = Number(computerValue);

  // Range check
  if (!isValidMark(math) || !isValidMark(science) || !isValidMark(computer)) {
    showMessage("Error: Marks must be between 0 and 100", true);
    return;
  }

  // Calculations
  const total = math + science + computer;
  const percentage = (total / 300) * 100;
  const grade = calculateGrade(percentage);

  // Save student
  students.push({
    name: name,
    math: math,
    science: science,
    computer: computer,
    total: total,
    percentage: percentage,
    grade: grade
  });

  // Show this student's result
  resultSection.innerHTML =
    "<h3>Student Information</h3>" +
    "<table>" +
    "<tr><th>Field</th><th>Value</th></tr>" +
    "<tr><td>Student Name</td><td>" + name + "</td></tr>" +
    "<tr><td>Mathematics</td><td>" + math + "</td></tr>" +
    "<tr><td>Science</td><td>" + science + "</td></tr>" +
    "<tr><td>Computer</td><td>" + computer + "</td></tr>" +
    "</table>" +
    "<h3>Calculated Result</h3>" +
    "<table>" +
    "<tr><th>Result</th><th>Value</th></tr>" +
    "<tr><td>Total Marks</td><td>" + total + "</td></tr>" +
    "<tr><td>Percentage</td><td>" + percentage.toFixed(2) + "%</td></tr>" +
    "<tr><td>Grade</td><td>" + grade + "</td></tr>" +
    "</table>";

  showMessage("Result calculated successfully", false);

  // Clear the form
  document.getElementById("studentName").value = "";
  document.getElementById("math").value = "";
  document.getElementById("science").value = "";
  document.getElementById("computer").value = "";
}

// Display all students in a table using a loop
function generateStudentList() {
  if (students.length === 0) {
    showMessage("No students added yet", true);
    resultSection.innerHTML = "";
    return;
  }

  let rows = "";
  for (let i = 0; i < students.length; i++) {
    const s = students[i];
    rows +=
      "<tr>" +
      "<td>" + (i + 1) + "</td>" +
      "<td>" + s.name + "</td>" +
      "<td>" + s.total + "</td>" +
      "<td>" + s.percentage.toFixed(2) + "%</td>" +
      "<td>" + s.grade + "</td>" +
      "</tr>";
  }

  resultSection.innerHTML =
    "<h3>Student List</h3>" +
    "<table>" +
    "<tr><th>#</th><th>Name</th><th>Total Marks</th><th>Percentage</th><th>Grade</th></tr>" +
    rows +
    "</table>";

  showMessage("Student list generated (" + students.length + " student(s))", false);
}

// Event handling
document.getElementById("addBtn").addEventListener("click", addStudent);
document.getElementById("listBtn").addEventListener("click", generateStudentList);