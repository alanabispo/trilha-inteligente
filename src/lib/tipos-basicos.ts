import type { DadosPeca } from "./jogo";

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
    FlutuarPecas
}

export interface EvtClickPeca {
    num: number;
    corPeca: string;
}

export type ActionFunction = () => void;

export interface PosicaoLinha {
    lado: number,
    dist: number
}

export interface PosicaoPeca {
    x: string,
    y: string,
    n: number,
    handler: DadosPeca
}
