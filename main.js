/*
#         ____  _____ ____  ____  ____   ___ ___ ____    ____   ___   ____ _  __
#        |  _ \| ____/ ___||  _ \|  _ \ / _ \_ _|  _ \  |  _ \ / _ \ / ___| |/ /
#        | | | |  _| \___ \| | | | |_) | | | | || | | | | |_) | | | | |   | ' /
#        | |_| | |___ ___) | |_| |  _ <| |_| | || |_| | |  _ <| |_| | |___| . \
#        |____/|_____|____/|____/|_| \_\\___/___|____/  |_| \_\\___/ \____|_|\_\
#      
#         ____   ___  ____   ____ _____
#        |  _ \ / _ \|  _ \ / ___| ____|
#        | | | | | | | | | | |  _|  _|
#        | |_| | |_| | |_| | |_| | |___
#        |____/ \___/|____/ \____|_____|

* ■■■■■■■■■■■ DESDROID INC ®️ ■■■■■■■■■■■
     
*/



import './style.css'

import * as three from 'three'
import * as cannon from 'cannon-es'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
 
import groundImg from './bt/road.png'
import rockImg from './bt/rock.png'
import skyImg from './bt/sky.png'
import CITYView from './bt/bg.png'

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
var paused = false
var fly = false

const panel = document.getElementById('panel')
const audio = document.createElement("audio")
const clicka = document.createElement("audio")
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
const restart = document.getElementById("restart")
const introVid = document.getElementById("intro-vid")
const ivw = document.getElementById("ivw")
const ttc = document.getElementById("ttc")
const levels = document.querySelectorAll(".level")
const levelw = document.getElementById("levelw")
document.body.appendChild(audio)
document.body.appendChild(clicka)
audio.src = '/bt/VI.mp3'
clicka.src = '/bt/click.wav'
audio.volume -= 0.4
var lim = 50
audio.loop = true

function playclick(){
  clicka.pause()
  clicka.currentTime = 0
  clicka.play()
}

const treegltf = "bt/tree2.glb"
function Main(){
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
var treewidth = 300
var enywidth = 100
const view = 100000
var lll = 1500
var flymax = 300*4
const scene = new three.Object3D();
const world = new three.Scene();
const canvas = document.getElementById("app")
const camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,view)
const display  = new three.WebGLRenderer({canvas:canvas})
const control = new OrbitControls(camera,display.domElement)
const law = new cannon.World({gravity:new cannon.Vec3(0,-10000,0)})
const rh = document.getElementById("rh")
const audio2 = document.createElement("audio")

document.body.appendChild(audio2)
audio2.src = '/bt/carcrash.wav'
audio2.volume -= 0.1
const clock = new three.Clock();
control.update()

world.add(scene)

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

var speed = 10;
var pspeed = speed;
var hits = 0
var maxhits = 0
var ctop = 200
var trees = []
var treeslaw = []
var enys = []
var enyslaw = []
var enyslawsid = []
var gemslawsid = []
var you,yourlaw,mixer


const light = new three.AmbientLight()
light.intensity = 1.50
// light.intensity = 0 
scene.add(light)
const sun =  new three.PointLight(0xffe7c0,1000,view)
sun.intensity = 300000000
sun.position.y += 8000
sun.position.z = -1000
sun.position.x += 1000

scene.add(sun)
scene.add(new three.PointLightHelper(sun,100))

const groundgeo =  new three.PlaneGeometry(40000,view)
const groundtex = new three.TextureLoader().load(groundImg)
groundtex.wrapS = groundtex.wrapT = three.RepeatWrapping
groundtex.repeat.setX(100)
groundtex.repeat.setY(100)
const groundmaterial = new three.MeshPhysicalMaterial({map:groundtex,side:three.DoubleSide,emissive:0x222222})
const ground = new three.Mesh(groundgeo,groundmaterial)
ground.rotation.x =-0.5 * Math.PI
ground.position.y = -ctop
scene.add(ground)
world.background = new three.TextureLoader().load(CITYView)

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
  if (you){yourlaw.quaternion.y  = 0 
  yourlaw.quaternion.x  = 0 
  yourlaw.quaternion.z  = 0 
  yourlaw.position.z = yi
  
  
}}


