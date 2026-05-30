import { useState } from 'react';
import CardGenerator from '../components/CardGenerator';
import CardGeneratorMulti from '../components/CardGeneratorMulti';
import FilterSlider from '../components/FilterSlider';

import {
  generateLeroLero,
  generateQuote,
  generateTestimonial,
  generateSlogan,
  generateFakeNews,
  generateAdCopy,
  generateEmailMarketing,
  generateEssayTopic,
  generateABNT,
  generatePodcastName,
  generateMenu
} from '../utils/generators/content';

export default function Texto() {
  const [leroSize, setLeroSize] = useState('Curto');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Texto e Conteúdo</h2>
        <p className="text-slate-400 mt-2">
          Gere copys de marketing, textos lúdicos e preenchimentos criativos para layouts.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Marketing e Vendas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardGeneratorMulti title="Copy para Anúncios" description="Para Facebook/Google Ads" generatorFn={() => generateAdCopy()} />
          <CardGeneratorMulti title="E-mail Marketing" description="Campanha de vendas" generatorFn={() => generateEmailMarketing()} />
          <div className="flex flex-col gap-6">
            <CardGenerator title="Depoimento de Cliente" description="Para landing pages" generatorFn={() => generateTestimonial()} />
            <CardGenerator title="Gerador de Slogan" description="Frase de impacto" generatorFn={() => generateSlogan()} />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Produção Textual</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardGeneratorMulti 
            title={`Lero Lero (${leroSize})`} 
            description="Gerador de texto corporativo vazio" 
            generatorFn={() => generateLeroLero(leroSize)} 
          >
            <FilterSlider 
              value={leroSize}
              onChange={setLeroSize}
              options={['Curto', 'Médio', 'Longo']}
            />
          </CardGeneratorMulti>
          <CardGenerator title="Citação Motivacional" description="Para posts inspiracionais" generatorFn={() => generateQuote()} />
          <CardGenerator title="Notícia (G1 Fictício)" description="Manchete de portal" generatorFn={() => generateFakeNews()} />
          <CardGenerator title="Tema para Redação" description="Para treino do ENEM" generatorFn={() => generateEssayTopic()} />
          <CardGeneratorMulti title="Cardápio" description="Menu de restaurante" generatorFn={() => generateMenu()} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Acadêmico e Mídia</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardGenerator title="Referência ABNT" description="Formatação de bibliografia" generatorFn={() => generateABNT()} />
          <CardGenerator title="Nome de Canal/Podcast" description="Para programas em áudio" generatorFn={() => generatePodcastName()} />
        </div>
      </div>
    </div>
  );
}
