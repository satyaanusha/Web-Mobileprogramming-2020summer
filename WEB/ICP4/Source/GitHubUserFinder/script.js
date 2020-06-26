function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return the object(it now contains the response!)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200 ) {


                var response = JSON.parse(this.responseText);
                $('.name').html('User:' + response['login']);
                $('.id').html('Profile ID:' + response['id'])
                $('.img').html('<img src=' + response["avatar_url"] + ' alt="img">')
                $('.info').html('<a href=' + response['html_url'] + '>Link to profile</a>');

            }
            else {
                $('.name').html('Not valid');
            }
        };

    xhttp.open("GET","https://api.github.com/users/"+user,false);
   xhttp.send();

}

$(document).ready(function(){
    $(document).on('keypress', '#username', function(e){
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            user = $(this).val();
            $(this).val("");
            response = getGithubInfo(user);


        }
    })
});
