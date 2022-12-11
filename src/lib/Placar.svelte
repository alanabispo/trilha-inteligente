<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    import type { Jogo } from './jogo';
    
    import MulherNegra from '../assets/mulher-negra.png';
    import Robo from '../assets/robo.png';
    import { Turno } from './tipos-basicos';

    export let jogo: Jogo;

    const clickDispatch = createEventDispatcher();

    function handleClick() {
        jogo.mudarEstado();
        clickDispatch('iniciarJogo', {});
        console.log('haha', jogo.turno)
    }
</script>

<div class="placar">
    <!-- CardHumano -->
    <div>
        <div><img src="{MulherNegra}" alt="mulher negra representando humanidade"></div>
        
        <div class="nome-jogador">
            <p><b>Humano P1</b></p>
            <p>Vitórias: 0</p>
        </div>

        <div class:exibir={jogo.turno == Turno.Jogador1}> Sua vez!</div>
    </div>
    <!-- ./CardHumano -->

    <!-- BotaoJogo -->
    <button on:click={handleClick}>
        {#if jogo.isJogoRunning != true}
            Iniciar!
        {:else}
            Parar!
        {/if}
    </button>
    <!-- ./BotaoJogo -->

    <!-- CardIA -->
    <div>
        <div class:exibir={jogo.turno == Turno.Jogador1}> Vez oponente!</div>
        
        <div class="nome-jogador">
            <p><b>IA P2</b></p>
            <p>Vitórias: 0</p>
        </div>
        
        <div><img src="{Robo}" alt="robo representando inteligência artificial"></div>
    </div> 
    <!-- ./CardIA -->
</div>

<style>
    .exibir {
        opacity: 1;
    }

    div {
        display: flex;
    }

    .placar {
        width: 100%;
        align-items: center;
        margin-bottom: 25px;
    }

    .placar > div {
        width: 100%;
        align-items: center;
    }

    .placar > div:nth-child(3) {
        justify-content: right;
    }

    .placar > div:nth-child(1) > div:nth-child(3) {
        border: 1px solid #333;
        padding: 3px 8px;
        border-radius: 10px;
        background-color: rgb(56, 153, 0);
        color: #fff;
        font-weight: 700;
        opacity: 0;
    }

    .placar > div:nth-child(3) > div:nth-child(1) {
        border: 1px solid #333;
        padding: 3px 8px;
        border-radius: 10px;
        background-color: rgb(197, 60, 6);
        color: #fff;
        font-weight: 700;
        opacity: 0;
    }

    img {
        width: 80px;
        height: 80px;
        overflow: hidden;
        border-radius: 100%;
        border: 3px solid #333;
        padding: 2px;
    }

    .nome-jogador {
        flex-direction: column;
        height: 100%;
        border: 2px solid #333;
        padding: 0 10px;
        border-radius: 8px;
    }

    div:nth-child(3) > .nome-jogador:nth-child(2) {
        border-right: 0;
    }

    div:nth-child(1) > .nome-jogador:nth-child(2) {
        border-left: 0;
    }

    .nome-jogador > p {
        margin: 0 10px;
        padding: 0;
        display: flex;
        justify-content: center;
    }
    
    .nome-jogador > p:nth-child(1) {
        margin: 2px;
    }
</style>