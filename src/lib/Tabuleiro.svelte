<script lang="ts">
    import Peca from './Peca.svelte';

    // Constantes
    const lado = 3;
    const borda = 8;
    const profundidade = 3;
    const ladoTabuleiro = 500;
    const centro = Math.ceil(lado / 2) - 1;

    // Distancia para matriz interna
    const distanciaCentro = [0, 12.5, 25];

    // Linhas que unem as matrizes
    const conectores = [
        {
            l: `calc(50% - ${borda / 2}px)`,
            t: '0',
            w: `${borda}px`,
            h: `${distanciaCentro[2]}%`,
        },
        {
            l: `${100 - distanciaCentro[2]}%`,
            t: `calc(50% - ${borda / 2}px)`,
            w: `${distanciaCentro[2]}%`,
            h: `${borda}px`,
        },
        {
            l: `calc(50% - ${borda / 2}px)`,
            t: `${100 - distanciaCentro[2]}%`,
            w: `${borda}px`,
            h: `${distanciaCentro[2]}%`,
        },
        {
            l: '0',
            t: `calc(50% - ${borda / 2}px)`,
            w: `${distanciaCentro[2]}%`,
            h: `${borda}px`,
        }
    ];

    // Linhas que percorem a matriz
    interface PosicaoLinha {
        lado: number,
        dist: number
    }
    const linhas: PosicaoLinha[] = [];
    for (let i = 0; i < profundidade; i++) {
        linhas.push({
            lado: ladoTabuleiro - (ladoTabuleiro * (distanciaCentro[i] / 100)) * 2,
            dist: distanciaCentro[i]
        });
    }

    /**
     * Determina a posição da peça tendo os níveis internos como limitadores
     * @param i Posição atual
     * @param k Nível interno
     */
    function determinaPosicao(i: number, k: number): number {
        return (50 * i + 
                    (i == 1 
                        ? 0 
                        : (i < 1) 
                            ? distanciaCentro[k] 
                            : -distanciaCentro[k]))
    }

    // Peças do tabuleiro
    interface PosicaoPeca {
        x: string,
        y: string
    }
    const tabuleiro: PosicaoPeca[][] = [];
    for(let i = 0, k = 0; i < lado * profundidade; i++) {
        if (i != 0 && i % profundidade == 0) {
            k++;
        }

        const l = i % profundidade;
        tabuleiro.push([]);
 
        for(let j = 0; j < lado; j++) {
            if (l == centro && j == centro) {
                continue;
            }

            tabuleiro[i].push({
                x: `${determinaPosicao(l, k)}%`,
                y: `${determinaPosicao(j, k)}%`,
            });
        }
    }
</script>

<!-- Tabuleiro -->
<div style="--lado:{ladoTabuleiro}px;">

    <!-- PecasTabuleiro -->
    {#each tabuleiro as linha}
        {#each linha as peca}
            <Peca posX={peca.x} posY={peca.y}></Peca>
        {/each}
    {/each}
    <!-- ./PecasTabuleiro -->

    <!-- Linha -->
    {#each linhas as linha}
        <div class="linha" style="--lado:{linha.lado}px;--dist:{linha.dist}%;--borda:{borda}px;"></div>
    {/each}
    <!-- ./Linha -->

    <!-- Conectores -->
    {#each conectores as con}
        <div class="conectores" style="--l:{con.l};--w:{con.w};--t:{con.t};--h:{con.h};--borda:{borda}px;"></div>
    {/each}
    <!-- ./Conectores -->

</div>
<!-- ./Tabuleiro -->

<style>
    div {
        position: absolute;
        width: var(--lado);
        height: var(--lado);
    }

    .linha {
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