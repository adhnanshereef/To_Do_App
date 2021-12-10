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