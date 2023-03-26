import React, { useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import toast from "react-hot-toast";

const Login = () => {
  const [inputCaptchaValue, setInputCaptchaValue] = useState("");
  const [generatedCap, setGeneratedCaptcha] = useState("");
  const fonts = ["sans-serif", "monospace"];

  const generateCaptcha = () => {
    let value = btoa(Math.random() * 1000000000);
    value = value.substr(0, 5 + Math.random() * 5);
    setGeneratedCaptcha(value);
  };

  function generateCaptchaHtml() {
    let html = inputCaptchaValue
      .split("")
      .map((char) => {
        const rotate = -20 + Math.trunc(Math.random() * 30);
        const font = Math.trunc(Math.random() * fonts.length);
        return `
        <span
          style="transform: rotate(${rotate}turn) font-family: ${fonts[font]}">
          ${char}
        </span>
       `;
      })
      .join("");
    document.querySelector(".login-form .captcha .preview").innerHTML = html;
  }

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setInputCaptchaValue(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username } = e.target;
    const name = username.value;
    console.log(name);
    if (inputCaptchaValue === generatedCap) {
      toast.success(`Logging In! ${name}`);
    } else {
      toast.error("Invalid Captcha :(");
    }
  };

  const initCaptcha = () => {
    generateCaptcha();
    generateCaptchaHtml();
  };

  useEffect(() => {
    initCaptcha();
  }, []);

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <div className="form-title">Login</div>
      <div className="form-input">
        <label htmlFor="username">Username</label>
        <input type="text" id="username"></input>
      </div>
      <div className="form-input">
        <label htmlFor="password">Password</label>
        <input type="password" id="password"></input>
      </div>
      <div className="captcha">
        <label htmlFor="captcha-input">Enter Captcha</label>
        <div className="preview">{generatedCap}</div>
        <div className="captcha-form">
          <input
            type="text"
            className="captcha-input"
            placeholder="Enter Captcha here"
            onChange={handleChange}></input>
          <i className="captcha-refresh" onClick={initCaptcha}>
            <AiOutlineReload />
          </i>
        </div>
      </div>
      <div className="form-input">
        <button id="login-btn">Login</button>
      </div>
    </form>
  );
};

export default Login;
