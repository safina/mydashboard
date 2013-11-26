var canvas = new fabric.Canvas('c');

// coordinate and angle variables
var x = 300;
var y = 300;
var oldx = x;
var oldy = y;
var angle = 0;

// create a triangle object
var triangle = new fabric.Triangle({
  left: x,
  top: y,
  stroke:'rgba(75, 0, 130,1)',
  strokeWidth: 2,
  fill:'',
  width: 45,
  height: 30,
  angle: angle
});

// draw line function
function makeLine(coords) {
    return new fabric.Line(coords, {
      fill: 'black',
      stroke: 'black',
      strokeWidth: 2,
      selectable: false,
      hasRotatingPoint:true,
      strokeLineCap: 'round'});}

// triangle and canvas unselectable
triangle.selectable = canvas.selection = false ;
 
// create first line
var line = makeLine([ 300, 300, 300 , 315 ]);

// add triangle and line onto canvas
canvas.add(triangle);
canvas.add(line);

// listen if reset button is pressed
document.getElementById("reset").onclick = function () { canvas.clear();x=300;y=300;angle=0; var line = makeLine([ 300, 300, 300 , 315 ]); canvas.add(line); canvas.add(triangle.set({top:300,left:300,angle:angle})); };

// listen to keys pressed
document.addEventListener('keydown', function(e){
    oldx = x;
    oldy = y;
    // up arrow pressed
    if ((e.keyCode == 38)) 
    {
    	// check if triangle is near the borders of the canvas
    	if (y<10)
    	{
    	y = y+4;
    	}
    	if (x<10)
    	{
    	x = x+4;
    	}
    	if(x>590)
    	{
    	x = x -4;
    	}
    	if(y>590)
    	{
    	y = y-4;
    	}
    	
    	// if turtle is in first quadrant
        if ((angle<90)&&(angle>=0))
        {
       		y = y - Math.abs((Math.cos((angle*Math.PI)/180)*3));
        	x = x + Math.abs((Math.sin((angle*Math.PI)/180)*3));
        }
        // if turtle is in second quadrant 
        else if ((angle>=90)&&(angle<=180))
        {
         	y = y + Math.abs((Math.sin(((angle-90)*Math.PI)/180)*3));
        	x = x + Math.abs((Math.cos(((angle-90)*Math.PI)/180)*3));
        }
        // if turtle is in third quadrant
        else if (((angle<=270)&&(angle>180)))
        {
       		y = y + Math.abs((Math.sin(((270-angle)*Math.PI)/180)*3));
       		x = x - Math.abs((Math.cos(((angle-90)*Math.PI)/180)*3));
        }
        // if turtle is in fourth quadrant
        else if (((angle<360)&&(angle>270)))
        {
       		y = y - Math.abs((Math.cos(((360-angle)*Math.PI)/180)*3));
       		x = x - Math.abs((Math.sin(((360-angle)*Math.PI)/180)*3));
        }
        
    }

    // if left arrow is pressed then turn anti-clockwise
    if (e.keyCode == 37)
    {
    	angle = angle - 5;
    	if (angle<0)
    	{
    	  angle = 360 + angle;
    	}
    }
    
    // if right arrow is pressed then turn clockwise
    else if (e.keyCode == 39)
    {
    	angle = angle + 5;
    	if (angle>=360)
    	{
    	angle = angle - 360;
    	}
    }
    
 // reset triangle values
 triangle.set({top: y, left: x, angle: angle }); 
 
 // add line to path
 line = makeLine([ oldx, oldy, x, y ]);
 canvas.add(line);  
 
 // redraw all objects on canvas 
 canvas.renderAll();
    });
    
   