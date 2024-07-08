const btnAdicionarTask = document.querySelector('.app__button--add-task')
const formularioTask = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')

const tarefas = []


btnAdicionarTask.addEventListener('click', ()=> {
    formularioTask.classList.toggle('hidden')

})

formularioTask.addEventListener('submit', (evento)=>{
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value

    }
    tarefas.push(tarefa)

    localStorage.setItem('tarefas', tarefas)
})