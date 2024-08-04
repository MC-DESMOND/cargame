import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as three from 'three'
import * as cannon from 'cannon-es'
import groundImg from './bt/road.png'
import rockImg from './bt/rock.png'
import CITYView from './bt/bg.png'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
 
import bt1 from './bt/bt1.png'
import bt2 from './bt/bt2.png'
import bt3 from './bt/bt3.png'
import bt4 from './bt/bt4.png'
import bt5 from './bt/bt5.png'
import bt6 from './bt/bt6.png' 
import bt7 from './bt/bt7.png'
import bt8 from './bt/bt8.png'
import bt9 from './bt/bt9.png'
import bt0 from './bt/bt0.png'
var running = false
var row = false
const panel = document.getElementById('panel')
const audio = document.createElement("audio")
const logo = document.getElementById("logo")
const score = document.getElementById("score")
const highscore = document.getElementById("highscore")
const mute = document.getElementById("ispaused")
const cac = document.getElementById("cac")
const carc = document.getElementById("carc")
const cb = document.getElementById("cb")
const intro = document.getElementById("intro")
const exp = document.getElementById("exp")
const pbar = document.getElementById("pbspan")
const pauseshow = document.getElementById("s")
var re = false;
const restart = document.getElementById("restart")
document.body.appendChild(audio)
audio.src = '/bt/RS.mp3'
audio.volume -= 0.4
audio.loop = true

const treegltf = "bt/tree2.glb"
var buildingsTex = []
buildingsTex.push(
  new three.TextureLoader().load(bt1),
  new three.TextureLoader().load(bt1),
  new three.TextureLoader().load(bt2),
  new three.TextureLoader().load(bt3),
  new three.TextureLoader().load(bt3),
  new three.TextureLoader().load(bt4),
  new three.TextureLoader().load(bt5),
  new three.TextureLoader().load(bt6),
  new three.TextureLoader().load(bt7),
  new three.TextureLoader().load(bt8),
  new three.TextureLoader().load(bt9),
  new three.TextureLoader().load(bt0),
  new three.TextureLoader().load(bt0),
  new three.TextureLoader().load(bt0),
  )
var yi = -300
var iscore = 0
var tinp = []
var treewidth = 100
var enywidth = 100
const scene = new three.Scene();
const view = 50000
var lll = 700
const canvas = document.getElementById("app")
const camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,view)
const display  = new three.WebGLRenderer({canvas:canvas})
const control = new OrbitControls(camera,display.domElement)
const rh = document.getElementById("rh")
var paused = false
const audio2 = document.createElement("audio")
document.body.appendChild(audio2)
audio2.src = '/bt/carcrash.wav'
audio2.volume -= 0.1
control.update()

function updateLaw(LAW,OBJECT){
  // requestAnimationFrame(e=>updateLaw(LAW,OBJECT))
  LAW.position.copy(OBJECT.position)
  LAW.quaternion.copy(OBJECT.quaternion)

  OBJECT.position.copy(LAW.position)
  OBJECT.quaternion.copy(LAW.quaternion)
}
function updateObj(LAW,OBJECT){
  // requestAnimationFrame(e=>updateObj(LAW,OBJECT))
  OBJECT.position.copy(LAW.position)
  OBJECT.quaternion.copy(LAW.quaternion)

  LAW.position.copy(OBJECT.position)
  LAW.quaternion.copy(OBJECT.quaternion)

  
}
// camera.position.setX(-1000)
function setHighScore(num = 0){
  localStorage.setItem("High Score",num)

}
function getHighScore(){
  var hs
  hs = localStorage.getItem("High Score")
  if (!hs){
    setHighScore()
    hs = getHighScore()
  }
  return hs
}

var hits = 0
var maxhits = 0
var ctop = 200

const law = new cannon.World({gravity:new cannon.Vec3(0,-10000,0)})
var trees = []
var treeslaw = []
var enys = []
var enyslaw = []
var enyslawsid = []
var you,yourlaw
const light = new three.AmbientLight()
light.intensity = 2.50
// light.intensity = 0 
scene.add(light)
const sun =  new three.PointLight(0xffd7a0,1000,view)
sun.intensity = 600000000
sun.position.y += 8000
sun.position.z = 1000
sun.position.x += 1000

