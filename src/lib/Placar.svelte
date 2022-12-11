<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Jogo } from './jogo';
    import { Turno, type EstadoJogo } from "./tipos-basicos";

    export let jogo: Jogo;

    const clickDispatch = createEventDispatcher();

    function handleIniciar() {
        jogo.iniciarJogo();
        clickDispatch('iniciarJogo', {});
    }
</script>

<div>
Turno = 
{#if jogo.turno == Turno.Jogador1}
Jogador1
{:else if jogo.turno == Turno.Jogador2}
Jogador2
{:else}
Jogo não iniciado
{/if}
</div>

<button on:click={handleIniciar}>Iniciar</button>

<style>

</style>