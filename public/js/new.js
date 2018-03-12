// request data from server
axios.post("/map")
    .then(function (res) {
        var obj = {
            data: res.data,
            addMarker: addUndragMarker,
            mode: "addable"
        }
        initMap(obj);
    })
    .catch(function (err) {
        console.log(err);
        initMap({
            mode: "addable"
        });
    });
