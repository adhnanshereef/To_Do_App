$("#login-verification").submit((e)=>{
    e.preventDefault();
    $.ajax({
        url:'/login',
        method:'post',
        data: $("#login-verification").serialize(),
        success: (response) => {
            if (response.loginSuccess==true) {
              location.href='/'
            } else {
              document.getElementById("login-err").innerHTML="Invalid Password"
            }
          },
    })
})

$("#new-program").submit((e)=>{
    e.preventDefault();
    $.ajax({
        url:'/new',
        method:'post',
        data: $("#new-program").serialize(),
        success: (response) => {
            if (response.success==true) {
              location.href='/to-do'
            } else {
              location.href='/new'
            }
          },
    })
})