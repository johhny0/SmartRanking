import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);
  private jogadores: Jogador[] = [
    {
      _id: '52e6bf67-3745-41d4-af06-4970a91450eb',
      nome: 'Nome do Jogador',
      email: 'email@jogador.com.br',
      ranking: 'A',
      telefoneCelular: '84848484',
      posicaoRanking: 1,
      urlFotoJogador: 'foto.png',
    },
  ];

  criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Jogador {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = this.jogadores.find((j) => j.email === email);

    if (jogadorEncontrado)
      return this.atualizar(criarJogadorDto, jogadorEncontrado);

    return this.criar(criarJogadorDto);
  }

  consultarTodosJogadores(): Jogador[] {
    return this.jogadores;
  }

  consultarPorEmail(email: string): Jogador {
    const jogadorEncontrado: Jogador = this.jogadores.find(
      (j) => j.email === email,
    );

    if (!jogadorEncontrado)
      throw new NotFoundException('Jogador com esse e-mail não encontrado');

    return jogadorEncontrado;
  }

  deletarJogador(email: string): void {
    this.jogadores = this.jogadores.filter((j) => j.email !== email);
  }

  private atualizar(
    criarJogadorDTO: CriarJogadorDto,
    jogador: Jogador,
  ): Jogador {
    const { nome } = criarJogadorDTO;

    jogador.nome = nome;

    return jogador;
  }
  private criar(criarJogadorDto: CriarJogadorDto): Jogador {
    const { nome, email, telefoneCelular } = criarJogadorDto;

    const jogador: Jogador = {
      _id: uuid(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'foto.png',
    };

    this.jogadores.push(jogador);

    this.logger.log(`criarJogadorDTO: (${jogador._id}) ${jogador.nome}`);

    return jogador;
  }
}
