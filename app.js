var movePixels = 100;
var counter = 0
var walkCounter = 0
var max_animals = 2;

var animalsToWalk = []
// var currentLeft = parseInt(dog.style.left)
var timerId

var time = 1000;
var margin = 20
var width = document.getElementById('animalContainer').style.width;
var height = document.getElementById('animalContainer').style.height;

var animal = function (name,pic) {
  this.name = name;
  this.pic = pic;
  this.left = 0;
  this.top = 80;
  this.vDirection =1;
  this.hDirection = 1;
  this.lipped = false;
}
var animals = []
var pics = ['http://fc08.deviantart.net/fs71/f/2011/280/8/7/ashfur_run_wip_by_agoraphobic_blue-d4c5ie8.gif',
            'https://media.giphy.com/media/ROBADFuGsFLW0/giphy.gif',
            'https://media.giphy.com/media/hFVrwYJaIz0uk/giphy.gif',
            'http://www.netanimations.net/flying_pig_by_rutabaga.gif',
            'https://media.giphy.com/media/ErZOqoVIdI7zW/giphy.gif',
            'http://bestanimations.com/Animals/Birds/bird-animated-gif-26.gif',
            'https://i.makeagif.com/media/7-15-2014/r7qHO2.gif',
            'http://bestanimations.com/Animals/Mammals/Cats/Lions/animated-lion-gif-17.gif',
            'https://fancybear.net/image/bear-m-1.gif',
            'http://orig15.deviantart.net/867a/f/2009/304/c/8/lioness_run_by_windwolf13.gif'
          ]
var animalNames = ['cat','dog', 'man','pig','butterfly','bird','rabbit','lion','bear','penguin']


var createAnimals = function() {
  // var container = document.getElementById('animalContainer')

  for (var i = 0; i < animalNames.length; i++) {
    var img = document.createElement('img')
    img.src = pics[i]
    img.className = 'image'
    img.position = 'absolute'
    img.style.left = '0px'
    img.style.top = '80px'
    var myAnimal = new animal(animalNames[i], img)
    animals.push(myAnimal)
    document.getElementById('animalContainer').appendChild(img)
  }
  return animals
}


var changeStyle = function(animal) {
  var style = animal.pic.style
  if (animal.flipped === false) {
    animal.flipped = true
    style.transform = "scaleX(-1)";
    style.filter ="FlipH";
  } else {
    animal.flipped = false
    style.transform = "scaleX(1)";
    style.filter = "FlipH";
  }
}

var catWalk = function(animal) {
  // var img = animal.pic

  animal.pic.style.visibility = "visible"
  // dog.style.left = (parseInt(dog.style.left) + (movePixels * direction) + 'px')
  if (parseInt(animal.pic.style.left) > window.innerWidth -150   ) {
    changeStyle(animal)

    animal.hDirection = -1
  } else if (parseInt(animal.pic.style.left) <  50 ) {
    changeStyle(animal)
    animal.hDirection = 1
  } else if (parseInt(animal.pic.style.top) < 150 ) {
    animal.vDirection = 1
  } else if (parseInt(animal.pic.style.top) > window.innerHeight - 150 ) {
    animal.vDirection = -1
  }
  animal.pic.style.top = (parseInt(animal.pic.style.top) + (movePixels * animal.vDirection) + 'px')
  animal.pic.style.left = (parseInt(animal.pic.style.left) + (movePixels * animal.hDirection) + 'px')
}

var addMoreAnimals = function() {
  if (counter < animalNames.length) {
      animalsToWalk.push(animals[counter])
      counter++
  }
}

var walkAnimals = function() {
  animalsToWalk.forEach(function(animal) {
    catWalk(animal);
  })
}

var moveAnimal = function() {

  // if (animalsToWalk.length === 0) {
  //   addMoreAnimals()
  // } else {
    setTimeout(function() {
      addMoreAnimals()
    },500);
  // }
  walkAnimals()

}
var start = function() {
  var animals = createAnimals()
  // document.getElementById('animalContainer').height = window.innerHeight
  //   document.getElementById('animalContainer').width = window.innerWidth

}

var btnStart = document.querySelector('#slow');
btnStart.addEventListener( "click",function() {
  clearInterval(timerId)
  timerId = setInterval(moveAnimal, 1000)
});

var btnFaster = document.querySelector('#faster');
btnFaster.addEventListener('click', function() {
  clearInterval(timerId)
  timerId = setInterval(moveAnimal, 500)
});

var btnStop = document.querySelector('#stop').addEventListener( 'click',function() {
  clearInterval(timerId)
});

start()
