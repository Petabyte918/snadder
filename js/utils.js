function cartesian2Polar(pos1,pos2){
    distance = Math.sqrt( (pos2.x-pos1.x)*(pos2.x-pos1.x) + (pos2.y-pos1.y)*(pos2.y-pos1.y) )
    radians = Math.tan((pos2.y-pos1.y)/(pos2.x-pos1.x)) / (180/Math.PI);
    // radians = Math.atan2(y,x) //This takes y first
    polarCoor = { distance:distance, radians:radians }
    return polarCoor
}

function getRandom(min,max){
    return Math.floor(Math.random() * (max-min+1)) + min;
}

function getQuestion(){
    let rand = getRandom(0,window.gameDescriptor.questions.length-1);

    return {
        "q":window.gameDescriptor.questions[rand].q,
        "qid":window.gameDescriptor.questions[rand].qid
    };
}
function getQuestionData(){
    let rand = getRandom(0,window.gameDescriptor.questions.length-1);
    return window.gameDescriptor.questions[rand];
}

function getQuestionByType(questionType,gender=null){
    let question ={};
    for(let i =0 ;i<window.gameDescriptor.questions.length;i++){
        let q = window.gameDescriptor.questions[i];
        if(q.questionType == questionType && !window.gameDescriptor.questionAnswered.includes(q.qid) ){
            if(gender != null)
                question = q;
            else if(q.gender == gender || q.gender == 'both'){
                question = q;
            }

        }
    }
    return question;
}

function getOptions(qid){
    let questions = window.gameDescriptor.questions;
    let options = null;
    for(question of questions){
        if(question.qid == qid){
            options = question.options;
        }
    }
    return options;
}

function getAnswers(qid){
    let questions = window.gameDescriptor.questions;
    let answers = null;
    for(question of questions){
        if(question.qid == qid){
            answers = question.answers;
            break;
        }
    }
    return answers;
}
function getQuestionAnswerData(qid){
    let questions = window.gameDescriptor.questions;
    let data = null;

    for(question of questions){
        if(question.qid == qid){
            data = {
                description: question.answerDesciption,
                questionType: question.questionType,
                img: question.answerImg,
                video: question.answerVideo,
            };
            break;
        }
    }
    return data;
}

function getRandomBoon(){
    let rand = getRandom(0,window.gameDescriptor.assets.length-1);
    return window.gameDescriptor.assets[rand];
}

function addBoonToInventory(asset){
    let found = false;
    for(let ivt of window.gameDescriptor.inventory){
        if(asset.assetName == ivt.assetName){
            ivt.qty += asset.qty;
            found=true;
            break;
        }
    }

    if(!found){
        window.gameDescriptor.inventory.push({
            assetName: asset.assetName,
            assetType: asset.assetType,
            qty: asset.qty,
            img: asset.img,
        });
    }
}
function getBoonQtyFromInventory(assetName){

    let qty = 0;
    for(let ivt of window.gameDescriptor.inventory){
        if(assetName == ivt.assetName){
            qty = ivt.qty;
            break;
        }
    }
    return qty;
}

function useBoonFromInventory(assetName){

    for(let ivt of window.gameDescriptor.inventory){
        if(assetName == ivt.assetName){
            ivt.qty--;
            break;
        }
    }
}

function getRandomPunishment(){
    let rand = getRandom(0,window.gameDescriptor.punishments.length-1);
    return window.gameDescriptor.punishments[rand];
}

function getRandomCommonPunishment(){
    let rand = getRandom(0,window.gameDescriptor.commonPunishents.length-1);
    return window.gameDescriptor.commonPunishents[rand];
}

function checkOptAnswers(qid,answers){
    let questions = window.gameDescriptor.questions;
    let isMatched = false;
    for(question of questions){
        if(question.qid == qid){
            isMatched = arrayEquals(answers,question.answers);
            break;
        }
    }
    return isMatched;
}

function arrayEquals(array1,array2){
    if(array1.sort().join(',')=== array2.sort().join(',')){
        return true;
    }
    else {
        return false;
    }
}


function getGameData(){
    var file = JSON.parse(localStorage.getItem('gamefile'));
    return file;
}

function setGameData(){
    localStorage.setItem('gamefile',JSON.stringify(window.gameDescriptor));
}
function ajaxRequest(method,url,payload){
    var xhr = new XMLHttpRequest();
    // xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            console.log(xhr.responseText); // 'This is the returned text.'
          } else {
            console.log('Error: ' + xhr.status); // An error occurred during the request.
          }
        }
    };
 
    xhr.open(method, url);
    if(method == 'GET')
        xhr.send(null);
    else 
        xhr.send(JSON.stringify(payload));
}

