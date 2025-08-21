type Framework = {
  id: string
  type_id: string
  status_id: string
  name: string
  code: string | null
  black_max: string
  red_max: string
  amber_max: string
  report_black: string
  report_red: string
  report_amber: string
  report_green: string
  summary: string
  description: string
  authority: string
  legislation: string | null
  monthly_subscription_amt: string
  is_standard: string
  is_default_self_assessment: string
  created_at: string | null
  updated_at: string
}

export const frameworks: Framework[] = [
  {
    id: '1',
    type_id: '1',
    status_id: '3',
    name: 'Four-Frames Board Assessment Framework',
    code: 'FF-BAF-01',
    black_max: '25.00',
    red_max: '45.00',
    amber_max: '65.00',
    report_black:
      "Based on the assessments returned, your overall governance is in a parlous state and requires urgent action.  Your organisation's governance maturity suggests that your organisation is either newly established and is in the earliest stages of developing out its Board practices, or is at immediate risk of damage or failure in its operations, reputation, or legal standing. Immediate corrective action is essential to address systemic failures in accountability, transparency, financial oversight, and compliance with legal obligations. Failure to act could result in significant financial loss, legal consequences, or even the dissolution of the organisation. \n\nThe GovernApp action plan provides a comprehensive governance improvement plan that the Board should seek to implement urgently.  While the quantum of effort required may seem daunting, many action items are accompanied by template solutions from our knowledge bank, such as policies, procedures and work practices.  Adopting these will greatly accelerate your governance standing with only modest effort.  Also, actions are risk-prioritised, making clear where your most urgent effort should be focussed.\n\nGiven the urgency, the Board may consider dedicating more time above and beyond its normal meeting profile to implement the required actions and facilitate rapid sign-off\/endorsement of the action outcomes.  Consider scheduling another GovernApp assessment for three months time, which should both demonstrate progress you are making as well as refocusing you on the remaining priorities.",
    report_red:
      'Based on the assessments returned, your overall governance is putting the organisation in jeopardy.  This level of governance risk could lead to severe legal, financial, and reputational consequences, including potential regulatory penalties, loss of funding, and diminished stakeholder trust.  Immediate action is required to address governance deficiencies, and the board should prioritise implementing the corrective measures defined in the GovernApp action plan to restore stability and compliance.\n\nWhile the quantum of effort required may seem daunting, many action items recommended by GovernApp are accompanied by template solutions from our knowledge bank, such as policies, procedures and work practices.  Adopting these will greatly accelerate your governance standing with only modest effort.  Also, actions are risk-prioritised, making clear where your most urgent effort should be focussed.\n\nThe Board should consider scheduling another GovernApp assessment for six months time, which should both demonstrate progress you are making as well as refocusing you on the remaining priorities.',
    report_amber:
      'Based on the assessments returned, it is observed that while there are elements of governance where you are fair to good, there are notable weaknesses in your governance practices and behaviours that could escalate into more serious issues if not addressed.  The board should focus on strengthening its governance practices to prevent these risks from developing into significant problems.  \n\nThis GovernApp assessment report will identify those areas of greatest weakness for you.  The GovernApp action plan also provides clear, risk-prioritised actions you can undertake to address these weaknesses.  Be sure to utilise the template solutions such as policies, procedures and work practices, that are associated to some actions.  These will greatly reduce the effort required to implement key actions. \n\nThe Board should schedule another GovernApp assessment for twelve months time, to track and demonstrate progress you are making as well as refocusing you on any remaining priorities.',
    report_green:
      'Based on the assessments returned, your board governance is relatively sound. This indicates that the board is effectively fulfilling its responsibilities, maintaining transparency, and managing risks well. \n\nThis result does not guarantee universal compliance; the Board should review the assessment report for any areas where improvments could be made.  The action plan will identofy any and all recommended actions to imrove your practices in a risk-prioritised manner.\n\nContinuous improvement is the key to maintaining this positive status.  The Board should schedule annual GovernApp assessments to help stay proactive in governance practices, ensuring that any emerging challenges are identified early and improvements are continuously pursued to maintain this positive status.',
    summary:
      'The core Board assessment framework available to all GovernApp users by default.',
    description:
      'This framework organises its assessment around the leadership framework advanced by Lee Bolman and Terrence Deal in their seminal work "Reframing Organizations: Artistry, Choice and Leadership", first published in 1984.  Their thesis suggested that there are four principal orientations leaders bring to their endeavours:\r\n\r\n - The Structural Frame: leaders with a structural frame focus on organisational structures, processes, procedures and policies to achieve organisational outcomes \r\n - The Human Resource Frame: leaders with an HR frame tend to follow the maxim that empowering and fully resourcing the organisation\'s people will lead to them to surprise and delight customers. \r\n - The Political Frame: organisations have limited resources, and the political frame leader believes that if they can control and direct sufficient resources (ie accumulate sufficient power), they will be able to meet the goals of the organisation.\r\n - The Symbolic Frame: for the symbolic leader, what the organisation does is less important that what it stands for from the perspective of both employees and customers.  They focus on how to shape a culture that gives purpose and meaning to work.\r\n\r\nBolman and Deal suggest that, while most leaders tend to have a dominant frame, they should learn to apply the most relevant frame (or frames) to any particular organisational challenge or scenario.\r\n\r\nWe extend the metaphor to Board Leadership, suggesting that successful Boards will demonstrate capability across all four frames, although of course they may not use this specific terminology.  Bolman and Deal emphasize that effective leadership requires the ability to integrate and apply multiple frames flexibly, depending on the situation. They argue that each frame offers unique insights into organizational dynamics and challenges.  Leaders must learn to diagnose problems from multiple perspectives and develop strategies that leverage the strengths of each frame while mitigating their weaknesses.  We consider that this Four Frames model provide an excellent basis for a Board Assessment Framework.',
    authority: 'GovernApp',
    legislation: 'NA',
    monthly_subscription_amt: '0.00',
    is_standard: '1',
    is_default_self_assessment: '0',
    created_at: null,
    updated_at: '2025-05-21 08:58:12',
  },
  {
    id: '2',
    type_id: '3',
    status_id: '3',
    name: 'GovernApp Self Assessment Framework (Victoria)',
    code: 'SA-VIC-01',
    black_max: '25.00',
    red_max: '45.00',
    amber_max: '65.00',
    report_black:
      "Your understanding of basic governance concepts requires a great deal of development.  You should undertake the actions recommended in your assessment report without delay and consider re-taking the self-assessment in one months time to test your improved understanding.  The assessment report will highlight which of the three Sections you should focus on (it may be more than one).  Don't be disheartened: governance is a wide and complex subject, and it takes time to learn the ropes.  You can conduct a GovernApp self-assessment exercise at any time, and you will find your understanding growing as you continue to apply yourself.\n\nWhile you build knowledge and experience, you should consider finding a mentor to support you in your journey and assist you with your learning and with understanding any aspects of your role as a Board member that you are as yet unfamiliar with.",
    report_red:
      "Your understanding of basic governance concepts requires significant development.  You should undertake the actions recommended in your assessment report without delay and consider re-taking the self-assessment in two months time to test your improved understanding.  The assessment report will highlight which of the three Sections you should focus on (it may be more than one).  Don't be disheartened: governance is a wide and complex subject, and it takes time to learn the ropes.  You can conduct a GovernApp self-assessment exercise at any time, and you will find your understanding growing as you continue to apply yourself.",
    report_amber:
      'Your understanding of basic governance concepts requires further development.  You should undertake the actions recommended in your assessment report and consider re-taking the self-assessment in six months time, or before your next Board meeting - whichever comes first.  The assessment report will highlight which of the three Sections you should focus on (it may be more than one).  \n\nYou are on the way.  Governance is a wide and complex subject, and it takes time to learn the ropes.  You can conduct a GovernApp self-assessment exercise at any time, and you will find your understanding growing as you continue to apply yourself.',
    report_green:
      'Congratulations, your understanding of basic governance concepts is strong.  You may consider mentoring less experienced members of the Board in their development journey.',
    summary:
      'The GovernApp self assessment framework helps you assess your current understanding of foundation-level governance.  It is designed to confirm areas of knowledge strength AND to help identify areas that may require further insight and development.',
    description:
      'The self assessment framework is grouped into three areas: \r\n\r\n - People and Place\r\n - Documents and Evidence\r\n - Implementation and Integration\r\n\r\nYou will be asked a order of questions in each section.  \r\n\r\nNote, this questionnaire applies to those involved in Victorian-based entities.  Different jurisdictions carry differing rules on some items.  If you would prefer to self-assess under an alternate jurisdiction, please select the relevant jurisdiction from the available self-assessment frameworks.',
    authority: 'GovernApp',
    legislation: 'GovernApp',
    monthly_subscription_amt: '0.00',
    is_standard: '1',
    is_default_self_assessment: '1',
    created_at: null,
    updated_at: '2025-04-29 02:10:54',
  },
  {
    id: '7',
    type_id: '1',
    status_id: '3',
    name: 'ACNC Charity Assessment Framework',
    code: null,
    black_max: '25.00',
    red_max: '45.00',
    amber_max: '65.00',
    report_black:
      'Your assessment indicates serious concerns about your organisation’s compliance with both the ACNC Governance Standards and ACNC Additional Obligations. Significant gaps may exist in key governance areas, such as the appropriate use of funds and assets, communication of charitable purposes, accountability to members, legal compliance, and the suitability and duties of Responsible People. There may be no clear systems for monitoring governance arrangements, managing conflicts of interest, or ensuring responsible decision-making. Additionally, public trust could be at risk due to potential involvement in abuse allegations or a lack of participation in the Redress Scheme.\n\nAt the same time, your organisation may be failing to meet critical ACNC obligations, such as maintaining accurate records, submitting timely and accurate reports, or notifying the ACNC of significant breaches. There may be gaps in understanding or fulfilling key notification requirements, and compliance processes may be inadequate or entirely absent. These deficiencies present a high risk of non-compliance and could lead to severe regulatory consequences, including penalties or the loss of ACNC registration. Immediate action is necessary to address these serious governance and compliance risks.',
    report_red:
      'Your assessment indicates notable weaknesses in your organisation’s compliance with both the ACNC Governance Standards and ACNC Additional Obligations. There may be gaps in how your organisation ensures funds and assets are used appropriately, communicates its purposes, or holds itself accountable to members. Weaknesses may also exist in legal compliance, the suitability and ongoing monitoring of Responsible People, and the management of conflicts of interest, related party transactions, and financial oversight. Participation in the Redress Scheme may be unclear, or your organisation may not be addressing potential abuse-related issues effectively.\n\nAdditionally, your organisation may experience occasional lapses in updating records, submitting reports on time, or notifying the ACNC of significant changes or breaches. While there may be some awareness of these obligations, gaps in compliance processes or inconsistent reporting could increase the risk of regulatory scrutiny. Addressing these issues is important to strengthen governance, improve transparency, and ensure compliance with ACNC requirements.',
    report_amber:
      'Responses suggest that your organisation meets many of the ACNC Governance Standards and ACNC Additional Obligations, but with some areas of concern. While your organisation generally follows its charitable purposes and legal obligations, there may be inconsistencies in governance processes, such as monitoring the suitability of Responsible People, ensuring effective decision-making, or managing conflicts of interest. Communication with members, financial oversight, or risk management procedures may also need strengthening. Participation in the Redress Scheme may be underway but not yet fully resolved.\n\nAdditionally, while most records and reporting obligations appear to be met, there could be occasional delays or inconsistencies in updating records, submitting reports, or notifying the ACNC of significant changes or breaches. Although there is some awareness of these responsibilities, compliance processes may need to be reinforced to ensure full adherence. These issues indicate a moderate risk that should be reviewed to enhance governance and regulatory compliance.',
    report_green:
      'Responses indicate that your organisation is generally compliant with both the ACNC Governance Standards and ACNC Additional Obligations. Your governing documents reflect the organisation’s charitable purposes, funds and assets are used appropriately, and communication with members is clear and transparent. The suitability and duties of Responsible People are well-managed, with strong processes in place for decision-making, conflict-of-interest management, and financial oversight. Participation in the Redress Scheme further demonstrates a commitment to maintaining public trust.\n\nAdditionally, your organisation fully meets its ACNC Additional Obligations, with all records up to date, reports submitted on time and accurately, and any significant breaches or changes reported promptly. There is a clear understanding of these responsibilities, and no governance or compliance concerns are present.',
    summary:
      'A framework based on the downloadable self-assessment template provided by the ACNC, enhanced to provide a clearer sense of compliance to ACNC requirements.',
    description:
      "This framework is based on the self-evaluation document that is provided as a downloadable template by the ACNC at https:\/\/www.acnc.gov.au\/for-charities\/manage-your-charity\/governance-hub\/governance-standards\/self-evaluation-charities.  \r\n\r\nThis is a basic assessment of 36 questions.  We recommend its use for Charities that would like to start their governance improvement journeys with a simpler framework, or to identify areas requiring improvement that can be more comprehensively assessed using GovernApp's core Four Frames Framework. \r\n\r\nThe ACNC assessment framework is based on the ACNC Governance Standards, comprising six standards as follows:\r\n\r\n - Standard 1: Purposes and not-for-profit nature\r\n - Standard 2: Accountability to members\r\n - Standard 3: Compliance with Australian laws\r\n - Standard 4: Suitability of Responsible People\r\n - Standard 5: Duties of Responsible People\r\n - Standard 6: Maintaining and enhancing public trust and confidence in the Australian not-for-profit sector \r\n\r\nThere are a further three sections to the assessment that address other compliance obligations.\r\n\r\nThe ACNC template from the website can be printed and hand-completed or completed electronically.  It works by asking users to address a set of governance questions, respond with a yes\/no\/not applicable answer, identify proofs (eg named documents or hyperlinks) that support your answer, and invites you to consider what actions you may take to address any identified gaps.  The ACNC is single user and if multiple Board members use the template they must either do so as a group, or do so individually and then amalgamate \/ align their answers.\r\n\r\nGovernApp operates differently: it presents the same questions and answer options, but does not ask you to provide evidence to support your answers (though this capability is on the GovernApp development plan).  Further, GovernApp does not ask you to identify what actions you need to take - the assessment report and action plan generated by GovernApp will do this for you.\r\n\r\nWe are developing an extended variant of the ACNC self-assessment template to provide a richer, more comprehensive assessment that more fully tests your compliance to the ACNC Standards.  Subscribers to GovernApp will be alerted to this extended assessment once it is released.\r\n\r\nNote, we acknowledge that the ACNC Governance Standards and the Charities self-assessment template are © Commonwealth of Australia 2018 and are reproduced here under the Creative Commons licence.  The assessment report and action text generated by GovernApp is our own and is designed to guide and assist but are not the responsibility of the ACNC.",
    authority: 'GovernApp',
    legislation: null,
    monthly_subscription_amt: '0.00',
    is_standard: '0',
    is_default_self_assessment: '0',
    created_at: '2024-12-04 05:48:21',
    updated_at: '2025-05-07 17:53:35',
  },
  {
    id: '8',
    type_id: '1',
    status_id: '3',
    name: 'CMA Standards Council Accreditation Preparation Framework',
    code: null,
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'The organisation appears to be facing significant and critical governance, compliance, and operational issues that place its accreditation, legal standing, and reputation in jeopardy. The organisation may be unregistered with the ACNC or in poor standing, with actions taken against it by regulatory authorities. It may not have a written statement of faith or have one that is inconsistent with the Nicene Creed, and there may be a lack of formal approval from the governing body.\n\nThe organisation might fail to submit essential regulatory documents such as the Annual Information Statement (AIS) or Annual Financial Report within required timeframes, or keep its ACNC register information (e.g., responsible persons, contact details) up to date. Key due diligence measures, such as checking the ASIC Disqualified Persons Register and conducting National Police and Working with Children Checks for Board members, might not be regularly performed or documented. Furthermore, the organisation may lack processes to ensure that checks remain current.\n\nThese systemic failures to meet basic regulatory, governance, and faith-based requirements create severe risks to the organisation’s legal compliance, operational integrity, and alignment with its mission. Immediate corrective actions, such as updating records, reviewing governance processes, and implementing compliance systems, are essential to address these critical deficiencies and mitigate the risk of non-compliance or accreditation loss.',
    report_red:
      'Your result indicates a high level of concern and suggests significant gaps in the organisation’s governance and compliance practices that require urgent attention. While the organisation may be registered with the ACNC and in general good standing, there are serious shortcomings in key areas. For instance, the organisation may have inconsistencies in its written statement of faith or fail to ensure that it is consistently reviewed and approved by the governing body.\n\nThe organisation may also fail to meet deadlines for submitting its Annual Information Statement (AIS) or Annual Financial Report or may not have up-to-date information on the ACNC register (such as responsible persons or contact details). It might conduct some necessary due diligence, such as checking the ASIC Disqualified Persons Register or conducting National Police and Working with Children Checks for Board members, but there could be gaps in execution, such as incomplete checks or missing documentation. Additionally, there may be no clear system for tracking and renewing expired checks.\n\nWhile the organisation is not facing systemic collapse, these issues present serious risks to compliance, accreditation, and organisational credibility. Prompt remedial actions, such as reviewing and updating governance practices, improving record-keeping, and addressing compliance gaps, are necessary to prevent further escalation of risks and to ensure continued alignment with regulatory and faith-based standards.',
    report_amber:
      'There are some moderate concerns that require attention but are not immediately critical. The organisation is likely registered with the ACNC and generally compliant, but there are some areas that need improvement to ensure ongoing adherence to governance and regulatory standards. For example, the organisation might have a written statement of faith that aligns with the Nicene Creed but lacks regular review or unanimous approval by the governing body.\n\nIt may submit its Annual Information Statement (AIS) and Annual Financial Report on time, but there could be occasional delays or minor issues with the accuracy of the information on the ACNC register. While the organisation may conduct necessary due diligence, such as checking the ASIC Disqualified Persons Register and performing National Police and Working with Children Checks for Board members, there could be inconsistencies in how these checks are documented or tracked for renewal.\n\nThese issues suggest that while the organisation is generally on track, it could benefit from tightening its processes and documentation to ensure full compliance. Addressing these concerns proactively will help to mitigate any risks to accreditation, legal standing, and overall operational integrity, ensuring that the organisation remains compliant with regulatory standards and aligned with its Christian mission.',
    report_green:
      "The organisation is in strong compliance with all governance and regulatory requirements, with no significant concerns identified. The organisation is registered with the ACNC, in good standing, and has submitted its Annual Information Statement (AIS) and Annual Financial Report on time. All relevant information on the ACNC register, including responsible persons and contact details, is accurate and up to date.\n\nThe organisation has a written statement of faith that is consistent with the Nicene Creed, and it is reviewed and approved annually by the governing body. The organisation conducts thorough due diligence, including regular checks of the ASIC Disqualified Persons Register and the completion of National Police and Working with Children Checks for all Board members, with proper documentation and tracking systems in place to ensure that checks are renewed before they expire.\n\nThis green risk level reflects strong governance, compliance with regulatory standards, and a clear alignment with the organisation's mission and values. The organisation’s practices inspire confidence in its ability to operate effectively, ethically, and in line with all required legal and faith-based expectations.",
    summary:
      'This framework allows Christian ministry organisations to self-assess their degree of compliance to the CMA Standards Council (CMASC) governance principles and standards.  Organisations completing the assessment will have an action plan generated for them that will improve their alignment to CMASC principles and standards.   Note, use of this framework it is *not* required by CMASC, nor does it guarantee that you will be assessed as compliant by CMASC if you complete all actions recommended.  This framework has been developed as a helpful starter on the accreditation journey that will give your organisation an initial sense of how much work is likely required prior to accreditation.',
    description:
      "The CMA Standards Council's 'Nine Principles of Ministry Accountability',  the 54 standards that fall under those principles, and the four public domain supporting policies, represent the essential requirements necessary for an organisation to become accredited by the Standards Council. (https:\/\/www.cmasc.net.au\/principles-standards\/principles).\r\n\r\nThe intent of the CMASC framework is to set principles and standards around organisational accountability.  Note, it is not the intent of the CMASC to assess organisational effectiveness.  Organisations wishing to comprehensively assess their Board effectiveness, efficiency and compliance standing are encouraged to conduct a GovernApp Board assessment using the \"Four Frames\" framework.",
    authority: 'GovernApp',
    legislation: null,
    monthly_subscription_amt: '0.00',
    is_standard: '0',
    is_default_self_assessment: '0',
    created_at: '2024-12-04 05:56:50',
    updated_at: '2025-04-01 23:43:13',
  },
]
