# Kinetic Sharing Network: Incentive Design Walkthrough

**The Objective:** to design a system where sharing patient history is a selfish, rational decision even between competitors.

## Core Mechanism: Symmetric Access

Access credits = contribution credits. Contribute nothing, access nothing. Contribute more, access more complete history. This reframes sharing from a moral decision into a market transaction.

Three access tiers enforce the gradient: Basic - treatment area and phase only, Standard - adds ROM and pain scores, Full - adds patient-reported outcomes and unlocks benchmark dashboard.

## Addressing the Two Fears

**Fear 1 — "I don't want to help patients switch."** The shared data is structured to transmit medical facts while isolating competitive intelligence. Clinic name, therapist identity, and treatment methods are never transmitted. Sharing history does not mean giving competitors a referral trail.

**Fear 2 — "What if another physio judges my treatment?"** Everything shared is objective: treatment area, phase, ROM measurements, pain scores, patient-reported outcomes. The receiving therapist does not see what the previous therapist decided or why. Without subjective clinical judgment in the data, there is nothing to evaluate.

## Anti-Gaming Mechanisms

**Quality proportionality:** Incomplete records (e.g., missing ROM data) earn fewer credits and produce lower-detail history for the receiving clinic.

**Time decay:** Credits older than six months decay to 50%. Clinics cannot contribute once and free-ride indefinitely. Sharing must be continuous to maintain access.

## Benchmark Dashboard as Independent Incentive

Clinics that reach the Full tier unlock a benchmark dashboard comparing their performance against network-wide averages across treatment duration, patient retention, rebooking rates, discharge completion, and outcome scores. Therapists see an additional column with their individual metrics against both clinic and network averages.

This data is impossible to obtain otherwise. It creates a second, standalone reason to participate that operates independently of patient history access: even a clinic that rarely receives transfer patients still benefits from understanding how its treatment outcomes compare to peers. The benchmark becomes more statistically reliable as participation grows, which means early joiners have a direct interest in recruiting others.

## Role Design

Admin decides whether the clinic joins the network (policy-level). Therapists decide which records to share (clinical-level). Therapists see clinic credits, access tier, and benchmark data in read-only mode. This separation ensures sharing decisions are made by the person with clinical judgment, while network participation remains an organizational decision without approval bottleneck.
