import React from 'react';
import { DrishyaAnimation } from './DrishyaAnimation';
import { SwaraAnimation } from './SwaraAnimation';
import { TPSAnimation } from './TPSAnimation';
import { FPSAnimation } from './FPSAnimation';
import { GoalsAnimation } from './GoalsAnimation';
import { BeathackersAnimation } from './BeathackersAnimation';
import { QuizzoticaAnimation } from './QuizzoticaAnimation';
import { RenaissanceAnimation } from './RenaissanceAnimation';
import { DesignXAnimation } from './DesignXAnimation';

interface ClubAnimationProps {
  clubId: string;
  glowColor: string;
}

export const ClubAnimation: React.FC<ClubAnimationProps> = ({ clubId, glowColor }) => {
  switch (clubId) {
    case 'drishya': return <DrishyaAnimation />;
    case 'swara': return <SwaraAnimation />;
    case 'tps': return <TPSAnimation />;
    case 'fps': return <FPSAnimation />;
    case 'goals': return <GoalsAnimation />;
    case 'beathackers': return <BeathackersAnimation />;
    case 'quizzotica': return <QuizzoticaAnimation />;
    case 'renaissance': return <RenaissanceAnimation />;
    case 'designx': return <DesignXAnimation />;
    default: return null;
  }
};
