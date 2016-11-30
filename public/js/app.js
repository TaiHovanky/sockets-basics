var socket = io();
var $msgs = jQuery('#msgs');
socket.on('connect', function(){
    console.log('connected to socket.io server from browser');
});

socket.on('message', function(message){
    console.log('New message:');
    console.log(message.text);
    $msgs.append('<p>'+ message.text +'</p>');
});

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