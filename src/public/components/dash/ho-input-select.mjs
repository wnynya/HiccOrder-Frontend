export default customElements.define(
  'ho-input-select',

  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' });

      const style = document.createElement('style');
      style.textContent = `
        * {
          box-sizing: border-box;
          font-family: var(--font-family);
        }
        :host {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }
        :host > .select {
          font-size: 1rem;
          font-weight: 400;
          width: 100%;
          height: 2.5rem;
          padding: 0rem 0.75rem;
          outline: none;
          border: solid 0.1rem rgb(240,240,240);
          border-radius: 0.75rem;
          background: rgb(240,240,240);
        }
        :host > .select:focus {
          border-color: rgb(128,128,128);
        }
        :host > .select > select,
        :host > .select > select:focus {
          font-size: 1rem;
          font-weight: 400;
          width: 100%;
          height: 100%;
          margin: 0;
          border: none;
          background: transparent;
          outline: none;
          color: black;
        }
        :host > label {
          line-height: 1.25rem;
          font-size: 0.8rem;
          font-weight: 600;
        }
        :host > .message {
          line-height: 1.25rem;
          font-size: 0.7rem;
          font-weight: 400;
          color: rgb(128,128,128);
        }
      `;
      shadow.appendChild(style);

      console.log(this.innerHTML);

      const wrapper = document.createElement('div');
      wrapper.classList.add('select');

      const select = document.createElement('select');
      select.value = this.getAttribute('value');
      select.disabled = this.hasAttribute('disabled');

      select.innerHTML = this.innerHTML;
      wrapper.appendChild(select);

      const label = document.createElement('label');
      label.innerHTML = this.getAttribute('label');

      const message = document.createElement('div');
      message.classList.add('message');
      message.innerHTML = this.getAttribute('message');

      this.innerHTML = '';
      shadow.appendChild(label);
      shadow.appendChild(wrapper);
      shadow.appendChild(message);
    }

    disconnectedCallback() {}

    adoptedCallback() {}

    static observedAttributes = ['value', 'label', 'message', 'disabled'];

    get value() {
      return this.shadowRoot?.querySelector('select').value;
    }

    set value(newValue) {
      if (newValue) {
        this.setAttribute('value', newValue);
      } else {
        this.removeAttribute('value');
      }
      this.shadowRoot.querySelector('select').value = newValue || '';
    }

    get disabled() {
      return this.hasAttribute('disabled');
    }

    set disabled(newValue) {
      if (newValue != undefined) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
      this.shadowRoot.querySelector('select').disabled = newValue != undefined;
    }

    get label() {
      return this.getAttribute('label');
    }

    set label(newValue) {
      if (newValue) {
        this.setAttribute('label', newValue);
      } else {
        this.removeAttribute('label');
      }
      this.shadowRoot.querySelector('label').innerHTML = newValue || '';
    }

    get message() {
      return this.getAttribute('message');
    }

    set message(newValue) {
      if (newValue) {
        this.setAttribute('message', newValue);
      } else {
        this.removeAttribute('message');
      }
      this.shadowRoot.querySelector('.message').innerHTML = newValue || '';
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue == newValue) {
        return;
      }
      if (this[name]) {
        this[name] = newValue;
      }
    }
  }
);