class BUILDINGS{
  buildings = []
  buildingslaw = []
  binp = []
  width = 2000
  gap = 300
  constructor(length , z){
    for (var i=0;i<length;i++){
      this.BuildBuilding(z)
      
    }
    console.log("BUILDING ");
    this.binp.reverse()
  }

  BuildBuilding(xmin){
    const height = (Math.random()*6000)+2000
    const buildingGeo = new three.BoxGeometry(this.width,height,this.width,height)
    var texIndex = Math.ceil(Math.random()*buildingsTex.length-1)
    const buildingTex = buildingsTex[texIndex]
    const buildingMat = new three.MeshPhysicalMaterial({map:buildingTex,roughness:0})
    const building = new three.Mesh(buildingGeo,buildingMat)
    const buildinglaw = new cannon.Body({shape: new cannon.Box(new cannon.Vec3(height,this.width,0))})

    building.position.x -= xmin
    building.position.z = 1-(((this.buildings.length)*(this.width+this.gap))+this.width)
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
    var backelzfrontzabs
    if (!paused){if (o > 0){
      backelzfrontzabs = this.buildingslaw[o-1].position.z-this.buildingslaw[o].position.z
      console.log("backelzfrontzabs init: "+o+": ",(this.buildingslaw[o-1].position.z-this.buildingslaw[o].position.z));
     }else{
      backelzfrontzabs = this.buildingslaw[this.buildingslaw.length-1].position.z-this.buildingslaw[o].position.z
      console.log("backelzfrontzabs init "+o+": ",(this.buildingslaw[this.buildingslaw.length-1].position.z-this.buildingslaw[o].position.z));
    }
    backelzfrontzabs -= this.width

    if (backelzfrontzabs < this.gap && backelzfrontzabs > Number(`-${this.width}`)){
      this.buildingslaw[o].position.z += backelzfrontzabs-this.gap
    }
    
    // this.buildingslaw[o].position.z -= (backelzfrontzabs - this.gap)
    
    console.log("backelzfrontzabs: "+o+": ",backelzfrontzabs-this.gap);
    console.log("pos Z: "+o+": ",this.buildingslaw[o].position.z );
    }
    updateObj(this.buildingslaw[o],this.buildings[o])
    }
  }

}




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
      for (var i in this.frequencyData){
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
    tree.scale.add(new three.Vector3(width,height,width))
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
    if (pauseshow.innerText.trim().toLowerCase() == "crashed"){
      if(you){
        you.position.z = yi
        updateLaw(yourlaw,you)
      }
      reloadscore(0)
      Recoil()
      pspeed = 10
      
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
    pauseshow.innerText = "CRASHED"
    restarti(true)
  }
  
  paused = bool
}



class Enys{
  width
  height
  enyslist = []
  lawlist = []
  ycoord = 0
  xmax = 0
  gap = 1000
  texture
  mass
  enyMat
  enyGeo
  incScore = true
  length
  rotatez = false
  rotatespeed = 0.01
  objectDict = {
    circle: three.CircleGeometry,
    box: three.BoxGeometry,
    poly: three.ConeGeometry
  }
  isgem = false
  rz = 0
  constructor(ycoord,xmax,length,texture,diameter,object,gravitate = true ,rz = 0,isgem=false ,rotateZ = false){
    this.xmax = xmax
    this.ycoord = ycoord
    this.texture = texture
    this.width = diameter
    this.height = diameter
    this.length = length
    this.isgem = isgem
    this.rz = rz
    this.rotatez = rotateZ
    this.created = false
    this.mass = gravitate ? 10 : 0
    this.enyMat = new three.MeshPhysicalMaterial({map:this.texture})
    this.enyGeo = new this.objectDict[object](...[diameter,diameter,diameter,diameter])

    console.log("mass",this.mass);
    

  }
  
