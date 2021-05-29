class BeatCreator {
  constructor() {
    this.beatPads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-audio");
    this.snareAudio = document.querySelector(".snare-audio");
    this.hihatAudio = document.querySelector(".hihat-audio");
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.slider = document.querySelector(".slider-bar");

    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    //this will  helps step in [0,9]
    let step = this.index % 10;

    //getting all Active bars
    const activeBars = document.querySelectorAll(`.beat${step}`);
    // console.log(activeBars);

    activeBars.forEach((bar) => {
      bar.style.animation = ` playTrack 0.3s alternate ease-in-out 2`;
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });

    this.index++;
  }

  changeAudio(selectedName, selectedValue) {
    switch (selectedName) {
      case "kick":
        this.kickAudio.src = selectedValue;
        break;
      case "sanre":
        this.sanreAudio.src = selectedValue;
        break;
      case "hihat":
        this.hihatAudio.src = selectedValue;
        break;
    }
  }

  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    // console.log(muteIndex);
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }

  changeSpeed(e) {
    this.bpm = e.target.value;
    const slidernr = document.querySelector(".slider-value");
    slidernr.innerText = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying=null;
    if(this.playBtn.classList.contains("active")){
      this.start();
    }
  }
  start() {
    //convert bpm into seconds
    //if bpm is low(like:30) beat get slow down and bpm is high(like:150) beats speed increase
    const intervel = (60 / this.bpm) * 1000;

    //checking it is already playing or not
    if (!this.isPlaying) {
      //adding class of active and text to stop
      this.playBtn.classList.add("active");
      this.playBtn.innerText = "Stop";
      //arrow fn helps us to refer in this object
      //setIntevel is fn(method) setIntervel(fn,time(in ms))
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, intervel);
    } else {
      //removing class of active and text to play
      this.playBtn.classList.remove("active");
      this.playBtn.innerText = "Play";
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
}

const firstBeat = new BeatCreator();

// Event listener

// // If we do below code on that case this keyword in repeat method refer to the PLAY Btn...
// firstBeat.playBtn.addEventListener("click",firstBeat.repeat())
firstBeat.playBtn.addEventListener("click", () => {
  firstBeat.start();
});

firstBeat.beatPads.forEach((pad) => {
  pad.addEventListener("click", firstBeat.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

firstBeat.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    //passing which tune to change(like:kick,snare or hihat) and which value want to play(like:kick-acoustic,or 808)
    firstBeat.changeAudio(e.target.name, e.target.value);
  });
});

firstBeat.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    //passing which tune to change(like:kick,snare or hihat) and which value want to play(like:kick-acoustic,or 808)
    firstBeat.mute(e);
  });
});

firstBeat.slider.addEventListener("change", function (e) {
  firstBeat.changeSpeed(e);
});
