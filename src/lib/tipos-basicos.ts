export enum NumJogador {
    SemJogador = 0,
    Jogador1,
    Jogador2IA
}

export enum Turno {
    Parado = 0,
    Jogador1,
    Jogador2IA
};

export enum TipoOcupacao {
    NaoUtilizada = -1,
    Vazio,
    Ocupado
}

export enum RodadaJogo {
    ColocarPecas,
    MoverPecas,
    FlutuarPecas,
    Ganhou,
    Perdeu
}

export interface PecaEstado {
    jogador: NumJogador;
}


