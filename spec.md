# Specification

## Summary
**Goal:** Add a rotating one-per-line CSS animation to the two span elements inside the 6th section's targeted container.

**Planned changes:**
- Stack the two `<span>` elements in the 6th section container vertically (one per line) instead of side by side.
- Implement CSS keyframe animations so each span fades/slides in, stays visible for ~2 seconds, then fades/slides out.
- Stagger animation delays so span[2] begins its cycle after span[1] completes, creating a continuous infinite loop.
- Use opacity + translateY transitions (~0.4s ease) for smooth cycling between spans.

**User-visible outcome:** In the 6th section, the two spans display one at a time in a smooth, continuously rotating animation — span[1] appears first, fades out, then span[2] appears, and the cycle repeats indefinitely.
