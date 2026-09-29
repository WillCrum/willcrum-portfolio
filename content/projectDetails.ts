import type { ArchiveDetail } from "@/content/types";

// Long-form content for each of the 5 Work-page projects' own
// /projects/[slug] page — ported from the Figma "Page designs" file, mirrors
// content/archiveDetails.ts. A project with no entry here still gets its
// page (intro shell only, per app/projects/[slug]/page.tsx).
export const projectDetails: Record<string, ArchiveDetail> = {
  metamorph: {
    slug: "metamorph",
    recognition: [],
    blocks: [
      {
        type: "infoGrid",
        items: [
          {
            label: "Team",
            fields: [
              { label: "Design", value: "Will Crum" },
              {
                label: "Development",
                value: "Jack Murphy, Brian Cort, Felipe Balduino Cassar",
              },
            ],
          },
          {
            label: "Background",
            paragraph:
              "We wanted to enable our users to turn labeled training data into accurate deep learning models for text classification.",
          },
          {
            label: "Objective",
            paragraph:
              "Provide a **descriptive, delightful** training UI that lets users **observe model quality in real time** — and spot issues early.",
          },
          {
            label: "Process",
            paragraph:
              "0-1 stand-up of a new feature MVP. I sketched, wireframed, mocked up, and refined in build with the dev team. Briefed in Oct 2021, MVP built by EOY, with further refinement in 2022.",
          },
          {
            label: "Challenges",
            list: [
              "**Hands-off UX** – Deep learning training is an automated, wait-and-see process.",
              "**Many metrics** – Performance stats are available, but technical. Which would actually inform users?",
              "**Delight them** – Could this slow, dry process be visually appealing?",
            ],
          },
          {
            label: "Background",
            list: [
              "**Capability, delivered** – Users could now convert their labeled data into more accurate deep learning models",
              "**Actionable info** – Our real-time metrics let users immediately spot if model was failing, and why.",
              "**Data viz delight** – Users enjoyed watching the charts warp and wiggle",
            ],
          },
        ],
      },
      {
        type: "image",
        src: "/images/projects/metamorph/workspace-1.jpg",
        width: 4032,
        height: 2268,
        alt: "Notebook sketches of the Metamorph training interface",
      },
      {
        type: "image",
        src: "/images/projects/metamorph/workspace-2.jpg",
        width: 2268,
        height: 4032,
        alt: "Desk with notebook sketches, pens, and a coffee mug",
      },
    ],
  },
  match: {
    slug: "match",
    recognition: [],
    blocks: [
      {
        type: "infoGrid",
        items: [
          {
            label: "Team",
            fields: [
              { label: "Design", value: "Will Crum" },
              {
                label: "Development",
                value: "Brian Cort, Felipe Balduino Cassar",
              },
            ],
          },
          {
            label: "Background",
            paragraph:
              "We were testing out a new architecture for training-free, “zero-shot” text classification — and it needed a UI.",
          },
          {
            label: "Objective",
            paragraph:
              "Develop the MVP for Explore, a **document discovery tool** built on a vector embedding-based architecture of **semantic similarity**.",
          },
          {
            label: "Process",
            paragraph:
              "This was a 0-1 flagship feature MVP stand-up. Briefed in May 2022, MVP in dev by EOY, with continued refinements into 2024, juggled with other priorities.",
          },
          {
            label: "Challenges",
            list: [
              "**Open-ended brief** – We were testing tech, not solving a user problem",
              "**Hidden complexity** – Everyone knows text search, but no one knows vector distance. Should they?",
              "**DistractGPT** – When ChatGPT came out, leadership's vision for *Explore*'s UX was shaken.",
            ],
          },
          {
            label: "Background",
            list: [
              "**Advanced but accessible** – It let users compose complex queries, but kept results digestible.",
              "**A testable MVP** – The search UX was crucial to understanding and debugging LLM vector embedding.",
              "**User adoption** – Existing customers used it to quickly query last week's customer calls for new issues",
            ],
          },
        ],
      },
    ],
  },
  "extraction-demo": {
    slug: "extraction-demo",
    recognition: [],
    blocks: [
      {
        type: "infoGrid",
        items: [
          {
            label: "Team",
            fields: [
              {
                label: "Design",
                value: "Will Crum (UX lead), Ennio Dybelli (UI lead), Sonia Wu (UX)",
              },
              { label: "Development", value: "Felipe Balduino Cassar" },
            ],
          },
          {
            label: "Background",
            paragraph:
              "We had the tech to compete in the big-money ‘intelligent document processing’ ([IDP](https://en.wikipedia.org/wiki/Document_processing#Automatic_document_processing)) market — if we moved quickly.",
          },
          {
            label: "Objective",
            paragraph:
              "Create a demo site that resellers can use to showcase Pienso's new invoice extraction capabilities.",
          },
          {
            label: "Process",
            list: [
              "**5-day sprint** – We went from brief to dev handoff in 1 week, and a working demo site in <6 weeks.",
              "**Phased MVPs** – We structured our hand-off designs so they could be built in stages.",
              "**Stakeholder reviews** – We consulted our reseller users before and after the sprint.",
            ],
          },
          {
            label: "Challenges",
            list: [
              "**Time crunch** – Leadership asked what we could design in one week.",
              "**Low bar for MVP** – Expectations were low, but design knew that a better UX would make for a stickier demo.",
              "**Partner buy-in** – Before we could impress customers, we needed to impress the resellers.",
            ],
          },
          {
            label: "Background",
            list: [
              "**Rapid delivery** – We went from brief to dev handoff in 1 week, with a working demo site 5 weeks later.",
              "**Nice-to-haves included** – The phased MVP approach got design's desired features into final scope.",
              "**Sales, enabled** – Pienso could now take center-stage in our resellers' IDP-related sales presentations.",
            ],
          },
        ],
      },
      {
        type: "image",
        src: "/images/projects/extraction-demo/extra-1.png",
        width: 3456,
        height: 1800,
        alt: "Invoice extraction demo tool interface",
      },
      {
        type: "image",
        src: "/images/projects/extraction-demo/extra-2.png",
        width: 3164,
        height: 1950,
        alt: "Invoice extraction demo tool showing a batch of scanned documents",
      },
    ],
  },
  reskin: {
    slug: "reskin",
    recognition: [],
    blocks: [
      {
        type: "infoGrid",
        items: [
          {
            label: "Team",
            fields: [
              {
                label: "Design",
                value: "Will Crum (UX lead), Ennio Dybelli (UI lead), Sonia Wu (UX)",
              },
              { label: "Development", value: "Brian Cort" },
            ],
          },
          {
            label: "Background",
            paragraph:
              "We'd never had a formal design system. UX baggage had piled up, the app looked dated, and UI dev work was slow.",
          },
          {
            label: "Objective",
            paragraph:
              "Develop a **custom design system** to standardize our UX, refresh our UI, and future-proof our brief-to-build process",
          },
          {
            label: "Process",
            list: [
              "**UX audit** – We reviewed every page and listed every pain point.",
              "**Scope triage** – We sorted our recommendations into four tiers of complexity. Tier 4 was off limits.",
              "**Divide & design** – Ennio built the component library, and Sonia and I tested it while redesigning pages. Constant reviews kept us in sync.",
            ],
          },
          {
            label: "Challenges",
            list: [
              "**Platform sprawl** – We had 20+ pages and 7 principal features to redesign, with more on the way.",
              "**UX baggage** – Interaction and hierarchy inconsistencies had cropped up over the years.",
              "**Open-ended scope** – Anything short of back-end refactoring was on the table. Where do we draw the line?",
            ],
          },
          {
            label: "Background",
            list: [
              "**Total app redesign** – Comprehensive mock-ups of the entire platform, UX-refined and UI-refreshed",
              "**From brief to dev, standardized** – We'd built our own UI library, with guidelines. And a component library in *Storybook* for faster dev work.",
            ],
          },
        ],
      },
      {
        type: "image",
        src: "/images/projects/reskin/extra-1.png",
        width: 2880,
        height: 1976,
        alt: "Pienso reskin: redesigned document explore page",
      },
      {
        type: "image",
        src: "/images/projects/reskin/extra-2.png",
        width: 2880,
        height: 1776,
        alt: "Pienso reskin: redesigned model overview page",
      },
      {
        type: "image",
        src: "/images/projects/reskin/extra-3.png",
        width: 2880,
        height: 1776,
        alt: "Pienso reskin: redesigned model deployment page",
      },
    ],
  },
  "mta-dashboard": {
    slug: "mta-dashboard",
    recognition: [],
    blocks: [
      {
        type: "imagePair",
        images: [
          {
            src: "/images/projects/mta-dashboard/grid-1.png",
            width: 2048,
            height: 1262,
            alt: "My Transit Dashboard code editor view",
          },
          {
            src: "/images/projects/mta-dashboard/grid-2.png",
            width: 3164,
            height: 1950,
            alt: "My Transit Dashboard station schedule list",
          },
        ],
      },
      {
        type: "imagePair",
        images: [
          {
            src: "/images/projects/mta-dashboard/grid-3.png",
            width: 3164,
            height: 1944,
            alt: "My Transit Dashboard map view of nearby stations",
          },
          {
            src: "/images/projects/mta-dashboard/grid-4.png",
            width: 3104,
            height: 2024,
            alt: "My Transit Dashboard account settings panel",
          },
        ],
      },
    ],
  },
};
