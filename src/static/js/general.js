const SERVER_URL = "https://academy.directlinedev.com";
const VERSION_API = "1.0.0";
const body = document.querySelector("body");
const logout = document.querySelector(".logout_js");
let isLoading = false;

updateState(); 

// Mobile menu
(function () {
  let buttonOpenMenu = document.querySelector(".button-open-menu_js"),
    buttonCloseMenu = document.querySelector(".button-close-menu_js"),
    header = document.querySelector(".header_js");

  buttonOpenMenu.addEventListener("click", function () {
    body.classList.add("overflow_js");
    header.classList.add("header__mobile-open");
  });

  buttonCloseMenu.addEventListener("click", function () {
    body.classList.remove("overflow_js");
    header.classList.remove("header__mobile-open");
  });
})();

// Modal Windows
function modalOpen(button, modal, form) {
  if (button && modal) {
    let closeButton = modal.querySelector(".modal__close");
    let input = modal.querySelector(".modal__input");
    button.addEventListener("click", function () {
      modal.classList.add("show_js");
      body.classList.add("overflow_js");
      input.focus();
    });
    closeButton.addEventListener("click", function (e) {
      e.preventDefault();
      modalClose(button, modal, form);
    });
    window.addEventListener("keydown", function (e) {
      if (e.code === "Escape" && modal.classList.contains("show_js")) {
        modalClose(button, modal, form);
      }
    });
  }   
}

function modalClose(button, modal, form) {
  modal.classList.remove("show_js");
  body.classList.remove("overflow_js");
  form.reset();
  setFormClear(form);
  button.focus();
}

// To top
(function () {
  const button = document.querySelector(".button-to-top_js");
  if (!button) {
    return
  }

  function userScroll() {
    if (window.pageYOffset > 1500) {
      if (!button.classList.contains("show_js")) {
        button.classList.add("show_js");
        button.removeAttribute("tabindex", "-1")
      }
    } else {
      if (button.classList.contains("show_js")) {
        button.classList.remove("show_js");
        button.setAttribute("tabindex", "-1")
      }
    }
  }

  function userClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  window.addEventListener("scroll", userScroll);
  button.addEventListener("click", userClick)
})();

// User's Token
function fetchData({method = "get", url = "", headers = {}, body = null}) {
	return fetch(SERVER_URL + url, {
		method: method,
		body: body,
		headers: headers
	})
}

function updateToken({token, userId}) {
	localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
}

function updateState() {
  const header = document.querySelector(".header"),
  login = header.querySelector(".signin_js"),
	register = header.querySelector(".register_js"),
  profile = header.querySelector(".profile_js");

	if (localStorage.getItem("token")) {
		login.classList.add("hidden");
		register.classList.add("hidden");
		profile.classList.remove("hidden");
		logout.classList.remove("hidden");
	} else {
		login.classList.remove("hidden");
		register.classList.remove("hidden");
		profile.classList.add("hidden");
		logout.classList.add("hidden");
	}
}

logout.addEventListener("click", () => {
  logoutUser();
  updateState(); 
});

function logoutUser() {
	localStorage.removeItem("token");
	localStorage.removeItem("userId");
}

// Check Accept in forms
function checkAccept(form) {
  const checkbox = form.querySelector(".checkbox_js");
  if(!checkbox){return};
  const button = form.querySelector(".send_js");

  checkbox.addEventListener("change",(e) => {
    if(!checkbox.checked) {
      button.setAttribute("disabled", "");
    } else {
      button.removeAttribute("disabled");
    }
  })
};

// Preloader

function preloaderCreator() {
	return `<div class="loader-wrapper">
  <div class="loader">
    <div class="loader-line"></div>
  </div>
</div>`;
}