scene.add(sun)
scene.add(new three.PointLightHelper(sun,100))

var speed = 30;
const groundgeo =  new three.PlaneGeometry(40000,view)
const groundmaterial = new three.MeshPhysicalMaterial({map:new three.TextureLoader().load(groundImg),color:0x333333,side:three.DoubleSide})
const ground = new three.Mesh(groundgeo,groundmaterial)
ground.rotation.x =-0.5 * Math.PI
ground.position.y = -ctop
scene.add(ground)
scene.background = new three.TextureLoader().load(CITYView)

const groundlaw = new cannon.Body({
  type:cannon.Body.STATIC
  // mass:10
  ,shape:new cannon.Box(new cannon.Vec3(650000,view*5,2)),
})
law.addBody(groundlaw)

function load(bool)
{
  if (bool){
    intro.classList.remove("none")
  }else{
    intro.classList.add("none")
  }
  audio.play()
  running = !bool
}
load(true)

function Recoil(){
  if (you){you.rotation.y  = 0 
  you.rotation.x  = 0 
  you.rotation.z  = 0 
  you.position.z = yi
  updateLaw(yourlaw,you)
}}

class BUILDINGS{
  buildings = []
  buildingslaw = []
  binp = []

  constructor(length , z){
    for (var i=0;i<length;i++){
      this.BuildBuilding(z)
      
    }
    console.log("BUILDING ");
    this.binp.reverse()
  }

  BuildBuilding(xmin){
    const width = 600
    const height = (Math.random()*3000)+1000
    const buildingGeo = new three.BoxGeometry(width,height,width,height)
    var texIndex = Math.ceil(Math.random()*buildingsTex.length-1)
    const buildingTex = buildingsTex[texIndex]
    const buildingMat = new three.MeshPhysicalMaterial({map:buildingTex,roughness:0})
    const building = new three.Mesh(buildingGeo,buildingMat)
    const buildinglaw = new cannon.Body({shape: new cannon.Box(new cannon.Vec3(height,width,0))})

    building.position.x -= xmin
    building.position.z = 1-(((this.buildings.length)*(width+100))+width)
    building.position.y = (height/2)-ctop

    updateLaw(buildinglaw,building)
    scene.add(building)
    law.addBody(buildinglaw)
    this.buildingslaw.push(buildinglaw)
    this.buildings.push(building)
    this.binp.push(buildinglaw.position.z)
  }
  UpdateBuildingZplus(z){
    for (var o in this.buildingslaw){
      this.buildingslaw[o].position.z += z
    if (this.buildingslaw[o].position.z > 0){
      this.buildingslaw[o].position.z = this.binp[0]
    }
    updateObj(this.buildingslaw[o],this.buildings[o])
    }
  }
}

// setTimeout(e=>{
  
// },5000)

// class OBJ{
//   loader = new OBJLoader();
//   object
//   constructor(name , handler){
//     this.loader.load( name,
//       (object)=>{
//         this.object = object
//         handler(this.object)
//       },
//       function ( xhr ) {

//         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
//       },
//       function ( error ) {

//         console.log( 'An error happened' );
    
//       }
//     )
//   }
// }





class ANA{
  context = new AudioContext()
  frequencyData = null
  analyser = null
  source = null
  height = 0
  high = 0
  low = 0
  error = false

  constructor(audioEl){
    try{
      this.analyser = this.context.createAnalyser()
      this.source = this.context.createMediaElementSource(audioEl)
      this.source.connect(this.analyser)
      this.analyser.connect(this.context.destination)
      this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
      
    }catch(e){
      console.log("ERROR: ",e);
      this.error = true
    }
  }

  Scale(high,low){
    if (!this.error){
      this.high = Number(high)
      this.low = Number(low)
      this.height = this.high-this.low
      this.analyser.getByteFrequencyData(this.frequencyData)
      var add  = 0
      for (i in this.frequencyData){
          add += this.frequencyData[i]
      }
      var avg = add/this.frequencyData.length
      var percentage = ((avg/100)*this.height)+this.low
      return percentage
    }else{
      console.log("ERROR");
      return low
    }

  }
}


