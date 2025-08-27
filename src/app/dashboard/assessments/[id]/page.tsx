'use client';

import { useMutation, useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import QuestionForm from '@/components/forms/question-form';
import { api } from '../../../../../convex/_generated/api';
import type { Id } from '../../../../../convex/_generated/dataModel';
import AssessmentHeader from './assessment-header';
import CompleteCard from './complete-card';
import DomainCard from './domain-card';
import ProgressTree from './progress-tree';
import SectionCard from './section-card';

export default function Page() {
  const { id } = useParams();

  const createOrUpdateQuestionResponse = useMutation(
    api.services.questionResponses.createOrUpdate
  );

  const [assessmentLoaded, setAssessmentLoaded] = useState(false);
  const assessment = useQuery(api.services.assessments.getByUserAssessmentId, {
    userAssessmentId: id as Id<'userAssessments'>,
  });

  const [domainContinued, setDomainContinued] = useState(true);
  const [sectionContinued, setSectionContinued] = useState(true);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [maxQuestionIndex, setMaxQuestionIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [showCompleteCard, setShowCompleteCard] = useState(false);
  const [completed, setCompleted] = useState(false);

  // On assessment load
  useEffect(() => {
    if (!assessmentLoaded && assessment) {
      if (
        assessment.userAssessment.questionIndex ===
        assessment.questions.length - 1
      ) {
        setShowCompleteCard(true);
        setCompleted(true);
      }

      setQuestionIndex(assessment.userAssessment.questionIndex);
      setMaxQuestionIndex(assessment.userAssessment.questionIndex);

      // Update domain/section card visibility
      if (
        assessment.questions[assessment.userAssessment.questionIndex]
          .domainCount === 0
      ) {
        setDomainContinued(false);
      }
      if (
        assessment.questions[assessment.userAssessment.questionIndex]
          .sectionCount === 0
      ) {
        setSectionContinued(false);
      }

      setAssessmentLoaded(true);
    }
  }, [assessment, assessmentLoaded]);

  if (assessment === undefined) {
    return null; // TODO: Implement a loading state
  }

  const userAssessment = assessment.userAssessment;
  const framework = assessment.framework;
  const question = assessment.questions[questionIndex];
  const section = assessment.sections.at(question.sectionIndex);
  const domain = assessment.domains.at(section?.domainIndex || 0);

  const handleNext = (responseOptionId: Id<'responseOptions'>) => {
    const hasNextQuestion = questionIndex < assessment.questions.length - 1;

    // Move to next question or complete
    if (hasNextQuestion) {
      setQuestionIndex(questionIndex + 1);

      // Update domain/section card visibility
      if (section && question.sectionCount === section.questionsTotal - 1) {
        setSectionContinued(false);
      }
      if (domain && question.domainCount === domain.questionsTotal - 1) {
        setDomainContinued(false);
      }
    } else {
      setShowCompleteCard(true);
      setCompleted(true);
    }

    // Update max question index if needed
    const progress = hasNextQuestion && questionIndex + 1 > maxQuestionIndex;
    if (progress) {
      setMaxQuestionIndex(questionIndex + 1);
    }

    // No change
    if (responseOptionId === question.existingResponseOptionId) {
      return;
    }

    // Update backend state
    setIsLoading(true);

    const data = {
      userAssessmentId: userAssessment._id,
      questionId: question._id,
      responseOptionId,
      ...(progress && { questionIndex: questionIndex + 1 }),
    };

    createOrUpdateQuestionResponse(data)
      .catch((error) => {
        switch (error.data) {
          case 'USER_ASSESSMENT_NOT_FOUND':
            toast.error('User assessment not found. Please refresh the page.');
            break;
          default:
            toast.error('An unexpected error occurred. Please try again.');
        }

        // Revert client state
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePrevious = () => {
    setQuestionIndex(questionIndex - 1);
  };

  return (
    <div className="flex size-full flex-col">
      <AssessmentHeader
        assessmentName={assessment.name}
        completed={completed}
        frameworkName={framework.name}
        questionIndex={maxQuestionIndex}
        questionsTotal={assessment.questionsTotal}
      />
      <div className="flex size-full overflow-auto">
        <ProgressTree
          completed={completed}
          domains={assessment.domains}
          question={assessment.questions[maxQuestionIndex]}
          sections={assessment.sections}
        />
        <div className="flex size-full flex-col items-center overflow-auto p-4 py-12">
          {(() => {
            if (showCompleteCard) {
              return (
                <CompleteCard
                  onPrevious={() => setShowCompleteCard(false)}
                  userAssessmentId={assessment.userAssessment._id}
                />
              );
            }
            if (!domainContinued && domain) {
              return (
                <DomainCard
                  domain={domain}
                  onContinue={() => setDomainContinued(true)}
                />
              );
            }
            if (!sectionContinued && section) {
              return (
                <SectionCard
                  onContinue={() => setSectionContinued(true)}
                  section={section}
                />
              );
            }
            return (
              <div className="flex w-xl flex-col items-center gap-8">
                <strong className="text-primary">{`Question ${questionIndex + 1} / ${assessment.questionsTotal}`}</strong>
                <p className="text-center font-medium">{question.text}</p>
                <QuestionForm
                  onNext={handleNext}
                  onPrevious={
                    questionIndex === 0 || isLoading
                      ? undefined
                      : handlePrevious
                  }
                  previousLoading={isLoading}
                  question={question}
                />
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
