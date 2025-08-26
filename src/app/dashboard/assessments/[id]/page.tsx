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

  const assessment = useQuery(api.services.assessments.getByUserAssessmentId, {
    userAssessmentId: id as Id<'userAssessments'>,
  });

  const [assessmentLoaded, setAssessmentLoaded] = useState(false);

  // Question Number State (for header)
  const [maxQuestionNumber, setMaxQuestionNumber] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(0);

  // Domain, Section, Question Index State
  const [maxDomainIndex, setMaxDomainIndex] = useState(0);
  const [domainIndex, setDomainIndex] = useState(0);

  const [maxSectionIndex, setMaxSectionIndex] = useState(0);
  const [sectionIndex, setSectionIndex] = useState(0);

  const [maxQuestionIndex, setMaxQuestionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [domainContinued, setDomainContinued] = useState(true);
  const [sectionContinued, setSectionContinued] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!assessment || assessmentLoaded) {
      return;
    }

    setDomainIndex(assessment.userAssessment.domainIndex);
    setMaxDomainIndex(assessment.userAssessment.domainIndex);

    setSectionIndex(assessment.userAssessment.sectionIndex);
    setMaxSectionIndex(assessment.userAssessment.sectionIndex);

    setQuestionIndex(assessment.userAssessment.questionIndex);
    setMaxQuestionIndex(assessment.userAssessment.questionIndex);

    setQuestionNumber(assessment.userAssessment.questionNumber);
    setMaxQuestionNumber(assessment.userAssessment.questionNumber);

    if (assessment.userAssessment.questionIndex === 0) {
      setSectionContinued(false);
      if (assessment.userAssessment.sectionIndex === 0) {
        setDomainContinued(false);
      }
    }

    setAssessmentLoaded(true);
  }, [assessment, assessmentLoaded]);

  if (assessment === undefined) {
    return null; // TODO: Implement a loading state
  }

  const framework = assessment.framework;

  const currentDomain = framework.domains[domainIndex];
  const currentSection = currentDomain.sections[sectionIndex];
  const currentQuestion = currentSection.questions[questionIndex];

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
  const handleNext = (responseOptionId: Id<'responseOptions'>) => {
    const sameReponse =
      currentQuestion.existingResponseOptionId === responseOptionId;

    const isMaxSectionIndex = sectionIndex === maxSectionIndex;
    const isMaxDomainIndex = domainIndex === maxDomainIndex;

    // Update client state
    const currentMaxDomainIndex = maxQuestionNumber;
    const currentDomainIndex = domainIndex;
    const currentMaxSectionIndex = maxSectionIndex;
    const currentSectionIndex = sectionIndex;
    const currentMaxQuestionIndex = maxQuestionIndex;
    const currentQuestionIndex = questionIndex;
    const currentMaxQuestionNumber = questionNumber;
    const currentQuestionNumber = questionNumber;

    // Question index
    const isNextSection = questionIndex === currentSection.questions.length - 1;
    const nextQuestionIndex = isNextSection ? 0 : questionIndex + 1;
    setQuestionIndex(nextQuestionIndex);
    setQuestionNumber(questionNumber + 1);
    const newMaxQuestionIndex = isNextSection
      ? true
      : nextQuestionIndex > maxQuestionIndex;

    // New max progress can be assertained by an increase in question index
    const newMaxProgressQuestion =
      newMaxQuestionIndex && isMaxSectionIndex && isMaxDomainIndex;

    // Section index
    const isNextDomain =
      isNextSection && sectionIndex === currentDomain.sections.length - 1;
    const nextSectionIndex = isNextDomain ? 0 : sectionIndex + 1;
    const newMaxSectionIndex = isNextDomain
      ? true
      : nextSectionIndex > maxSectionIndex;
    if (isNextSection) {
      setSectionIndex(nextSectionIndex);
      setSectionContinued(false);
    }

    // New max progress can be assertained by an increase in section index
    const newMaxProgressSection =
      isNextSection && newMaxSectionIndex && isMaxDomainIndex;

    // Domain index
    const nextDomainIndex = domainIndex + 1;
    const newMaxDomainIndex = nextDomainIndex > maxDomainIndex;
    if (isNextDomain) {
      // Check if assessment is complete
      if (nextDomainIndex >= framework.domains.length) {
        setCompleted(true);
      } else {
        setDomainIndex(nextDomainIndex);
        setDomainContinued(false);
      }
    }

    // New max progress can be assertained by an increase in domain index
    const newMaxProgressDomain = isNextDomain && newMaxDomainIndex;

    // No change
    if (sameReponse) {
      return;
    }

    // Progress state
    // For there to be an increase in question number:
    // - There must be a new max question index in the current max section and current max domain
    // - There must be a new max section index in the current max domain
    // - There must be a new max domain index
    const newProgress =
      newMaxProgressQuestion || newMaxProgressSection || newMaxProgressDomain;
    if (newProgress) {
      setMaxQuestionNumber(questionNumber + 1);
      if (isNextDomain) {
        setMaxDomainIndex(nextDomainIndex);
      }
      if (isNextSection) {
        setMaxSectionIndex(nextSectionIndex);
      }
      setMaxQuestionIndex(nextQuestionIndex);
    }

    // Update backend state
    const data = {
      userAssessmentId: assessment.userAssessment._id,
      questionId: currentQuestion._id,
      responseOptionId,
      ...(newProgress && isNextDomain && { nextDomainIndex }),
      ...(newProgress && isNextSection && { nextSectionIndex }),
      ...(newProgress && { nextQuestionIndex }),
    };

    setIsLoading(true);

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
        setMaxDomainIndex(currentMaxDomainIndex);
        setDomainIndex(currentDomainIndex);

        setMaxSectionIndex(currentMaxSectionIndex);
        setSectionIndex(currentSectionIndex);

        setMaxQuestionIndex(currentMaxQuestionIndex);
        setQuestionIndex(currentQuestionIndex);

        setMaxQuestionNumber(currentMaxQuestionNumber);
        setQuestionNumber(currentQuestionNumber);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Previous question logic
  const hasPreviousQuestion = questionIndex > 0;
  const hasPreviousSection = sectionIndex > 0;
  const hasPreviousDomain = domainIndex > 0;

  const handlePrevious = () => {
    setQuestionNumber(questionNumber - 1);
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
  };

  // Question Form Button Logic
  const disablePrevious =
    domainIndex === 0 && sectionIndex === 0 && questionIndex === 0;

  return (
    <div className="flex size-full flex-col">
      <AssessmentHeader
        assessmentName={assessment.name}
        frameworkName={framework.name}
        questionNumber={maxQuestionNumber}
        questionsTotal={assessment.questionsTotal}
      />
      <div className="flex size-full overflow-auto">
        <ProgressTree
          domainIndex={maxDomainIndex}
          domains={framework.domains}
          questionIndex={maxQuestionIndex}
          sectionIndex={maxSectionIndex}
        />
        <div className="flex size-full flex-col items-center overflow-auto p-4 py-12">
          {(() => {
            if (completed) {
              return (
                <CompleteCard
                  onPrevious={() => {
                    const lastDomain = framework.domains.at(-1);
                    const lastSection = lastDomain?.sections.at(-1);
                    setDomainIndex(framework.domains.length - 1);
                    setSectionIndex(
                      lastDomain ? lastDomain.sections.length - 1 : 0
                    );
                    setQuestionIndex(
                      lastSection ? lastSection.questions.length - 1 : 0
                    );
                    setCompleted(false);
                  }}
                  userAssessmentId={assessment.userAssessment._id}
                />
              );
            }
            if (questionIndex === 0) {
              if (!domainContinued) {
                return (
                  <DomainCard
                    domain={currentDomain}
                    onContinue={() => setDomainContinued(true)}
                  />
                );
              }
              if (!sectionContinued) {
                return (
                  <SectionCard
                    onContinue={() => setSectionContinued(true)}
                    section={currentSection}
                  />
                );
              }
            }
            return (
              <div className="flex w-xl flex-col items-center gap-8">
                <strong className="text-primary">{`Question ${questionNumber + 1} / ${assessment.questionsTotal}`}</strong>
                <p className="text-center font-medium">
                  {currentQuestion.text}
                </p>
                <QuestionForm
                  onNext={handleNext}
                  onPrevious={
                    disablePrevious || isLoading ? undefined : handlePrevious
                  }
                  previousLoading={isLoading}
                  question={currentQuestion}
                />
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