function buildTree(xmin){
  var tree , treelaw
  var width = treewidth
  var height= 100
  var height= (Math.random()*200)+50
  new GLTFLoader().load(treegltf ,e=>{
    tree = e.scene
    tree.scale.add(new three.Vector3(width,height,height))
    treelaw = new cannon.Body({shape: new cannon.Box(new cannon.Vec3(width,height))})
    tree.position.x -= xmin
    tree.position.z = 1-(((trees.length)*(width+300))+width)
    tree.position.y += ((height)+(height/2))-ctop

    updateLaw(treelaw,tree)
    scene.add(tree)
    law.addBody(treelaw)
    trees.push(tree)
    treeslaw.push(treelaw)
    tinp.push(treelaw.position.z)
    
  });
}
function topause(bool,crashed = false){
  var p = document.querySelectorAll(".p")
  var addnp = function() {p.forEach(i=>i.classList.add("none"))}
  var renp = function() {p.forEach(i=>i.classList.remove("none"))}
  if (bool){
    panel.style.visibility = 'initial'
    panel.style.opacity = "1"
    pauseshow.innerText = "START"
    panel.style.height = "100%"
    renp()
  }else{
    if (pauseshow.innerText.trim() == "crashed"){
      if(you){
        you.position.z = yi
        updateLaw(yourlaw,you)
      }
      reloadscore(0)
      Recoil()
    }

    panel.style.height = "0"
    panel.style.opacity = "0"
    setTimeout(e=>{panel.style.visibility = 'hidden'},500)
    addnp()

    if (!audio2.paused){
      audio2.pause()
      audio2.currentTime = 0 
    }
  }
  if (crashed){
    pauseshow.innerText = "crashed"
    restarti(true)
  }
  paused = bool
}


function createEnys(){
  var width = 100
  var height = 100
  var zwidth = width*3
  var zheight = height*3
  var enyBound = [width,height,zwidth,zheight]
  var enyGeo = new three.BoxGeometry(...enyBound)
  var enyMat = new three.MeshPhysicalMaterial({map:new three.TextureLoader().load(rockImg)})
  var eny = new three.Mesh(enyGeo,enyMat)
  var enylaw = new cannon.Body({shape:new cannon.Box(new cannon.Vec3(...[width-30,height,zwidth,zheight])),mass:10})
  eny.position.z = (1-(((enyslaw.length)*(width+1000))+width))-5000
  eny.position.y += (height/2)-ctop
  var l = lll
  eny.position.x = (1-((Math.random()*(l*2))))+l

  updateLaw(enylaw,eny)
  scene.add(eny)
  law.addBody(enylaw)
  enys.push(eny)
  enyslaw.push(enylaw)
  enyslawsid.push(enylaw.id)
}
paused = true


function reloadscore(num){
  iscore = num
  score.innerText = "Score: "+iscore
  highscore.style.animationPlayState = "paused"
  if (iscore > getHighScore()){
    setHighScore(iscore)
    if (getHighScore() > 100)
    {highscore.style.animationPlayState = "running"}
  }
  // setHighScore(0)
  highscore.innerText = "High score: "+getHighScore()
}
reloadscore(0)
function restarti(bool = false){
  if (enyslaw.length > 2){for (var i in enyslaw){
    scene.remove(enys[i])
    law.removeBody(enyslaw[i])
    
  }}

  enys = []
  enyslaw = []
  enyslawsid = []
  for (var i=0;i<=10;i++){
    createEnys()
  }
  if (yourlaw){
    yourlaw.position.z = yi
    yourlaw.position.x = 0
    yourlaw.position.y = 0
    updateObj(yourlaw,you)
  }
   
  Recoil()
   if (!bool){ reloadscore(0);topause(false)}
}

restart.addEventListener("click",e=>restarti())
rh.addEventListener("click",e=>{setHighScore(0);reloadscore(0)})
//!  Main

updateLaw(groundlaw,ground)
const bnum = 50;
var leftbs = new BUILDINGS(bnum,-2300)
var rightbs= new BUILDINGS(bnum,2300)
var ana
window.addEventListener("click",()=>{
  try{
    if (!ana){ana = new ANA(audio)}
    

  }catch(e){}
  if (innerWidth < 900){
    try{
      document.documentElement.requestFullScreen();
      screen.orientation.lock("portrait-primary");
    }
    catch(e){
      console.log(e)
    }
  }
})
// window.addEventListener("keydown",start )




