/**
 * Mock data for space biology studies
 */

const studies = [
  {
    id: "NASA-SB-2022-01",
    title: "Effects of Microgravity on Human Stem Cell Differentiation",
    abstract: "This study examines the impact of microgravity on human mesenchymal stem cell differentiation during a 30-day mission aboard the International Space Station. Results indicate significant alterations in osteogenic pathways with potential implications for long-duration spaceflight.",
    authors: ["Sarah Johnson", "Michael Chen", "Aisha Patel"],
    institution: "NASA Ames Research Center",
    publishedDate: "2022-03-15",
    category: "Cell Biology",
    keywords: ["stem cells", "microgravity", "osteogenesis", "cell differentiation"],
    citations: 28,
    doi: "10.1038/s41526-022-00183-x"
  },
  {
    id: "NASA-SB-2021-15",
    title: "Advanced Plant Growth Systems for Space-Based Food Production",
    abstract: "This research presents a novel hydroponic system designed for efficient plant cultivation in microgravity environments. The system was tested during a 90-day deployment on the ISS, demonstrating increased crop yield with reduced resource consumption.",
    authors: ["David Rodriguez", "Emma Wilson", "Hiroshi Tanaka"],
    institution: "Kennedy Space Center",
    publishedDate: "2021-11-08",
    category: "Space Agriculture",
    keywords: ["hydroponics", "food production", "plant growth", "resource efficiency"],
    citations: 42,
    doi: "10.1016/j.actaastro.2021.09.022"
  },
  {
    id: "NASA-SB-2023-07",
    title: "Radiation Shielding Effectiveness for Deep Space Human Missions",
    abstract: "This study evaluates various materials and configurations for radiation shielding to protect astronauts during deep space missions. Novel composite materials showed promising results in reducing exposure to galactic cosmic rays while minimizing mass requirements.",
    authors: ["James Wilson", "Sophia Kim", "Alexander Petrov"],
    institution: "Johnson Space Center",
    publishedDate: "2023-02-22",
    category: "Radiation Biology",
    keywords: ["radiation protection", "shielding materials", "galactic cosmic rays", "astronaut health"],
    citations: 15,
    doi: "10.1089/space.2022.0047"
  },
  {
    id: "NASA-SB-2022-19",
    title: "Microbiome Dynamics in Closed Life Support Systems",
    abstract: "This investigation characterizes microbial community changes in a simulated closed ecological life support system over a 180-day period. Results highlight succession patterns and potential implications for long-duration space missions.",
    authors: ["Elena Martinez", "Thomas Nguyen", "Lisa Cooper"],
    institution: "NASA Marshall Space Flight Center",
    publishedDate: "2022-08-30",
    category: "Microbiology",
    keywords: ["microbiome", "closed systems", "ecological succession", "life support"],
    citations: 23,
    doi: "10.1128/msystems.00112-22"
  },
  {
    id: "NASA-SB-2021-03",
    title: "Circadian Rhythm Disruption in Microgravity and Countermeasures",
    abstract: "This research examines the effects of spaceflight on circadian rhythms and evaluates lighting interventions designed to maintain normal sleep-wake cycles. Results from ISS astronauts demonstrate the efficacy of spectrally-tuned LED lighting systems.",
    authors: ["Robert Chang", "Natalie Brown", "Omar Hassan"],
    institution: "NASA Johnson Space Center",
    publishedDate: "2021-01-18",
    category: "Human Physiology",
    keywords: ["circadian rhythms", "sleep", "lighting", "countermeasures"],
    citations: 37,
    doi: "10.1152/japplphysiol.00841.2020"
  },
  {
    id: "NASA-SB-2023-12",
    title: "Epigenetic Changes in Response to Spaceflight Conditions",
    abstract: "This study investigates epigenetic modifications in human cells exposed to simulated microgravity and radiation. Results reveal significant changes in DNA methylation patterns with potential long-term implications for gene expression.",
    authors: ["Jennifer Park", "Daniel White", "Maria Gonzalez"],
    institution: "NASA Ames Research Center",
    publishedDate: "2023-05-09",
    category: "Molecular Biology",
    keywords: ["epigenetics", "DNA methylation", "gene expression", "adaptation"],
    citations: 8,
    doi: "10.1038/s41576-023-00587-x"
  },
  {
    id: "NASA-SB-2022-25",
    title: "Bone Loss Countermeasures: Combined Exercise and Pharmaceutical Approach",
    abstract: "This research evaluates the effectiveness of a combined intervention using resistance exercise and a novel osteogenic peptide to prevent bone loss in microgravity. Results from a rodent spaceflight study show promising synergistic effects.",
    authors: ["Christopher Lee", "Samantha Taylor", "Ahmed Mahmoud"],
    institution: "NASA Johnson Space Center",
    publishedDate: "2022-10-12",
    category: "Space Medicine",
    keywords: ["bone loss", "countermeasures", "exercise", "pharmaceuticals"],
    citations: 19,
    doi: "10.1007/s00223-022-00997-7"
  },
  {
    id: "NASA-SB-2021-29",
    title: "Psychological Adaptation to Isolation and Confinement in Space Analogs",
    abstract: "This study examines psychological adaptation strategies during a 12-month Antarctic winter-over as an analog for long-duration spaceflight. Results identify key resilience factors and effective countermeasures for maintaining crew well-being.",
    authors: ["Rebecca Miller", "John Anderson", "Yuri Petrov"],
    institution: "NASA Behavioral Health and Performance Laboratory",
    publishedDate: "2021-12-03",
    category: "Space Psychology",
    keywords: ["isolation", "confinement", "psychological adaptation", "crew cohesion"],
    citations: 31,
    doi: "10.1016/j.actaastro.2021.10.038"
  },
  {
    id: "NASA-SB-2023-18",
    title: "Artificial Gravity as a Multi-System Countermeasure for Extended Spaceflight",
    abstract: "This research evaluates the effectiveness of intermittent artificial gravity exposure as a countermeasure for multiple physiological deconditioning effects of microgravity. Results from a 60-day bed rest study demonstrate significant benefits for cardiovascular, musculoskeletal, and vestibular systems.",
    authors: ["Benjamin Carter", "Olivia Schmidt", "Takashi Yamamoto"],
    institution: "NASA Johnson Space Center",
    publishedDate: "2023-07-25",
    category: "Human Physiology",
    keywords: ["artificial gravity", "countermeasures", "physiological deconditioning", "bed rest"],
    citations: 6,
    doi: "10.1113/JP283660"
  },
  {
    id: "NASA-SB-2022-11",
    title: "Microbial Fuel Cells for Waste Processing in Space Habitats",
    abstract: "This study investigates the use of microbial fuel cells for simultaneous waste processing and electricity generation in space habitats. Results demonstrate efficient organic waste degradation while producing usable electrical power.",
    authors: ["Laura Williams", "Carlos Mendez", "Fatima Al-Farsi"],
    institution: "NASA Ames Research Center",
    publishedDate: "2022-05-17",
    category: "Life Support Systems",
    keywords: ["microbial fuel cells", "waste processing", "energy generation", "closed systems"],
    citations: 22,
    doi: "10.1016/j.wasman.2022.03.016"
  },
  {
    id: "NASA-SB-2021-08",
    title: "Vestibular Adaptation to Altered Gravity Environments",
    abstract: "This research examines neural mechanisms of vestibular adaptation to altered gravity conditions. Results from parabolic flight experiments reveal rapid compensatory changes in vestibulo-ocular reflexes and implications for astronaut training.",
    authors: ["Andrew Phillips", "Mei Lin", "Sven Eriksson"],
    institution: "NASA Johnson Space Center",
    publishedDate: "2021-04-02",
    category: "Neuroscience",
    keywords: ["vestibular system", "neural adaptation", "gravity transition", "spatial orientation"],
    citations: 29,
    doi: "10.1152/jn.00544.2020"
  },
  {
    id: "NASA-SB-2023-02",
    title: "CRISPR-Based Genetic Engineering for Space Radiation Resistance",
    abstract: "This study explores the use of CRISPR-Cas9 gene editing to enhance radiation resistance in organisms for space applications. Results demonstrate successful modification of DNA repair pathways with increased survival rates under simulated space radiation conditions.",
    authors: ["Rachel Kim", "Marcus Johnson", "Leila Ahmadi"],
    institution: "NASA Ames Research Center",
    publishedDate: "2023-01-14",
    category: "Synthetic Biology",
    keywords: ["CRISPR", "genetic engineering", "radiation resistance", "DNA repair"],
    citations: 11,
    doi: "10.1038/s41587-022-01624-4"
  },
  {
    id: "NASA-SB-2022-33",
    title: "Algae-Based Life Support Systems for Oxygen and Food Production",
    abstract: "This research evaluates the performance of a novel algae bioreactor system for simultaneous oxygen generation and edible biomass production. Results from a ground-based demonstration show promising resource efficiency for future space habitats.",
    authors: ["Diana Ross", "Paul Chen", "Isabella Martínez"],
    institution: "NASA Kennedy Space Center",
    publishedDate: "2022-12-09",
    category: "Life Support Systems",
    keywords: ["algae", "bioreactors", "oxygen production", "food systems"],
    citations: 14,
    doi: "10.1016/j.lssr.2022.11.003"
  },
  {
    id: "NASA-SB-2021-22",
    title: "Muscle Atrophy Mechanisms in Microgravity at the Molecular Level",
    abstract: "This study investigates the molecular pathways involved in skeletal muscle atrophy during spaceflight. Results identify key regulatory proteins and signaling cascades that could serve as targets for countermeasure development.",
    authors: ["Gregory Thompson", "Naomi Watanabe", "Frank Miller"],
    institution: "NASA Johnson Space Center",
    publishedDate: "2021-09-28",
    category: "Molecular Biology",
    keywords: ["muscle atrophy", "protein degradation", "signaling pathways", "countermeasures"],
    citations: 33,
    doi: "10.1096/fj.202100618R"
  },
  {
    id: "NASA-SB-2023-21",
    title: "3D Bioprinting of Tissue Constructs in Microgravity",
    abstract: "This research demonstrates the advantages of 3D bioprinting in microgravity for creating complex tissue constructs. Results from experiments aboard the ISS show enhanced structural integrity and cellular organization compared to Earth-printed controls.",
    authors: ["Victoria Adams", "Raj Patel", "Sophia Müller"],
    institution: "NASA Johnson Space Center",
    publishedDate: "2023-08-17",
    category: "Biotechnology",
    keywords: ["3D bioprinting", "tissue engineering", "regenerative medicine", "microgravity manufacturing"],
    citations: 5,
    doi: "10.1089/ten.tea.2023.0075"
  }
];

module.exports = studies;