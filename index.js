function httpGet(theUrl) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
};

function formatTimeOf(time){
    return new String(
        time.getFullYear() + "-" + 
        String(parseInt(time.getUTCMonth())+1).padStart(2, '0') + "-" +
        String(time.getUTCDate()).padStart(2, '0') + ", " + 
        String(time.getHours()).padStart(2, '0') + ":" + 
        String(time.getMinutes()).padStart(2, '0') + ":" + 
        String(time.getSeconds()).padStart(2, '0')
        );
};

const request_link = "https://worldtimeapi.org/api/timezone/";
const eu = "Europe/Stockholm";
const la = "America/Los_Angeles";
const ny = "America/New_York";
const cn = "Asia/Shanghai";

var eu_time_data = JSON.parse(httpGet(request_link+eu));
var la_time_data = JSON.parse(httpGet(request_link+la));
var ny_time_data = JSON.parse(httpGet(request_link+ny));
var cn_time_data = JSON.parse(httpGet(request_link+cn));

var localtime = Date();

var ny_time = new Date(ny_time_data.datetime.split('.')[0]);
var la_time = new Date(la_time_data.datetime.split('.')[0]);
var eu_time = new Date(eu_time_data.datetime.split('.')[0]);
var cn_time = new Date(cn_time_data.datetime.split('.')[0]);

function updateTime() {
    document.getElementById('la_time').innerHTML = "加州: " + formatTimeOf(la_time);
    document.getElementById('ny_time').innerHTML = "纽约: " + formatTimeOf(ny_time);
    document.getElementById('eu_time').innerHTML = "斯京: " + formatTimeOf(eu_time);
    document.getElementById('cn_time').innerHTML = "深圳: " + formatTimeOf(cn_time);
    var ny_la = (ny_time_data.raw_offset - la_time_data.raw_offset)/3600;
    var eu_ny = (eu_time_data.raw_offset - ny_time_data.raw_offset)/3600;
    var cn_eu = (cn_time_data.raw_offset - eu_time_data.raw_offset)/3600;
    document.getElementById('ny_la_offset').innerHTML = "+" + ny_la;
    document.getElementById('eu_ny_offset').innerHTML = "+" + eu_ny;
    document.getElementById('eu_cn_offset').innerHTML = "+" + cn_eu;

    la_time.setTime(la_time.getTime() + 1000);
    ny_time.setTime(ny_time.getTime() + 1000);
    eu_time.setTime(eu_time.getTime() + 1000);
    cn_time.setTime(cn_time.getTime() + 1000);
};

var intervalID = setInterval(updateTime, 1000);