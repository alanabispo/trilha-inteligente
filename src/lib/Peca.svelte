<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import { CorPecas } from './constantes';
    import {NumJogador, type EvtClickPeca} from './tipos-basicos';

    const clickDispatch = createEventDispatcher();

    export let posX: string = '0%';
    export let posY: string = '0%';
    export let num: number = 0;

    export let realce = false;
    export let seleciona = false;
    export let displayNumero: boolean = false;
    export let corPeca = CorPecas[NumJogador.SemJogador];

    // Intercepta o click
    function handleClick(): void {
        clickDispatch('clickPeca', {
            num,
            corPeca
        } as EvtClickPeca);
    }
</script>

<!-- Peca -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={handleClick} 
    class:realce="{realce}"
    class:seleciona="{seleciona}"
    style='--posX:{posX};--posY:{posY};--stateColor:{corPeca}'>
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
        caret-color: transparent;
    }

    .realce {
        box-shadow: 0px 0px 3px 5px #57FF00;
        transition: box-shadow 0.3s ease-in-out;
        cursor: pointer;
    }

    .seleciona {
        box-shadow: 0px 0px 3px 5px #0655ff;
        transition: box-shadow 0.3s ease-in-out;
    }

    .realce:hover {
        box-shadow:0px 0px 3px 7px #226400;
        transition: box-shadow 0.3s ease-in-out;
    }

    .realce:active {
        box-shadow: 0px 0px 3px 7px #7af03f;
        transition: box-shadow 0.1s ease-in-out;
    }
</style>