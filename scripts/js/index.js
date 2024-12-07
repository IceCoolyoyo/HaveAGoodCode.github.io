var __awaiter=this&&this.__awaiter||function(e,n,r,l){return new(r=r||Promise)(function(a,t){function s(e){try{o(l.next(e))}catch(e){t(e)}}function i(e){try{o(l.throw(e))}catch(e){t(e)}}function o(e){var t;e.done?a(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t)})).then(s,i)}o((l=l.apply(e,n||[])).next())})},__setFunctionName=this&&this.__setFunctionName||function(e,t,a){return"symbol"==typeof t&&(t=t.description?"[".concat(t.description,"]"):""),Object.defineProperty(e,"name",{configurable:!0,value:a?"".concat(a," ",t):t})};import Setting from"./classes/setting/Setting.js";import Message,{ballSays,processMessage}from"./classes/message/Message.js";import{DramaType}from"./classes/enum/Types.js";import{messages}from"./classes/constants/Constants.js";import MessageID from"./classes/message/MessageID.js";import KeyAnimation from"./classes/animation/KeyAnimation.js";import Doc from"./classes/doct/doct.js";import LocalStorageApi,{StorageType}from"./classes/localStorage/LocalStorageApi.js";import CodeFrame from"./classes/code_frame/code.js";import Question from"./classes/textbook/Question.js";import DirectoryManager from"./classes/directory/Directory.js";(()=>{var e;__setFunctionName(e=class{static click(t){return __awaiter(this,void 0,void 0,function*(){var e;KeyAnimation.canCountinue&&(messages.forEach((e,t)=>{e.type===DramaType.Ball&&null!==e.originalMessage&&e.originalMessage.includes(Setting.drama_time)&&(messages[t].obj=e.originalMessage.replace(Setting.drama_time,Message.getHelloMsg()))}),t||null!==(e=document.getElementById(Setting.illustrateID))&&e.remove(),yield processMessage(),window.localStorage.setItem("messageCount",MessageID.getID().toString()))})}static getDrama(){return __awaiter(this,void 0,void 0,function*(){for(var e=`@Ball:true為真，false為假
                        @Ball:電腦任何地方的真假表示都用這兩個東西替代
                        @Function:q4
                        @Ball:rev
                        @Function:q5
                            `.trim().split("\n"),t=0;t<e.length;t++)messages[t]=Message.createObjWithString(e[t].replace(/^\s+/,""))})}static restoreState(){return __awaiter(this,void 0,void 0,function*(){var a=MessageID.getID();if(0===a)yield processMessage();else{var s,i=a-1;if(i<0||i>=messages.length)throw new Error("Invalid currentMessageID");let e=messages[a],t=-1;for(let e=i;0<=e;e--)if(messages[e].type===DramaType.Ball){t=e;break}if(-1===t)throw new Error("No message with type DramaType.Ball found");if(e.type===DramaType.Ball){for(let e=t;e<a;e++)(s=messages[e]).type===DramaType.Function&&(yield s.obj());KeyAnimation.setObjAnimation(e.obj,ballSays)}else{for(let e=t;e<a;e++)(s=messages[e]).type===DramaType.Function&&(yield s.obj());KeyAnimation.setObjAnimation(messages[t].obj,ballSays,yield e.obj())}MessageID.addOne()}})}static initAll(){return __awaiter(this,void 0,void 0,function*(){yield this.getDrama(),this.eventHook(),this.spotifyInit(),DirectoryManager.main(),setTimeout(()=>{var e=document.getElementById(Setting.illustrateID);e&&(e.style.animation="fade 2s linear 0s",e.style.display="block")},6e3)})}static eventHook(){document.body.addEventListener("click",e=>{Question.timeStop&&(e.preventDefault(),e.stopPropagation())},!0),Doc.getElementById(Setting.ballFrameID).addEventListener("click",()=>__awaiter(this,void 0,void 0,function*(){return yield this.click(!1)})),document.getElementById("left").appendChild(Question.question_answer),document.getElementById("left").appendChild(CodeFrame.getCodeFrame())}static spotifyInit(){window.onSpotifyIframeApiReady=t=>__awaiter(this,void 0,void 0,function*(){var e=document.getElementById("spotify-iframe");let a={uri:"spotify:track:5vNRhkKd0yEAg8suGBpjeY"};t.createController(e,a,e=>{var t=LocalStorageApi.read(StorageType.MUSIC_TIME);null!==t&&e.loadUri(a.uri,!1,t),e.addListener("playback_update",e=>{LocalStorageApi.write(StorageType.MUSIC_TIME,parseInt(e.data.position,10)/1e3)}),e.play()}),yield this.restoreState()})}},"_"),e.initAll()})();