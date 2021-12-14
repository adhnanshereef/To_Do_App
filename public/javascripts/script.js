// Login
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

// New Program

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

// logout

function logout(){
  $.ajax({
    url:'/logout',
    method:'post',
    success:(response)=>{
      if(response.success==true){
        location.href='/'
      }else{
        location.href='/login'
      }
    }
  })
}

// done program

function doneProgram(text,programId){
  $.ajax({
    url:'/done-program/'+text+'/'+programId,
    method:'get',
    success:(response)=>{
      if(response.success==true){
        location.reload()
      }
    }
  })
}