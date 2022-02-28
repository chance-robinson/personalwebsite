document.getElementById("idForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const id = document.getElementById("userInput").value;
    const fullURL = "https://api.github.com/users/" + id;
    fetch(fullURL)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            document.getElementById("gitURL").innerHTML =  "<h2><a style=\"color:black;\" href=\"" + json.url + "\">User Data</a></h2>";
            document.getElementById("gitId").innerHTML = "<p>ID = " + json.id + "</p>"
            document.getElementById("gitImage").src = json.avatar_url;
            document.getElementById("gitName").innerHTML = "<p>Name = " + json.name + "</p>";
            document.getElementById("gitBio").innerHTML = "<p>Bio = " + json.bio + "</p>";
            var repos_url = json["repos_url"];
            fetch(repos_url)
                .then(function (response2) {
                    return response2.json();
                }).then(function (json2) {
                    let repos = "<h2><a style=\"color:black;\" href=\"https://github.com/" + id + "?tab=repositories\">Public Repos</a></h2>";
                    console.log(json2);
                    for (let i = 0; i < json2.length; i++) {
                        repos += "<p><a href=\"https://github.com/" + json2[i].full_name + "\">" + json2[i].name + "</a></p>";
                    }
                    document.getElementById("publicRepos").innerHTML = repos;
                });
        });
});