import renderCustomSelects from "./modules/selects";
window.onload = () => {
  const { origin, search, pathname } = window.location;
  const container = document.querySelector(
    ".wp-block-msblocks-filterable-products-by-category"
  );
  const selects = container.querySelectorAll("select");
  const submit = document.getElementById("submit_msblocks_price_query");
  const activeFilters = container.querySelectorAll(
    ".msblocks-product-filtering-active__item"
  );
  const priceInputs = container.querySelectorAll(
    "input.msblocks-product-filtering-price__input"
  );

  const handleMultipleQueries = (query) => {
    const queries = query.split("&").map((value) => {
      return value.split("=")[0];
    });
    return queries.join("|");
  };

  const checkQueryString = (query, output = "") => {
    const regex = /(((\?){1}(([a-zA-Z])+((_){1}([a-zA-Z])+)*)={1}([a-zA-Z\_0-9\%\ \-])+){1}((\&){1}(([a-zA-Z])+((_){1}([a-zA-Z])+)*)={1}([a-zA-Z\_0-9\%\ \-])+)*)+/g;
    while (query.length > 0) {
      const tempArray = query.split("");
      output += tempArray[0];
      tempArray.shift();
      return checkQueryString(tempArray.join(""), output);
    }
    return regex.test(output);
  };

  const formatQueryString = (query, output = "") => {
    const characterArray = query.split("");
    const regex = /[\?\&\=]/g;

    while (characterArray.length > 0) {
      if (regex.test(characterArray[0])) {
        regex.lastIndex = 0;
        if (
          !regex.test(output[output.length - 1]) &&
          characterArray.length > 2
        ) {
          output += characterArray[0];
        }
      } else {
        output += characterArray[0];
      }

      characterArray.shift();

      return formatQueryString(characterArray.join(""), output);
    }

    return output[0] === "?" ? output : `\?${output}`;
  };

  const getQueryKeys = (query) =>
    query.includes("&") ? handleMultipleQueries(query) : query.split("=")[0];

  const getRegexFromQueryKeys = (query) => {
    const valueRegex = "(={1}([0-9a-zA-Z_ %-])+)";
    const queryKeys = getQueryKeys(query);
    return new RegExp(`((${queryKeys})${valueRegex})+`, "g");
  };

  function handleInputChange() {
    const query = `${this.dataset.query}=${this.value}`;
    const regex = new RegExp(`(${this.dataset.query})=([0-9a-zA-Z\_\ \%\-])+`);
    const submit = document.getElementById("submit_msblocks_price_query");

    if (submit.dataset.query) {
      !regex.test(submit.dataset.query)
        ? submit.setAttribute("data-query", `${submit.dataset.query}&${query}`)
        : submit.setAttribute(
            "data-query",
            submit.dataset.query.replace(regex, query)
          );
    } else {
      submit.setAttribute("data-query", query);
    }
  }

  function handleFilterSelect() {
    const queryRegex = getRegexFromQueryKeys(this.dataset.query);
    console.log(this);
    if (this.value === "null") {
      return handleFilterRemoval.call(this);
    } else {
      return queryRegex.test(window.location.search)
        ? handleFilterChange.call(this, queryRegex)
        : handleFilterAddition.call(this);
    }
  }

  function handleFilterAddition() {
    return (window.location.href = search
      ? `${search}&${this.dataset.query}`
      : `?${this.dataset.query}`);
  }

  function handleFilterRemoval() {
    const queryRegex = getRegexFromQueryKeys(
      this.dataset.key ? this.dataset.key : this.dataset.query
    );
    const currentUrl = `${origin}${pathname}`;
    const newSearch = search
      .split("&")
      .filter((term) => {
        queryRegex.lastIndex = 0;
        if (!queryRegex.test(term)) return term;
      })
      .join("&");

    const newSearchFormatted = formatQueryString(newSearch);

    return (window.location.href = checkQueryString(newSearchFormatted)
      ? `${currentUrl}${newSearchFormatted}`
      : currentUrl);
  }

  function handleFilterChange(regex) {
    const currentQuery = search.replace(regex, "");
    const formattedNewQuery = formatQueryString(
      `?${currentQuery}&${this.dataset.query}`
    );

    return checkQueryString(formattedNewQuery)
      ? (window.location.href = `${origin}${pathname}${formattedNewQuery}`)
      : (window.location.href = `${origin}${pathname}`);
  }

  submit.addEventListener("click", handleFilterSelect);
  priceInputs.forEach((input) =>
    input.addEventListener("input", handleInputChange)
  );
  activeFilters.forEach((filter) =>
    filter.addEventListener("click", handleFilterRemoval)
  );
  selects.forEach(function(select) {
    select.addEventListener("change", handleFilterSelect);
  });

  renderCustomSelects(".wp-block-msblocks-filterable-products-by-category");
};
