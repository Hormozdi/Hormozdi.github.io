var query = window.location.search.substring(1);
var qs = parse_query_string(query);

var year = qs.hasOwnProperty("year") ? qs.year : 1399;

var output = [];

var months = JSON.parse(
  httpGet("https://hmarzban.github.io/pipe2time.ir/api/" + year + "/index.json")
)[year];

for (let i = 0; i < months.length; i++) {
  var events = months[i]["events"];
  for (let j = 0; j < events.length; j++) {
    if (events[j]["isHoliday"]) {
      output.push(events[j]["mDate"]);
    }
  }
}

document.getElementById("output").innerHTML = JSON.stringify(output);

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}
