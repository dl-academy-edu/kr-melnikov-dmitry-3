const prevPage = document.querySelector(".blog-previous-page-button_js");
const nextPage = document.querySelector(".blog-next-page-button_js");
const tagsBox = document.querySelector(".tags_js");
const postBox = document.querySelector(".posts_js");
const paginationBox = document.querySelector(".blog-pagination_js");
const links = document.querySelectorAll(".link_js");
const form = document.forms["filter"];
let data = {
	page: 0
};

(function () {	
	tagsBox.innerHTML = preloaderCreator();
	postBox.innerHTML = preloaderCreator();
	getPosts(getFormData(form));

	let xhr = new XMLHttpRequest();
	xhr.open("GET", `${SERVER_URL}/api/tags`);
	xhr.send();
	xhr.onload = function() {
		const response = JSON.parse(xhr.response);
		if(response.success) {
			tagsBox.innerHTML = "";
			for(let tag of response.data){
				tagsBox.innerHTML += tagCreator(tag);
			}
			const params = getParamsFromURL();
			setValueToForm(form, params);
		}else {
			console.log(response._message);
		}
	}
	xhr.onerror = function() {
		console.error("Произошла ошибка сервера")
	}

	form.addEventListener("submit", function(e){
		data.page = 0;
		getContent(e);
	})

	prevPage.addEventListener("click", (e) => {
		data.page--;
		getContent(e);
	})

	nextPage.addEventListener("click", (e) => {
		data.page++;
		getContent(e);
	})
})()

//Work with Forms and URL
	function getContent(e){
		e.preventDefault();

		postBox.innerHTML = preloaderCreator();
		let page = data.page || 0;
		data = getFormData(form);
		data.page = page;
		data.show = +data.show || 0;
		setParamsToURL(data);

		getPosts(data);
	}

function getPosts(params) {

	let url = new URL("http://evidens.com");

	if (!params.page) {
		params.page = 0;
	}
	if(params.tags){
		url.searchParams.set("tags", JSON.stringify(params.tags));
	}
	url.searchParams.set("v", VERSION_API);

	let filter = {};

	if (params.title) {
		filter.title = params.title
	}

	if (params.views) {
		let viewsValue = (params.views).split("-");
		filter.views = {$between: [viewsValue[0], viewsValue[1]]};
	}

	if (params.commentsCount.length !== 0) {
		let arr = [];
		params.commentsCount.forEach(el => {
			el.split("-").forEach(el => {arr.push(el);});
		});
		let commentsCountValue = {
			min: Math.min.apply(null, arr),
			max: Math.max.apply(null, arr)
		}
		filter.commentsCount = {$between: [commentsCountValue["min"], commentsCountValue["max"]]};
	}
	url.searchParams.set("filter", JSON.stringify(filter));

	let sort = ["id", "ASC"];
		if (params.sort) {
			sort[0] = params.sort;
		}
		
		url.searchParams.set("sort", JSON.stringify(sort));
		
		if (params.show) {
			url.searchParams.set("limit", JSON.stringify(+params.show));
		}

		url.searchParams.set("offset", JSON.stringify(+params.show * params.page));
	
	let xhr = new XMLHttpRequest();
	xhr.open("GET", `${SERVER_URL}/api/posts?${url.searchParams}`);
	xhr.send();
	xhr.onload = function () {
			const response = JSON.parse(xhr.response);
			if (response.success) {
				postBox.innerHTML = "";
				for (let card of response.data) {
					postBox.innerHTML += cardCreator(card);
					let posts = [...document.querySelectorAll(".blog__item")];
					let post = posts[posts.length - 1];
					let tagBox = post.querySelector('.cardTags_js');
					for (let tag of card.tags) {
						tagBox.innerHTML += cardTagCreator(tag);
					}
				}
				let count = response.count,
				index = 0;
				paginationBox.innerHTML = "";
				while(count - params.show > 0) {
					count -= params.show;
					const a = pageCreator(index, data, (e) => {
						getContent(e);
					});
					index++;
					paginationBox.insertAdjacentElement("beforeend", a);
				}
				const a = pageCreator(index, data, (e) => {
					getContent(e);
				});
				paginationBox.insertAdjacentElement("beforeend", a);

				let pagesList = [...paginationBox.querySelectorAll(".page-link_js")];
				
				if (data.page === 0){
					prevPage.setAttribute("disabled", "");
				}else{
					prevPage.removeAttribute("disabled");
				}
				if (data.page === pagesList.length - 1 || pagesList.length === 1){
					nextPage.setAttribute("disabled", "");
				}else{
					nextPage.removeAttribute("disabled");
				}
				
				let activeLink = paginationBox.querySelector(`.page_${data.page}`);
				
				activeLink.classList.add("blog__pagination__link_active");
				if (postBox.innerHTML === "") {
					postBox.innerHTML = noResultMessage();
					paginationBox.innerHTML = "";
					nextPage.setAttribute("disabled", "");
				}
			} else {
				console.error(response._message);
			}
		}
		xhr.onerror = () => console.error("Произошла ошибка сервера");
	}

