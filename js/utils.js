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
        }
    }
    return answers;
}

function checkOptAnswers(qid,answers){
    let questions = window.gameDescriptor.questions;
    let isMatched = false;
    for(question of questions){
        if(question.qid = qid){
            isMatched = arrayEquals(answers,question.answers);
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