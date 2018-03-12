// request data from server
axios.post("/map")
    .then(function (res) {
        var obj = {
            data: res.data,
            addMarker: addUndragMarker,
            mode: ""
        }
        initMap(obj);
    })
    .catch(function (err) {
        console.log(err);
        initMap({});
    });

// Select all post
var links = $('#post a[href]');
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", (e) => {
        axios.get("/map/" + String(links[i].attributes.href.nodeValue))
            .then((res) => {
                // Display more popup when click
                document.getElementById("popup").classList.toggle("show");
                // Disable scrolling in background
                document.getElementById("body").classList.toggle("static");
                // Fill popup content
                document.getElementById("popup__post").innerHTML = `
                    <p> ${res.data.description} </p>
                    <p> ${res.data.name} </p>
                    <img src="${res.data.image}">
                `;

                // Close popup when click
                document.getElementById("popup__close").addEventListener("click", () => {
                    document.getElementById("popup").classList.toggle("show");
                    // able scrolling in background
                    document.getElementById("body").classList.toggle("static");
                }, {
                    once: true
                });
            })
            .catch((err) => {
                console.log(err);
            });

        // Prevent link to jump
        e.preventDefault();
        e.stopPropagation();
    });
}