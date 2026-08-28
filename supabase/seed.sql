-- Badgely idempotent seed data.
-- Milestone 3, Step 2: certification providers.

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
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  provider_type = excluded.provider_type,
  active = excluded.active,
  updated_at = now();
