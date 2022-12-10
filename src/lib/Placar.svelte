<script lang="ts">
    import { Turno } from "./peca-estado";

    export let turno: Turno;

    function handleIniciar() {
        turno = Turno.Jogador1;
    }
</script>

<div>
Turno = 
{#if turno == Turno.Jogador1}
Jogador1
{:else if turno == Turno.Jogador2}
Jogador2
{:else}
Jogo não iniciado
{/if}
</div>

<button on:click={handleIniciar}>Iniciar</button>

<style>

</style>