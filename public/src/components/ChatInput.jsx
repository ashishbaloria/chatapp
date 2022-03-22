import React, { useEffect, useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { EditorState, Editor as DraftEditor } from "draft-js";
import RichEditor from "./RichEditor";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  const editorOnChange = (content) => {
    setEditorContent(content);
    // setEditorState(EditorState.getCurrentContent());
  };

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (event, emojiObject) => {
    let message = editorContent;
    message += emojiObject.emoji;
    setEditorContent(message);
  };

  const sendChat = (event) => {
    // event.preventDefault();
    // console.log(editorContent);
    if (editorContent.length > 0) {
      handleSendMsg(editorContent);
      editorContent("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>

      {
        <div className="input-container">
          {/* <DraftEditor
            className="editorInput"
            placeholder="Type your message here..."
            onChange={setEditorState}
            editorState={editorState}
            onClick={() => console.log("works")}
          /> */}

          <RichEditor handleChange={editorOnChange} />

          <button onClick={(e) => sendChat(e)}>
            <IoMdSend />
          </button>
        </div>
      }
      {/* <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="chats comes here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form> */}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    font-weight: bold;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;

    .editorInput {
      width: 90%;
      height: 90%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
