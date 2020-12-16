import React, { useState, useEffect, useRef } from "react";
import { grade } from "../MainPage";
import { level } from "../SpellLevel";
import { TextField } from "@material-ui/core";
import { Clear, Check } from "@material-ui/icons";
import Tooltip from "../../components/UIElements/CustomTooltip";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import speaker from "../../assets/speaker.png";
import useForm from "../../../src/utils/useForm";
import { useSpeechSynthesis } from "react-speech-kit";
import "./speechTotext.css";

const speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;
const mic = new speechRecognition();
mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";
const SpeechToText = () => {
  const [inputValue, handleChangeForInputs] = useForm();
  const [isListening, setisListening] = useState(false);
  const [check, setCheck] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [word, setWord] = useState("");
  const [count, setCount] = useState(0);
  const { speak } = useSpeechSynthesis();

  let wordTocompare = useRef("");

  useEffect(() => {
    nextBtnHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    handleListen();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening]);

  const handleListen = async () => {
    if (isListening) {
      mic.start();
      // mic.onend = () => {
      //   console.log("continue........");
      //   mic.start();
      // };
    } else {
      mic.stop();

      mic.onend = () => {
        console.log("finished");
      };

      mic.onstart = () => {
        console.log("mic is on");
      };
      mic.onresult = (event) => {
        console.log(Array.from(event.results));
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join(" ");
        console.log(typeof transcript);
        let arrayOfTranscript = transcript.split("");
        console.log(arrayOfTranscript);

        const letters = arrayOfTranscript.filter((letter) => letter !== " ");
        const finalWord = letters.join("");
        console.log(letters.join(""));

        setWord(finalWord.toUpperCase());
      };
      mic.onerror = (event) => {
        console.log(event.error);
      };
    }

    if (word !== null && !isListening) {
      try {
        const response = await fetch("http://localhost:5000/spell", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            word: word,
          }),
        });

        const responseData = await response.json();
        if (responseData) {
          console.log(responseData.spell + " im from response of handleListen");
        }
        if (responseData.status) {
          console.log(responseData.status);
        }
        // console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const clickHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/spell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spell: inputValue.spell,
        }),
      });

      const responseData = await response.json();
      if (responseData) {
        console.log("pokfkioerj " + responseData.spell);
        console.log("word to compare " + wordTocompare.current);
        if (wordTocompare.current === responseData.spell) {
          console.log("both words are equl");
          setCheck(() => true);
          setVisibility(() => true);
        } else {
          setCheck(() => false);
          setVisibility(() => true);
        }
      }
      // console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const speakHandler = async () => {
    console.log(count);
    try {
      const response = await fetch(
        `http://localhost:5000/word?grade=${grade}&level=${level}`
      );
      const responseData = await response.json();
      wordTocompare.current = responseData.text[count];
      speak({ text: responseData.text[count] });

      console.log(wordTocompare.current + ".................");
    } catch (err) {
      console.log(err);
    }
  };

  const nextBtnHandler = async () => {
    // console.log("from next btn" + count);

    try {
      const response = await fetch(
        `http://localhost:5000/word?grade=${grade}&level=${level}`
      );
      const responseData = await response.json();
      wordTocompare.current = responseData.text[count];
      speak({ text: responseData.text[count] });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(inputValue.spell);

  return (
    <div id="background">
      <div className="container">
        <div className="box">
          {/* <h2>{grade}</h2>
          <h2>{level}</h2> */}
          <div className="speaker" onClick={speakHandler}>
            <img src={speaker} alt="speaker" />
          </div>

          <div
            style={{
              float: "right",
              marginTop: "2rem",
              display: !visibility && "none",
            }}
          >
            {check ? (
              <Check style={{ color: "green" }} />
            ) : (
              <Clear style={{ color: "red" }} />
            )}
          </div>

          <form onSubmit={clickHandler}>
            <Tooltip title="please enter spellings in the text field or use microphone to speak out the spellings ">
              <TextField
                type="text"
                name="spell"
                label="Enter spellings"
                value={inputValue.spell || ""}
                onChange={handleChangeForInputs}
              />
            </Tooltip>
          </form>

          <button className="submitBtn" onClick={clickHandler}>
            submit
          </button>
          <button
            className="mic"
            onClick={() => setisListening((prevState) => !prevState)}
          >
            {!isListening ? <MicIcon /> : <MicOffIcon />}
          </button>
          <div>
            <button
              className="nextBtn"
              onClick={() => setCount((prevState) => prevState + 1)}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
