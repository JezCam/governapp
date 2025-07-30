import { type Assessment, assessments } from './assessments';
import type { Risk } from './risk';

export type ReportsRowQuestion = {
  type: 'question';
  assessmentId: string;
  text: string;
  response: string;
  risk: Risk;
  feedback: string;
};

export type ReportsRowSection = {
  type: 'section';
  assessmentId: string;
  name: string;
  score: number;
  risk: Risk;
  feedback: string;
  subRows: ReportsRowQuestion[];
};

export type ReportsRowDomain = {
  type: 'domain';
  assessmentId: string;
  name: string;
  score: number;
  risk: Risk;
  feedback: string;
  subRows: ReportsRowSection[];
};

export type ReportsRowAssessment = {
  type: 'assessment';
  assessment: Assessment;
  score: number;
  risk: Risk;
  feedback: string;
  subRows: ReportsRowDomain[];
};

export type ReportsRow =
  | ReportsRowAssessment
  | ReportsRowDomain
  | ReportsRowSection
  | ReportsRowQuestion;

export const assessmentReportsRows: ReportsRowAssessment[] = [
  {
    type: 'assessment',
    assessment: assessments[2],
    score: 85,
    risk: 'green',
    feedback: 'Overall good governance practices observed.',
    subRows: [
      {
        type: 'domain',
        assessmentId: assessments[2].id,
        name: 'Risk Management 1',
        score: 90,
        risk: 'green',
        feedback: 'Strong risk management processes in place.',
        subRows: [
          {
            type: 'section',
            assessmentId: assessments[2].id,
            name: 'Risk Identification 1',
            score: 95,
            risk: 'green',
            feedback: 'Effective risk identification mechanisms.',
            subRows: [
              {
                type: 'question',
                assessmentId: assessments[2].id,
                text: 'How are risks identified?',
                response: 'Regular risk assessments and audits.',
                risk: 'green',
                feedback: 'Comprehensive identification process.',
              },
              {
                type: 'question',
                assessmentId: assessments[2].id,
                text: 'Are there any recent risks identified?',
                response:
                  'Yes, several risks were identified in the last quarter.',
                risk: 'amber',
                feedback: 'Ongoing monitoring required.',
              },
            ],
          },
          {
            type: 'section',
            assessmentId: assessments[2].id,
            name: 'Risk Identification 2',
            score: 95,
            risk: 'green',
            feedback: 'Effective risk identification mechanisms.',
            subRows: [
              {
                type: 'question',
                assessmentId: assessments[2].id,
                text: 'How are risks identified?',
                response: 'Regular risk assessments and audits.',
                risk: 'green',
                feedback: 'Comprehensive identification process.',
              },
              {
                type: 'question',
                assessmentId: assessments[2].id,
                text: 'Are there any recent risks identified?',
                response:
                  'Yes, several risks were identified in the last quarter.',
                risk: 'amber',
                feedback: 'Ongoing monitoring required.',
              },
            ],
          },
        ],
      },
      {
        type: 'domain',
        assessmentId: assessments[2].id,
        name: 'Risk Management 2',
        score: 90,
        risk: 'green',
        feedback: 'Strong risk management processes in place.',
        subRows: [
          {
            type: 'section',
            assessmentId: assessments[2].id,
            name: 'Risk Identification',
            score: 95,
            risk: 'green',
            feedback: 'Effective risk identification mechanisms.',
            subRows: [
              {
                type: 'question',
                assessmentId: assessments[2].id,
                text: 'How are risks identified?',
                response: 'Regular risk assessments and audits.',
                risk: 'green',
                feedback: 'Comprehensive identification process.',
              },
              {
                type: 'question',
                assessmentId: assessments[2].id,
                text: 'Are there any recent risks identified?',
                response:
                  'Yes, several risks were identified in the last quarter.',
                risk: 'amber',
                feedback: 'Ongoing monitoring required.',
              },
            ],
          },
          {
            type: 'section',
            assessmentId: assessments[2].id,
            name: 'Risk Identification',
            score: 95,
            risk: 'green',
            feedback: 'Effective risk identification mechanisms.',
            subRows: [
              {
                type: 'question',
                assessmentId: assessments[2].id,
                text: 'How are risks identified?',
                response: 'Regular risk assessments and audits.',
                risk: 'green',
                feedback: 'Comprehensive identification process.',
              },
              {
                type: 'question',
                assessmentId: assessments[2].id,
                text: 'Are there any recent risks identified?',
                response:
                  'Yes, several risks were identified in the last quarter.',
                risk: 'amber',
                feedback: 'Ongoing monitoring required.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'assessment',
    assessment: assessments[3],
    score: 85,
    risk: 'green',
    feedback: 'Overall good governance practices observed.',
    subRows: [
      {
        type: 'domain',
        assessmentId: assessments[3].id,
        name: 'Risk Management 1',
        score: 90,
        risk: 'green',
        feedback: 'Strong risk management processes in place.',
        subRows: [
          {
            type: 'section',
            assessmentId: assessments[3].id,
            name: 'Risk Identification 1',
            score: 95,
            risk: 'green',
            feedback: 'Effective risk identification mechanisms.',
            subRows: [
              {
                type: 'question',
                assessmentId: assessments[3].id,
                text: 'How are risks identified?',
                response: 'Regular risk assessments and audits.',
                risk: 'green',
                feedback: 'Comprehensive identification process.',
              },
              {
                type: 'question',
                assessmentId: assessments[3].id,
                text: 'Are there any recent risks identified?',
                response:
                  'Yes, several risks were identified in the last quarter.',
                risk: 'amber',
                feedback: 'Ongoing monitoring required.',
              },
            ],
          },
          {
            type: 'section',
            assessmentId: assessments[3].id,
            name: 'Risk Identification 2',
            score: 95,
            risk: 'green',
            feedback: 'Effective risk identification mechanisms.',
            subRows: [
              {
                type: 'question',
                assessmentId: assessments[3].id,

                text: 'How are risks identified?',
                response: 'Regular risk assessments and audits.',
                risk: 'green',
                feedback: 'Comprehensive identification process.',
              },
              {
                type: 'question',
                assessmentId: assessments[3].id,

                text: 'Are there any recent risks identified?',
                response:
                  'Yes, several risks were identified in the last quarter.',
                risk: 'amber',
                feedback: 'Ongoing monitoring required.',
              },
            ],
          },
        ],
      },
      {
        type: 'domain',
        assessmentId: assessments[3].id,
        name: 'Risk Management 2',
        score: 90,
        risk: 'green',
        feedback: 'Strong risk management processes in place.',
        subRows: [
          {
            type: 'section',
            assessmentId: assessments[3].id,
            name: 'Risk Identification',
            score: 95,
            risk: 'green',
            feedback: 'Effective risk identification mechanisms.',
            subRows: [
              {
                type: 'question',
                assessmentId: assessments[3].id,

                text: 'How are risks identified?',
                response: 'Regular risk assessments and audits.',
                risk: 'green',
                feedback: 'Comprehensive identification process.',
              },
              {
                type: 'question',
                assessmentId: assessments[3].id,
                text: 'Are there any recent risks identified?',
                response:
                  'Yes, several risks were identified in the last quarter.',
                risk: 'amber',
                feedback: 'Ongoing monitoring required.',
              },
            ],
          },
          {
            type: 'section',
            assessmentId: assessments[3].id,
            name: 'Risk Identification',
            score: 95,
            risk: 'green',
            feedback: 'Effective risk identification mechanisms.',
            subRows: [
              {
                type: 'question',
                assessmentId: assessments[3].id,

                text: 'How are risks identified?',
                response: 'Regular risk assessments and audits.',
                risk: 'green',
                feedback: 'Comprehensive identification process.',
              },
              {
                type: 'question',
                assessmentId: assessments[3].id,

                text: 'Are there any recent risks identified?',
                response:
                  'Yes, several risks were identified in the last quarter.',
                risk: 'amber',
                feedback: 'Ongoing monitoring required.',
              },
            ],
          },
        ],
      },
    ],
  },
];
