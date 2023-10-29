import Inputmask from 'inputmask';
import {request} from "../sendRequest/sendRequest";
import {RequestType} from "../types/requestType";
import {ResponseType} from "../types/responseType";
import {ErrorFields} from "../types/errorFields";

export class Form {


    loginForm = document.getElementsByClassName('log_in_form')[0];

    emailField = document.getElementById('email') as HTMLInputElement;
    nameField = document.getElementById('name') as HTMLInputElement;
    phoneField = document.getElementById('phone') as HTMLInputElement;
    msgField = document.getElementById('msg') as HTMLInputElement;
    success_message = document.getElementById('success_message') as HTMLElement;


    fields = [this.nameField, this.emailField, this.phoneField, this.msgField]

    sendButton = document.getElementById('send') as HTMLInputElement;
    modalButton = document.getElementById('modal') as HTMLInputElement;


    constructor() {
        // добавление обработчиков событий при создании экземпляра класса
        this.sendButton.addEventListener('click', this.handleSendButtonClick);
        this.modalButton.addEventListener('click', this.handleModalButtonClick);
        this.applyPhoneMask()
    }



    handleSendButtonClick = async () => {
        const requestData: RequestType[] = [];
        for (const field of this.fields) {
            const fieldLabel = field.id;
            const fieldData = field.value;
            const dataEntry = {
                inputName: fieldLabel,
                inputValue: fieldData
            }
            requestData.push(dataEntry);
        }
        this.handleResponse(await request(requestData));
    };

    handleModalButtonClick = () => {

    };

    handleResponse = (res: ResponseType) => {
        if(res.status === 'success'){

            this.loginForm.classList.add('success');
            this.success_message.textContent = res.message;
            this.nameField.value = '';
            this.emailField.value = '';
            this.phoneField.value = '';
            this.msgField.value = '';
            return
        }
        if (res.fields) {
            if (this.loginForm.classList.contains('success')){
                this.loginForm.classList.remove('success');
            }
            const errorFields: ErrorFields = res.fields;
            for (const fieldName in errorFields) {
                const field = document.getElementById(fieldName) as HTMLInputElement;
                const errorElement = document.getElementById(`${fieldName}Error`);
                if (field && errorElement) {
                    field.classList.add('err');
                    field.addEventListener('input', this.handleFixWrongInput);
                    errorElement.textContent = errorFields[fieldName];
                }
            }
        }
    }

    handleFixWrongInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if(target.classList.contains('err')){
            target.classList.remove('err')
        }
        const errorElement = document.getElementById(`${target.id}Error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }



    applyPhoneMask() {
        const inputElement = document.getElementById('phone') as HTMLInputElement;
        if (inputElement) {
            Inputmask({ mask: '+375 (99) 999-99-99' }).mask(inputElement);
        }
    };



    checkField() {
        for (const field of this.fields) {
            if(field.value === ''){
                field.classList.add('err');
                field.addEventListener("change", this.handleFixWrongInput)
            }
        }
    };
}
