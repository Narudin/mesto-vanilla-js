(function () {
  /*переменные */
  const list = document.querySelector(".places-list"); //  обявление переменной контейнера с карточками

  const buttonOpenForm = document.querySelector(".user-info__button"); // выбор кнопки открытия формы
  const popup = document.querySelector(".popup__popup-form"); // выбор формы перемення формы
  const formClouseButton = document.querySelector(".popup__close-form"); // переменная кнопки закрытия
  const form = document.forms.new; // переменная формы
  const popupButton = document.querySelector(".popup__button"); // переменная кнопки отправки в форме
  /*форма about */
  const formAbout = document.forms.about; // выбор формы о себе
  const buttonOpenFormAbout = document.querySelector(".user-info__edit-button"); // выбор кнопки открытия формы о
  const buttonCloseFormAbout = document.querySelector(".popup-about__close"); // выбор кнопки закрытия формы
  const aboutPopup = document.querySelector(".popup__popup-about"); //переменная формы информ
  const formAboutSubmit = document.querySelector("#about-submit");
  const userNameVar = document.querySelector("#inputName"); //поле ввода формы о себе
  const userAboutVar = document.querySelector("#inputAbout"); //поле ввода формы о себе
  const userName = document.querySelector(".user-info__name"); //выбор строки с именем
  const userAbout = document.querySelector(".user-info__job"); // выюор строки с информацией
  /*фото*/
  const buttonClosePhoto = document.querySelector(".popup__close-photo"); //переменная закрытия фото
  const cardPopupPhoto = document.querySelector(".popup_popup-photo");

  /* функции */

  // функция открывающая попап
  function togglePopup(popupElement) {
    popupElement.classList.toggle("popup_is-opened");
  }

  // функция закрытия/открытия формы карточки
  function formOpenCloser(event) {
    setButtonState(popupButton, true);
    togglePopup(popup);
  }
  // функция открытия/закрытия формы о себе
  function aboutFormOpenCloser() {
    setButtonState(formAboutSubmit, false); ///отключение кнопки отправки

    togglePopup(aboutPopup);
    formAbout.reset();
    userNameVar.value = userName.textContent;
    userAboutVar.value = userAbout.textContent;

    resetError(inputAbout);
    resetError(inputName);
  }

  // функция кнопка лайка
  function likeHandler(event) {
    if (event.target.classList.contains("place-card__like-icon")) {
      // проверка наличия класса лайка в где то
      event.target.classList.toggle("place-card__like-icon_liked"); // переключение лайка
    }
  }

  // delete card
  function deleteCard(event) {
    if (event.target.classList.contains("place-card__delete-icon")) {
      const placeCard = event.target.closest(".place-card"); // переменная на карточку
      placeCard.remove();
    }
  }

  // создание карточки
  function creatCard(name, imageLink) {
  
    // добавление разметки
    const card = document.createElement("div");
    const cardImage = document.createElement("div");
    const deleteButton = document.createElement("button");
    const cardDescription = document.createElement("div");
    const cardName = document.createElement("h3");
    const likeButton = document.createElement("button");

    // добавление селектора
    card.classList.add("place-card");
    card.classList.add("root__section");
    cardImage.classList.add("place-card__image");
    cardImage.style.backgroundImage = `url(${imageLink})`;
    deleteButton.classList.add("place-card__delete-icon");
    cardDescription.classList.add("place-card__description");
    cardName.classList.add("place-card__name");
    cardName.textContent = name;
    likeButton.classList.add("place-card__like-icon");

    cardImage.appendChild(deleteButton);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(likeButton);
    card.appendChild(cardImage);
    card.appendChild(cardDescription);

    return card;
  }

  // добавление карточки na ekran
  function addCard(name, imageLink) {
    list.appendChild(creatCard(name, imageLink));
  }

  initialCards.forEach((item) => addCard(item.name, item.link));

  // функция включения выключеня кнопки в форме
  function inputHandler(event) {
    const { name, link } = event.currentTarget.elements;
    const isInvalid = name.value.length === 0 || link.value.length === 0;
    setButtonState(popupButton, isInvalid);
  }

  // функция для кнопки отправки формы
  function submitCard(event) {
    event.preventDefault();
    const name = event.currentTarget.elements.name.value;
    const link = event.currentTarget.elements.link.value;
    addCard(name, link);
    form.reset();
    formOpenCloser();
  }

  //функция изменения информ о себе
  function toChangeAbout(name, about) {
    userName.textContent = name; //вывод на экран
    userAbout.textContent = about; //вывод на экран
  }

  // функция принятия данных с инпутов о себе
  function preChangeAbout(event) {
    const name = event.currentTarget.elements.name.value;
    const about = event.currentTarget.elements.about.value;

    event.preventDefault();
    aboutFormOpenCloser();
    toChangeAbout(name, about);
    formAbout.reset();
  }

  // функция с включеныем выключением кнопки
  function setButtonState(button, flag) {
    if (!flag) {
      button.removeAttribute("disabled");
      button.classList.add("popup__button_is-activ");
    } else {
      button.setAttribute("disabled", true);
      button.classList.remove("popup__button_is-activ");
    }
  }

  // функция закрытия фото
  function photoOpenCloser(event) {
    cardPopupPhoto.classList.remove("popup_is-opened");
  }

  // функция слушателя отрытия фото
  function placeCardPhotoOpener() {
    if (event.srcElement.className === "place-card__image") {
      const photo = document.querySelector(".popup__content__image");
      const photoLink = event.target.style.backgroundImage;
      const length = photoLink.length - 2;

      photo.setAttribute(
        "src",
        `${event.target.style.backgroundImage.slice(5, length)}`
      );
      cardPopupPhoto.classList.add("popup_is-opened");
    }
  }

  /* валидация */
  function validate(element) {
    if (element.validity.valueMissing) {
      return "Это обязательное поле";
    }

    if (element.validity.tooShort || element.validity.tooLong) {
      return "Должно быть от 2 до 30 символов";
    }

    return "";
  }

  function handleValidate(event) {
    //валидация текущего редактируемого поля
    const input = event.target;
    const errorElement = document.querySelector(`#error-${input.name}`);
    const errorText = validate(input); // validate возвращает текст ошибки
    if (errorText !== "") {
      activateError(errorElement);
      errorElement.textContent = errorText;
    } else {
      resetError(input);
    }

    const form = event.target.closest("form");
    const submitButton = form.querySelector("button[type=submit]");
    let inputs = form.querySelectorAll("input");

    inputs = Array.prototype.slice.call(inputs);
    const isValid = inputs.every((input) => validate(input) === "");

    setButtonState(submitButton, !isValid);
  }

  /*активация сообщений о ошибке */
  function activateError(element) {
    element.classList.add("error-message__hidden");
  }

  /*очистка сообщений о ошибке */
  function resetError(element) {
    element.nextElementSibling.classList.remove("error-message__hidden");
    element.textContent = "";
  }
  /* вызовы функций */

  /* слушатели событий */
  form.addEventListener("submit", submitCard); // слушатель на отправку

  buttonOpenForm.addEventListener("click", formOpenCloser); // слушатель кнопки открытия формы
  buttonOpenForm.addEventListener("click", () => form.reset()); // слушатель кнопки открытия формы
  formClouseButton.addEventListener("click", formOpenCloser); // слушатель кнопки закрытия

  list.addEventListener("click", likeHandler); // слушатель на лайк
  list.addEventListener("click", deleteCard); // слушатель удаления карточек
  form.addEventListener("input", inputHandler); // слушатель на включение выключение

  buttonOpenFormAbout.addEventListener("click", aboutFormOpenCloser); //cлушаетль открытия
  buttonCloseFormAbout.addEventListener("click", aboutFormOpenCloser); //cлушаетль закрытия
  formAbout.addEventListener("submit", preChangeAbout); //слушатель на отправку формы

  userNameVar.addEventListener("input", handleValidate); //// слушатели полей ввода для ошибки
  userAboutVar.addEventListener("input", handleValidate); //// слушатели полей ввода для ошибки

  list.addEventListener("click", placeCardPhotoOpener); // слушатель открытия фото
  buttonClosePhoto.addEventListener("click", photoOpenCloser); // слушатель закрытия фото
})();