// Validation 
function checkEmail(email) {
  return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

function checkTelephone(telephone) {
  return telephone.match(/^(\s*)?(\+)?([-_():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
}

function inputError(input, button) {
  if (input.hasAttribute("isError")) {
    return;
  }
  input.setAttribute("isError", "");
  input.classList.add("modal__input_error");
  input.addEventListener("input", () => {
    input.classList.remove("modal__input_error");
    input.removeAttribute("isError");      
  if (button.classList.contains("button_bad")){
    button.classList.remove("button_bad");
  }
  });
}

function inputSuccess(input) {
  if (input.hasAttribute("isSuccess")) {
    return;
  }
  input.setAttribute("isSuccess", "");
  input.classList.add("modal__input_success");
  input.addEventListener("input", () => {
    input.classList.remove("modal__input_success");
    input.removeAttribute("isSuccess");
  });
}

function textSuccess(input) {
  if (input.hasAttribute("isSuccessText")) {
    return;
  }
  input.setAttribute("isSuccessText", "");
  const message = document.createElement('span');
  message.classList.add('modal-text_js', 'modal__text', 'modal__text_success', 'text_small');
  message.innerText = "All right";
  input.insertAdjacentElement("afterend", message);
  input.addEventListener("input", () => {
    message.remove();
    input.removeAttribute("issuccessText");
  });
}

function textError(input, error) {
  if (input.hasAttribute("isErrorText")) {
    return;
  }
  input.setAttribute("isErrorText", "");
  const message = document.createElement('span');
  message.classList.add('modal-text_js', 'modal__text', 'modal__text_error', 'text_small');
  message.innerText = error;
  input.insertAdjacentElement("afterend", message);
  input.addEventListener("input", () => {
    message.remove();
    input.removeAttribute("isErrorText");
  });
}

// set&get Data to/from Forms
function setFormErrors(form, errors) {
  let inputs = form.querySelectorAll("input");
  let button = form.querySelector(".modal__button");
  for (let input of inputs) {
    if (errors[input.name] && input.type !== "checkbox" && input.type !== "radio") {
      inputError(input, button);
      textError(input, errors[input.name]);
    }
    if (!errors[input.name]) {
      inputSuccess(input);
      textSuccess(input);
    }
  }
    let inputsError = [];
    inputsError = [...form.querySelectorAll(".modal__input_error")];
      if(inputsError.length === 0){
        button.classList.add("button_good");
      } else {
        button.classList.add("button_bad");
      } 
}

function setFormClear(form) {
  let inputs = form.querySelectorAll("input");
  let messages = form.querySelectorAll(".modal-text_js");
  let button = form.querySelector(".modal__button");
  if (!messages){return};
  for (let input of inputs) {    
    if (input.hasAttribute("isError")) {    
      input.classList.remove("modal__input_error");
      input.removeAttribute("isError");  
      input.removeAttribute("isErrorText");
    }
    if (input.hasAttribute("isSuccess")) {    
      input.classList.remove("modal__input_success");
      input.removeAttribute("isSuccess");  
      input.removeAttribute("issuccessText");
    }
  }
  for (let message of messages) {   
    message.remove();
  }  
  if (button.classList.contains("button_bad")){
    button.classList.remove("button_bad");
  }
  if (button.classList.contains("button_good")){
    button.classList.remove("button_good");
  }  
  (function () {
    let send = form.querySelector(".send_js"); 
  if(!send) {
    return
  }else{    
    send.setAttribute("disabled", "");
  }         
  })();                     
}

function getFormData(form, data = {}, type = 'json') {
  if (type === 'json') {
    let inputs = form.querySelectorAll("input");
  for (let input of inputs) {
    switch (input.type) {
      case "radio":
        if (input.checked) {
          data[input.name] = input.value;
        }
        break;
      case "checkbox":
        if (!data[input.name]) {
          data[input.name] = [];
        }
        if (input.checked) {
          data[input.name].push(input.value);
        }
        break;
      case "file":
        data[input.name] = input.files;
        break;
      default:
        data[input.name] = input.value;
        break;
    }
  }
  let textareas = form.querySelectorAll("textarea");
  for (let textarea of textareas) {
    data[textarea.name] = textarea.value;
  }
  return data;
  }  else {
    return new FormData(form);
  }
}

function setValueToForm(form, data) {
  let inputs = form.querySelectorAll("input");
  for(let input of inputs) {
    switch(input.type) {
      case "radio":
        if (data[input.name] === input.value) {
          input.checked = true;
        }
        break;
      case "checkbox":
        if(data[input.name] && data[input.name].includes(input.value)) {
          input.checked = true;
        }
        break;
      default:
        if(data[input.name]) {
          input.value = data[input.name];
        }
        break;
    }
  }
  return data;
}

//  Send Message
(function(){
  const messageButton = document.querySelector(".message_js");
  const messageModal = document.querySelector(".modal-message_js");
  const messageForm = document.forms["message"];
  if(!messageButton || !messageModal || !messageForm){return};
  
  modalOpen(messageButton, messageModal, messageForm); 

  messageButton.addEventListener("click", function (e) {
    e.preventDefault();
    checkAccept(messageForm);
  });

	messageForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const data = getFormData(e.target);
		const errors = validateData(data);
		setFormErrors(messageForm, errors);
    // console.log(errors);
    sendMessage(e);
	})

	function sendMessage(e) {
		e.preventDefault();
		if (isLoading) {
			return;
		}
		isLoading = true;
		const data = getFormData(e.target);
		let newData = {
			to: data.to,
			body: JSON.stringify(data)
		}
		console.log(newData);
		fetchData({
			method: "POST",
			url: "/api/emails",
			body: JSON.stringify(newData),
			headers: {
				"Content-Type": "application/json"
			},
		})
		.then(res => { return res.json(); })
		.then(res => {
			if (res.success) {
        console.log("Сообщение успешно отправлено");
        setTimeout(modalClose(messageButton, messageModal, messageForm), 2000);
			} else {
				throw res;
			}
			isLoading = false;
		})
		.catch(err => {
				// setFormErrors(e.target, err.errors);
				console.error(err.errors);
			  isLoading = false;
		})
	}

  function validateData(data, errors = {}) {
		if(data.name === "") {
			errors.name = "Please enter your name";
		}
		if(data.subject === "") {
			errors.subject = "Please enter a message subject";
		}
		if(!checkEmail(data.to)) {
			errors.to = "Please enter a valid email adress";
		}
		if(!checkTelephone(data.phone)) {
			errors.phone = "Please enter a valid phone number";
		}
    if(data.accept[0] !== "yes") {
      errors.accept = "You need to consent";
    }
		return errors;
	}
})();

// Registration User
(function(){
  const registerButton = document.querySelector(".register_js");
  const registerModal = document.querySelector(".modal-register_js");
  const registerForm = document.forms["register"];
    
    if(!registerButton || !registerModal || !registerForm){return};

    modalOpen(registerButton, registerModal, registerForm);

    registerButton.addEventListener("click", function (e) {
      e.preventDefault();
      checkAccept(registerForm);
    });
  
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // const data = getFormData(e.target);
      // const errors = validateData(data);
      // setFormErrors(registerForm, errors);
      // console.log(errors);
      registerUser(e);
    })

    function registerUser(e) {
      e.preventDefault();
      if(isLoading) {
        return;
      }
      isLoading = true;
      const data = getFormData(e.target);
      fetchData({
        method: "POST",
        url: "/api/users",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
          return res.json();
      })
      .then(res => {
        if (res.success){
          console.log("Пользователь создан: \n" + JSON.stringify(res.data, null, 2))
          setTimeout(modalClose(registerButton, registerModal, registerForm), 2000);
        } else {
          throw res;
        }
        isLoading = false;
      })
      .catch(err => {
        setFormErrors(e.target, err.errors);
        console.error(err.errors);
        isLoading = false;
      })
    }
  
    function validateData(data, errors = {}) {
      if(!checkEmail(data.email)) {
        errors.email = "Please enter a valid email adress";
      }
      if(data.name === "") {
        errors.name = "Please enter your name";
      }
      if(data.surname === "") {
        errors.surname = "Please enter your surname";
      }
      if(data.password.length < 8) {
        errors.password = "Your password too short";
      }
      if(data.passwordRepeat !== data.password || data.passwordRepeat === "") {
        errors.passwordRepeat = "Please repeat your password";
      }
      if(data.location === "") {
        errors.location = "Please enter your location";
      }
      if(isNaN(data.age) || data.age === "") {
        errors.age = "Please enter your age";
      }
      if(data.accept[0] !== "yes") {
        errors.accept = "You need to consent";
      }
      return errors;
    }
})();  

