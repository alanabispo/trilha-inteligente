<script lang="ts">
    import { Turno, type EstadoJogo } from "./peca-estado";

    export let estadoJogo: EstadoJogo;

    function handleIniciar() {
        estadoJogo.turno = Turno.Jogador1;
    }
</script>

<div>
Turno = 
{#if estadoJogo.turno == Turno.Jogador1}
Jogador1
{:else if estadoJogo.turno == Turno.Jogador2}
Jogador2
{:else}
Jogo não iniciado
{/if}
</div>

<button on:click={handleIniciar}>Iniciar</button>

<style>

</style>