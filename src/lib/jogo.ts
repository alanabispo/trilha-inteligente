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

export class HandlerPeca {
    jogador: NumJogador;
    realce: boolean;

    constructor() {
        this.init();
    }

    init() {
        this.realce = false;
        this.jogador = NumJogador.SemJogador;
    }

    /**
     * Ativa o realce da peça
     */
    ativaRealce(): void {
        this.realce = true;
    }

    /**
     * Desativa o realce da peça
     */
    desativaRealce(): void {
        this.realce = false;
    }
}

/**
 * Representa todos os estados de um jogador em especifico.
 * O jogador retem e organiza tudo necessário 
 */
export class Jogador {
    private _rodadaJogador: RodadaJogo;

    constructor() {
        this.resetarJogo();
    }

    resetarJogo() {
        this._rodadaJogador = RodadaJogo.ColocarPecas;
    }

    get rodadaJogador() {
        return this._rodadaJogador;
    }
}

/**
 * Classe principal do jogo, responsavel pelas acoes 
 * performadas e pela interface com a IA
 */
export class Jogo {    
    public grafo: number[][];
    public grafoEstado: TipoOcupacao[][];
    public pecas: HandlerPeca[];
    public jogadores: [Jogador, Jogador];
    
    private _numRodadas: number;
    private _turno: Turno;

    constructor(
        public posicoesTotal: number,
        public redrawn:() => void
    ) {
        // Peças do tabuleiro
        this.pecas = new Array(posicoesTotal)
            .fill(0)
            .map(_ => (new HandlerPeca()));

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

        // Grafo - matriz de adjacência - Contém o estado do grafo
        this.grafoEstado = new Array(posicoesTotal)
            .fill(-1)
            .map(_ => new Array(posicoesTotal).fill(TipoOcupacao.NaoUtilizada));

        // Inicializa o turno atual
        this._turno = Turno.Parado;
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
            new Jogador(),
            new Jogador(),
        ];

        // Preenche as ocupacoes do jogo
        for (let i = 0; i < this.grafo.length; i++) {
            for (const j of this.grafo[i]) {
                this.grafoEstado[i][j] = TipoOcupacao.Vazio;
            }
        }

        // Remove marcação de cor do jogador
        this.pecas = this.pecas.map(_ => (new HandlerPeca()));

        // Realça todas as peças
        this.realcaTodasPecas();
    }

    /**
     * Realça todas as peças do jogo
     */
    realcaTodasPecas(): void {
        for (const peca of this.pecas) {
            peca.ativaRealce();
        }

        this.redrawn();
    }

    /**
     * Finaliza o jogo atual
     */
    finalizaJogo(estadoFim: EstadoFimJogo): void {

    }

    /**
     * Troca o estado do jogo de ativo para inativo e vice-versa
     */
    mudarEstado(): void {
        if (this._turno != Turno.Parado) {
            this._turno = Turno.Parado;
            // TODO: Limpa o jogo
            
            return;
        }

        this.iniciarJogo();
    }

    /**
     * Retorna quais posi
     * @param pos Posicao
     */
    getProximaPosicoesMovimento(pos: number): ProximasPosicoes {
        return null;
    }
}