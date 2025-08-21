type Section = {
  id: string
  framework_id: string
  domain_id: string
  name: string
  description: string
  order: string
  black_max: string
  red_max: string
  amber_max: string
  report_black: string
  report_red: string
  report_amber: string
  report_green: string
  status: string
  created_at: string
  updated_at: string
}

export const sections: Section[] = [
  {
    id: '1',
    framework_id: '1',
    domain_id: '1',
    name: 'Board Composition',
    description:
      'The Board Composition section considers questions of how the Board is structured, Board recruitment and aspects of Board interaction.',
    order: '1',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      "Your Board Composition responses suggest there are fundamental flaws in the structure, recruitment, and interactions of the Board that may significantly impair the Board's ability to fulfill its governance responsibilities and strategic oversight.  The current Board structure may lack the diversity of skills, experience, and representation needed to effectively govern the organisation.  Board recruitment processes may be inadequate, leading to gaps in competencies or over-reliance on a narrow group of individuals, and Board interactions may be dysfunctional or unproductive, with poor communication, unclear roles, and potentially harmful dynamics that impede decision-making.\n\nThese issues may lead to poor strategic oversight, weakened financial and operational performance, and an erosion of trust among stakeholders, donors, and the broader community.\nIt may also result in difficulty attracting and retaining new Board members with the skills needed to advance the organisation’s mission.\n\nWithout urgent intervention, these issues may lead to poor strategic oversight, weakened financial and operational performance, and an erosion of trust among stakeholders, donors, and the broader community.\nIt may also result in difficulty attracting and retaining new Board members with the skills needed to advance the organisation’s mission.",
    report_red:
      "Your Board Composition responses indicate substantial concerns around the structure, recruitment processes, and dynamics of the Board. These issues, if left unaddressed, could hinder the Board's ability to effectively govern and fulfil its strategic role.\n\nThe current composition of the Board may not sufficiently align with the organisation's strategic priorities or may lack necessary diversity in skills, experience, or perspectives.  There may be gaps in recruitment processes, potentially leading to unbalanced representation or under-qualified members filling key roles.  Further, interactions between Board members may be strained, with challenges in communication, collaboration, or decision-making, affecting overall effectiveness.\n\nAs a consequence, the Board may struggle to provide effective oversight and leadership, impacting organisational performance and sustainability.  There is a risk of diminished stakeholder confidence, including among donors, beneficiaries, and the community, if governance practices are perceived as weak.  A failure to address these concerns could escalate the risk level to black, posing a critical threat to the organisation.",
    report_amber:
      "Your Board Composition responses indicate that while the Board's structure, recruitment, and dynamics are generally functioning, there are noticeable weaknesses that could impact governance effectiveness if not addressed promptly.\n\nThere may be some misalignment between the Board’s current composition and the organisation’s evolving needs or strategic goals. This could include gaps in skills, diversity, or representation.  Recruitment practices may not be fully optimised, possibly resulting in a lack of clear succession planning or gaps in expertise that could hinder decision-making or strategic oversight.  Further, while communication and collaboration are generally functional, there may be occasional challenges or inconsistencies that affect the Board’s ability to operate cohesively.\n\nIf not addressed, these issues could gradually weaken the Board’s overall governance capabilities, reducing its ability to lead the organisation effectively.\nA moderate risk level could progress to a higher risk category over time, particularly if the organisation faces new challenges that require more robust governance practices.  Addressing these concerns in a timely manner will help maintain governance effectiveness and prevent escalation to higher risk levels.",
    report_green:
      "Your Board Composition responses indicate that the Board's composition, recruitment practices, and internal interactions are strong and well-aligned with the organisation's goals and governance needs. This suggests that the Board is currently well-equipped to govern the organisation effectively and fulfil its strategic responsibilities.\n\nThe Board appears to be well-balanced in terms of skills, experience, and diversity, ensuring that its members bring a wide range of perspectives and expertise to the table.  Recruitment practices are sound, and there is evidence of a structured and thoughtful approach to bringing in new Board members.  Succession planning is likely in place, ensuring continuity of governance.  Communication among Board members is strong, fostering a collaborative and constructive environment for decision-making, and Board members engage effectively with one another, contributing to overall governance excellence.\n\nThe green risk level reflects a well-functioning Board composition that is contributing positively to the organisation’s governance and overall success. The current practices and structures should be maintained, and regular reviews will help ensure that these strengths are preserved and further developed.",
    status: '2',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2025-02-28 06:30:23',
  },
  {
    id: '2',
    framework_id: '1',
    domain_id: '1',
    name: 'Roles and Responsibilities',
    description:
      'The Roles and Responsibilities section addresses roles and responsibilities questions relating to both individual Board members as well as the joint responsibilities that Board members carry.',
    order: '3',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Your result in the Roles and Responsibilities section suggests that there is a severe breakdown in understanding and execution of both individual and collective responsibilities among Board members. This level of risk threatens the Board’s ability to effectively govern and oversee the organisation’s operations, potentially exposing the organisation to significant legal, operational, and reputational risks.\n\nBoard members may not fully understand their individual roles, duties, and obligations, leading to confusion in decision-making, accountability, and strategic oversight.  The Board’s collective responsibilities may not be well-understood, creating gaps in governance and making it difficult to provide effective direction for the organisation.  Further, a poor grasp of roles and responsibilities increases the risk of non-compliance with regulatory and governance requirements, which could lead to significant penalties or jeopardise the organisation’s standing.',
    report_red:
      'Your result in the Roles and Responsibilities section suggests that the Board’s understanding and execution of both individual and collective responsibilities are significantly compromised, posing risks to effective governance and the organisation’s overall stability.\n\nThere is some understanding of roles, but gaps remain, which can lead to inconsistent decision-making and potential overlaps or neglect of key responsibilities.  The Board may struggle with coordinating its efforts, leading to inefficiencies and challenges in fulfilling its collective duties.\nFurther. misunderstanding around responsibilities or unclear responsibilities can result in legal non-compliance, governance failures, or difficulties in holding individuals accountable for their actions.\n\nThe current level of risk warns that if left unaddressed, there could be a deterioration of the Board’s effectiveness and the organisation’s governance.',
    report_amber:
      "Your result in the Roles and Responsibilities section suggest that while the Board has some awareness and functioning understanding of its roles and responsibilities, there are notable areas for improvement. The risk is moderate and requires proactive steps to prevent it from escalating, but it's most likely not at a crisis point yet.\n\nSome Board members may have a good grasp of their individual and collective roles, but there are gaps in consistency or application, leading to confusion or inefficiencies.  There might be instances where responsibilities overlap or are neglected, leading to operational delays or missed opportunities.  If left unchecked, the lack of clarity could eventually lead to governance issues, such as poor decision-making or accountability problems.\n\nWhile the situation is not critical, it needs focused attention and improvement to avoid further governance issues. With proactive measures, the Board can strengthen its governance framework and reduce the risk of more significant challenges in the future.",
    report_green:
      'Your result in the Roles and Responsibilities section suggest that the Board is performing very well in understanding and executing its individual and collective roles. The risk is low, and governance practices in this area are effective and stable.\n\nBoard members are well aware of their individual responsibilities and the collective duties they hold. There is a clear division of tasks, and each member understands what is expected of them.  The Board operates smoothly as a team, with each member fulfilling their role effectively, which contributes to strong decision-making and operational efficiency.  The Board demonstrates a strong governance framework, ensuring accountability, transparency, and adherence to its legal and fiduciary duties. There are no significant overlaps, role confusion, or neglect of duties.',
    status: '2',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2025-02-28 06:30:59',
  },
  {
    id: '3',
    framework_id: '1',
    domain_id: '1',
    name: 'Policies and Procedures',
    description:
      'The Policies and Procedures section tests for the existence of mandatory and recommended policy and procedures in an organisation.  It provides template policies, procedures and work practices to help those organisations with critical gaps to quickly address and fill the gaps.',
    order: '2',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'This assessment of the Board’s policies and procedures has highlighted significant deficiencies that pose a severe risk to the organisation. The absence or inadequacy of critical governance documents and policies exposes the organisation to legal, operational, and reputational risks, which, if not urgently addressed, may lead to non-compliance with regulatory obligations and operational inefficiencies.\n\nSeveral essential governance policies, including those covering legal compliance (such as conflict of interest, privacy, and risk management), were either absent or outdated. These deficiencies compromise the Board’s ability to ensure transparency, accountability, and compliance.  Policies that are crucial for operational governance (such as IT governance, cybersecurity, and child protection policies) may not be easily accessible to Board members, staff, or stakeholders. This increases the likelihood of non-compliance and mismanagement.  It is also likely that there is no formal, enforced process to regularly review and update policies, making it difficult to ensure that the organisation’s governance is aligned with its current operations, legal obligations, and evolving risks.\n\nFailure to rapidly address these shortcomings could lead to:\n\n - Legal repercussions due to non-compliance with regulatory requirements (e.g., ACNC, WHS laws, privacy laws).\n - Financial risks due to the absence of controls in financial management policies.\n - Reputational damage as the organisation may be seen as lacking transparency and governance capability.\n - Increased vulnerability to fraud, security breaches, and mismanagement of resources.\n\nImmediate action is required to mitigate legal, operational, and reputational threats. It is critical that the Board take swift, decisive action to address these issues, guided by the GovernApp action plan.',
    report_red:
      'This assessment of the Board’s policies and procedures has revealed serious gaps that present substantial risks.  While there are some existing documents, many critical policies are either inadequate or outdated, and the overall governance structure is insufficient to fully protect the organisation from legal, operational, and reputational risks.\n\nSeveral critical governance policies are outdated or missing crucial components. This creates vulnerability in areas such as compliance, financial management, and risk mitigation.  Policies, where they exist, are not consistently reviewed or updated. This means that many of the policies may no longer align with the organisation’s current operations, evolving risks, or legal requirements.  Also, where policies exist, they may not readily accessible to all Board members and key stakeholders, hindering their ability to ensure compliance and governance oversight.\n\nThe deficiencies in governance, if left unaddressed, could expose the organisation to:\n\n - Legal risks, including non-compliance with regulatory obligations (e.g., ACNC, privacy laws, and WHS requirements).\n - Operational inefficiencies, especially in areas requiring stringent policy controls, such as financial management and volunteer oversight.\n - Erosion of stakeholder trust, as gaps in governance might lead to perceptions of mismanagement or lack of transparency.\n\nThe current gaps in policies and procedures present significant risks that must be addressed urgently to avoid further escalation.  The Board take action to address these issues, guided by the GovernApp action plan.',
    report_amber:
      "This assessment of the Board’s policies and procedures indicates moderate risks. While key governance documents are in place, there are gaps that could pose challenges to long-term compliance and operational effectiveness. Timely action is required to address these issues to prevent escalation and ensure stronger governance.\n\nSeveral policies may not have been reviewed in recent years. While they are still functional, they may not reflect the most current legal requirements or industry best practices.  It is likely that where policies exist they are not systematically organised or easily accessible to all Board members, which can impact the Board's ability to ensure compliance and oversight.  \n\nIf these gaps are not addressed, the organisation could face:\n\n - Potential non-compliance with evolving regulations (e.g., privacy and data protection laws).\n - Operational inefficiencies and challenges in implementing governance practices consistently across all departments.\n - Delays in responding to risks or governance issues due to inadequate frameworks in emerging areas.\n\nAlthough the overall policy set is relatively stable, several areas need improvement to ensure the organisation remains compliant and efficient.",
    report_green:
      'This assessment of the Board’s policies and procedures has yielded a positive result, indicating that the Board is successfully managing its governance obligations.  Most key policies are up to date, accessible, and aligned with current regulations. The overall governance policy set is robust, and any improvements recommended are focused on fine-tuning.\n\nPolicies are well-organised and easily accessible to all Board members, enhancing transparency and ensuring that governance standards are consistently applied.\n\nWith good policies in place, the organisation is well-positioned to:\n\n - Maintain regulatory compliance.\n - Efficiently manage risks.\n - Promote a culture of accountability and transparency.\n\nBy continuing with periodic reviews using GovernApp and applying continuous improvement adjustments, the Board can ensure ongoing success and mitigate any future risks.',
    status: '2',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2025-02-28 06:30:43',
  },
  {
    id: '4',
    framework_id: '1',
    domain_id: '2',
    name: 'Board Compliance',
    description:
      'This Compliance section hones in on the governance requirements essential for maintaining transparency, accountability, and regulatory alignment.  The questions here evaluate the Board’s processes for conducting background and compliance checks, managing related party transactions, and ensuring timely updates to authorities on significant organisational changes.  Each question addresses specific responsibilities that safeguard the organisation’s integrity and trust with stakeholders.',
    order: '2',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      "The assessment of the Board’s practices related to compliance signifies that there are critical weaknesses in the Board's compliance with essential responsibilities, which pose significant legal, reputational, and operational risks to the organisation. Specifically, the lack of adequate processes for compliance checks—such as verifying the ASIC register, maintaining current police and Working with Children checks, and ensuring proper records of these requirements—highlights serious gaps in safeguarding the organisation’s integrity.\n\nFurthermore, the Board’s understanding of related party transactions and its responsiveness to mandated updates with authorities regarding organisational changes appears insufficient. This oversight may jeopardize regulatory compliance and stakeholder trust, underscoring the need for immediate, decisive action.",
    report_red:
      'The assessment of the Board’s practices related to compliance indicates that while some compliance protocols may be in place, they are inconsistently applied or not sufficiently robust, exposing the organisation to potential regulatory, reputational, and operational risks.  Key concerns could include gaps in verifying Board members’ eligibility through checks like the ASIC register, police checks, and Working with Children checks, as well as inconsistencies in tracking or updating these records.\n\nAdditionally, areas requiring attention include the Board’s awareness of related party transactions and the process for timely notifications to authorities about changes in organisational details, such as legal name updates or Board composition changes. These weaknesses, if not addressed, could hinder the organisation’s compliance efforts and accountability.',
    report_amber:
      'The assessment of the Board’s practices related to compliance indicates that while some key governance and compliance elements are in place, there are areas with moderate vulnerabilities that could lead to future risks if not addressed.  Current practices show partial adherence to compliance processes, such as maintaining eligibility checks (ASIC register, police, and Working with Children checks) and tracking Board member updates; however, these practices may lack full consistency or completeness.',
    report_green:
      'The assessment of the Board’s practices related to compliance demonstrates diligent adherence to essential compliance requirements. The Board shows robust oversight and effective processes across several key areas, including background and compliance checks, sound awareness of related party transactions and potential conflicts, and timely updates to relevant authorities regarding legal names, Directors, addresses, and governing documents.',
    status: '2',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2025-02-28 06:31:49',
  },
  {
    id: '5',
    framework_id: '1',
    domain_id: '2',
    name: 'Board Effectiveness',
    description:
      'Board effectiveness is a key determinant of how well a Board operates.  It speaks to the ability of Board members to work effectively as a team, demonstrate adaptability in the face of change and maintain strong ethics.',
    order: '1',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'The assessment findings indicate significant deficiencies across key areas of Board function and oversight.  Currently, essential governance processes and structures may not be in place or are failing to meet necessary standards, thereby exposing the organisation to elevated risks that could impact operational integrity, decision-making, and overall organisational sustainability.\n\nThere are likely critical gaps in core foundational Board practices such as an induction process for new members, regular Board performance assessments, and governance reviews.  Essential processes, such as conflict of interest management, misconduct response protocols, and succession planning for key roles may be missing.',
    report_red:
      'The assessment findings indicates considerable governance vulnerabilities across key areas, including performance assessment, governance review, induction, board development, conflict of interest management, succession planning, agenda-setting, and CEO-Board dynamics. While basic governance structures may be in place, they are either underdeveloped or not applied effectively, putting the organisation at heightened risk and potentially limiting its ability to operate at peak effectiveness.',
    report_amber:
      "The assessment findings highlight that while the Board demonstrates some effectiveness-oriented governance structures and practices, there are significant areas that require attention to enhance overall effectiveness and mitigate potential risks.\n\nThese likely relate to:\n\n - more frequent Board evaluation of its performance and governance structures to ensure they remain aligned with best practices and the organisation's evolving needs, \n - a probable need for a more robust induction process for new members and ongoing professional development initiatives to equip Board members with the necessary skills and knowledge to fulfill their roles effectively,\n - strengthening the processes related to conflict of interest management and misconduct investigations will enhance accountability and trust within the Board, and\n  - ensuring that Board members come to meetings well-prepared in order to significantly improve the quality of discussions and decision-making.",
    report_green:
      "The assessment findings reflects a strong Board effectiveness that effectively supports the organisation's mission and strategic objectives.\n\nThe Board consistently conducts formal assessments of its performance, there are regular reviews of the governance structure, new Board members undergo a comprehensive induction process, the Board maintains a conflict of interest register, and has effective protocols in place for handling potential misconduct, fostering transparency and accountability.\n\nThe Board is encouraged to maintain this high standard of practice and to continue seeking opportunities for further development. Regular reviews and proactive initiatives will help ensure sustained effectiveness and resilience as the organisation navigates future challenges.",
    status: '2',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2025-02-28 06:31:34',
  },
  {
    id: '6',
    framework_id: '1',
    domain_id: '3',
    name: 'Community and Stakeholder Engagement',
    description:
      'This set of questions aims to assess the Board’s understanding and engagement with key internal and external stakeholders, including the community, donors, volunteers, and other key supporters of the organisation.  They also explore the Board’s approaches to integrating feedback, leveraging networks, and fostering an inclusive and collaborative environment that supports trust and celebrates achievements.',
    order: '1',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      "The assessment results for stakeholder engagement points to a significant gap in the Board's ability to effectively understand, connect with, and respond to its stakeholders. With insufficient engagement or communication strategies in place, the organisation is at risk of disconnecting from its community, donors, and other vital supporters.  The actions recommended to address these gaps prioritise the development of robust strategies for building stakeholder relationships, integrating feedback into Board processes, and creating a more open and culturally sensitive dialogue.",
    report_red:
      'The assessment results indicate substantial concerns. While some elements of stakeholder relationship-building may be present, the current strategies appear to lack effectiveness or consistency, potentially limiting the Board’s connection with essential stakeholders.  The actions from this section will lead the Board to develop methods for gathering stakeholder feedback, celebrating key milestones, and maintaining culturally sensitive communication.  Addressing these areas will strengthen the Board’s rapport with its community and internal stakeholders, supporting a foundation of trust and collaboration.',
    report_amber:
      'The assessment results suggests that the Board has established some processes for understanding and engaging with its stakeholders, though there are areas where improvement would enhance effectiveness. Strengthening strategies for open communication, consistent feedback integration, and inclusive decision-making could help the Board elevate its stakeholder relationships. Proactively addressing these areas will allow the Board to build on its existing foundation, ensuring that stakeholder voices continue to inform its decisions and contribute positively to the organisation’s mission.',
    report_green:
      'The assessment demonstrates effective and proactive practices in this area. The Board appears to be well-informed about its internal and external stakeholders, with effective channels for open communication, feedback integration, and community celebration.',
    status: '2',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2025-02-28 06:32:49',
  },
  {
    id: '7',
    framework_id: '1',
    domain_id: '4',
    name: 'Purpose and Strategy',
    description:
      "The Purpose and Strategy section evaluates the clarity of the organisation's core purpose, the Board’s role in developing and updating the strategic plan, and the alignment between strategic goals and the organisation's mission.  It also examines whether the Board has ensured that the necessary skills, resources, and capacity are in place to achieve strategic objectives, as well as the effectiveness of performance metrics in demonstrating progress and accountability.",
    order: '1',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      "The assessment of the Board's Purpose and Strategy practices reveals a critical level of risk.  The organisation's core purpose is not clearly documented or publicly available, undermining stakeholder understanding and alignment.  The Board's involvement in strategic planning is limited or unclear, leading to a lack of strategic direction and ownership.  Strategic plans are infrequently updated, risking misalignment with changing environmental and organisational needs.  There is insufficient evidence that the Board has ensured adequate skills, resources, and capacity to execute the strategic plan, jeopardising the achievement of strategic objectives. \n\nAdditionally, the alignment between the strategic plan and the organisation's mission is weak or unverified, raising concerns about strategic relevance and impact.  The absence of clearly defined KPIs or metrics impedes the Board's ability to unambiguously demonstrate organisational performance, compliance, and goal achievement.  Furthermore, accountability for progress against strategic and operational plans is unclear, leading to potential gaps in oversight and performance management.  These issues collectively pose a significant threat to the organisation’s strategic effectiveness and sustainability.",
    report_red:
      "The assessment of the Board's Purpose and Strategy practices indicates a high level of risk.  While the organisation's core purpose is documented, its visibility and accessibility to stakeholders are limited, affecting stakeholder engagement and mission alignment.  The Board's contribution to strategic planning is inconsistent, leading to unclear strategic ownership and direction.  Strategic plan updates are irregular, potentially impacting responsiveness to changing needs.  There are concerns about the adequacy of skills, resources, and capacity to effectively implement the strategic plan, posing risks to strategic goal achievement. \n\nAlthough the strategic plan references the organisation's mission, the alignment is not clearly articulated, which may weaken strategic focus.  KPIs or performance metrics are likely present but lack clarity or comprehensiveness, reducing the Board's ability to effectively monitor organisational performance and compliance.  Progress against strategic and operational plans is reported, but inconsistencies in accountability and demonstrability hinder effective oversight.  These issues significantly impact the Board's strategic governance effectiveness.",
    report_amber:
      "The assessment of the Board's Purpose and Strategy practices shows a moderate level of risk.  The organisation's core purpose is documented and generally accessible, but opportunities exist to enhance stakeholder awareness and engagement.  The Board contributes to strategic planning; however, its role could be more clearly defined to strengthen strategic ownership.  Strategic plan updates occur periodically but may not fully reflect emerging challenges or opportunities.  The Board has assessed skills, resources, and capacity requirements, but gaps remain that could affect strategic execution. \n\nThe strategic plan aligns with the organisation's mission, although clearer communication of this alignment would improve strategic coherence.  KPIs and metrics are in place and mostly effective, but some lack precision or relevance, impacting the Board's ability to comprehensively evaluate performance and compliance.  Progress against plans is demonstrable, yet accountability mechanisms could be more robust to enhance oversight.  Addressing these areas would further strengthen strategic governance.",
    report_green:
      "The assessment of the Board's Purpose and Strategy practices indicates a low level of risk.  The organisation's core purpose is clearly documented and publicly available, ensuring strong stakeholder understanding and alignment.  The Board actively contributes to strategic planning, fostering a shared sense of strategic direction and accountability.  Strategic plans are regularly updated, enabling responsiveness to changing internal and external environments.  The Board is satisfied that adequate skills, resources, and capacity are in place to effectively implement the strategic plan.  \n\nThe alignment between the strategic plan and the organisation's mission is clearly articulated, reinforcing strategic relevance and purpose.  Comprehensive KPIs and metrics are established, enabling the Board to unambiguously demonstrate organisational performance, compliance, and achievement of strategic goals.  \n\nProgress against strategic and operational plans is clearly demonstrable, with strong accountability mechanisms ensuring effective oversight and performance management.  These practices reflect a high standard of strategic governance effectiveness.",
    status: '2',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2025-02-28 06:33:48',
  },
  {
    id: '8',
    framework_id: '2',
    domain_id: '5',
    name: 'People and Place',
    description:
      'The People and Place Section examines the relationship between Board and Management, Board roles and responsibilities and basic governance concepts.',
    order: '1',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Your understanding of the relationship between Board and Management, Board roles and responsibilities and basic governance concepts is problematic.  You should undertake the actions recommended in your assessment report without delay and consider re-taking the self-assessment in one months time to test your improved understanding.',
    report_red:
      'Your understanding of the relationship between Board and Management, Board roles and responsibilities and basic governance concepts is unsatisfactory.  You should undertake the actions recommended in your assessment report without delay and consider re-taking the self-assessment in two months time to test your improved understanding.',
    report_amber:
      'Your understanding of the relationship between Board and Management, Board roles and responsibilities and basic governance concepts is somewhat sub-par.  You should undertake the actions recommended in your assessment report and consider re-taking the self-assessment in six months time, or before your next Board meeting - whichever comes first.',
    report_green:
      'Your understanding of the relationship between Board and Management, Board roles and responsibilities and basic governance concepts is strong.',
    status: '1',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2025-03-04 05:26:03',
  },
  {
    id: '9',
    framework_id: '2',
    domain_id: '5',
    name: 'Documents and Evidence',
    description:
      'The Documents and Evidence Section tests your understanding around core financial and policy concepts.',
    order: '2',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Your understanding of basic financial concepts is problematic.  Even for those whose role is not Treasurer, effective Board participation means you should have a sound grasp of certain basic financial and policy concepts.  You are advised to undertake the actions recommended in your assessment report and consider re-taking the self-assessment in one months time, or before your next Board meeting - whichever comes first.',
    report_red:
      'Your understanding of basic financial concepts is unsatisfactory.  Even for those whose role is not Treasurer, effective Board participation means you should have a sound grasp of certain basic financial and policy concepts.  You are advised to undertake the actions recommended in your assessment report and consider re-taking the self-assessment in two months time, or before your next Board meeting - whichever comes first.',
    report_amber:
      'Your understanding of basic financial concepts is marginal.  Even for those whose role is not Treasurer, effective Board participation means you should have a sound grasp of certain basic financial and policy concepts.  You are advised to undertake the actions recommended in your assessment report and consider re-taking the self-assessment in six months time, or before your next Board meeting - whichever comes first.',
    report_green: 'Your understanding of basic financial concepts is sound.',
    status: '1',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2025-03-04 05:26:22',
  },
  {
    id: '10',
    framework_id: '2',
    domain_id: '5',
    name: 'Implementation and Integration',
    description:
      'The Implementation and Integration Section considers more specific aspects of Board roles and responsibilities in respect of delivering on the normal practices of a Board.',
    order: '3',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Your understanding of more detailed Board roles and responsibilities is problematic.  Knowing who does what, and when, is important for Board members.  You are advised to undertake the actions recommended in your assessment report and consider re-taking the self-assessment in two months time.',
    report_red:
      'Your understanding of more detailed Board roles and responsibilities is unsatisfactory.  Knowing who does what, and when, is important for Board members.  You are advised to undertake the actions recommended in your assessment report and consider re-taking the self-assessment in three months time.',
    report_amber:
      'Your understanding of more detailed Board roles and responsibilities is marginal.  Knowing who does what, and when, is important for Board members.  You are advised to undertake the actions recommended in your assessment report and consider re-taking the self-assessment in six months time.',
    report_green:
      'Your understanding of more detailed Board roles and responsibilities is good.',
    status: '1',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2025-03-04 05:26:36',
  },
  {
    id: '11',
    framework_id: '3',
    domain_id: '6',
    name: 'AGMs',
    description:
      'The scheduling, conduct, documentation and outcomes for AGMs in Incorporated Associations. ',
    order: '1',
    black_max: '36.00',
    red_max: '36.00',
    amber_max: '51.00',
    report_black:
      'This is the SECTION report text for Consumer Affairs VIC Financial and Audit Framework - Financial - AGMs - BLACK',
    report_red:
      'This is the SECTION report text for Consumer Affairs VIC Financial and Audit Framework - Financial - AGMs - RED',
    report_amber:
      'This is the SECTION report text for Consumer Affairs VIC Financial and Audit Framework - Financial - AGMs - AMBER',
    report_green:
      'This is the SECTION report text for Consumer Affairs VIC Financial and Audit Framework - Financial - AGMs - GREEN',
    status: '2',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2024-09-10 21:49:50',
  },
  {
    id: '12',
    framework_id: '3',
    domain_id: '6',
    name: 'Financial Records',
    description:
      'The preparation and recording of financial data for Incorporated Associations',
    order: '2',
    black_max: '36.00',
    red_max: '36.00',
    amber_max: '51.00',
    report_black:
      'This is the SECTION report text for Consumer Affairs VIC Financial and Audit Framework - Financial - AGMs - BLACK',
    report_red:
      'This is the SECTION report text for Consumer Affairs VIC Financial and Audit Framework - Financial - AGMs - RED',
    report_amber:
      'This is the SECTION report text for Consumer Affairs VIC Financial and Audit Framework - Financial - AGMs - AMBER',
    report_green:
      'This is the SECTION report text for Consumer Affairs VIC Financial and Audit Framework - Financial - AGMs - GREEN',
    status: '2',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2024-09-10 21:49:50',
  },
  {
    id: '13',
    framework_id: '3',
    domain_id: '6',
    name: 'Financial Statements',
    description:
      'The authorisation and recording of financial statement for Incorporated Associations.',
    order: '3',
    black_max: '36.00',
    red_max: '36.00',
    amber_max: '51.00',
    report_black:
      'This is the SECTION report text for Consumer Affairs VIC Financial and Audit Framework - Financial - AGMs - BLACK',
    report_red:
      'This is the SECTION report text for Consumer Affairs VIC Financial and Audit Framework - Financial - AGMs - RED',
    report_amber:
      'This is the SECTION report text for Consumer Affairs VIC Financial and Audit Framework - Financial - AGMs - AMBER',
    report_green:
      'This is the SECTION report text for Consumer Affairs VIC Financial and Audit Framework - Financial - AGMs - GREEN',
    status: '2',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2024-09-10 21:49:50',
  },
  {
    id: '14',
    framework_id: '3',
    domain_id: '6',
    name: 'Tiers',
    description:
      'Determining the appropriate tier for an Incorporated Association.',
    order: '4',
    black_max: '36.00',
    red_max: '36.00',
    amber_max: '51.00',
    report_black:
      'This is the SECTION report text for Consumer Affairs VIC Financial and Audit Framework - Financial - AGMs - BLACK',
    report_red:
      'This is the SECTION report text for Consumer Affairs VIC Financial and Audit Framework - Financial - AGMs - RED',
    report_amber:
      'This is the SECTION report text for Consumer Affairs VIC Financial and Audit Framework - Financial - AGMs - AMBER',
    report_green:
      'This is the SECTION report text for Consumer Affairs VIC Financial and Audit Framework - Financial - AGMs - GREEN',
    status: '2',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2024-09-10 21:49:50',
  },
  {
    id: '15',
    framework_id: '3',
    domain_id: '7',
    name: 'Audit Default Sole Section',
    description: 'Audit Default Sole Section Section Description',
    order: '1',
    black_max: '36.00',
    red_max: '36.00',
    amber_max: '51.00',
    report_black: 'Audit Default Sole Section Report text if BLACK',
    report_red: 'Audit Default Sole Section Report text if RED',
    report_amber: 'Audit Default Sole Section Report text if AMBER',
    report_green: 'Audit Default Sole Section Report text if GREEN',
    status: '2',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2024-09-10 21:49:50',
  },
  {
    id: '16',
    framework_id: '4',
    domain_id: '8',
    name: 'Board Composition',
    description:
      'The Board Composition section considers questions of how the Board is structured, Board recruitment and aspects of Board interaction.',
    order: '1',
    black_max: '30.00',
    red_max: '45.00',
    amber_max: '60.00',
    report_black:
      "Your Board Composition responses suggest there are fundamental flaws in the structure, recruitment, and interactions of the Board that may significantly impair the Board's ability to fulfill its governance responsibilities and strategic oversight.  The current Board structure may lack the diversity of skills, experience, and representation needed to effectively govern the organisation.  Board recruitment processes may be inadequate, leading to gaps in competencies or over-reliance on a narrow group of individuals, and Board interactions may be dysfunctional or unproductive, with poor communication, unclear roles, and potentially harmful dynamics that impede decision-making.\n\nThese issues may lead to poor strategic oversight, weakened financial and operational performance, and an erosion of trust among stakeholders, donors, and the broader community.\nIt may also result in difficulty attracting and retaining new Board members with the skills needed to advance the organisation’s mission.\n\nWithout urgent intervention, these issues may lead to poor strategic oversight, weakened financial and operational performance, and an erosion of trust among stakeholders, donors, and the broader community.\nIt may also result in difficulty attracting and retaining new Board members with the skills needed to advance the organisation’s mission.",
    report_red:
      "Your Board Composition responses indicate substantial concerns around the structure, recruitment processes, and dynamics of the Board. These issues, if left unaddressed, could hinder the Board's ability to effectively govern and fulfil its strategic role.\n\nThe current composition of the Board may not sufficiently align with the organisation's strategic priorities or may lack necessary diversity in skills, experience, or perspectives.  There may be gaps in recruitment processes, potentially leading to unbalanced representation or under-qualified members filling key roles.  Further, interactions between Board members may be strained, with challenges in communication, collaboration, or decision-making, affecting overall effectiveness.\n\nAs a consequence, the Board may struggle to provide effective oversight and leadership, impacting organisational performance and sustainability.  There is a risk of diminished stakeholder confidence, including among donors, beneficiaries, and the community, if governance practices are perceived as weak.  A failure to address these concerns could escalate the risk level to black, posing a critical threat to the organisation.",
    report_amber:
      "Your Board Composition responses indicate that while the Board's structure, recruitment, and dynamics are generally functioning, there are noticeable weaknesses that could impact governance effectiveness if not addressed promptly.\n\nThere may be some misalignment between the Board’s current composition and the organisation’s evolving needs or strategic goals. This could include gaps in skills, diversity, or representation.  Recruitment practices may not be fully optimised, possibly resulting in a lack of clear succession planning or gaps in expertise that could hinder decision-making or strategic oversight.  Further, while communication and collaboration are generally functional, there may be occasional challenges or inconsistencies that affect the Board’s ability to operate cohesively.\n\nIf not addressed, these issues could gradually weaken the Board’s overall governance capabilities, reducing its ability to lead the organisation effectively.  A moderate risk level could progress to a higher risk category over time, particularly if the organisation faces new challenges that require more robust governance practices.  Addressing these concerns in a timely manner will help maintain governance effectiveness and prevent escalation to higher risk levels.",
    report_green:
      "Your Board Composition responses indicate that the Board's composition, recruitment practices, and internal interactions are strong and well-aligned with the organisation's goals and governance needs. This suggests that the Board is currently well-equipped to govern the organisation effectively and fulfil its strategic responsibilities.\n\nThe Board appears to be well-balanced in terms of skills, experience, and diversity, ensuring that its members bring a wide range of perspectives and expertise to the table.  Recruitment practices are sound, and there is evidence of a structured and thoughtful approach to bringing in new Board members.  Succession planning is likely in place, ensuring continuity of governance.  Communication among Board members is strong, fostering a collaborative and constructive environment for decision-making, and Board members engage effectively with one another, contributing to overall governance excellence.\n\nThe green risk level reflects a well-functioning Board composition that is contributing positively to the organisation’s governance and overall success. The current practices and structures should be maintained, and regular reviews will help ensure that these strengths are preserved and further developed.",
    status: '1',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2024-10-29 22:45:11',
  },
  {
    id: '17',
    framework_id: '4',
    domain_id: '8',
    name: 'Key Policies',
    description:
      'The Policies and Procedures section tests for the existence of mandatory and recommneded policy and procedures in an organisation.  It provides template policies, procedures and work practices to help those organisations with critical gaps to quickly address and fill the gaps.',
    order: '1',
    black_max: '30.00',
    red_max: '45.00',
    amber_max: '60.00',
    report_black:
      'This assessment of the Board’s policies and procedures has highlighted significant deficiencies that pose a severe risk to the organisation. The absence or inadequacy of critical governance documents and policies exposes the organisation to legal, operational, and reputational risks, which, if not urgently addressed, may lead to non-compliance with regulatory obligations and operational inefficiencies.\n\nSeveral essential governance policies, including those covering legal compliance (such as conflict of interest, privacy, and risk management), were either absent or outdated. These deficiencies compromise the Board’s ability to ensure transparency, accountability, and compliance.  Policies that are crucial for operational governance (such as IT governance, cybersecurity, and child protection policies) may not be easily accessible to Board members, staff, or stakeholders. This increases the likelihood of non-compliance and mismanagement.  It is also likely that there is no formal, enforced process to regularly review and update policies, making it difficult to ensure that the organisation’s governance is aligned with its current operations, legal obligations, and evolving risks.\n\nFailure to rapidly address these shortcomings could lead to:\n\n - Legal repercussions due to non-compliance with regulatory requirements (e.g., ACNC, WHS laws, privacy laws).\n - Financial risks due to the absence of controls in financial management policies.\n - Reputational damage as the organisation may be seen as lacking transparency and governance capability.\n - Increased vulnerability to fraud, security breaches, and mismanagement of resources.\n\nImmediate action is required to mitigate legal, operational, and reputational threats. It is critical that the Board take swift, decisive action to address these issues.',
    report_red:
      'This assessment of the Board’s policies and procedures has revealed serious gaps that present substantial risks.  While there are some existing documents, many critical policies are either inadequate or outdated, and the overall governance structure is insufficient to fully protect the organisation from legal, operational, and reputational risks.\n\nSeveral critical governance policies are outdated or missing crucial components. This creates vulnerability in areas such as compliance, financial management, and risk mitigation.  Policies, where they exist, are not consistently reviewed or updated. This means that many of the policies may no longer align with the organisation’s current operations, evolving risks, or legal requirements.  Also, where policies exist, they may not readily accessible to all Board members and key stakeholders, hindering their ability to ensure compliance and governance oversight.\n\nThe deficiencies in governance, if left unaddressed, could expose the organisation to:\n\n - Legal risks, including non-compliance with regulatory obligations (e.g., ACNC, privacy laws, and WHS requirements).\n - Operational inefficiencies, especially in areas requiring stringent policy controls, such as financial management and volunteer oversight.\n - Erosion of stakeholder trust, as gaps in governance might lead to perceptions of mismanagement or lack of transparency.\n\nWhile the risk level is not critical, the current gaps in policies and procedures present significant risks that must be addressed urgently to avoid further escalation.',
    report_amber:
      "This assessment of the Board’s policies and procedures indicates moderate risks. While key governance documents are in place, there are gaps that could pose challenges to long-term compliance and operational effectiveness. Timely action is required to address these issues to prevent escalation and ensure stronger governance.\n\nSeveral policiesmay not have been reviewed in recent years. While they are still functional, they may not reflect the most current legal requirements or industry best practices.  It is likely that where policies exist they are not systematically organised or easily accessible to all Board members, which can impact the Board's ability to ensure compliance and oversight.  \n\nIf these gaps are not addressed, the organisation could face:\n\n - Potential non-compliance with evolving regulations (e.g., privacy and data protection laws).\n - Operational inefficiencies and challenges in implementing governance practices consistently across all departments.\n - Delays in responding to risks or governance issues due to inadequate frameworks in emerging areas.\n\nAlthough the overall policy set is relatively stable, several areas need improvement to ensure the organisation remains compliant and efficient.",
    report_green:
      'This assessment of the Board’s policies and procedures has yielded a positive result, indicating that the Board is successfully managing its governance obligations.  Most key policies are up to date, accessible, and aligned with current regulations. The overall governance policy set is robust, and any improvements recommended are focused on fine-tuning.\n\nPolicies are well-organised and easily accessible to all Board members, enhancing transparency and ensuring that governance standards are consistently applied.\n\nWith good policies in place, the organisation is well-positioned to:\n\n - Maintain regulatory compliance.\n - Efficiently manage risks.\n - Promote a culture of accountability and transparency.\n\nBy continuing with periodic reviews and adjustments, the Board can ensure ongoing success and mitigate any future risks.',
    status: '1',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2024-10-24 22:54:51',
  },
  {
    id: '18',
    framework_id: '4',
    domain_id: '8',
    name: 'Roles and Responsibilities',
    description:
      'The Roles and Responsibilities section addresses roles and responsibilities questions relating to both individual Board members as awell as the joint responsibilities that Board members carry.',
    order: '1',
    black_max: '30.00',
    red_max: '45.00',
    amber_max: '60.00',
    report_black:
      'Your result in the Roles and Responsibilities section suggests that there is a severe breakdown in understanding and execution of both individual and collective responsibilities among Board members. This level of risk threatens the Board’s ability to effectively govern and oversee the organisatio’s operations, potentially exposing the organisation to significant legal, operational, and reputational risks.\n\nBoard members may not fully understand their individual roles, duties, and obligations, leading to confusion in decision-making, accountability, and strategic oversight.  The Board’s collective responsibilities may not be well-understood, creating gaps in governance and making it difficult to provide effective direction for the organisation.  Further, a poor grasp of roles and responsibilities increases the risk of non-compliance with regulatory and governance requirements, which could lead to significant penalties or jeopardise the organisation’s standing.',
    report_red:
      'Your result in the Roles and Responsibilities section suggests that the Board’s understanding and execution of both individual and collective responsibilities are significantly compromised, posing risks to effective governance and the organisation’s overall stability.\n\nThere is some understanding of roles, but gaps remain, which can lead to inconsistent decision-making and potential overlaps or neglect of key responsibilities.  The Board may struggle with coordinating its efforts, leading to inefficiencies and challenges in fulfilling its collective duties.\nFurther. misunderstanding around responsibilities or unclear responsibilities can result in legal non-compliance, governance failures, or difficulties in holding individuals accountable for their actions.\n\nThe current level of risk warns that if left unaddressed, there could be a deterioration of the Board’s effectiveness and the organisation’s governance.',
    report_amber:
      "Your result in the Roles and Responsibilities section suggest that while the Board has some awareness and functioning understanding of its roles and responsibilities, there are notable areas for improvement. The risk is moderate and requires proactive steps to prevent it from escalating, but it's most likey not at a crisis point yet.\n\nSome Board members may have a good grasp of their individual and collective roles, but there are gaps in consistency or application, leading to confusion or inefficiencies.  There might be instances where responsibilities overlap or are neglected, leading to operational delays or missed opportunities.  If left unchecked, the lack of clarity could eventually lead to governance issues, such as poor decision-making or accountability problems.\n\nWhile the situation is not critical, it needs focused attention and improvement to avoid further governance issues. With proactive measures, the Board can strengthen its governance framework and reduce the risk of more significant challenges in the future.",
    report_green:
      'Your result in the Roles and Responsibilities section suggest that the Board is performing very well in understanding and executing its individual and collective roles. The risk is low, and governance practices in this area are effective and stable.\n\nBoard members are well aware of their individual responsibilities and the collective duties they hold. There is a clear division of tasks, and each member understands what is expected of them.  The Board operates smoothly as a team, with each member fulfilling their role effectively, which contributes to strong decision-making and operational efficiency.  The Board demonstrates a strong governance framework, ensuring accountability, transparency, and adherence to its legal and fiduciary duties. There are no significant overlaps, role confusion, or neglect of duties.',
    status: '1',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2024-10-23 08:17:03',
  },
  {
    id: '19',
    framework_id: '4',
    domain_id: '9',
    name: 'Board Effectiveness',
    description:
      'Board effectiveness is a key determinant of how well a Board operates.  It speaks to the ability of Board members to work effectively as a team, demonstrate adapatability in the face of change and maintain strong ethics.',
    order: '1',
    black_max: '30.00',
    red_max: '45.00',
    amber_max: '60.00',
    report_black:
      'The assessment findings indicate significant deficiencies across key areas of Board function and oversight.  Currently, essential governance processes and structures may not be in place or are failing to meet necessary standards, thereby exposing the organisation to elevated risks that could impact operational integrity, decision-making, and overall organisational sustainability.\n\nThere are likely critical gaps in core foundational Board practices such as an induction process for new members, regular Board performance assessments, and governance reviews.  Essential processes, such as conflict of interest management, misconduct response protocols, and succession planning for key roles may be missing.',
    report_red:
      'The assessment findings indicates considerable governance vulnerabilities across key areas, including performance assessment, governance review, induction, board development, conflict of interest management, succession planning, agenda-setting, and CEO-Board dynamics. While basic governance structures may be in place, they are either underdeveloped or not applied effectively, putting the organisation at heightened risk and potentially limiting its ability to operate at peak effectiveness.',
    report_amber:
      "The assessment findings highlight that while the Board demonstrates some effectiveness-oriented governance structures and practices, there are significant areas that require attention to enhance overall effectiveness and mitigate potential risks.\n\nThese likely relate to:\n\n - more frequent Board evaluation of its performance and governance structures to ensure they remain aligned with best practices and the organisation's evolving needs, \n - a probable need for a more robust induction process for new members and ongoing professional development initiatives to equip Board members with the necessary skills and knowledge to fulfill their roles effectively,\n - strengthening the processes related to conflict of interest management and misconduct investigations will enhance accountability and trust within the Board, and\n  - ensuring that Board members come to meetings well-prepared in order to significantly improve the quality of discussions and decision-making.",
    report_green:
      "The assessment findings reflects a strong Board effectiveness that effectively supports the organisation's mission and strategic objectives.\n\nThe Board consistently conducts formal assessments of its performance, there are regular reviews of the governance structure, new Board members undergo a comprehensive induction process, the Board maintains a conflict of interest register, and has effective protocols in place for handling potential misconduct, fostering transparency and accountability.\n\nThe Board is encouraged to maintain this high standard of practice and to continue seeking opportunities for further development. Regular reviews and proactive initiatives will help ensure sustained effectiveness and resilience as the organisation navigates future challenges.",
    status: '1',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2024-10-30 00:51:44',
  },
  {
    id: '20',
    framework_id: '4',
    domain_id: '9',
    name: 'CEO oversight',
    description:
      'The relationship between the Board and their CEO is critical.  This section tests the nature and effectiveness of Board oversight and executive management.',
    order: '1',
    black_max: '30.00',
    red_max: '45.00',
    amber_max: '60.00',
    report_black:
      'The assessment of the Board’s CEO oversight reveals significant gaps or weaknesses in essential areas, including the presence and review of a delegations instrument, constructive Board-CEO relations, regular CEO reporting, and adherence to performance review processes.  Such deficiencies suggest potential misalignments in authority, inadequate CEO oversight, and insufficient role delineation, which could severely impact the organization’s governance and operational accountability.',
    report_red:
      'The assessment of the Board’s CEO oversight reveals that several areas require improvement to enhance governance standards.  Although a delegations instrument may be in place, the frequency of its review or clarity in CEO-Board interactions appears insufficient, which may undermine the Board’s ability to exercise effective oversight.  Additionally, processes for CEO reporting and performance review might lack consistency or depth, impacting governance transparency and accountability.',
    report_amber:
      'The assessment of the Board’s CEO oversight reveals that while the foundational elements—such as a delegations instrument, CEO reporting, and delineation of roles—appear in place, there may be occasional lapses in review regularity, role clarity, or consistency in performance evaluations. Addressing these areas through minor adjustments, such as regularizing delegation reviews and enhancing the structure of CEO performance feedback, could further align the Board’s practices with high governance standards.',
    report_green:
      'The assessment of the Board’s CEO oversight shows a strong alignment with governance best practices, reflecting a low level of risk. Key practices are effectively upheld, including a clear delegations instrument, constructive Board-CEO interactions, regular CEO reporting, and adherence to structured performance review processes. This alignment underscores a well-governed framework where roles, authority, and accountability are clearly defined, supporting efficient Board and executive collaboration.',
    status: '1',
    created_at: '2024-09-10 21:49:50',
    updated_at: '2024-10-30 05:27:44',
  },
  {
    id: '21',
    framework_id: '5',
    domain_id: '10',
    name: 'First and only section',
    description: 'First and only section',
    order: '1',
    black_max: '10.00',
    red_max: '50.00',
    amber_max: '80.00',
    report_black: 'Text if black',
    report_red: 'Text if red',
    report_amber: 'Text if amber',
    report_green: 'Text if green',
    status: '2',
    created_at: '2024-10-21 21:06:34',
    updated_at: '2024-10-21 21:06:56',
  },
  {
    id: '23',
    framework_id: '8',
    domain_id: '12',
    name: 'Principle 1: God First',
    description:
      'The organisation must declare its Christian ethos and confirm that it acts in accordance with that ethos.',
    order: '1',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      "The organisation may lack a publicly stated Christian ethos, have no written statement of faith, or possess one that is inconsistent with the Nicene Creed.  It may also fail to secure unanimous approval of its statement of faith by its governing body or be unable to provide evidence of its definition of faith to stakeholders.  Such issues highlight major governance, compliance, or mission-alignment risks that could jeopardise the organisation's accreditation, credibility, and ability to fulfil its stated purposes.  Immediate corrective actions and external oversight may be required to address these concerns.",
    report_red:
      "While the organisation may have some aspects of its Christian ethos or faith framework in place, significant gaps or inconsistencies exist.  For example, the organisation might have a written statement of faith that is not clearly consistent with the Nicene Creed or has not been unanimously approved by its governing body.  Alternatively, it may lack sufficient evidence to communicate its definition of faith effectively to stakeholders. These shortcomings present serious risks to the organisation's compliance, governance, and alignment with accreditation standards.  Immediate remedial action would be necessary to address these issues, and ongoing oversight may be required to mitigate risks and restore confidence in the organisation's commitment to its stated purposes.",
    report_amber:
      'The organisation has foundational elements in place, such as a written statement of faith or a publicly stated Christian ethos, but there are areas needing improvement or clarification prior to CMA accreditation.  For example, the statement of faith might be consistent with the Nicene Creed but has not been recently reviewed or unanimously approved by the governing body.  Alternatively, the organisation may provide some evidence of its definition of faith but lacks clarity or consistency in how it is shared with internal and external stakeholders.  These issues represent a potential risk to full compliance with accreditation standards and should be addressed proactively through targeted governance improvements and better alignment of faith-based communications.',
    report_green:
      "The organisation appears to be close to meeting the required CMA standards with no significant concerns.  This suggests the organisation has a clear and publicly stated Christian ethos, documented in its constitution, vision\/mission statements, or on its website.   It also has a written statement of faith that is consistent with the Nicene Creed, approved annually and unanimously by its governing body.  If a written statement of faith is not present, the organisation can provide clear, consistent evidence of its definition of faith that is effectively communicated to internal and external stakeholders.  A green risk level reflects strong governance, alignment with accreditation standards, and confidence in the organisation's commitment to its Christian mission and values.  There may be some tightening actions recommended, but this overall Principle is in good health.",
    status: '2',
    created_at: '2024-12-04 10:05:55',
    updated_at: '2025-03-06 23:52:16',
  },
  {
    id: '24',
    framework_id: '8',
    domain_id: '12',
    name: 'Principle 2: Charitable Status',
    description:
      'The organisation must be a registered, legitimate and active Australian Charity.',
    order: '2',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'The organisation may be unregistered with the ACNC or not in good standing, with records showing regulatory actions or serious breaches of obligations.  It may lack essential compliance measures, such as not submitting an Annual Information Statement (AIS) or Annual Financial Report within required timeframes, or failing to update its ACNC register information.\n\nAdditionally, the organisation may not conduct critical due diligence, such as checking the ASIC Disqualified Persons Register or performing National Police Checks and Working with Children Checks for Board members. If no process exists to ensure these checks remain current, this creates significant legal and reputational risks.\n\nSignificant work, as identified in your action plan, will be required before you consider starting the CMASC Accreditation Process.',
    report_red:
      'There appear to be substantial deficiencies in governance and compliance that require urgent attention.  The organisation may be registered with the ACNC but face issues such as failing to meet reporting deadlines for its Annual Information Statement (AIS) or Annual Financial Report, or not keeping its ACNC register information (e.g., responsible persons or contact details) up to date.\n\nIt might perform some due diligence, such as checking the ASIC Disqualified Persons Register or conducting National Police and Working with Children Checks for Board members, but with inconsistencies or gaps in execution.  For instance, checks may not be conducted for all members, results may not be documented, or no process exists to track and update expired checks. While not indicative of systemic failure, these issues pose serious risks to compliance, governance integrity, and accreditation readiness.  The organisation must take prompt corrective action to address these gaps and prevent escalation of risks.',
    report_amber:
      'There are some moderate concerns that require attention to ensure ongoing compliance and governance integrity.  The organisation may be registered with the ACNC and generally compliant, but there are gaps in its processes or documentation.  For example, it may submit its Annual Information Statement (AIS) or Annual Financial Report late but within an acceptable grace period, or it may have minor inaccuracies in its ACNC register information (e.g., outdated responsible persons or contact details).\n\nThe organisation may conduct required due diligence, such as ASIC Disqualified Persons Register checks, National Police Checks, and Working with Children Checks, but lacks a robust system to ensure all checks are consistently applied, documented, and tracked for expiry. These issues, while not critical, highlight vulnerabilities that could impact compliance or accreditation if left unresolved. Proactive measures to strengthen processes and documentation will help mitigate risks and ensure sustained adherence to regulatory and governance standards.',
    report_green:
      'The results suggest strong compliance with governance and regulatory standards, with no significant concerns identified.  The organisation is registered with the ACNC, in good standing, and has submitted its Annual Information Statement (AIS) and Annual Financial Report on time.  Its ACNC register information, including responsible persons and contact details, is accurate and up-to-date.\n\nThe organisation demonstrates robust due diligence processes, such as conducting ASIC Disqualified Persons Register checks, National Police Checks, and Working with Children Checks for all Board members, with outcomes properly documented.  It also has a clear system in place to track the expiry of these checks and ensures timely updates.  This level of compliance reflects a well-governed and diligent organisation that aligns with accreditation requirements and inspires confidence in its governance and operations.  While some minor actions may be required, your organisation is in good shape on this Principle.',
    status: '2',
    created_at: '2024-12-04 10:51:39',
    updated_at: '2025-03-06 23:52:32',
  },
  {
    id: '26',
    framework_id: '8',
    domain_id: '12',
    name: 'Principle 3: Diligent Governance',
    description:
      'The organisation must be governed by a properly structured body which acts with care, diligence and independence.',
    order: '3',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      "Critical deficiencies place the organisation at a black level of risk for Principle 3, threatening its compliance, operational integrity, and stakeholder trust.  Key issues include unclear accountability in governing documents, insufficient board structure and independence, inadequate meeting frequency and record-keeping, non-compliance in financial dealings, inconsistent application of governance standards to related entities, and the absence of policies for committee operations and board member term limits.  These systemic weaknesses jeopardise the organisation's ability to meet regulatory obligations, maintain stakeholder confidence, and achieve its mission.",
    report_red:
      'Significant deficiencies place the organisation at a red level of risk for Principle 3, exposing it to substantial challenges in compliance, accountability, and effective oversight.  Key concerns include gaps in board independence, inconsistent meeting practices, insufficient documentation of decisions, weak controls over financial dealings involving board members, and the absence of clearly defined policies for board member term limits and committee operations.  These issues present a serious risk to the organisation’s regulatory standing, stakeholder confidence, and ability to operate effectively.',
    report_amber:
      'Moderate deficiencies place the organisation at an amber level of risk for Principle 3, suggesting areas requiring improvement to maintain effective compliance and oversight.  Key issues include some gaps in board independence, irregularities in meeting practices, inconsistent documentation of decisions, and a lack of comprehensive policies for areas such as financial dealings, board member term limits, and committee operations.  While these issues do not pose an immediate threat, they could escalate if not addressed, potentially impacting the organisation’s regulatory compliance and stakeholder trust over time.',
    report_green:
      'The organisation is at a green level of risk for Principle 3, reflecting strong compliance and effective oversight.  The governing body demonstrates sound practices in areas such as board independence, meeting frequency, record-keeping, financial governance, and the establishment of clear policies for board and committee operations.  While ongoing vigilance is necessary to maintain this standard, the organisation is well-positioned to meet its regulatory obligations, uphold stakeholder trust, and achieve its mission.',
    status: '2',
    created_at: '2025-01-10 04:32:00',
    updated_at: '2025-03-06 23:52:46',
  },
  {
    id: '27',
    framework_id: '8',
    domain_id: '12',
    name: 'Principle 4: Responsible Leadership',
    description:
      "Leadership is critical and sets the culture of the entire organisation. The members of the organisation’s governing body must be responsible, competent and comply with their legal obligations.  \n\nThis section addresses whether your organisation's Responsible Persons meet the ACNC Governance Standard 5 (duties of responsible people), as well as addressing questions on induction, Board development and conflict of interest.\n\nNote, Standard 4.1 under Principle 4 is a multi-part standard that incorporates ACNC Governance Standard 5, which itself overlaps some of the other CMASC standards.  To bring clarity, GovernApp has parsed Standard 4.1 into a set of questions which address the Standards while avoiding duplication with other CMASC Principles and Standards.",
    order: '4',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Your assessment indicates severe deficiencies, including a lack of awareness and documentation of the duties of Responsible Persons, insufficient training or legal support for board members, and gaps in essential governance processes such as conflict of interest management, financial oversight, and recruitment.  The absence of a clear focus on skills development, inclusivity, and compliance with ACNC Governance Standard 5 exacerbates the risks, potentially leading to regulatory breaches, financial mismanagement, and loss of stakeholder confidence.',
    report_red:
      'Your assessment indicates significant shortcomings, including inconsistent training for Responsible Persons, inadequate processes for managing related party transactions and conflicts of interest, and limited intentionality in fostering diversity and inclusivity on the board.  While the organisation demonstrates some awareness of its responsibilities, weaknesses in financial oversight, board member recruitment, and governance processes present substantial risks to its compliance, accountability, and operational effectiveness.',
    report_amber:
      'Your assessment highlights moderate deficiencies.  While there are efforts to address governance responsibilities, areas such as regular training for Responsible Persons, consistent management of conflicts of interest, and intentionality in building board diversity require improvement.  Some gaps in financial oversight and board development planning suggest vulnerabilities that, if unaddressed, could impact the organisation’s compliance and long-term effectiveness.',
    report_green:
      'Your assessment indicates that the organisation is well placed to meet Principle 4 and its attendant Standards. Board members are well-informed about their duties, and effective processes are in place for managing conflicts of interest, financial oversight, and board member recruitment.  The organisation demonstrates a commitment to inclusivity, diversity, and continuous improvement, positioning it to meet its regulatory obligations and maintain stakeholder trust.',
    status: '2',
    created_at: '2025-01-10 04:34:36',
    updated_at: '2025-03-06 23:53:06',
  },
  {
    id: '28',
    framework_id: '8',
    domain_id: '12',
    name: 'Principle 5: Charitable Purpose',
    description:
      'The governing body must ensure that the organisation carries out the purpose for which it exists.',
    order: '5',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'The absence of a clearly identified charitable purpose in the constitution or public-facing materials undermines the organisation’s legitimacy and compliance with not-for-profit requirements.  The lack of alignment between activities and the stated purpose, compounded by the absence of strategic planning and regular evaluations, significantly increases the risk of resource misuse and mission drift, threatening the organisation’s sustainability and stakeholder trust.',
    report_red:
      'While the charitable purpose may be somewhat defined, there are gaps in its articulation across key platforms and publications.  Weaknesses in planning, alignment of activities, and periodic evaluations suggest a lack of intentionality in ensuring that organisational efforts consistently serve the stated purpose.  These deficiencies expose the organisation to reputational risks and inefficiencies in resource use.',
    report_amber:
      'The organisation demonstrates an understanding of its charitable purpose, but there are areas for improvement in how this is communicated publicly and integrated into strategic planning.  While some efforts are made to align activities with the purpose and evaluate their effectiveness, inconsistencies in reviews and planning could hinder optimal resource use and mission alignment over time.',
    report_green:
      'Your organisation demonstrates strong alignment with its charitable purpose.  The purpose is clearly identified in the constitution and effectively communicated through public materials.  Strategic plans ensure activities align with the mission, and regular reviews and evaluations verify that resources are used efficiently and effectively in pursuit of organisational goals.  This robust governance approach strengthens compliance, accountability, and stakeholder confidence.  You organisation is well placed to satisfy the Standards of Principle 5: Charitable Purpose.',
    status: '2',
    created_at: '2025-01-10 04:35:14',
    updated_at: '2025-03-06 23:53:25',
  },
  {
    id: '29',
    framework_id: '8',
    domain_id: '12',
    name: 'Principle 6: Financial Oversight',
    description:
      'The governing body must undertake proper financial oversight of the organisation.',
    order: '6',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'The absence of accurate and detailed financial records, coupled with a lack of proper auditing or review processes, leaves the organisation vulnerable to financial mismanagement and non-compliance with regulatory requirements.  The Board’s inability to effectively review financial health, approve financial statements, or maintain adequate internal controls poses a serious threat to the organisation’s stability and integrity.  Additionally, any undocumented or inappropriate financial loans further compound the risks of misconduct and reputational damage.',
    report_red:
      'While some financial records and reports may be maintained, inconsistencies in auditing, financial statement approval, and internal control reviews indicate substantial governance gaps.  The lack of regular audit quality assessments or a functional audit committee undermines financial accountability.  If financial loans exist, failure to document or structure them appropriately could exacerbate risks to organisational compliance and ethical standards.',
    report_amber:
      'While the organisation has basic financial records and processes in place, there are opportunities to strengthen governance through more rigorous auditing, improved internal controls, and detailed financial reporting.  Infrequent reviews of audit quality or gaps in the audit committee’s structure may affect financial oversight.  Any historical or minor lapses in loan documentation or approval require attention to avoid future risks.',
    report_green:
      'Your organisation is well placed for compliance to Principle 6: Financial Oversight.  Detailed and accurate financial records are maintained, with regular auditing or reviews by qualified professionals.  The Board consistently reviews and approves financial statements, audit reports, and internal control policies, ensuring financial accountability and compliance.  If an audit committee exists, its independence and inclusion of governing body members enhance oversight, promoting ethical financial management and stakeholder confidence.',
    status: '2',
    created_at: '2025-01-10 04:35:48',
    updated_at: '2025-03-06 23:53:42',
  },
  {
    id: '30',
    framework_id: '8',
    domain_id: '12',
    name: 'Principle 7: Risk Management',
    description:
      'The organisation must take steps to identify and monitor risks to which it is exposed.',
    order: '7',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'The organisation reports significant deficiencies in risk management and compliance frameworks.  The absence of a risk management plan or failure to identify and classify risks leaves the organisation exposed to severe vulnerabilities.  A lack of mitigation strategies, unreviewed or outdated plans, and inadequate insurance coverage further compound these risks.  The absence of whistleblower and grievance policies, coupled with no mechanism for ensuring compliance with legal requirements, undermines organisational integrity and accountability, jeopardising its long-term viability.',
    report_red:
      "The organisation reports critical weaknesses in its risk management practices.  While a risk management plan may exist, it is incomplete, poorly implemented, or rarely reviewed, limiting its effectiveness.  The Board's lack of oversight in acting on mitigation strategies or ensuring proper insurance programs increases exposure to financial, operational, and reputational risks.  Missing or ineffective whistleblower and grievance policies, combined with gaps in compliance monitoring, significantly undermine trust and governance standards.",
    report_amber:
      'The organisation reports moderate concerns about its risk management and compliance practices.  A risk management plan is in place but could benefit from more frequent reviews, clearer classification of risks, or better implementation of mitigation strategies.  While basic whistleblower and grievance policies may exist, their effectiveness or enforcement could be improved.  The Board has some compliance monitoring measures but may lack a comprehensive approach to ensuring full legal adherence.',
    report_green:
      'The organisation reports robust risk management and compliance practices.  A comprehensive risk management plan is in place, identifying and classifying risks by severity and likelihood, with well-documented and actionable mitigation strategies.  The plan is reviewed regularly, and insurance programs are appropriately aligned to address risks.  The presence of effective whistleblower and grievance policies promotes transparency and accountability.  The Board actively monitors compliance with legal requirements, fostering confidence in governance and operational integrity.  Your organisation is well placed to meet the requirements of Principle 7: Risk Management.',
    status: '2',
    created_at: '2025-01-10 04:36:08',
    updated_at: '2025-03-06 23:53:59',
  },
  {
    id: '31',
    framework_id: '8',
    domain_id: '12',
    name: 'Principle 8: Transparency and Accountability',
    description:
      'The organisation must be transparent and accountable to its stakeholders.',
    order: '8',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'The organisation demonstrates severe deficiencies in communication, transparency, and accountability practices.  It fails to hold annual meetings or provide members and stakeholders with meaningful opportunities to understand or question its activities and achievements.  There is no annual report or a lack of adequate detail in existing reports, and stakeholders cannot reliably access financial statements or outcomes of significant appeals.  Contact details are outdated, and there is no effective mechanism for feedback, complaints, or timely responses.  Furthermore, the Board appears to neglect its responsibilities in approving CEO or high-level remuneration and fails to meet best practices for transparency and governance in remuneration-setting, significantly undermining stakeholder trust and organisational integrity.',
    report_red:
      'The organisation demonstrates critical gaps in transparency and governance.  While annual meetings or reports may occur, they lack sufficient detail, or stakeholders are not given a meaningful opportunity to engage.  The organisation does not consistently respond to legitimate requests for financial or operational information, and contact details or communication mechanisms are unreliable.  Feedback and complaints may be accepted but not handled effectively or promptly.  Remuneration practices for the CEO or high-level staff lack adequate oversight or alignment with best practices, creating risks to accountability and stakeholder confidence.',
    report_amber:
      'The organisation demonstrates moderate concerns about its communication, reporting, and remuneration practices.  Annual meetings and reports are provided but could include more detail or provide better opportunities for stakeholder engagement.  Mechanisms for feedback, complaints, and communication exist but are not consistently publicised, accessible, or timely.  While the Board reviews remuneration practices, some aspects may not fully comply with established best practices, leaving room for improvement in transparency and governance.',
    report_green:
      'The organisation demonstrates strong communication, transparency, and governance practices.  Annual meetings are held to inform members about activities and performance, with ample opportunity for stakeholders to engage and ask questions.  Detailed and accessible annual reports are made available to all relevant stakeholders.  Financial statements and outcomes of significant appeals are provided promptly upon request.  Up-to-date contact details and communication channels ensure stakeholders remain informed, while mechanisms for feedback and complaints are publicised and addressed in a timely manner.  The Board ensures compliance with best practices in remuneration-setting for the CEO and other high-level staff, demonstrating accountability and integrity.  The organisation is well placed for compliance to Principle 8: Transparency and Accountability.',
    status: '2',
    created_at: '2025-01-10 04:36:32',
    updated_at: '2025-03-06 23:54:24',
  },
  {
    id: '32',
    framework_id: '8',
    domain_id: '12',
    name: 'Principle 9: Honest Communication',
    description:
      'All gift appeals and stewardship activities of the organisation must be carried out in a truthful and ethical manner.',
    order: '9',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'The organisation displays fundamental failures in ethical and transparent donor engagement.  Communications used to secure gifts risk being incomplete, misleading, or contain material omissions, creating false impressions about the organisation or unrealistic expectations about the impact of donations.  Donor instructions are not honoured, and there is no clear system for issuing tax-deductible receipts or providing appropriate data to donors.  Representatives of the organisation exploit fiduciary relationships or accept gifts from donors without ensuring their financial capacity to give.  Appeals are poorly managed, with no plans for handling over- or under-subscriptions or communicating intentions transparently, resulting in a severe breach of trust with stakeholders.',
    report_red:
      'The organisation reflects critical gaps in donor engagement and communication practices.  While some donor communications are accurate, there are occasional exaggerations, omissions, or unclear statements about the intended use of funds.  The organisation may struggle to honour donor instructions or issue tax-deductible receipts promptly.  Representatives may inadvertently pressure donors or fail to consider their financial capacity.  Plans for managing over- or under-subscription of appeals are inconsistent or poorly communicated, undermining donor confidence and accountability.',
    report_amber:
      'The organisation displays moderate concerns about its donor engagement practices.  Communications generally represent facts accurately, but there may be occasional lapses in providing complete or appropriately dated information.  Donor instructions are typically honoured, but processes for issuing tax-deductible receipts or providing data may be inefficient or inconsistent.  While the organisation does not knowingly exploit fiduciary relationships, it could improve its safeguards to prevent misunderstandings. P lans for handling over- or under-subscriptions exist but are not always effectively communicated to donors, leaving room for improvement in transparency.',
    report_green:
      'The organisation demonstrates excellence in donor engagement and communication practices.  All representations of fact in donor communications are accurate, complete, and appropriately dated, with no exaggerations or misleading content.  The organisation honours donor instructions and issues tax-deductible receipts promptly and accurately, with appropriate data supplied as needed.  Representatives act ethically, avoiding undue influence or pressure, and ensure donors consider their financial capacity before making significant commitments.  Clear plans are in place for managing over- and under-subscription of appeals, and these plans are communicated transparently to stakeholders from the outset or as soon as possible.  You are well placed for assessment against Principle 9: Honest Communication.',
    status: '2',
    created_at: '2025-01-10 04:36:55',
    updated_at: '2025-03-06 23:54:43',
  },
  {
    id: '33',
    framework_id: '1',
    domain_id: '2',
    name: 'Board Meetings',
    description:
      "This Board meetings section focuses on the Board’s approach to meeting organisation, attendance, participation, and follow-up processes.  These questions aim to evaluate the Board's commitment to, and its practices around, sharing relevant information and recording outcomes transparently.",
    order: '3',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'The assessment of the Board’s meeting practices reveals  that fundamental areas such as meeting frequency, attendance, agenda preparation, participation, and post-meeting follow-up appear significantly misaligned with good governance standards.  This suggests potential inefficiencies, inadequate documentation of decision-making, and a lack of structured follow-through, which could significantly undermine both operational and strategic outcomes.',
    report_red:
      'The Board’s meeting practices indicate  that while some processes for scheduling, agenda distribution, and follow-up are in place, there are notable gaps that impact meeting efficiency, member engagement, and accountability. Specific issues include irregular attendance rates, inconsistent agenda preparation, or inadequate circulation of minutes, which may hinder the Board’s ability to operate transparently and strategically.',
    report_amber:
      'The assessment of the Board’s meeting practices indicates that, while key practices—such as meeting scheduling, attendance, and agenda preparation—are largely in place, there may be occasional inconsistencies in participation or follow-up.  Addressing these gaps can help further align the Board’s practices with best governance standards.',
    report_green:
      'The assessment of the Board’s meeting practices indicates a strong alignment with governance best practices, reflecting a low level of risk.  The Board demonstrates consistent meeting schedules, thorough agenda preparation, high engagement, and effective follow-up on decisions and actions. Such practices underscore a robust governance structure, supporting informed decision-making, transparency, and accountability.',
    status: '2',
    created_at: '2025-02-10 22:25:28',
    updated_at: '2025-02-28 06:32:05',
  },
  {
    id: '34',
    framework_id: '1',
    domain_id: '2',
    name: 'CEO Oversight',
    description:
      'The relationship between the Board and their CEO is critical.  This section tests the nature and effectiveness of Board oversight and executive management.',
    order: '4',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'The assessment of the Board’s CEO oversight reveals significant gaps or weaknesses in essential areas, including the presence and review of a delegations instrument, constructive Board-CEO relations, regular CEO reporting, and adherence to performance review processes.  Such deficiencies suggest potential misalignments in authority, inadequate CEO oversight, and insufficient role delineation, which could severely impact the organisation’s governance and operational accountability.',
    report_red:
      'The assessment of the Board’s CEO oversight reveals that several areas require improvement to enhance governance standards.  Although a delegations instrument may be in place, the frequency of its review or clarity in CEO-Board interactions appears insufficient, which may undermine the Board’s ability to exercise effective oversight.  Additionally, processes for CEO reporting and performance review might lack consistency or depth, impacting governance transparency and accountability.',
    report_amber:
      'The assessment of the Board’s CEO oversight reveals that while the foundational elements—such as a delegations instrument, CEO reporting, and delineation of roles—appear in place, there may be occasional lapses in review regularity, role clarity, or consistency in performance evaluations. Addressing these areas through minor adjustments, such as regularly reviewing delegations and enhancing the structure of CEO performance feedback, could further align the Board’s practices with high governance standards.',
    report_green:
      'The assessment of the Board’s CEO oversight shows a strong alignment with governance best practices, reflecting a low level of risk. Key practices are effectively upheld, including a clear delegations instrument, constructive Board-CEO interactions, regular CEO reporting, and adherence to structured performance review processes. This alignment underscores a well-governed framework where roles, authority, and accountability are clearly defined, supporting efficient Board and executive collaboration.',
    status: '2',
    created_at: '2025-02-10 22:26:06',
    updated_at: '2025-02-28 06:32:20',
  },
  {
    id: '35',
    framework_id: '1',
    domain_id: '3',
    name: 'Accountability and Transparency',
    description:
      'This set of questions is evaluates the Board’s commitment to transparency, collaboration, and governance clarity, both internally and with stakeholders.  These questions aim to assess how effectively the Board communicates and collaborates, the processes for open communication outside of meetings, and the clarity in feedback mechanisms.',
    order: '2',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'The assessment indicates significant deficiencies in fundamental governance processes.  Key governance documents are either inaccessible or inconsistently available, and current conflict resolution mechanisms are inadequate, leading to potential misunderstandings and unresolved issues among Board members.  Decision-making and information-sharing processes are opaque, with limited or delayed access to essential information, undermining informed decision-making and reducing trust.',
    report_red:
      "The assessment suggests several serious areas of concern in the Board’s governance transparency and communication.  While some governance documents and information are accessible, inconsistencies in their availability raise concerns about equitable access and transparency. Conflict resolution processes are insufficiently defined, limiting the Board's ability to manage and address internal disagreements effectively.  Board meetings and sub-committee activities appear to lack clear channels for information sharing, and decision-making processes may not be sufficiently transparent, risking diminished trust within the Board and with stakeholders.",
    report_amber:
      'The assessment results indicate that, while key governance documents are mostly accessible, improving the consistency and accessibility of these documents would increase transparency.  Collaboration is generally effective, but enhancing open communication outside formal Board meetings could strengthen intra-Board relationships and decision-making processes.  Clarifying mechanisms for internal feedback and ensuring all sub-committee activities are communicated to the full Board would support a more inclusive governance approach.',
    report_green:
      "The Board demonstrates strong governance practices with a solid foundation in transparency, accessibility, and collaboration.  Key governance documents are accessible to all relevant parties, and communication practices ensure that all Board members are informed and engaged.  Decision-making processes are transparent, with documented decisions readily available for review, and the Board demonstrates responsiveness to internal feedback. There are effective mechanisms for open communication beyond formal meetings, and the Board strikes a balance between respecting the organisation's history and promoting innovation.",
    status: '2',
    created_at: '2025-02-20 04:37:53',
    updated_at: '2025-02-28 06:33:02',
  },
  {
    id: '36',
    framework_id: '1',
    domain_id: '3',
    name: 'Financial Oversight',
    description:
      'These questions assess the Board’s financial governance capabilities, focusing on budgeting, financial oversight, and compliance. They evaluate whether the Board engages in proactive financial planning, aligns budget priorities with the strategic plan, and maintains regular oversight of the organisation’s financial health. The questions also test basic financial literacy, as well as the Board’s ability to assess solvency and asset management practices.\n\nAdditionally, the questions examine the Board’s role in ensuring financial transparency, accountability, and compliance with reporting and audit obligations.',
    order: '3',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'The financial oversight assessment has identified a high level of risk in budgeting, financial oversight, and compliance.  The Board does not consistently review a draft budget well in advance of the financial year and may not formally approve the budget before it begins.  There is little evidence that financial priorities are aligned with the strategic plan, increasing the risk of misallocated resources.\n\nFinancial oversight appears weak, with infrequent or inconsistent reviews of the organisation’s financial status.  Board members demonstrate limited understanding of key financial documents, such as profit and loss statements and balance sheets, raising concerns about their ability to assess the organisation’s financial health.  The Board may not systematically declare solvency status, and confidence in the accuracy of the Asset Register is low.\n\nTransparency and accountability mechanisms beyond audits or independent reviews appear insufficient, and there is a lack of assurance that the organisation meets its financial reporting and audit compliance obligations.  These risks may lead to financial mismanagement, regulatory breaches, and loss of stakeholder confidence.',
    report_red:
      'The financial oversight assessment has identified a significant level of risk in budgeting, financial oversight, and compliance.  While the Board may review a draft budget, this process often occurs late or without sufficient scrutiny.  Budget approval may be inconsistent, and financial priorities do not always align clearly with the strategic plan.\n\nFinancial oversight is irregular, with reviews of the organisation’s financial status occurring infrequently or without meaningful analysis.  Some Board members have a limited understanding of financial statements, which may hinder informed decision-making. Solvency declarations are not routine, and there is uncertainty regarding the accuracy of the Asset Register.\n\nWhile some financial literacy is present, gaps remain that could impact the Board’s ability to interpret financial data effectively.  Transparency and accountability measures beyond audits are limited, and compliance with financial reporting and audit obligations appears inconsistent. These risks could affect financial sustainability and operational stability if not addressed.',
    report_amber:
      'The financial oversight assessment has identified a moderate level of risk in budgeting, financial oversight, and compliance.  The Board generally reviews a draft budget, but the timing may not allow for comprehensive analysis.  Budget approval processes are in place but could be more structured to ensure alignment with the strategic plan.\n\nFinancial oversight is occurring at regular intervals, but the depth of review varies.  Most Board members have a working knowledge of key financial statements, though there may be some gaps in financial literacy that limit deeper analysis. Solvency is considered, but not always formally declared, and asset management practices may need refinement to ensure accuracy and proper depreciation.\n\nThe Board demonstrates a commitment to transparency and accountability, but reliance on audits or independent reviews may be high.  Compliance with financial reporting and audit obligations appears largely in place, though improvements in documentation or internal financial controls may be beneficial.  While risks are present, they are not immediate threats to financial stability.',
    report_green:
      'The financial oversight assessment indicates strong financial governance practices.  The Board reviews draft budgets well in advance, ensuring thorough analysis and alignment with the strategic plan before formal approval.\n\nFinancial oversight is consistent, with regular and meaningful reviews of financial statements.  Board members demonstrate confidence in interpreting financial data and assessing solvency.  The Asset Register is well-maintained, with accurate depreciation of assets.\n\nTransparency and accountability measures extend beyond audits, with proactive financial reporting and clear internal controls.  The Board ensures full compliance with financial reporting and audit obligations.  Governance practices in this area support financial sustainability and stakeholder confidence.',
    status: '2',
    created_at: '2025-02-24 04:26:54',
    updated_at: '2025-02-28 06:33:15',
  },
  {
    id: '37',
    framework_id: '1',
    domain_id: '4',
    name: 'Culture',
    description:
      "This section explores aspects of organisational culture.  This includes evaluating whether the organisation's culture is intentionally shaped and clearly documented, and whether the Board effectively models cultural expectations through its communications and behaviours.  It also examines the mechanisms in place for Board-staff interactions, the Board’s efforts to foster appropriate inclusivity, and how employee and volunteer satisfaction is measured and assessed.  Additionally, it looks at whether there are mechanisms to acknowledge exceptional contributions.",
    order: '2',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      "The organisation's culture lacks intentionality, with no clear documentation of cultural expectations such as values, attitudes, behaviours, celebrations, or symbols, leading to inconsistent cultural experiences.  The Board does not effectively model organisational culture through its communications and behaviours, undermining leadership credibility and cultural alignment.  Mechanisms for Board interaction with staff are absent, resulting in limited visibility and disconnected leadership.  The Board demonstrates minimal intentionality in fostering inclusivity, including gender balance and stakeholder representation, contributing to a non-inclusive organisational environment. \n\nThere is no apparent mechanism to measure or assess employee and volunteer satisfaction, increasing the risk of disengagement and retention issues.  Additionally, the Board lacks systems to acknowledge exceptional contributions, failing to reinforce positive behaviours and cultural values.  These deficiencies severely undermine the organisation's cultural cohesion, engagement, and overall effectiveness.",
    report_red:
      "The assessment of the Board's organisational culture governance indicates a high level of risk.  While the organisation's culture is somewhat intentional, cultural expectations are not consistently documented or communicated, leading to potential misalignment and ambiguity.  The Board's efforts to model organisational culture are sporadic, reducing their influence on cultural norms.  Mechanisms for Board-staff interactions exist but are infrequent or lack meaningful engagement, limiting the Board's understanding of staff perspectives.  The Board's approach to inclusivity, including gender balance and stakeholder representation, is underdeveloped, posing risks to cultural equity and engagement. \n\nMechanisms to measure employee and volunteer satisfaction are informal or inconsistently applied, hindering the Board's ability to gauge engagement and address issues proactively.  Although some recognition of exceptional contributions occurs, it is ad hoc and lacks strategic intent, reducing its impact on morale and cultural reinforcement.  These issues significantly affect cultural alignment and organisational effectiveness.",
    report_amber:
      "The assessment of the Board's organisational culture governance shows a moderate level of risk.  The organisation's culture is intentional, with some documentation of cultural expectations; however, opportunities exist to clarify and consistently communicate these expectations.  The Board generally models organisational culture but could demonstrate greater consistency to strengthen cultural leadership.  Mechanisms for Board-staff interactions are in place but could be enhanced to improve engagement and mutual understanding. \n\nThe Board is committed to gender balance and stakeholder representation, but its approach could be more strategic and proactive.  Mechanisms to measure employee and volunteer satisfaction are implemented but could benefit from greater frequency or depth of analysis to better inform cultural initiatives.  The Board acknowledges exceptional contributions, but a more structured and consistent approach would enhance cultural reinforcement and morale.  Addressing these areas would strengthen the organisation's cultural alignment and engagement.",
    report_green:
      "The assessment of the Board's organisational culture governance indicates a low level of risk.  The organisation's culture is highly intentional, with clearly documented cultural expectations, including values, attitudes, behaviours, celebrations, and symbols, ensuring consistent cultural alignment.  The Board effectively models organisational culture through its communications and behaviours, setting a strong cultural standard.  There are well-established mechanisms for Board-staff interactions, promoting open communication and mutual understanding.  \n\nThe Board demonstrates a strong commitment to gender balance and stakeholder representation, contributing to a positive and equitable organisational environment.  Robust mechanisms are in place to measure and assess employee and volunteer satisfaction, enabling the Board to proactively address engagement and cultural issues.  The Board consistently acknowledges exceptional contributions, reinforcing cultural values and motivating high performance.  These practices reflect a high standard of cultural governance and organisational effectiveness.",
    status: '2',
    created_at: '2025-02-27 01:28:30',
    updated_at: '2025-02-28 06:34:04',
  },
  {
    id: '38',
    framework_id: '7',
    domain_id: '13',
    name: 'Governance Standard 1 – Purposes and not-for-profit nature',
    description:
      'Governance Standard 1 requires your charity to be a not-for-profit and work towards its charitable purpose. \n\nAll your charity’s funds and assets are charitable funds and must be applied solely to further your charity’s purposes.  The use of funds and assets must be permitted by the charity’s governing document (often called a constitution, rules or a trust deed).',
    order: '1',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Your assessment responses suggest significant concerns about the charity’s ability to demonstrate its commitment to its charitable purposes and not-for-profit nature. The governing document may not reflect the charity’s current purposes, public transparency may be lacking, and there may be indications that funds and assets are not solely directed toward charitable purposes. There is also a risk that activities are not aligned with the charity’s stated purposes. These issues could present serious compliance risks.',
    report_red:
      'Your assessment responses indicate notable gaps in the charity’s governance related to its purposes and not-for-profit nature. The governing document may be outdated or misaligned, information about the charity’s purposes may not be readily accessible, and there may be uncertainty about the exclusive use of funds for charitable purposes. There are concerns about whether activities are consistently aligned with the charity’s purposes, raising compliance risks that should be addressed.',
    report_amber:
      'Your assessment responses suggest some weaknesses in how the charity ensures its commitment to its purposes and not-for-profit nature. While key elements may be in place, there could be minor inconsistencies in governing documents, limited public accessibility to purpose-related information, or a need for stronger oversight in ensuring that funds and activities remain fully aligned with the charity’s purposes. These concerns indicate a moderate risk that may require attention.',
    report_green:
      'Your assessment responses indicate that the charity has appropriate measures in place to uphold its charitable purposes and not-for-profit nature. The governing document reflects current purposes, information is publicly accessible, funds and assets are used solely for charitable purposes, and activities are clearly aligned with the charity’s mission. There are no evident compliance concerns in this area.',
    status: '2',
    created_at: '2025-03-13 02:05:37',
    updated_at: '2025-03-25 08:36:21',
  },
  {
    id: '39',
    framework_id: '7',
    domain_id: '13',
    name: 'Governance Standard 2 – Accountability to members',
    description:
      'Governance Standard 2 requires your charity to be accountable to its members and allow adequate opportunity for members to raise concerns about how your charity is run. When your charity is transparent and open to members about its activities and finances, members will be in a position to understand the charity’s operations and raise questions about its governance.\n\nNOTE: Governance Standard 2 only applies to charities with members. A charity’s legal structure (for example, an incorporated association, company limited by guarantee or unincorporated association) and governing document will determine whether it has members. If your charity does not have any members, please answer "Not Applicable" to each of the 5 questions under governance standard 2.',
    order: '2',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Responses suggest significant concerns about the charity’s compliance with Governance Standard 2 – Accountability to Members. There may be little to no adherence to rules on member accountability, limited or no communication about activities and financial matters, and a lack of opportunities for members to engage in governance.  Your organisation may not provide clear processes for members to ask questions, vote, or raise concerns, and it may be unclear how complaints from members are handled. These issues pose a serious compliance risk.',
    report_red:
      'Responses indicate notable weaknesses in the charity’s approach to Governance Standard 2 – Accountability to Members. There may be gaps in how the your organisation informs members about activities and financial circumstances, or members may not have adequate opportunities to participate in decision-making.  Your organisation may not clearly outline how members can engage in governance or raise concerns. The process for handling member complaints may also be unclear. These issues create compliance risks that should be addressed.',
    report_amber:
      'Responses suggest some weaknesses in how the charity meets Governance Standard 2 – Accountability to Members.  While your organisation generally complies with its accountability obligations, there may be areas where communication with members could be improved. Some aspects of governance participation, such as voting rights, raising concerns, or complaint handling, may not be fully transparent or well understood. These concerns indicate a moderate risk that may require attention.',
    report_green:
      'Responses indicate that the charity meets the requirements of Governance Standard 2 – Accountability to Members.  Your organisation most likely complies with its governing document regarding member accountability, keeps members informed about activities and financial matters, and provides clear opportunities for participation in governance.  Members can ask questions, vote, and raise concerns, and there is a defined process for handling complaints.  No evident compliance concerns are present in this area.',
    status: '2',
    created_at: '2025-03-13 02:06:16',
    updated_at: '2025-03-25 08:33:55',
  },
  {
    id: '40',
    framework_id: '7',
    domain_id: '13',
    name: 'Governance Standard 3 – Compliance with Australian laws',
    description:
      'Like all Australians, your charity must comply with Australian law. Governance Standard 3 requires your charity to not act in a way that, under Commonwealth, state or territory law, could be dealt with as:\n \n - an indictable offence (a serious crime generally tried by a judge and jury), or \n - a breach of law that has a civil (not criminal) penalty of 60 penalty units (currently $12,600) or more. The value of penalty units are set out in the Crimes Act 1914 (Cth).',
    order: '3',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Responses suggest serious concerns about the charity’s compliance with Governance Standard 3 – Compliance with Australian Laws.  Your organisation may lack awareness of its legal obligations at the local, state\/territory, or federal level, including key areas such as fundraising, employment, work health and safety, and privacy laws.  There may also be no clear understanding of whether the charity is meeting its regulatory requirements.  These issues present a high risk of non-compliance.',
    report_red:
      'Responses indicate notable weaknesses in the charity’s approach to Governance Standard 3 – Compliance with Australian Laws.  Your organisation may have some awareness of its regulatory obligations but lacks consistent processes to stay up to date with legal changes.  There may be uncertainty about whether the charity is meeting all of its requirements, increasing the risk of unintentional non-compliance.  Addressing these gaps would reduce compliance risks.',
    report_amber:
      'Responses suggest some weaknesses in how the charity manages Governance Standard 3 – Compliance with Australian Laws.  While your organisation generally understands its legal obligations, there may be areas where knowledge is incomplete, or processes for staying up to date could be stronger.  There may be occasional uncertainty about compliance, but no immediate risks are evident. These issues indicate a moderate risk that may require attention.',
    report_green:
      'Responses indicate that the charity meets the requirements of Governance Standard 3 – Compliance with Australian Laws.  Your organisation is aware of its regulatory obligations at all levels of government and has processes in place to stay up to date with legal changes.  There is confidence that the charity complies with relevant laws, with no evident compliance concerns in this area.',
    status: '2',
    created_at: '2025-03-13 02:06:50',
    updated_at: '2025-03-25 08:32:57',
  },
  {
    id: '41',
    framework_id: '7',
    domain_id: '13',
    name: 'Governance Standard 4 – Suitability of Responsible People',
    description:
      'Governance Standard 4 requires your charity to take reasonable steps to be satisfied that its Responsible People have not been disqualified:\n\n - from managing a corporation under the Corporations Act 2001 (Cth), or\n - from being a Responsible Person in the previous 12 months by the ACNC Commissioner. \n\nIf your charity is not satisfied this is the case with a prospective Responsible Person, it must not appoint that person. If they are already serving as a Responsible Person, your charity must take reasonable steps to remove them as a Responsible Person for the charity.',
    order: '4',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Your assessment outcomes suggest serious concerns about your organisation’s compliance with Governance Standard 4 – Suitability of Responsible People.  Your organisation may not conduct required checks, such as searches of the ASIC Register of banned and disqualified persons, or may not keep records of these checks.  There may be no clear processes for assessing the suitability of Responsible People before or after appointment, and no steps in place to remove unsuitable individuals.  These gaps pose a high risk to governance and regulatory compliance.',
    report_red:
      'Your assessment outcomes indicate notable weaknesses in your organisation’s approach to Governance Standard 4 – Suitability of Responsible People.  While some checks may be conducted, they may not be systematic or consistently recorded.  Your organisation may lack a structured approach to ensuring Responsible People remain suitable after appointment or may have unclear processes for removing those found to be unsuitable.  Refer to your action plan for ways to reduce governance and compliance risks.',
    report_amber:
      'Your assessment outcomes suggest some weaknesses in how your organisation manages Governance Standard 4 – Suitability of Responsible People. Your organisation generally performs suitability checks, but record-keeping may be inconsistent, or ongoing monitoring processes may require strengthening. The approach to removing unsuitable Responsible People may be unclear or inconsistently applied. These issues indicate a moderate risk that may require attention.',
    report_green:
      'Your assessment outcomes indicate that your organisation meets the requirements of Governance Standard 4 – Suitability of Responsible People. Your organisation conducts and records required checks, ensures Responsible People are suitable before and after appointment, and has clear processes for removing individuals found to be unsuitable. No evident compliance concerns are present in this area.',
    status: '2',
    created_at: '2025-03-13 02:08:19',
    updated_at: '2025-03-25 08:31:56',
  },
  {
    id: '42',
    framework_id: '7',
    domain_id: '13',
    name: 'Governance Standard 5 – Duties of Responsible People',
    description:
      "ACNC Governance Standard 5 defines the duties of responsible persons in registered charities.  It requires charities to take reasonable steps to ensure that their responsible people (such as board members, committee members, or trustees) understand and comply with specific duties.  These duties include acting with reasonable care and diligence, acting honestly and in the best interests of the charity, not misusing their position or information gained as a responsible person, disclosing conflicts of interest, managing the charity's financial affairs responsibly, and not allowing the charity to operate while insolvent.\n\nCharities must take reasonable steps to remove any responsible person who does not meet these requirements.",
    order: '5',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Responses suggest serious concerns about compliance with Governance Standard 5 – Duties of Responsible People. Responsible People may lack awareness of their obligations, the charity’s purposes, or its activities and financial position.  There may be no clear processes for ensuring responsible decision-making, managing conflicts of interest, or overseeing related party transactions.  Governance arrangements, policies, and risk management may not be actively monitored, and there may be inadequate measures to ensure the responsible management of funds and assets.  These issues present a high risk to governance and regulatory compliance.',
    report_red:
      'Responses indicate notable weaknesses in the charity’s approach to Governance Standard 5 – Duties of Responsible People.  While some Responsible People may understand their obligations, there may be inconsistencies in their knowledge of the charity’s purposes, activities, or financial position.  Gaps may exist in skills, governance oversight, or decision-making processes.  The management of conflicts of interest, related party transactions, or financial oversight may be unclear or inconsistently applied.  Addressing these gaps would reduce governance and compliance risks.',
    report_amber:
      'Responses suggest some weaknesses in how the charity meets Governance Standard 5 – Duties of Responsible People.  While the charity has measures in place to support good governance, there may be areas where improvements could strengthen oversight.  Responsible People may need further training or clearer processes for governance monitoring, risk management, or financial oversight.  Conflicts of interest and related party transactions may be managed, but with room for greater transparency or consistency.  These issues indicate a moderate risk that may require attention.',
    report_green:
      'Responses indicate that the charity meets the requirements of Governance Standard 5 – Duties of Responsible People. Responsible People understand their obligations, the charity’s purposes, and its activities and financial position.  They have the necessary skills, actively monitor governance arrangements, and ensure responsible decision-making.  Processes for managing conflicts of interest, related party transactions, and financial oversight are in place, and risks are appropriately managed.  No evident compliance concerns are present in this area.',
    status: '2',
    created_at: '2025-03-13 02:11:24',
    updated_at: '2025-03-25 08:27:05',
  },
  {
    id: '43',
    framework_id: '7',
    domain_id: '13',
    name: 'Governance Standard 6 – Maintaining and enhancing public trust and confidence in the Australian Not-for-profit sector',
    description:
      'Governance Standard 6 requires your charity to take reasonable steps to become a participating non-government institution if the charity is, or is likely to be, identified as being involved in the abuse of a person:\n\n - in an application for redress made under section 19 of the National Redress Scheme for Institutional Child Sexual Abuse Act 2018 (Cth) (Redress Act) or\n - in information given in response to a request from the National Redress Scheme Operator (the Secretary of the Department of Social Services) under section 24 or 25 of the Redress Act.\n\nThis could include a registered charity named in the Royal Commission into Institutional Responses to Child Sexual Abuse, but which may not have been identified so far in a redress application.',
    order: '6',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Responses suggest serious concerns about compliance with Governance Standard 6 – Maintaining and Enhancing Public Trust and Confidence in the Australian Not-for-Profit Sector.  Your organisation may have been identified in relation to abuse allegations under the Redress Act or through a redress application and may not be taking appropriate steps to address this.  There may be no indication that you are a participating member of the Redress Scheme or working toward joining.  These issues present a significant risk to public trust and regulatory compliance.',
    report_red:
      'Responses indicate notable weaknesses in your organisation’s approach to Governance Standard 6 – Maintaining and Enhancing Public Trust and Confidence in the Australian Not-for-Profit Sector.  Your organisation may have been identified in relation to abuse allegations, but it is unclear whether appropriate action has been taken.  There may be uncertainty about your participation in the Redress Scheme or whether reasonable steps are being taken to join.  Addressing these gaps would reduce compliance and reputational risks.',
    report_amber:
      'Responses suggest some weaknesses in how your organisation meets Governance Standard 6 – Maintaining and Enhancing Public Trust and Confidence in the Australian Not-for-Profit Sector. While your charity has not been identified in relation to abuse allegations, its approach to the Redress Scheme may require clarification or further action. There may be delays or uncertainties in participation, but no immediate risks are evident. These issues indicate a moderate risk that may require attention.',
    report_green:
      'Responses indicate that your organisation meets the requirements of Governance Standard 6 – Maintaining and Enhancing Public Trust and Confidence in the Australian Not-for-Profit Sector.  The charity has not been identified in relation to abuse allegations under the Redress Act and is either a participating member of the Redress Scheme or actively taking reasonable steps to join.  No evident compliance concerns are present in this area.',
    status: '2',
    created_at: '2025-03-13 02:12:12',
    updated_at: '2025-03-25 08:25:59',
  },
  {
    id: '47',
    framework_id: '7',
    domain_id: '14',
    name: 'Record Keeping Obligations',
    description:
      'Your charity must keep two types of records: \n\n - financial records\n - operational records.  \n\nA record is an account in permanent form of facts, events or transactions that shows your charity has: \n\n - operated or acted in a particular way, or\n - spent or received money or other assets. \n\nThese records are usually in written or printed form. They must be kept easily accessible for seven years and must be in English or easily convertible into English.',
    order: '1',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Responses suggest significant non-compliance with Record Keeping Obligations.  Your organisation may not be keeping required records, such as those documenting income, expenses, assets, liabilities, or financial transactions for the mandated seven years.  There may be no clear system or process in place to ensure compliance with record-keeping obligations, or existing systems may be ineffective.  These gaps pose a high risk to compliance with ACNC requirements and could lead to serious regulatory issues.',
    report_red:
      'Responses indicate notable weaknesses in meeting Record Keeping Obligations.  Your organisation may be keeping some records but may not consistently track all necessary financial or operational data for the required seven years.  There may be no clear or reliable system in place to ensure full compliance with record-keeping requirements.  Addressing these gaps will help reduce the risk of non-compliance and regulatory scrutiny.',
    report_amber:
      'Responses suggest that your organisation generally meets its Record Keeping Obligations, but some areas may require improvement.  While records are likely kept for income, expenses, and assets, there may be inconsistencies in how these are tracked or maintained.  The system for ensuring compliance may be in place but could benefit from strengthening or more consistent application.  These issues represent a moderate risk that should be reviewed to ensure better compliance.',
    report_green:
      'Responses indicate that your organisation fully meets Record Keeping Obligations.  Records are well-maintained for income, expenses, assets, liabilities, and financial transactions for the required seven years, and a reliable system is in place to manage these obligations.  No compliance concerns are evident in this area.',
    status: '2',
    created_at: '2025-03-17 23:42:30',
    updated_at: '2025-03-25 08:24:44',
  },
  {
    id: '48',
    framework_id: '7',
    domain_id: '14',
    name: 'Reporting Obligations',
    description:
      "Charities have annual reporting obligations to maintain their registration.  These obligations primarily involve submitting an Annual Information Statement (AIS), which collects financial and operational information about the charity.  Medium and large charities must also provide an annual financial report, which is subject to review or audit depending on the charity's size.  Small charities are not required to submit financial reports unless they choose to do so voluntarily. \n\nThe reporting requirements vary by charity size, determined by annual revenue.",
    order: '2',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Responses indicate serious non-compliance with Reporting Obligations.  Your organisation may not have submitted the Annual Information Statement (AIS) on time for the last reporting period, or there may be a history of late submissions.  The charity may not be ensuring that its AIS or financial reports are free of errors, and there may be no clear process in place to verify the accuracy of these documents.  These gaps present a high risk to regulatory compliance and could lead to significant penalties or loss of ACNC registration.',
    report_red:
      'Responses suggest significant weaknesses in meeting Reporting Obligations.  Your organisation may have submitted the AIS late or may not have consistently met reporting deadlines.  There may be concerns about the accuracy of financial reports or AIS submissions, with errors possibly going unchecked.  While your organisation may need to submit a reviewed or audited financial report, there may be uncertainty or gaps in the processes to ensure that submissions are correct and timely.  Addressing these issues would reduce compliance and reputational risks.',
    report_amber:
      'Responses suggest that your organisation generally meets Reporting Obligations, but with some areas for improvement.  While the AIS was likely submitted on time, there may be occasional issues with accuracy or verification.  The process for submitting reviewed or audited financial reports may be in place but could be more robust in ensuring accuracy.  These issues represent a moderate risk that may require further attention to ensure full compliance and reduce potential errors.',
    report_green:
      'Responses indicate that your organisation fully meets Reporting Obligations.  The AIS was submitted on time for the last reporting period, and your organisation ensures that all financial reports are accurate and free of errors.  If required, reviewed or audited financial reports are submitted without issues.  No compliance concerns are present in this area.',
    status: '2',
    created_at: '2025-03-17 23:43:09',
    updated_at: '2025-03-25 08:23:46',
  },
  {
    id: '49',
    framework_id: '7',
    domain_id: '14',
    name: 'Duty to Notify obligations',
    description:
      'Registered charities are required to inform the ACNC of specific changes to their organisation and any significant non-compliance issues.  You must notify the ACNC of changes to\n\n - your charity’s legal name\n - your charity’s Address For Service \n - your charity’s Responsible People\n - your charity’s governing document \n\nMedium and large charities have 28 days to report these changes, while small charities have 60 days. Additionally, all charities must notify the ACNC within 28 days if they have significantly contravened the ACNC Act or failed to comply with governance or external conduct standards in a way that may impact their registration entitlement.',
    order: '3',
    black_max: '20.00',
    red_max: '40.00',
    amber_max: '60.00',
    report_black:
      'Responses indicate serious non-compliance with Duty to Notify Obligations.  Your organisation may not have up-to-date records for Responsible People or other required details with the ACNC, putting it at risk of regulatory action.  Responsible People may not be aware of their obligations to notify the ACNC, and significant breaches of obligations may not be reported, which could result in severe penalties or loss of ACNC registration.  These issues present a high risk to compliance and transparency.',
    report_red:
      'Responses suggest significant weaknesses in meeting Duty to Notify Obligations.  Your organisation may have outdated records for Responsible People or other details with the ACNC, though some updates may have been made.  Responsible People may have limited awareness of the charity’s notification obligations, and there may be instances where significant breaches were not reported.  Addressing these gaps will reduce compliance risks and ensure better transparency and accountability.',
    report_amber:
      'Responses suggest that your organisation generally meets Duty to Notify Obligations, but with some areas requiring improvement.  The records for Responsible People may be up-to-date, but there may be occasional delays or inconsistencies.  Responsible People may be aware of their obligations, but there could be room for improvement in ensuring full compliance.  Significant breaches are likely reported, but there may be areas where the process could be more robust.  These issues represent a moderate risk that may require attention to ensure better notification practices.',
    report_green:
      'Responses indicate that your organisation fully meets Duty to Notify Obligations.  Responsible People and other details are up-to-date with the ACNC, and there is a clear understanding of the charity’s obligations to notify the ACNC.  Significant breaches of obligations are reported in a timely and accurate manner.  No compliance concerns are present in this area.',
    status: '2',
    created_at: '2025-03-17 23:43:35',
    updated_at: '2025-03-25 08:22:31',
  },
]
