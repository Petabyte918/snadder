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