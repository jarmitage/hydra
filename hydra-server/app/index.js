const PatchBay = require('./src/pb-live.js')
const HydraSynth = require('../hydra-synth')
const Editor = require('./src/editor.js')
const Canvas = require('./src/canvas.js')
const loop = require('raf-loop')
const P5  = require('./src/p5-wrapper.js')
const Gallery  = require('./src/gallery.js')
const Menu = require('./src/menu.js')

function init () {
  window.pb = pb
  window.P5 = P5

  // ------------------------------------------------------------------------
  //  Begin custom 1
  // ------------------------------------------------------------------------

  window.p1 = new P5()
  p1.pixelDensity(1)
  p1.hide()

  // add lyrics to global context
  window.lyrics = {}
  fetch('../json/lyrics.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      window.lyrics = data;
      console.log('lyrics.json',window.lyrics)
    });

  // add song sections to global context
  window.sections = {}
  fetch('../json/sections.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      window.sections = data;
      console.log('sections.json',window.sections)
    });

  window.videos = {}
  fetch('../json/videos.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      window.videos = data;
      console.log('videos.json',window.videos)
    });


  window.getLyricAtTime = (time, offset=0) => {
    let text = ""
    let offsetTime = time + offset
    for (var i = 0; i < lyrics.length; i++)
      if (lyrics[i].start < offsetTime && offsetTime < lyrics[i].end)
        text = lyrics[i].text;
    return text;
  }

  window.addVideo = (video) => {
    vid = document.createElement('video')
    vid.loop = true
    vid.muted = true
    vid.src = '../vid/'+video+'.mp4'
    return vid
  }

  snd = document.createElement('audio')
  snd.loop = true
  snd.src = '../snd/offer.wav'
  window.snd = snd

  window.subsRect = {'x':p1.windowWidth*0.05,'y':p1.windowHeight*0.8,'w':p1.windowWidth*0.9, 'h':100}

  // ------------------------------------------------------------------------
  //  End custom 1
  // ------------------------------------------------------------------------

  // initialize elements
  var canvas = Canvas(document.getElementById('hydra-canvas'))
  canvas.size()
  var pb = new PatchBay()
  var hydra = new HydraSynth({ pb: pb, canvas: canvas.element, autoLoop: false })
  var editor = new Editor()
  var menu = new Menu({ editor: editor, hydra: hydra})

  // ------------------------------------------------------------------------
  //  Begin custom 2
  // ------------------------------------------------------------------------

  s1.init({src: p1.canvas})
  window.subs = s1

  p1.draw = () => {
    p1.clear();
    p1.textSize(66);
    p1.textAlign(p1.CENTER);
    p1.strokeWeight(0);
    p1.fill(1,0,0,127);
    p1.rect(subsRect.x,subsRect.y,subsRect.w,subsRect.h);
    p1.fill(255);
    p1.text(getLyricAtTime(snd.currentTime), p1.windowWidth/2, subsRect.y);
  }

  window.loadVideo = (video) => {
    window.snd.pause()
    window.snd.currentTime = 0
    window.vidSrc = addVideo(video)
    s0.init({src: window.vidSrc})
    window.vid = s0
  }

  window.setTime = (time=0,offset=0) => {
    window.snd.currentTime = time
    window.vidSrc.currentTime = time + offset
  }

  window.play = () => {
    window.snd.play()
    window.vidSrc.play()
  }

  window.pause = () => {
    window.snd.pause()
    window.vidSrc.pause()
  }

  window.sin = (min=0,max=1,freq=1) => ({time}) => Math.sin(time*freq) * max + min
  window.sq = (min=0,max=1,freq=1) => ({time}) => ((Math.sin(time*freq) < 0) ? 0 : 1) * max + min
  window.saw = (min=0,max=1,freq=1) => ({time}) => (((time * freq) % 1) * 2 - 1) * max + min 
  window.rand = (min=0,max=1) => Math.random() * max + min
  window.run = (end,step=1,direction=1) => {
    const len = Math.floor(end / step) + 1
    if (direction === 1)
        return Array(len).fill().map((_, idx) => (idx * step))  
    else if (direction === 0)
        return Array(len).fill().map((_, idx) => (idx * step)).reverse()
  }

  // ------------------------------------------------------------------------
  //  End custom 2
  // ------------------------------------------------------------------------

  // get initial code to fill gallery
  // var sketches = new Gallery(function(code, sketchFromURL) {
  //   editor.cm.setValue(code)
  //   editor.evalAll()
  //   editor.saveSketch = (code) => {
  //     sketches.saveSketch(code)
  //   }
  //   editor.shareSketch = menu.shareSketch.bind(menu)
  //   // if a sketch was found based on the URL parameters, dont show intro window
  //   // if(sketchFromURL) {
  //   //   menu.closeModal()
  //   // } else {
  //   //   menu.openModal()
  //   // }
  // })
  // menu.sketches = sketches

  // define extra functions (eventually should be added to hydra-synth?)

  // hush clears what you see on the screen
  window.hush = () => {
    solid().out()
    solid().out(o1)
    solid().out(o2)
    solid().out(o3)
    render(o0)
  }


  pb.init(hydra.captureStream, {
    server: window.location.origin,
    room: 'iclc'
  })

  var engine = loop(function(dt) {
    hydra.tick(dt)
  }).start()

}

window.onload = init
