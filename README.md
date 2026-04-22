# Kinetic Sharing Network

An incentive design for patient history sharing across 1,800 competing physiotherapy clinics on a B2B SaaS platform.

**The problem:** 71% of clinics want to receive patient history. 19% want to share theirs. The gap is not a policy problem — it's an incentive problem. Clinics fear helping patients switch to competitors and having their clinical decisions judged by peers.

## The Design

**Symmetric access** — clinics purchase access to others' data by contributing their own. No contribution, no access. Access depth scales with contribution level across three tiers (Basic, Standard, Full), so the relationship is proportional, not binary.

**Information boundaries** — shared data includes objective measurements only (treatment area, phase, ROM, pain scores, patient-reported outcomes). Clinic identity, therapist identity, treatment methods, and clinical notes are technically isolated and never transmitted. This neutralizes both fears at the architecture level.

**Anti-gaming** — credit time decay (50% after 6 months) prevents one-time contributions. Quality-proportional scoring prevents incomplete records from gaming the system.

**Benchmark dashboard** — a second, independent incentive. Clinics at Full tier access anonymized performance benchmarks (treatment duration, retention, outcomes) against network averages. This data cannot exist outside the network, giving even clinics with few transfer patients a reason to participate.

## Repo Structure

```
kinetic-prototype.jsx    React prototype demonstrating system behavior
walkthrough.md           Incentive design logic and mechanism explanation
scaling.md               19% → 80% adoption path with sensitivity analysis
README.md
```

## Prototype

Single-file React component.

### How to Run

Because this is a zero-dependency standalone component (all icons and styles are inline), the fastest way to view it is in a browser playground:

1. Open a React playground like [CodeSandbox](https://codesandbox.io/s/react-new) or [StackBlitz](https://stackblitz.com/fork/react).
2. Replace the contents of `App.js` (or `App.jsx`) with the code from `kinetic-prototype.jsx`.
3. The interactive prototype will render immediately.

### What to Explore

Two roles to explore:

**Clinic Admin** — join/leave network, view credit status and access tiers, simulate 6-month credit decay, view record sharing status across therapists, benchmark dashboard

**Physiotherapist** — view today's appointments with tiered access indicators, open patient history (fields unlock progressively with credits), share records from My Patients with data preview, view personal + clinic + network benchmark comparison

Key interactions to demo: join network → share records as therapist → watch credits accumulate and access tiers unlock → view patient history at different tier levels → simulate time decay and observe tier downgrade → leave network and see explicit cost breakdown.

## Docs

[**Walkthrough**](walkthrough.md) — core mechanism, how each fear is addressed, anti-gaming, benchmark as independent incentive, role design

[**Scaling**](scaling.md) — resistance segmentation (free-riders, competition fear, judgment fear), three-phase adoption path, CMS Meaningful Use as reference case, sensitivity analysis on final participation rate
