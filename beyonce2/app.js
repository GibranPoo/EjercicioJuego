const gameArea = document.getElementById("game-area")
const player = document.querySelector('#player')
const beyonce = document.querySelectorAll(`#beyonce`)[0]
const audio = document.querySelector('audio')
const playerSpeed = 35
const beyonceSpeed = 2

let isPlaying = false
let playerPosition = { x: 0, y: 0 }
let beyoncePosition = { x: 300, y: 300 }


/**
 * Esta función detecta cuando Beyonce ya te alcanzó
 */
function detectCollision () {
    const deltaX = Math.abs(playerPosition.x - beyoncePosition.x)
    const deltaY = Math.abs(playerPosition.y - beyoncePosition.y)

    if (deltaX <= 50 && deltaY <= 50) {
        if(confirm('Beyonce te atrapó! Rápido, dale las gracias para salvar tu vida')) {
            playerPosition.x = Math.floor(Math.random() * (gameArea.clientWidth - 70))
            playerPosition.y = Math.floor(Math.random() * (gameArea.clientHeight - 70))
        } else {
            
            alert('Perdiste :(')
            audio.pause()
            isPlaying = false
            cancelAnimationFrame(gameLoop)
            
        }
    }
}


function gameLoop(){
    
    requestAnimationFrame(gameLoop)
    moveBeyonce()
}

function moveBeyonce () {
    if (beyoncePosition.x < playerPosition.x) 
        beyoncePosition.x += beyonceSpeed
    else if (beyoncePosition.x > playerPosition.x)
        beyoncePosition.x -= beyonceSpeed

    if (beyoncePosition.y < playerPosition.y) 
        beyoncePosition.y += beyonceSpeed
    else if (beyoncePosition.y > playerPosition.y)
        beyoncePosition.y -= beyonceSpeed

    updatePosition()
    if (isPlaying)
        detectCollision()
}

function movePlayer (event) {
    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y >= 25) 
                playerPosition.y -= playerSpeed
            break
        case 'ArrowDown':
            if(playerPosition.y < gameArea.clientHeight - 70)
                playerPosition.y += playerSpeed
            break
        case 'ArrowLeft':
            if (playerPosition.x >= 25) 
                playerPosition.x -= playerSpeed
            break
        case 'ArrowRight':
            if(playerPosition.x < gameArea.clientWidth - 70)
                playerPosition.x += playerSpeed
            break
    }

    updatePosition()
}

function updatePosition () {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`
}

window.addEventListener('keydown', movePlayer)
window.addEventListener('click', () => {
    document.getElementById("boton-iniciar").onclick = ()=>
    {
        playerPosition = { x: 0, y: 0 }
        beyoncePosition = { x: 300, y: 300 }
        isPlaying = true
        audio.play()
        gameLoop()
        //document.getElementById("vol").innerHTML = beyonceSpeed;
    }
    
})

//Funcion para cambiar el volumen
document.getElementById('mislider').addEventListener('input', function(ev) {
    var reproductor = document.getElementById('reproductor');
    reproductor.volume = ev.target.value;
});

//Funcion para cambiar el color de fondo
document.getElementById("colorSelect").onchange = function (){
    var colorSeleccionado = document.getElementById("colorSelect").value;
    document.body.style.backgroundColor = colorSeleccionado;
}

//Funcion para cambiar personaje
document.getElementById("trollface").onclick = ()=>{
    player.style.backgroundImage = 'url(img/trollface.png)'
    player.style.backgroundSize = 'cover'
    
}


document.getElementById("happymeme").onclick = ()=>{
    player.style.backgroundImage = 'url(img/meme_cara1.jpg)'
    player.style.backgroundSize = 'cover'
}