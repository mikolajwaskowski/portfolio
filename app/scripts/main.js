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

  // Custom JavaScript

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
  * Runs while document is loaded...
  */
  function loaded() {
    // prevent default submit form action, redirect to handleFormSubmit()
    var form = document.getElementById('contact_form');
    form.addEventListener('submit', handleFormSubmit, false);

    // make menu buttons live - toggle overlaying menu
    var menuBtn = document.getElementById('menu-button');
    menuBtn.addEventListener('click', menuTrigger, false);
    var menuBtnClose = document.getElementById('menu-button-close');
    menuBtnClose.addEventListener('click', menuTrigger, false);

    console.log('Info: menu trigger function loaded');
    console.log('Info: form submit function loaded');
  }
  document.addEventListener('DOMContentLoaded', loaded, false);
})();
