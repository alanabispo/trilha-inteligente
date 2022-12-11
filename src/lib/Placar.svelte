<script lang="ts">
    import { createEventDispatcher } from 'svelte';
        
    import MulherNegra from '../assets/mulher-negra.png';
    import Robo from '../assets/robo.png';
    import { Turno } from './tipos-basicos';

    export let vitoriasJogador1 = 0;
    export let vitoriasJogador2IA = 0;

    export let isJogoRunning = false;
    export let turno: Turno = Turno.Parado;

    const clickDispatch = createEventDispatcher();

    function handleClick() {
        clickDispatch('mudarEstado', {});
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

        <div class:exibir={turno == Turno.Jogador1}> Sua vez!</div>
    </div>
    <!-- ./CardHumano -->

    <!-- BotaoJogo -->
    <button class:pararJogo={isJogoRunning} on:click={handleClick}>
        {#if isJogoRunning}
            Parar!
        {:else}
            Iniciar!
        {/if}
    </button>
    <!-- ./BotaoJogo -->

    <!-- CardIA -->
    <div>
        <div class:exibir={turno == Turno.Jogador2IA}> Vez oponente!</div>
        
        <div class="nome-jogador">
            <p><b>IA P2</b></p>
            <p>Vitórias: 0</p>
        </div>
        
        <div><img src="{Robo}" alt="robo representando inteligência artificial"></div>
    </div> 
    <!-- ./CardIA -->
</div>

<style>
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
        background-color: #389900;
        color: #fff;
        font-weight: 700;
        opacity: 0;
    }

    .placar > div:nth-child(3) > div:nth-child(1) {
        border: 1px solid #333;
        padding: 3px 8px;
        border-radius: 10px;
        background-color: #c53c06;
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

    div:nth-child(1) > div > img {
        border-color: #3d9900;
    }

    div:nth-child(3) > div > img {
        border-color: #d80606;
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

    .exibir {
        opacity: 1 !important;
    }

    .pararJogo {
        background-color: #d80606;
    }
</style>