
/////// Classes ///////
// Please note that the 3DS browser does not support the actual JavaScript classes. Using 'class' will result in a reserved keyword error.

/**
 * Creates a 2 dimensional vector from the given XY values
 * @param {Number} x Horizontal position of the Vector
 * @param {Number} y Vertical position of the Vector
 * @return {Object}
 */
function Vector2(x,y){
    var vec = {
        x: x,
        y: y
    }

    /**
     * Calculates distance to another Vector2
     * @param {Object} vector The another vector
     * @return {Object}
     */
    vec.distanceTo = function(vector){
        return distanceToXY(vec.x, vec.y ,vector.x, vector.y);
    }

    /**
     * Offsets the vector by X and Y values
     * @param {Number} x_ Horizontal offset
     * @param {Number} y_ Vertical offset
     * @return {Object}
     */
    vec.offsetXY = function (x_,y_){
        vec.x += x_;
        vec.y += y_;
        return vec;
    }

    /**
     * Offsets the vector by another Vector2
     * @param {Object} vector The another vector
     * @return {Object}
     */
    vec.offsetVec = function(vector){
        vec.x += vector.x;
        vec.y += vector.y;
        return vec;
    }

    /**
     * Returns a copy of this vector offset by X and Y values
     * @param {Number} x_ Horizontal offset
     * @param {Number} y_ Vertical offset
     * @return {Object}
     */
    vec.getOffsetXY = function (x_,y_){
        return Vector2(vec.x+x_,vec.y+y_);
    }

    /**
     * Returns a copy of this vector offset by another vector
     * @param {Object} vector The another vector
     * @return {Object}
     */
    vec.getOffsetVec = function (vector){
        return Vector2(vec.x+vector.x,vec.y+vector.y);
    }

    /**
     * Rotates the vector
     * @param {Number} degrees Rotation in degrees
     * @return {Object}
     */
    vec.rotate = function(degrees){
        const rad = deg2rad(degrees);
        vec.x = vec.x * Math.cos(rad) - vec.y * Math.sin(rad);
        vec.y = vec.x * Math.sin(rad) + vec.y * Math.cos(rad);

        return vec;
    }

    /**
     * Returns a rotated copy of the vector
     * @param {Number} degrees Rotation in degrees
     * @return {Object}
     */
    vec.getRotated = function(degrees){
        return vec.copy().rotate(degrees);
    }

    /**
     * Performs a linear interpolation
     * @param {Object} vector The target Vector2
     * @param {Number} weight Speed of the interpolation
     * @return {Object}
     */
    vec.lerp = function(vector, weight){
        vec.x = lerp(vec.x, vector.x, weight);
        vec.y = lerp(vec.y, vector.y, weight);
        return vec;
    }

    /**
     * Returns a linearly interpolated copy of this vector
     * @param {Object} vector The target Vector2
     * @param {Number} weight Speed of the interpolation
     * @return {Object}
     */
    vec.getLerped = function(vector, weight){
        return Vector2(
            lerp(vec.x,vector.x,weight),
            lerp(vec.y,vector.y,weight)
        )
    }

    /**
     * Calculates an angle in degrees to the target point at X and Y values
     * @param {Number} x_ Horizontal position
     * @param {Number} y_ Vertical position
     * @return {Object}
     */
    vec.getRotationToXY = function(x_, y_){
        const deltaX = x_ - vec.x;
        const deltaY = y_ - vec.y;
        return rad2deg( Math.atan2(deltaY, deltaX) );
    }

    /**
     * Calculates an angle in degrees to the target Vector2
     * @param {Object} vector The target Vector2
     * @return {Object}
     */
    vec.getRotationToVec = function(vector){
        return vec.getRotationToXY(vector.x, vector.y);
    }

    /**
     * Moves the vector toward the target point at X and Y values
     * @param {Number} x_ Horizontal position
     * @param {Number} y_ Vertical position
     * @param {Number} amt Speed of the movement
     * @return {Object}
     */
    vec.moveTowardXY = function(x_, y_, amt){
        const angle = Math.atan2(y_ - vec.y, x_ - vec.x);
        vec.x += Math.cos(angle) * amt;
        vec.y += Math.sin(angle) * amt;
        return vec;
    };

    /**
     * Moves the vector toward the target vector
     * @param {Object} vector The target vector
     * @param {Number} amt Speed of the movement
     * @return {Object}
     */
    vec.moveTowardVec = function(vector, amt){
        vec.moveTowardXY(vector.x, vector.y, amt);
        return vec;
    }

    /**
     * Returns an independent copy of this vector
     * @return {Object}
     */
    vec.copy = function(){
        return Vector2(vec.x, vec.y);
    }

    return vec;
}

