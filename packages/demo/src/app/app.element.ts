import './app.element.css';
import { data } from './data';
import { mountStickyScrollbar } from '@bottom-sticky-scrollbar/core';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];
  #unsubcribe?: () => void;

  disconnectedCallback() {
    if (this.#unsubcribe) {
      this.#unsubcribe();
    }
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="wrapper">
      <div class="container">
        <!--  WELCOME  -->
        <div id="welcome">
          <h1>
            Bottom Sticky Scrollbar 👋
          </h1>
        </div>
        <div class="table__container rounded shadow">
          <table class="table">
            <thead>
              <tr class="table__row">
                <th class="table__heading">Image</th>
                <th class="table__heading">Name</th>
                <th class="table__heading">Season</th>
                <th class="table__heading">Number</th>
                <th class="table__heading">Air date</th>
                <th class="table__heading">Air time</th>
                <th class="table__heading">Runtime</th>
                <th class="table__heading">Average rating</th>
                <th class="table__heading">URL</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (episode) => `
              <tr class="table__row">
                <td>
                  <img src="${episode.image.medium}" height="50" alt="cover of ${episode.name}" />
                  </td>
                <td>${episode.name}</td>
                <td>${episode.season}</td>
                <td>${episode.number}</td>
                <td>${episode.airdate}</td>
                <td>${episode.airtime}</td>
                <td>${episode.runtime}</td>
                <td>${episode.rating.average}</td>
                <td>${episode.url}</td>
              </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>

  
        <p id="love">
          Carefully crafted with
          <svg
            fill="currentColor"
            stroke="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </p>
      </div>
    </div>
      `;
    this.#unsubcribe = mountStickyScrollbar('.table__container');
  }
}
customElements.define('bottom-sticky-scrollbar-root', AppElement);
