
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Dsc_Oh from './Sounds/Dsc_Oh.mp3'
import heater1 from './Sounds/Heater-1.mp3'
import Heater2 from './Sounds/Heater-2.mp3'
import Heater3 from './Sounds/Heater-3.mp3'
import Heater41 from './Sounds/Heater-4_1.mp3'
import Heater6 from './Sounds/Heater-6.mp3' 
import Kick_n_Hat from './Sounds/Kick_n_Hat.mp3' 
import RP4_KICK_1 from './Sounds/RP4_KICK_1 (1).mp3'
import Cev_H2 from './Sounds/Cev_H2.mp3'

const keysAndSounds = [
  {letter: "Q", value: Dsc_Oh, name:"Dsc_Oh"},
  {letter: "W", value: heater1, name:"Heater1"},
  {letter: "E", value: Heater2, name:"Heater2"},
  {letter: "A", value: Heater3, name:"Heater3"},
  {letter: "S", value: Heater41, name:"Heater41"},
  {letter: "D", value: Heater6, name:"Heater6"},
  {letter: "Z", value: Kick_n_Hat, name:"Kick_n_Hat"},
  {letter: "X", value: RP4_KICK_1, name:"RP4_KICK_1"},
  {letter: "C", value: Cev_H2, name:"Cev_H2"},
]


function App() {

  useEffect(() =>  {document.addEventListener("keydown", listenKeyDown)
    return function cleanupListener() {
    window.removeEventListener("keydown", listenKeyDown)
  }})

  
  
  const [musicName, setMusicName] = useState("♪");
  const [musicPlay, setMusicPlay] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [volume, setVolume] = useState(0.5)
  
  const listenKeyDown = (event) => {
    const sound = keysAndSounds.filter(sound => sound.letter === event.key.toUpperCase())
        if(sound.length > 0){
          playSound(event.key.toUpperCase(), sound[0].name)
        }
  }
  
  const playSound = (soundKey, name) => {
    const sound = document.getElementById(soundKey)
    if(sound) {
      sound.volume = volume; 
      sound.play();
      setMusicName(name)
      setTimeout(() => {
        setMusicName("♪")
      }, 500); 
      setMusicPlay(true)
    }
  }

  const padsKey = keysAndSounds.map(
    sound => <MusicKeys 
    musicIsPlaying = {musicPlay}
    soundKey = {sound.letter}
    playSound={playSound}
    music = {sound.value}
    name ={sound.name}
    disabled = {isDisable}
    />
  )


  return (
    <div className="App">
      <div id = "drum-machine">
        <div id = "controls-buttons-container">
          <Switch changeDisable =  {setIsDisable}  isDisable = {isDisable} />
          <Slider soundVolume = {volume} changeVolume = {setVolume}/>
        </div>
        <DisplaySound name = {musicName}/>
        <div id ="pads">
          {padsKey}
        </div>
      </div>
    </div>
  );
}

function Switch(props) {
  return(
    <label className="switch controls-button" >
          <input type="checkbox" onClick = {() => props.changeDisable(!props.isDisable)}/>
          <span className="slider round"> </span>
    </label>
  )
}

function Slider(props) {
  return (
    <div className="sound-slider-container controls-button">
            <input type="range" min="0" max="1" value={props.soundVolume} step='0.01' className="sound-slider" id="myRange" 
            onChange={event => {props.changeVolume(event.target.valueAsNumber)}}/>
    </div>
  )
}

function DisplaySound(props) {
  return(
    <div id="display">
      <p> {props.name} </p>
    </div>
  )
}

function MusicKeys(props) {


  return(
    <div>
      <button 
        className="drum-pad" 
        id={props.name + "button"} 
        onClick = {() => props.playSound(props.soundKey, props.name)}
        tabIndex = {0}
        disabled = {props.disabled}
      >
         {props.soundKey} 
          <audio 
            src = {props.music} 
            className = "clip" 
            id = {props.soundKey}>
          </audio>
      </button>
  </div>
  )
}

export default App;

