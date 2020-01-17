WIDTH = 600;
HEIGHT = 600;
w = 60;
var grid = [];
var current;

var stack = []
var vis = []

function setup() {
	// put setup code here
	createCanvas(WIDTH, HEIGHT);
	cols = floor(WIDTH/w);
	rows = floor(HEIGHT/w);
	frameRate(5)

	for(var i = 0; i < rows; i++){
		for (var j = 0; j < cols; j++){
			var cell = new Cell(i,j);
			grid.push(cell);
		}
	}

	current = grid[27];
}

function draw() {
	// put drawing code here
	background(51);
	for (var i = 0; i < grid.length; i++){
		grid[i].show();
	}

	current.visited = true;
	current.highlight();
	var next = current.checkNeighbours();
	if(next){
		next.visited = true;
		vis.push(index(next.j,next.i));
		console.log(1)

		//STEP2
		stack.push(current);

		//STEP 3
		removeWalls(current, next)

		//STEP 4
		current = next;
	}else if (stack.length > 0){
		current = stack.pop();
		console.log(2)
	}

	//console.log(current.i+" "+current.j)
	//console.log(stack.length)
	// if(vis.length != 100){
	// 	console.log(vis)
	// }	
}

function index(i,j){
	if (i < 0 || j < 0 || i > rows-1 || j > cols-1){
		return -1;
	}
	return j + i * cols
}



function Cell(i, j){
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true];
	this.visited = false;

	this.highlight = function(){
		var x = this.i * w;
		var y = this.j * w;
		noStroke()
		fill(0,255,0,170)
		rect(x+10, y+10, w-20, w-20)
	}

	this.show = function(){
		var x = this.i * w;
		var y = this.j * w;
		stroke(255)
		strokeWeight(3)
		if(this.walls[0]){
			line(x,y,x+w,y); //TOP
		}
		if(this.walls[1]){
			line(x+w,y,x+w,y+w); //RIGHT
		}
		if(this.walls[2]){
			line(x+w,y+w,x,y+w); //BOTTOM
		}
		if(this.walls[3]){
			line(x,y+w,x,y); //LEFT
		}

		if(this.visited){
			noStroke();
			fill(255,169,115);
			rect(x,y,w,w);

		}
	}

	this.checkNeighbours = function(){
		var neighbours = []

		var top = grid[index(i-1, j)];
		var right = grid[index(i, j+1)];
		var bottom = grid[index(i+1,j)];
		var left = grid[index(i,j-1)];

		if (top && !top.visited){
			neighbours.push(top)
		}
		if (right && !right.visited){
			neighbours.push(right)
		}
		if (bottom && !bottom.visited){
			neighbours.push(bottom)
		}
		if (left && !left.visited){
			neighbours.push(left)
		}

		if (neighbours.length > 0){
			var r = floor(random(0, neighbours.length));
			return neighbours[r];
		}else{
			return undefined;
		}
	}
}


function removeWalls(a, b){
	var x = a.j - b.j;
	if (x === 1){
		a.walls[0] = false;
		b.walls[2] = false;
	}else if(x === -1){
		a.walls[2] = false;
		b.walls[0] = false;
	}

	var y = a.i - b.i
	if (y === 1){
		a.walls[3] = false;
		b.walls[1] = false;
	}else if(y === -1){
		a.walls[1] = false;
		b.walls[3] = false;
	}
}