/**
 * Creates a 2 dimensional area from 2 Vectors
 * @param {Object} vec1 Starting point of the area
 * @param {Object} vec2 Ending point of the area
 * @return {Object}
 */
function Area2D(vec1, vec2){
    var area = {
        startVec: vec1,
        endVec: vec2
    }

    /**
     * Returns the center Vector2 of the area
     * @return {Object}
     */
    area.getCenter = function(){
        return Vector2(
            area.startVec.x + area.getWidth()/2,
            area.startVec.y + area.getHeight()/2
        )
    }

    /**
     * Returns the area's width
     * @return {Number}
     */
    area.getWidth = function(){
        return Math.abs(area.startVec.x - area.endVec.x);
    }

    /**
     * Returns the area's height
     * @return {Number}
     */
    area.getHeight = function(){
        return Math.abs(area.startVec.y - area.endVec.y);
    }

    /**
     * Returns the area's field
     * @return {Number}
     */
    area.getField = function(){
        return area.getWidth() * area.getHeight();
    }

    /**
     * Returns the area's top left Vector2
     * @return {Object}
     */
    area.getTopLeft = function(){
        return area.startVec;
    }

    /**
     * Returns the area's bottom right Vector2
     * @return {Object}
     */
    area.getBottomRight = function(){
        return area.endVec;
    }

    /**
     * Returns the area's top right Vector2
     * @return {Object}
     */
    area.getTopRight = function(){
        return Vector2(area.getWidth()+area.startVec.x, area.startVec.y);
    }

    /**
     * Returns the area's bottom left Vector2
     * @return {Object}
     */
    area.getBottomLeft = function(){
        return Vector2(area.startVec.x, area.getHeight()+area.startVec.y);
    }

    /**
     * Rescales the area
     * @return {Object}
     */
    area.rescale = function(scale){
        const w = area.getWidth() * scale;
        const h = area.getHeight() * scale;
        const deltaW = w - area.getWidth();
        const deltaH = h - area.getHeight();
        area.startVec.x -= deltaW / 2;
        area.startVec.y -= deltaH / 2;
        area.endVec.x += deltaW / 2;
        area.endVec.y += deltaH / 2;

        return area;
    }

    /**
     * Returns a rescaled copy of this area
     * @return {Object}
     */
    area.getRescaled = function(scale){
        const ar = Area2D(area.startVec,area.endVec);
        ar.rescale(scale);
        return ar;
    }

    /**
     * Checks if the area is touching another Area2D
     * @param anotherArea The another Area2D
     * @return {Boolean}
     */
    area.isTouching = function(anotherArea){
        return isTouching(
            area.startVec.x,area.startVec.y,area.getWidth(),area.getHeight(),
            anotherArea.startVec.x,anotherArea.startVec.y,anotherArea.getWidth(),anotherArea.getHeight()
        )
    }

    /**
     * Offsets the area by X and Y values
     * @param {Number} x Horizontal offset
     * @param {Number} y Vertical offset
     * @return {Object}
     */
    area.offsetXY = function(x,y){
        area.startVec.offsetXY(x,y);
        area.endVec.offsetXY(x,y);
        return area;
    }

    /**
     * Offsets the area by a Vector2
     * @param {Object} vector The offset Vector2
     * @return {Object}
     */
    area.offsetVec = function(vector){
        return area.offsetXY(vector.x,vector.y)
    }

    /**
     * Moves the area to a new position
     * @param {Object} vector The target Vector2
     * @return {Object}
     */
    area.moveTo = function(vector){
        const initW = area.getWidth();
        const initH = area.getHeight();

        area.startVec = vector;
        area.endVec = vector.getOffsetXY(initW,initH);
    }

    /**
     * Renders a test rectangle on a canvas to test the area
     * @param {HTMLCanvasElement} canvas The <canvas> element
     */
    area.renderDebug = function(canvas){
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "red";
        ctx.fillRect(area.startVec.x,area.startVec.y,area.getWidth(),area.getHeight());
        ctx.fillStyle = "blue";
        const w = 4;
        ctx.fillRect(area.getTopLeft().x,area.getTopLeft().y,w,w)
        ctx.fillRect(area.getTopRight().x-w,area.getTopRight().y,w,w)
        ctx.fillRect(area.getBottomLeft().x,area.getBottomLeft().y-w,w,w)
        ctx.fillRect(area.getBottomRight().x-w,area.getBottomRight().y-w,w,w)


        ctx.fillStyle = "";
    }

    /**
     * Returns an independent copy of this area
     * @return {Object}
     */
    area.copy = function(){
        return Area2D(area.startVec.copy(), area.endVec.copy());
    }

    return area
}

