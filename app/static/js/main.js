let time_mouse = {
    startTime: NaN,
    endTime: NaN
};

let time_key = {
    startTime: NaN,
    endTime: NaN
};
let key_code = NaN;
let time_cursor = NaN;
let mouse_x = NaN;
let mouse_y = NaN;

let type_key = 'key';
let type_mouse = 'mouse';
let type_cursor = 'cursor';

const MILLISECOND_TO_SECOND = 1000;
let ua = window.navigator.userAgent;
//----------------------------------------------------------------------
function do_ajax(body) {
    let req = new XMLHttpRequest();
	req.open('POST', '/stat', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
	req.send(body);
}

function inputTime({
    startTime,
    endTime
}, type, key_code) {
    let Time = (endTime - startTime) / MILLISECOND_TO_SECOND;
	let body = 'down=' + startTime + '&up=' + endTime + '&time=' + Time + '&type=' + type + '&code=' + key_code + '&x=' + NaN + '&y=' + NaN + '&user_agent=' + ua + '&url=' + document.location.pathname;
	do_ajax(body);
//    console.log(`time: ${ Time }s.`);
}
//----------------------------------------------------------------------
document.addEventListener("keydown", key_DownHandler);

function key_DownHandler() {
    document.removeEventListener('keydown', key_DownHandler);
    document.addEventListener('keyup', key_UpHandler);
    time_key.startTime = Date.now();
//    console.log(`Start time: ${ time.startTime}s.`);

}

function key_UpHandler() {
    document.removeEventListener('keyup', key_UpHandler);
    document.addEventListener('keydown', key_DownHandler);
    time_key.endTime = Date.now();
    if (event.key == 'Backspace') {
        key_code = 1;
    }
    if (event.key == 'Delete') {
        key_code = 2;
    }
//    console.log(`End time: ${ time.endTime}s.`);
    inputTime(time_key, type_key, key_code);
  
}
//------------------------------------------------------------------------
let button = document.activeElement;

button.addEventListener('mousedown', button_mouseDownHandler);

function button_mouseDownHandler() {
    button.removeEventListener('mousedown', button_mouseDownHandler);
    button.addEventListener('mouseup', button_mouseUpHandler);
    time_mouse.startTime = Date.now();
}

function button_mouseUpHandler() {
    button.removeEventListener('mouseup', button_mouseUpHandler);
    button.addEventListener('mousedown', button_mouseDownHandler);
    time_mouse.endTime = Date.now();
    inputTime(time_mouse, type_mouse, NaN);
}
//------------------------------------------------------------------------
document.addEventListener("mousemove", mousemove_writer);

event.clientX = NaN;
event.clientY = NaN;

function mousemove_writer() {
    mouse_x = event.clientX;
    mouse_y = event.clientY;
	time_cursor = Date.now();
	let body = 'down=' + NaN + '&up=' + NaN + '&time=' + time_cursor + '&type=' + type_cursor + '&code=' + NaN + '&x=' + mouse_x + '&y=' + mouse_y + '&user_agent=' + ua + '&url=' + document.location.pathname;
	do_ajax(body);
	//console.log(`time: ${ time_cursor }s.`);
	//console.log(`mouse_x: ${ mouse_x }s.`);
}