import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}
  private readonly logger = new Logger(JogadoresService.name);

  @Post()
  criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto): Jogador {
    try {
      return this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
    } catch (error) {
      this.logger.error(`Erro ao criar jogador: ${error.message}`);
    }
  }

  @Get()
  consultarJogadores(@Query('email') email: string): any {
    try {
      if (email) {
        return this.jogadoresService.consultarPorEmail(email);
      }

      return this.jogadoresService.consultarTodosJogadores();
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  @Delete()
  deletarJogador(@Query('email') email: string): void {
    return this.jogadoresService.deletarJogador(email);
  }
}
