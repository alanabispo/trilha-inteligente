<script lang="ts">
    import Placar from './Placar.svelte';
    import Peca from './Peca.svelte';
    import { Turno, type ActionFunction, type EvtClickPeca } from './tipos-basicos';
    import { DadosPeca, Jogo } from './jogo';
    import { CorPecas, Mensagens } from './constantes';

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

    let msgP1: Mensagens = Mensagens.Aguardando;
    let msgP2: Mensagens = Mensagens.Aguardando;

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
        handler: DadosPeca
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


    // Realça todas as peças que podem ser movidas
    function ativarRealceTodasPecas(): void {
        for (let i = 0; i < posicoesTotal; i++) {
            if (corPecas[i] == CorPecas[0]) {
                pecasRealcadas[i] = true;
            }
        }
    }

    // Remove o realce de todas as peças
    function desativarRealceTodasPecas(): void {
        for (let i = 0; i < posicoesTotal; i++) {
            pecasRealcadas[i] = false;
        }
    }

    function ativarRealceAdjacentes(num: number): void {
        //const pecasAdjacentes = jogo.getAdjacentes();


    }

    // Deixa as peças com a mesma cor inicial
    function limpaEstadoTodasPecas(): void {
        for (let i = 0; i < posicoesTotal; i++) {
            corPecas[i] = CorPecas[0];
        }
    }

    // Toda vez que se desejar reiniciar um jogo
    function onMudarEstado(): void {
        const estado = jogo.mudarEstado();

        limpaEstadoTodasPecas();

        if (estado) {
            ativarRealceTodasPecas();
            msgP1 = Mensagens.Coloca;
            msgP2 = Mensagens.Coloca;
        } else {
            desativarRealceTodasPecas();
            msgP1 = Mensagens.Aguardando;
            msgP2 = Mensagens.Aguardando;
        }

        jogo = jogo;
        novoTurno = jogo.turno;
    }

    let novoTurno = jogo.turno;

    function handleClickPeca(evt: CustomEvent): void {
        const evtDetails: EvtClickPeca = evt.detail;
        
        const turnoAtual = jogo.turno;

        if (jogo.executarClick(evtDetails.num)) {
            corPecas[evtDetails.num] = CorPecas[turnoAtual];
        }

        novoTurno = jogo.turno;

        if (jogo.turno == Turno.Jogador1) {
            ativarRealceTodasPecas();
        } else {
            desativarRealceTodasPecas();
        }
    }

</script>

<!-- Placar -->
<Placar 
    on:mudarEstado={onMudarEstado} 
    isJogoRunning={jogo.isJogoRunning}
    turno={novoTurno}
    msgP1={msgP1}
    msgP2={msgP2}
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