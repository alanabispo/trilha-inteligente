import { Mensagens } from "./constantes";
import { 
    NumJogador, 
    RodadaJogo, 
    TipoOcupacao, 
    Turno 
} from "./tipos-basicos";

/**
 * Representa as proximas posicoes de movimento
 */
export enum TipoProximasPosicoes {
    Adjacentes,
    QualquerLugar
}

export interface ProximasPosicoes {
    posicoes: number[];
    tipo: TipoProximasPosicoes;
}

export enum EstadoFimJogo {
    Jogador1Ganhou,
    Jogador2Ganhou,
    Empate,
    FecharJogo
}

export class DadosPeca {
    jogador: NumJogador;
    selecionada: boolean;

    constructor(public adjacentes: number[]) {
        this.init();
        this.selecionada = false;
    }

    init() {
        this.jogador = NumJogador.SemJogador;
    }
}

/**
 * Representa todos os estados de um jogador em especifico.
 * O jogador retem e organiza tudo necessário 
 */
export class Jogador {
    private _id: number;
    public rodadaJogador: RodadaJogo;
    public numRodadas: number;
    public pecasDisponiveis: number;

    constructor(id: number) {
        this.resetarJogo();
        this._id = id;
        this.numRodadas = 0;
    }

    resetarJogo() {
        this.rodadaJogador = RodadaJogo.ColocarPecas;
        this.numRodadas = 0;
        this.pecasDisponiveis = 0;
    }

    get id() {
        return this._id;
    }
}

/**
 * Classe principal do jogo, responsavel pelas acoes 
 * performadas e pela interface com a IA
 */
export class Jogo {    
    public readonly grafo: number[][];
    public readonly trincas: [number,number,number][];
    public grafoEstado: TipoOcupacao[][];
    public pecas: DadosPeca[];
    public jogadores: [Jogador, Jogador];
    public pecaSelecionada: number;
    
    public func: {[key: string]: any};

    private _numRodadas: number;
    private _turno: Turno;
    private _trincaAtiva: [{[key: string]: boolean}, {[key: string]: boolean}];

