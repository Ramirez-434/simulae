import CardGenerator from '../components/CardGenerator';
import CardGeneratorMulti from '../components/CardGeneratorMulti';

import {
  generateRPGCharacter,
  generateGuildName,
  generateClanName,
  generateBandName,
  generateMovieTitle,
  generateFIFA,
  generateLottery,
  generateBingo,
  generateJoke,
  generateTruthOrDare
} from '../utils/generators/games';

export default function Jogos() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Jogos e Entretenimento</h2>
        <p className="text-slate-400 mt-2">
          Geradores lúdicos para mundos de fantasia, gamificação e dinâmicas sociais.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Universos Fictícios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardGeneratorMulti title="Personagem RPG" description="Ficha rápida" generatorFn={() => generateRPGCharacter()} />
          <CardGeneratorMulti title="Modo Carreira FIFA" description="Atributos aleatórios" generatorFn={() => generateFIFA()} />
          <CardGenerator title="Nome de Guilda" description="Aliança épica" generatorFn={() => generateGuildName()} />
          <CardGenerator title="Nome de Clã" description="Para jogos competitivos" generatorFn={() => generateClanName()} />
          <CardGenerator title="Nome de Banda" description="Estilo musical clássico" generatorFn={() => generateBandName()} />
          <CardGenerator title="Título de Filme" description="Roteiro de cinema" generatorFn={() => generateMovieTitle()} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Lazer e Sorteios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardGenerator title="Números de Loteria" description="Mega-Sena (6 números)" generatorFn={() => generateLottery()} />
          <CardGeneratorMulti title="Cartela de Bingo" description="Sorteio BINGO" generatorFn={() => generateBingo()} />
          <CardGeneratorMulti title="Verdade ou Desafio" description="Jogo social" generatorFn={() => generateTruthOrDare()} />
          <CardGeneratorMulti title="Gerador de Piadas" description="Humor rápido" generatorFn={() => generateJoke()} />
        </div>
      </div>
    </div>
  );
}
