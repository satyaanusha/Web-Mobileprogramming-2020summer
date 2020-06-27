function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return the object(it now contains the response!)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200 ) {
                var response = JSON.parse(this.responseText);
               $("#displaytext").text(user.login);
                $(".avatar").html("<img height='200' width='200' src='"+ user.avatar_url+"'/>");
                var link = "<a target='_blank' href='"+user.html_url+"'> Git Hub URL  </a>";
            $(".information").html("<label><u><strong>User Information</strong></u></label>" +
        "<br/><br/><label style='color: #660939'>User Name : </label>"+ user.login
        +"<br/><label style='color: #660939'> Profile ID : </label>"+ user.id
        +"<br/> <label style='color: MediumSeaGreen'>Link to Profile: </label>"+link
             $("#profile").show();
            }
            else {
                $("#displaytext").text(" username " +username + "does not exists");
                 $("#profile").show();
            }
        };

    xhttp.open("GET","https://api.github.com/users/"+user,false);
   xhttp.send();

}

$(document).ready(function(){
    $(document).on('keypress', '#username', function(e){
        
         $("#profile").hide();
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            username = $(this).val();
            $(this).val("");
            response = getGithubInfo(username);


        }
    })
});