function setParamsToURL(params = {}) {
  const keysArr = Object.keys(params);
  let url = new URL("http://evidens.com");
  for(let key of keysArr) {
    if(typeof params[key] === "object") {
      const arr = params[key];
      for(let item of arr) {
        url.searchParams.append(key, item);
      }
    } else {
      url.searchParams.append(key, params[key]);
    }
  }
  history.replaceState({}, document.title, url.search);
}

function getParamsFromURL() {
  const searchParams = new URL(window.location).searchParams;
  let params = {};
  if(searchParams.has("tags")) {
    params.tags = searchParams.getAll("tags");
  }
  if(searchParams.has("views")) {
    params.views = searchParams.get("views");
  }
  if(searchParams.has("commentsCount")) {
    params.commentsCount = searchParams.getAll("commentsCount");
  }
  if(searchParams.has("show")) {
    params.show = searchParams.get("show");
  }
  if(searchParams.has("sort")) {
    params.sort = searchParams.get("sort");
  }
  if(searchParams.has("search")) {
    params.search = searchParams.get("search");
  }
  if(searchParams.has("page")) {
    params.page = searchParams.get("page");
  }
  return params;
}

// Components

function tagCreator(tag) {
	return `
	<label class="filter__form__checkbox-label_tags">
		<input class="filter__form__checkbox hidden" type="checkbox" name="tags" id="checkTag${tag.id}" value="${tag.id}" checked>
		<span style="border-color: ${tag.color}" class="filter__form__checkbox-checker"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M2 6.75L5.91301 12.77C6.20128 13.2135 6.85836 13.1893 7.11327 12.7259L13.425 1.25" stroke="${tag.color}" stroke-width="2.5" stroke-linecap="round"/>
		</svg></span>
	</label>`;
}

function cardCreator(card) {
	return `
	<li class="blog__item">
		<div class="blog__item-content">
			<picture>
				<source srcset="${SERVER_URL}${card.photo.desktopPhotoUrl}", srcset="${SERVER_URL}${card.photo.desktop2xPhotoUrl}" 2x" media="(min-width: 800px)">
				<source srcset="${SERVER_URL}${card.photo.tabletPhotoUrl}, srcset="${SERVER_URL}${card.photo.tablet2xPhotoUrl} 2x" media="(min-width: 670px) and (max-width: 799px)">
				<source srcset="${SERVER_URL}${card.photo.mobilePhotoUrl}, srcset="${SERVER_URL}${card.photo.mobile2xPhotoUrl} 2x" media="(max-width: 669px)">
				<img class="blog__img" src="${SERVER_URL}${card.photo.desktopPhotoUrl}" alt="${card.title}">
			</picture>
			<div class="blog__description">
				<div class="blog__tags cardTags_js"></div>
				<div class="blog__info">
					<span class="blog__data text_small text_gray">${new Date(card.date).toLocaleDateString()}</span>
					<span class="blog__views text_small text_gray">${card.views} views</span>
					<span class="blog__comments text_small text_gray">${card.commentsCount} comments</span>
				</div>
				<h3 class="blog__title h3">${card.title}</h3>
				<p class="blog__text text">${card.text}</p>
				<a class="blog__link text text_bold" href="#">Go to this post</a>
			</div>
		</div>
	</li>`;
}

function cardTagCreator(tag) {
  return `<span class="blog__tag" style="background-color: ${tag.color}"></span>`;
}

function noResultMessage () {
  return `
  <li class="blog__item"><p class="blog__message h1">No matching search results</p></li>
  `
}

function pageCreator(index, data, onclick) {
  let li = document.createElement("li");
  li.classList.add("blog__pagination-item");
  let a = document.createElement("a");
	a.setAttribute("href", `?page=${+index+1}`);
	a.classList.add("blog__pagination__link", "text", "text_bold", "page-link_js", `page_${+index}`);
  a.addEventListener("click", (e) => {
    e.preventDefault();
    data.page = index;
		onclick(e);
  })
	a.innerText = +index + 1;
	li.insertAdjacentElement("beforeend", a);
  return li;
}






