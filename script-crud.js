const btnAdicionarTask = document.querySelector('.app__button--add-task')
const formularioTask = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const ultarefas = document.querySelector('.app__section-task-list')

// Obtém as tarefas do localStorage, convertendoas de string para objeto, caso for a primeira e estiver como vazio mandamos uma lista vazia 
const tarefas =JSON.parse(localStorage.getItem('tarefas')) || []

function atualizarTarefas(){
     // Armazena a lista de tarefas no localStorage, convertendo o array de tarefas para uma string JSON.
    //LocalStorage só sabe trabalhar com Strings 
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa (tarefa){
// Função para criar um elemento de lista (li) que representa uma tarefa
    
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')
    const svg = document.createElement('svg')
    svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>`
    const paragrafo = document.createElement('p')
    paragrafo.classList.add('app__section-task-list-item-description')
    paragrafo.textContent = tarefa.descricao

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')
    botao.onclick = ()=>{
        //debugger
        //Editando a tarefa
        const novaDescricao = prompt("Qual é o novo nome da tarefa?")
        if (novaDescricao) {
            console.log('Nova descriçao da tarefa : ',novaDescricao)
            paragrafo.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefas()
        }
   

    }
    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src','/imagens/edit.png')

    // Adiciona a imagem dentro do botão
    botao.append(imagemBotao)
     // Adiciona o elemento svg dentro do elemento li
    li.append(svg)
    li.append(paragrafo)
    li.append(botao)


    return li //retorna o elemento criado 

}

btnAdicionarTask.addEventListener('click', ()=> {
    formularioTask.classList.toggle('hidden') //Esconder e mostrar formulario

})

formularioTask.addEventListener('submit', (evento)=>{
    evento.preventDefault(); // Remove o comportamento padrão de dar um refresh em todo subimit 

    const tarefa = {
        descricao: textarea.value //Criando um objeto tarefa e passando o valor digitado 

    }
    tarefas.push(tarefa)
    //Exibindo na tela a tarefa
    const elementoTarefa = criarElementoTarefa(tarefa)
    ultarefas.append(elementoTarefa)
    atualizarTarefas()
    textarea.value = ''
    formularioTask.classList.add('hidden')

   

   
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ultarefas.append(elementoTarefa)

    
});