  create(){
    if (!this.created){for(var i=0 ;i<=this.length; i++){
      this.build()
    }this.created = true}
    
  }
  delete(){
    if (this.created){for(var i=0;i<this.lawlist.length;i++){
      scene.remove(this.enyslist[i])
      law.removeBody(this.lawlist[i])
    }
    this.enyslist = []
    this.lawlist = []
    this.created = false
  
  }
  }

  build(xmax = null){
    this.xmax = xmax ? xmax : this.xmax
      var eny = new three.Mesh(this.enyGeo,this.enyMat)
      var enylaw = new cannon.Body({shape:new cannon.Box(new cannon.Vec3(...[this.width-30,this.height,this.width])),mass:this.mass})
      eny.position.z = (1-(((this.lawlist.length)*(this.width+this.gap))+this.width))-5000
      eny.position.y = this.ycoord
      var l = this.xmax
      eny.position.x = (1-((Math.random()*(l*2))))+l
      eny.rotateZ(this.rz)
      updateLaw(enylaw,eny)
      scene.add(eny)
      law.addBody(enylaw)
      this.enyslist.push(eny)
      this.lawlist.push(enylaw)
      if (this.isgem){gemslawsid.push(enylaw.id)}else{enyslawsid.push(enylaw.id)}
  }

  Update(xmax = null){
    this.xmax = xmax ? xmax : this.xmax
    if (this.lawlist.length > 2){for (var o in this.lawlist){
      this.lawlist[o].position.z += speed
      
      if (this.lawlist[o].position.z > 0){
        this.lawlist[o].position.z = 1-((((this.enyslist.length)*(this.width+this.gap))+this.width))
        
        // this.lawlist[o].position.y = iscore
        this.lawlist[o].position.x = (1-((Math.random()*(this.xmax*2))))+this.xmax
        if (this.incScore){reloadscore(iscore+1)}
      }
      updateObj(this.lawlist[o],this.enyslist[o])
      if (this.rotatez){
        this.enyslist[o].rotation.z += this.rotatespeed
        this.enyslist[o].rotation.y += this.rotatespeed
        this.enyslist[o].rotation.x += this.rotatespeed   
        updateLaw(this.lawlist[o],this.enyslist[o])
        }
    }}
  }
}

var enys = 100
var gems = 100
var landEnys = new Enys((100/2)-ctop,lll,enys,new three.TextureLoader().load(rockImg),100,"box",true)
landEnys.create()
var airEnys = new Enys(flymax,lll,enys,new three.TextureLoader().load(skyImg),100,"box",false,80*2,false,true)


var gemlEnys = new Enys((100/2)-ctop,lll,gems,new three.TextureLoader().load(skyImg),100,"poly",true,80*2,true)
var gemaEnys = new Enys(flymax,lll,gems,new three.TextureLoader().load(skyImg),100,"poly",false,80*2,true)
gemaEnys.gap = Math.ceil(gemaEnys.gap/2)
gemlEnys.gap = Math.ceil(gemlEnys.gap/2)
// gemaEnys.create()
// gemlEnys.create()


levels.forEach(level=>{
  level.onclick = e=>{
    var gap = Number(level.id.replace('l',''))
    airEnys.gap = gap
    landEnys.gap = gap
    restarti()
  }
})

levelw.onclick = e=>{
  if (levelw.classList.contains("none")){

  }
  else{
    levelw.classList.add("none")
  }
}
levelw.classList.add("none")

// reloadscore(iscore+1)

topause(true)


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
  highscore.innerText = "Highest Score: "+getHighScore()
}

reloadscore(0)

function restarti(bool = false){

  airEnys.delete()
  landEnys.delete()
  gemaEnys.delete()
  gemlEnys.delete()

  airEnys.create()
  landEnys.create()
  /* gemaEnys.create()
  gemlEnys.create() */
  

  if (yourlaw){
    yourlaw.position.z = yi
    yourlaw.position.x = 0
    yourlaw.position.y = 0
    updateObj(yourlaw,you)
  }
   
  Recoil()
   if (!bool){ reloadscore(0);topause(false)}
}

