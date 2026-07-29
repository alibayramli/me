---
title: 'A clear, specific title'
description: 'One or two sentences explaining the problem and what the reader will learn.'
publishDate: 2026-07-27
draft: true
tags:
  - Platform Engineering
  - Backstage
# Optional local image. Store it in ./post-slug/ and add matching alt text.
# cover: ./post-slug/cover.png
# coverAlt: "A concise description of the cover image"
---

Start with the situation: what problem existed, who experienced it, and why it mattered.

## Context and constraints

Explain the constraints without exposing proprietary systems, source code, customer information, security details, or internal URLs.

## Options considered

Describe the meaningful alternatives and the tradeoffs that influenced the decision.

## The approach

Use sanitized examples and fenced code blocks:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: example-service
spec:
  type: service
  lifecycle: experimental
  owner: example-team
```

Add diagrams or screenshots as local images:

```markdown
![A descriptive alt text](./post-slug/diagram.png)
```

## What changed

Share outcomes you are permitted to disclose. Distinguish measured results from estimates.

## Lessons and reusable ideas

Close with concrete takeaways another team could apply.