for (var i=0;i<30;i++){
  buildTree(-1500)
  buildTree(1500)
  
}
var left = new three.Mesh(new three.BoxGeometry(700,50,view,500),new three.MeshPhysicalMaterial({map:new three.TextureLoader().load(groundImg),color:0x999999}))
left.position.y = 1-ctop
left.position.x = 1550
scene.add(left)
restarti(true)
var right = new three.Mesh(new three.BoxGeometry(700,50,view,500),new three.MeshPhysicalMaterial({map:new three.TextureLoader().load(groundImg),color:0x999999}))
right.position.y = 1-ctop
right.position.x = -1550
scene.add(right)
restarti(true)

class YOURS{

  choosers = []
  idid = {}
  current = 0
  loading = false
  constructor(selector){
    this.choosers = document.querySelectorAll(`.${selector}`)
    this.choosers.forEach((cr,index) =>{

      cr.addEventListener("click",e=>{
        load(true)
        carc.classList.add("none")
        this.choose(cr.id)
        
      })
    })
    console.log(this.choosers)
  }
  choose(name){
    this.loading = true
    var el = Array(...this.choosers).find(cr=>cr.id == name)
    console.log(el);
    this.LoadYou(el.id)
    
    this.choosers.forEach((cr,index) =>{
      if (cr.id == el.id){
        cr.style.filter = "brightness(1)"
      }else{
        cr.style.filter = "brightness(0.4)"
      }
    })

  }
  
  LoadYou(url){
    new GLTFLoader().load(url,e=>{
      onresizeWin()
      if (you && yourlaw){
        scene.remove(you)
        law.removeBody(yourlaw)
      }
      you = e.scene
      var width = 60
      var height = 70
      var d = 10
      you.scale.copy(new three.Vector3(width,height,width))
      yourlaw = new cannon.Body({
        shape:new cannon.Box(new cannon.Vec3(width-d,height-d,width-d))
        ,mass:10
      })
      yourlaw.position.y += (height/2)-ctop
      scene.add(you)
      law.addBody(yourlaw)
      yourlaw.position.z = yi

      yourlaw.addEventListener("collide",e=>{
        console.log("colide",e);
        console.log("colide id",e.body.id);
        if (enyslawsid.includes(e.body.id)){
          console.log("includes");

          hits += 1
          
            if (paused){}else{
              audio2.play() 
              topause(true,true)
              exp.src = "./bt/explode2.gif"
              exp.classList.remove("none")
              yourlaw.position.x = 0
              Recoil()
              setTimeout(() => {
                exp.classList.add("none")
                exp.src = ""
                
              }, 1500);
              
            }
            
            hits = 0
        }
      })
      if(carc.classList.contains("none")){load(false)}
      this.loading = false
    },function ( xhr ) {
      pbar.style.width = `${Math.ceil(xhr.loaded / xhr.total * 100)}%`
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded of car' );
    
    })
  }
}

var youl = new YOURS('car-img')
var a = Array(...youl.choosers).find(e=>e.id.includes("alpha"))
youl.choose(a.id)
cb.addEventListener("click",e=>{
  if (youl.loading){}else{load(false)}
  carc.classList.add("none")
})
cac.addEventListener("click",e=>{
  load(true)
  carc.classList.remove("none")
})
// LoadYou('/bt/lambo.glb')


tinp.reverse()
var l =  -2000
var ap = false
groundlaw.position.z = l

