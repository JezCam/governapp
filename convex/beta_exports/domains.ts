type Domain = {
  id: string
  framework_id: string
  name: string
  order: string
  black_max: string
  red_max: string
  amber_max: string
  report_black: string
  report_red: string
  report_amber: string
  report_green: string
  description: string
  created_at: string | null
  updated_at: string
}

export const domains: Domain[] = [
  {
    id: '1',
    framework_id: '1',
    name: 'Structural',
    order: '1',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Your organisation faces very significant challenges in the key areas of policy compliance, Board composition and Board roles and responsibilities.  Your score suggests major areas of policy non-compliance that could have serious legal, financial, and reputational consequences, up to and including dissolution of the organisation.\n\nThe most likely scenarios for this assessment rating are:\n\n - you are a new organisation, in the process of formation, which has not yet developed a number of critical governance artefacts\n - you are a small organisation with limited means and capacity, and were unaware of your obligations or lacked the resources to address known \/ suspected gaps\n - you are a long standing organisation that has kept going but never really addressed governance as a topic\n \nGovernApp provides template artefacts for every policy or procedure mandated for NFPs.  Refer to your GovernApp action plan for risk-prioritised actions, which contain links to these templates.  Following the actions and implementing missing policies will help you rapidly mitigate the risks and issues your organisation currently carries in this domain.',
    report_red:
      'Your organisation faces significant challenges in the key areas of policy compliance, Board composition and Board roles and responsibilities.  Your score suggests significant areas of policy non-compliance that could have material legal, financial, and reputational consequences for the organisation.\n\nThe most likely scenarios for this assessment rating are:\n\n - you are a small organisation with limited means and capacity, and were unaware of your obligations or lacked the resources to address known \/ suspected gaps, or\n - you are a long standing organisation that has kept going but never really addressed governance as a topic.\n \nGovernApp provides template artefacts for every policy or procedure mandated for NFPs.  Refer to your GovernApp action plan for risk-prioritised actions, which contain links to these templates.  Following the actions and implementing missing policies will help you rapidly mitigate the risks and issues your organisation currently carries in this domain.',
    report_amber:
      'Your organisation faces some challenges in one or more of the key areas of policy compliance, Board composition and Board roles and responsibilities.  Check the section reports to identify which of these areas requires attention.\n\nYour overall score suggests there are may be areas of policy non-compliance that could have material legal, financial, and reputational consequences for the organisation.\n\nThe most likely scenario for this assessment rating is that your organisation has limited means and capacity to address Board governance.  To assist, GovernApp provides template artefacts for every policy or procedure mandated for NFPs.  Refer to your GovernApp action plan for risk-prioritised actions, which contain links to these templates.  Following the actions and implementing missing policies will help you rapidly mitigate the risks and issues your organisation currently carries in this domain.',
    report_green:
      'Your organisation performs well in the policy compliance, Board composition and Board roles and responsibilities.  While there may be some point areas where action is required or a review is recommended, the Structural Domain represents an area of relative strength for the organisation.  Your governance focus in this domain should now be on continuous improvement and tracking with any relatively recent compliance changes arising.\n \nRefer to your GovernApp action plan for recommended actions to continue to improve in this domain.',
    description:
      "The structural domain focuses on the architecture of the organisation, emphasising roles, responsibilities, policies, and processes.  This domain assesses whether the organisation's systems (policies, processes and procedures) are both extant and appropriate to the needs of an NFP. The structural domain also assesses the composition of the Board and whether there is clarity of Board roles and responsibilities. \n\nThis frame carries a heavy emphasis on compliance.  An assessment including this domain is helpful for young or immature Boards who want to rapidly build compliance capability, and for more mature Boards that want to optimise their performance and problem-solving proficiency.",
    created_at: '2024-09-10 21:49:50',
    updated_at: '2025-02-28 06:17:06',
  },
  {
    id: '2',
    framework_id: '1',
    name: 'Human Resources',
    order: '2',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'This assessment of the board’s alignment with principles of the Human Resources domain has highlighted significant, urgent risks. These findings indicate a critical lack of engagement and cohesion within the board, with limited mechanisms to support, train, or empower board members in their roles. The board currently lacks fundamental HR structures such as effective onboarding, professional development, and support systems that are crucial for fostering a collaborative, supportive, and productive board environment. Without immediate action, these issues threaten not only the board’s ability to function effectively but also the organisation’s overall mission impact.',
    report_red:
      'The recent assessment of the board’s alignment with the Human Resources domain indicates a high level of risk. Key HR practices for the Board, such as structured onboarding, continuous board development, and interpersonal support systems, are either insufficient or inconsistently applied. This gap in HR alignment may hinder the board’s ability to foster a supportive and collaborative environment, impacting both member engagement and the board’s overall effectiveness in guiding the organisation.',
    report_amber:
      'The recent assessment of the board’s alignment with the Human Resources domain indicates a moderate level of risk.  Key HR practices, including structured onboarding, ongoing professional development, and mechanisms for maintaining engagement and morale, may be present but are most likely not fully optimised. While the board demonstrates some commitment to creating a supportive and productive environment, certain practices could benefit from increased consistency and enhancement.',
    report_green:
      'The recent evaluation of the board’s alignment with the Human Resources domain reflects a strong performance.  This indicates that the board has effectively implemented and maintained HR board practices that foster a supportive and engaging environment for all members.  Current onboarding, training, and development practices are well-structured, ensuring that each board member is prepared, involved, and aligned with the organisation’s mission and values.',
    description:
      'The Human Resources domain recognises that effective governance relies on engaged, motivated, and well-prepared board members.  This domain assesses the Board around questions of culture, respect, open communication, and mutual support among members.  It considers onboarding processes for new members, ongoing board development opportunities, processes for addressing board member concerns or issues.',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2025-02-28 06:31:21',
  },
  {
    id: '3',
    framework_id: '1',
    name: 'Political',
    order: '3',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'The Political governance assessment has identified a high level of risk across stakeholder engagement, governance clarity, and financial oversight.  The Board lacks effective strategies to connect with and respond to stakeholders, increasing the risk of disengagement from the community, donors, and key supporters.  Communication is limited, with insufficient feedback integration and a lack of cultural awareness.\n\nGovernance processes are weak, with essential documents either inaccessible or inconsistently available.  Conflict resolution mechanisms are inadequate, contributing to unresolved issues.  Decision-making and information-sharing lack transparency, reducing trust and hindering informed governance.\n\nFinancial oversight is a critical concern, with inconsistent budget reviews, weak alignment with strategic priorities, and limited financial literacy among Board members.  The Board does not consistently assess solvency, and asset management practices lack confidence. Transparency and accountability measures beyond audits appear insufficient, increasing the risk of financial mismanagement and regulatory non-compliance.',
    report_red:
      'The Political governance assessment has identified a significant level of risk across stakeholder engagement, governance transparency, and financial oversight.  While some stakeholder relationship-building strategies exist, they are inconsistent and lack effectiveness, risking weak connections with key stakeholders, including the community and donors.  Feedback mechanisms are underdeveloped, and cultural sensitivity in communication is limited, affecting trust and collaboration.\n\nGovernance transparency is compromised by inconsistent access to key documents and inadequate conflict resolution processes.  Decision-making and information-sharing are not fully transparent, leading to potential misunderstandings and reduced trust within the Board and with external stakeholders.\n\nFinancial oversight poses substantial risks, with late or insufficient budget reviews and inconsistent budget approval processes. Alignment between financial priorities and strategic goals is unclear.  Financial literacy gaps hinder informed decision-making, and solvency is not consistently assessed.  Asset management practices lack confidence, and transparency measures beyond audits are limited. These issues increase the risk of financial instability and non-compliance.',
    report_amber:
      'The Political governance assessment has identified a moderate level of risk across stakeholder engagement, governance transparency, and financial oversight.  The Board has established some processes for engaging with stakeholders, but strategies for communication, feedback integration, and inclusive decision-making could be strengthened.  \n\nGovernance transparency is generally effective, with most key documents accessible.  However, ensuring consistent availability and improving communication outside formal meetings would support stronger internal relationships and decision-making. \n\nFinancial oversight is mostly in place, with regular budget reviews and structured approval processes.  However, earlier budget reviews and clearer alignment with strategic goals would improve planning.  Financial literacy is adequate but could be enhanced for deeper financial analysis.  Solvency is considered, but more formal declarations and refined asset management practices would increase accuracy.  While transparency and accountability are prioritised, greater independence from audits and stronger internal controls would further strengthen financial governance.',
    report_green:
      "The Political governance assessment has identified a low level of risk across stakeholder engagement, governance transparency, and financial oversight. The Board demonstrates a strong understanding of its stakeholders, maintaining effective communication channels, integrating feedback, and celebrating community achievements.  \n\nGovernance transparency is well-established, with key documents accessible to all relevant parties.  Decision-making processes are transparent and well-documented, ensuring informed and inclusive governance.  Open communication extends beyond formal meetings, balancing respect for the organisation's history with a forward-looking approach.\n\nFinancial oversight is robust, with proactive budget reviews that align financial priorities with strategic goals.  The Board consistently reviews financial statements, demonstrates high financial literacy, and maintains an accurate Asset Register.  Comprehensive transparency and accountability measures, along with full compliance with financial obligations, support financial sustainability and stakeholder confidence.",
    description:
      'The Political domain is concerned with the means by which resources are controlled withing the organisation.  This domain therefore assesses the Board’s ability to engage stakeholders, foster inclusivity, and integrate feedback.  It evaluates transparency, collaboration, and governance clarity, ensuring open communication and effective decision-making.  Additionally, it examines financial governance, including budgeting, oversight, compliance, and financial literacy, to support accountability and sustainability.',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2025-02-28 06:32:37',
  },
  {
    id: '4',
    framework_id: '1',
    name: 'Symbolic',
    order: '4',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      "The assessment of the Board's governance practices across the symbolic domain reveals a critical level of risk.\n\nIn strategic planning, the organisation's core purpose is unclear and not publicly available, weakening stakeholder alignment. The Board's involvement in strategic planning is limited, leading to a lack of strategic direction and ownership. Strategic plans are rarely updated, risking misalignment with changing needs. There is no clear evidence that the Board has ensured the necessary skills, resources, and capacity to execute the strategic plan, jeopardising strategic goals. The alignment between the strategic plan and the mission is weak or unverified, raising concerns about strategic relevance. The lack of defined KPIs or metrics impedes the Board's ability to demonstrate organisational performance and compliance. Accountability for progress is unclear, leading to gaps in oversight.\n\nIn organisational culture, there is no apparent intentionality or documentation of cultural expectations, resulting in inconsistent cultural experiences. The Board does not model organisational culture effectively, undermining cultural alignment.  There are no clear mechanisms for Board-staff interaction, leading to disconnected leadership.  The Board shows little commitment to stakeholder engagement. \n\nThese issues critically undermine strategic effectiveness, cultural cohesion, and consequently organisational sustainability.",
    report_red:
      'The assessment reveals a high level of risk across the symbolic domain.  The organisation’s core purpose is documented but not fully accessible, limiting stakeholder alignment.  The Board’s involvement in strategic planning is inconsistent, leading to unclear ownership and direction.  Strategic plans are updated infrequently, and there are concerns about the skills, resources, and capacity needed to achieve strategic goals.  The strategic plan’s alignment with the mission is unclear, and KPIs or metrics are insufficient to effectively monitor performance.  Progress accountability is weak, hindering oversight.\n\nIn terms of culture, while the organisation’s culture is somewhat intentional, cultural expectations are not consistently documented or communicated.  The Board models culture sporadically, reducing its influence.  Mechanisms for Board-staff interaction exist but are infrequent.  The Board’s commitment to inclusivity is underdeveloped, and mechanisms to measure satisfaction are informal or inconsistent.  Recognition of exceptional contributions is ad hoc. \n\nThese gaps create challenges in strategic and cultural alignment, engagement, and effectiveness.',
    report_amber:
      'The assessment indicates a moderate level of risk across the symbolic domain. The organisation’s culture is intentional, with some documentation of expectations, but there is room for clearer communication.  The Board models culture generally, but more consistency would strengthen its influence.  \n\nBoard-staff interaction mechanisms exist but could be improved.  The Board demonstrates commitment to inclusivity, but its approach could be more strategic.  Satisfaction measurement systems are in place but could be more frequent or comprehensive.  Recognition of exceptional contributions occurs, though a more structured approach would enhance impact. \n\nThese areas require improvement to better align strategic and cultural goals with the organisation’s overall effectiveness.',
    report_green:
      'The assessment reveals a low level of risk across the symoblic domain.  The organisation’s core purpose is clearly documented and publicly available, ensuring strong alignment with stakeholders.  The Board plays an active role in strategic planning, with frequent updates to the strategic plan, and has ensured the organisation has the necessary resources and capacity to achieve its goals.  The strategic plan is well-aligned with the organisation’s mission, and KPIs are clearly defined, allowing for effective performance tracking.\n\nIn terms of culture, the organisation has a clearly defined and intentional culture, with documented expectations that are consistently communicated.  The Board effectively models this culture, influencing organisational behaviours.  Strong mechanisms for Board-staff interaction are in place, and the Board demonstrates a clear commitment to inclusivity.  Employee and volunteer satisfaction is measured effectively, and exceptional contributions are consistently recognised. \n\nThese practices reflect a high standard of governance, with strong alignment between strategy, culture, and organisational performance.',
    description:
      "The symbolic domain focuses on culture and meaning within an organisation. It considers questions that relate to how people make sense of their work and how leaders can inspire and unify teams through shared values, traditions, and symbols.  Specifically, this domain considers whether the organisation's culture is intentionally shaped and clearly documented, and whether the Board effectively models cultural expectations through its communications and behaviours.  It examines the mechanisms in place for Board-staff interactions, the Board’s efforts to foster stakeholder engagement, and how employee and volunteer satisfaction is measured and assessed.  \n\nThis domain also considers the clarity of the organisation's core purpose, the Board’s role in strategic plan development and updates, and the alignment between strategic goals and the organisation's mission.  It also examines whether the Board has ensured that the necessary skills, resources, and capacity are in place to achieve strategic objectives, as well as the effectiveness of performance metrics in demonstrating progress and accountability.\n\nThis frame therefore considers how clarity of culture, purpose and strategy, and fundamentally how the Board models these things, impact the effectiveness of Board governance.",
    created_at: '2024-09-10 21:49:50',
    updated_at: '2025-02-28 06:33:34',
  },
  {
    id: '5',
    framework_id: '2',
    name: 'GovernApp Self Assessment Framework',
    order: '1',
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
    description:
      'This is a basic framework to test basic governance knowledge.  It is intended as an introductory assessment for new Board members, and is also useful for more experience Board members who are learning to use the GovernApp interface.',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2025-03-04 05:47:14',
  },
  {
    id: '8',
    framework_id: '4',
    name: 'Structural',
    order: '1',
    black_max: '30.00',
    red_max: '45.00',
    amber_max: '60.00',
    report_black:
      'Your organisation faces very significant challenges in the key areas of policy compliance, Board composition and Board roles and responsibilities.  Your score suggests major areas of policy non-compliance that could have serious legal, financial, and reputational consequences, up to and including dissolution of the organisation.\n\nThe most likely scenarios for this assessment rating are:\n\n - you are a new organisation, in the process of formation, which has not yet developed a number of critical governance artefacts\n - you are a small organisation with limited means and capacity, and were unaware of your obligations or lacked the resources to address known \/ suspected gaps\n - you are a long standing organisation that has kept going but never really addressed governance as a topic\n \nGovernApp provides template artefacts for every policy or procedure mandated for NFPs.  Refer to your GovernApp action plan for risk-prioritised actions, which contain links to these templates.  Following the actions and implementing missing policies will help you rapidly mitigate the risks and issues your organisation currently carries in this domain.',
    report_red:
      'Your organisation faces significant challenges in the key areas of policy compliance, Board composition and Board roles and responsibilities.  Your score suggests significant areas of policy non-compliance that could have material legal, financial, and reputational consequences for the organisation.\n\nThe most likely scenarios for this assessment rating are:\n\n - you are a small organisation with limited means and capacity, and were unaware of your obligations or lacked the resources to address known \/ suspected gaps, or\n - you are a long standing organisation that has kept going but never really addressed governance as a topic.\n \nGovernApp provides template artefacts for every policy or procedure mandated for NFPs.  Refer to your GovernApp action plan for risk-prioritised actions, which contain links to these templates.  Following the actions and implementing missing policies will help you rapidly mitigate the risks and issues your organisation currently carries in this domain.',
    report_amber:
      'Your organisation faces some challenges in one or more of the key areas of policy compliance, Board composition and Board roles and responsibilities.  Check the section reports to identify which of these areas requires attention.\n\nYour overall score suggests there are may be areas of policy non-compliance that could have material legal, financial, and reputational consequences for the organisation.\n\nThe most likely scenario for this assessment rating is that your organisation has limited means and capacity to address Board governance.  To assist, GovernApp provides template artefacts for every policy or procedure mandated for NFPs.  Refer to your GovernApp action plan for risk-prioritised actions, which contain links to these templates.  Following the actions and implementing missing policies will help you rapidly mitigate the risks and issues your organisation currently carries in this domain.',
    report_green:
      'Your organisation performs well in the policy compliance, Board composition and Board roles and responsibilities.  While there may be some point areas where action is required or a review is recommended, the Structural Domain represents an area of relative strength for the organisation.  Your governance focus in this domain should now be on continuous improvement and tracking with any relatively recent compliance changes arising.\n \nRefer to your GovernApp action plan for recommended actions to continue to improve in this domain.',
    description:
      "The structural domain focuses on the architecture of the organisation, emphasising roles, responsibilities, policies, and processes.  This domain assesses whether the organisation's systems (policies, processes and procedures) are both extant and appropriate to the needs of an NFP. The structural domain also asseses the composition of the Board and whether there is clarity of Board roles and responsibilities. \n\nThis frame carries a heavy emphasis on compliance.  An assessment including this domain is helpful for young or immature Boards who want to rapidly build compliance capability, and for more mature Boards that want to optimise their performance and problem-solving proficiency.",
    created_at: '2024-09-10 21:49:50',
    updated_at: '2024-10-24 22:56:26',
  },
  {
    id: '9',
    framework_id: '4',
    name: 'Human Resources',
    order: '1',
    black_max: '30.00',
    red_max: '45.00',
    amber_max: '60.00',
    report_black:
      'This assessment of the board’s alignment with principles of the Human Resources domain has highlighted significant, urgent risks. These findings indicate a critical lack of engagement and cohesion within the board, with limited mechanisms to support, train, or empower board members in their roles. The board currently lacks fundamental HR structures such as effective onboarding, professional development, and support systems that are crucial for fostering a collaborative, supportive, and productive board environment. Without immediate action, these issues threaten not only the board’s ability to function effectively but also the organisation’s overall mission impact.',
    report_red:
      'The recent assessment of the board’s alignment with the Human Resources domain indicates a high level of risk. Key HR practices for the Board, such as structured onboarding, continuous board development, and interpersonal support systems, are either insufficient or inconsistently applied. This gap in HR alignment may hinder the board’s ability to foster a supportive and collaborative environment, impacting both member engagement and the board’s overall effectiveness in guiding the organisation.',
    report_amber:
      'The recent assessment of the board’s alignment with the Human Resources domain indicates a moderate level of risk.  Key HR practices, including structured onboarding, ongoing professional development, and mechanisms for maintaining engagement and morale, may be present but are most likely not fully optimised. While the board demonstrates some commitment to creating a supportive and productive environment, certain practices could benefit from increased consistency and enhancement.',
    report_green:
      'The recent evaluation of the board’s alignment with the Human Resources domain reflects a strong performance.  This indicates that the board has effectively implemented and maintained HR board practices that foster a supportive and engaging environment for all members.  Current onboarding, training, and development practices are well-structured, ensuring that each board member is prepared, involved, and aligned with the organisation’s mission and values.',
    description:
      'The Human Resources domain recognises that effective governance relies on engaged, motivated, and well-prepared board members.  This domain assesses the Board around questions of culture, respect, open communication, and mutual support among members.  It considers onboarding processes for new members, ongoing board development opportunities, processes for addressing board member concerns or issues.',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2024-10-29 23:43:50',
  },
  {
    id: '10',
    framework_id: '5',
    name: 'First and Only Domain',
    order: '1',
    black_max: '10.00',
    red_max: '50.00',
    amber_max: '80.00',
    report_black: 'Text if black',
    report_red: 'Text if red',
    report_amber: 'Text if amber',
    report_green: 'Text if green',
    description: 'First and Only Domain',
    created_at: '2024-10-21 21:05:48',
    updated_at: '2024-10-21 21:06:19',
  },
  {
    id: '12',
    framework_id: '8',
    name: 'CMA Standards Council Base Domain',
    order: '1',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'The organisation appears to face significant challenges that could impact its governance, compliance, and operations.\n\nThere are concerns about its ability to define and uphold a clear Christian ethos, with questions around whether a consistent statement of faith is in place and supported by the governing body. Governance structures seem insufficient, with unclear accountability, limited independence among board members, and gaps in meeting frequency and record-keeping.\n\nCompliance with ACNC standards may be lacking, including timely reporting, accurate record maintenance, and conducting essential background checks for board members. These gaps expose the organisation to legal and reputational risks.\n\nFinancial oversight appears weak, with inadequate auditing, incomplete records, and vulnerabilities in managing loans or transactions. Without proper internal controls, financial mismanagement is a serious risk. The charitable purpose may not be clearly articulated or aligned with activities, creating uncertainty about resource use and mission focus.\n\nDonor communications may be incomplete or misleading, with concerns about failing to honour donor instructions or managing appeal funds transparently. Stakeholders might lack access to updates, reports, or opportunities to engage, potentially weakening trust.\n\nRisk management practices appear underdeveloped, with no clear framework for identifying or addressing risks. Ethical conduct may also be a concern, including handling donor gifts and remuneration decisions. Collectively, these issues suggest significant challenges in maintaining trust, compliance, and mission alignment.',
    report_red:
      'The organisation faces notable challenges that, while not systemic failures, expose significant risks to governance, compliance, and stakeholder trust.\n\nThe Christian ethos and faith framework may be partially established, but inconsistencies in alignment with the Nicene Creed or gaps in stakeholder communication weaken its credibility. Governance practices also show deficiencies, including lapses in board independence, inconsistent meeting documentation, and inadequate policies for term limits and committee operations, raising concerns about accountability and oversight.\n\nWhile some compliance measures, such as ACNC registration and background checks, may be in place, gaps in execution, such as outdated records or incomplete checks, compromise regulatory standing. Financial oversight appears inconsistent, with insufficient internal controls, irregular auditing practices, and poorly managed financial loans contributing to potential risks.\n\nThe organisation’s articulation of its charitable purpose is limited, with weak alignment of activities and inadequate planning or evaluation. Risk management practices, though present, are underdeveloped, with poor implementation, ineffective insurance coverage, and missing whistleblower policies exposing vulnerabilities.\n\nTransparency and stakeholder engagement are insufficient. Annual reports and meetings lack detail or meaningful opportunities for involvement, and feedback mechanisms are unreliable. Donor engagement practices show occasional inaccuracies in communications, challenges in honouring instructions, and inconsistent management of appeals, which erode trust and accountability.\n\nWhile the organisation demonstrates some awareness and efforts to address its responsibilities, these issues indicate substantial risks that require attention to uphold governance, operational integrity, and stakeholder confidence.',
    report_amber:
      'The organisation has foundational governance and compliance structures but exhibits moderate gaps requiring attention to ensure sustained effectiveness and accreditation readiness.\n\nWhile a written statement of faith or Christian ethos exists, it may lack recent review or unanimous approval by the governing body, and communications about the faith framework could be clearer or more consistent. These areas present manageable risks but warrant proactive refinement.\n\nACNC registration and reporting are generally compliant, though minor delays or inaccuracies, such as outdated contact details or late submissions, highlight process inefficiencies. Similarly, due diligence practices like background checks are in place but inconsistently applied or tracked, which could compromise governance integrity if not strengthened.\n\nGovernance practices demonstrate moderate deficiencies, including partial board independence, irregular documentation of decisions, and incomplete policies for term limits, financial dealings, and committee operations. These weaknesses, while not immediately critical, could erode compliance and stakeholder trust if left unaddressed.\n\nEfforts to articulate the organisation’s charitable purpose are evident but inconsistent across communications, planning, and activity evaluations. Periodic reviews of alignment with stated purposes and resource use need improvement to ensure sustained mission effectiveness.\n\nFinancial records and processes are functional but could benefit from enhanced auditing practices, internal controls, and financial reporting detail. Occasional lapses in loan documentation or approval procedures highlight areas for improvement to prevent risks.\n\nRisk management practices are established but not robust. Plans may lack frequent reviews or clear implementation strategies, and whistleblower and grievance policies, while present, could be more effectively enforced. Compliance monitoring measures exist but require greater comprehensiveness to ensure legal adherence.\n\nCommunication, reporting, and stakeholder engagement are adequate but leave room for growth. Annual reports and meetings could provide more detail, and feedback mechanisms, while functional, are not consistently accessible or timely. Board remuneration reviews align with basic expectations but may lack full transparency.\n\nDonor engagement practices are generally sound, but occasional lapses in accuracy or efficiency, such as issuing tax-deductible receipts or managing over- or under-subscriptions, suggest opportunities for improvement. Greater safeguards would enhance transparency and donor confidence.\n\nOverall, these moderate concerns do not indicate immediate threats but highlight areas requiring strategic focus to maintain compliance, governance standards, and stakeholder trust.',
    report_green:
      'The organisation has a clear Christian ethos documented in its constitution, mission, or website. A written statement of faith aligns with the Nicene Creed and is reviewed and approved annually by the governing body. If no written statement exists, the organisation provides consistent evidence of its faith-based identity, effectively communicated to stakeholders. Governance aligns with CMA standards, reflecting strong commitment to its mission and values. Minor improvements may be suggested, but governance is sound.\n\nThe organisation meets governance and regulatory standards without significant concerns. It is ACNC-registered, in good standing, and submits reports on time. ACNC details, including responsible persons and contact information, are accurate. Due diligence processes—such as ASIC checks, police checks, and Working with Children Checks—are robust, well-documented, and updated as needed, reflecting strong governance and confidence in operations.\n\nThe governing body demonstrates independence, meets regularly, maintains clear policies, and documents decisions effectively. Ongoing reviews ensure obligations are met, stakeholder trust is upheld, and the organisation remains mission-focused.\n\nBoard members understand their duties, with systems in place for conflict management, financial oversight, and recruitment. The organisation values inclusivity, diversity, and continuous improvement, ensuring compliance and maintaining stakeholder confidence.\n\nThe charitable purpose is clearly defined in the constitution and communicated through public materials. Activities are strategically aligned with the mission, and regular evaluations verify efficient use of resources. Governance practices enhance accountability and stakeholder trust.\n\nFinancial records are accurate and regularly audited or reviewed by qualified professionals. The Board reviews and approves financial statements, audit reports, and internal controls, ensuring accountability. Audit committees, where present, enhance oversight and promote ethical financial management.\n\nRisk management practices are robust, with a detailed plan identifying and mitigating risks. Regular reviews, aligned insurance programs, and effective whistleblower and grievance policies promote transparency. The Board ensures compliance, strengthening governance and operational integrity.\n\nThe organisation ensures transparency through annual meetings, accessible reports, and effective feedback mechanisms. Financial statements and appeal outcomes are readily available, while remuneration practices align with best standards. Stakeholders are well-informed, reflecting accountability and trust.\n\nDonor communications are accurate, transparent, and ethical. Instructions are honoured, receipts issued promptly, and data provided as needed. Representatives avoid undue influence, and clear plans address appeal outcomes, demonstrating strong alignment with CMA standards.',
    description:
      'The CMA Standards Council framework is a single domain framework.  All questions are embedded in this domain.',
    created_at: '2024-12-04 10:01:01',
    updated_at: '2025-03-06 23:51:58',
  },
  {
    id: '13',
    framework_id: '7',
    name: 'ACNC Governance Standards',
    order: '1',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Your assessment indicates serious concerns about your organisation’s compliance with the ACNC Governance Standards. Significant gaps are present in key governance areas, such as the use of funds and assets, communication of purposes, accountability to members, legal compliance, and the suitability and duties of Responsible People.  \n\nThere may be no clear systems in place for monitoring governance arrangements, addressing conflicts of interest, or ensuring responsible decision-making.  Additionally, public trust could be at risk due to potential involvement in abuse allegations or a lack of participation in the Redress Scheme.  These issues present a high risk of non-compliance and serious governance concerns.',
    report_red:
      'Your assessment indicates notable weaknesses in your organisation’s compliance with the ACNC Governance Standards.  There may be gaps in how your organisation ensures funds and assets are used appropriately or communicates its purposes.  Weaknesses may exist in member accountability, legal compliance, and the suitability or ongoing monitoring of Responsible People.\n\nThe organisation may also lack clarity in its approach to conflict-of-interest management, related party transactions, and financial oversight.  Participation in the Redress Scheme may be unclear, or your organisation may not be addressing potential abuse-related issues effectively.  These risks need to be addressed to avoid further governance or compliance challenges.',
    report_amber:
      'Responses suggest that your organisation meets many of the ACNC Governance Standards but with some areas of concern.  While your organisation generally follows its charitable purposes and legal obligations, there may be inconsistencies in its governance processes, such as monitoring the suitability of Responsible People, ensuring effective decision-making, or managing conflicts of interest.\n\nThe organisation may need to improve communication with members and strengthen financial oversight or risk management procedures.  Participation in the Redress Scheme may be underway but not yet fully resolved.  These issues indicate a moderate risk that should be reviewed for improvement.',
    report_green:
      'Responses indicate that your organisation is generally compliant with the ACNC Governance Standards.  The organisation’s governing documents reflect its charitable purposes, funds and assets are used appropriately, and communication with members is clear and transparent.  \n\nThe suitability and duties of Responsible People are well-managed, with clear processes in place for decision-making, conflict-of-interest management, and financial oversight.   Your organisation participates in the Redress Scheme, demonstrating a commitment to maintaining public trust.  No significant governance or compliance concerns are present.',
    description:
      "This domain assesses your compliance with the six ACNC governance standards.  The assessment questions are based on the ACNC's paper-based self-assessment that can be downloaded from their website.   The response options provided, and the recommended actions arising, are GovernApp designed and implemented, with the intent of helping your organisation readily identify areas of non-compliance and to provide clear actions, supported by template artefacts, to help bring you quickly into compliance.",
    created_at: '2025-03-13 01:33:41',
    updated_at: '2025-03-25 08:37:16',
  },
  {
    id: '14',
    framework_id: '7',
    name: 'ACNC Additional Obligations',
    order: '2',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Responses indicate major non-compliance with the ACNC Additional Obligations.  Your organisation may be failing to meet critical requirements, such as keeping up-to-date records with the ACNC, submitting accurate reports, or notifying the ACNC of significant breaches.  There may be gaps in understanding key obligations, such as notifying the ACNC about changes or breaches, and processes for meeting these obligations may be either non-existent or inadequate.  These issues pose a high risk to compliance and could lead to severe regulatory consequences, including penalties or the loss of ACNC registration.',
    report_red:
      'Responses suggest significant weaknesses in meeting the ACNC Additional Obligations.  Your organisation may have occasional lapses in updating records, submitting reports on time, or notifying the ACNC of important changes or breaches.  While there may be some understanding of these obligations, gaps in compliance processes or inconsistent reporting could expose your organisation to regulatory scrutiny.  These areas need to be addressed to reduce the risk of non-compliance and to improve overall transparency and accountability.',
    report_amber:
      'Responses suggest that your organisation generally meets the ACNC Additional Obligations, but there are some areas requiring improvement.  While most records may be up to date, there could be occasional delays or inconsistencies in meeting notification or reporting requirements.  There may be some awareness of the obligation to notify the ACNC of breaches, but processes for ensuring full compliance may need to be strengthened.  These issues represent a moderate risk and should be reviewed to ensure better overall adherence to ACNC requirements.',
    report_green:
      'Responses indicate that your organisation fully meets ACNC Additional Obligations.  All records are up to date with the ACNC, and your organisation submits reports on time and ensures full accuracy.  Significant breaches and changes are reported promptly, and there is a clear understanding of the responsibilities involved.  No compliance concerns are present in this area.',
    description: 'ACNC Additional Obligations',
    created_at: '2025-03-17 23:40:57',
    updated_at: '2025-03-25 08:38:06',
  },
]