/**
 * Creates an extended version of Area2D with rendering capabilities
 * @param {Object} pos Position vector of the rectangle
 * @param {number} w Width
 * @param {number} h Height
 * @return {Object}
 */
function Rect2D(pos, w, h){
    var rect = {
        area: Area2D(pos, Vector2(pos.x+w, pos.y+h)),
        rotation: 0,
        fillStyle: "black",
        outlineStyle: "gray",
        outlineSize: 0,
        opacity: 1,
        fillOpacity : 1,
        outlineOpacity: 1
    }

    /**
     * Returns the X position of the rect
     * @return {Number}
     */
    rect.getX = function (){
        return rect.area.startVec.x;
    }

    /**
     * Returns the Y position of the rect
     * @return {Number}
     */
    rect.getY = function(){
        return rect.area.startVec.y;
    }

    /**
     * Returns the center Vector2 of the rect
     * @return {Object}
     */
    rect.getCenter = function(){
        return rect.area.getCenter();
    }

    /**
     * Offsets the rect by X and Y values
     * @param {Number} x_ Horizontal offset
     * @param {Number} y_ Vertical offset
     */
    rect.moveXY = function(x_,y_){
        rect.area.offsetXY(x_,y_);
    }

    /**
     * Offsets the rect by a Vector2
     * @param {Object} vector The offset Vector2
     * @return {Object}
     */
    rect.moveVec = function(vector){
        return rect.moveXY(vector.x, vector.y);
    }

    /**
     * Offsets the rect by X and Y values respecting the rotation
     * @param {Number} x_ Horizontal offset
     * @param {Number} y_ Vertical offset
     */
    rect.moveLocalXY = function(x_, y_){
        const angle = deg2rad(rect.rotation);
        const localX = x_ * Math.cos(angle) - y_ * Math.sin(angle);
        const localY = x_ * Math.sin(angle) + y_ * Math.cos(angle);
        return rect.moveXY(localX, localY);
    }

    /**
     * Offsets the rect by a Vector2 respecting the rotation
     * @param {Object} vector The offset Vector2
     * @return {Object}
     */
    rect.moveLocalVec = function(vector){
        return rect.moveLocalXY(vector.x, vector.y);
    }

    /**
     * Renders the rect on a canvas
     * @param {HTMLCanvasElement} canvas The <canvas> element
     */
    rect.render = function(canvas) {
        const ctx = canvas.getContext("2d");

        ctx.save();

        ctx.translate(rect.getX() + rect.area.getWidth() / 2, rect.getY() + rect.area.getHeight() / 2);
        ctx.rotate(deg2rad(rect.rotation));

        if(rect.outlineSize > 0){
            ctx.fillStyle = rect.outlineStyle;
            const s  = rect.outlineSize;
            ctx.globalAlpha = rect.outlineOpacity * rect.opacity;
            ctx.fillRect(-(rect.area.getWidth() / 2)-s, -(rect.area.getHeight() / 2)-s, rect.area.getWidth()+s*2, rect.area.getHeight()+s*2);
            ctx.globalAlpha = 1;
            ctx.clearRect(-(rect.area.getWidth() / 2), -(rect.area.getHeight() / 2), rect.area.getWidth(), rect.area.getHeight());
        }

        ctx.fillStyle = rect.fillStyle;
        if(rect.fillStyle !== "" && rect.fillStyle !== "none"){
            ctx.globalAlpha = rect.fillOpacity * rect.opacity;
            ctx.fillRect(-(rect.area.getWidth() / 2), -(rect.area.getHeight() / 2), rect.area.getWidth(), rect.area.getHeight());
        }


        ctx.globalAlpha = 1;
        ctx.fillStyle = "";
        ctx.restore();
    }

    /**
     * Returns an independent copy of the rect
     * @return {Object}
     */
    rect.copy = function(){
        const newRect = Rect2D(rect.area.getTopLeft().copy(), rect.area.getWidth(), rect.area.getHeight());
        newRect.fillStyle = rect.fillStyle;
        newRect.fillOpacity = rect.fillOpacity;
        newRect.outlineSize = rect.outlineSize;
        newRect.outlineOpacity = rect.outlineOpacity;
        newRect.opacity = rect.opacity;
        newRect.rotation = rect.rotation;

        return newRect
    }

    return rect;
}