function createSpeechBubble(context,x, y, width, height, arrowPos,direction='bottom',quote){
    var bubbleWidth = width;
    var bubbleHeight = height;
    var bubblePadding = 10;
    var arrowHeight = bubbleHeight / 3;

    var bubble = context.add.graphics({ x: x, y: y });
    //  Bubble shadow
    bubble.fillStyle(0x222222, 0.5);
    bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    //  Bubble color
    bubble.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    bubble.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    var point1X = Math.floor(bubbleWidth / 7);
    var point1Y = bubbleHeight;
    var point2X = Math.floor((bubbleWidth / 7) * 2);
    var point2Y = bubbleHeight;
    var point3X = Math.floor(bubbleWidth / 7);
    var point3Y = Math.floor(bubbleHeight + arrowHeight);
    //  Calculate arrow coordinates
    switch(direction)
    {
        case 'bottom':
            if(arrowPos == 'left'){
                point1X = Math.floor(bubbleWidth / 7);
                point1Y = bubbleHeight;
                point2X = Math.floor((bubbleWidth / 7) * 2);
                point2Y = bubbleHeight;
                point3X = Math.floor(bubbleWidth / 7);
                point3Y = Math.floor(bubbleHeight + arrowHeight);
            }else if(arrowPos == 'center'){
                point1X = Math.floor(bubbleWidth / 2) - Math.floor(bubbleWidth / 8);
                point1Y = bubbleHeight;
                point2X = Math.floor(bubbleWidth / 2) + Math.floor(bubbleWidth / 8);
                point2Y = bubbleHeight;
                point3X = Math.floor(bubbleWidth / 2);
                point3Y = Math.floor(bubbleHeight + arrowHeight);
            }else if(arrowPos == 'right'){
                point1X = bubbleWidth - Math.floor(bubbleWidth / 7) ;
                point1Y = bubbleHeight;
                point2X = bubbleWidth - Math.floor((bubbleWidth / 7) *2);
                point2Y = bubbleHeight;
                point3X = bubbleWidth - Math.floor(bubbleWidth / 7) ;
                point3Y = Math.floor(bubbleHeight + arrowHeight);
            }
        break;
        case 'top':
            if(arrowPos == 'left'){
                point1X = Math.floor(bubbleWidth / 7);
                point1Y = 0;
                point2X = Math.floor((bubbleWidth / 7) * 2);
                point2Y = 0;
                point3X = Math.floor(bubbleWidth / 7);
                point3Y = 0 - arrowHeight;
            }else if(arrowPos == 'center'){
                point1X = Math.floor(bubbleWidth / 2) - Math.floor(bubbleWidth / 8);
                point1Y = 0;
                point2X = Math.floor(bubbleWidth / 2) + Math.floor(bubbleWidth / 8);
                point2Y = 0;
                point3X = Math.floor(bubbleWidth / 2);
                point3Y = 0 - arrowHeight;
            }else if(arrowPos == 'right'){
                point1X = bubbleWidth - Math.floor(bubbleWidth / 7) ;
                point1Y = 0;
                point2X = bubbleWidth - Math.floor((bubbleWidth / 7) *2);
                point2Y = 0;
                point3X = bubbleWidth - Math.floor(bubbleWidth / 7) ;
                point3Y = 0 - arrowHeight;
            }
            break;
    }
    
    //  Bubble arrow shadow
    bubble.lineStyle(4, 0x222222, 0.5);
    bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

    //  Bubble arrow fill
    bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    bubble.lineStyle(2, 0x565656, 1);
    bubble.lineBetween(point2X, point2Y, point3X, point3Y);
    bubble.lineBetween(point1X, point1Y, point3X, point3Y);
    bubble.setScrollFactor(0);

    var content = context.add.text(0, 0, quote, { fontFamily: 'Arial', fontSize: 20, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });
    var b = content.getBounds();
    content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));
    content.setScrollFactor(0);
    return [bubble,content];
}

