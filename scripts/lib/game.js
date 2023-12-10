function Vector2(x,y){
    var vec = {
        x: x,
        y: y
    }

    vec.distanceTo = function(vector){
        return distanceToXY(vec.x, vec.y ,vector.x, vector.y);
    }

    vec.offsetXY = function (x_,y_){
        vec.x += x_;
        vec.y += y_;
        return vec;
    }

    vec.offsetVec = function(vector){
        vec.x += vector.x;
        vec.y += vector.y;
        return vec;
    }

    vec.lerp = function(vector,amt){
        vec.x = lerp(vec.x, vector.x, amt);
        vec.y = lerp(vec.y, vector.y, amt);
        return vec;
    }

    return vec;
}

function Area2(vec1, vec2){
    var area = {
        startVec: vec1,
        endVec: vec2
    }

    area.getCenter = function(){
        return Vector2(
            area.startVec.x + area.getWidth()/2,
            area.startVec.y + area.getHeight()/2
        )
    }

    area.getWidth = function(){
        return Math.abs(area.startVec.x - area.endVec.x);
    }

    area.getHeight = function(){
        return Math.abs(area.startVec.y - area.endVec.y);
    }

    area.getField = function(){
        return area.getWidth() * area.getHeight();
    }

    area.getTopLeft = function(){
        return area.startVec;
    }

    area.getBottomRight = function(){
        return area.endVec;
    }

    area.getTopRight = function(){
        return Vector2(area.getWidth()+area.startVec.x, area.startVec.y);
    }

    area.getBottomLeft = function(){
        return Vector2(area.startVec.x, area.getHeight()+area.startVec.y);
    }

    area.isTouching = function(anotherArea){
        return isTouching(
            area.startVec.x,area.startVec.y,area.getWidth(),area.getHeight(),
            anotherArea.startVec.x,anotherArea.startVec.y,anotherArea.getWidth(),anotherArea.getHeight()
        )
    }

    return area
}

function isTouching(x1, y1, w1, h1, x2, y2, w2, h2) {
    const left1 = x1;
    const right1 = x1 + w1;
    const top1 = y1;
    const bottom1 = y1 + h1;

    const left2 = x2;
    const right2 = x2 + w2;
    const top2 = y2;
    const bottom2 = y2 + h2;

    return !(left1 > right2 || right1 < left2 || top1 > bottom2 || bottom1 < top2);
}

function distanceToXY(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}