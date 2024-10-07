function openPopup() {
    const popup = document.getElementById('popup');
    document.body.style.overflow = 'hidden';
    popup.classList.add('show');
}

function closePopup() {
    const popup = document.getElementById('popup');
    const user_message = document.getElementById('message');
    const user_email = document.getElementById('email');
    document.body.style.overflow = 'auto';
    user_message.value = '';
    user_email.value = '';
    user_email.style.borderColor = ' cadetblue';
    popup.classList.remove('show');
}
function removeTimer(timer) {
    clearTimeout(timer);
}
function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
        return true;
    }
    mail.style.borderColor = 'red';
    const timer = setTimeout(() => {
        mail.style.borderColor = 'cadetblue';
    }, 2000);
    return false;
}
function validateText(text) {
    if (text.value.length > 20) {
        return true;
    }
    text.style.borderColor = 'red';
    const timer = setTimeout(() => {
        text.style.borderColor = 'cadetblue';
    }, 2000);
    return false;
}

function sendMessage() {
    const user_message = document.getElementById('message');
    const user_email = document.getElementById('email');
    const status = document.getElementById('send_status');
    const button = document.getElementById('button_sending');
    const temaplateParams = {
        from_name: user_email.value,
        message: user_message.value,
    };
    if (validateText(user_message) && validateEmail(user_email)) {
        button.disabled = true;
        emailjs.send('service_knqgv5e', 'template_fez722e', temaplateParams).then(
            function (response) {
                status.classList.add('sended');
                status.textContent = 'Повідомлення успішно надіслано';
                status.style.color = 'green';
                const timer = setTimeout(() => {
                    closePopup();
                    user_message.value = '';
                    user_email.value = '';
                    status.textContent = '';
                    button.disabled = false;
                }, 2000);
                console.log('Success', response.status, response.next);
            },
            function (error) {
                status.classList.add('unsended');
                status.textContent = 'Повідомлення не надіслано';
                status.style.color = 'red';
                console.log('Failed', error);
            },
        );
        status.classList.remove('un_sended');
        status.classList.remove('sended');
    }
}
const popupContent = document.querySelector('.popup-content');

popupContent.addEventListener('click', (e) => {
    e.stopPropagation();
});


(function () {
    emailjs.init('g43ShR2OVFTpsKDgf');
})();
       
