function httpGet(theUrl) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
};

function formatTimeOf(time){
    return new String(
        time.getFullYear() + "-" + 
        String(parseInt(time.getUTCMonth())+1) + "-" +
        time.getUTCDate() + ", " + 
        time.getHours() + ":" + 
        time.getMinutes() + ":" + 
        time.getSeconds()
        );
};

const request_link = "https://worldtimeapi.org/api/timezone/";
const eu = "Europe/Stockholm";
const us = "America/Los_Angeles";
const cn = "Asia/Shanghai";

var eu_time_data = JSON.parse(httpGet(request_link+eu));
var us_time_data = JSON.parse(httpGet(request_link+us));
var cn_time_data = JSON.parse(httpGet(request_link+cn));

var us_time = new Date(us_time_data.datetime.split('.')[0]);
var eu_time = new Date(eu_time_data.datetime.split('.')[0]);
var cn_time = new Date(cn_time_data.datetime.split('.')[0]);

function updateTime() {
    document.getElementById('us_time').innerHTML = "美国: " + formatTimeOf(us_time);
    document.getElementById('eu_time').innerHTML = "瑞典: " + formatTimeOf(eu_time);
    document.getElementById('cn_time').innerHTML = "中国: " + formatTimeOf(cn_time);
    var eu_us = (eu_time_data.raw_offset - us_time_data.raw_offset)/3600
    var cn_eu = (cn_time_data.raw_offset - eu_time_data.raw_offset)/3600
    document.getElementById('eu_us_offset').innerHTML = "+" + eu_us;
    document.getElementById('eu_cn_offset').innerHTML = "+" + cn_eu;

    us_time.setTime(us_time.getTime() + 1000);
    eu_time.setTime(eu_time.getTime() + 1000);
    cn_time.setTime(cn_time.getTime() + 1000);
};

var intervalID = setInterval(updateTime, 1000);
