function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)

    var username = user;
    var requri   = 'https://api.github.com/users/'+username;
    var repouri  = 'https://api.github.com/users/'+username+'/repos';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4) {
            jsonResponse = JSON.parse(xhr.responseText);
            showUser(jsonResponse,repouri);
            console.log(xhr.status);
            console.log(xhr.readyState);
        }
        else{
            noSuchUser(username)
            console.log(xhr.status);
            console.log(xhr.readyState);
        }
    }
    xhr.open('GET', requri, true);
    xhr.send('');
}

function showUser(user,repouri) {
    // debugger;
    var fullname   = user.name;
    var username   = user.login;
    var aviurl     = user.avatar_url;
    var profileurl = user.html_url;
    var location   = user.location;
    var followersnum = user.followers;
    var followingnum = user.following;
    var reposnum     = user.public_repos;
    var profileid =    user.id;

    if(fullname == undefined) { fullname = username; }

    var outhtml = '<h2>Name: '+fullname+'<br>Link:  <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
    outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
    outhtml = outhtml + '<p>Profile id: '+profileid+'<br>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
    outhtml = outhtml + '<div class="repolist clearfix">';

    var repositories;
    $.getJSON(repouri, function(json){
        repositories = json;
        outputPageContent();
    });
    function outputPageContent() {
        if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
        else {
            outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
            $.each(repositories, function(index) {
                outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
            });
            outhtml = outhtml + '</ul></div>';
        }

        $('#profile').html(outhtml);
    }
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
}

//function noSuchUser(username) {
 //   alert('No Username Found');
    //3. set the elements such that a suitable message is displayed
//}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            username = $(this).val();
            $(this).val("");
            getGithubInfo(username);
        }
    })
});