function controlCar(e){
  if(running){var leftspeed = 30
  var maxang = 0.1
  var anginc = (30/700)*maxang
  var t = document.getElementById("T")
  console.log(e)
  
  if (you)
  { 
    
    if (!paused){if (e == "ArrowRight"){
      if (yourlaw.position.x > lll){}else{
        if (yourlaw.quaternion.y > maxang ){}else{
          yourlaw.quaternion.y += anginc
          
        }
        yourlaw.position.x += leftspeed
      }
    }else if(e == "ArrowLeft"){
      if (yourlaw.position.x < 1-lll){}else{
        if (yourlaw.quaternion.y < Number(`-${maxang}`)){}else{
          yourlaw.quaternion.y -= anginc
        }
        yourlaw.position.x -= leftspeed
      }
    }else{
      yourlaw.quaternion.y = 0
    }
    if (e == "ArrowUp"){
      if (yourlaw.position.z < 1-(lll-yi)){}else{
        yourlaw.position.z -= 10
        sp = false
      }
    }
    else if (e == "ArrowDown"){
      sp = true
    }
    console.log("yourlaw.quaternion.y:",yourlaw.quaternion.y)
    }if (e == " " || e == "p"){
      topause(!paused) 
      console.log(paused);   
    }
    if (e.toLowerCase() == "x"){
      Recoil()
    }
    if (e.toLowerCase() == "t"){
      row = !row
    }
    if (e.toLowerCase() == "m"){
      if (ap){
        audio.play()
        mute.classList.add("none")
      }else{
        audio.pause()
        mute.classList.remove("none")
      }
      ap = !ap
    }
  if (row){
    var angle = 0.00001-(yourlaw.quaternion.y*50)
    console.log(angle);
    canvas.style.rotate = `${angle}deg` 
    t.style.backgroundColor = "rgb(0, 77, 98)"
  }else{
    canvas.style.rotate = `0deg`
    t.style.backgroundColor = "rgba(0, 21, 27, 0.658)"
   }
  }}
}
document.querySelectorAll(".arrowk").forEach(ar=>{
  var int
  ar.addEventListener("touchstart",e=>{
    int = setInterval(() => {
      controlCar(ar.id)
    }, 50);
    
  })
  ar.addEventListener("touchend",e=>{
    clearInterval(int)
    
  })
})

document.querySelectorAll(".arrow").forEach(ar=>{

  ar.addEventListener("click",e=>{
    controlCar(ar.id)
  })

})
function onresizeWin(){
  camera.aspect = innerWidth/innerHeight
  camera.updateProjectionMatrix()
  display.setSize(innerWidth,innerHeight)
  control.domElement =  display.domElement
  control.object = camera
}
function animate(){
  requestAnimationFrame(animate)
  
  if (!paused){if(you){
    if(yourlaw.position.z < 0){speed = -((yourlaw.position.z)/20)}else{
      speed = 20
    }}}else{
  speed = 0
  }
  // camera.position.z -= 3
  if (audio.paused && !ap){
    try{audio.play()}catch(DOMException){}
  }

  if (sp){
    if (yourlaw.position.z >= yi){
      yourlaw.position.z = yi
      sp = false
    }else{
      yourlaw.position.z += 10
    }
  }
  if (yourlaw){
    if (yourlaw.position.x > lll){
      yourlaw.position.x = lll
    }
    if (yourlaw.position.x < 1-lll){
      yourlaw.position.x = 1-lll
    }
    if (yourlaw.position.z > yi){
      yourlaw.position.z = yi
    }
  }
  groundlaw.position.z += speed
  if (groundlaw.position.z > l+1000){
    groundlaw.position.z = l
  }

  leftbs.UpdateBuildingZplus(speed)
  rightbs.UpdateBuildingZplus(speed)

  for (var o in treeslaw){
    treeslaw[o].position.z += speed
  if (treeslaw[o].position.z > 0){
    treeslaw[o].position.z = 1-((((trees.length)*(treewidth+300))+treewidth))
  }
  updateObj(treeslaw[o],trees[o])
  }

  if (enyslaw[0]){for (var o in enyslaw){
    enyslaw[o].position.z += speed
    if(ana){
      var num = Math.ceil(ana.Scale(200,100))
      logo.style.width = num+"px"
    }
    if (enyslaw[o].position.z > 0){
      enyslaw[o].position.z = 1-((((enys.length)*(enywidth+1000))+enywidth))
      
      // enyslaw[o].position.y = iscore
      enyslaw[o].position.x = (1-((Math.random()*(lll*2))))+lll
      reloadscore(iscore+1)
    }
    updateObj(enyslaw[o],enys[o])
  }}

  updateObj(groundlaw,ground)
  if (you)
    {updateObj(yourlaw,you)}

  control.update()
  law.step(1/60)
  display.render(scene,camera)  
}

window.onresize = onresizeWin
onresizeWin()

var sp = false

window.addEventListener("keydown",e=>{
  controlCar(e.key)
})

animate()