prediction = "";

Webcam.set({
    width: 350,
    height: 350,
    image_format: 'png',
    png_quaility: 90
});
 
camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri)  {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"</';
    });
}

function modelLoaded()
{
    console.log('Model Loaded!');
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/TxXcNerH_/model.json', modelLoaded);

function speak()
{
    var synth = window.SpeechSynthesis;
    speak_data = tospeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}


function check()
{
  img = document.getElementById('captured_image');
  classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      document.getElementById("result_gesture_name").innerHTML = results[0].label;
      gesture = results[0].label;
      tospeak = "";
      if(gesture == "Amazing")
      {
        tospeak = "This is looking Amazing";
     document.getElementById("update_emoji").innerHTML = "&#128076;";
      }
      if(gesture == "Best")
      {
        tospeak = "All the best";
     document.getElementById("update_emoji").innerHTML = "&#128077;";
      }
      if(gesture == "Victory")
      {
        tospeak = "That was a marvelous victory";
     document.getElementById("update_emoji").innerHTML = "&#9996;";
      }
      speak();
    }
}