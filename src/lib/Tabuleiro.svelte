<script lang="ts">
    import {NumJogador, TipoOcupacao, Turno, type EstadoJogo} from './peca-estado';
    import type {PecaEstado} from './peca-estado';
    
    import Placar from './Placar.svelte';
    import Peca from './Peca.svelte';

    const displayNumero = false;

    // Constantes
    const lado = 3;
    const borda = 8;
    const profundidade = 3;
    const posicoesTotal = 24;
    const centro = Math.ceil(lado / 2) - 1;

    // Tamanho fisico do lado do tabuleiro
    const ladoTabuleiro = 500; // px 

    // Distancia para matriz interna
    const distanciaCentro = [0, 12.5, 25];

    // Jogo
    const estadoJogo: EstadoJogo = {
        turno: Turno.Parado
    };

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

    // Grafo - lista de adjacência - Contem os vizinhos
    const grafo = [
        // Primeiro anel
        [1, 3],         // 0
        [0, 2, 9],      // 1
        [1, 4],         // 2
        [0, 5, 11],     // 3
        [2, 7, 12],     // 4
        [3, 6],         // 5
        [5, 7, 14],     // 6
        [4, 6],         // 7
        // Segundo anel
        [9, 11],        // 8
        [1, 8, 10, 17], // 9
        [9, 12],        // 10
        [3, 8, 13, 19], // 11
        [4, 10, 15, 20],// 12
        [11, 14],       // 13
        [6, 13, 15, 22],// 14
        [12, 14],       // 15
        // Terceiro anel
        [17, 19],       // 16
        [9, 16, 18],    // 17
        [17, 20],       // 18
        [11, 16, 21],   // 19
        [12, 18, 23],   // 20
        [19, 22],       // 21
        [14, 21, 23],   // 22
        [20, 22],       // 23
    ];

    // Grafo - matriz de adjacência - Contém o estado do grafo
    const grafoEstado: TipoOcupacao[][] = new Array(posicoesTotal)
        .fill(-1)
        .map(_ => new Array(posicoesTotal).fill(-1));
    for (let i = 0; i < grafo.length; i++) {
        for (const j of grafo[i]) {
            grafoEstado[i][j] = TipoOcupacao.Vazio;
        }
    }

    // Peças do tabuleiro
    const pecas: PecaEstado[] = new Array(posicoesTotal)
        .fill(0)
        .map(_ => ({
            jogador: NumJogador.SemJogador
        }));

    // Posições das peças do tabuleiro
    interface PosicaoPeca {
        x: string,
        y: string,
        n: number,
        estado: PecaEstado
    }
    const tabuleiro: PosicaoPeca[][] = [];
    for(let i = 0, k = 0, z = 0; i < lado * profundidade; i++) {
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
                x: `${determinaPosicao(j, k)}%`,
                y: `${determinaPosicao(l, k)}%`,
                n: z,
                estado: pecas[z]
            });
            z++;
        }
    }

    function handleClickPeca() {
        
    }
</script>

<!-- Placar -->
<Placar estadoJogo={estadoJogo}></Placar>
<!-- ./Placar -->

<div class="container-tabuleiro">

    <!-- Tabuleiro -->
    <div class="tabuleiro" style="--lado:{ladoTabuleiro}px;">

        <!-- PecasTabuleiro -->
        {#each tabuleiro as linha}
            {#each linha as peca}
                <Peca 
                    on:clickPeca={handleClickPeca}
                    posX={peca.x} posY={peca.y} 
                    num={peca.n} estado={peca.estado}
                    displayNumero={displayNumero}
                    estadoJogo={estadoJogo}
                ></Peca>
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

</div>

<style>
    .container-tabuleiro {
        margin: 0 auto;
        width: 100%;
        min-height: 600px;
        align-items: center;
        justify-content: center;
        display: flex;
    }

    .tabuleiro {
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
        position: absolute;
        background-color: #000;
        width: var(--w);
        height: var(--h);
        left: var(--l);
        top: var(--t);
    }
</style>