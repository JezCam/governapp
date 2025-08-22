'use client';

import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import QuestionForm from '@/components/forms/question-form';
import { api } from '../../../../../convex/_generated/api';
import type { Id } from '../../../../../convex/_generated/dataModel';
import AssessmentHeader from './assessment-header';
import ProgressTree from './progress-tree';

export default function Page() {
  const { id } = useParams();

  const assessment = useQuery(api.services.assessments.getByUserAssessmentId, {
    userAssessmentId: id as Id<'userAssessments'>,
  });

  const [questionNumber, setQuestionNumber] = useState<number>(
    assessment?.userAssessment.questionNumber || 0
  );

  const [domainIndex, setDomainIndex] = useState(
    assessment?.userAssessment.domainIndex || 0
  );
  const [sectionIndex, setSectionIndex] = useState(
    assessment?.userAssessment.sectionIndex || 0
  );
  const [questionIndex, setQuestionIndex] = useState(
    assessment?.userAssessment.questionIndex || 0
  );

  if (assessment === undefined) {
    return null; // TODO: Implement a loading state
  }

  const framework = assessment.framework;

  const currentDomain = framework.domains[domainIndex];
  const currentSection = currentDomain.sections[sectionIndex];
  const currentQuestion = currentSection.questions[questionIndex];

  // Next question logic
  const hasNextQuestion = currentSection.questions.length > questionIndex + 1;
  const hasNextSection = currentDomain.sections.length > sectionIndex + 1;
  const hasNextDomain = framework.domains.length > domainIndex + 1;

  // Previous question logic
  const hasPreviousQuestion = questionIndex > 0;
  const hasPreviousSection = sectionIndex > 0;
  const hasPreviousDomain = domainIndex > 0;

  const handleNext = () => {
    if (hasNextQuestion) {
      setQuestionIndex(questionIndex + 1);
      setQuestionNumber(questionNumber + 1);
    } else if (hasNextSection) {
      setSectionIndex(sectionIndex + 1);
      setQuestionIndex(0);
    } else if (hasNextDomain) {
      setDomainIndex(domainIndex + 1);
      setSectionIndex(0);
      setQuestionIndex(0);
    }
    setQuestionNumber(questionNumber + 1);
  };

  const handlePrevious = () => {
    if (hasPreviousQuestion) {
      setQuestionIndex(questionIndex - 1);
    } else if (hasPreviousSection) {
      setSectionIndex(sectionIndex - 1);
      setQuestionIndex(
        framework.domains[domainIndex].sections[sectionIndex - 1].questions
          .length - 1
      );
    } else if (hasPreviousDomain) {
      setDomainIndex(domainIndex - 1);
      setSectionIndex(framework.domains[domainIndex - 1].sections.length - 1);
      setQuestionIndex(
        framework.domains[domainIndex - 1].sections[
          framework.domains[domainIndex - 1].sections.length - 1
        ].questions.length - 1
      );
    }
    setQuestionNumber(questionNumber - 1);
  };

  // Question Form Button Logic
  const disablePrevious =
    domainIndex === 0 && sectionIndex === 0 && questionIndex === 0;
  const disableNext =
    domainIndex === framework.domains.length - 1 &&
    sectionIndex === currentDomain.sections.length - 1 &&
    questionIndex === currentSection.questions.length - 1;

  return (
    <div className="flex size-full flex-col">
      <AssessmentHeader
        assessmentName={assessment.name}
        frameworkName={framework.name}
        questionNumber={questionNumber}
        questionsTotal={assessment.questionsTotal}
      />
      <div className="flex size-full overflow-auto">
        <ProgressTree
          domainIndex={domainIndex}
          domains={framework.domains}
          questionIndex={questionIndex}
          sectionIndex={sectionIndex}
        />
        <QuestionForm
          onNext={disableNext ? undefined : handleNext}
          onPrevious={disablePrevious ? undefined : handlePrevious}
          question={currentQuestion}
        />
      </div>
    </div>
  );
}
