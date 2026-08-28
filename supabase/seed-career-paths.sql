-- Badgely idempotent career-path seed data.
-- Milestone 3 seed data; public career-path pages are implemented in Milestone 5.

with career_path_seed (
  name,
  slug,
  short_summary,
  full_summary,
  audience_level,
  target_role,
  featured
) as (
  values
    (
      'IT Support Technician',
      'it-support-technician',
      'A practical starting path for building support, networking, security, and basic cloud foundations.',
      'Build broad troubleshooting and support fundamentals first, then add networking, security, or cloud knowledge based on the environment you want to support.',
      'Beginner',
      'IT Support Technician',
      true
    ),
    (
      'Network Engineer',
      'network-engineer',
      'A networking path that progresses from introductory concepts to associate-level administration and future professional-level study.',
      'Start with networking fundamentals, move into hands-on routing and switching skills, and then use advanced enterprise networking study as a future progression point.',
      'Beginner to intermediate',
      'Network Engineer',
      true
    ),
    (
      'SOC Analyst',
      'soc-analyst',
      'A defensive-security path combining IT foundations, core security knowledge, analysis skills, and SIEM familiarity.',
      'Develop enough systems and networking context to understand alerts, then build security-analysis, investigation, and monitoring skills through defensive certifications and practical lab work.',
      'Beginner to intermediate',
      'SOC Analyst',
      true
    ),
    (
      'Cloud Engineer',
      'cloud-engineer',
      'A cloud path that moves from platform fundamentals into administration, infrastructure as code, and container operations.',
      'Begin with a major cloud platform, build associate-level administration or architecture skills, then add infrastructure automation and Kubernetes administration.',
      'Beginner to intermediate',
      'Cloud Engineer',
      true
    ),
    (
      'Cloud Security Engineer',
      'cloud-security-engineer',
      'A security-focused cloud path that combines foundational security, cloud engineering, and advanced cloud-security study.',
      'Build a security foundation, gain practical cloud-platform experience, and then deepen identity, logging, least-privilege, monitoring, and cloud-security skills.',
      'Intermediate',
      'Cloud Security Engineer',
      false
    ),
    (
      'Penetration Tester',
      'penetration-tester',
      'An offensive-security path that builds networking and security foundations before hands-on penetration-testing practice.',
      'Establish networking and security fundamentals, progress through entry or intermediate penetration-testing credentials, and continue toward advanced practical assessment skills.',
      'Beginner to advanced',
      'Penetration Tester',
      true
    ),
    (
      'DevOps Engineer',
      'devops-engineer',
      'A systems and automation path combining Linux administration, cloud knowledge, infrastructure as code, and Kubernetes.',
      'Build Linux administration skill first, add a cloud platform, automate infrastructure with Terraform, and then develop container-orchestration administration skills.',
      'Intermediate',
      'DevOps Engineer',
      false
    ),
    (
      'GRC and IT Audit',
      'grc-and-it-audit',
      'A governance, risk, and audit path that starts with security fundamentals and progresses into professional risk and audit credentials.',
      'Use foundational security knowledge as context for controls and risk, then specialize through audit, risk, and security-management credentials.',
      'Intermediate to advanced',
      'GRC and IT Audit Professional',
      false
    )
)
insert into public.career_paths (
  name,
  slug,
  short_summary,
  full_summary,
  audience_level,
  target_role,
  featured
)
select
  name,
  slug,
  short_summary,
  full_summary,
  audience_level,
  target_role,
  featured
from career_path_seed
on conflict (slug) do update
set
  name = excluded.name,
  short_summary = excluded.short_summary,
  full_summary = excluded.full_summary,
  audience_level = excluded.audience_level,
  target_role = excluded.target_role,
  featured = excluded.featured,
  updated_at = now();

