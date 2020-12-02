const SERVER_URL = "https://academy.directlinedev.com";
const VERSION_API = "1.0.0";
const body = document.querySelector("body");
const logout = document.querySelector(".logout_js");
let serverAnswer = false;
let isLoading = false;
let loader = false;


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
      if (input) {
        input.focus();
      }
    });
    closeButton.addEventListener("click", function (e) {
      e.preventDefault();
      modalClose(button, modal, form);
    });    
    window.addEventListener("keydown", function (e) {
      if (e.code === "Escape" && modal.classList.contains("show_js")) {
        if (serverAnswer === false) {
          modalClose(button, modal, form);
        } 
      }
    });   
  }   
}

function modalClose(button, modal, form) {
  form.reset();
  setFormClear(form);
  modal.classList.remove("show_js");
  body.classList.remove("overflow_js");  
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

// Preloaders

function preloaderCreator() {
	return `<div class="loader">
  <div class="loader__inner">
    <div class="loader__object"></div>
  </div>
</div>`;
}

function formPreloaderCreator() {
	return `<div class="loader-form">
  <div class="loader__inner">
    <div class="loader__object"></div>
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

function inputSuccess(input) {
  if (input.hasAttribute("isSuccess")) {
    return;
  }
  if (input.hasAttribute("isError")) {
    return;
  }  
  if (input.type !== "checkbox" && input.type !== "radio") {
    input.setAttribute("isSuccess", "");
    input.classList.add("modal__input_success");
    input.addEventListener("input", () => {
    input.classList.remove("modal__input_success");
    input.removeAttribute("isSuccess");
    });
  }  
}

function textSuccess(input) {
  if (input.hasAttribute("isSuccessText")) {
    return;
  }
  if (input.hasAttribute("isErrorText")) {
    return;
  } 
  if (input.type !== "checkbox" && input.type !== "radio") {
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
    } else if (input.hasAttribute("isSuccess")) {    
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
    if (Object.keys(errors).length === 0) {
      if (loader === false) {
        loader = true;
        messageForm.insertAdjacentHTML("beforeend", `<div class="preloader"></div>`);
        body.querySelector(".preloader").innerHTML = formPreloaderCreator();
      }
      sendMessage(e);
    } else {return}
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
		// console.log(newData);
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
				setTimeout(function () {
					modalClose(messageButton, messageModal, messageForm);
					sendResult(document.querySelector(".modal-success_js"));
				}, 2000);
			} else {
        setTimeout(function () {         
          let errors = {};      
          // errors.to = `${res._message}`;      
          errors.to = "This mail is already subscribed to the newsletter";
          sendResult(document.querySelector(".modal-error_js"), errors.to); 
          setFormClear(messageForm); 
          setFormErrors(messageForm, errors);
          messageForm.querySelector(".checkbox_js").checked = false;
				  throw res;
				}, 2000);        
			}
			isLoading = false;
		})
		.catch(err => {
				setFormErrors(e.target, err.errors);
				// console.error(err.errors);
			  isLoading = false;
		})
	}

  function validateData(data, errors = {}) {
		if(data.name === "") {
			errors.name = "Please enter your name";
		} else if(data.name.length < 2 || data.name.length >= 20) {
      errors.name = "Your name is not valid, check it";
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
    if(data.accept[0] !== "confirm") {
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
      const data = getFormData(e.target);
      const errors = validateData(data);
      setFormErrors(registerForm, errors);
      // console.log(errors);
      if (Object.keys(errors).length === 0) {
      if (loader === false) {
        loader = true;
        registerForm.insertAdjacentHTML("beforeend", `<div class="preloader"></div>`);
        body.querySelector(".preloader").innerHTML = formPreloaderCreator();        
      }
        registerUser(e);
      } else {return}
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
          setTimeout(function () {
            console.log("Пользователь создан: \n" + JSON.stringify(res.data, null, 2))  
            modalClose(registerButton, registerModal, registerForm);
            sendResult(document.querySelector(".modal-success_js"));
          }, 2000);
        } else {
          setTimeout(function () {
            let errors = {};      
            // errors.email = `${res.errors.email}`;      
            errors.email = "User with thit email is already registered"; 
            sendResult(document.querySelector(".modal-error_js"), errors.email);
            setFormClear(registerForm);        
            setFormErrors(registerForm, errors);
            registerForm.querySelector(".checkbox_js").checked = false;
            throw res;
          }, 2000);
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
      } else if(data.name.length < 2 || data.name.length >= 20) {
        errors.name = "Your name is not valid, check it";
      }
      if(data.surname === "") {
        errors.surname = "Please enter your surname";
      } else if(data.surname.length < 2 || data.surname.length >= 20) {
        errors.surname = "Your surname is not valid, check it";
      }      
      if (data.password === "") {
        errors.password = "Please enter your password";
      } else if(data.password.length < 8) {
        errors.password = "Your password is too short";
      }
      if(data.passwordRepeat !== data.password || data.passwordRepeat === "") {
        errors.passwordRepeat = "Please repeat your password correctly";
      }
      if(data.location === "") {
        errors.location = "Please enter your location";
      } else if(data.location.length < 2 || data.location.length >= 20) {
        errors.location = "Location name is not valid";
      }
      if(isNaN(data.age) || data.age === "") {
        errors.age = "Please enter your age";
      }
      if(data.accept[0] !== "confirm") {
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
    const data = getFormData(e.target);
    const errors = validateData(data);
    setFormErrors(loginForm, errors);
    if (Object.keys(errors).length === 0) {
      if (loader === false) { 
        loader = true;       
        loginForm.insertAdjacentHTML("beforeend", `<div class="preloader"></div>`);
        body.querySelector(".preloader").innerHTML = formPreloaderCreator();
      }
      loginUser(e);      
    } else {return}
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
        setTimeout(function () {
          updateToken(res.data);
          updateState(); 
          modalClose(loginButton, loginModal, loginForm);
          console.log("Вход выполнен, ID пользователя:" + res.data.userId);      
          window.location.pathname = "/pages/profile/index.html";
        }, 2000);
      } else {        
      setTimeout(function () {
        let errors = {};      
        // errors.email = `${res._message}`;      
        errors.email = "No user/password combination found";        
        errors.password = "Please, check your password";
        sendResult(document.querySelector(".modal-error_js"), errors.email);
        setFormClear(loginForm);        
        setFormErrors(loginForm, errors);
        throw res;      
      }, 2000);
      }
      isLoading = false;
    })
    .catch(err => {   
      isLoading = false;
    })
  }
  
  function validateData(data, errors = {}) {
    if(!checkEmail(data.email)) {
      errors.email = "Please enter a valid email adress";
    }
    if(data.password === "") {
      errors.password = "Please enter your password";
    } else if(data.password.length < 8) {
      errors.password = "Your password is too short, check it";
    }
    return errors;
    }
})(); 

//  Result of send form
function sendResult(modal, error = `The form was sent but the server transmits an error`) {
  serverAnswer = true;
  loader = false;
  body.querySelector(".preloader").remove();  
  modal.classList.add("show_js");
  let closeButton = modal.querySelector(".modal__close");  

  if (modal === document.querySelector(".modal-error_js")) {
    modal.querySelector(".postloader-text_js").innerText = `The form was sent but the server transmits an error: "${error}"`;
  }
  
  closeButton.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.remove("show_js");  
    serverAnswer = false;
  });
  window.addEventListener("keydown", function (e) {
    if (e.code === "Escape" && modal.classList.contains("show_js")) {
      modal.classList.remove("show_js");       
      setInterval(() => {      
        serverAnswer = false; 
      }, 2000);
    }
  });
}

