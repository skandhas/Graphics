//This file contains the class definition of a sphere object
//Constructors
function Sphere(a1,a2){
	this.type = "sphere";
	this.color = new RgbColor(255,0,0);
	//Sphere from void
	if(arguments.length == 0){
		this.c = new Point3D(200,103,0);
		this.r = 65;
	}
	//Sphere from point and constant
	else if(arguments.length == 2){
		this.c = a1;
		this.r = a2;
	}
	//Sphere from sphere
	else if(arguments.length == 1){
		this.c = a1.c;
		this.r = a1.r;
	}
};

//-----------------------Prototypes--------------
//Object hierarchy
	Sphere.prototype = new GeometricObj;

//Clone current sphere
	Sphere.prototype.Clone = function(){
		return new Sphere(this);
	};

//Current sphere becomes sphere
	Sphere.prototype.Becomes = function(s){
		this.c = s.c;
		this.r = s.r;
		return this;
	};

//Check if current sphere is hit by ray r 
	Sphere.prototype.Hit = function(ray,sr){
		var t;

		var temp = ray.o.Join(this.c); //Returns Vector

		var a = ray.d.Dot(ray.d); //Scalar
		var b = temp.Dot(ray.d)*2;
		var c = temp.Dot(temp)-(this.r*this.r);
		var disc = b*b-4*a*c;

		if(disc<0){
			return false;
		}
		else{
			var e = Math.sqrt(disc);
			var denom = a*2;
			t = (-b-e)/denom;
			if(t>kEpsilon){
				sr.normal = (temp.Add(ray.d.Multiply(t))).Multiply(1/this.r);
				sr.localHit = ray.o.Add(ray.d.Multiply(t));
				return {y:true,t:t};
			}

			t = (-b+e)/denom;

			if(t>kEpsilon){
				sr.normal = (temp.Add(ray.d.Multiply(t))).Multiply(1/this.r);
				sr.localHit = ray.o.Add(ray.d.Multiply(t));
				return {y:true,t:t};
			}
		}
		return {y:false,t:0};
	};

	//Set current sphere's center
	Sphere.prototype.Center = function(a1,a2,a3){
		if(arguments.length == 3){
			this.c = new Point3D(a1,a2,a3);
		}
		else if(arguments.length == 1){
			this.c = a1;
		}
	};

	//Set current sphere's radius
	Sphere.prototype.Radius = function(r){
		this.r = r;
	};