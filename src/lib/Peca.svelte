<script lang="ts">
    export let posX: string = "0%";
    export let posY: string = "0%";
    export let stateColor: string = "#ffffff";
</script>

<!-- Peca -->
<div style='--posX:{posX};--posY:{posY};--stateColor:{stateColor}'></div>
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
    }
</style>