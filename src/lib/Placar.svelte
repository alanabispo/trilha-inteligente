<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Jogo } from './jogo';

    export let jogo: Jogo;

    const clickDispatch = createEventDispatcher();

    function handleClick() {
        jogo.mudarEstado();
        clickDispatch('iniciarJogo', {});
        console.log('haha', jogo.turno)
    }
</script>

<div>
    <div>Humano</div>
    <button on:click={handleClick}>
        {#if jogo.turno != true}
            Iniciar!
        {:else}
            Parar!
        {/if}
    </button>
    <div>IA</div> 
</div>

<style>
    div {
        display: flex;
        width: 100%;
        align-items: center;
    }

    div:nth-child(1) {
    }

    div:nth-child(2) {
    }

    div:nth-child(3) {
        display: flex;
        justify-content: right;
    }
</style>