//  Login User
(function(){
  const loginButton = document.querySelector(".signin_js");
  const  loginModal = document.querySelector(".modal-signin_js");
  const loginForm = document.forms["signin"];

  if(!loginButton || !loginModal || !loginForm){return};
  
  modalOpen(loginButton, loginModal, loginForm);
  
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // const data = getFormData(e.target);
    // const errors = validateData(data);
    // setFormErrors(loginForm, errors);
    // console.log(errors);
    loginUser(e);
  })

function loginUser(e) {
  e.preventDefault();
  if(isLoading) {
    return;
  }
  isLoading = true;
  const data = getFormData(e.target);
  fetchData({
    method: "POST",
    url: "/api/users/login",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(res => {
    if (res.success){
      updateToken(res.data);
      updateState(); 
      console.log("Вход выполнен, ID пользователя:" + res.data.userId);
      setTimeout(modalClose(loginButton, loginModal, loginForm), 2000);
    } else {
      throw res;
    }
    isLoading = false;
  })
  .catch(err => {
    setFormErrors(e.target, err.errors);
    console.error(err.errors);
    isLoading = false;
  })
}
  
  function validateData(data, errors = {}) {
    if(!checkEmail(data.email)) {
      errors.email = "Please enter a valid email adress";
    }
    if(data.password === "") {
      errors.password = "Please enter your password";
    }
    return errors;
    }
})(); 

