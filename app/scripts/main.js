/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  /**
  *
  *
  *
  * Custom JavaScript
  *
  *
  *
  **/

  var PORTFOLIO_ITEMS = [
    {
      name: 'test',
      previewText: 'Elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem pretium metus, quis mollis nisl nunc et massa. Vestibulum sed metus in lorem tristique ullamcorper id vitae erat.',
      previewImage: './images/portfolio_items/1.jpg',
      description: 'description',
      images: ['./images/portfolio_items/1.jpg'],
      tools: ['sketch', 'mailingHtml', 'spotify'],
      liveAt: 'google.com'
    },
    {
      name: 'test 2',
      previewText: 'Vestibulum sed metus in lorem tristique ullamcorper id vitae erat.',
      previewImage: './images/portfolio_items/2.jpg',
      description: 'description 2',
      images: ['./images/portfolio_items/2.jpg', './images/portfolio_items/1.jpg'],
      tools: ['sketch', 'mailingHtml'],
      liveAt: 'facebook.com'
    }
  ];

  var TOOLS = {
    sketch: {
      name: 'Sketch',
      icon: './images/tool-sketch.png'
    },
    mailingHtml: {
      name: 'E-mailing HTML',
      icon: './images/tool-template.png'
    },
    spotify: {
      name: 'Spotify',
      icon: './images/tool-spotify.png'
    }
  };

  /**
  * Gets contact form input values
  * @return {object} set of inputs -> object[input_name] = input_value
  */
  function getFormData() {
    var form = document.getElementById('contact_form');
    // get form inputs data
    var data = {};
    Object.keys(form.elements).map(function(key) {
      if (isNaN(key)) {
        data[key] = form.elements[key].value;
      }
    });
    return data;
  }

  /**
  * Email validation regexp
  * @param {string} email for validation
  * @return {boolean} email validation result
  */
  function emailValid(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return !re.test(email);
  }

  /**
  * Form state - loading
  * @param {Object} event DOM form event
  * @return {boolean} is loading? true
  */
  function formLoading(event) {
    // make visual change for loading state
    event.target.children.contact_form__submit.disabled = true;
    event.target.children.contact_form__submit.innerHTML = 'Wysyłanie...';
    event.target.children.contact_form__submit.className += ' button--loading';
    document.getElementById('form__error').style.display = 'none';

    return true;
  }
  /**
  * Form loading state - reset
  * @param {Object} event DOM form event
  * @return {boolean} is loading? false
  */
  function formLoadingReset(event) {
    // make visual change for loading state
    event.target.children.contact_form__submit.disabled = false;
    event.target.children.contact_form__submit.innerHTML = 'Wyślij';
    event.target.children.contact_form__submit.className = 'button button--primary';

    return false;
  }
  /**
  * Detects empty inputs in form
  * @param {Object} event DOM form event
  * @return {boolean} every form inputs filled?
  */
  function inputsFilled(event) {
    var filled = true;
    if (event.target.message.value.length === 0) {
      filled = false;
    }
    if (event.target.name.value.length === 0) {
      filled = false;
    }
    if (event.target.email.value.length === 0) {
      filled = false;
    }

    return filled;
  }

  /**
  * Send form data
  * @param {Object} event DOM event
  */
  function handleFormSubmit(event) {
    event.preventDefault();
    var data = getFormData();
    var isLoading = false;
    var allInputsFilled = inputsFilled(event);

    // VALIDATION
    if (isLoading || !allInputsFilled) {
      document.getElementById('form__error').innerHTML = 'Uzupełnij wszystkie pola formularza';
      document.getElementById('form__error').style.display = 'block';
    } else if (emailValid(data.email)) {
      document.getElementById('form__error').innerHTML = 'Wpisz prawidłowy adres e-mail';
      document.getElementById('form__error').style.display = 'block';
    } else {
      // VALIDATION PASSED
      isLoading = formLoading(event);
      var url = event.target.action;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() {
        isLoading = formLoadingReset(event);
        if (xhr.status === 200) {
          document.getElementById('contact_form').style.display = 'none';
          document.getElementById('thankyou_message').style.display = 'block';
        } else {
          document.getElementById('form__error').innerHTML = 'Coś poszło nie tak :( <br /> Wyślij proszę e-mail na adres: <a href="mailto:waskowski.mikolaj@gmail.com">waskowski.mikolaj@gmail.com</a>. <br /> Dziękuję!';
          document.getElementById('form__error').style.display = 'block';
          console.log(xhr.responseText);
        }
      };
      // url encode form data for sending as post data
      var encoded = Object.keys(data).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      }).join('&');

      xhr.send(encoded);
    }
  }

  /**
  * Activating overlay menu
  */
  function menuTrigger() {
    var overlay = document.getElementById('overlay');
    overlay.classList.toggle('menu-overlay--open');
  }

  /**
  * Check that menu is opened (overlay is active)
  * @return {boolean} Menu active?
  */
  function overlayActive() {
    return document.getElementById('overlay').classList.contains('menu-overlay--open');
  }

  /**
  * Scrolls to element, closing menu overlay if needed
  * @param {Object} event DOM event
  */
  function scrollTo(event) {
    // goto section marked as button data-goto attribute
    document.getElementById(event.target.getAttribute('data-goto')).scrollIntoView({
      behavior: 'smooth'
    });
    // need to close menu overlay?
    if (overlayActive()) {
      menuTrigger();
    }
  }

  /**
  * Fill portfolio with Portfolio_items
  * @param {Array} items - array of portfolio items
  */
  function insertPortoflioItems(items) {
    var container = document.getElementById('portfolio_items_container');
    items.forEach(function(element, index) {
      // create main container
      var section = document.createElement('section');
      section.className += ' container section section--left section--portfolio-item ';
      // create box for item preview
      var sectionMedia = document.createElement('div');
      sectionMedia.className += ' section__media section__media--portfolio-item ';
      sectionMedia.innerHTML = '<img src="' + element.previewImage + '" alt="portfolio_item" class="button--show-more" data-itemid="' + index + '" />';
      // create box for item name and description
      var sectionText = document.createElement('div');
      sectionText.className += ' section__text section__text--portfolio-item ';
      sectionText.innerHTML = '<h3 class="section__title">' + element.name + '</h3>';
      sectionText.innerHTML += '<p>' + element.previewText + '</p>';
      sectionText.innerHTML += '<button class="button button--text button--green button--show-more" data-itemid="' + index + '"><img src="./images/icon-info.svg" alt="" class="button__icon--left" /> Zobacz szczegóły</button>';
      section.appendChild(sectionMedia);
      section.appendChild(sectionText);
      container.appendChild(section);
    });
  }

  /**
  * Fill portfolio item description with data
  * @param {Number} itemId - id of portfolio item
  */
  function fillPortfolioItemDescription(itemId) {
    var itemName = document.querySelector('.portfolio__item-name');
    var itemDescrption = document.querySelector('.portfolio__item-description');
    var imagesContainer = document.querySelector('.portfolio__images');
    var toolsContainer = document.querySelector('.tools');
    var liveAt = document.querySelector('.portfolio__live-at');
    var externalLinkButton = document.querySelector('.button--live-at');

    itemName.innerHTML = PORTFOLIO_ITEMS[itemId].name;
    itemDescrption.innerHTML = PORTFOLIO_ITEMS[itemId].description;
    // clear images container from old images
    imagesContainer.innerHTML = '';
    // fill images container with new images
    PORTFOLIO_ITEMS[itemId].images.forEach(function(element, index) {
      imagesContainer.innerHTML += '<img src="' + element + '" alt="' + PORTFOLIO_ITEMS[itemId].name + ' - #' + index + ' presentation image" class="portfolio__image" /> ';
    });
    toolsContainer.innerHTML = '';
    PORTFOLIO_ITEMS[itemId].tools.forEach(function(element) {
      toolsContainer.innerHTML += '<div class="tools_item"><img src="' + TOOLS[element].icon + '" alt="" class=""><p>' + TOOLS[element].name + '</p></div>';
    });
    liveAt.innerHTML = '<p>' + PORTFOLIO_ITEMS[itemId].liveAt + '</p>';
    externalLinkButton.href = '//' + PORTFOLIO_ITEMS[itemId].liveAt;
  }

  /**
  * Make portfolio item alive
  **/
  function viewChanger() {
    var view = document.querySelector('.view');
    var backButton = document.querySelectorAll('.button--back');
    var listItems = document.querySelectorAll('.button--show-more');
    var portfolioDescriptionView = document.querySelector('.screen--portfolio-item');

    /**
    * While clicking "Show more", activate description view and fill it with data
    * @param {Object} evt - button click event
    **/
    function onViewChange(evt) {
      evt.preventDefault();
      // change details data
      if (evt.currentTarget.classList.contains('button--show-more')) {
        var portfolioItemId = evt.currentTarget.getAttribute('data-itemid');
        fillPortfolioItemDescription(portfolioItemId);
      }
      // change view - add "active" class to main view container
      view.classList.toggle('view--change');
      // go to the top of portfolio item description container while "show more" event
      if (view.classList.contains('view--change')) {
        portfolioDescriptionView.scrollTop = 0;
      }
    }

    for (var j = 0; j < listItems.length; j++) {
      listItems[j].addEventListener('click', onViewChange, false);
    }
    for (var k = 0; k < backButton.length; k++) {
      backButton[k].addEventListener('click', onViewChange, false);
    }
  }

  function runScrollAnimations() {
    console.log('yeah');
  }

  /**
  * Runs while document is loaded...
  */
  function loaded() {
    // prevent default submit form action, redirect to handleFormSubmit()
    var form = document.getElementById('contact_form');
    form.addEventListener('submit', handleFormSubmit, false);
    console.log('Info: form submit function loaded');

    // make internal buttons alive
    var menuBtn = document.getElementById('menu-button');
    menuBtn.addEventListener('click', menuTrigger, false);
    var menuBtnClose = document.getElementById('menu-button-close');
    menuBtnClose.addEventListener('click', menuTrigger, false);
    var menuLinks = document.getElementsByClassName('internal-link');
    for (var i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', scrollTo, false);
    }
    console.log('Info: menu trigger functions loaded');

    // create portfolio items
    insertPortoflioItems(PORTFOLIO_ITEMS);

    // make portoflio item alive
    viewChanger();

    // scroll animations
    runScrollAnimations();
  }
  document.addEventListener('DOMContentLoaded', loaded, false);
})();