restart.addEventListener("click",e=>{levelw.classList.remove("none")})
rh.addEventListener("click",e=>{setHighScore(0);reloadscore(0)})
//!  Main

updateLaw(groundlaw,ground)
const roadspace = lll + 1600
const bnum = 30;
var leftbs = new BUILDINGS(bnum,Number(`-${roadspace+2000}`))
var rightbs= new BUILDINGS(bnum,roadspace+2000)

var  bss = []

// for (var i=0;i<10;i++){
//   var lbs = new BUILDINGS(bnum,1-(2300+(leftbs.width*i)))
//   var rbs= new BUILDINGS(bnum,2300+(leftbs.width*i))
//   bss.push(lbs,rbs)
// }

var ana
window.addEventListener("click",()=>{
  // playclick()
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




for (var i=0;i<100;i++){
  buildTree(Number(`-${roadspace-800}`))
  buildTree(roadspace-800)
  
}
const ptex = new three.TextureLoader().load(groundImg)
ptex.wrapS = ptex.wrapT = three.RepeatWrapping
ptex.repeat.setX(10)
ptex.repeat.setY(100)
var pwidth = 600
// var left = new three.Mesh(new three.BoxGeometry(pwidth,100,view,500),new three.MeshPhysicalMaterial({map:ptex/* ,color:0x555555 */}))
// left.position.y = 1-ctop
// left.position.x = roadspace-800
// // left.position.x = roadspace-800
// scene.add(left)

// var right = new three.Mesh(new three.BoxGeometry(pwidth,100,view,500),new three.MeshPhysicalMaterial({map:ptex/* ,color:0x555555 */}))
// right.position.y = 1-ctop
// right.position.x = Number(`-${roadspace-800}`)
// scene.add(right)
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

  setCurrentCar(num = null){
    if (!num){
      var hr = localStorage.getItem("Current Car")
      if (hr){
        num = hr
      }else
        {num = this.choosers[0].id}
    }
    console.log(num)
    localStorage.setItem("Current Car",num)
  }
  
  getCurrentCar(){
    var hs
    hs = localStorage.getItem("Current Car")
    if (!hs){
      this.setCurrentCar()
      hs = this.getCurrentCar()
    }
    return hs
  }

  loadCar(){
    var hr = this.getCurrentCar()
    this.choose(hr)
  }

  choose(name){
    this.loading = true
    var el = Array(...this.choosers).find(cr=>cr.id == name)
    if (!el){
      el = Array(...this.choosers).find(cr=>cr.id == this.getCurrentCar())
    }
    this.setCurrentCar(el.id)
    console.log(el);
    if (el.classList.contains("fly")){
      
    }else{
      fly = false
    }
    this.LoadYou(el.id)
    
    this.choosers.forEach((cr,index) =>{
      if (cr.id == el.id){
        cr.style.border = "5px solid cyan"
      }else{
        cr.style.border = ""
      }
    })

  }
  
  LoadYou(url){
    mixer = null
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
        shape:new cannon.Box(new cannon.Vec3(width-d,height,width-d))
        ,mass:10
      })

      yourlaw.position.y += (height/2)-ctop
      scene.add(you)
      law.addBody(yourlaw)
      yourlaw.position.z = yi

      yourlaw.addEventListener("collide",e=>{
        console.log("colide",e);
        console.log("colide id",e.body.id);
        if (gemslawsid.includes(e.body.id)){
          reloadscore(iscore+1)
          var gem = law.getBodyById(e.body.id)
          gem.position.z = 100
        }
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
              fly = false
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
      mixer = new three.AnimationMixer(you);
      const clips = e.animations;

      // Play a certain animation
      // const clip = THREE.AnimationClip.findByName(clips, 'HeadAction');
      // const action = mixer.clipAction(clip);
      // action.play();

      // Play all animations at the same time
      clips.forEach(function(clip) {
          const action = mixer.clipAction(clip);
          action.play();
        });
    },function ( xhr ) {

      pbar.style.width = `${Math.ceil(xhr.loaded / xhr.total * 100)}%`
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded of car' );
    
    })
  }
}

