<script lang="ts">
    import Placar from './Placar.svelte';
    import Peca from './Peca.svelte';
    //import { RodadaJogo, Turno, type EvtClickPeca, type PosicaoLinha, type PosicaoPeca } from './tipos-basicos';
    import { Jogo } from './jogo';
    import { CorPecas, Mensagens } from './constantes';
    import { NumJogador, type EvtClickPeca, type PosicaoLinha, type PosicaoPeca } from './tipos-basicos';

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

    const linhas: PosicaoLinha[] = [];

    const pecasSelecionada: boolean[] = new Array(posicoesTotal).fill(false);
    const pecasRealcadas: boolean[] = new Array(posicoesTotal).fill(false);
    const corPecas = new Array(posicoesTotal).fill(CorPecas[0]);
    
    let novoTurno = jogo.turno;

    let tabuleiro: PosicaoPeca[][] = [];
    
    let msgP1: Mensagens = Mensagens.Aguardando;
    let msgP2: Mensagens = Mensagens.Aguardando;

    // Linhas que percorem a matriz
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

    // Ativa realce nas peças adjacentes
    function ativarRealceAdjacentes(adjacentes: number[]): void {
        for (const adjacente of adjacentes) {
            pecasRealcadas[adjacente] = true;
        }
    }

    function limpaRealces() {
        for (let i = 0 ; i < posicoesTotal; i++) {
            pecasRealcadas[i] = false;
            pecasSelecionada[i] = false;
        }
    }

    let finalizaJogo = false;

    // Toda vez que se desejar reiniciar um jogo
    function onMudarEstado(): void {
        const estado = jogo.mudarEstado();
        finalizaJogo = false;

        limpaRealces();

        for (let i = 0; i < posicoesTotal; i++) {
            corPecas[i] = CorPecas[NumJogador.SemJogador];
        }

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

    let modoRemocao = false;
    let totalRodadas = 0;

    function handleClickPeca(evt: CustomEvent): void {
        const evtDetails: EvtClickPeca = evt.detail;
        const turnoAtual = jogo.turno;

        if (modoRemocao) {
            if (jogo.executarClickRemocao(evtDetails.num)) {
                modoRemocao = false;
                corPecas[evtDetails.num] = CorPecas[NumJogador.SemJogador];
                limpaRealces();
            }

            return;
        }

        jogo.executarClick(evtDetails.num)
            .then((res) => {
                console.log('Res', res);

                if (res.erro) return;

                corPecas[evtDetails.num] = CorPecas[turnoAtual];

                for (const pintura of res.removerPintura) {
                    corPecas[pintura] = CorPecas[NumJogador.SemJogador];
                }

                limpaRealces();

                for (const peca of res.pecaRealcadas) {
                    pecasRealcadas[peca] = true;
                }

                for (const peca of res.pecaSelecionada) {
                    pecasSelecionada[peca] = true;
                }

                jogo = jogo;
                novoTurno = jogo.turno;
                
                if (!!res.msgP1) {
                    msgP1 = res.msgP1;
                }
                if (!!res.msgP2) {
                    msgP2 = res.msgP2;
                }

                modoRemocao = res.permiteRemocao;
            })
            .then(() => {
                const ganhador = jogo.alguemGanhou();
                if (jogo.alguemGanhou() != NumJogador.SemJogador) {
                    finalizaJogo = true;
                    if (ganhador == NumJogador.Jogador1) {
                        alert("Jogador Humano ganhou!");
                        return;
                    }

                    alert("Jogador Computador ganhou!");
                    return;
                }

                totalRodadas++;
                if (totalRodadas == 100) {
                    alert("Empate!");
                    finalizaJogo = true;

                    return;
                }
            });
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
                    seleciona={pecasSelecionada[peca.n]}
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