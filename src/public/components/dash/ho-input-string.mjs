export default customElements.define(
  'ho-input-string',

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
        :host > input {
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
        :host > input:focus {
          border-color: rgb(128,128,128);
        }
        :host > input:disabled {
          color: rgb(128,128,128);
        }
        :host > input::placeholder,
        :host > input::-webkit-input-placeholder {
          color: rgb(150,150,150);
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

      const input = document.createElement('input');
      input.type = this.getAttribute('type');
      input.value = this.getAttribute('value');
      input.placeholder = this.getAttribute('placeholder');
      input.disabled = this.hasAttribute('disabled');
      input.spellcheck = false;

      const label = document.createElement('label');
      label.innerHTML = this.getAttribute('label');

      const message = document.createElement('div');
      message.classList.add('message');
      message.innerHTML = this.getAttribute('message');

      shadow.appendChild(label);
      shadow.appendChild(input);
      shadow.appendChild(message);
    }

    disconnectedCallback() {}

    adoptedCallback() {}

    static observedAttributes = [
      'type',
      'value',
      'label',
      'message',
      'placeholder',
      'disabled',
    ];

    get type() {
      return this.getAttribute('type');
    }

    set type(newValue) {
      if (newValue) {
        this.setAttribute('type', newValue);
      } else {
        this.removeAttribute('type');
      }
      this.shadowRoot.querySelector('input').type = newValue || '';
    }

    get value() {
      return this.shadowRoot?.querySelector('input').value;
    }

    set value(newValue) {
      if (newValue) {
        this.setAttribute('value', newValue);
      } else {
        this.removeAttribute('value');
      }
      this.shadowRoot.querySelector('input').value = newValue || '';
    }

    get placeholder() {
      return this.getAttribute('placeholder');
    }

    set placeholder(newValue) {
      if (newValue) {
        this.setAttribute('placeholder', newValue);
      } else {
        this.removeAttribute('placeholder');
      }
      this.shadowRoot.querySelector('input').placeholder = newValue || '';
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
      this.shadowRoot.querySelector('input').disabled = newValue != undefined;
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