-- Rebuild only the seeded paths' steps so this script can be safely re-run.
delete from public.career_path_steps
where career_path_id in (
  select id
  from public.career_paths
  where slug in (
    'it-support-technician',
    'network-engineer',
    'soc-analyst',
    'cloud-engineer',
    'cloud-security-engineer',
    'penetration-tester',
    'devops-engineer',
    'grc-and-it-audit'
  )
);

with step_seed (
  path_slug,
  step_number,
  certification_slug,
  title,
  explanation,
  is_optional,
  practical_activity,
  display_order
) as (
  values
    ('it-support-technician', 1, 'comptia-a-plus', 'CompTIA A+', 'Build broad hardware, operating-system, troubleshooting, and support foundations.', false, null, 1),
    ('it-support-technician', 2, 'comptia-network-plus', 'CompTIA Network+', 'Add networking knowledge that supports endpoint and infrastructure troubleshooting.', false, null, 2),
    ('it-support-technician', 3, null, 'CompTIA Security+ or Microsoft Azure Fundamentals', 'Choose a security foundation or introductory cloud credential based on the support environment you want to work in.', true, null, 3),
    ('it-support-technician', 4, null, 'Practical activity', 'Apply the path in a small portfolio project.', false, 'Build a basic home support lab and document troubleshooting cases.', 4),

    ('network-engineer', 1, 'cisco-ccst-networking', 'Cisco CCST Networking', 'Start with introductory networking concepts and device fundamentals.', false, null, 1),
    ('network-engineer', 2, 'cisco-ccna', 'Cisco CCNA', 'Develop deeper routing, switching, IP connectivity, security, and troubleshooting skills.', false, null, 2),
    ('network-engineer', 3, null, 'CCNP Enterprise', 'Use this as a future professional-level progression point; verify the current Cisco certification path with the official provider.', true, null, 3),
    ('network-engineer', 4, null, 'Practical activity', 'Apply the path in a networking portfolio project.', false, 'Build a network simulation lab and document routing and troubleshooting exercises.', 4),

    ('soc-analyst', 1, null, 'CompTIA A+ or CompTIA Network+', 'Choose the foundation that best matches your current systems and networking experience.', true, null, 1),
    ('soc-analyst', 2, 'comptia-security-plus', 'CompTIA Security+', 'Build core security terminology, controls, threats, and risk knowledge.', false, null, 2),
    ('soc-analyst', 3, null, 'CompTIA CySA+ or Microsoft Security Operations Analyst', 'Develop defensive analysis and security-operations skills using a vendor-neutral or Microsoft-focused route.', false, null, 3),
    ('soc-analyst', 4, 'splunk-core-certified-user', 'Splunk Core Certified User', 'Add introductory SIEM search and data-analysis familiarity.', false, null, 4),
    ('soc-analyst', 5, null, 'Practical activity', 'Apply the path in a defensive-security portfolio project.', false, 'Build a SIEM/home lab and document sanitized sample alert investigations.', 5),

    ('cloud-engineer', 1, null, 'Microsoft Azure Fundamentals or AWS Certified Cloud Practitioner', 'Choose a major cloud platform and learn foundational cloud concepts and services.', false, null, 1),
    ('cloud-engineer', 2, null, 'Azure Administrator or AWS Certified Solutions Architect – Associate', 'Progress into hands-on administration or associate-level cloud architecture. Verify the current Azure administrator credential with Microsoft.', false, null, 2),
    ('cloud-engineer', 3, 'hashicorp-certified-terraform-associate', 'HashiCorp Certified: Terraform Associate', 'Add infrastructure-as-code concepts and Terraform workflow knowledge.', false, null, 3),
    ('cloud-engineer', 4, 'certified-kubernetes-administrator', 'Certified Kubernetes Administrator', 'Develop Kubernetes administration and operational skills.', false, null, 4),
    ('cloud-engineer', 5, null, 'Practical activity', 'Apply the path in a cloud portfolio project.', false, 'Deploy a basic cloud service using infrastructure as code.', 5),

    ('cloud-security-engineer', 1, 'comptia-security-plus', 'CompTIA Security+', 'Establish a broad security foundation before specializing in cloud security.', false, null, 1),
    ('cloud-security-engineer', 2, null, 'Cloud associate certification', 'Build hands-on associate-level knowledge in the cloud platform you plan to secure.', false, null, 2),
    ('cloud-security-engineer', 3, null, 'AWS Certified Security – Specialty or Microsoft security certification', 'Choose an advanced cloud-security route aligned to your platform. Verify the current Microsoft certification option with the official provider.', false, null, 3),
    ('cloud-security-engineer', 4, null, 'ISC2 CCSP', 'Use CCSP as a possible future progression point and verify current requirements with ISC2.', true, null, 4),
    ('cloud-security-engineer', 5, null, 'Practical activity', 'Apply the path in a cloud-security portfolio project.', false, 'Configure identity, logging, least privilege, and monitoring in a cloud lab.', 5),

    ('penetration-tester', 1, 'comptia-network-plus', 'CompTIA Network+', 'Build the networking foundation needed to understand services, protocols, and attack surfaces.', false, null, 1),
    ('penetration-tester', 2, 'comptia-security-plus', 'CompTIA Security+', 'Add broad security concepts, controls, threats, and risk knowledge.', false, null, 2),
    ('penetration-tester', 3, null, 'eJPT or CompTIA PenTest+', 'Choose an entry-level practical route or an intermediate vendor-neutral penetration-testing route.', false, null, 3),
    ('penetration-tester', 4, 'offensive-security-certified-professional', 'Offensive Security Certified Professional', 'Progress toward advanced practical penetration-testing methodology and technical reporting.', false, null, 4),
    ('penetration-tester', 5, null, 'Practical activity', 'Apply the path only in legal, authorized lab environments.', false, 'Complete legal hands-on labs and publish sanitized methodology notes.', 5),

    ('devops-engineer', 1, null, 'LFCS or RHCSA', 'Choose a Linux administration foundation using a vendor-neutral or Red Hat route.', false, null, 1),
    ('devops-engineer', 2, null, 'Cloud associate certification', 'Add practical cloud-platform administration or architecture skills.', false, null, 2),
    ('devops-engineer', 3, 'hashicorp-certified-terraform-associate', 'HashiCorp Certified: Terraform Associate', 'Develop infrastructure-as-code knowledge and repeatable provisioning practices.', false, null, 3),
    ('devops-engineer', 4, 'certified-kubernetes-administrator', 'Certified Kubernetes Administrator', 'Add Kubernetes administration and troubleshooting skills.', false, null, 4),
    ('devops-engineer', 5, null, 'Practical activity', 'Apply the path in an automation-focused portfolio project.', false, 'Build an infrastructure-as-code and CI/CD portfolio project.', 5),

    ('grc-and-it-audit', 1, 'comptia-security-plus', 'CompTIA Security+', 'Build a security foundation that provides context for controls, threats, and risk.', false, null, 1),
    ('grc-and-it-audit', 2, null, 'ISACA CISA or ISACA CRISC', 'Choose an audit-focused or risk-focused specialization based on the work you want to perform.', false, null, 2),
    ('grc-and-it-audit', 3, 'isaca-cism', 'ISACA CISM', 'Progress toward security governance and management knowledge.', false, null, 3),
    ('grc-and-it-audit', 4, null, 'Practical activity', 'Apply the path in a governance, risk, and audit portfolio exercise.', false, 'Create a fictional-company risk register, policy review, and audit checklist.', 4)
)
insert into public.career_path_steps (
  career_path_id,
  certification_id,
  step_number,
  title,
  explanation,
  is_optional,
  practical_activity,
  display_order
)
select
  career_paths.id,
  certifications.id,
  step_seed.step_number,
  step_seed.title,
  step_seed.explanation,
  step_seed.is_optional,
  step_seed.practical_activity,
  step_seed.display_order
from step_seed
join public.career_paths on career_paths.slug = step_seed.path_slug
left join public.certifications on certifications.slug = step_seed.certification_slug;
