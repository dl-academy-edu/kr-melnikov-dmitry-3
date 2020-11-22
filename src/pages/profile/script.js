const profileImg = document.querySelector(".profile-img_js");
const profileName = document.querySelector(".profile-name_js");
const profileSurname = document.querySelector(".profile-surname_js");
const profileEmail = document.querySelector(".profile-email_js");
const profilePassword = document.querySelector(".profile-password_js");
const profileLocation = document.querySelector(".profile-location_js");
const profileAge = document.querySelector(".profile-age_js");
let user = {};

getUserData(); 

logout.addEventListener("click", () => {
	getUserData();
});

// Change password
(function(){
	const changePasswordButton = document.querySelector(".change-password_js");
	const  changePasswordModal = document.querySelector(".modal-change-password_js");
	const changePasswordForm = document.forms["change-password"];

	modalOpen(changePasswordButton, changePasswordModal, changePasswordForm);

	changePasswordForm.addEventListener("submit", (e) => {
		e.preventDefault();
		if(isLoading) {
			return;
		}
		isLoading = true;
		const token = localStorage.getItem('token');
		if (!token) {
			return window.location.pathname = "/index.html"		
		}
		const body = getFormData(e.target, {}, 'formData');
		const data = getFormData(e.target);
		const errors = validateData(data);
		setFormErrors(changePasswordForm, errors);
		fetchData({
			method: "PUT",
			body: body,
			url: `/api/users/`,
			headers: {
				'x-access-token': token,
			}
		})
		.then(res => res.json())
		.then(res => {
			if (res.success) {
				getUserData();
			} else {
				throw res;
			}
			isLoading = false;
		})	
		.catch(() => {
			console.error(`Error of change password of User${userId}`)
			// setFormErrors(e.target, err.errors);
			console.error(err.errors);
			isLoading = false;
		})	
		// .catch(err => {
		// 	// setFormErrors(e.target, err.errors);
		// 	console.error(err.errors);
		// 	isLoading = false;
		// })
	})

	function validateData(data, errors = {}) {
		if(data.oldPassword === "") {
			errors.oldPassword = "Your password is incorrect";
		}
		if(data.newPassword.length < 8) {
			errors.newPassword = "Your new password too short";
		}
		if(data.newPasswordRepeat !== data.newPassword || data.newPasswordRepeat === "") {
			errors.newPasswordRepeat = "Your password is incorrect";
		}
		return errors;
	}
})();

// Change User's Data
(function(){
	const changeDataButton = document.querySelector(".change-data_js");
	const	changeDataModal = document.querySelector(".modal-change-data_js");
	const changeDataForm = document.forms["change-data"];

	changeDataButton.addEventListener('click', () => {
		setValueToForm (changeDataForm, user)
	})

	modalOpen(changeDataButton, changeDataModal, changeDataForm);

	changeDataForm.addEventListener("submit", (e) => {
		e.preventDefault();
		// const data = getFormData(e.target);
		// const errors = validateData(data);
		// setFormErrors(changeDataForm, errors);
		// console.log(errors);
		changeUserData(e);
		modalClose(changeDataButton, changeDataModal, changeDataForm);
	})
	// function validateData(data, errors = {}) {
	// 	if(!checkEmail(data.email)) {
	// 		errors.email = "Please enter a valid email adress";
	// 	}
	// 	if(data.name === "") {
	// 		errors.name = "Please enter your name";
	// 	}
	// 	if(data.surname === "") {
	// 		errors.surname = "Please enter your surname";
	// 	}
	// 	if(data.location === "") {
	// 		errors.location = "Please enter your location";
	// 	}
	// 	if(isNaN(data.age) || data.age === "") {
	// 		errors.age = "Please enter your age";
	// 	}
	// 	return errors;
	// }
})();

//  Delete profile 

(function() {
	const deleteButton = document.querySelector(".delete-profile_js");
	const token = localStorage.getItem('token');
	const userId = localStorage.getItem("userId");

  deleteButton.addEventListener("click", (e) => {
		e.preventDefault();
		isLoading = true;
    fetchData({
      method: "DELETE",
      url: `/api/users/${userId}`,
      headers: {       
        "x-access-token": token, 
      }
		})
		.then(res => res.json())
		.then(res => {
			if (res.success){
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        console.log("User was successfully deleted");
        window.location.pathname = "/index.html";
      } else {
        throw console.log("Error of Delete User");
      }
			isLoading = false;
    })
  })
})();

// Choose a picture to profile
const avatarText = document.forms["change-data"].querySelector('.avatar-inner-text_js');
const closeButton = document.forms["change-data"].querySelector(".modal__close");
if (window.FileList && window.File) {
  document.querySelector('.avatar__input_js').addEventListener('change', e => {
    avatarText.innerText = '';
    for (const file of e.target.files) {
			avatarText.innerText = `${file.name}`;
		}
	});	
	document.forms["change-data"].addEventListener("submit", (e) => {
		e.preventDefault();
		avatarText.innerText = `Choose a picture...`;
	})
	closeButton.addEventListener("click", (e) => {
		e.preventDefault();
		avatarText.innerText = `Choose a picture...`;
	})
}

// Components

function getUserData() {
	const token = localStorage.getItem("token");
	const userId = localStorage.getItem("userId");
	if (!token || !userId) {
		return window.location.pathname = "/index.html"
	}
  fetchData({
    method: "GET",
    url: `/api/users/${userId}`
  })
  .then(res => res.json())
  .then(res => {
    if (res.success){
			user = res.data;
			refreshUserData(user);
    } else {
      throw res;
    }
  })
  .catch(err => {
    console.error(err);
		return window.location.pathname = "/index.html"
  })
}

function refreshUserData(user) {	
	let passwordLength = [],
	symbol = "*";
	for(let i = 1; i <= user.password.length; i++) {
		passwordLength.push(symbol);
	}
	profileImg.setAttribute("src", `${SERVER_URL}${user.photoUrl}`)
	profileName.innerText = user.name;
	profileSurname.innerText = user.surname;
	profileEmail.innerText = user.email;
	profilePassword.innerText = passwordLength.join('');
	profileLocation.innerText = user.location;
	profileAge.innerText = user.age;
}

function changeUserData(e) {
	e.preventDefault();
  if(isLoading) {
    return;
  }
	isLoading = true;
	const token = localStorage.getItem('token');
	if (!token) {
		return window.location.pathname = "/index.html"		
	}
	const body = getFormData(e.target, {}, 'formData');
	fetchData({
		method: "PUT",
		body: body,
		url: `/api/users/`,
		headers: {
			'x-access-token': token,
		}
	})
	.then(res => res.json())
  .then(res => {
		if (res.success) {
			getUserData();
		} else {
      throw res;
		}
		isLoading = false;
	})
	.catch(() => {
		console.error(`Error of change data of User`)
		setFormErrors(e.target, err.errors);
		console.error(err.errors);
		isLoading = false;
	})
}