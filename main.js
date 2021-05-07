var predidion_1
var predidion_2

Webcam.set({
    width:350,
    height:300,
    image_format:'jpg',
    jpg_quality:200,
})
camera=document.getElementById("webiie");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML="<img id='capured_img' src='"+data_uri+"'>";
    });
}

    console.log('ml5 version:',ml5.version);
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/zeOHWPNBm/model.json',modelLoaded);

    function modelLoaded() {
        
        console.log('modlaed');

    }
    function speak() {
        var synth=window.speechSynthesis;
        speakdata1="the first predicion is"+predidion_1;
        speakdata2="the second predicion is"+predidion_2;
        var utterthis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
        synth.speak(utterthis);
    }
    function check() {

        img=document.getElementById("capured_img");
        classifier.classify(img,gotresult);
        
    }
    function gotresult(error,results) {

        if (error) {
            console.error(error);
        }
        else{
            console.log(results);
            document.getElementById("result_imotion_name").innerHTML=results[0].label;
            document.getElementById("result_imotion_name2").innerHTML=results[1].label;
            predidion_1=results[0].label;
            predidion_2=results[1].label;
            speak();
            if (results[0].label=="best") {

                document.getElementById("update_imoji_name").innerHTML="&#128076";
                
            }
            if (results[0].label=="victory") {

                document.getElementById("update_imoji_name").innerHTML="&#9996";
                
            }

            if (results[0].label=="thumbs up or down") {

                document.getElementById("update_imoji_name").innerHTML="&#128077"+"&#128078";
                
            }

        }
    }