function textPopup(str,closeCallback,okCallback,context){
    context.popupContainer = context.add.container(WIDTH/2, HEIGHT/2).setScrollFactor(0);
    
    var popup = context.add.image(0,0,'popupBG')
                    .setScale(0.6,0.8);
    var popup1 = context.add.image(0,0,'popupBG0')
                    .setScale(0.6,0.8);
    var feature = context.make.text({
        x: 0,
        y: 0,
        text: str,
        origin: { x: 0.5, y: 0.5 },
        style: {
            font: 'bold 45px Arial',
            fill: 'green',
            align: 'center',
            wordWrap: { width: 500 }
        }
    });
    // var b = feature.getBounds();
    var popupClose = context.add.image(350,-350,'btn_close').setScrollFactor(0)
                    .setScale(0.5)
                    .setInteractive()
                    .on('click',closeCallback,context);
    var popupOk = context.add.image(0,200,'btn_ok')
                    .setScale(0.5)
                    .setInteractive().setScrollFactor(0)
                    .on('click',okCallback,context);

    
    context.popupContainer.add(popup);
    context.popupContainer.add(popup1);
    context.popupContainer.add(feature);
    context.popupContainer.add(popupClose);
    context.popupContainer.add(popupOk);

    context.tweens.add({
        targets     : [ context.popupContainer ],
        scaleX: 1.2,
        scaleY: 1.2,
        ease        : 'Elastic',
        duration    : 3000,
        yoyo        : false,
        repeat      : 0,
        callbackScope   : context
        });

    return context.popupContainer;
}   

function imgPopup(img,closeCallback,okCallback,context){
    context.popupContainer = context.add.container(WIDTH/2, HEIGHT/2).setScrollfactor(0);
    
    var popup = context.add.image(0,0,'popupBG')
                    .setScale(0.6,0.8);
    var popup1 = context.add.image(0,0,'popupBG0')
                    .setScale(0.6,0.8);
    var feature = context.add.image(0,100,img)
                    .setScale(0.6)
                    .setOrigin(0.5,1);
    var popupClose = context.add.image(350,-350,'btn_close')
                    .setScale(0.5)
                    .setInteractive().setScrollFactor(0)
                    .on('click',closeCallback,context);
    var popupOk = context.add.image(0,200,'btn_ok')
                    .setScale(0.5)
                    .setInteractive().setScrollFactor(0)
                    .on('click',okCallback,context);

    
    context.popupContainer.add(popup);
    context.popupContainer.add(popup1);
    context.popupContainer.add(feature);
    context.popupContainer.add(popupClose);
    context.popupContainer.add(popupOk);

    context.tweens.add({
        targets     : [ context.popupContainer ],
        scaleX: 1.2,
        scaleY: 1.2,
        ease        : 'Elastic',
        duration    : 3000,
        yoyo        : false,
        repeat      : 0,
        callbackScope   : context
        });

    return context.popupContainer;
}  

function imgTextPopup(img,str,closeCallback,okCallback,context){
    context.popupContainer = context.add.container(WIDTH/2, HEIGHT/2);
    
    var popup = context.add.image(0,0,'popupBG')
                    .setScale(0.6,0.8);
    var popup1 = context.add.image(0,0,'popupBG0')
                    .setScale(0.6,0.8);
    var feature = context.add.image(0,100,img)
                    .setScale(0.6)
                    .setOrigin(0.5,1);
    var featureText = context.make.text({
        x: 0,
        y: 0,
        text: str,
        origin: { x: 0.5, y: 0.5 },
        style: {
            font: 'bold 35px Arial',
            fill: 'green',
            align: 'center',
            wordWrap: { width: 500 }
        }
    });
    var popupClose = context.add.image(350,-350,'btn_close')
                    .setScale(0.5)
                    .setInteractive()
                    .on('click',closeCallback,context);
    var popupOk = context.add.image(0,200,'btn_ok')
                    .setScale(0.5)
                    .setInteractive()
                    .on('click',okCallback,context);

    
    context.popupContainer.add(popup);
    context.popupContainer.add(popup1);
    context.popupContainer.add(feature);
    context.popupContainer.add(popupClose);
    context.popupContainer.add(popupOk);

    context.tweens.add({
        targets     : [ context.popupContainer ],
        scaleX: 1.2,
        scaleY: 1.2,
        ease        : 'Elastic',
        duration    : 3000,
        yoyo        : false,
        repeat      : 0,
        callbackScope   : context
        });

    return context.popupContainer;
}  


function temp(){
    var url ="http://127.0.0.1:5500/phaser/public/assets/animations/gems.json";
//   fetch(url, {
//     method:"GET",
//     // body: JSON.stringify({
//     //     name: "Deska",
//     //     email: "deska@gmail.com",
//     //     phone: "342234553"
//     //     })
//     })
//     .then(result => {
//         // do something with the result
//         console.log("Completed with result:", result);
//     });

    fetch(url,{method:"GET"})
    // .then(result => {
    //     let json =  result.json();
    //     console.log(json);
    //     console.log(result.text());
    // })
    .then(response => response.json())
    .then(result => console.log(JSON.stringify(result)))
}