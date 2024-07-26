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

export {updateLaw,updateObj}