# Content required before launch

## Project evidence

- [ ] Aggre: screenshots, live/source URLs if public, specific role, timeline, architecture, decisions, results.
- [ ] YoGurt: screenshots, live/source URLs if public, specific role, timeline, stack, decisions, results.
- [ ] Job Board: screenshots, live/source URLs, specific role and timeline, actual code excerpts and architecture notes.
- [ ] Confirm permission to publish project screenshots and implementation details.

## Personal content

- [ ] Confirm contact email and GitHub/LinkedIn URLs. The sample address in the plan is not treated as verified.
- [ ] Approve or replace the draft introduction and working principles.
- [ ] Supply biography and verified work/education history.
- [ ] Supply candid photographs if still desired.
- [ ] Supply the first writing article, or approve the current empty state.

## Release

- [ ] Confirm production domain and Vercel project/account.
- [ ] Set the four public environment variables and rebuild.
- [ ] Test copy-email success/failure and real email/social links with the confirmed configuration.
- [ ] Pass performance budgets on the final, image-complete build.
- [ ] Check Safari, Firefox, and a real mobile device.
- [ ] Measure production INP; do not substitute Lighthouse TBT.
- [ ] Create the final screen recording and submission images after content is complete.

## Deliberate adaptations

- Desktop WebP frames stay at source resolution (960px), avoiding artificial upscaling.
- Scroll libraries and frames load on interaction rather than blocking the first view.
- The role statement changes in the hero introduction; the semantic name remains stable.
- CSS scroll-driven opacity and clipping handle the manifesto and finale without another scroll library.
- Filtered-out rows remain readable rather than using 25% text opacity, which would fail contrast.
- Index/Gallery uses native View Transitions to avoid loading the full Motion runtime for a two-state layout. Spring-driven image hover still uses Motion when project images exist.
- Next-project navigation is a normal link. Automatic end-of-page navigation is not enabled.
- Project hover images and shared media transitions become visible when real `image` values are supplied. Project title transitions are active now.
- Writing has typed MDX publishing and reading-progress support. Its public list stays empty until a real article is supplied.
- Vercel deployment, Speed Insights, field metrics, submission video, and real-device testing remain release tasks.
