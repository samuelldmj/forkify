
import icons from '../../img/icons.svg';
import View from "./View";


class bookmarkView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = "No bookmark yet, find a recipe and bookmark it.";
    _message = "";
    _generateMarkup() {
      const id = window.location.hash.slice(1);

      return this._data.map(result => `
           <li class="preview">
              <a class="preview__link ${ result.id  === id ? 'preview__link--active' : ''}" href="#${result.id}">
                <figure class="preview__fig">
                  <img src="${result.image}" alt="${result.title}" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${result.title}</h4>
                  <p class="preview__publisher">${result.publisher}</p>
                </div>
              </a>
            </li>
      `).join('');
  }

}

export default new bookmarkView;