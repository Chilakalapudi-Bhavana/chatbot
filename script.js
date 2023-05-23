function handleKeyDown(event) {
if (event.keyCode === 13) {
document.getElementById('chatLog').innerHTML ="";
talk();
}
}
function action(){
document.getElementById('chatLog').innerHTML ="";
document.getElementById('userBox').value ="";
}    
function talk(){
  
  ad=["STEP1:You have to write a request letter for the issurance of AD id to the HR Department through your business mail",
  "STEP2:HR Department will send the approval letter to the IT HEAD",
  "STEP3:IT HEAD will forward the mail to System Admin",
  "STEP4:System Admin will check the approval",
  "STEP5:System Admin will create the AD ID"];
  
  symphony_id=["STEP1:First You need to create an AD(Active Directory) ID",
  "STEP2:An Approval letter have to send from IT HEAD to the System Admin",
  "STEP3:System Admin will send AD id to the Symphony team",
  "STEP4:Symphony team will create the Symphony ID"];
  emergency=["9937251244    -   Fire Emergency","9937292897     -   First Aid Center(OHC)","9937251358       -   Operation Saftey team","9000631719     -   Project UdhaySir","9777457239      -   Security Duty Officer","9937251401     - Refinery Duty Officer"];
  
  assembly_points=["1)Admin Block","2)Calcinor","3)CCR","4)Power Plant","You can observe all these assembly points near the respective parking areas"];
  var know = {
    "who are you" : ["Hello, Vedanta Chatbot here"],
    "how are you" : ["I am good.Hope you also good"],
    "what can you do for me" :["I am happy to help you"],
    "good morning" :["Raise and Shine"],
    "good afternoon":["Hey Good Afternoon"],
    "good evening":["Happy Good Evening"],
    "good night":["Good Night have some healthy sleep"],
    "hello":["Hi Dear ,How can i help you!"],
    "hi":["Hello,Hope you are doing well"],
    "hey":["Hey hello!"],
    "are you there":["Hi :)"],
    "say something":["a","b","c","d","e","f"],
    "ok":["Wokey, Thank You So Much"],
    "bye":["Okay! Will meet soon..","Have a great day"],
    "how can i create my ad id":ad,
    "how can i get my ad id":ad,
    "how to create my active directory id":ad,
    "how to get my active directory id":ad,
    "how can i create my active directory id":ad,   
    "how can i get my active directory id":ad,
    "how to create my symphony id":symphony_id,
    "how to get my symphony id":symphony_id,
    "how can i create my symphony id":symphony_id,
    "how can i get my symphony id":symphony_id,
    "emergency":emergency,
    "emergency contacts":emergency,
    "assembly points":assembly_points
    };
    var question = document.getElementById('userBox').value;
    const filtered = question.replace(/[^\w\s]/gi, '');
    const user=filtered.toLowerCase();
    if (user in know) {     
        var array=know[user];
        const l=array.length;
        if(l==1){
        document.getElementById('chatLog').innerHTML = array + "<br>";
        }
        else{
          for (const key in array) 
          document.getElementById('chatLog').innerHTML += array[key] + "<br>";
        }   
    }
   else{
   var present=-2;
   var sol;
   for (const key in know) {
     const similarity = jaroWinklerDistance(user,key);
     if(similarity>0.75 && similarity>present){
      present=similarity;
      sol=key;
    }
   }
  if (present > -1) {
    var array=know[sol];
        const l=array.length;
        if(l==1){
        document.getElementById('chatLog').innerHTML = array + "<br>";
        }
        else{
          for (const key in array) 
          document.getElementById('chatLog').innerHTML += array[key]+ "<br>";
        } 
  } 
  else {
    document.getElementById('chatLog').innerHTML += 'Sorry, I am not sure how to answer that.'+ "<br>";
  }
}
}
function jaroWinklerDistance(s1, s2) {
  // Calculate the Jaro distance
  const jaroDistanceValue = jaroDistance(s1, s2);

  // Calculate the prefix length
  let prefixLength = 0;
  const maxPrefixLength = 4; // Maximum prefix length, you can adjust this value

  for (let i = 0; i < Math.min(s1.length, s2.length); i++) {
    if (s1[i] === s2[i]) {
      prefixLength++;
    } else {
      break;
    }
  }

  // Calculate the Jaro-Winkler distance
  const jaroWinklerDistanceValue = jaroDistanceValue + (prefixLength * 0.1 * (1 - jaroDistanceValue));

  return jaroWinklerDistanceValue;
}

function jaroDistance(s1, s2) {
  // Calculate the matching characters
  let matching = 0;
  let transpositions = 0;
  const maxDistance = Math.floor(Math.max(s1.length, s2.length) / 2) - 1;

  for (let i = 0; i < s1.length; i++) {
    const start = Math.max(0, i - maxDistance);
    const end = Math.min(i + maxDistance + 1, s2.length);

    for (let j = start; j < end; j++) {
      if (s1[i] === s2[j]) {
        matching++;
        if (i !== j) {
          transpositions++;
        }
        break;
      }
    }
  }

  // Calculate the Jaro distance
  const jaroDistanceValue = (matching / s1.length + matching / s2.length + (matching - transpositions) / matching) / 3;

  return jaroDistanceValue;
}
