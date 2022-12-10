export enum NumJogador {
    SemJogador = 0,
    Player1 = 1,
    Player2
}

export enum TipoOcupacao {
    NaoUtilizada = -1,
    Vazio,
    Ocupado
}

export interface PecaEstado {
    jogador: NumJogador;
}

export type Turno = NumJogador.Player1 | NumJogador.Player2 ;