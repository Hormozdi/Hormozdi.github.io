(function () {
    var listView = document.getElementById("points-list");
    var radius = document.getElementById("radius");
    var lat = document.getElementById("lat");
    var lng = document.getElementById("lng");
    var showurl = document.getElementById("showurl");
    var editurl = document.getElementById("editurl");

    var points   = [];
    var markers  = [];
    var circles  = [];

    var mymap = L.map("mapid").setView([35.727481, 51.403944], 11);

    radius.value = 0;

    L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
        {
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
        }
    ).addTo(mymap);

    function onMapClick(e) {
        lat.value = e.latlng.lat.toFixed(6);
        lng.value = e.latlng.lng.toFixed(6);
    }

    mymap.on("click", onMapClick);

    var oldPoints = getURLParameter("points");
    if (oldPoints) {
        if (getURLParameter("edit") != 1) {
            document.getElementById("sidebar").className = "hidepart";
            document.getElementById("mapparent").className = "col";
        }

        oldPoints = JSON.parse(decodeURIComponent(oldPoints));
        for (let i = 0; i < oldPoints.length; i++) {
            addNode(oldPoints[i]);
        }
    }

    document.getElementById("addNewPoint").addEventListener(
        "click",
        function (e) {
            addNode();
        },
        true
    );

    function addNode(point = null) {
        if (!point && (!lat.value || !lng.value)) {
            return;
        }

        var newNode = point
            ? [point[0], point[1]]
            : [(+lat.value).toFixed(6), (+lng.value).toFixed(6)];
        lat.value = "";
        lng.value = "";

        var newRadius = point && point[2] ? point[2] : +radius.value;

        points.push([...newNode, newRadius]);

        var element = document.createElement("li");
        element.className =
            "list-group-item d-flex justify-content-between align-items-center";
        element.innerHTML =
            newNode +
            '<span id="removebtn' +
            points.length +
            '" pointnum="' +
            (points.length - 1) +
            '" class="badge badge-danger badge-pill" style="cursor: pointer;">X</span>';
        listView.appendChild(element);
        document
            .getElementById("removebtn" + points.length)
            .addEventListener("click", removeNode, true);

        var marker = L.marker(newNode).addTo(mymap);
        var circle = L.circle(newNode, newRadius, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mymap);
        // .bindPopup("<b>Hello world!</b><br />I am a popup.")
        // .openPopup();

        markers.push(marker);
        circles.push(circle);

        var group = new L.featureGroup(markers);
        mymap.fitBounds(group.getBounds());

        updateShowUrl();
    }

    function removeNode(e) {
        var num = e.target.getAttribute("pointnum");
        points.splice(num, 1);
        mymap.removeLayer(markers[num]);
        markers.splice(num, 1);
        mymap.removeLayer(circles[num]);
        circles.splice(num, 1);
        e.target.parentElement.remove();
        updateShowUrl();
    }

    function updateShowUrl() {
        showurl.value =
            "http://hormozdi.github.io/multipoint?points=" +
            JSON.stringify(points);

        editurl.value =
            "http://hormozdi.github.io/multipoint?points=" +
            JSON.stringify(points) +
            "&edit=1";
    }

    function getURLParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split("&");
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split("=");
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }
})();
