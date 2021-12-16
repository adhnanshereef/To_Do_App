// Login
$("#login-verification").submit((e) => {
  e.preventDefault();
  $.ajax({
    url: "/login",
    method: "post",
    data: $("#login-verification").serialize(),
    success: (response) => {
      if (response.loginSuccess == true) {
        location.href = "/";
      } else {
        document.getElementById("login-err").innerHTML = "Invalid Password";
      }
    },
  });
});

// New Program

$("#new-program").submit((e) => {
  e.preventDefault();
  $.ajax({
    url: "/new",
    method: "post",
    data: $("#new-program").serialize(),
    success: (response) => {
      if (response.success == true) {
        location.href = "/to-do";
      } else {
        location.href = "/new";
      }
    },
  });
});

// logout

function logout() {
  $.ajax({
    url: "/logout",
    method: "post",
    success: (response) => {
      if (response.success == true) {
        location.href = "/";
      } else {
        location.href = "/login";
      }
    },
  });
}

// done program

function doneProgram(text, programId) {
  $.ajax({
    url: "/done-program/" + text + "/" + programId,
    method: "get",
    success: (response) => {
      if (response.success == true) {
        location.reload();
      }
    },
  });
}

function deleteAllDone() {
  $.ajax({
    url: "/delete-all-done",
    method: "get",
    success: (response) => {
      if (response.success == true) {
        location.reload();
      }
    },
  });
}
function deleteDoned(id) {
  $.ajax({
    url: "/delete-doned/" + id,
    method: "get",
    success: (response) => {
      if (response.success == true) {
        location.reload();
      }
    },
  });
}

// Droped program

function dropProgram(text, programId) {
  $.ajax({
    url: "/drop-program/" + text + "/" + programId,
    method: "get",
    success: (response) => {
      if (response.success == true) {
        location.reload();
      }
    },
  });
}

function deleteAllDrop() {
  $.ajax({
    url: "/delete-all-drop",
    method: "get",
    success: (response) => {
      if (response.success == true) {
        location.reload();
      }
    },
  });
}
function deleteDroped(id) {
  $.ajax({
    url: "/delete-droped/" + id,
    method: "get",
    success: (response) => {
      if (response.success == true) {
        location.reload();
      }
    },
  });
}
