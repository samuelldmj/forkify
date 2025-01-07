import icons from '../../img/icons.svg';
// console.log(icons)

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  updateRender(data){
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));
  
    newElements.forEach((newEl, i) => {
      const curEl = curElement[i];

      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ""){
        curEl.textContent = newEl.textContent;
      }

      if(!newEl.isEqualNode(curEl)){
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
      }

    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderError(message = this._errorMessage) {
    const markup = `
      
      <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
      `
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccessMessage(message = this._successMessage) {
    const markup = `
      <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
      `
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  spinnerLoader() {
    const markup = `
           <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
        `
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }


}
