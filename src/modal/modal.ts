const overlay = document.getElementsByClassName('overlay')[0];
const modal = document.getElementsByClassName('modal')[0];

overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
        handleClose();
    }
});

const handleClose = () => {
    modal.classList.remove('opened');
}

export function showModal() {
    modal.classList.add('opened')
}

