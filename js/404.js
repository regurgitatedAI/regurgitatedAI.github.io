// Copyright (c) 2021 by Cassie Evans (https://codepen.io/cassie-codes/pen/ZjErdL)

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");
const video = document.querySelector(".player");
const refreshRate = 1000;

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((webCam) => {
      video.srcObject = webCam;
      paintToCanvas();
    })
    .catch((err) => {
      console.error("Oh no, you denied the webcam, no fun for you.", err);
    });
}

function paintToCanvas() {
  canvas.width = 1;
  canvas.height = 1;

  setInterval(updateColour, refreshRate);
}

function updateColour() {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  let r = imageData.data[0];
  let g = imageData.data[1];
  let b = imageData.data[2];

  let rgb = `rgb(${r}, ${g}, ${b})`;

  let root = document.documentElement;

  root.style.setProperty("--colour-change", rgb);
}

window.addEventListener("load", getVideo);

// GSAP Animation
var tongueOut = MorphSVGPlugin.pathDataToBezier("#tongue", { align: "#blob" });
var eatFly = MorphSVGPlugin.pathDataToBezier("#tongue", { align: "#fly" });
var buzz = MorphSVGPlugin.pathDataToBezier("#flypath", { align: "#fly" });

function tongue() {
  var tongueOut = MorphSVGPlugin.pathDataToBezier("#tongue", {
    align: "#blob"
  });
  var tongue = new TimelineMax({ repeat: 1, yoyo: true });

  tongue
    .set(["#tongue", "#blob"], { autoAlpha: 1 }, 0)
    .to(
      "#blob",
      0.8,
      { bezier: { values: tongueOut, type: "cubic" }, ease: Expo.easeIn },
      0
    )
    .from("#tongue", 0.8, { drawSVG: "0%", ease: Expo.easeIn }, 0);
  return tongue;
}

function nomnom() {
  var nomnom = new TimelineMax({});
  nomnom
    .fromTo(
      "#chameleon",
      0.5,
      { yPercent: 0, rotation: "0" },
      {
        yPercent: -1,
        rotation: "-1",
        transformOrigin: "50% 40%",
        repeat: 1,
        yoyo: true,
        ease: Back.easeInOut.config(3),
        delay: 0.2
      }
    )
    .to("#mouth", 0.2, {
      yPercent: 2,
      rotation: "15",
      transformOrigin: "0% 90%",
      delay: -0.5
    })
    .fromTo(
      "#mouth",
      0.1,
      { yPercent: 0, rotation: "0" },
      {
        yPercent: 5,
        rotation: "5",
        transformOrigin: "0% 90%",
        repeat: 15,
        yoyo: true
      }
    )
    .to("#mouth", 0.1, {
      yPercent: 0,
      rotation: "0",
      transformOrigin: "0% 90%"
    })
    .to("#belly", 1.5, { scale: 1.03, ease: Expo.easeOut })
    .to("#belly", 1, { scale: 1, ease: Expo.easeOut });
  return nomnom;
}
function leaves() {
  var leaves = new TimelineMax({});
  leaves
    .staggerTo(
      ".topleaves",
      2,
      {
        rotation: "-2",
        transformOrigin: "90% 0%",
        ease: Elastic.easeOut.config(1.75, 0.5),
        delay: 0.8
      },
      0.2
    )
    .to(".topleaves", 5, { rotation: "0", ease: Power0.easeNone });
  return leaves;
}
function fly() {
  var fly = new TimelineMax({});
  fly
    .set("#fly", { xPercent: -50, yPercent: -50 })
    .to("#fly", 7, {
      bezier: { values: buzz, type: "cubic" },
      ease: Power0.easeNone
    })
    .to("#landingleaf", 0.8, {
      rotation: "-4",
      transformOrigin: "90% 0%",
      ease: Back.easeOut.config(4),
      delay: -0.1
    })
    .from("#fly", 0.8, {
      bezier: { values: eatFly, type: "cubic" },
      ease: Expo.easeOut,
      delay: 0.8
    })
    .to("#landingleaf", 0.8, {
      rotation: "0",
      transformOrigin: "90% 0%",
      ease: Back.easeOut.config(4),
      delay: -0.8
    })
    .to("#fly", 0.1, { autoAlpha: 0, delay: -0.1 });
  return fly;
}
function wingz() {
  var wingz = new TimelineMax({});
  wingz
    .fromTo(
      "#leftwing",
      0.03,
      { rotation: "0", opacity: 0.8 },
      {
        rotation: "40",
        opacity: 0.2,
        transformOrigin: "100% 100%",
        repeat: 270,
        yoyo: true,
        ease: RoughEase.ease.config({
          template: Power0.easeNone,
          strength: 0.2,
          points: 200,
          taper: "none",
          randomize: true,
          clamp: false
        })
      },
      0
    )
    .fromTo(
      "#rightwing",
      0.03,
      { rotation: "0", opacity: 0.8 },
      {
        rotation: "-40",
        opacity: 0.2,
        transformOrigin: "0% 100%",
        repeat: 270,
        yoyo: true,
        ease: RoughEase.ease.config({
          template: Power0.easeNone,
          strength: 0.2,
          points: 200,
          taper: "none",
          randomize: true,
          clamp: false
        })
      },
      0
    );
  return wingz;
}
function eye() {
  var eye = new TimelineMax({});
  eye.to("#eyeball", 9, {
    rotation: "120",
    transformOrigin: "50% 50%",
    delay: 2
  });
  return eye;
}

var masterTimeline = new TimelineMax({ repeat: 2, repeatDelay: 1 });
masterTimeline
  .set("#fly", { xPercent: -50, yPercent: -50, autoAlpha: 1 })
  .set("#blob", { xPercent: -50, yPercent: -50 })
  .add([fly(), wingz(), eye()])
  .add([nomnom(), tongue(), leaves()], "-=3.31");
