const message = document.getElementsByClassName('message')[0];
const editarContainer = document.getElementsByClassName('editar-quiz-container');

if (message.innerHTML.replace(/\s/g, '') == 'editando') {
    for (const div of editarContainer) {
        div.classList.remove('invisivel');
    }
}