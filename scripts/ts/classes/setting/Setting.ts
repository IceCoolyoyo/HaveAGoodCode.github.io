export default class Setting {
    static ballID = Object.freeze('ball');
    static shadowID = Object.freeze('shadow');
    static ballFrameID = Object.freeze('frame');
    static lessonMediaID = Object.freeze('lesson-media');
    static ballSaysID = Object.freeze('text');
    static illustrateID = Object.freeze('Illustrate');

    static drama_fineSentence = Object.freeze('{goodMsg}');
    static drama_time = Object.freeze('{time}');

    static rollTag = Object.freeze('roll');
    static fadeInTag = Object.freeze('fadeIn');
    static jumpTag = Object.freeze('jump');

    static imageSrcFolder = Object.freeze('images/');

    static jumpAnimationOnceMS = Object.freeze(400);

    static goodMorning = "早安";
    static goodAfterNoon = "午安";
    static goodNight = "晚安";

    static fineSentenceAPI = 'https://api.github.com/zen';
}