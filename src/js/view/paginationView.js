import View from "./View";
import icons from '../../img/icons.svg';

class paginationView extends View {
 // Select the parent element that contains the pagination buttons
_parentElement = document.querySelector('.pagination');

// Function to add a click event handler to the pagination buttons
addClickHandler = function (handler) {
    // Add a click event listener to the parent element
    this._parentElement.addEventListener('click', function(e) {
        // Find the closest button with the class 'btn--inline' that was clicked
        const btn = e.target.closest('.btn--inline');

        if(!btn) return ;

        // Get the value of the 'data-goto' attribute from the clicked button
        const goToPage = +btn.dataset.goto;

        // Call the provided handler function (to handle the page change)
        handler(goToPage);
    });
}


    _generateMarkup() {
        // Calculate the total number of pages available for displaying recipes
        // based on the length of the results array and the number of results per page.
        const totalRecipePages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        // console.log(totalRecipePages);
        
        // Get the current active page number from the state.
        const activePage = this._data.currentPageNumber;
    
        // If we are on the first page and there are more pages available,
        // generate a "Next" button to navigate to the next page.
        if (activePage === 1 && totalRecipePages > 1) {
            return `
            <button data-goto="${activePage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${activePage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        }
    
        // If we are on the last page, generate a "Previous" button to navigate back to the previous page.
        if (activePage === totalRecipePages && totalRecipePages > 1) {
            return `
            <button data-goto="${activePage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${activePage - 1}</span>
            </button>
            `;
        }
    
        // If we are on any other page (not the first or last),
        // generate both "Previous" and "Next" buttons for navigation.
        if (activePage < totalRecipePages) {
            return  `            
            <button data-goto="${activePage - 1}"  class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${activePage - 1}</span>
            </button>
    
            <button data-goto="${activePage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${activePage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        }
    
        // If we are on the first page and there are no other pages,
        // return an empty string (no buttons to display).
        return "";
    }
    
}

export default new paginationView();