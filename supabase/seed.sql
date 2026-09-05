-- ThirdBadge idempotent seed data.
-- Milestone 3: providers and certification catalog.

insert into public.providers (
  name,
  slug,
  description,
  provider_type,
  active
)
values
  (
    'CompTIA',
    'comptia',
    'Industry certification provider known for broad, vendor-neutral credentials across IT support, networking, cybersecurity, and related technology skills.',
    'vendor-neutral',
    true
  ),
  (
    'Cisco',
    'cisco',
    'Technology company and certification provider with credentials focused on networking, infrastructure, security, and Cisco technologies.',
    'vendor-specific',
    true
  ),
  (
    'Microsoft',
    'microsoft',
    'Technology company and certification provider with credentials covering Azure, security, data, productivity, and Microsoft platforms.',
    'vendor-specific',
    true
  ),
  (
    'Amazon Web Services',
    'amazon-web-services',
    'Cloud platform provider offering certifications that validate knowledge and skills for designing, operating, and securing workloads on AWS.',
    'vendor-specific',
    true
  ),
  (
    'Google Cloud',
    'google-cloud',
    'Cloud platform provider offering certifications for foundational, engineering, architecture, security, data, and operational skills on Google Cloud.',
    'vendor-specific',
    true
  ),
  (
    'ISC2',
    'isc2',
    'Professional cybersecurity organization offering credentials that cover foundational security knowledge through advanced security practice and leadership.',
    'professional-body',
    true
  ),
  (
    'ISACA',
    'isaca',
    'Professional association offering certifications focused on information systems audit, governance, risk, cybersecurity management, and related disciplines.',
    'professional-body',
    true
  ),
  (
    'Red Hat',
    'red-hat',
    'Enterprise open-source technology provider offering certifications centered on Linux administration, automation, containers, and Red Hat platforms.',
    'vendor-specific',
    true
  ),
  (
    'OffSec',
    'offsec',
    'Cybersecurity training and certification provider focused on practical offensive-security skills and hands-on assessment.',
    'vendor-neutral',
    true
  ),
  (
    'Linux Foundation',
    'linux-foundation',
    'Nonprofit technology organization supporting open-source ecosystems and offering certifications for Linux, cloud-native, and related technical skills.',
    'professional-body',
    true
  ),
  (
    'HashiCorp',
    'hashicorp',
    'Infrastructure software provider offering certifications for tools used in infrastructure automation, provisioning, security, and operations.',
    'vendor-specific',
    true
  ),
  (
    'Splunk',
    'splunk',
    'Data and security platform provider offering certifications for searching, analyzing, monitoring, and working with Splunk products.',
    'vendor-specific',
    true
  ),
  (
    'INE Security',
    'ine-security',
    'Cybersecurity training provider associated with the eLearnSecurity certification family and practical entry-level security skills.',
    'vendor-neutral',
    true
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  provider_type = excluded.provider_type,
  active = excluded.active,
  updated_at = now();

with certification_seed (
  provider_slug,
  name,
  slug,
  category,
  level,
  vendor_type,
  short_summary,
  featured
) as (
  values
    ('comptia', 'CompTIA A+', 'comptia-a-plus', 'IT Support', 'Foundational', 'Vendor-neutral', 'A broad starting credential for learners building practical knowledge of computer hardware, operating systems, troubleshooting, basic networking, security, and technical support.', true),
    ('comptia', 'CompTIA Network+', 'comptia-network-plus', 'Networking', 'Foundational', 'Vendor-neutral', 'A vendor-neutral networking credential covering core concepts used to understand, configure, support, and troubleshoot modern wired and wireless networks.', false),
    ('comptia', 'CompTIA Security+', 'comptia-security-plus', 'Cybersecurity', 'Foundational', 'Vendor-neutral', 'A foundational cybersecurity credential for understanding common threats, security controls, identity, risk, secure architecture, and operational security practices.', true),
    ('comptia', 'CompTIA CySA+', 'comptia-cysa-plus', 'Cybersecurity', 'Intermediate', 'Vendor-neutral', 'A defensive-security credential focused on analyzing security data, identifying suspicious activity, supporting incident response, and improving security operations.', false),
    ('comptia', 'CompTIA PenTest+', 'comptia-pentest-plus', 'Cybersecurity', 'Intermediate', 'Vendor-neutral', 'A penetration-testing credential centered on planning authorized assessments, identifying weaknesses, using practical testing techniques, and communicating findings responsibly.', false),
    ('isc2', 'ISC2 Certified in Cybersecurity', 'isc2-certified-in-cybersecurity', 'Cybersecurity', 'Foundational', 'Vendor-neutral', 'An entry-level cybersecurity credential introducing security principles, access controls, network security, incident response, and basic security operations.', false),
    ('isc2', 'ISC2 SSCP', 'isc2-sscp', 'Cybersecurity', 'Intermediate', 'Vendor-neutral', 'A practitioner-oriented cybersecurity credential covering day-to-day security administration, access controls, monitoring, incident response, cryptography, and systems security.', false),
    ('isc2', 'ISC2 CISSP', 'isc2-cissp', 'Cybersecurity', 'Advanced', 'Vendor-neutral', 'An advanced cybersecurity credential spanning security leadership, architecture, engineering, operations, risk management, software security, identity, and communications security.', true),
    ('cisco', 'Cisco CCST Networking', 'cisco-ccst-networking', 'Networking', 'Foundational', 'Vendor-specific', 'An introductory Cisco networking credential for learners developing basic knowledge of network concepts, addressing, devices, connectivity, and troubleshooting.', false),
    ('cisco', 'Cisco CCST Cybersecurity', 'cisco-ccst-cybersecurity', 'Cybersecurity', 'Foundational', 'Vendor-specific', 'An introductory Cisco cybersecurity credential covering basic security concepts, threats, vulnerabilities, network defense, endpoint security, and security operations.', false),
    ('cisco', 'Cisco CCNA', 'cisco-ccna', 'Networking', 'Associate', 'Vendor-specific', 'A networking credential focused on core routing and switching concepts, IP connectivity, network access, security fundamentals, automation, and troubleshooting.', true),
    ('microsoft', 'Microsoft Azure Fundamentals', 'microsoft-azure-fundamentals', 'Cloud', 'Foundational', 'Vendor-specific', 'A foundational Microsoft credential introducing cloud concepts and the major Azure services, management tools, security ideas, governance concepts, and pricing basics.', true),
    ('microsoft', 'Microsoft Security, Compliance, and Identity Fundamentals', 'microsoft-security-compliance-identity-fundamentals', 'Cybersecurity', 'Foundational', 'Vendor-specific', 'A foundational Microsoft credential introducing security, compliance, and identity concepts across Microsoft cloud services and related management capabilities.', false),
    ('microsoft', 'Microsoft Security Operations Analyst', 'microsoft-security-operations-analyst', 'Cybersecurity', 'Associate', 'Vendor-specific', 'A Microsoft security credential focused on investigating threats, responding to incidents, using security monitoring tools, and supporting security operations workflows.', false),
    ('amazon-web-services', 'AWS Certified Cloud Practitioner', 'aws-certified-cloud-practitioner', 'Cloud', 'Foundational', 'Vendor-specific', 'A foundational AWS credential for understanding cloud concepts, core AWS services, shared responsibility, security basics, architecture ideas, and cloud economics.', true),
    ('amazon-web-services', 'AWS Certified Solutions Architect – Associate', 'aws-certified-solutions-architect-associate', 'Cloud', 'Associate', 'Vendor-specific', 'An AWS architecture credential focused on designing secure, resilient, efficient, and cost-aware cloud solutions using common AWS services and design patterns.', false),
    ('amazon-web-services', 'AWS Certified Security – Specialty', 'aws-certified-security-specialty', 'Cybersecurity', 'Advanced', 'Vendor-specific', 'An advanced AWS security credential focused on protecting cloud workloads through identity, logging, monitoring, infrastructure security, data protection, and incident response.', false),
    ('google-cloud', 'Google Cloud Digital Leader', 'google-cloud-digital-leader', 'Cloud', 'Foundational', 'Vendor-specific', 'A foundational Google Cloud credential for understanding cloud technology, digital transformation concepts, major Google Cloud capabilities, security, operations, and business value.', false),
    ('google-cloud', 'Google Cloud Associate Cloud Engineer', 'google-cloud-associate-cloud-engineer', 'Cloud', 'Associate', 'Vendor-specific', 'A Google Cloud engineering credential focused on deploying, configuring, operating, and securing cloud resources while supporting reliable day-to-day environments.', false),
    ('google-cloud', 'Google Cloud Professional Cloud Security Engineer', 'google-cloud-professional-cloud-security-engineer', 'Cybersecurity', 'Advanced', 'Vendor-specific', 'An advanced Google Cloud security credential covering identity, data protection, network security, operations, compliance, and secure cloud infrastructure design.', false),
    ('red-hat', 'Red Hat Certified System Administrator', 'red-hat-certified-system-administrator', 'DevOps', 'Associate', 'Vendor-specific', 'A hands-on Linux administration credential focused on essential Red Hat Enterprise Linux tasks such as users, storage, services, permissions, networking, and system operation.', false),
    ('linux-foundation', 'Linux Foundation Certified System Administrator', 'linux-foundation-certified-system-administrator', 'DevOps', 'Associate', 'Vendor-neutral', 'A practical Linux administration credential covering routine command-line work, filesystems, users, networking, services, storage, and system troubleshooting.', false),
    ('hashicorp', 'HashiCorp Certified: Terraform Associate', 'hashicorp-certified-terraform-associate', 'DevOps', 'Associate', 'Vendor-specific', 'An infrastructure-as-code credential for understanding Terraform workflows, configuration, state, providers, modules, resource lifecycle, and common automation practices.', false),
    ('linux-foundation', 'Certified Kubernetes Administrator', 'certified-kubernetes-administrator', 'DevOps', 'Intermediate', 'Vendor-neutral', 'A hands-on Kubernetes administration credential focused on cluster architecture, workloads, services, storage, troubleshooting, maintenance, and core operational tasks.', false),
    ('splunk', 'Splunk Core Certified User', 'splunk-core-certified-user', 'Cybersecurity', 'Foundational', 'Vendor-specific', 'An introductory Splunk credential for learners building skills in searching, filtering, using fields, creating basic reports, and working with data in the Splunk platform.', false),
    ('ine-security', 'eLearnSecurity Junior Penetration Tester', 'elearnsecurity-junior-penetration-tester', 'Cybersecurity', 'Foundational', 'Vendor-neutral', 'An entry-level practical penetration-testing credential intended to develop structured assessment skills, basic exploitation knowledge, web testing awareness, and reporting habits.', false),
    ('offsec', 'Offensive Security Certified Professional', 'offensive-security-certified-professional', 'Cybersecurity', 'Advanced', 'Vendor-neutral', 'A hands-on offensive-security credential emphasizing practical penetration-testing methodology, enumeration, exploitation, privilege escalation, and clear technical reporting.', false),
    ('isaca', 'ISACA CISA', 'isaca-cisa', 'GRC and Audit', 'Advanced', 'Vendor-neutral', 'An information-systems audit credential focused on audit processes, governance, systems acquisition and operations, information protection, and evaluating organizational controls.', false),
    ('isaca', 'ISACA CISM', 'isaca-cism', 'GRC and Audit', 'Advanced', 'Vendor-neutral', 'A security-management credential centered on governance, risk management, security program development, security operations, and incident-management leadership.', false),
    ('isaca', 'ISACA CRISC', 'isaca-crisc', 'GRC and Audit', 'Advanced', 'Vendor-neutral', 'A risk-focused credential covering IT risk identification, assessment, response, monitoring, and the design and evaluation of information-system controls.', false)
)
insert into public.certifications (
  provider_id,
  name,
  slug,
  category,
  level,
  vendor_type,
  short_summary,
  status,
  featured
)
select
  providers.id,
  certification_seed.name,
  certification_seed.slug,
  certification_seed.category,
  certification_seed.level,
  certification_seed.vendor_type,
  certification_seed.short_summary,
  'Active',
  certification_seed.featured
from certification_seed
join public.providers
  on providers.slug = certification_seed.provider_slug
on conflict (slug) do update
set
  provider_id = excluded.provider_id,
  name = excluded.name,
  category = excluded.category,
  level = excluded.level,
  vendor_type = excluded.vendor_type,
  short_summary = excluded.short_summary,
  status = excluded.status,
  featured = excluded.featured,
  updated_at = now();