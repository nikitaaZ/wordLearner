let words = {
	arr: []
};
let CurWor = "";
let isWord = false;
let Sound = true;

if (localStorage.WORDS) {
	words = JSON.parse(localStorage.WORDS);
}

if(localStorage.Sound) {
	Sound = localStorage.Sound;
}

function SoundOff(){
	Sound = false;
	localStorage.Sound = false;
}

function SoundOn(){
	Sound = true;
	localStorage.Sound = true;
}

function GetRandomWord() {
	let WordArea = document.getElementsByClassName("current-word")[0];
	let RandomNum = randomInteger(0, 1);
	let RandomWor = words.arr[randomInteger(0, words.arr.length - 1)];
	if (RandomWor === undefined) {
		WordArea.innerHTML = "Словарь пуст!";
	} else {
		if (RandomNum) {
			//мы берем само слово
			WordArea.innerHTML = RandomWor;
			isWord = true;
		} else {
			//мы беерм перевод слова
			WordArea.innerHTML = words[RandomWor];
			isWord = false;
		}
		CurWor = RandomWor;
	}
	return null;
}

function randomInteger(min, max) {
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}



function PushWord(word, translate) {
	words[word] = translate;
	words.arr.push(word);
	localStorage.WORDS = JSON.stringify(words);
	document.getElementsByClassName("new-word-input")[0].value = "";
	document.getElementsByClassName("new-translate-input")[0].value = "";
	RefreshDictionary();
}

function DelWord(word) {
	delete words[word];
	delete words.arr[words.arr.indexOf(word)];
	words.arr = SortArray(words.arr);
	localStorage.WORDS = JSON.stringify(words);
	RefreshDictionary();
}


function SortArray(origin) {
	let result = [];
	for (var i = 0; i < origin.length; i++) {
		if (origin[i] !== null && origin[i] !== undefined) {
			result.push(origin[i])
		}
	}
	return result;
}


function TestWords(word, translate) {
	if (!!word && !!translate) {
		return true;
	} else {
		alert("Нафига ты оставил пустое поле??");
		return false;
	}
}

function RefreshDictionary() {
	let dictionary = document.getElementsByClassName("dictionary")[0];
	dictionary.innerHTML = "";
	for (key in words) {
		if (key !== "arr") {
			dictionary.innerHTML += "<li>" + key + " &#8212 " + words[key] + '<img src="cross.png" class=" ' + key + ' delcross">' + "</li>";
		}
	}
	for (let i = 0; i < document.getElementsByClassName("delcross").length; i++) {
		document.getElementsByClassName("delcross")[i].onclick = function () {
			DelWord(this.classList.value.replace("delcross", "").trim());
		}
	}
}

document.getElementsByClassName("start-button")[0].onclick = function () {
	document.getElementsByClassName("current-word-input")[0].style.display = "inline-block";
	document.getElementsByClassName("start-button")[0].style.display = "none";
	document.getElementsByClassName("word-submit-button")[0].style.display = "inline-block";
	document.getElementsByClassName("newWord")[0].style.display = "inline-block";
	GetRandomWord();
}


document.getElementsByClassName("add-button")[0].onclick = function () {
	let word = document.getElementsByClassName("new-word-input")[0].value.toLowerCase().trim();
	let translate = document.getElementsByClassName("new-translate-input")[0].value.toLowerCase().trim();
	if (TestWords(word, translate)) {
		PushWord(word, translate)
	}
}

document.getElementsByClassName("newWord")[0].onclick = function () {
	GetRandomWord();
}

document.getElementsByClassName("DelWords")[0].onclick = function () {
	let isDel = confirm("Вы уверенны что хотите удалить весь словарь?");
	if (isDel) {
		words = {
			arr: []
		};
	}
	localStorage.WORDS = JSON.stringify(words);
	RefreshDictionary();
}

document.getElementsByClassName("word-submit-button")[0].onclick = function () {
//	let word = document.getElementsByClassName("current-word")[0];
	let utranslate = document.getElementsByClassName("current-word-input")[0].value.toLocaleLowerCase().trim();
	if (isWord){
		if(utranslate === words[CurWor]){
			document.getElementsByClassName("current-word-input")[0].value = "";
			GetRandomWord();
			if(Sound){GoodSound()};
//			do{
//				GetRandomWord();
//			}while(utranslate === words[CurWor]);
		}else{
			if(Sound){ErrSound()};
			document.getElementsByClassName("current-word-input")[0].style.background = "rgba(221, 22, 22, 0.7)";
			setTimeout(()=>{document.getElementsByClassName("current-word-input")[0].style.background = "none"},2000);
		}
	}else{
		if(utranslate === CurWor){
			document.getElementsByClassName("current-word-input")[0].value = "";
			GetRandomWord();
			if(Sound){GoodSound()};
//			do{
//				GetRandomWord();
//			}while(utranslate === CurWor);
		}else{
			if(Sound){ErrSound()};
			document.getElementsByClassName("current-word-input")[0].style.background = "rgba(221, 22, 22, 0.7)";
			setTimeout(()=>{document.getElementsByClassName("current-word-input")[0].style.background = "none"},2000);
		}
	}
}

document.getElementsByClassName("current-word-input")[0].onkeyup = function (e) {
	e = e || window.event;
	if (e.keyCode === 13) {
		document.getElementsByClassName("word-submit-button")[0].onclick();
	}
	// Отменяем действие браузера
	return false;
}

function GoodSound() {
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = 'good.mp3'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}

function ErrSound() {
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = 'err.mp3'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}

RefreshDictionary();
console.log("Привет, Ну и что ты тут забыл?)) давай ты не будешь смотреть код, потому что я знаю что он говно, окда?");