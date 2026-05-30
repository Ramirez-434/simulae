import CardGenerator from '../components/CardGenerator';
import CardGeneratorMulti from '../components/CardGeneratorMulti';
import CardGeneratorWhatsApp from '../components/CardGeneratorWhatsApp';

import {
  generateNick,
  generateInstaName,
  generateInstaBio,
  generateYoutubeName,
  generateYoutubeDesc,
  generateHashtags,
  generateLinkedInPost,
  generateTweet,
  generateEmailSignature,
  generateWhatsappLink,
  generateWhatsappChat
} from '../utils/generators/social';

export default function RedesSociais() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Redes Sociais e Comunicação</h2>
        <p className="text-slate-400 mt-2">
          Gere mockups de perfis, textos para bios e simulações de interações digitais.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Perfis e Nomes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardGenerator title="Gerador de Nick" description="Para fóruns e jogos" generatorFn={() => generateNick()} />
          <CardGenerator title="Nome Instagram" description="Nome amigável" generatorFn={() => generateInstaName()} />
          <CardGenerator title="Username Instagram" description="@handle" generatorFn={() => `@${generateNick()}`} />
          <CardGenerator title="Canal YouTube" description="Nome atrativo" generatorFn={() => generateYoutubeName()} />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Textos e Metadados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardGeneratorMulti title="Bio do Instagram" description="Texto curto e emojis" generatorFn={() => generateInstaBio()} />
          <CardGeneratorMulti title="Descrição YouTube" description="Sobre o canal" generatorFn={() => generateYoutubeDesc()} />
          <CardGeneratorMulti title="Assinatura de Email" description="Profissional" generatorFn={() => generateEmailSignature()} />
          <CardGenerator title="Hashtags" description="Mix de populares" generatorFn={() => generateHashtags()} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Interações Sociais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardGeneratorMulti title="Post LinkedIn" description="Anúncio profissional" generatorFn={() => generateLinkedInPost()} />
          <CardGeneratorMulti title="Tweet (X)" description="Pensamento rápido" generatorFn={() => generateTweet()} />
          <CardGeneratorWhatsApp title="Conversa WhatsApp" description="Diálogo simulado visual" generatorFn={() => generateWhatsappChat()} />
          <CardGenerator title="Link WhatsApp" description="Link wa.me" generatorFn={() => generateWhatsappLink()} />
        </div>
      </div>
    </div>
  );
}
