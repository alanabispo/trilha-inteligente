<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Jogo } from './jogo';

    import {NumJogador, Turno, type EstadoJogo, type PecaEstado} from './tipos-basicos';

    const clickDispatch = createEventDispatcher();

    export let posX: string = '0%';
    export let posY: string = '0%';
    export let num: number = 0;
    export let estado: PecaEstado;
    export let jogo: Jogo;

    export let displayNumero: boolean = false;

    const CorPecas = {
        [NumJogador.SemJogador]: 'white',
        [NumJogador.Jogador1]: 'red',
        [NumJogador.Jogador2]: 'green'
    }

    $: corPeca = CorPecas[estado.jogador];

    // Intercepta o click
    function handleClick() {
        if (jogo.turno == Turno.Parado ) return;

        if (jogo.turno == Turno.Jogador1){
            estado.jogador = NumJogador.Jogador1;
        }
        else {
            estado.jogador = NumJogador.Jogador2;
        } 

        clickDispatch('clickPeca', {
            num,
            jogador: estado.jogador
        });
    }
</script>

<!-- Peca -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={handleClick} style='--posX:{posX};--posY:{posY};--stateColor:{corPeca}'>
    {#if displayNumero}
        {num}
    {/if}
</div>
<!-- ./Peca -->

<style>
    div {
        --lado: 40px;
        --borda: 3px;
        border-radius: 100%;
        width: var(--lado);
        height: var(--lado);
        border: var(--borda) solid black;
        position:absolute;
        left: calc(var(--posX) - ( var(--lado) / 2 ) - var(--borda));
        top: calc(var(--posY) - ( var(--lado) / 2 ) - var(--borda));
        background-color: var(--stateColor);
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        caret-color: transparent
    }
</style>