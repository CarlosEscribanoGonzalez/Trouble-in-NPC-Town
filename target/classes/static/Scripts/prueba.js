var connection = new WebSocket('ws://127.0.0.1:8080/echo');
connection.onopen = function () {
connection.send('Hi');
}
connection.onerror = function(e) {
console.log("WS error: " + e);
}
connection.onmessage = function(msg) {
console.log("WS message: " + msg.data);
}
$(document).ready(function() {
$('#send-btn').click(function() {
var message = $('#message').val();
connection.send(message);
});
});


