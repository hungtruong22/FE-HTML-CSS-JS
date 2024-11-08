console.log(window);

function openTab(){
    window.open("http://192.168.2.20:5500/index.html", "_blank", "width=1200", "height=600",
        "top=200", "left=300"
    );
}

let href = window.location.href;
setTimeout(() => {
    console.log(href)
}, 2000);


let screenWidth = window.screen.width;
let screenHeight = window.screen.height;
setTimeout(() => {
    console.log(screenWidth + " " + screenHeight);
}, 2000);


function reloadWeb(){
    window.location.reload();
}

// Cookies
function setCookie(cname, cvalue, exdays){
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function login(){
    if(true){
        // document.cookie = 'token=asdfghjkgyturty';
        setCookie("token", "asdasfadstgwevw", 1)
    }
}
let allCookies = document.cookie;
console.log(allCookies);


function getCookie(cname){
    var name  = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++){
        var c = ca[i];
        while(c.charAt(0) == ' '){
            c = c.substring(1);
        }
        if(c.indexOf(name) == 0){
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(cname){
    document.cookie = `${cname}=laasjdkasldj; expires= Thu 01 Jan 1970 00:00:00 UTC`;
}

function updateInfo(){
    document.cookie = 'token=asdasdasva';
}

function deleteInfo(){
    // document.cookie = 'token=sdfsdgsdgsd; expires= Thu, 01 Jan 1970 00:00:00 UTC';
    deleteCookie("token");
}
// End Cookies