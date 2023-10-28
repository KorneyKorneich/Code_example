import Inputmask from 'inputmask';

export class Form {


    loginForm = document.getElementById('log_in_form') as HTMLElement;
    emailField = document.getElementById('email') as HTMLInputElement;
    nameField = document.getElementById('name') as HTMLInputElement;
    phoneField = document.getElementById('phone') as HTMLInputElement;
    msgField = document.getElementById('msg') as HTMLInputElement;

    fields = [this.nameField, this.emailField, this.phoneField, this.msgField]

    sendButton = document.getElementById('send') as HTMLInputElement;
    modalButton = document.getElementById('modal') as HTMLInputElement;


    constructor() {
        // добавление обработчиков событий при создании экземпляра класса
        this.sendButton.addEventListener('click', this.handleSendButtonClick);
        this.modalButton.addEventListener('click', this.handleModalButtonClick);
        this.applyPhoneMask()
    }



    handleSendButtonClick = (event: Event) => {
        // event.preventDefault();
        this.clearErrors();
        this.checkField();
        this.emailCheck();
    };

    handleModalButtonClick = (event: Event) => {
        // обработчик события для модальной кнопки
        event.preventDefault();

    };


    clearErrors() {
        for (const field of this.fields) {
            field.classList.remove('err');
        }
        this.loginForm.classList.remove('err');
    }

    applyPhoneMask() {
        const inputElement = document.getElementById('phone') as HTMLInputElement;
        if (inputElement) {
            Inputmask({ mask: '+375 (99) 999-99-99' }).mask(inputElement);
        }
    };

    emailCheck() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValue = this.emailField.value; // Получить значение поля email
        if (!regex.test(emailValue)) {
            this.emailField.classList.add('err');
        }
    }

    checkField() {
        for (const field of this.fields) {
            let counter = 0;
            if(field.value === ''){
                field.classList.add('err');
                counter++;
            }
            if(counter > 0) this.loginForm.classList.add('err');
        }
    };
}
