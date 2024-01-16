//code for form page
var addBtn = document.querySelector("#add-btn");
var modal = document.querySelector(".form-modal");
var closeBtn = document.querySelector(".closebtn");
function addbutton() {
    modal.classList.add("active");
}
function closebutton() {
    modal.classList.remove("active");

}

//for collection information from form/global variables
var userData = [];
var prnEl = document.querySelector("#prn-no");
var nameEl = document.querySelector("#name");
var emailEl = document.querySelector("#email");
var contactnoEl = document.querySelector("#contact-no");
var deptEl = document.querySelector("#dept");
//variables for register 
var registerBtn = document.querySelector("#registerBtn");
var updateBtn = document.querySelector("#updateBtn");
var formRegister = document.querySelector("#registerForm");

//code for registration
registerBtn.onclick = function (e) {
    e.preventDefault()
    registrationData();
    getDataFromLocal();
    formRegister.reset('');

}


function registrationData() {
    userData.push({
        prnNo: prnEl.value,
        fullName: nameEl.value,
        emailId: emailEl.value,
        contactNo: contactnoEl.value,
        department: deptEl.value
    });

    var studentData = JSON.stringify(userData);
    localStorage.setItem("userData", studentData);
};

//from localstorage to array
if (localStorage.getItem("userData") != null) {
    userData = JSON.parse(localStorage.getItem("userData"));
};

//from locastorage to list
var tableData = document.querySelector("#table-data");
const getDataFromLocal = () => {
    tableData.innerHTML = "";
    userData.forEach((data, index) => {
        tableData.innerHTML += `<tr index='${index}'>
        <td>${index + 1}</td>
        <td>${data.prnNo}</td>
        <td>${data.fullName}</td>
        <td>${data.emailId}</td>
        <td>${data.contactNo}</td>
        <td>${data.department}</td>
        <td>
            <button class="edit-btn">View</button>
            <button class="delete-btn">Delete</button>
        </td>
    </tr>`;

    });

    //delete button
    var i;
    var allDelBtn = document.querySelectorAll(".delete-btn");
    for (i = 0; i < allDelBtn.length; i++) {
        allDelBtn[i].onclick = function () {
            var tr = this.parentElement.parentElement;
            var id = tr.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        userData.splice(id, 1);
                        localStorage.setItem("userData", JSON.stringify(userData));
                        tr.remove();
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        }
    }
    //view button
    var allEdit = document.querySelectorAll(".edit-btn");
    for (i = 0; i < allEdit.length; i++) {
        allEdit[i].onclick = function () {
            var tr = this.parentElement.parentElement;
            var td = tr.getElementsByTagName("TD");
            var index = tr.getAttribute("index");
            var prn = td[1].innerHTML;
            var f_Name = td[2].innerHTML;
            var mail = td[3].innerHTML;
            var contact = td[4].innerHTML;
            var department = td[5].innerHTML;
            addBtn.click();
            //registerBtn.disabled = true;
            //updateBtn.disabled = false;
            prnEl.value = prn;
            nameEl.value = f_Name;
            emailEl.value = mail;
            contactnoEl.value = contact;
            deptEl.value = department;

            updateBtn.onclick = function () {
                userData[index] = {
                    prnNo: prnEl.value,
                    fullName: nameEl.value,
                    emailId: emailEl.value,
                    contactNo: contactnoEl.value,
                    department: deptEl.value
                }
                localStorage.setItem("userData", JSON.stringify(userData));
            }
        }
    }
}
getDataFromLocal();









