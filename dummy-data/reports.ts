import type { Risk } from './risk';

export type ReportsRowQuestion = {
  type: 'question';
  text: string;
  response: string;
  risk: Risk;
  feedback: string;
};

export type ReportsRowSection = {
  type: 'section';
  name: string;
  score: number;
  risk: Risk;
  feedback: string;
  subRows: ReportsRowQuestion[];
};

export type ReportsRowDomain = {
  type: 'domain';
  name: string;
  score: number;
  risk: Risk;
  feedback: string;
  subRows: ReportsRowSection[];
};

export type ReportsRowAssessment = {
  type: 'assessment';
  id: string;
  name: string;
  framework: string;
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
    id: '1',
    type: 'assessment',
    name: 'Governance Framework Assessment 1',
    framework: 'Governance Framework',
    score: 85,
    risk: 'green',
    feedback: 'Overall good governance practices observed.',
    subRows: [
      {
        type: 'domain',
        name: 'Risk Management 1',
        score: 90,
        risk: 'green',
        feedback: 'Strong risk management processes in place.',
        subRows: [
          {
            type: 'section',
            name: 'Risk Identification 1',
            score: 95,
            risk: 'green',
            feedback: 'Effective risk identification mechanisms.',
            subRows: [
              {
                type: 'question',
                text: 'How are risks identified?',
                response: 'Regular risk assessments and audits.',
                risk: 'green',
                feedback: 'Comprehensive identification process.',
              },
              {
                type: 'question',
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
            name: 'Risk Identification 2',
            score: 95,
            risk: 'green',
            feedback: 'Effective risk identification mechanisms.',
            subRows: [
              {
                type: 'question',
                text: 'How are risks identified?',
                response: 'Regular risk assessments and audits.',
                risk: 'green',
                feedback: 'Comprehensive identification process.',
              },
              {
                type: 'question',
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
        name: 'Risk Management 2',
        score: 90,
        risk: 'green',
        feedback: 'Strong risk management processes in place.',
        subRows: [
          {
            type: 'section',
            name: 'Risk Identification',
            score: 95,
            risk: 'green',
            feedback: 'Effective risk identification mechanisms.',
            subRows: [
              {
                type: 'question',
                text: 'How are risks identified?',
                response: 'Regular risk assessments and audits.',
                risk: 'green',
                feedback: 'Comprehensive identification process.',
              },
              {
                type: 'question',
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
            name: 'Risk Identification',
            score: 95,
            risk: 'green',
            feedback: 'Effective risk identification mechanisms.',
            subRows: [
              {
                type: 'question',
                text: 'How are risks identified?',
                response: 'Regular risk assessments and audits.',
                risk: 'green',
                feedback: 'Comprehensive identification process.',
              },
              {
                type: 'question',
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
    id: '1',
    type: 'assessment',
    name: 'Governance Framework Assessment 2',
    framework: 'Governance Framework',
    score: 85,
    risk: 'green',
    feedback: 'Overall good governance practices observed.',
    subRows: [
      {
        type: 'domain',
        name: 'Risk Management 1',
        score: 90,
        risk: 'green',
        feedback: 'Strong risk management processes in place.',
        subRows: [
          {
            type: 'section',
            name: 'Risk Identification 1',
            score: 95,
            risk: 'green',
            feedback: 'Effective risk identification mechanisms.',
            subRows: [
              {
                type: 'question',
                text: 'How are risks identified?',
                response: 'Regular risk assessments and audits.',
                risk: 'green',
                feedback: 'Comprehensive identification process.',
              },
              {
                type: 'question',
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
            name: 'Risk Identification 2',
            score: 95,
            risk: 'green',
            feedback: 'Effective risk identification mechanisms.',
            subRows: [
              {
                type: 'question',
                text: 'How are risks identified?',
                response: 'Regular risk assessments and audits.',
                risk: 'green',
                feedback: 'Comprehensive identification process.',
              },
              {
                type: 'question',
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
        name: 'Risk Management 2',
        score: 90,
        risk: 'green',
        feedback: 'Strong risk management processes in place.',
        subRows: [
          {
            type: 'section',
            name: 'Risk Identification',
            score: 95,
            risk: 'green',
            feedback: 'Effective risk identification mechanisms.',
            subRows: [
              {
                type: 'question',
                text: 'How are risks identified?',
                response: 'Regular risk assessments and audits.',
                risk: 'green',
                feedback: 'Comprehensive identification process.',
              },
              {
                type: 'question',
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
            name: 'Risk Identification',
            score: 95,
            risk: 'green',
            feedback: 'Effective risk identification mechanisms.',
            subRows: [
              {
                type: 'question',
                text: 'How are risks identified?',
                response: 'Regular risk assessments and audits.',
                risk: 'green',
                feedback: 'Comprehensive identification process.',
              },
              {
                type: 'question',
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