var youl = new YOURS('car-img')
youl.loadCar()



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
  var anginc = 0.01
  var nity = 0.3
  var t = document.getElementById("T")
  var flyyou = document.querySelectorAll(".fly")
  console.log(e)
  
  if (you)
  { 
    
    if (!paused){if (e == "ArrowRight"){
      if (yourlaw.position.x >= lll){yourlaw.position.x = lll}else{
          if (fly){

          }else{
            if (yourlaw.quaternion.y >= nity){}else{yourlaw.quaternion.y += anginc}
          }
        yourlaw.position.x += leftspeed
      }
      if (fly){
        if (yourlaw.quaternion.z < 0){yourlaw.quaternion.z = 0}
        if (yourlaw.quaternion.z >= nity){}else{yourlaw.quaternion.z += anginc}
      }
    }else if(e == "ArrowLeft"){
      if (yourlaw.position.x <= Number(`-${lll}`)){yourlaw.position.x = Number(`-${lll}`)}else{
          if (fly){
            
          }else{
            if (yourlaw.quaternion.y <= Number(`-${nity}`)){}else{yourlaw.quaternion.y -= anginc}
          }
        yourlaw.position.x -= leftspeed
        
      }
      if (fly){
        if (yourlaw.quaternion.z > 0){yourlaw.quaternion.z = 0}
        if (yourlaw.quaternion.z <= Number(`-${nity}`)){}else{yourlaw.quaternion.z -= anginc}
      }
    }else{
      // yourlaw.quaternion.y = 0
    }
    if (e == "ArrowUp"){
      if (pspeed > lim){}else{
        pspeed += 1
        sp = false
      }
    }
    else if (e == "ArrowDown"){
      sp = true
    }
    }if (e == " " || e == "p"){
      topause(!paused) 
      console.log(paused);   
      playclick()
    }
    if (e.toLowerCase() == "x"){
      Recoil()
    }

    var el
    el = document.getElementById(youl.getCurrentCar())

    
    if (el.classList.contains("fly")){
      t.classList.remove("none")
      if (e.toLowerCase() == "t"){
      fly = !fly
      playclick()
      console.log("fly: ",fly);

      }
    }else{
      t.classList.add("none")
      fly = false
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

  if (fly){
    anginc = 0.015
    t.style.backgroundColor = "rgb(0, 77, 98)"
  }else{
    anginc = 0.01
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


function AntiGlitch(){
  if (yourlaw && you){
    if (yourlaw.position.x >= lll){
      yourlaw.position.x = lll
    }
    if (yourlaw.position.x <= Number(`-${lll}`)){
      yourlaw.position.x = Number(`-${lll}`)
    }
    if (yourlaw.position.z > yi){
      yourlaw.position.z = yi
    }
    /* console.log("yourlaw.quaternion.y:",yourlaw.quaternion.y)
    console.log("yourlaw.quaternion.x:",yourlaw.quaternion.x)
    console.log("yourlaw.quaternion.z:",yourlaw.quaternion.z)
    console.log("yourlaw.position.y:",yourlaw.position.y)
    console.log("yourlaw.position.x:",yourlaw.position.x)
    console.log("yourlaw.position.z:",yourlaw.position.z) */
    if (yourlaw.position.y < -200 || yourlaw.position.y > 1220 ){
    yourlaw.position.y = 0
    fly = false
    yourlaw.mass = 10
  }

  }
}

function animate(){
  requestAnimationFrame(animate)
  if(mixer)
    mixer.update(clock.getDelta());
  if (!paused){if(you){
    speed = pspeed
  }}else{
  speed = 0
  }
  AntiGlitch()
  if (you){
    if (document.getElementById(youl.getCurrentCar()).classList.contains("fly")){
      document.getElementById("T").classList.remove("none")
    }else{
      document.getElementById("T").classList.add("none")
      fly = false
    }
    if (fly){
      airEnys.create()
      landEnys.delete()
      airEnys.incScore = true
      landEnys.incScore = false
      if (yourlaw.position.y < flymax){
        yourlaw.position.y += 10
        }else if (yourlaw.position.y > flymax){
          yourlaw.position.y = flymax
        }
      if (yourlaw.position.z > -600){
        yourlaw.position.z -= 1
        }
        yourlaw.mass = 0
        lim = 500
  }else{
    airEnys.delete()
    landEnys.create()
    airEnys.incScore = false
    landEnys.incScore = true
    if (yourlaw.position.y > 0){
      yourlaw.position.y -= 10
      
      }else if (yourlaw.position.y <= 0){
        yourlaw.mass = 10
      }
      // yourlaw.mass = 10
      lim = 50
  }

  scene.position.x = 1-yourlaw.position.x
   scene.position.z = 1-(yourlaw.position.z-(yi-100))
   scene.position.y = 1-(yourlaw.position.y+(ctop))
}
  // camera.position.z -= 3
  if (audio.paused && !ap){
    try{audio.play()}catch(DOMException){}
  }

  if (sp){
    if (pspeed <= 10 ){
      sp = false
      pspeed = 10
    }else{
      pspeed -= 1
    }
    console.log(speed);
    
  }
  if (speed > lim){
    speed -= 1
  }
  if (yourlaw){
    
    
    if (yourlaw.quaternion.z > 0){
      yourlaw.quaternion.z -= 0.002
    }else if (yourlaw.quaternion.z < 0){
      yourlaw.quaternion.z += 0.002
    }
    
    if (yourlaw.quaternion.y > 0){
      yourlaw.quaternion.y -= 0.001
    }else if (yourlaw.quaternion.y < 0){
      yourlaw.quaternion.y += 0.001
    }
  }
  groundlaw.position.z += speed
  if (groundlaw.position.z > l+1000){
    groundlaw.position.z = l
  }

  leftbs.UpdateBuildingZplus(speed)
  rightbs.UpdateBuildingZplus(speed)
  landEnys.Update()
  airEnys.Update()
  gemaEnys.Update()
  gemlEnys.Update()
  /* for(var i in bss){
    var g = bss[i]
    g.UpdateBuildingZplus(speed)
  } */

  for (var o in treeslaw){
    treeslaw[o].position.z += speed
  if (treeslaw[o].position.z > 0){
    treeslaw[o].position.z = 1-((((trees.length)*(treewidth+300))+treewidth))
  }
  updateObj(treeslaw[o],trees[o])
  }
  if(ana){
    var num = Math.ceil(ana.Scale(200,100))
    logo.style.width = num+"px"
    sun.intensity = Math.ceil(ana.Scale(300000000,10000000))
  }

  

  updateObj(groundlaw,ground)
  if (you)
    {updateObj(yourlaw,you)}

  control.update()
  law.step(1/60)
  
  display.render(world,camera)  
}

window.onresize = onresizeWin
onresizeWin()

var sp = false

window.addEventListener("keydown",e=>{
  controlCar(e.key)
})

animate()}


function SetRegularUser(Z1 = false){
  localStorage.setItem("HasEnteredBefore",Z1?"1":"0")
}

function GetRegularUser(){
 var hs = localStorage.getItem("HasEnteredBefore")
 if (!hs){
   SetRegularUser()
   hs = GetRegularUser()
 }
 console.log("REGULAR USER: ",hs);
 if (hs == "0"){
   return false
 }
 else{
   return true
 }
 
}
// SetRegularUser(false)
if (GetRegularUser()){
 ivw.classList.add("none")
 Main()
}else{
 ivw.onclick = e=>{playclick();introVid.play();ttc.classList.add("none")}

 introVid.onpause = function () {
   SetRegularUser(true)
   window.location.reload()
 }
}
document.querySelectorAll(".playclick").forEach(elt=>{
  elt.addEventListener("click",e=>{playclick()})
})
// document.body.addEventListener("keyup",playclick )
