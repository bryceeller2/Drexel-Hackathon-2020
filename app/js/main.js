var SwipeFrontElement
var rafPending=false;
var currentXPosition = 0;
var currentYPosition = 0;

function getGesturePointFromEvent(evt) {
    var point = {};

    if(evt.targetTouches) {
      // Prefer Touch Events
      point.x = evt.targetTouches[0].clientX;
      point.y = evt.targetTouches[0].clientY;
    } else {
      // Either Mouse event or Pointer Event
      point.x = evt.clientX;
      point.y = evt.clientY;
    }

    return point;
  }

function onAnimFrame() {
  if(!rafPending) {
    return;
  }

  var differenceInX = initialTouchPos.x - lastTouchPos.x;
  var differenceInY = initialTouchPos.y - lastTouchPos.y;

  var newXTransform = (currentXPosition - differenceInX)+'px';
  var newYTransform = (currentYPosition - differenceInY)+'px';
  
  var transformStyle = 'translateX('+newXTransform+')';
  swipeFrontElement.style.webkitTransform = transformStyle;
  swipeFrontElement.style.MozTransform = transformStyle;
  swipeFrontElement.style.msTransform = transformStyle;
  swipeFrontElement.style.transform = transformStyle;
  transformStyle = 'translateY('+newYTransform+')';
  swipeFrontElement.style.webkitTransform += transformStyle;
  swipeFrontElement.style.MozTransform += transformStyle;
  swipeFrontElement.style.msTransform += transformStyle;
  swipeFrontElement.style.transform += transformStyle;


  rafPending = false;
}

// Handle the start of gestures
  this.handleGestureStart = function(evt) {
    evt.preventDefault();
    html.getElementById("touch_neel").innerHTML = "You touched Neel";

    if(evt.touches && evt.touches.length > 1) {
      return;
    }

    // Add the move and end listeners
    if (window.PointerEvent) {
      evt.target.setPointerCapture(evt.pointerId);
    } else {
      // Add Mouse Listeners
      document.addEventListener('mousemove', this.handleGestureMove, true);
      document.addEventListener('mouseup', this.handleGestureEnd, true);
    }

    initialTouchPos = getGesturePointFromEvent(evt);

    swipeFrontElement.style.transition = 'initial';
  }.bind(this);

  // Handle end gestures
  this.handleGestureEnd = function(evt) {
    evt.preventDefault();
    console.log("you are no longer touching neel")

    endTouchPos = getGesturePointFromEvent(evt);
    
    currentXPosition += endTouchPos.x-initialTouchPos.x
    currentYPosition += endTouchPos.y-initialTouchPos.y



    if(evt.touches && evt.touches.length > 0) {
      return;
    }



    rafPending = false;

    // Remove Event Listeners
    if (window.PointerEvent) {
      evt.target.releasePointerCapture(evt.pointerId);
    } else {
      // Remove Mouse Listeners
      document.removeEventListener('mousemove', this.handleGestureMove, true);
      document.removeEventListener('mouseup', this.handleGestureEnd, true);
    }

    //updateSwipeRestPosition();

    initialTouchPos = null;
  }.bind(this);
 
this.handleGestureMove = function (evt) {
  evt.preventDefault();
  html.getElementById("touch_neel").innerHTML = "You are rubbing neel";

  if(!initialTouchPos) {
    return;
  }

  lastTouchPos = getGesturePointFromEvent(evt);

  if(rafPending) {
    return;
  }

  rafPending = true;

  window.requestAnimationFrame(onAnimFrame);
  }.bind(this);


window.onload = function() {
   console.log("test");
  swipeFrontElement=document.getElementById("picture");
  console.log(swipeFrontElement.src);
  if (window.PointerEvent) {
    // Add Pointer Event Listener
    swipeFrontElement.addEventListener('pointerdown', this.handleGestureStart, true);
    swipeFrontElement.addEventListener('pointermove', this.handleGestureMove, true);
    swipeFrontElement.addEventListener('pointerup', this.handleGestureEnd, true);
    swipeFrontElement.addEventListener('pointercancel', this.handleGestureEnd, true);
    console.log("POINTER EVENT ADDED")

  } else {
    // Add Touch Listener
    swipeFrontElement.addEventListener('touchstart', this.handleGestureStart, true);
    swipeFrontElement.addEventListener('touchmove', this.handleGestureMove, true);
    swipeFrontElement.addEventListener('touchend', this.handleGestureEnd, true);
    swipeFrontElement.addEventListener('touchcancel', this.handleGestureEnd, true);
    console.log("TOUCH EVENTS ADDED")

    // Add Mouse Listener
    swipeFrontElement.addEventListener('mousedown', this.handleGestureStart, true);
    console.log("MOUSE LISTENER ADDED")

  }
}
  
