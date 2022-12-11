<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    import type { Jogo } from './jogo';
    
    import MulherNegra from '../assets/mulher-negra.png';
    import Robo from '../assets/robo.png';

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
        <div>Humano</div>
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
        <div>IA</div>
        <div><img src="{Robo}" alt="robo representando inteligência artificial"></div>
    </div> 
    <!-- ./CardIA -->
</div>

<style>

    div {
        display: flex;
        width: 100%;
    }

    .placar {
        align-items: center;
        margin-bottom: 25px;
    }

    img {
        width: 80px;
        height: 80px;
        overflow: hidden;
        border-radius: 100%;
        border: 3px solid #333;
        padding: 2px;
    }
</style>