// basic functionalities

var btnConnect = document.getElementById('btn-connect');
var btnDisconnect = document.getElementById('btn-disconnect');
var btnPublish = document.getElementById('btn-publish');
var btnSubscribe = document.getElementById('btn-subscribe');
var btnUnsubscribe = document.getElementById('btn-unsubscribe');

var inputTopicSub = document.getElementById('input-subtopic');
var inputTopicPub = document.getElementById('input-pubtopic');
var inputPayload = document.getElementById('input-pubpayload');
var message = document.getElementById('message');
var broker= $('#input-broker').val();

//Unclicked connect Button....
$('#status').val("Disconnected");
$('#btn-subscribe').attr('disabled', true);
$('#btn-unsubscribe').attr('disabled', true);
$('#btn-publish').attr('disabled', true);

//Broker: wss://test.mosquitto.org:8081/mqtt
//Broker: ws://broker.hivemq.com:8000/mqtt


//Functions.....
btnConnect.addEventListener('click', function (e) {
  e.preventDefault();
  console.log("Connect Button Clicked...");
  // client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
  //client = mqtt.connect('#input-broker'.value);
  client = mqtt.connect(broker);
  client.on("connect", function () {
    console.log("Successfully connected");
    $('#status').val("Successfully connected");
    $('#btn-subscribe').attr('disabled', false);
    $('#btn-unsubscribe').attr('disabled', false);
    $('#btn-publish').attr('disabled', false);
  })
  client.on("message", function (topic, payload) {
    console.log('message recieved..')
    console.log([topic, payload].join(": "));
    console.log("Published Successfully...");
    console.log("Received \n{ Topic: " + topic + "; Payload: " + payload + " }");
    var row = $("<tr>");
    $("<td>").text(topic).appendTo($(row));
    $("<td>").text(payload).appendTo($(row));
    $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
    $("tbody").append($(row));
    $('#btn-connect').attr('disabled', false);
  })
})

  btnDisconnect.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("Disconnect Button Clicked...");
    client && client.end();
    console.log("Disconnected...");
    $('#status').val("Disconnected");
    $('#btn-subscribe').attr('disabled', true);
    $('#btn-unsubscribe').attr('disabled', true);
    $('#btn-publish').attr('disabled', true);
  })


  btnPublish.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("Publish Button Clicked...");
    client && client.publish(inputTopicPub.value, inputPayload.value);
  })

  btnSubscribe.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("Subscribe Button Clicked...");
    client.subscribe(inputTopicSub.value);
    console.log('Subscribed: ' + inputTopicSub.value);
    $('#btn-publish').attr('disabled', false);
    $('#btn-connect').attr('disabled', false);
  })

  btnUnsubscribe.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("Unsubscribe Button Clicked...")
    client.unsubscribe(inputTopicSub.value);
    console.log('Unsubscribed: ' + inputTopicSub.value);
    $('#btn-publish').attr('disabled', true);
    $('#btn-connect').attr('disabled', false);

  });







  // // advance functionalities
  // client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
  // client.subscribe("mqtt/demo", function (err){
  //   if (err){
  //     console.log(err);
  //   } else {
  //     console.log("subscribed")
  //   }
  // })

  // client.on("connect", function(){
  //     console.log("Successfully connected");
  // })

  // client.on("message", function (topic, payload) {
  //   console.log([topic, payload].join(": "));
  //   client.end();
  // })

  // client.publish("mqtt/demo", "hello world!", function(err){
  //   if (err){
  //     console.log(err)
  //   } else {
  //     console.log("published")
  //   }
  // })
