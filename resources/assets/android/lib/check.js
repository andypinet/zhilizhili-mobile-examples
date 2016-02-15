var htmlclass = document.querySelector("html").getAttribute("class").trim().split(" ");
htmlclass = htmlclass.filter(function(c) {
    if (c.indexOf("no") < 0) {
        return c;
    }
});
htmlclass.sort(natcmp);
document.getElementById("htmlclass").innerHTML = htmlclass.join("<br>") + "<div>" + window.navigator.appVersion + "</div>";
