
const request_link = "https://worldtimeapi.org/api/timezone/";
const eu = "Europe/Stockholm";
const la = "America/Los_Angeles";
const ny = "America/New_York";
const cn = "Asia/Shanghai";

var se_time_data = JSON.parse(httpGet(request_link+eu));
var ca_time_data = JSON.parse(httpGet(request_link+la));
var ny_time_data = JSON.parse(httpGet(request_link+ny));
var sz_time_data = JSON.parse(httpGet(request_link+cn));

drawCanvas("ca", getOff(ca_time_data.raw_offset, ca_time_data.dst_offset));
drawCanvas("se", getOff(se_time_data.raw_offset, se_time_data.dst_offset));
drawCanvas("sz", getOff(sz_time_data.raw_offset, sz_time_data.dst_offset));

function getOff(raw, dst) {
    var off = raw + dst;
    return off/3600;
}

function drawCanvas(abbr, off) {
    let name = abbr + "_canvas"; 
    let canvas = document.getElementById(name);
    for (let i = 1; i < 48; i++) {
        var hour = i + off < 0 ? i+off+24 : i+off;
        var lineElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
        var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textElement.setAttribute("x", i*25-5);
        textElement.setAttribute("y", 40);
        textElement.innerHTML = hour%24;
        lineElement.setAttribute("x1", i*25);
        lineElement.setAttribute("x2", i*25);
        lineElement.setAttribute("y1", "0");
        lineElement.setAttribute("stroke", "black");
        if (hour%24 == 0 ) {
            lineElement.setAttribute("stroke-width", "2");
            lineElement.setAttribute("y2", "30");
        } else {
            lineElement.setAttribute("stroke-width", "1");
            lineElement.setAttribute("y2", "20");
            canvas.appendChild(textElement);
        }
        canvas.appendChild(lineElement);
    }
}

function myFunction(e) {
  let x = e.clientX;
  let y = e.clientY;
  let coor = "Coordinates: (" + x + "," + y + ")";

  drawCursorMark("ca", x);
  drawCursorMark("se", x);
  drawCursorMark("sz", x);
}

function drawCursorMark(abbr, x) {
  var name = abbr + "_curserline";
  var curserline_top = document.getElementById(name+"_top");
  var curserline_down = document.getElementById(name+"_down");

  var temp = (x-10) % 25;
  temp = temp < 13 ? (x-10-temp) : (x+15-temp);
  console.log(temp);

  curserline_top.setAttribute("x1", temp);
  curserline_top.setAttribute("x2", temp);
  curserline_top.setAttribute("y1", 0);
  curserline_top.setAttribute("y2", 25);
  curserline_top.setAttribute("style","stroke:rgb(255,0,0);stroke-width:2");

  curserline_down.setAttribute("x1", temp);
  curserline_down.setAttribute("x2", temp);
  curserline_down.setAttribute("y1", 45);
  curserline_down.setAttribute("y2", 100);
  curserline_down.setAttribute("style","stroke:rgb(255,0,0);stroke-width:2");
}

function httpGet(theUrl) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
};