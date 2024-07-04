
//Cor de fundo
const html = document.querySelector('html');
//Botoes
const focoBt =  document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
//img
const banner = document.querySelector('.app__image');
//timer
const tempoNaTela = document.querySelector('#timer');
const startPause = document.querySelector('#start-pause')
let intervaloID = null;
let tempoDecorridoEmSegundos= 1500;
const songPlay = new Audio('/sons/play.wav'); 
const songPause = new Audio('/sons/pause.mp3'); 
const songEnd = new Audio('/sons/beep.mp3'); 
const inciarOuPausarBt = document.querySelector('#start-pause span')
const IniciarOuPausarImagem = document.querySelector('.app__card-primary-butto-icon')
//titulo
const title = document.querySelector('.app__title');
//musica
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3'); //Fazendo uma instancia da classe audio

//Funçoes Musicas
musica.loop = true
musicaFocoInput.addEventListener('change', ()=> {
    if (musica.paused) {
        musica.play()
        
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')

})
curtoBt.addEventListener('click', ()=>{

    tempoDecorridoEmSegundos = 300 
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')

})

longoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 900 
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')

})

 function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto',contexto);
    banner.setAttribute('src',`/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":     
            title.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

            case "descanso-curto":
                title.innerHTML = `
                Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
                ` 
                break;
                case "descanso-longo":
                    title.innerHTML = `
                    Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
                    `
                default:
                    break;
    }
 }

const contagemRegressiva = ()=>{
    if(tempoDecorridoEmSegundos<=0){
       
        songEnd.play()
        alert('Tempo finalizado')
        zerar()
        return 
        
    }
    mostrarTempo()
    tempoDecorridoEmSegundos -= 1
}
startPause.addEventListener('click',inciarOuPausar)

function inciarOuPausar(){
    if(intervaloID){
        songPause.play()
        zerar() 
        inciarOuPausarBt.textContent = "Começar"
        IniciarOuPausarImagem.setAttribute('src',`/imagens/play_arrow.png`)

        
        return}
    intervaloID = setInterval(contagemRegressiva, 1000)
    songPlay.play()
    inciarOuPausarBt.textContent = "Pausar"
    IniciarOuPausarImagem.setAttribute('src',`/imagens/pause.png`)

}
function zerar(){
    clearInterval(intervaloID)
    intervaloID= null
}
function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-Br',{minute:'2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`

}
mostrarTempo()
