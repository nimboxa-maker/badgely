-- Keep one SELECT policy per role/action while preserving admin visibility.

grant execute on function private.is_admin() to anon;

alter policy "Public can view active providers"
on public.providers
using (active = true or (select private.is_admin()));

alter policy "Public can view certifications from active providers"
on public.certifications
using (
  (select private.is_admin())
  or exists (
    select 1
    from public.providers
    where providers.id = certifications.provider_id
      and providers.active = true
  )
);

alter policy "Public can view exams for visible certifications"
on public.exams
using (
  (select private.is_admin())
  or exists (
    select 1
    from public.certifications
    join public.providers on providers.id = certifications.provider_id
    where certifications.id = exams.certification_id
      and providers.active = true
  )
);

alter policy "Public can view domains for visible certifications"
on public.exam_domains
using (
  (select private.is_admin())
  or exists (
    select 1
    from public.certifications
    join public.providers on providers.id = certifications.provider_id
    where certifications.id = exam_domains.certification_id
      and providers.active = true
  )
);

alter policy "Public can view renewal policies for visible certifications"
on public.renewal_policies
using (
  (select private.is_admin())
  or exists (
    select 1
    from public.certifications
    join public.providers on providers.id = certifications.provider_id
    where certifications.id = renewal_policies.certification_id
      and providers.active = true
  )
);

alter policy "Public can view resources for visible certifications"
on public.resources
using (
  (select private.is_admin())
  or exists (
    select 1
    from public.certifications
    join public.providers on providers.id = certifications.provider_id
    where certifications.id = resources.certification_id
      and providers.active = true
  )
);

alter policy "Public can view certification relations"
on public.certification_relations
using (
  (select private.is_admin())
  or (
    exists (
      select 1
      from public.certifications source_certification
      join public.providers source_provider on source_provider.id = source_certification.provider_id
      where source_certification.id = certification_relations.source_certification_id
        and source_provider.active = true
    )
    and exists (
      select 1
      from public.certifications target_certification
      join public.providers target_provider on target_provider.id = target_certification.provider_id
      where target_certification.id = certification_relations.target_certification_id
        and target_provider.active = true
    )
  )
);

-- Replace broad FOR ALL admin policies so SELECT is handled only once.
drop policy "Admins can manage providers" on public.providers;
drop policy "Admins can manage certifications" on public.certifications;
drop policy "Admins can manage exams" on public.exams;
drop policy "Admins can manage exam domains" on public.exam_domains;
drop policy "Admins can manage renewal policies" on public.renewal_policies;
drop policy "Admins can manage resources" on public.resources;
drop policy "Admins can manage career paths" on public.career_paths;
drop policy "Admins can manage career path steps" on public.career_path_steps;
drop policy "Admins can manage certification relations" on public.certification_relations;

create policy "Admins can insert providers" on public.providers for insert to authenticated with check ((select private.is_admin()));
create policy "Admins can update providers" on public.providers for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins can delete providers" on public.providers for delete to authenticated using ((select private.is_admin()));

create policy "Admins can insert certifications" on public.certifications for insert to authenticated with check ((select private.is_admin()));
create policy "Admins can update certifications" on public.certifications for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins can delete certifications" on public.certifications for delete to authenticated using ((select private.is_admin()));

create policy "Admins can insert exams" on public.exams for insert to authenticated with check ((select private.is_admin()));
create policy "Admins can update exams" on public.exams for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins can delete exams" on public.exams for delete to authenticated using ((select private.is_admin()));

create policy "Admins can insert exam domains" on public.exam_domains for insert to authenticated with check ((select private.is_admin()));
create policy "Admins can update exam domains" on public.exam_domains for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins can delete exam domains" on public.exam_domains for delete to authenticated using ((select private.is_admin()));

create policy "Admins can insert renewal policies" on public.renewal_policies for insert to authenticated with check ((select private.is_admin()));
create policy "Admins can update renewal policies" on public.renewal_policies for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins can delete renewal policies" on public.renewal_policies for delete to authenticated using ((select private.is_admin()));

create policy "Admins can insert resources" on public.resources for insert to authenticated with check ((select private.is_admin()));
create policy "Admins can update resources" on public.resources for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins can delete resources" on public.resources for delete to authenticated using ((select private.is_admin()));

create policy "Admins can insert career paths" on public.career_paths for insert to authenticated with check ((select private.is_admin()));
create policy "Admins can update career paths" on public.career_paths for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins can delete career paths" on public.career_paths for delete to authenticated using ((select private.is_admin()));

create policy "Admins can insert career path steps" on public.career_path_steps for insert to authenticated with check ((select private.is_admin()));
create policy "Admins can update career path steps" on public.career_path_steps for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins can delete career path steps" on public.career_path_steps for delete to authenticated using ((select private.is_admin()));

create policy "Admins can insert certification relations" on public.certification_relations for insert to authenticated with check ((select private.is_admin()));
create policy "Admins can update certification relations" on public.certification_relations for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins can delete certification relations" on public.certification_relations for delete to authenticated using ((select private.is_admin()));