/**
 * Creates a 2D image renderable on a canvas
 * @param {HTMLImageElement} image <img> element
 * @param {number} [x=0] Horizontal position of the sprite
 * @param {number} [y=0] Vertical position of the sprite
 * @param {number} [rot=0] Rotation in degrees of the sprite
 * @param {number} [w=auto] Sprite width
 * @param {number} [h=auto] Sprite height
 * @return {Object}
 */
function Sprite(image,x,y,rot,w,h){
    if(!x) x = 0;
    if(!y) y = 0;
    if(!rot) rot = 0;
    if(!w) w = image.clientWidth;
    if(!h) h = image.clientHeight;

    var tmpVec = Vector2(x,y)
    var spr = {
        area: Area2D(Vector2(x,y),tmpVec.getOffsetXY(w,h)),
        image: image,
        lastCanvas: null,
        visible: true,
        rotation: rot,
        restrictMovement: false,
        opacity: 1
    }

    /**
     * Returns the X position of the sprite
     * @return {Number}
     */
    spr.getX = function (){
        return spr.area.startVec.x;
    }

    /**
     * Returns the Y position of the sprite
     * @return {Number}
     */
    spr.getY = function(){
        return spr.area.startVec.y;
    }

    /**
     * Returns the center Vector2 of the sprite
     * @return {Object}
     */
    spr.getCenter = function(){
        return spr.area.getCenter();
    }

    /**
     * Offsets the sprite by X and Y values
     * @param {Number} x_ Horizontal offset
     * @param {Number} y_ Vertical offset
     */
    spr.moveXY = function(x_,y_){
        if(spr.lastCanvas && spr.restrictMovement){
            if(spr.getX()+x_ < 0 || spr.getX()+x_ >= spr.lastCanvas.width-spr.area.getWidth()) return;
            if(spr.getY()+y_ < 0 || spr.getY()+y_ >= spr.lastCanvas.height-spr.area.getHeight()) return;
        }
        spr.area.offsetXY(x_,y_);
    }

    /**
     * Offsets the sprite by a Vector2
     * @param {Object} vector The offset Vector2
     * @return {Object}
     */
    spr.moveVec = function(vector){
        return spr.moveXY(vector.x, vector.y);
    }

    /**
     * Offsets the sprite by X and Y values respecting the rotation
     * @param {Number} x_ Horizontal offset
     * @param {Number} y_ Vertical offset
     */
    spr.moveLocalXY = function(x_, y_){
        const angle = deg2rad(spr.rotation);
        const localX = x_ * Math.cos(angle) - y_ * Math.sin(angle);
        const localY = x_ * Math.sin(angle) + y_ * Math.cos(angle);
        return spr.moveXY(localX, localY);
    }

    /**
     * Offsets the sprite by a Vector2 respecting the rotation
     * @param {Object} vector The offset Vector2
     * @return {Object}
     */
    spr.moveLocalVec = function(vector){
        return spr.moveLocalXY(vector.x, vector.y);
    }

    /**
     * Scales the sprite to another size
     * @param {Number} scale Scale amount
     */
    spr.rescale = function(scale){
        spr.area.rescale(scale);
        return spr;
    }

    /**
     * Moves the vector toward the target point at X and Y values
     * @param {Number} x_ Horizontal position
     * @param {Number} y_ Vertical position
     * @return {Object}
     */
    spr.rotateTowardsXY = function(x_, y_) {
        const deltaX = x_ - spr.getX();
        const deltaY = y_ - spr.getY();
        spr.rotation = rad2deg( Math.atan2(deltaY, deltaX) );
        return spr;
    }

    /**
     * Moves the vector toward the target vector
     * @param {Number} vector The target vector
     * @return {Object}
     */
    spr.rotateTowardsVec = function(vector){
        return spr.rotateTowardsXY(vector.x,vector.y);
    }

    /**
     * Moves Renders the sprite on a canvas
     * @param {HTMLCanvasElement} canvas The <canvas> element
     */
    spr.render = function(canvas){
        spr.lastCanvas = canvas;
        if(!spr.visible) return;
        const ctx = canvas.getContext("2d");
        ctx.save();

        ctx.translate(spr.getX() + spr.area.getWidth() / 2, spr.getY() + spr.area.getHeight() / 2);
        ctx.rotate(deg2rad(spr.rotation));

        ctx.globalAlpha = spr.opacity;
        ctx.drawImage(spr.image, -spr.area.getWidth() / 2, -spr.area.getHeight() / 2, spr.area.getWidth(), spr.area.getHeight());
        ctx.globalAlpha = 1;

        ctx.restore();
    }

    return spr;
}