    constructor(
        public posicoesTotal: number
    ) {
        // Grafo - lista de adjacência - Contem os vizinhos
        this.grafo = [
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

        // Trincas
        this.trincas = [
            // Primeiro anel
            [0, 1, 2],
            [2, 4, 7],
            [7, 6, 5],
            [5, 3, 0],
            // Segundo anel
            [8, 9, 10],
            [10, 12, 15],
            [15, 14, 13],
            [13, 11, 8],
            // Terceiro anel
            [16, 17, 18],
            [18, 20, 23],
            [23, 22, 21],
            [21, 19, 16],
            // Linhas
            [1, 9, 17],
            [4, 12, 20],
            [6, 14, 22],
            [3, 11, 19],
        ];

        // Peças do tabuleiro
        this.pecas = new Array(posicoesTotal)
            .fill(0)
            .map((_, i) => (new DadosPeca(this.grafo[i])));

        // Grafo - matriz de adjacência - Contém o estado do grafo
        this.grafoEstado = new Array(posicoesTotal)
            .fill(-1)
            .map(_ => new Array(posicoesTotal).fill(TipoOcupacao.NaoUtilizada));

        // Inicializa o turno atual
        this._turno = Turno.Parado;
        this.pecaSelecionada = -1;

        this.func = [];
        this._trincaAtiva = [{}, {}];
    }

    get turno() {
        return this._turno;
    }

    get numRodadas() {
        return this._numRodadas;
    }

    get isJogoRunning() {
        return this._turno != Turno.Parado;
    }

    /**
     * Inicia um novo jogo
     */
    iniciarJogo(): void {
        this._numRodadas = 0;
        this._turno = Turno.Jogador1;
        
        // Inicializa o momento de cada jogador
        this.jogadores = [
            new Jogador(1),
            new Jogador(2),
        ];

        // Preenche as ocupacoes do jogo
        for (let i = 0; i < this.grafo.length; i++) {
            for (const j of this.grafo[i]) {
                this.grafoEstado[i][j] = TipoOcupacao.Vazio;
            }
        }

        // Remove marcação de cor do jogador
        this.pecas = this.pecas.map((_, i) => (new DadosPeca(this.grafo[i])));    
    }

    /**
     * Finaliza o jogo atual
     */
    finalizaJogo(estadoFim: EstadoFimJogo): void {
    }

    /**
     * Limpa o tabuleiro
     */
    cleanTabuleiro(): void {
        // Preenche as ocupacoes do jogo
        for (let i = 0; i < this.grafo.length; i++) {
            for (const j of this.grafo[i]) {
                this.grafoEstado[i][j] = TipoOcupacao.Vazio;
            }
        }
    }

    /**
     * Troca o estado do jogo de ativo para inativo e vice-versa
     * @returns retorna o novo estado do jogo
     */
    mudarEstado(): boolean {
        if (this._turno != Turno.Parado) {
            this._turno = Turno.Parado;
            this.cleanTabuleiro();
            
            return false;
        }

        this.iniciarJogo();
        return true;
    }

        /**
     * Executa um click em uma peça
     */
    executarClick(num: number): Promise<RetornoAcao> {


        /*

        if (this._turno == Turno.Jogador1) {
            if (
                this.jogadores[0].rodadaJogador == RodadaJogo.MoverPecas
            ) {
                if (this.pecaSelecionada >= 0 && num != this.pecaSelecionada &&
                    this.pecas[num].jogador != NumJogador.Jogador1
                ) {
                    return [false, ['', '']];
                } else if (this.pecaSelecionada >= 0 && num == this.pecaSelecionada) {
                    return [false, ['', '']]; 
                } else if (num != this.pecaSelecionada &&
                    this.pecas[num].jogador == NumJogador.SemJogador
                ) {
                    this.pecaSelecionada = -1;
                }

                //return [false, ['', '']];
            } else if (this.jogadores[0].rodadaJogador == RodadaJogo.FlutuarPecas) {
                
                
                return [false, ['', '']];
            } else {
                if (this.pecas[num].jogador != NumJogador.SemJogador) {
                    return [false, ['', '']];
                }
            }

            this.jogadores[0].pecasDisponiveis++;
            this.jogadores[0].numRodadas++;
            this.pecas[num].jogador = NumJogador.Jogador1;
            this._turno = Turno.Jogador2IA;
        } else {
            if (
                this.jogadores[1].rodadaJogador == RodadaJogo.MoverPecas ||
                this.jogadores[1].rodadaJogador == RodadaJogo.FlutuarPecas
            ) {
                [false, ['', '']];
            } else {
                if (this.pecas[num].jogador != NumJogador.SemJogador) {
                    return [false, ['', '']];
                }
            }

            this.jogadores[1].pecasDisponiveis++;
            this.jogadores[1].numRodadas++;
            this.pecas[num].jogador = NumJogador.Jogador2IA;
            this._turno = Turno.Jogador1;
        }

        this._numRodadas++;

        let msg1, msg2;

        if (this.jogadores[0].numRodadas < 9) {
            msg1 = Mensagens.Coloca;
        } else if (this.jogadores[0].numRodadas >= 9 && this.jogadores[0].pecasDisponiveis > 3) {
            msg1 = Mensagens.Move;
            this.jogadores[0].rodadaJogador = RodadaJogo.MoverPecas;
        } else {
            msg1 = Mensagens.Voa;
            this.jogadores[0].rodadaJogador = RodadaJogo.FlutuarPecas;
        }

        if (this.jogadores[1].numRodadas < 9) {
            msg2 = Mensagens.Coloca;
        } else if (this.jogadores[1].numRodadas >= 9 && this.jogadores[1].pecasDisponiveis > 3) {
            msg2 = Mensagens.Move;
            this.jogadores[1].rodadaJogador = RodadaJogo.MoverPecas;
        } else {
            msg2 = Mensagens.Voa;
            this.jogadores[1].rodadaJogador = RodadaJogo.FlutuarPecas;
        }

        return [true, [msg1, msg2]];
        */
        const retornaFalha = () => {
            return {
                tipoAcao: TiposAcao.Falha,
                pecaSelecionada: [],
                pecaRealcadas: [],
                exibeAlertaGanhou: false,
                exibeAlertaPerdeu: false,
                permiteRemocao: false,
                erro: true
            } as RetornoAcao;
        }

        if (this._turno == Turno.Parado) {
            return new Promise(retornaFalha);
        };

        const idJogador = this._turno == Turno.Jogador1 ? 0 : 1;
        const turnoJogador = this._turno == Turno.Jogador1 ? NumJogador.Jogador1 : NumJogador.Jogador2IA;
        const novoTurno = this._turno == Turno.Jogador1 ? Turno.Jogador2IA : Turno.Jogador1;

        const verificaPecaVazia = () => {
            if (this.pecas[num].jogador == NumJogador.SemJogador) {
                return;
            }

            return Promise.reject();
        };

        const objToKey = (obj) => JSON.stringify(obj);
        const keyToObj = (obj) => JSON.parse(obj);

        const verificaTrinca = (): [boolean, number[]] => {            
            const trincas: { [key: string]: boolean } = {};
            
            for(const [pos1, pos2, pos3] of this.trincas) {
                if (this.pecas[pos1].jogador == turnoJogador &&
                    this.pecas[pos2].jogador == turnoJogador &&
                    this.pecas[pos3].jogador == turnoJogador
                ) {
                    const trinca = [pos1, pos2, pos3];
                    trincas[objToKey(trinca)] = true;
                }
            }

            // Se trinca existia previamente ignora ela se é nova armazena
            let trinca;
            let achouTrinca = false;
            for (const keyTrinca in trincas) {
                if (!this._trincaAtiva[idJogador][keyTrinca]) {
                    achouTrinca = true;
                    trinca = keyToObj(keyTrinca);
                }
            }
            
            this._trincaAtiva[idJogador] = trincas;

            return [achouTrinca, trinca];
        };

        const retornaColocarPecas = ([trinca, pecas]: [boolean, number[]]): RetornoAcao => {
            if (trinca) {
                return {
                    exibeAlertaGanhou: false,
                    exibeAlertaPerdeu: false,
                    pecaRealcadas: [],
                    pecaSelecionada: pecas,
                    permiteRemocao: true,
                    erro: false
                } as RetornoAcao;
            }

            return {
                exibeAlertaGanhou: false,
                exibeAlertaPerdeu: false,
                pecaRealcadas: [],
                pecaSelecionada: [],
                permiteRemocao: false,
                erro: false
            } as RetornoAcao;
        };

        const incrementaRodada = () => {
            this._numRodadas++;
            this.jogadores[idJogador].numRodadas++;
            this._turno = novoTurno;
        };

        const ocupaPeca = () => {
            if (this.jogadores[idJogador].numRodadas < 8) {
                this.pecas[num].jogador = turnoJogador;
                return;
            } 
            
            this.pecas[num].jogador = turnoJogador;
            this.jogadores[idJogador].rodadaJogador = RodadaJogo.MoverPecas;
        };

        const verificaSePecaJogador = () => {
            if (this.pecas[num].jogador == turnoJogador) {
                return;
            }

            return Promise.reject();
        };

        const retornaMoverPecas = () => {
            const adjacentesLivres = [];

            for (const adjacente of this.grafo[num]) {
                console.log('this.pecas[adjacente].jogador', this.pecas[adjacente].jogador)
                if (this.pecas[adjacente].jogador == NumJogador.SemJogador) {
                    adjacentesLivres.push(adjacente);
                }
            }
            console.log(adjacentesLivres)

            return {
                exibeAlertaGanhou: false,
                exibeAlertaPerdeu: false,
                pecaRealcadas: adjacentesLivres,
                pecaSelecionada: [num],
                permiteRemocao: false,
                erro: false
            } as RetornoAcao;
        };

        // O código começa aqui
        switch(this.jogadores[idJogador].rodadaJogador) {
            case RodadaJogo.ColocarPecas:
                return Promise.resolve()
                    .then(verificaPecaVazia)
                    .then(ocupaPeca)
                    .then(incrementaRodada)
                    .then(verificaTrinca)
                    .then(retornaColocarPecas)
                    .catch(retornaFalha);
            case RodadaJogo.MoverPecas:
                    return Promise.resolve()
                        .then(verificaSePecaJogador)
                        .then(retornaMoverPecas)
                        .catch(retornaFalha);
            case RodadaJogo.FlutuarPecas:
                break;
        }

        return null;
    }
}

export enum TiposAcao {
    ClickPosicaoLivreRodadaColocar, // Pinta o quadradao
    ClickPosicaoLivreRodadaColocarTrinca, // Pinta o quadrado e permite remover uma peça
    ClickPecaJogadorRodadaMover, // Seleciona a peça do jogador
    ClickPosicaoLivrePecaSelecionadaRodadaMover, // Move a peça selecionada anteriormente para nova casa
    ClickPosicaoLivrePecaSelecionadaRodadaMoverTrinca, // Move a peça selecionada anteriormente para nova casa e remove uma peça
    ClickPosicaoLivreRodadaFlutuar, // Move a peça independente da posição
    ClickPosicaoLivreRodadaFlutuarTrinca, // Move a peça independente da posição e remove peça adversária
    CondicaoGanhou, // Remove todas as seleções e mostra alerta
    CondicaoPerdeu, // Remove todas as seleções e mostra alerta
    Falha // Não faz nada
}

export interface RetornoAcao {
    tipoAcao: TiposAcao;
    pecaSelecionada: number[];
    pecaRealcadas: number[],
    exibeAlertaGanhou: boolean;
    exibeAlertaPerdeu: boolean;
    permiteRemocao: boolean;
    erro: boolean;
}