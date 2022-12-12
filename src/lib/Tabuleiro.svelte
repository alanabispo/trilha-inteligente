<script lang="ts">
    import Placar from './Placar.svelte';
    import Peca from './Peca.svelte';
    import type { ActionFunction, EvtClickPeca } from './tipos-basicos';
    import { HandlerPeca, Jogo } from './jogo';
    import { CorPecas } from './constantes';

    // Debug
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

    // Cria o objeto principal do jogo
    let jogo = new Jogo(
        posicoesTotal,
    );

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

    // Posições das peças do tabuleiro
    interface PosicaoPeca {
        x: string,
        y: string,
        n: number,
        handler: HandlerPeca
    }
    let tabuleiro: PosicaoPeca[][] = [];
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
                handler: jogo.pecas[z]
            });
            z++;
        }
    }
    
    const pecasRealcadas = new Array(posicoesTotal).fill(false);
    const corPecas = new Array(posicoesTotal).fill(CorPecas[0]);

    function handleClickPeca(evt: CustomEvent) {
        console.log('Peca clicada', evt);
        const evtDetails: EvtClickPeca = evt.detail; 
        corPecas[evtDetails.num] = CorPecas[jogo.turno];
        jogo.executarClick();
    }

    // Realça as peças que podem ser movidas
    function ativarRealceTodasPecas() {
        for (let i = 0; i < posicoesTotal; i++) {
            pecasRealcadas[i] = true;
        }
    }

    function desativarRealceTodasPecas() {
        for (let i = 0; i < posicoesTotal; i++) {
            pecasRealcadas[i] = false;
        }
    }

    function limpaEstadoTodasPecas() {
        for (let i = 0; i < posicoesTotal; i++) {
            corPecas[i] = CorPecas[0];
        }
    }

    function onMudarEstado() {
        const estado = jogo.mudarEstado();

        limpaEstadoTodasPecas();

        if (estado) {
            ativarRealceTodasPecas();
        } else {
            desativarRealceTodasPecas();
        }

        jogo = jogo;
    }

</script>

<!-- Placar -->
<Placar 
    on:mudarEstado={onMudarEstado} 
    isJogoRunning={jogo.isJogoRunning}
    turno={jogo.turno}
    vitoriasJogador1={jogo.vitorias[0]}
    vitoriasJogador2IA={jogo.vitorias[0]}
></Placar>
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
                    num={peca.n}
                    displayNumero={displayNumero}
                    realce={pecasRealcadas[peca.n]}
                    corPeca={corPecas[peca.n]}
                    
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