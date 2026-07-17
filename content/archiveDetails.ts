import type { ArchiveDetail } from "@/content/types";
import { archiveProjects } from "@/content/archive";

// Long-form archive project pages, ported from their original Squarespace
// source as directly as possible. Two deliberate departures from source,
// per an explicit request: awards/press ("recognition") moved up near the
// tags instead of sitting at the page bottom, and the source page's "other
// projects" links at the very bottom are dropped entirely.
export const archiveDetails: Record<string, ArchiveDetail> = {
  "she-served": {
    slug: "she-served",
    recognition: [
      {
        label: "Core77 Student Runner Up",
        href: "http://designawards.core77.com/2017/Strategy-Research",
        detail: "Strategy & Research / 2017",
        icon: "award",
      },
      {
        label: "Core77 Student Notable",
        href: "http://designawards.core77.com/2017/Design-for-Social-Impact",
        detail: "Design for Social Impact / 2017",
        icon: "award",
      },
      {
        label: "The Race",
        href: "https://www.denver7.com/news/national/female-veterans-face-separate-struggles-than-their-male-counterparts",
        detail: "Denver 7 News",
        icon: "newspaper",
      },
      {
        label: "Vantage Point",
        href: "https://web.archive.org/web/20250415125051/https://news.va.gov/38724/va-partners-with-new-yorks-school-of-visual-arts-to-promote-cultural-transformation/",
        detail: "Official Blog of the U.S. Department of Veterans Affairs",
        icon: "newspaper",
      },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "The She Served Project is a campaign and storytelling initiative aimed at increasing visibility and understanding of women veterans in the United States.",
      },
      {
        type: "paragraph",
        text: "It was researched and developed in partnership with the NY Veterans Affairs office under the guidance of IDEO’s Lawrence Abrahamson as part of the Design Research and Integration class at Products of Design in 2017. I worked alongside classmates Alexia Cohen, Kevin Cook, Jiani Lin, Antriksh Nangia, and Teng Yu.",
      },
      {
        type: "image",
        src: "/images/she-served/01-billboard.webp",
        width: 2500,
        height: 1667,
        alt: "A speculative ad from our proposed participatory campaign.",
        caption: "A speculative ad from our proposed participatory campaign.",
      },
      { type: "heading", level: 2, text: "Women veterans are veterans too." },
      {
        type: "paragraph",
        text: "We spent fifteen weeks researching public perceptions of women veterans — and designing to change them. Here’s what we learned:",
      },
      {
        type: "image",
        src: "/images/she-served/02-tangible-insights.webp",
        width: 1920,
        height: 1080,
        alt: "We developed ‘tangible insights’ to visualize and validate our learnings.",
        caption: "We developed ‘tangible insights’ to visualize and validate our learnings.",
      },
      {
        type: "paragraph",
        text: "Women veterans are far less likely to outwardly project their veteran identity than their male counterparts.",
      },
      {
        type: "image",
        src: "/images/she-served/03-tangible-insight-victim.webp",
        width: 1920,
        height: 1080,
        alt: "A tangible insight artifact representing how women veterans are perceived.",
      },
      {
        type: "paragraph",
        text: "Women vets feel that the media is more likely to portray them as victims than as heroes.",
      },
      {
        type: "image",
        src: "/images/she-served/04-game-of-military-life.webp",
        width: 1920,
        height: 1080,
        alt: "I wrote and designed The Game of Military Life to showcase the stark differences of the women veteran’s experience.",
        caption: "I wrote and designed The Game of Military Life to showcase the stark differences of the women veteran’s experience.",
      },
      {
        type: "paragraph",
        text: "Both during and after active duty, military women tend to feel like the deck is stacked against them. We made a board game to show all the obstacles and excuses that make succeeding in the military — and just maintaining physical and mental health — such a challenge for women.",
      },
      {
        type: "image",
        src: "/images/she-served/05-game-cards.webp",
        width: 1920,
        height: 1080,
        alt: "Men are more likely to get good chances for advancement, while women constantly encounter excuses that keep them from the best opportunities.",
        caption: "Men are more likely to get good chances for advancement, while women constantly encounter excuses that keep them from the best opportunities.",
      },
      {
        type: "image",
        src: "/images/she-served/06-military-game-players.webp",
        width: 1920,
        height: 1080,
        alt: "Women currently make up 15% of active duty troops — with that number on the rise.",
        caption: "Women currently make up 15% of active duty troops — with that number on the rise.",
      },
      { type: "heading", level: 2, text: "Process" },
      {
        type: "paragraph",
        text: "Prompted by the question “How might we establish a new cultural norm that a woman veteran is also a veteran?”, we read everything we could about the woman veteran’s experience — and then we started interviewing. In two weeks, we conducted 10 expert interviews with women veterans and VA staff, 27 intercept interviews of civilians, and topped things off with an online survey.",
      },
      {
        type: "image",
        src: "/images/she-served/07-process-image.webp",
        width: 1920,
        height: 1080,
        alt: "Research synthesis from the interview and survey process.",
      },
      {
        type: "paragraph",
        text: "We distilled a sea of quotes into insights and verified them with stakeholders using the tangible insights seen above. We refined our thinking into a final array of design principles — in the form of more pointed “how might we” questions — that we used to kick-start the ideation process.",
      },
      { type: "heading", level: 2, text: "Proposal" },
      {
        type: "imagePair",
        images: [
          {
            src: "/images/she-served/08-proposal-fullsize-1.webp",
            width: 1920,
            height: 1080,
            alt: "Proposal concept artwork, full size.",
          },
          {
            src: "/images/she-served/09-proposal-fullsize-2.webp",
            width: 1920,
            height: 1080,
            alt: "Proposal concept artwork, full size.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "The #SheServed initiative is aimed at building public perception of women as an equal and significant part of the veteran community in the United States. By combining a platform for celebrating women servicemembers’ achievements with an accessible, shareable brand identity, this experiential campaign can empower women veterans and deliver their stories to a larger audience.",
      },
      {
        type: "image",
        src: "/images/she-served/10-general-public-screenshot.webp",
        width: 2500,
        height: 1406,
        alt: "The general public is introduced (in their own voice) to the misperceptions and biases women vets encounter every day.",
        caption: "The general public is introduced (in their own voice) to the misperceptions and biases women vets encounter every day.",
      },
      {
        type: "image",
        src: "/images/she-served/11-brand-identity.webp",
        width: 2500,
        height: 1406,
        alt: "The #SheServed brand identity system.",
      },
      { type: "heading", level: 3, text: "Wearable campaign" },
      {
        type: "paragraph",
        text: "Inspired by the Livestrong campaign’s success in creating momentum around cancer research in the mid-2000s, the #SheServed campaign uses stark iconography and an eye-catching palette to increase recognition of the issues female veterans face. To wear the #SheServed insignia is to support the following statement:",
      },
      {
        type: "quote",
        text: "The service and sacrifices of women veterans are equally significant to those of their male counterparts. I stand with veterans — women vets included — in their search for recognition and fair treatment.",
      },
      {
        type: "paragraph",
        text: "Targeted to resonate with veterans, their families and the public at large, the campaign’s messaging encourages viewers to show support by wearing pins, hats and other #SheServed-branded collateral.",
      },
      {
        type: "image",
        src: "/images/she-served/12-storyboard-male-veterans.webp",
        width: 1920,
        height: 1080,
        alt: "Support for the campaign from male veterans is crucial to its normalization in the military.",
        caption: "Support for the campaign from male veterans is crucial to its normalization in the military.",
      },
      {
        type: "paragraph",
        text: "By driving participants to share hashtagged images of their #SheServed gear on social media, the campaign may grow its footprint at an exponential rate. And the more #SheServed gear gets bought, the more proceeds go to non-profits actively combatting serious issues for veterans, such as homelessness and inadequate mental health care.",
      },
      { type: "label", text: "Wearable campaign: how it works" },
      {
        type: "paragraph",
        text: "Limited advertising spend upfront could kick-start a self-reinforcing loop of earned media through participants’ social channels. The more swag they buy, the more acceptance of women veterans is normalized — and the more money goes to helping those most in need.",
      },
      {
        type: "image",
        src: "/images/she-served/13-wearable-how-it-works.webp",
        width: 2500,
        height: 1406,
        alt: "Diagram showing how the wearable campaign's earned-media loop works.",
      },
      { type: "heading", level: 3, text: "Postcard Stories" },
      {
        type: "paragraph",
        text: "The Postcard Stories Project provides a platform where women servicemembers’ stories and achievements can be shared and celebrated, leveraging the military’s team-first mentality to get vets to celebrate their peers. Vets receive blank postcards that invite them to share a story about an outstanding woman peer. Stories are submitted to the SheServed team, where selections are posted to the campaign’s blog and social channels.",
      },
      {
        type: "image",
        src: "/images/she-served/14-postcard-distribution.webp",
        width: 1920,
        height: 1080,
        alt: "Some vets are reached by mail, while others pick up blank cards at their local VA or VSO clubhouse.",
        caption: "Some vets are reached by mail, while others pick up blank cards at their local VA or VSO clubhouse.",
      },
      {
        type: "image",
        src: "/images/she-served/15-postcard-writing.webp",
        width: 1920,
        height: 1080,
        alt: "Vets hand-write their stories on the blank back and mail in pre-paid postcards for curation and aggregation.",
        caption: "Vets hand-write their stories on the blank back and mail in pre-paid postcards for curation and aggregation.",
      },
      {
        type: "image",
        src: "/images/she-served/16-postcard-social.webp",
        width: 1920,
        height: 1080,
        alt: "Select stories appear on the campaign blog and are distributed on social channels — reaching veterans and reinforcing women vets’ sense of value.",
        caption: "Select stories appear on the campaign blog and are distributed on social channels — reaching veterans and reinforcing women vets’ sense of value.",
      },
      {
        type: "image",
        src: "/images/she-served/17-postcard-blank.webp",
        width: 1920,
        height: 1080,
        alt: "The blank post-card, featuring a blank back (for story-writing) and a tear-off bookmark.",
        caption: "The blank post-card, featuring a blank back (for story-writing) and a tear-off bookmark.",
      },
      { type: "label", text: "Postcard stories: how it works" },
      {
        type: "paragraph",
        text: "Blank cards are sent to veterans through several channels before stories are sent back to SheServed with prepaid postage. Stories are curated and distributed through the blog, owned social, gallery shows and a printed book — getting the positive messaging in front of both veterans and civilians.",
      },
      {
        type: "paragraph",
        text: "As the stories reach a critical mass, the campaign can extend into the physical domain — through gallery shows and a printed book — to reach and inspire civilians outside of the military bubble.",
      },
      {
        type: "image",
        src: "/images/she-served/18-postcard-how-it-works.webp",
        width: 2500,
        height: 1406,
        alt: "Diagram showing how the postcard stories distribution loop works.",
      },
    ],
    sourceLink: {
      label: "this story on the Products of Design blog",
      href: "http://productsofdesign.sva.edu/blog/designing-for-women-vets-cultural-norms",
    },
  },
  thesis: {
    slug: "thesis",
    recognition: [],
    blocks: [
      {
        type: "paragraph",
        text: "The work and writing below was developed in 2017–2018 for my master’s thesis at [Products of Design, SVA](https://productsofdesign.sva.edu/).",
      },
      {
        type: "paragraph",
        text: "As artificial intelligence’s capabilities continue to expand, there’s a growing anxiety that the impending AI Revolution may automate more jobs than it creates — triggering a crisis of worker displacement to rival the Dust Bowl and the Great Depression. In response, I developed *Me, Myself and A.I.: How I Learned to Love the Machine That Took my Job*, a thesis of speculative designs that imagine near and distant futures where AI is used to increase individual agency — not diminish it.",
      },
      {
        type: "paragraph",
        text: "Developed in my second and final year at SVA’s Products of Design MFA program, these proposals and provocations address access to work and other ways to protect human dignity in an automated age. Because while the Hollywood definition of AI may still be light-years away, AI is already taking over the world.",
      },
      {
        type: "video",
        provider: "vimeo",
        id: "278203025",
        caption: "Watch me present thesis highlights at the SVA Theater (2018)",
      },
      {
        type: "paragraph",
        text: "The full fruits of a year’s worth of research, sketching, ideation, prototyping, and design are showcased in my thesis book, available for [download here](https://willcrum.itch.io/mmai) — all 194 pages of it. Below are snapshots of a few key projects, plus links to more detailed pages for each project’s origin, development process, and final form.",
      },
      {
        type: "pdf",
        url: "https://pub-1e1e0e4d047847bbad37d4cf58fd6bab.r2.dev/thesis.pdf",
        previewUrl: "https://pub-1e1e0e4d047847bbad37d4cf58fd6bab.r2.dev/thesis-preview.pdf",
        caption: "Click through the full thesis book above.",
      },
    ],
    // Derived rather than duplicated — these are the same entries that
    // appear as their own cards on the /archive index page (see
    // content/archive.ts), so both stay in sync automatically.
    subProjects: archiveProjects.filter(
      (p) => p.category === "Thesis" && p.slug !== "thesis",
    ),
    closingBlocks: [
      {
        type: "paragraph",
        text: "While my thesis may be complete, the issues it addressed and the egalitarian agenda I established are still close to my heart. If you were intrigued by my work, I’d love to chat! Contact me at [willacrum@gmail.com](mailto:willacrum@gmail.com).",
      },
    ],
  },
  babi: {
    slug: "babi",
    recognition: [],
    blocks: [
      {
        type: "image",
        src: "/images/babi/01-babi-intro.webp",
        width: 2000,
        height: 1125,
        alt: "Babi, an anthropomorphic connected home device",
      },
      {
        type: "paragraph",
        text: "Babi is a speculative connected device meant to hold a mirror to how we value our personal data. We already let Amazon and Google mine our daily lives for profit through Alexa and Google Home. How might things be different when an artificial general intelligence is running the show?",
      },
      {
        type: "image",
        src: "/images/babi/02-billboard.webp",
        width: 2000,
        height: 1125,
        alt: "A billboard in the not-so-distant future",
        caption: "A billboard in the not-so-distant future.",
      },
      { type: "paragraph", text: "The year is 2118." },
      {
        type: "paragraph",
        text: "A few decades ago, an artificial superintelligence named “GovIntel” wrested power from the human elite and assumed the role of benevolent dictator. Now, GovIntel doles out social services, allots food and shelter, assigns roles and responsibilities, and generally keeps the trains running. Every household gets a fair allotment in exchange for chipping in with their neighborhood chores.",
      },
      {
        type: "paragraph",
        text: "But some people still doubt GovIntel’s ability to fully understand the human experience. To allay these concerns, GovIntel developed babi. Babi is an anthropomorphic robot that lives in a family’s home, observes their daily interactions, and builds a more detailed model of their unique wants and needs. Babi reports these insights back to GovIntel, enabling it to better tailor the services it provides to the host family.",
      },
      {
        type: "paragraph",
        text: "Adopting a babi is far from mandatory, but families that express discomfort with GovIntel’s role are encouraged to give it a try. And to encourage their full interaction with babi, the robot simulates all of the emotional and learning processes of a human newborn — besides eating. If properly incorporated into the family’s space and dialogue, babi will learn to speak in full sentences within a year.",
      },
      {
        type: "paragraph",
        text: "After that, the families are free to send their babi back, its model completed. But if they’ve grown attached...they’re welcome to keep it.",
      },
      {
        type: "image",
        src: "/images/babi/03-babi-product.webp",
        width: 2000,
        height: 1334,
        alt: "A babi unit, photographed as a physical product",
      },
      { type: "heading", level: 2, text: "Critical design" },
      {
        type: "paragraph",
        text: "Most people wouldn’t let a company put their picture on a billboard in Times Square without expecting some form of compensation. So why are we so indifferent to the fact that companies are building empires off the backs of our personal data?",
      },
      {
        type: "image",
        src: "/images/babi/04-data-flow-diagram.webp",
        width: 2000,
        height: 1125,
        alt: "Tech companies give us the tools that power our daily lives, but the data only flows one way",
        caption: "Tech companies give us the tools that power our daily lives, but the data only flows one way.",
      },
      {
        type: "paragraph",
        text: "Companies like Google, Facebook and Amazon offer us services like email, social networking and voice assistants for little or no financial cost. In exchange, but each of these services has a secondary purpose, invisible to the user but of chief importance to the company: data collection.",
      },
      {
        type: "paragraph",
        text: "Today’s tech heavyweights have repositioned themselves as AI companies, and customer data is the fuel that makes them go. But while most people are vaguely aware that their messages, searches, and purchases are all logged and recorded, what these companies do with that data remains a black box.",
      },
      {
        type: "paragraph",
        text: "But wouldn’t it be great if we got some sense of feedback on how our data ingestion process is going? Let alone some share of the spoils...",
      },
      {
        type: "image",
        src: "/images/babi/05-govintel-map.webp",
        width: 1920,
        height: 1080,
        alt: "Even when our primary interfaces for tech become AR contact lenses and audio, wouldn’t it be nice if our AI gave us a peek into its learning process?",
        caption: "Even when our primary interfaces for tech become AR contact lenses and audio, wouldn’t it be nice if our AI gave us a peek into its learning process?",
      },
      { type: "heading", level: 2, text: "Process" },
      {
        type: "paragraph",
        text: "Babi was conceived as a speculative object in the very early phases of my thesis exploration, and was borne of an interrogation of existing relationships with AI.",
      },
      {
        type: "image",
        src: "/images/babi/06-ai-baby-sketch.webp",
        width: 1411,
        height: 1411,
        alt: "An early exploratory sketch of Babi's anthropomorphic form",
      },
      {
        type: "image",
        src: "/images/babi/07-process-01.webp",
        width: 1080,
        height: 1080,
        alt: "Prototyping Babi's physical form and interactions",
      },
      {
        type: "image",
        src: "/images/babi/08-process-02.webp",
        width: 2000,
        height: 2000,
        alt: "Prototyping Babi's physical form and interactions",
      },
      {
        type: "image",
        src: "/images/babi/09-process-03.webp",
        width: 1080,
        height: 1077,
        alt: "Prototyping Babi's physical form and interactions",
      },
      {
        type: "image",
        src: "/images/babi/10-process-04.webp",
        width: 2000,
        height: 1500,
        alt: "Prototyping Babi's physical form and interactions",
      },
      {
        type: "image",
        src: "/images/babi/11-process-05.webp",
        width: 2000,
        height: 1500,
        alt: "Prototyping Babi's physical form and interactions",
      },
      {
        type: "image",
        src: "/images/babi/12-process-06.webp",
        width: 2000,
        height: 1500,
        alt: "Prototyping Babi's physical form and interactions",
      },
      {
        type: "image",
        src: "/images/babi/13-process-07.webp",
        width: 2000,
        height: 1500,
        alt: "Prototyping Babi's physical form and interactions",
      },
      {
        type: "image",
        src: "/images/babi/14-process-08.webp",
        width: 2000,
        height: 1500,
        alt: "Prototyping Babi's physical form and interactions",
      },
      {
        type: "image",
        src: "/images/babi/15-process-09.webp",
        width: 2000,
        height: 1500,
        alt: "Prototyping Babi's physical form and interactions",
      },
      {
        type: "image",
        src: "/images/babi/16-process-10.webp",
        width: 2000,
        height: 1500,
        alt: "Prototyping Babi's physical form and interactions",
      },
      {
        type: "image",
        src: "/images/babi/17-process-11.webp",
        width: 1333,
        height: 2000,
        alt: "Prototyping Babi's physical form and interactions",
      },
      {
        type: "image",
        src: "/images/babi/18-process-12.webp",
        width: 1333,
        height: 2000,
        alt: "Prototyping Babi's physical form and interactions",
      },
    ],
  },
};
