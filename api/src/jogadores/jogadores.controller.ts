import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    const { nome } = criarJogadorDto;
    return {
      status: 'Connected',
      nome,
    };
  }

  @Get()
  async buscarJogador() {}
}
