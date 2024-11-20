import Setting from"../setting/Setting.js";class BallAnimation{static remove(a){BallAnimation.objs.forEach(t=>t.classList.remove(a))}static add(a){BallAnimation.objs.forEach(t=>t.classList.add(a))}static jump(){BallAnimation.remove(Setting.rollTag),BallAnimation.add(Setting.jumpTag)}static roll(){BallAnimation.add(Setting.rollTag),BallAnimation.remove(Setting.jumpTag)}static normal(){BallAnimation.remove(Setting.rollTag),BallAnimation.remove(Setting.jumpTag)}static jumpOnce(){BallAnimation.jump(),setTimeout(()=>BallAnimation.normal(),2*Setting.jumpAnimationOnceMS+10)}}BallAnimation.objs=[document.getElementById(Setting.ballID),document.getElementById(Setting.shadowID)];export default BallAnimation;