//// Global functions ////

/**
 * Draws a dashed line across 2 points
 * @param {HTMLCanvasElement} canvas <canvas> element
 * @param {Object} startVec Starting point of the line
 * @param {Object} endVec Ending point of the line
 * @param {Number} width Width of the line
 * @param {Number} spacing Space between the dashes
 * @param {String} color Color of the line
 * @return {Object}
 */
function drawDashedLine(canvas, startVec, endVec, width, spacing, color){
    const ctx = canvas.getContext("2d");
    const prevW = ctx.lineWidth;
    const deltaX = endVec.x - startVec.x;
    const deltaY = endVec.y - startVec.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const dashCount = Math.floor(distance / spacing);
    const dashX = deltaX / dashCount;
    const dashY = deltaY / dashCount;

    ctx.strokeStyle = color;
    ctx.lineWidth = width;

    ctx.beginPath();

    for (var i=0; i<dashCount; i++) {
        if (i % 2 === 0) {
            ctx.moveTo(startVec.x + i * dashX, startVec.y + i * dashY);
        } else {
            ctx.lineTo(startVec.x + i * dashX, startVec.y + i * dashY);
        }
    }

    ctx.stroke();
    ctx.lineWidth = prevW;
    ctx.strokeStyle = "";
}


/**
 * Clears a canvas
 * @param {HTMLCanvasElement} canvas The <canvas> to clear
 */
function clearCanvas(canvas){
    canvas.getContext("2d").clearRect(0, 0, canvas.width*2, canvas.height*2);
}

/**
 * Performs a linear interpolation between 2 angles in degrees
 * @param {Number} startDeg Current angle
 * @param {Number} endDeg Target angle
 * @param {Number} speed Speed of the interpolation
 * @return {Number}
 */
function lerpAngle(startDeg, endDeg, speed) {
    startDeg = deg2rad(startDeg);
    endDeg = deg2rad(endDeg);

    const TAU = Math.PI * 2;
    const diff = fmod(endDeg - startDeg, TAU);
    const shortest = fmod(2 * diff, TAU) - diff;
    return rad2deg(startDeg + shortest * speed);
}

/**
 * Checks if objects are touching based on their positions and sizes
 * @param {number} x1 Horizontal position of the 1st object
 * @param {number} y1 Vertical position of the 1st object
 * @param {number} w1 Width of the 1st object
 * @param {number} h1 Height of the 1st object
 * @param {number} x2 Horizontal position of the 2nd object
 * @param {number} y2 Vertical position of the 2nd object
 * @param {number} w2 Width of the 2nd object
 * @param {number} h2 Height of the 2nd object
 * @return {Boolean}
 */
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

/**
 * Calculates the distance between 2 points
 * @param {number} x1 Horizontal position of the 1st point
 * @param {number} y1 Vertical position of the 1st point
 * @param {number} x2 Horizontal position of the 2nd point
 * @param {number} y2 Vertical position of the 2nd point
 * @return {Object}
 */
function distanceToXY(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

/**
 * Converts degrees to radians
 * @param {number} degrees Angle in degrees
 * @return {number}
 */
function deg2rad(degrees){
    return degrees*Math.PI/180;
}

/**
 * Converts radians to degrees
 * @param {number} radians Angle in radians
 * @return {number}
 */
function rad2deg(radians){
    return radians*180/Math.PI;
}