<script lang="ts">
    import Peca from './Peca.svelte';

    const lado = 3;
    const centro = Math.ceil(lado / 2) - 1;

    const profundidade = 3;
    const distanciaCentro = [0, 12.5, 25];

    const tabuleiro = [];
    const ladoTabuleiro = 500;

    const conectores = [
        {
            l: 'calc(50% - 4px)',
            t: '0',
            w: '8px',
            h: '25%'
        },
        {
            l: '75%',
            t: 'calc(50% - 4px)',
            w: '25%',
            h: '8px'
        },
        {
            l: 'calc(50% - 4px)',
            t: '75%',
            w: '8px',
            h: '25%',
        },
        {
            l: '0',
            t: 'calc(50% - 4px)',
            w: '25%',
            h: '8px'
        }
    ];

    const linhas = [];
    for (let i = 0; i < profundidade; i++) {
        linhas.push({
            lado: ladoTabuleiro - (ladoTabuleiro * (distanciaCentro[i] / 100)) * 2,
            dist: distanciaCentro[i]
        });
    }

    for(let i = 0, k = 0; i < lado * profundidade; i++) {
        if (i != 0 && i % profundidade == 0) {
            k++;
        }
        tabuleiro.push([]);
 
        for(let j = 0; j < lado; j++) {
            console.log("A", i, j);
            if ((i % 3) == centro && j == centro) {
                continue;
            }

            tabuleiro[i].push({
                x: `${
                    50 * (i % 3) + 
                    ((i % 3) == 1 
                        ? 0 
                        : ((i % 3) < 1) 
                            ? distanciaCentro[k] 
                            : -distanciaCentro[k])
                }%`,
                y: `${
                    50 * j + 
                    (j == 1 
                        ? 0 
                        : (j < 1) 
                            ? distanciaCentro[k] 
                            : -distanciaCentro[k])
                }%`,
            });
        }
    }
</script>

<div style="--lado:{ladoTabuleiro}px;">
    {#each tabuleiro as linha}
        {#each linha as peca}
            <Peca posX={peca.x} posY={peca.y}></Peca>
        {/each}
    {/each}

    {#each linhas as linha}
        <div class="linha" style="--lado:{linha.lado}px;--dist:{linha.dist}%;"></div>
    {/each}

    {#each conectores as con}
        <div class="conectores" style="--l:{con.l};--w:{con.w};--t:{con.t};--h:{con.h};"></div>
    {/each}
</div>

<style>
    div {
        position: absolute;
        width: var(--lado);
        height: var(--lado);
    }

    .linha {
        --borda: 8px;
        position: absolute;
        border: var(--borda) solid black;
        width: calc(var(--lado) - (var(--borda)));
        height: calc(var(--lado) - (var(--borda)));
        z-index: 1;
        left: calc(var(--dist) - (var(--borda) / 2));
        top: calc(var(--dist) - (var(--borda) / 2));
    }

    .conectores {
        background-color: #000;
        width: var(--w);
        height: var(--h);
        left: var(--l);
        top: var(--t);
    }
</style>