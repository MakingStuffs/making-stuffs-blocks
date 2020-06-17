const createDivClone = (element, index) => {
  const selectContainer = document.createElement("div");
  selectContainer.classList = "msblocks-select-container";
  selectContainer.dataset.id = `msblocks-select-${index}`;
  selectContainer.setAttribute("aria-expanded", false);

  const activeOption = Array.from(element.options).find(
    (option) => option.hasAttribute('selected') || option.hasAttribute("active")
  );

  const activeOptionDiv = setAttributes(
    document.createElement("div"),
    element.attributes
  );
  activeOptionDiv.classList.add("msblocks-select-selected");
  activeOptionDiv.tabIndex = 0;
  activeOptionDiv.textContent = activeOption
    ? activeOption.textContent
    : element.options[0].textContent;
  activeOptionDiv.dataset.id = `msblocks-select-${index}`;
  activeOptionDiv.dataset.query =
    activeOption && activeOption.value.includes("=")
      ? activeOption.value
      : activeOption && !activeOption.value.includes("=")
      ? `${element.getAttribute("name")}\=${activeOption.value}`
      : element.options[0].value.includes("=")
      ? element.options[0].value
      : `${element.getAttribute("name")}\=${element.options[0].value}`;

  activeOptionDiv.setAttribute(
    "value",
    activeOptionDiv.dataset.query || element.options[0].value
  );

  activeOptionDiv.addEventListener("click", toggleMenu);

  const optionsContainer = createOptions(element);
  optionsContainer.dataset.id = `msblocks-select-${index}`;

  selectContainer.append(activeOptionDiv, optionsContainer);

  element.dataset.id = `msblocks-select-${index}`;
  element.style.display = "none";

  element.parentElement.appendChild(selectContainer);
};

const setAttributes = (element, attributes) => {
  for (let attribute of attributes) {
    element.setAttribute(attribute.name, attribute.value);
  }
  return element;
};

const createOptions = (element) => {
  const optionsContainer = document.createElement("div");
  optionsContainer.classList = "msblocks-select-options__list";

  Array.from(element.options).forEach((option) => {
    const optionElement = setAttributes(
      document.createElement("div"),
      option.attributes
    );
    optionElement.classList = "msblocks-select-options__item";
    optionElement.textContent = option.textContent;
    optionElement.tabIndex = 0;
    optionsContainer.appendChild(optionElement);
    optionElement.addEventListener("click", handleOptionSelect);
  });

  return optionsContainer;
};

function handleOptionSelect() {
  const id = this.parentElement.dataset.id;
  const value = this.getAttribute("value");
  const pairedSelectElement = document.querySelector(`select[data-id="${id}"]`);
  const pairedSelectOptions = Array.from(
    pairedSelectElement.querySelectorAll("option")
  );
  const activeOption = pairedSelectOptions.filter((option) =>
    option.hasAttribute("selected")
  )[0];
  const selectedOption = pairedSelectOptions.filter(
    (option) => option.value === value
  )[0];
  const selectedDiv = document.querySelector(
    `.msblocks-select-selected[data-id="${id}"]`
  );
  activeOption.removeAttribute("selected");
  selectedOption.setAttribute("selected", "selected");
  pairedSelectElement.value = value;
  pairedSelectElement.setAttribute(
    "data-query",
    value.includes("=")
      ? value
      : `${pairedSelectElement.getAttribute("name")}=${value}`
  );

  selectedDiv.textContent = this.textContent;
  selectedDiv.dataset.query = value.includes("=")
    ? value
    : `${pairedSelectElement.getAttribute("name")}=${value}`;

  pairedSelectElement.dispatchEvent(new Event("change"));
  return toggleMenu.call(this);
}

function toggleMenu(element) {
  const container = document.querySelector(
    `.msblocks-select-container[data-id="${this.parentElement.dataset.id}"]`
  );

  const handleClick = (event) => {
    if (
      (element && !element.target.contains(event.target)) ||
      event.target.classList.contains("msblocks-select-options__item")
    ) {
      container.setAttribute("aria-expanded", "false");
      return removeListener();
    } else if (
      event.target === this &&
      container.getAttribute("aria-expanded") === "false" &&
      element.target === this
    ) {
      return removeListener();
    }
  };

  const removeListener = () => {
    return document.removeEventListener("click", handleClick);
  };

  return container.getAttribute("aria-expanded") === "false"
    ? (container.setAttribute("aria-expanded", "true"),
      document.addEventListener("click", handleClick))
    : container.setAttribute("aria-expanded", "false");
}

const renderCustomSelects = (selector = "body") => {
  const container = document.querySelector(selector);
  const selectElements = container.querySelectorAll("select");
  selectElements.forEach((select, index) => createDivClone(select, index));
};

export default renderCustomSelects;
