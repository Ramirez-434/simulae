import CardGeneratorMulti from '../components/CardGeneratorMulti';
import CardGenerator from '../components/CardGenerator';

import {
  generateResume,
  generateDiploma,
  generateAcademicRecord,
  generateStudySchedule,
  generateLessonPlan,
  generateTimetable,
  generateExamQuestions,
  generateReadingFiche,
  generateChallenge30Days
} from '../utils/generators/education';

export default function Educacao() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Educação e Planejamento</h2>
        <p className="text-slate-400 mt-2">
          Ferramentas de apoio acadêmico, organização escolar e documentação estudantil.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Planejamento e Estudos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardGeneratorMulti allowPdf={true} title="Cronograma de Estudos" description="Plano semanal" generatorFn={() => generateStudySchedule()} />
          <CardGeneratorMulti allowPdf={true} title="Plano de Aula" description="Para professores" generatorFn={() => generateLessonPlan()} />
          <CardGeneratorMulti allowPdf={true} title="Horário Escolar" description="Grade de aulas" generatorFn={() => generateTimetable()} />
          <CardGeneratorMulti allowPdf={true} title="Desafio 30 Dias" description="Gamificação de hábitos" generatorFn={() => generateChallenge30Days()} />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Documentação</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardGeneratorMulti allowPdf={true} title="Currículo (CV)" description="Modelo básico texto" generatorFn={() => generateResume()} />
          <CardGeneratorMulti allowPdf={true} title="Diploma Fictício" description="Certificado de conclusão" generatorFn={() => generateDiploma()} />
          <CardGeneratorMulti allowPdf={true} title="Registro Acadêmico" description="Histórico de notas" generatorFn={() => generateAcademicRecord()} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Avaliação</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardGeneratorMulti allowPdf={true} title="Questões de Prova" description="Perguntas dissertativas" generatorFn={() => generateExamQuestions()} />
          <CardGeneratorMulti allowPdf={true} title="Ficha de Leitura" description="Resumo de livro" generatorFn={() => generateReadingFiche()} />
        </div>
      </div>
    </div>
  );
}
