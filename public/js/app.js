var socket = io();
var $msgs = jQuery('.messages');
socket.on('connect', function(){
    console.log('connected to socket.io server from browser');
});

socket.on('message', function(message){
    var momentTimestamp = moment.utc(message.timestamp); //we have UTC value. Millisecond timestamp is then passed
    console.log('New message:');
    console.log(message.text);
    $msgs.append('<p><strong>'+ momentTimestamp.format("MMM DD h:mm:ssa") +': </strong>'+ message.text +'</p>');
}); //modify string to get updated timestamp

//handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event){
    event.preventDefault(); //used when you don't want to submit form w/o refreshing the entire page
    var $message = $form.find('input[name=message]');
    socket.emit('message', {
        text: $message.val()
    });
    $message.val('');
});