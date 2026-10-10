/**
 * GemID — Complete Gemstone Database
 * Parsed from the IGI Colored Stone Chart + supplementary data
 *
 * Each entry:
 *   name         : Gem material name
 *   group        : Group/family (if any)
 *   ri           : { norm, min, max } — Refractive Index
 *   birefringence: { norm, min, max } — Birefringence (0 for SR)
 *   optic        : "SR" | "DR" | "AGG" | "SR/AGG" | "DR/AGG"
 *   crystalSystem: string
 *   sg           : { norm, min, max } — Specific Gravity
 *   hardness     : { min, max } — Mohs Hardness
 *   colors       : string[]       — common/possible colors
 *   varieties    : string[]       — named varieties
 *   transparency : string
 *   phenomena    : string         — visual phenomena
 *   fluorescence : string         — UV fluorescence
 *   pleochroism  : string
 *   comments     : string
 *   spectroscopy : {              — UV-Vis absorption spectroscopy (from Anderson & Payne)
 *     lines  : number[]           — characteristic absorption line wavelengths (nm)
 *     bands  : [{ start, end, strength }]  — absorption band regions
 *     chromophore : string        — causative ion / color agent
 *     bookRef     : string        — chapter reference in The Spectroscope and Gemmology
 *     description : string        — plain-language spectral description
 *   } | null  (null = no diagnostic spectrum)
 */


const GEMSTONES = [
  {
    name: "Hematite",
    group: "",
    ri: { norm: 2.940, min: 2.940, max: 3.220 },
    birefringence: { norm: 0.280, min: 0.280, max: 0.280 },
    optic: "AGG",
    crystalSystem: "Hexagonal",
    sg: { norm: 5.20, min: 4.95, max: 5.28 },
    hardness: { min: 5.5, max: 6.5 },
    colors: ["black", "gray", "red"],
    varieties: [],
    transparency: "Opaque",
    phenomena: "Metallic luster",
    fluorescence: "Inert",
    pleochroism: "None",
    comments: "Metallic luster. Often used as intaglios and cabochons."
  },
  {
    name: "Syn. Moissanite",
    group: "Synthetic",
    ri: { norm: 2.648, min: 2.648, max: 2.691 },
    birefringence: { norm: 0.043, min: 0.043, max: 0.043 },
    optic: "DR",
    crystalSystem: "Hexagonal",
    sg: { norm: 3.20, min: 3.18, max: 3.22 },
    hardness: { min: 9.25, max: 9.5 },
    colors: ["white"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "Strong doubling",
    fluorescence: "LW & SW: inert to weak",
    pleochroism: "None",
    comments: "Diamond imitation. Thermoluminescence. Strong doubling visible under magnification."
  },
  {
    name: "Syn. Rutile",
    group: "Synthetic",
    ri: { norm: 2.616, min: 2.616, max: 2.903 },
    birefringence: { norm: 0.287, min: 0.287, max: 0.287 },
    optic: "DR",
    crystalSystem: "Tetragonal",
    sg: { norm: 4.26, min: 4.23, max: 4.29 },
    hardness: { min: 6.0, max: 6.5 },
    colors: ["yellow", "orange", "white"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "Extreme dispersion (.330); extreme doubling",
    fluorescence: "Variable",
    pleochroism: "None",
    comments: "Diamond imitation. Fuzzy appearance due to extreme doubling. Dispersion .330."
  },
  {
    name: "Diamond",
    group: "",
    ri: { norm: 2.417, min: 2.417, max: 2.417 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 3.52, min: 3.51, max: 3.53 },
    hardness: { min: 10.0, max: 10.0 },
    colors: ["white", "yellow", "brown", "pink", "blue", "green", "orange", "violet", "gray", "black"],
    varieties: [],
    transparency: "Transparent to Opaque",
    phenomena: "Adamantine luster; moderate dispersion (.044)",
    fluorescence: "LW: inert to strong; SW: weaker",
    pleochroism: "None",
    comments: "Typical inclusions: naturals, crystals, graining. Thermal conductivity test key. ADR possible."
  },
  {
    name: "Strontium Titanate",
    group: "Synthetic",
    ri: { norm: 2.409, min: 2.409, max: 2.409 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 5.13, min: 5.11, max: 5.15 },
    hardness: { min: 5.5, max: 6.0 },
    colors: ["white"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "Very strong dispersion (.190)",
    fluorescence: "LW & SW: generally inert",
    pleochroism: "None",
    comments: "Generally flawless, gas bubbles possible. Abraded and rounded facet junctions. Diamond imitation."
  },
  {
    name: "Sphalerite",
    group: "",
    ri: { norm: 2.370, min: 2.370, max: 2.370 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 4.05, min: 3.90, max: 4.20 },
    hardness: { min: 3.5, max: 4.0 },
    colors: ["yellow", "orange", "green", "brown", "red"],
    varieties: [],
    transparency: "Transparent to Opaque",
    phenomena: "Very strong dispersion (.156)",
    fluorescence: "LW: inert to strong",
    pleochroism: "None",
    comments: "Fragile, perfect cleavage. Very strong dispersion."
  },
  {
    name: "CZ (Cubic Zirconia)",
    group: "Synthetic",
    ri: { norm: 2.150, min: 2.150, max: 2.180 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 5.80, min: 5.60, max: 6.00 },
    hardness: { min: 8.5, max: 8.5 },
    colors: ["white", "pink", "yellow", "green", "blue", "violet", "orange", "red", "brown"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "Strong dispersion (.060)",
    fluorescence: "LW & SW: inert to moderate",
    pleochroism: "None",
    comments: "Generally flawless, gas bubbles and unmelted zirconium oxide possible. Diamond imitation."
  },
  {
    name: "GGG",
    group: "Synthetic",
    ri: { norm: 1.970, min: 1.970, max: 2.030 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 7.05, min: 6.95, max: 7.09 },
    hardness: { min: 6.5, max: 6.5 },
    colors: ["white", "yellow", "green"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "Moderate dispersion (.045)",
    fluorescence: "LW: inert to moderate; SW: moderate to strong",
    pleochroism: "None",
    comments: "Gadolinium Gallium Garnet. Generally flawless, gas bubbles possible. When colorless, usually fluoresces strong pinkish orange. Diamond imitation."
  },
  {
    name: "Zircon",
    group: "",
    ri: { norm: 1.925, min: 1.780, max: 1.984 },
    birefringence: { norm: 0.059, min: 0.000, max: 0.059 },
    optic: "DR",
    crystalSystem: "Tetragonal",
    sg: { norm: 4.70, min: 3.90, max: 4.73 },
    hardness: { min: 6.5, max: 7.5 },
    colors: ["blue", "white", "yellow", "orange", "red", "green", "brown"],
    varieties: [],
    transparency: "Transparent to Semi-transparent",
    phenomena: "Subadamantine luster; moderate dispersion (.038)",
    fluorescence: "LW & SW: inert to moderate",
    pleochroism: "Weak to moderate",
    comments: "Abraded facet junctions. Low, medium, and high types with different properties. Strong doubling."
  },
  {
    name: "Sphene (Titanite)",
    group: "",
    ri: { norm: 1.900, min: 1.880, max: 2.034 },
    birefringence: { norm: 0.100, min: 0.100, max: 0.135 },
    optic: "DR",
    crystalSystem: "Monoclinic",
    sg: { norm: 3.52, min: 3.50, max: 3.54 },
    hardness: { min: 5.0, max: 5.5 },
    colors: ["yellow", "green", "orange", "brown"],
    varieties: [],
    transparency: "Transparent to Opaque",
    phenomena: "Strong doubling",
    fluorescence: "LW & SW: inert",
    pleochroism: "Moderate to strong",
    comments: "Straight rows of tiny crystals. Very high dispersion and birefringence."
  },
  {
    name: "Andradite",
    group: "Garnet",
    ri: { norm: 1.888, min: 1.855, max: 1.895 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 3.84, min: 3.81, max: 3.87 },
    hardness: { min: 6.5, max: 7.0 },
    colors: ["green", "yellow", "brown", "black"],
    varieties: ["Demantoid", "Melanite", "Topazolite"],
    transparency: "Transparent to Opaque",
    phenomena: "Var. Demantoid: strong dispersion (.057); chatoyancy or iridescence possible",
    fluorescence: "LW & SW: inert",
    pleochroism: "None",
    comments: "Demantoid (green) with horsetail inclusions. Melanite (black). May show chatoyancy or iridescence."
  },
  {
    name: "YAG",
    group: "Synthetic",
    ri: { norm: 1.833, min: 1.823, max: 1.843 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 4.55, min: 4.50, max: 4.60 },
    hardness: { min: 8.0, max: 8.5 },
    colors: ["white", "yellow", "green", "blue", "red"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "Weak dispersion (.028)",
    fluorescence: "LW & SW: inert to strong",
    pleochroism: "None",
    comments: "Yttrium Aluminum Garnet. No natural counterpart. Generally flawless. Red flashes by transmitted light. Diamond imitation."
  },
  {
    name: "Spessartite",
    group: "Garnet",
    ri: { norm: 1.810, min: 1.790, max: 1.814 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 4.15, min: 4.12, max: 4.20 },
    hardness: { min: 7.0, max: 7.5 },
    colors: ["orange", "red", "yellow", "brown"],
    varieties: ["Mandarin Garnet"],
    transparency: "Transparent",
    phenomena: "Color contains some orange",
    fluorescence: "LW & SW: inert",
    pleochroism: "None",
    comments: "2-phase inclusions, fingerprints, rutile needles, strong ADR. May react to magnet."
  },
  {
    name: "Almandite",
    group: "Garnet",
    ri: { norm: 1.790, min: 1.760, max: 1.820 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 4.05, min: 3.93, max: 4.30 },
    hardness: { min: 7.0, max: 7.5 },
    colors: ["red", "violet", "brown"],
    varieties: ["Star Almandite"],
    transparency: "Transparent to Semi-translucent",
    phenomena: "Often dark in tone; asterism (4 or 6 rays)",
    fluorescence: "LW & SW: inert",
    pleochroism: "None",
    comments: "Rutile needles intersecting on different planes. Strong ADR. Star Almandite (almandine): 4 rays, 6 rays also possible."
  },
  {
    name: "Corundum",
    group: "",
    ri: { norm: 1.762, min: 1.757, max: 1.770 },
    birefringence: { norm: 0.008, min: 0.008, max: 0.010 },
    optic: "DR",
    crystalSystem: "Trigonal",
    sg: { norm: 4.00, min: 3.95, max: 4.10 },
    hardness: { min: 9.0, max: 9.0 },
    colors: ["red", "blue", "pink", "yellow", "orange", "green", "violet", "white", "brown", "gray", "black"],
    varieties: ["Ruby", "Sapphire", "Padparadscha", "Star Ruby", "Star Sapphire"],
    transparency: "Transparent to Opaque",
    phenomena: "Asterism; color change; chatoyancy (rare)",
    fluorescence: "LW & SW: inert to strong",
    pleochroism: "Moderate to strong",
    comments: "Red = Ruby, other colors = Sapphire. Analyze inclusions for synthetic vs natural, treatment and origin."
  },
  {
    name: "Syn. Corundum",
    group: "Synthetic",
    ri: { norm: 1.762, min: 1.759, max: 1.770 },
    birefringence: { norm: 0.008, min: 0.008, max: 0.008 },
    optic: "DR",
    crystalSystem: "Trigonal",
    sg: { norm: 4.00, min: 3.97, max: 4.03 },
    hardness: { min: 9.0, max: 9.0 },
    colors: ["red", "blue", "pink", "yellow", "orange", "green", "violet", "white"],
    varieties: [],
    transparency: "Transparent to Opaque",
    phenomena: "Asterism; color change; chatoyancy (rare)",
    fluorescence: "LW & SW: inert to strong",
    pleochroism: "Moderate to strong",
    comments: "Verneuil: Gas bubbles, curved striae. Flux: inclusions key in separating from natural — flux residue, metallic platelets, straight or angular growth."
  },
  {
    name: "Rhodolite",
    group: "Garnet",
    ri: { norm: 1.760, min: 1.740, max: 1.770 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 3.84, min: 3.74, max: 3.94 },
    hardness: { min: 7.0, max: 7.5 },
    colors: ["violet", "red", "pink"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "Purple to purplish red color",
    fluorescence: "LW & SW: inert",
    pleochroism: "None",
    comments: "Mixture of Pyrope & Almandine, always has a purple color component."
  },
  {
    name: "Benitoite",
    group: "",
    ri: { norm: 1.757, min: 1.757, max: 1.804 },
    birefringence: { norm: 0.047, min: 0.047, max: 0.047 },
    optic: "DR",
    crystalSystem: "Hexagonal",
    sg: { norm: 3.68, min: 3.61, max: 3.69 },
    hardness: { min: 6.0, max: 6.5 },
    colors: ["blue", "white"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "Strong doubling",
    fluorescence: "LW: inert to weak; SW: weak to strong",
    pleochroism: "Strong dichroism",
    comments: "Characteristic blue & colorless pleochroism. Commonly fluoresces chalky blue. May be color zoned. California state gem."
  },
  {
    name: "Chrysoberyl",
    group: "",
    ri: { norm: 1.746, min: 1.740, max: 1.755 },
    birefringence: { norm: 0.008, min: 0.008, max: 0.010 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 3.73, min: 3.71, max: 3.75 },
    hardness: { min: 8.5, max: 8.5 },
    colors: ["yellow", "green", "brown"],
    varieties: ["Alexandrite", "Cat's Eye Chrysoberyl"],
    transparency: "Transparent to Opaque",
    phenomena: "Chatoyancy; color change (Alexandrite)",
    fluorescence: "LW & SW: inert to weak",
    pleochroism: "Moderate (Alexandrite: strong trichroism)",
    comments: "Clouds of tiny rutile needles, liquid fingerprints. Alexandrite shows color change. Cat's eye: finest chatoyancy."
  },
  {
    name: "Pyrope",
    group: "Garnet",
    ri: { norm: 1.746, min: 1.720, max: 1.756 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 3.78, min: 3.62, max: 3.87 },
    hardness: { min: 7.0, max: 7.5 },
    colors: ["red", "violet", "orange", "pink"],
    varieties: ["Chrome Pyrope", "Color-Change Garnet"],
    transparency: "Transparent",
    phenomena: "Often very dark in tone",
    fluorescence: "LW & SW: inert",
    pleochroism: "None",
    comments: "Typical inclusions: low relief rounded crystals. Strong ADR."
  },
  {
    name: "Grossularite",
    group: "Garnet",
    ri: { norm: 1.740, min: 1.730, max: 1.760 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 3.61, min: 3.57, max: 3.73 },
    hardness: { min: 7.0, max: 7.5 },
    colors: ["green", "orange", "yellow", "brown", "pink", "white"],
    varieties: ["Hessonite", "Tsavorite", "Mint Garnet"],
    transparency: "Transparent to Semi-transparent",
    phenomena: "",
    fluorescence: "LW & SW: inert to moderate",
    pleochroism: "None",
    comments: "Hessonite: orange (heat wave effect). Tsavorite: green. May show strong ADR."
  },
  {
    name: "Rhodonite",
    group: "",
    ri: { norm: 1.733, min: 1.720, max: 1.747 },
    birefringence: { norm: 0.010, min: 0.010, max: 0.014 },
    optic: "DR",
    crystalSystem: "Triclinic",
    sg: { norm: 3.50, min: 3.30, max: 3.75 },
    hardness: { min: 5.5, max: 6.5 },
    colors: ["pink", "red", "brown", "black"],
    varieties: [],
    transparency: "Transparent to Opaque",
    phenomena: "Aggregates often pink with black inclusions",
    fluorescence: "Inert",
    pleochroism: "Weak",
    comments: "Common as black-veined opaque aggregate, rare in transparent crystal form."
  },
  {
    name: "Epidote",
    group: "",
    ri: { norm: 1.729, min: 1.694, max: 1.768 },
    birefringence: { norm: 0.019, min: 0.019, max: 0.045 },
    optic: "DR",
    crystalSystem: "Monoclinic",
    sg: { norm: 3.40, min: 3.30, max: 3.50 },
    hardness: { min: 6.0, max: 7.0 },
    colors: ["green", "yellow", "brown"],
    varieties: [],
    transparency: "Transparent to Opaque",
    phenomena: "Very strong pleochroism",
    fluorescence: "Inert",
    pleochroism: "Very strong trichroism",
    comments: "Rare stone. Pistachio green is characteristic color."
  },
  {
    name: "Syn. Spinel",
    group: "Synthetic",
    ri: { norm: 1.728, min: 1.720, max: 1.740 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 3.64, min: 3.52, max: 3.66 },
    hardness: { min: 8.0, max: 8.0 },
    colors: ["blue", "white", "green", "yellow", "red", "pink"],
    varieties: [],
    transparency: "Transparent to Opaque",
    phenomena: "Color change possible",
    fluorescence: "LW & SW: inert to strong",
    pleochroism: "None",
    comments: "Tiny gas bubbles, moving cloudy zones or orangy brown flux inclusions. Polariscope: ADR."
  },
  {
    name: "Hydrogrossular",
    group: "Garnet",
    ri: { norm: 1.720, min: 1.690, max: 1.730 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "AGG",
    crystalSystem: "Cubic",
    sg: { norm: 3.47, min: 3.15, max: 3.55 },
    hardness: { min: 7.0, max: 7.5 },
    colors: ["green", "pink", "white"],
    varieties: [],
    transparency: "Translucent to Opaque",
    phenomena: "",
    fluorescence: "LW & SW: inert",
    pleochroism: "None",
    comments: "Grossular aggregate, may have black inclusions. Confused with Jadeite."
  },
  {
    name: "Azurite",
    group: "",
    ri: { norm: 1.720, min: 1.710, max: 1.850 },
    birefringence: { norm: 0.108, min: 0.108, max: 0.110 },
    optic: "AGG",
    crystalSystem: "Monoclinic",
    sg: { norm: 3.80, min: 3.70, max: 3.90 },
    hardness: { min: 3.5, max: 4.0 },
    colors: ["blue"],
    varieties: [],
    transparency: "Opaque",
    phenomena: "",
    fluorescence: "Inert",
    pleochroism: "None visible (opaque)",
    comments: "Not common in crystal forms, too dark when faceted. Often found with Malachite."
  },
  {
    name: "Spinel",
    group: "",
    ri: { norm: 1.718, min: 1.710, max: 1.735 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 3.60, min: 3.57, max: 3.70 },
    hardness: { min: 8.0, max: 8.0 },
    colors: ["red", "blue", "pink", "violet", "orange", "green", "brown", "black"],
    varieties: ["Flame Spinel", "Cobalt Spinel"],
    transparency: "Transparent to Opaque",
    phenomena: "Color change (rare); asterism (rare)",
    fluorescence: "LW: inert to strong; SW: inert to weak",
    pleochroism: "None",
    comments: "Parallel rows of tiny octahedrons. Colors often low saturation. No cleavage."
  },
  {
    name: "Kyanite",
    group: "",
    ri: { norm: 1.715, min: 1.711, max: 1.731 },
    birefringence: { norm: 0.015, min: 0.015, max: 0.017 },
    optic: "DR",
    crystalSystem: "Triclinic",
    sg: { norm: 3.62, min: 3.55, max: 3.70 },
    hardness: { min: 4.0, max: 7.5 },
    colors: ["blue", "green", "white", "gray", "orange"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "Chatoyancy (rare); strong pleochroism",
    fluorescence: "LW: usually reddish",
    pleochroism: "Strong",
    comments: "Low hardness parallel to crystal length, high at 90°. Often fibrous. Variable hardness is diagnostic."
  },
  {
    name: "Idocrase (Vesuvianite)",
    group: "",
    ri: { norm: 1.713, min: 1.700, max: 1.718 },
    birefringence: { norm: 0.005, min: 0.001, max: 0.012 },
    optic: "DR",
    crystalSystem: "Tetragonal",
    sg: { norm: 3.40, min: 3.25, max: 3.55 },
    hardness: { min: 6.5, max: 6.5 },
    colors: ["green", "yellow", "brown", "violet", "blue"],
    varieties: ["Californite"],
    transparency: "Transparent to Opaque",
    phenomena: "Often resembles Jade",
    fluorescence: "LW & SW: inert",
    pleochroism: "Weak",
    comments: "Polariscope: zebra stripes. Chatoyancy possible. Confused with Jade."
  },
  {
    name: "Diaspore (Zultanite)",
    group: "",
    ri: { norm: 1.702, min: 1.702, max: 1.750 },
    birefringence: { norm: 0.048, min: 0.048, max: 0.048 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 3.30, min: 3.25, max: 3.50 },
    hardness: { min: 6.5, max: 7.0 },
    colors: ["yellow", "green", "pink", "brown"],
    varieties: ["Zultanite", "Csarite"],
    transparency: "Transparent to Translucent",
    phenomena: "Color change",
    fluorescence: "LW: inert",
    pleochroism: "Moderate",
    comments: "Perfect and easy cleavage. Shows color change in different lighting."
  },
  {
    name: "Zoisite",
    group: "",
    ri: { norm: 1.691, min: 1.686, max: 1.700 },
    birefringence: { norm: 0.008, min: 0.008, max: 0.013 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 3.35, min: 3.10, max: 3.45 },
    hardness: { min: 6.0, max: 7.0 },
    colors: ["blue", "violet", "green", "pink", "yellow", "brown"],
    varieties: ["Tanzanite", "Thulite", "Anyolite"],
    transparency: "Transparent to Opaque",
    phenomena: "Chatoyancy (rare); very strong pleochroism",
    fluorescence: "LW & SW: inert",
    pleochroism: "Very strong trichroism",
    comments: "Tanzanite (blue-violet): very strong trichroism. Thulite: ornamental, translucent to opaque, pink."
  },
  {
    name: "Axinite",
    group: "",
    ri: { norm: 1.678, min: 1.667, max: 1.688 },
    birefringence: { norm: 0.010, min: 0.010, max: 0.012 },
    optic: "DR",
    crystalSystem: "Triclinic",
    sg: { norm: 3.29, min: 3.21, max: 3.36 },
    hardness: { min: 6.5, max: 7.0 },
    colors: ["brown", "violet", "blue", "yellow"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "Strong trichroism",
    fluorescence: "SW: inert to orangy-red",
    pleochroism: "Strong trichroism",
    comments: "Color zoning, brittle. Rare collector stone."
  },
  {
    name: "Diopside",
    group: "",
    ri: { norm: 1.675, min: 1.665, max: 1.701 },
    birefringence: { norm: 0.024, min: 0.024, max: 0.030 },
    optic: "DR",
    crystalSystem: "Monoclinic",
    sg: { norm: 3.29, min: 3.22, max: 3.40 },
    hardness: { min: 5.0, max: 6.0 },
    colors: ["green", "yellow", "brown", "black"],
    varieties: ["Chrome Diopside", "Star Diopside", "Black Star"],
    transparency: "Transparent to Opaque",
    phenomena: "Asterism; chatoyancy; trichroism common",
    fluorescence: "LW: inert",
    pleochroism: "Moderate trichroism",
    comments: "Confused with Peridot. Birefringence and spectrum key to distinguish. Chrome Diopside: vivid green."
  },
  {
    name: "Dumortierite",
    group: "",
    ri: { norm: 1.669, min: 1.669, max: 1.723 },
    birefringence: { norm: 0.011, min: 0.011, max: 0.037 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 3.30, min: 3.20, max: 3.40 },
    hardness: { min: 6.0, max: 8.0 },
    colors: ["blue", "violet", "brown"],
    varieties: [],
    transparency: "Transparent to Opaque",
    phenomena: "Trichroism",
    fluorescence: "Inert",
    pleochroism: "Strong trichroism",
    comments: "Rare stone. Often found in quartz as inclusions."
  },
  {
    name: "Sinhalite",
    group: "",
    ri: { norm: 1.668, min: 1.665, max: 1.707 },
    birefringence: { norm: 0.036, min: 0.036, max: 0.042 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 3.48, min: 3.46, max: 3.50 },
    hardness: { min: 6.5, max: 7.0 },
    colors: ["yellow", "brown", "green"],
    varieties: [],
    transparency: "Transparent to Translucent",
    phenomena: "Chatoyancy",
    fluorescence: "LW & SW: inert to yellow",
    pleochroism: "Moderate",
    comments: "Common inclusions: Sillimanite needles. Originally confused with Peridot."
  },
  {
    name: "Kornerupine",
    group: "",
    ri: { norm: 1.667, min: 1.660, max: 1.680 },
    birefringence: { norm: 0.012, min: 0.012, max: 0.017 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 3.32, min: 3.27, max: 3.44 },
    hardness: { min: 6.5, max: 7.0 },
    colors: ["green", "brown", "yellow"],
    varieties: [],
    transparency: "Transparent to Translucent",
    phenomena: "Chatoyancy; asterism (rare)",
    fluorescence: "LW & SW: inert to yellow",
    pleochroism: "Moderate to strong",
    comments: "Common needle-like inclusions. Sharp cat's eye. Rare collector stone."
  },
  {
    name: "Spodumene",
    group: "",
    ri: { norm: 1.660, min: 1.655, max: 1.676 },
    birefringence: { norm: 0.014, min: 0.014, max: 0.016 },
    optic: "DR",
    crystalSystem: "Monoclinic",
    sg: { norm: 3.18, min: 3.15, max: 3.21 },
    hardness: { min: 6.0, max: 7.0 },
    colors: ["pink", "violet", "green", "yellow", "white"],
    varieties: ["Kunzite", "Hiddenite", "Triphane"],
    transparency: "Transparent",
    phenomena: "Chatoyancy",
    fluorescence: "LW: inert to strong; SW: weaker",
    pleochroism: "Moderate to strong",
    comments: "Liquid inclusions. Kunzite (pink to bluish purple). Hiddenite (green). Perfect cleavage in 2 directions."
  },
  {
    name: "Jadeite (Jade)",
    group: "",
    ri: { norm: 1.660, min: 1.652, max: 1.688 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "AGG",
    crystalSystem: "Monoclinic",
    sg: { norm: 3.34, min: 3.25, max: 3.40 },
    hardness: { min: 6.5, max: 7.0 },
    colors: ["green", "white", "violet", "yellow", "orange", "brown", "gray", "black"],
    varieties: ["Imperial Jade", "Lavender Jade"],
    transparency: "Semi-transparent to Opaque",
    phenomena: "Often greasy to waxy luster",
    fluorescence: "LW & SW: inert to strong",
    pleochroism: "None (aggregate)",
    comments: "Confused with Nephrite, Idocrase, Hydrogrossular. Spectrum key to identification. Imperial Jade: finest green."
  },
  {
    name: "Jet",
    group: "Organic",
    ri: { norm: 1.660, min: 1.640, max: 1.680 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Amorphous",
    sg: { norm: 1.32, min: 1.30, max: 1.34 },
    hardness: { min: 2.5, max: 4.0 },
    colors: ["black", "brown"],
    varieties: [],
    transparency: "Opaque",
    phenomena: "Dull luster",
    fluorescence: "Inert",
    pleochroism: "None",
    comments: "Hot needle: coal odor. Fossilized wood. Very lightweight."
  },
  {
    name: "Sillimanite",
    group: "",
    ri: { norm: 1.659, min: 1.653, max: 1.680 },
    birefringence: { norm: 0.015, min: 0.015, max: 0.021 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 3.25, min: 3.14, max: 3.27 },
    hardness: { min: 6.0, max: 7.5 },
    colors: ["green", "yellow", "blue", "brown", "white"],
    varieties: ["Fibrolite"],
    transparency: "Transparent to Opaque",
    phenomena: "Chatoyancy",
    fluorescence: "Inert",
    pleochroism: "Moderate",
    comments: "Usually fibrous & massive, transparent material rare."
  },
  {
    name: "Enstatite",
    group: "",
    ri: { norm: 1.658, min: 1.653, max: 1.668 },
    birefringence: { norm: 0.008, min: 0.008, max: 0.012 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 3.25, min: 3.23, max: 3.40 },
    hardness: { min: 5.0, max: 6.0 },
    colors: ["brown", "green", "yellow", "gray"],
    varieties: [],
    transparency: "Transparent to Opaque",
    phenomena: "Asterism (rare); chatoyancy",
    fluorescence: "Inert",
    pleochroism: "Moderate",
    comments: "Conclusive spectrum for brown. Star Enstatite rare."
  },
  {
    name: "Malachite",
    group: "",
    ri: { norm: 1.655, min: 1.655, max: 1.909 },
    birefringence: { norm: 0.254, min: 0.254, max: 0.254 },
    optic: "AGG",
    crystalSystem: "Monoclinic",
    sg: { norm: 3.95, min: 3.25, max: 4.10 },
    hardness: { min: 3.5, max: 4.0 },
    colors: ["green"],
    varieties: [],
    transparency: "Opaque",
    phenomena: "Often banded in 2+ tones of green",
    fluorescence: "LW & SW: inert",
    pleochroism: "None (opaque)",
    comments: "Curved or angular banding. Often associated with Azurite."
  },
  {
    name: "Peridot",
    group: "",
    ri: { norm: 1.654, min: 1.634, max: 1.690 },
    birefringence: { norm: 0.035, min: 0.035, max: 0.038 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 3.34, min: 3.27, max: 3.48 },
    hardness: { min: 6.5, max: 7.0 },
    colors: ["green", "yellow"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "Doubling visible through table facet",
    fluorescence: "LW & SW: inert",
    pleochroism: "Weak",
    comments: "Doubling, typical inclusions: 'lily pad'. Conclusive spectrum. Only gem-quality olivine."
  },
  {
    name: "Jeremejevite",
    group: "",
    ri: { norm: 1.639, min: 1.637, max: 1.648 },
    birefringence: { norm: 0.008, min: 0.008, max: 0.009 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 3.30, min: 3.25, max: 3.33 },
    hardness: { min: 6.5, max: 7.5 },
    colors: ["blue", "white", "yellow"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "",
    fluorescence: "LW & SW: inert",
    pleochroism: "Weak",
    comments: "Light in color. 'Lightning Strike' inclusions. May show pseudo-uniaxial optical character. Very rare."
  },
  {
    name: "Andalusite",
    group: "",
    ri: { norm: 1.634, min: 1.629, max: 1.643 },
    birefringence: { norm: 0.007, min: 0.007, max: 0.013 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 3.17, min: 3.05, max: 3.21 },
    hardness: { min: 7.0, max: 7.5 },
    colors: ["green", "brown", "red", "orange", "yellow"],
    varieties: ["Chiastolite"],
    transparency: "Transparent to Opaque",
    phenomena: "Very strong pleochroism",
    fluorescence: "LW & SW: inert",
    pleochroism: "Very strong trichroism",
    comments: "Strong trichroism visible to naked eye. Rutile needles. Chiastolite: cross-shaped inclusions."
  },
  {
    name: "Apatite",
    group: "",
    ri: { norm: 1.634, min: 1.628, max: 1.638 },
    birefringence: { norm: 0.002, min: 0.002, max: 0.008 },
    optic: "DR",
    crystalSystem: "Hexagonal",
    sg: { norm: 3.18, min: 3.13, max: 3.23 },
    hardness: { min: 5.0, max: 5.0 },
    colors: ["blue", "green", "yellow", "violet", "pink", "white"],
    varieties: [],
    transparency: "Transparent to Translucent",
    phenomena: "Chatoyancy",
    fluorescence: "LW & SW: inert to weak",
    pleochroism: "Moderate",
    comments: "May show pseudo-biaxial optic character. Neon blue-green Paraíba-like colors popular."
  },
  {
    name: "Tourmaline",
    group: "",
    ri: { norm: 1.624, min: 1.615, max: 1.644 },
    birefringence: { norm: 0.018, min: 0.018, max: 0.040 },
    optic: "DR",
    crystalSystem: "Trigonal",
    sg: { norm: 3.06, min: 3.00, max: 3.26 },
    hardness: { min: 7.0, max: 7.5 },
    colors: ["pink", "red", "green", "blue", "yellow", "orange", "brown", "black", "white", "violet"],
    varieties: ["Rubellite", "Indicolite", "Paraíba", "Watermelon", "Chrome Tourmaline", "Schorl"],
    transparency: "Transparent to Opaque",
    phenomena: "Chatoyancy; color change (rare); strong dichroism",
    fluorescence: "LW & SW: inert to weak",
    pleochroism: "Strong dichroism",
    comments: "Strong dichroism, multi-colored crystals common. Wide variety of colors and species."
  },
  {
    name: "Topaz",
    group: "",
    ri: { norm: 1.619, min: 1.609, max: 1.637 },
    birefringence: { norm: 0.008, min: 0.008, max: 0.010 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 3.53, min: 3.49, max: 3.57 },
    hardness: { min: 8.0, max: 8.0 },
    colors: ["yellow", "blue", "pink", "orange", "brown", "white", "green", "red"],
    varieties: ["Imperial Topaz", "Mystic Topaz", "London Blue", "Swiss Blue", "Sky Blue"],
    transparency: "Transparent",
    phenomena: "",
    fluorescence: "LW: inert to weak; SW: inert to moderate",
    pleochroism: "Weak to moderate",
    comments: "RI varies with color: colorless & blue (1.609–1.617), others (1.629–1.637). May be irradiated/heat treated/coated."
  },
  {
    name: "Turquoise",
    group: "",
    ri: { norm: 1.610, min: 1.610, max: 1.650 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "AGG",
    crystalSystem: "Triclinic",
    sg: { norm: 2.76, min: 2.40, max: 2.90 },
    hardness: { min: 5.0, max: 6.0 },
    colors: ["blue", "green"],
    varieties: ["Sleeping Beauty", "Persian Turquoise"],
    transparency: "Semi-translucent to Opaque",
    phenomena: "Matrix possible",
    fluorescence: "LW: inert to weak; SW: inert",
    pleochroism: "None",
    comments: "Common spiderweb matrix. Often stabilized or treated. Strong transmitted light."
  },
  {
    name: "Nephrite (Jade)",
    group: "",
    ri: { norm: 1.606, min: 1.600, max: 1.632 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "AGG",
    crystalSystem: "Monoclinic",
    sg: { norm: 2.95, min: 2.90, max: 3.10 },
    hardness: { min: 6.0, max: 6.5 },
    colors: ["green", "white", "yellow", "brown", "black", "gray"],
    varieties: ["Mutton Fat Jade", "Spinach Jade"],
    transparency: "Translucent to Opaque",
    phenomena: "Often greasy to waxy luster",
    fluorescence: "LW & SW: inert",
    pleochroism: "None (aggregate)",
    comments: "Confused with Jadeite/Serpentine (SG/RI key differences). Extremely tough material."
  },
  {
    name: "Grandidierite",
    group: "",
    ri: { norm: 1.590, min: 1.568, max: 1.639 },
    birefringence: { norm: 0.035, min: 0.035, max: 0.050 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 2.96, min: 2.85, max: 3.00 },
    hardness: { min: 7.5, max: 7.5 },
    colors: ["blue", "green"],
    varieties: [],
    transparency: "Transparent to Translucent",
    phenomena: "Pleochroism",
    fluorescence: "LW & SW: inert",
    pleochroism: "Strong trichroism",
    comments: "Rare stone. Highly sought after by collectors."
  },
  {
    name: "Rhodochrosite",
    group: "",
    ri: { norm: 1.587, min: 1.584, max: 1.817 },
    birefringence: { norm: 0.208, min: 0.208, max: 0.220 },
    optic: "DR",
    crystalSystem: "Trigonal",
    sg: { norm: 3.60, min: 3.45, max: 3.70 },
    hardness: { min: 3.5, max: 4.5 },
    colors: ["pink", "red", "orange", "brown", "white"],
    varieties: [],
    transparency: "Transparent to Opaque",
    phenomena: "Pink and white banding often in aggregate",
    fluorescence: "LW & SW: inert to moderate",
    pleochroism: "Weak",
    comments: "Common as aggregate with agate-like banding. Confused with Rhodonite, Hydrogrossular & Thulite."
  },
  {
    name: "Beryl",
    group: "",
    ri: { norm: 1.577, min: 1.560, max: 1.600 },
    birefringence: { norm: 0.005, min: 0.005, max: 0.009 },
    optic: "DR",
    crystalSystem: "Hexagonal",
    sg: { norm: 2.72, min: 2.67, max: 2.90 },
    hardness: { min: 7.5, max: 8.0 },
    colors: ["green", "blue", "pink", "yellow", "white", "red"],
    varieties: ["Emerald", "Aquamarine", "Morganite", "Heliodor", "Goshenite", "Red Beryl (Bixbite)"],
    transparency: "Transparent to Opaque",
    phenomena: "Chatoyancy; asterism (rare)",
    fluorescence: "LW & SW: inert to strong",
    pleochroism: "Moderate to strong dichroism",
    comments: "Strong dichroism, named according to color. Inclusions help determine origins. Emerald: jardin inclusions."
  },
  {
    name: "Syn. Emerald (Hydrothermal)",
    group: "Synthetic",
    ri: { norm: 1.568, min: 1.565, max: 1.573 },
    birefringence: { norm: 0.005, min: 0.005, max: 0.007 },
    optic: "DR",
    crystalSystem: "Hexagonal",
    sg: { norm: 2.68, min: 2.65, max: 2.71 },
    hardness: { min: 7.5, max: 8.0 },
    colors: ["green"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "",
    fluorescence: "LW & SW: inert to strong",
    pleochroism: "Moderate",
    comments: "Phenakite crystals (nailhead spicules), wavy layered appearance, chevron-like growth pattern."
  },
  {
    name: "Syn. Emerald (Flux)",
    group: "Synthetic",
    ri: { norm: 1.561, min: 1.551, max: 1.564 },
    birefringence: { norm: 0.003, min: 0.003, max: 0.008 },
    optic: "DR",
    crystalSystem: "Hexagonal",
    sg: { norm: 2.66, min: 2.65, max: 2.69 },
    hardness: { min: 7.5, max: 8.0 },
    colors: ["green"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "",
    fluorescence: "LW: inert to strong; SW: inert to moderate",
    pleochroism: "Moderate",
    comments: "Flux inclusions (may appear 2-phase), Phenakite or Platinum crystals, straight or angular growth."
  },
  {
    name: "Serpentine",
    group: "",
    ri: { norm: 1.560, min: 1.490, max: 1.570 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "AGG",
    crystalSystem: "Monoclinic",
    sg: { norm: 2.57, min: 2.44, max: 2.80 },
    hardness: { min: 2.0, max: 6.0 },
    colors: ["green", "yellow", "brown", "white", "black"],
    varieties: ["Bowenite", "Williamsite"],
    transparency: "Semi-translucent to Opaque",
    phenomena: "Waxy to greasy luster",
    fluorescence: "LW & SW: weak",
    pleochroism: "None",
    comments: "Black inclusions. Confused with Chalcedony, Jadeite & Nephrite."
  },
  {
    name: "Coral (Conchiolin)",
    group: "Organic",
    ri: { norm: 1.560, min: 1.550, max: 1.570 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "AGG",
    crystalSystem: "Amorphous",
    sg: { norm: 1.35, min: 1.30, max: 2.12 },
    hardness: { min: 3.0, max: 3.0 },
    colors: ["black", "brown", "yellow"],
    varieties: ["Golden Coral", "Black Coral"],
    transparency: "Semi-translucent to Opaque",
    phenomena: "Concentric circular growth",
    fluorescence: "LW & SW: inert",
    pleochroism: "None",
    comments: "Black Coral is bleached to create the rare golden color. Organic material."
  },
  {
    name: "Labradorite",
    group: "Feldspar",
    ri: { norm: 1.559, min: 1.554, max: 1.568 },
    birefringence: { norm: 0.009, min: 0.009, max: 0.009 },
    optic: "DR",
    crystalSystem: "Triclinic",
    sg: { norm: 2.70, min: 2.65, max: 2.75 },
    hardness: { min: 6.0, max: 6.5 },
    colors: ["gray", "blue", "green", "yellow", "orange", "white"],
    varieties: ["Spectrolite", "Rainbow Moonstone"],
    transparency: "Transparent to Opaque",
    phenomena: "Labradorescence; aventurescence; chatoyancy (rare)",
    fluorescence: "LW: inert to weak",
    pleochroism: "Weak",
    comments: "Labradorescence often blue to green. Spectrolite shows full spectrum of colors."
  },
  {
    name: "Quartz",
    group: "",
    ri: { norm: 1.544, min: 1.544, max: 1.553 },
    birefringence: { norm: 0.009, min: 0.009, max: 0.009 },
    optic: "DR",
    crystalSystem: "Trigonal",
    sg: { norm: 2.66, min: 2.64, max: 2.69 },
    hardness: { min: 7.0, max: 7.0 },
    colors: ["violet", "yellow", "pink", "brown", "white", "gray", "green", "orange"],
    varieties: ["Amethyst", "Citrine", "Rose Quartz", "Smoky Quartz", "Praseolite", "Ametrine", "Rock Crystal", "Tiger's Eye"],
    transparency: "Transparent to Opaque",
    phenomena: "Asterism; aventurescence; chatoyancy; iridescence",
    fluorescence: "LW: inert to weak",
    pleochroism: "Weak (Amethyst)",
    comments: "Bull's eye optic figure. Extremely wide variety of forms and varieties."
  },
  {
    name: "Iolite (Cordierite)",
    group: "",
    ri: { norm: 1.542, min: 1.531, max: 1.551 },
    birefringence: { norm: 0.008, min: 0.008, max: 0.012 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 2.61, min: 2.56, max: 2.66 },
    hardness: { min: 7.0, max: 7.5 },
    colors: ["blue", "violet", "gray", "yellow"],
    varieties: [],
    transparency: "Transparent to Translucent",
    phenomena: "Aventurescence; chatoyancy (rare); very strong trichroism",
    fluorescence: "LW & SW: inert",
    pleochroism: "Very strong trichroism (visible with naked eye)",
    comments: "Strong trichroism visible to naked eye. Confused with Amethyst and Scapolite. Also called 'water sapphire'."
  },
  {
    name: "Scapolite",
    group: "",
    ri: { norm: 1.544, min: 1.529, max: 1.560 },
    birefringence: { norm: 0.004, min: 0.004, max: 0.037 },
    optic: "DR",
    crystalSystem: "Tetragonal",
    sg: { norm: 2.65, min: 2.56, max: 2.74 },
    hardness: { min: 5.5, max: 6.5 },
    colors: ["yellow", "pink", "violet", "white", "orange"],
    varieties: [],
    transparency: "Transparent to Translucent",
    phenomena: "Chatoyancy",
    fluorescence: "LW & SW: inert to strong",
    pleochroism: "Moderate",
    comments: "Confused with Amethyst and Iolite. Cat's eye scapolite is well-known."
  },
  {
    name: "Amber",
    group: "Organic",
    ri: { norm: 1.540, min: 1.539, max: 1.545 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Amorphous",
    sg: { norm: 1.08, min: 1.00, max: 1.10 },
    hardness: { min: 2.0, max: 2.5 },
    colors: ["yellow", "orange", "brown", "red", "green", "white"],
    varieties: ["Baltic Amber", "Dominican Amber", "Copal"],
    transparency: "Transparent to Opaque",
    phenomena: "Resinous luster; aventurescence",
    fluorescence: "LW: inert to strong; SW: weaker",
    pleochroism: "None",
    comments: "Flow lines, gas bubbles, small organisms. Organic material — fossilized tree resin. Floats in salt water."
  },
  {
    name: "Chalcedony",
    group: "Quartz",
    ri: { norm: 1.535, min: 1.530, max: 1.539 },
    birefringence: { norm: 0.004, min: 0.000, max: 0.009 },
    optic: "AGG",
    crystalSystem: "Trigonal",
    sg: { norm: 2.60, min: 2.55, max: 2.70 },
    hardness: { min: 6.5, max: 7.0 },
    colors: ["blue", "green", "red", "orange", "yellow", "brown", "white", "black", "gray", "pink"],
    varieties: ["Chrysoprase", "Cornelian", "Heliotrope", "Onyx", "Agate", "Jasper", "Sardonyx", "Sard", "Moss Agate"],
    transparency: "Semi-transparent to Opaque",
    phenomena: "Iridescence",
    fluorescence: "LW & SW: inert to moderate",
    pleochroism: "None",
    comments: "Microcrystalline quartz. Huge variety of trade names based on color and pattern."
  },
  {
    name: "Oligoclase",
    group: "Feldspar",
    ri: { norm: 1.532, min: 1.526, max: 1.547 },
    birefringence: { norm: 0.010, min: 0.010, max: 0.010 },
    optic: "DR",
    crystalSystem: "Triclinic",
    sg: { norm: 2.64, min: 2.62, max: 2.67 },
    hardness: { min: 6.0, max: 6.5 },
    colors: ["orange", "red", "yellow", "green", "white"],
    varieties: ["Sunstone", "Aventurine Feldspar"],
    transparency: "Transparent to Opaque",
    phenomena: "Aventurescence; chatoyancy",
    fluorescence: "LW & SW: inert to weak",
    pleochroism: "Weak",
    comments: "Sunstone: red to orange with platy inclusions creating aventurescence."
  },
  {
    name: "Microcline",
    group: "Feldspar",
    ri: { norm: 1.522, min: 1.518, max: 1.530 },
    birefringence: { norm: 0.008, min: 0.008, max: 0.008 },
    optic: "DR",
    crystalSystem: "Triclinic",
    sg: { norm: 2.56, min: 2.54, max: 2.58 },
    hardness: { min: 6.0, max: 6.5 },
    colors: ["green", "blue", "white"],
    varieties: ["Amazonite"],
    transparency: "Translucent to Opaque",
    phenomena: "Grid-like surface, often with sheen",
    fluorescence: "LW: inert to weak; SW: inert",
    pleochroism: "None",
    comments: "Amazonite: green to green-blue, opaque. Grid-like twinning visible."
  },
  {
    name: "Orthoclase",
    group: "Feldspar",
    ri: { norm: 1.518, min: 1.508, max: 1.526 },
    birefringence: { norm: 0.005, min: 0.005, max: 0.008 },
    optic: "DR",
    crystalSystem: "Monoclinic",
    sg: { norm: 2.58, min: 2.55, max: 2.61 },
    hardness: { min: 6.0, max: 6.5 },
    colors: ["white", "yellow", "orange", "pink", "green"],
    varieties: ["Moonstone", "Yellow Orthoclase"],
    transparency: "Transparent to Semi-translucent",
    phenomena: "Adularescence; chatoyancy; asterism (rare)",
    fluorescence: "LW & SW: inert to weak",
    pleochroism: "Weak",
    comments: "Moonstone: adularescence (blue sheen). Vitreous to pearly luster."
  },
  {
    name: "Lapis Lazuli",
    group: "",
    ri: { norm: 1.500, min: 1.500, max: 1.670 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "AGG",
    crystalSystem: "Cubic (Lazurite)",
    sg: { norm: 2.75, min: 2.50, max: 3.00 },
    hardness: { min: 5.0, max: 6.0 },
    colors: ["blue", "violet"],
    varieties: [],
    transparency: "Semi-translucent to Opaque",
    phenomena: "",
    fluorescence: "LW & SW: inert to moderate",
    pleochroism: "None",
    comments: "Pyrite inclusions, spots & veins of Calcite. Rock composed of Lazurite, Calcite, Pyrite."
  },
  {
    name: "Obsidian",
    group: "Natural Glass",
    ri: { norm: 1.490, min: 1.480, max: 1.510 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Amorphous",
    sg: { norm: 2.40, min: 2.33, max: 2.50 },
    hardness: { min: 5.0, max: 5.5 },
    colors: ["black", "brown", "gray", "green"],
    varieties: ["Snowflake Obsidian", "Rainbow Obsidian", "Mahogany Obsidian", "Apache Tear"],
    transparency: "Transparent to Opaque",
    phenomena: "Iridescence; chatoyancy (rare)",
    fluorescence: "Inert",
    pleochroism: "None",
    comments: "Torpedo shaped gas bubbles. Snowflake: black + white patches. Rainbow: iridescent colors. Volcanic glass."
  },
  {
    name: "Moldavite",
    group: "Natural Glass",
    ri: { norm: 1.490, min: 1.480, max: 1.510 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Amorphous",
    sg: { norm: 2.36, min: 2.32, max: 2.40 },
    hardness: { min: 5.5, max: 5.5 },
    colors: ["green"],
    varieties: [],
    transparency: "Transparent to Semi-transparent",
    phenomena: "",
    fluorescence: "LW & SW: inert",
    pleochroism: "None",
    comments: "Spherical or elongated gas bubbles, swirl striae. Tektite — formed by meteorite impact."
  },
  {
    name: "Calcite",
    group: "",
    ri: { norm: 1.486, min: 1.486, max: 1.658 },
    birefringence: { norm: 0.172, min: 0.172, max: 0.172 },
    optic: "DR",
    crystalSystem: "Trigonal",
    sg: { norm: 2.70, min: 2.65, max: 2.75 },
    hardness: { min: 3.0, max: 3.0 },
    colors: ["white", "yellow", "orange", "pink", "green", "blue"],
    varieties: ["Iceland Spar"],
    transparency: "Transparent to Opaque",
    phenomena: "Extreme doubling",
    fluorescence: "LW & SW: inert to moderate",
    pleochroism: "None",
    comments: "Extreme doubling visible. Massive variety often dyed green. Effervesces in HCl."
  },
  {
    name: "Coral (Calcareous)",
    group: "Organic",
    ri: { norm: 1.486, min: 1.486, max: 1.658 },
    birefringence: { norm: 0.172, min: 0.172, max: 0.172 },
    optic: "AGG",
    crystalSystem: "Trigonal (CaCO₃)",
    sg: { norm: 2.65, min: 2.60, max: 2.70 },
    hardness: { min: 3.5, max: 4.0 },
    colors: ["red", "pink", "orange", "white"],
    varieties: ["Precious Coral", "Angel Skin Coral"],
    transparency: "Semi-translucent to Opaque",
    phenomena: "Wavy parallel fibrous structure",
    fluorescence: "LW & SW: inert to strong",
    pleochroism: "None",
    comments: "Confused with shell. Cavities from polyps. Acetone may detect dye. Organic material."
  },
  {
    name: "Sodalite",
    group: "",
    ri: { norm: 1.483, min: 1.480, max: 1.486 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 2.25, min: 2.15, max: 2.35 },
    hardness: { min: 5.0, max: 6.0 },
    colors: ["blue", "violet", "gray", "white"],
    varieties: ["Hackmanite"],
    transparency: "Semi-transparent to Opaque",
    phenomena: "Commonly resembles Lapis Lazuli",
    fluorescence: "LW & SW: inert to weak",
    pleochroism: "None",
    comments: "Grainy texture, white calcite patches & veins. No pyrite (unlike Lapis). Hackmanite: tenebrescence."
  },
  {
    name: "Opal",
    group: "",
    ri: { norm: 1.450, min: 1.370, max: 1.470 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Amorphous",
    sg: { norm: 2.15, min: 1.25, max: 2.23 },
    hardness: { min: 5.0, max: 6.5 },
    colors: ["white", "black", "orange", "red", "yellow", "green", "blue"],
    varieties: ["Fire Opal", "Black Opal", "White Opal", "Boulder Opal", "Crystal Opal", "Matrix Opal"],
    transparency: "Transparent to Opaque",
    phenomena: "Play of color; chatoyancy (rare)",
    fluorescence: "LW & SW: inert to strong",
    pleochroism: "None",
    comments: "Many varieties. Fire Opal: transparent to semi-transparent. Play of color caused by diffraction from silica spheres."
  },
  {
    name: "Glass (Man-Made)",
    group: "Simulant",
    ri: { norm: 1.470, min: 1.470, max: 1.900 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Amorphous",
    sg: { norm: 3.00, min: 2.30, max: 4.50 },
    hardness: { min: 5.0, max: 6.0 },
    colors: ["red", "blue", "green", "yellow", "orange", "violet", "pink", "brown", "white", "black", "gray"],
    varieties: [],
    transparency: "Transparent to Opaque",
    phenomena: "Asterism; adularescence; aventurescence; chatoyancy; color change; iridescence; play of color",
    fluorescence: "LW & SW: inert to strong",
    pleochroism: "None",
    comments: "All colors, transparent to opaque, gas bubbles, rounded facet junctions. ADR. Used to imitate almost any gem."
  },
  {
    name: "Plastic",
    group: "Simulant",
    ri: { norm: 1.460, min: 1.460, max: 1.700 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Amorphous",
    sg: { norm: 1.30, min: 1.05, max: 1.55 },
    hardness: { min: 1.5, max: 3.0 },
    colors: ["red", "blue", "green", "yellow", "orange", "violet", "pink", "brown", "white", "black"],
    varieties: [],
    transparency: "Transparent to Opaque",
    phenomena: "Asterism; adularescence; aventurescence; chatoyancy; play of color",
    fluorescence: "LW & SW: inert to strong",
    pleochroism: "None",
    comments: "Strong ADR, rounded facet junctions. Warm to touch. Very low SG."
  },
  {
    name: "Fluorite",
    group: "",
    ri: { norm: 1.434, min: 1.433, max: 1.435 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 3.18, min: 3.00, max: 3.25 },
    hardness: { min: 4.0, max: 4.0 },
    colors: ["violet", "blue", "green", "yellow", "pink", "white", "orange", "brown"],
    varieties: ["Blue John"],
    transparency: "Transparent to Translucent",
    phenomena: "Color change possible",
    fluorescence: "LW: inert to strong; SW: weaker",
    pleochroism: "None",
    comments: "Common parallel color banding, 2-3 phase inclusions. Perfect octahedral cleavage. Word 'fluorescence' named after Fluorite."
  },
  // Additional gems not in the original chart
  {
    name: "Tanzanite",
    group: "Zoisite",
    ri: { norm: 1.691, min: 1.685, max: 1.700 },
    birefringence: { norm: 0.008, min: 0.008, max: 0.013 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 3.35, min: 3.10, max: 3.38 },
    hardness: { min: 6.5, max: 7.0 },
    colors: ["blue", "violet", "pink"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "Very strong trichroism (blue, violet, burgundy)",
    fluorescence: "LW & SW: inert",
    pleochroism: "Very strong trichroism",
    comments: "Heat treated to enhance blue-violet color. Found only in Tanzania near Mt. Kilimanjaro."
  },
  {
    name: "Alexandrite",
    group: "Chrysoberyl",
    ri: { norm: 1.746, min: 1.744, max: 1.755 },
    birefringence: { norm: 0.008, min: 0.008, max: 0.010 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 3.73, min: 3.71, max: 3.75 },
    hardness: { min: 8.5, max: 8.5 },
    colors: ["green", "red", "yellow"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "Color change: green in daylight, red in incandescent light",
    fluorescence: "LW: weak red",
    pleochroism: "Strong trichroism (green, orange-yellow, purplish red)",
    comments: "One of the rarest and most valuable gemstones. Color change is diagnostic. Sources: Russia, Brazil, Sri Lanka."
  },
  {
    name: "Garnet (Color-Change)",
    group: "Garnet",
    ri: { norm: 1.770, min: 1.740, max: 1.790 },
    birefringence: { norm: 0, min: 0, max: 0 },
    optic: "SR",
    crystalSystem: "Cubic",
    sg: { norm: 3.80, min: 3.65, max: 3.95 },
    hardness: { min: 7.0, max: 7.5 },
    colors: ["blue", "green", "red", "violet"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "Color change (often blue-green to red/purple)",
    fluorescence: "LW & SW: variable",
    pleochroism: "None",
    comments: "Pyrope-spessartite mixture. Color change from blue-green in daylight to red-purple in incandescent."
  },
  {
    name: "Paraíba Tourmaline",
    group: "Tourmaline",
    ri: { norm: 1.624, min: 1.615, max: 1.644 },
    birefringence: { norm: 0.018, min: 0.018, max: 0.040 },
    optic: "DR",
    crystalSystem: "Trigonal",
    sg: { norm: 3.06, min: 3.00, max: 3.12 },
    hardness: { min: 7.0, max: 7.5 },
    colors: ["blue", "green"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "Neon electric blue-green color due to copper",
    fluorescence: "LW & SW: weak to moderate",
    pleochroism: "Moderate",
    comments: "Copper-bearing elbaite. Originally from Paraíba, Brazil. Neon blue-green color is distinctive. Among most valuable tourmalines."
  },
  {
    name: "Taaffeite",
    group: "",
    ri: { norm: 1.719, min: 1.717, max: 1.724 },
    birefringence: { norm: 0.004, min: 0.004, max: 0.009 },
    optic: "DR",
    crystalSystem: "Hexagonal",
    sg: { norm: 3.61, min: 3.60, max: 3.62 },
    hardness: { min: 8.0, max: 8.5 },
    colors: ["violet", "pink", "red", "blue"],
    varieties: ["Musgravite"],
    transparency: "Transparent",
    phenomena: "",
    fluorescence: "LW: weak green; SW: weak yellow-green",
    pleochroism: "Weak",
    comments: "Extremely rare. Often confused with Spinel. Birefringence is key identifier (Spinel is SR, Taaffeite is DR)."
  },
  {
    name: "Painite",
    group: "",
    ri: { norm: 1.787, min: 1.787, max: 1.816 },
    birefringence: { norm: 0.029, min: 0.027, max: 0.029 },
    optic: "DR",
    crystalSystem: "Hexagonal",
    sg: { norm: 4.01, min: 4.00, max: 4.03 },
    hardness: { min: 8.0, max: 8.0 },
    colors: ["red", "brown", "orange"],
    varieties: [],
    transparency: "Transparent",
    phenomena: "",
    fluorescence: "LW: weak red",
    pleochroism: "Moderate",
    comments: "Once considered the rarest mineral in the world. Found primarily in Myanmar."
  },
  {
    name: "Seraphinite",
    group: "Clinochlore",
    ri: { norm: 1.576, min: 1.571, max: 1.599 },
    birefringence: { norm: 0.008, min: 0.006, max: 0.011 },
    optic: "AGG",
    crystalSystem: "Monoclinic",
    sg: { norm: 2.65, min: 2.55, max: 2.75 },
    hardness: { min: 2.0, max: 4.0 },
    colors: ["green"],
    varieties: [],
    transparency: "Translucent to Opaque",
    phenomena: "Feathery chatoyant patterns (angel wing pattern)",
    fluorescence: "Inert",
    pleochroism: "None",
    comments: "Fibrous chatoyant pattern creates feather or angel-wing effect. Found in Siberia."
  },
  {
    name: "Sugilite",
    group: "",
    ri: { norm: 1.607, min: 1.600, max: 1.610 },
    birefringence: { norm: 0, min: 0, max: 0.003 },
    optic: "AGG",
    crystalSystem: "Hexagonal",
    sg: { norm: 2.74, min: 2.68, max: 2.80 },
    hardness: { min: 5.5, max: 6.5 },
    colors: ["violet", "pink"],
    varieties: ["Gel Sugilite", "Royal Azel"],
    transparency: "Translucent to Opaque",
    phenomena: "",
    fluorescence: "Inert",
    pleochroism: "None",
    comments: "Manganese-rich cyclosilicate. Vivid purple color. Often found with manganese ores."
  },
  {
    name: "Charoite",
    group: "",
    ri: { norm: 1.550, min: 1.540, max: 1.559 },
    birefringence: { norm: 0, min: 0, max: 0.009 },
    optic: "AGG",
    crystalSystem: "Monoclinic",
    sg: { norm: 2.68, min: 2.54, max: 2.78 },
    hardness: { min: 5.0, max: 6.0 },
    colors: ["violet", "pink"],
    varieties: [],
    transparency: "Translucent to Opaque",
    phenomena: "Chatoyant swirling patterns",
    fluorescence: "LW: weak to moderate",
    pleochroism: "None",
    comments: "Found only along the Chara River, Siberia. Swirling purple patterns with white, gray, and black inclusions."
  },
  {
    name: "Larimar",
    group: "Pectolite",
    ri: { norm: 1.603, min: 1.595, max: 1.645 },
    birefringence: { norm: 0.030, min: 0.027, max: 0.036 },
    optic: "AGG",
    crystalSystem: "Triclinic",
    sg: { norm: 2.84, min: 2.74, max: 2.90 },
    hardness: { min: 4.5, max: 5.0 },
    colors: ["blue", "white", "green"],
    varieties: [],
    transparency: "Translucent to Opaque",
    phenomena: "",
    fluorescence: "LW: weak",
    pleochroism: "None",
    comments: "Blue variety of pectolite. Found only in the Dominican Republic. Volcanic origin. Often has white veining."
  },
  {
    name: "Prehnite",
    group: "",
    ri: { norm: 1.616, min: 1.611, max: 1.649 },
    birefringence: { norm: 0.021, min: 0.021, max: 0.033 },
    optic: "DR",
    crystalSystem: "Orthorhombic",
    sg: { norm: 2.87, min: 2.82, max: 2.95 },
    hardness: { min: 6.0, max: 6.5 },
    colors: ["green", "yellow"],
    varieties: [],
    transparency: "Transparent to Translucent",
    phenomena: "",
    fluorescence: "LW & SW: inert",
    pleochroism: "None",
    comments: "Botryoidal habit common. Often has black tourmaline or epidote inclusions. Translucent glow is distinctive."
  },
  {
    name: "Howlite",
    group: "",
    ri: { norm: 1.586, min: 1.583, max: 1.605 },
    birefringence: { norm: 0.019, min: 0.019, max: 0.022 },
    optic: "AGG",
    crystalSystem: "Monoclinic",
    sg: { norm: 2.53, min: 2.45, max: 2.58 },
    hardness: { min: 3.5, max: 3.5 },
    colors: ["white", "gray"],
    varieties: [],
    transparency: "Opaque",
    phenomena: "Gray veining pattern",
    fluorescence: "SW: moderate orange",
    pleochroism: "None",
    comments: "Often dyed to imitate Turquoise or Lapis Lazuli. White with gray/black veining. Very porous."
  }
];

/**
 * SPECTROSCOPY_DB
 * Comprehensive UV-Vis absorption spectroscopy database
 * Source: Anderson & Payne, "The Spectroscope and Gemmology" (280 chapters)
 * + GIA Scientific Literature & Raman / FTIR / PL data
 *
 * Keyed by gem name (must match GEMSTONES[].name exactly).
 * Each entry: { lines, bands, chromophore, bookRef, description }
 *  lines      : number[]  — characteristic absorption wavelengths (nm), 400–700
 *  bands      : Array<{ start:number, end:number, strength:string }> — broad absorption regions
 *  chromophore: string    — causative ion / color center
 *  bookRef    : string    — chapter in Anderson & Payne
 *  description: string    — plain-language spectral summary
 */
const SPECTROSCOPY_DB = {

  // ─────────────────────────────────────────────
  //  CORUNDUM
  // ─────────────────────────────────────────────
  "Corundum": {
    lines: [693.5, 668, 659, 476, 468, 450, 460, 471],
    bands: [{ start: 620, end: 540, strength: "Broad chromium/iron absorption" }],
    chromophore: "Cr³⁺ (ruby) / Fe²⁺·Fe³⁺ (sapphire)",
    bookRef: "Ch. 11 & 26: Ruby and Sapphire Spectra",
    description: "Red corundum (ruby) shows chromium doublet at 693.5nm and 659nm; blue sapphire shows iron triplet at 450, 460, 471nm."
  },
  "Syn. Corundum": {
    lines: [693.5, 668, 659, 476, 468],
    bands: [{ start: 620, end: 540, strength: "Intense chromium absorption" }],
    chromophore: "Cr³⁺ (synthetic, high purity)",
    bookRef: "Ch. 36: Synthetic Gemstones",
    description: "Spectrum identical to natural ruby but with hyper-intense fluorescence doublet due to very pure chromium in Verneuil material."
  },

  // ─────────────────────────────────────────────
  //  GARNET GROUP
  // ─────────────────────────────────────────────
  "Almandite": {
    lines: [504, 520, 573, 610, 680],
    bands: [
      { start: 495, end: 515, strength: "Intense — 504nm diagnostic" },
      { start: 515, end: 530, strength: "Moderate — 520nm" },
      { start: 565, end: 582, strength: "Moderate — 573nm" }
    ],
    chromophore: "Fe²⁺ (ferrous iron)",
    bookRef: "Ch. 19: Almandine Garnet",
    description: "Classic iron triplet at 504nm (intense), 520nm, and 573nm — the most diagnostic almandine spectrum."
  },
  "Spessartite": {
    lines: [485, 461, 505, 434],
    bands: [
      { start: 475, end: 495, strength: "Strong — 485nm Mn band" },
      { start: 455, end: 468, strength: "Moderate — 461nm" }
    ],
    chromophore: "Mn²⁺ (manganese)",
    bookRef: "Ch. 29: Manganese Spectra",
    description: "Distinctive manganese bands at 485nm and 461nm in the blue, often with faint almandine lines at 505nm."
  },
  "Pyrope": {
    lines: [685, 620, 575, 505],
    bands: [
      { start: 555, end: 625, strength: "Broad — chromium/iron absorption band" }
    ],
    chromophore: "Cr³⁺ + Fe²⁺",
    bookRef: "Ch. 13: Pyrope and Topaz",
    description: "Broad absorption band in yellow-green; chrome pyropes show faint red doublet near 685nm."
  },
  "Rhodolite": {
    lines: [504, 520, 573, 685],
    bands: [
      { start: 495, end: 515, strength: "Moderate — iron band at 504nm" },
      { start: 555, end: 620, strength: "Broad iron-chromium" }
    ],
    chromophore: "Fe²⁺ + Cr³⁺ (mixed pyrope-almandine)",
    bookRef: "Ch. 13 & 19: Pyrope/Almandine composite",
    description: "Mixed spectrum of pyrope and almandine; 504nm line present but usually weaker than pure almandine."
  },
  "Grossularite": {
    lines: [605, 505, 437],
    bands: [
      { start: 595, end: 615, strength: "Faint Mn band" },
      { start: 430, end: 442, strength: "Hessonite: Mn/Fe cutoff" }
    ],
    chromophore: "Mn³⁺ (Hessonite) / V³⁺ + Cr³⁺ (Tsavorite)",
    bookRef: "Ch. 18: Other Chromium Spectra / Ch. 29: Manganese",
    description: "Tsavorite shows chromium spectrum; hessonite shows manganese absorption near 437nm and a faint band at 605nm."
  },
  "Andradite": {
    lines: [701, 640, 621, 443],
    bands: [
      { start: 435, end: 450, strength: "Intense — ferric iron cutoff" }
    ],
    chromophore: "Cr³⁺ (demantoid) / Fe³⁺",
    bookRef: "Ch. 17: Demantoid Garnet / Ch. 28: Andradite & Epidote",
    description: "Demantoid variety: chromium doublet at 701nm, diffuse bands at 640/621nm, and diagnostic ferric absorption/cutoff at 443nm."
  },

  // ─────────────────────────────────────────────
  //  BERYL FAMILY
  // ─────────────────────────────────────────────
  "Emerald": {
    lines: [683, 680, 637, 600, 477],
    bands: [
      { start: 625, end: 595, strength: "Broad — orange absorption band" },
      { start: 470, end: 483, strength: "Moderate — blue band at 477nm" }
    ],
    chromophore: "Cr³⁺ (chromium)",
    bookRef: "Ch. 14: Emerald Spectrum",
    description: "Chromium doublet in red (683nm, 680nm), absorption line at 637nm, broad orange band at 600nm, and 477nm blue line."
  },
  "Aquamarine": {
    lines: [537, 456, 427],
    bands: [
      { start: 530, end: 543, strength: "Faint — E-ray line at 537nm" },
      { start: 450, end: 463, strength: "Moderate — Fe²⁺ band at 456nm" }
    ],
    chromophore: "Fe²⁺·Fe³⁺ (iron charge transfer)",
    bookRef: "Ch. 27: Aquamarine and Orthoclase",
    description: "Faint 537nm line (extraordinary ray only), iron bands at 456nm and 427nm. Spectrum used to distinguish from blue topaz."
  },

  // ─────────────────────────────────────────────
  //  SPINEL
  // ─────────────────────────────────────────────
  "Spinel": {
    lines: [685, 682, 540, 458, 478, 500],
    bands: [
      { start: 680, end: 687, strength: "Red spinel: organ-pipe fluorescent group" },
      { start: 520, end: 560, strength: "Red spinel: broad green absorption" },
      { start: 445, end: 505, strength: "Blue spinel: cobalt triplet" }
    ],
    chromophore: "Cr³⁺ (red) / Co²⁺ (blue)",
    bookRef: "Ch. 12: Red Spinel / Ch. 20: Blue Spinel",
    description: "Red spinel: diagnostic organ-pipe group at 685/682nm. Blue natural spinel: cobalt triple bands at 458, 478, 500nm."
  },

  // ─────────────────────────────────────────────
  //  CHRYSOBERYL & ALEXANDRITE
  // ─────────────────────────────────────────────
  "Chrysoberyl": {
    lines: [680, 665, 655, 645, 505, 475],
    bands: [
      { start: 580, end: 620, strength: "Alexandrite: broad chromium absorption in red incandescent" },
      { start: 475, end: 510, strength: "Alexandrite: broad absorption in yellow-green" }
    ],
    chromophore: "Cr³⁺ (alexandrite variety)",
    bookRef: "Ch. 26: Sapphire and Chrysoberyl",
    description: "Alexandrite variety shows a fine chromium group at 680nm, 665nm, 655nm plus broad bands at 580nm and 475-510nm causing the famous color change."
  },

  // ─────────────────────────────────────────────
  //  DIAMOND
  // ─────────────────────────────────────────────
  "Diamond": {
    lines: [415.5, 478, 504, 594, 694],
    bands: [
      { start: 410, end: 420, strength: "Cape: N3 center at 415.5nm" },
      { start: 500, end: 508, strength: "H3 center (HPHT treated)" }
    ],
    chromophore: "N3 nitrogen (cape) / H3 center (HPHT) / radiation centers",
    bookRef: "Ch. 34: Diamond Spectra / PL at 77K",
    description: "Cape diamonds: diagnostic N3 line at 415.5nm + lines at 478nm and 504nm. Irradiated diamonds: 694nm line. HPHT treated: H3 at 503nm."
  },

  // ─────────────────────────────────────────────
  //  ZIRCON
  // ─────────────────────────────────────────────
  "Zircon": {
    lines: [653, 615, 589, 562, 537, 516, 484, 460, 432],
    bands: [
      { start: 648, end: 658, strength: "Intense — key 653nm uranium/REE line" }
    ],
    chromophore: "U⁴⁺ / Th⁴⁺ + rare earth elements",
    bookRef: "Ch. 32: Zircon Spectra",
    description: "Rich comb-like spectrum with dozens of fine lines. Key diagnostic line at 653nm. High zircon shows up to 40+ lines; metamict low zircon shows diffuse band only."
  },

  // ─────────────────────────────────────────────
  //  JADEITE / NEPHRITE
  // ─────────────────────────────────────────────
  "Jadeite": {
    lines: [437.5, 450, 630, 690],
    bands: [
      { start: 432, end: 443, strength: "Diagnostic — Fe³⁺ at 437.5nm" },
      { start: 620, end: 700, strength: "Chromium jadeite: red band" }
    ],
    chromophore: "Fe³⁺ (green jadeite) / Cr³⁺ (imperial green)",
    bookRef: "Ch. 16: Jadeite Spectrum",
    description: "Diagnostic ferric iron line at 437.5nm. Imperial green jadeite (chrome) shows chromium doublet in red. Raman: 700, 1039 cm⁻¹."
  },
  "Nephrite": {
    lines: [460, 498, 689],
    bands: [
      { start: 455, end: 470, strength: "Moderate — Fe²⁺ at 460nm" }
    ],
    chromophore: "Fe²⁺ (actinolite iron)",
    bookRef: "Ch. 25: Idocrase, Actinolite, Serpentine",
    description: "Nephrite (calcium magnesium actinolite) shows iron absorption at 460nm and 498nm. Raman: 675, 1061 cm⁻¹ distinguishes from jadeite."
  },

  // ─────────────────────────────────────────────
  //  TOURMALINE
  // ─────────────────────────────────────────────
  "Tourmaline": {
    lines: [525, 537, 458],
    bands: [
      { start: 515, end: 545, strength: "Rubellite: Mn broad band 525nm" },
      { start: 450, end: 465, strength: "Indicolite: iron absorption" }
    ],
    chromophore: "Mn³⁺ (rubellite) / Fe²⁺·Fe³⁺ (indicolite) / Cr³⁺ (chrome tourmaline)",
    bookRef: "Ch. 24: Green Tourmaline and Iolite",
    description: "Green tourmaline: iron bands at 497nm. Rubellite (red): broad Mn band at 525nm with 537nm line. Chrome tourmaline: chromium spectrum."
  },

  // ─────────────────────────────────────────────
  //  PERIDOT
  // ─────────────────────────────────────────────
  "Peridot": {
    lines: [493, 473, 453],
    bands: [
      { start: 448, end: 460, strength: "Intense — 453nm" },
      { start: 468, end: 478, strength: "Intense — 473nm" },
      { start: 488, end: 498, strength: "Intense — 493nm" }
    ],
    chromophore: "Fe²⁺ (ferrous iron)",
    bookRef: "Ch. 21: Peridot and Sinhalite",
    description: "Diagnostic trio of fine iron absorption lines at 453nm, 473nm, and 493nm in the blue-green. All three lines together are unique to peridot."
  },

  // ─────────────────────────────────────────────
  //  TOPAZ
  // ─────────────────────────────────────────────
  "Topaz": {
    lines: [],
    bands: [],
    chromophore: "Color centers / Cr³⁺ (pink Imperial topaz) / Fe³⁺ (yellow)",
    bookRef: "Ch. 13: Pyrope and Topaz",
    description: "Colorless and blue topaz generally show no diagnostic absorption. Pink Imperial topaz may show faint chromium lines. Yellow: faint Fe³⁺."
  },

  // ─────────────────────────────────────────────
  //  SPHENE (TITANITE)
  // ─────────────────────────────────────────────
  "Sphene (Titanite)": {
    lines: [585, 572, 532],
    bands: [
      { start: 565, end: 595, strength: "Rare earth sharp comb — 585nm, 572nm" }
    ],
    chromophore: "Nd³⁺ / Pr³⁺ (rare earth elements)",
    bookRef: "Ch. 33: Rare Earth Elements",
    description: "Sharp rare-earth doublet around 572–585nm (didymium-like). Some green sphenes also show iron bands."
  },

  // ─────────────────────────────────────────────
  //  APATITE
  // ─────────────────────────────────────────────
  "Apatite": {
    lines: [512, 491, 464, 585, 572, 578],
    bands: [
      { start: 580, end: 590, strength: "Yellow apatite: Nd/Pr REE lines" }
    ],
    chromophore: "Nd³⁺ + Pr³⁺ (yellow) / Mn²⁺ (green) / color centers (blue)",
    bookRef: "Ch. 33: Rare Earth Elements",
    description: "Yellow and green apatites show sharp rare-earth 'comb' lines near 578–585nm. Blue apatite shows Mn²⁺ band at 512nm."
  },

  // ─────────────────────────────────────────────
  //  DEMANTOID (separate entry)
  // ─────────────────────────────────────────────
  "Demantoid": {
    lines: [701, 640, 621, 443],
    bands: [
      { start: 435, end: 450, strength: "Intense ferric iron cutoff below 443nm" }
    ],
    chromophore: "Cr³⁺ + Fe³⁺",
    bookRef: "Ch. 17: Demantoid Garnet",
    description: "Chromium doublet at 701nm, diffuse bands at 640nm and 621nm, plus intense ferric iron cutoff/line at 443nm. Very distinctive."
  },

  // ─────────────────────────────────────────────
  //  ALEXANDRITE (separate entry)
  // ─────────────────────────────────────────────
  "Alexandrite": {
    lines: [680.5, 678.5, 665, 655, 645, 475, 468],
    bands: [
      { start: 580, end: 630, strength: "Broad Cr³⁺ band (orange/red incandescent)" },
      { start: 468, end: 508, strength: "Broad Cr³⁺ band (green daylight)" }
    ],
    chromophore: "Cr³⁺ (chromium — balanced crystal field)",
    bookRef: "Ch. 15: Alexandrite Spectrum",
    description: "Alexandrite's unique color change caused by two broad Cr³⁺ bands straddling the yellow-green. Sharp doublet at 680.5/678.5nm + multiple fine lines. Most distinctive spectrum in gemology."
  },

  // ─────────────────────────────────────────────
  //  RUBY (separate entry for Corundum variety)
  // ─────────────────────────────────────────────
  "Ruby": {
    lines: [693.5, 668, 659, 476, 468],
    bands: [
      { start: 620, end: 540, strength: "Broad — yellow-green chromium absorption" }
    ],
    chromophore: "Cr³⁺ (chromium)",
    bookRef: "Ch. 11: Ruby Spectrum",
    description: "Strong chromium fluorescence doublet at 693.5nm. Finer lines at 668nm and 659nm. Violet doublet at 476nm and 468nm. Broad yellow-green absorption."
  },

  // ─────────────────────────────────────────────
  //  SAPPHIRE (Blue)
  // ─────────────────────────────────────────────
  "Sapphire": {
    lines: [450, 460, 471],
    bands: [
      { start: 445, end: 478, strength: "Fe²⁺·Ti⁴⁺ charge transfer triplet" }
    ],
    chromophore: "Fe²⁺·Ti⁴⁺ charge transfer + Fe³⁺",
    bookRef: "Ch. 26: Sapphire and Chrysoberyl",
    description: "Diagnostic iron triplet at 450nm (strongest), 460nm, and 471nm. The 450nm line alone is nearly conclusive for natural blue sapphire origin."
  },

  // ─────────────────────────────────────────────
  //  COBALT-BLUE GLASS
  // ─────────────────────────────────────────────
  "Cobalt Glass": {
    lines: [656, 589, 534],
    bands: [
      { start: 645, end: 665, strength: "Cobalt — broad band at 656nm" },
      { start: 580, end: 598, strength: "Cobalt — band at 589nm" },
      { start: 525, end: 542, strength: "Cobalt — band at 534nm (narrower)" }
    ],
    chromophore: "Co²⁺ (cobalt)",
    bookRef: "Ch. 37: Glasses Spectra",
    description: "Three broad cobalt bands at 656nm, 589nm, and 534nm. The central 589nm band is broader than in natural blue spinel, the 534nm band narrower."
  },

  // ─────────────────────────────────────────────
  //  DIDYMIUM GLASS
  // ─────────────────────────────────────────────
  "Didymium Glass": {
    lines: [586, 582, 573, 521, 491],
    bands: [
      { start: 575, end: 590, strength: "Very sharp — Nd³⁺/Pr³⁺ narrow lines" }
    ],
    chromophore: "Nd³⁺ + Pr³⁺ (neodymium/praseodymium rare earths)",
    bookRef: "Ch. 37: Glasses Spectra / Ch. 33: Rare Earth Elements",
    description: "Extremely fine, sharp comb-like lines near 586nm, 582nm, 573nm (and more in UV region). Considered the 'soap line' standard for spectroscope calibration."
  },

  // ─────────────────────────────────────────────
  //  RHODONITE
  // ─────────────────────────────────────────────
  "Rhodonite": {
    lines: [545, 503],
    bands: [
      { start: 535, end: 555, strength: "Mn²⁺ broad band at 545nm" }
    ],
    chromophore: "Mn²⁺ (manganese)",
    bookRef: "Ch. 29: Manganese Spectra",
    description: "Broad manganese absorption band centered near 545nm. Faint line at 503nm. Spectrum similar to rhodochrosite."
  },

  // ─────────────────────────────────────────────
  //  IOLITE (CORDIERITE)
  // ─────────────────────────────────────────────
  "Iolite": {
    lines: [585, 535, 492, 456, 436, 426],
    bands: [
      { start: 580, end: 595, strength: "Fe²⁺ band" },
      { start: 425, end: 440, strength: "Fe²⁺ cutoff" }
    ],
    chromophore: "Fe²⁺ (ferrous iron)",
    bookRef: "Ch. 24: Green Tourmaline and Iolite",
    description: "Multiple iron absorption lines/bands at 585, 535, 492, 456, 436, 426nm. Strongly pleochroic — spectrum varies with crystal direction."
  },

  // ─────────────────────────────────────────────
  //  SINHALITE
  // ─────────────────────────────────────────────
  "Sinhalite": {
    lines: [493, 475, 453, 434],
    bands: [
      { start: 448, end: 460, strength: "Fe²⁺ — 453nm line" },
      { start: 468, end: 480, strength: "Fe²⁺ — 475nm" },
      { start: 488, end: 498, strength: "Fe²⁺ — 493nm" }
    ],
    chromophore: "Fe²⁺ (ferrous iron — similar to peridot)",
    bookRef: "Ch. 21: Peridot and Sinhalite",
    description: "Spectrum similar to peridot with three iron lines at 493, 475, and 453nm. Additional line at 434nm differentiates sinhalite from peridot."
  },

  // ─────────────────────────────────────────────
  //  KORNERUPINE
  // ─────────────────────────────────────────────
  "Kornerupine": {
    lines: [540, 503, 446],
    bands: [
      { start: 495, end: 510, strength: "Fe²⁺ — 503nm" },
      { start: 535, end: 545, strength: "Fe²⁺ — 540nm" }
    ],
    chromophore: "Fe²⁺ + V³⁺ (iron / vanadium)",
    bookRef: "Ch. 23: Kornerupine and Axinite",
    description: "Iron lines at 503nm and 540nm. Some specimens show vanadium spectrum. Strongly pleochroic — different absorption axes."
  },

  // ─────────────────────────────────────────────
  //  AXINITE
  // ─────────────────────────────────────────────
  "Axinite": {
    lines: [512, 492, 466],
    bands: [
      { start: 460, end: 470, strength: "Fe²⁺ — 466nm" },
      { start: 488, end: 497, strength: "Mn band at 492nm" }
    ],
    chromophore: "Fe²⁺ + Mn²⁺",
    bookRef: "Ch. 23: Kornerupine and Axinite",
    description: "Multiple fine iron and manganese absorption lines at 512nm, 492nm, and 466nm. Characteristic clove-brown color."
  },

  // ─────────────────────────────────────────────
  //  ENSTATITE / DIOPSIDE
  // ─────────────────────────────────────────────
  "Enstatite": {
    lines: [506, 547],
    bands: [
      { start: 499, end: 512, strength: "Fe²⁺ — 506nm (diagnostic)" }
    ],
    chromophore: "Fe²⁺ (ferrous iron)",
    bookRef: "Ch. 22: Enstatite and Diopside",
    description: "Diagnostic line at 506nm (or doublet 505/508nm for diopside). Chrome diopside shows a chromium spectrum instead."
  },

  // ─────────────────────────────────────────────
  //  TURQUOISE
  // ─────────────────────────────────────────────
  "Turquoise": {
    lines: [432, 460],
    bands: [
      { start: 425, end: 445, strength: "Cu²⁺ — broad cutoff" }
    ],
    chromophore: "Cu²⁺ (copper)",
    bookRef: "Ch. 31: Copper and Turquoise",
    description: "Broad copper absorption extending from UV through blue region, with weak lines at 432nm and 460nm. Opaque; spectrum rarely diagnostic."
  },

  // ─────────────────────────────────────────────
  //  FLUORSPAR (FLUORITE)
  // ─────────────────────────────────────────────
  "Fluorite": {
    lines: [],
    bands: [
      { start: 415, end: 425, strength: "Yttrium REE — faint lines in some green" }
    ],
    chromophore: "Color centers / REE impurities",
    bookRef: "Ch. 35: Miscellaneous Spectra",
    description: "Most fluorites show no diagnostic absorption spectrum. Some green fluorites from specific localities show faint rare-earth lines."
  },

  // ─────────────────────────────────────────────
  //  CZ (CUBIC ZIRCONIA)
  // ─────────────────────────────────────────────
  "CZ (Cubic Zirconia)": {
    lines: [],
    bands: [],
    chromophore: "None (colorless) / dopants for colored varieties",
    bookRef: "Ch. 36: Synthetic Gemstones",
    description: "Colorless CZ has no diagnostic absorption spectrum. Colored CZ may show rare-earth or transition-metal bands depending on dopant used."
  },

  // ─────────────────────────────────────────────
  //  ZIRCON additional (High, separate)
  // ─────────────────────────────────────────────
  "Zircon (High)": {
    lines: [653, 615, 589, 562, 537, 516, 484, 460, 432],
    bands: [{ start: 648, end: 658, strength: "Key diagnostic 653nm line" }],
    chromophore: "U⁴⁺ + Th⁴⁺ + Nd³⁺/Pr³⁺ (radioactive / REE)",
    bookRef: "Ch. 32: Zircon Spectra",
    description: "High zircon: rich spectrum with up to 40+ sharp lines. 653nm is the single most diagnostic line."
  },

  // ─────────────────────────────────────────────
  //  EPIDOTE
  // ─────────────────────────────────────────────
  "Epidote": {
    lines: [475, 455, 438],
    bands: [
      { start: 448, end: 462, strength: "Fe³⁺ absorption" }
    ],
    chromophore: "Fe³⁺ (ferric iron)",
    bookRef: "Ch. 28: Andradite and Epidote",
    description: "Iron absorption bands in the violet-blue region at 475nm, 455nm, and 438nm. Very similar to andradite garnet spectrum."
  },

  // ─────────────────────────────────────────────
  //  KUNZITE (Spodumene)
  // ─────────────────────────────────────────────
  "Kunzite": {
    lines: [550],
    bands: [
      { start: 540, end: 560, strength: "Mn³⁺ — faint absorption at 550nm" }
    ],
    chromophore: "Mn³⁺ (manganese)",
    bookRef: "Ch. 29: Manganese Spectra",
    description: "Faint manganese absorption at 550nm in the green. Color is strongly pleochroic (pink/colorless/violet). No strong diagnostic lines."
  },

  // ─────────────────────────────────────────────
  //  SPODUMENE (Hiddenite/Green variety)
  // ─────────────────────────────────────────────
  "Hiddenite": {
    lines: [686, 669, 646],
    bands: [
      { start: 640, end: 695, strength: "Cr³⁺ absorption doublet" }
    ],
    chromophore: "Cr³⁺ (chromium — rare)",
    bookRef: "Ch. 18: Other Chromium Spectra",
    description: "True hiddenite (chrome-colored) shows a weak chromium doublet in red. Most 'hiddenite' on market is iron-colored green spodumene with no diagnostic spectrum."
  },

  // ─────────────────────────────────────────────
  //  BERYL (Family Overview)
  // ─────────────────────────────────────────────
  "Beryl": {
    lines: [683, 680, 637, 537, 456, 427],
    bands: [
      { start: 580, end: 630, strength: "Chromium (emerald) or iron (aquamarine) bands" }
    ],
    chromophore: "Cr³⁺ (emerald) / Fe²⁺·Fe³⁺ (aquamarine/heliodor)",
    bookRef: "Ch. 14 & 27: Emerald and Aquamarine Spectra",
    description: "Varies by variety: Emerald displays chromium doublet at 683/680nm with 637nm line; Aquamarine shows 537nm and 456nm iron lines."
  },

  // ─────────────────────────────────────────────
  //  DIOPSIDE / CHROME DIOPSIDE
  // ─────────────────────────────────────────────
  "Diopside": {
    lines: [505, 508, 655, 670],
    bands: [
      { start: 500, end: 515, strength: "Double line at 505 and 508nm" }
    ],
    chromophore: "Fe²⁺ (iron) / Cr³⁺ (chrome diopside)",
    bookRef: "Ch. 22: Enstatite and Diopside",
    description: "Distinctive double line at 505nm and 508nm in green separates diopside from enstatite (506nm). Chrome diopside adds chromium lines in red."
  },

  // ─────────────────────────────────────────────
  //  KYANITE
  // ─────────────────────────────────────────────
  "Kyanite": {
    lines: [446, 432],
    bands: [
      { start: 435, end: 450, strength: "Iron absorption bands in violet-blue" }
    ],
    chromophore: "Fe³⁺ (ferric iron)",
    bookRef: "Ch. 35: Miscellaneous Spectra",
    description: "Blue kyanite shows distinctive iron absorption bands at 446nm and 432nm."
  },

  // ─────────────────────────────────────────────
  //  IDOCRASE (VESUVIANITE)
  // ─────────────────────────────────────────────
  "Idocrase (Vesuvianite)": {
    lines: [462, 529],
    bands: [
      { start: 455, end: 470, strength: "Intense band at 462nm producing cutoff" }
    ],
    chromophore: "Fe³⁺ (ferric iron)",
    bookRef: "Ch. 25: Idocrase and Actinolite",
    description: "Intense absorption band at 462nm in blue producing complete cutoff of the blue-violet region."
  },

  // ─────────────────────────────────────────────
  //  ANDALUSITE
  // ─────────────────────────────────────────────
  "Andalusite": {
    lines: [553, 450],
    bands: [
      { start: 540, end: 565, strength: "Strong absorption in green-yellow" }
    ],
    chromophore: "Fe³⁺ + Mn³⁺",
    bookRef: "Ch. 35: Miscellaneous Spectra",
    description: "Strong pleochroic absorption band in green-yellow at 553nm; spectrum shifts markedly with crystal orientation."
  },

  // ─────────────────────────────────────────────
  //  RHODOCHROSITE
  // ─────────────────────────────────────────────
  "Rhodochrosite": {
    lines: [551, 410],
    bands: [
      { start: 540, end: 560, strength: "Manganese band at 551nm" }
    ],
    chromophore: "Mn²⁺ (manganese)",
    bookRef: "Ch. 29: Manganese Spectra",
    description: "Rosy-red manganese carbonate showing diagnostic sharp band at 551nm in green."
  },

  // ─────────────────────────────────────────────
  //  SPHALERITE (ZINC BLENDE)
  // ─────────────────────────────────────────────
  "Sphalerite": {
    lines: [460, 500, 650],
    bands: [
      { start: 450, end: 520, strength: "Complex iron absorption reminiscent of low zircon" }
    ],
    chromophore: "Fe²⁺ (iron)",
    bookRef: "Ch. 35: Miscellaneous Spectra",
    description: "High dispersion collector gem with complex absorption spectrum reminiscent of low zircon."
  },

  // ─────────────────────────────────────────────
  //  SILLIMANITE (FIBROLITE)
  // ─────────────────────────────────────────────
  "Sillimanite": {
    lines: [462, 410],
    bands: [
      { start: 455, end: 470, strength: "Iron band at 462nm" }
    ],
    chromophore: "Fe³⁺ (iron)",
    bookRef: "Ch. 35: Miscellaneous Spectra",
    description: "Pale blue/green sillimanite shows characteristic iron band at 462nm."
  },

  // ─────────────────────────────────────────────
  //  SYN. RUTILE
  // ─────────────────────────────────────────────
  "Syn. Rutile": {
    lines: [425],
    bands: [
      { start: 400, end: 425, strength: "Intense cutoff below 425nm" }
    ],
    chromophore: "Optical bandgap",
    bookRef: "Ch. 36: Synthetic Gemstones",
    description: "Extreme dispersion and fire; exhibits sharp cutoff below 425nm in violet."
  },

  // ─────────────────────────────────────────────
  //  SYN. SPINEL
  // ─────────────────────────────────────────────
  "Syn. Spinel": {
    lines: [635, 580, 540],
    bands: [
      { start: 540, end: 635, strength: "Three broad cobalt bands in orange-green" }
    ],
    chromophore: "Co²⁺ (cobalt)",
    bookRef: "Ch. 36: Synthetic Gemstones",
    description: "Verneuil flame-fusion synthetic spinel colored by cobalt; diagnostic triple bands at 635nm, 580nm, and 540nm."
  },

  // ─────────────────────────────────────────────
  //  SYN. EMERALD (HYDROTHERMAL & FLUX)
  // ─────────────────────────────────────────────
  "Syn. Emerald (Hydrothermal)": {
    lines: [683, 680, 662, 646, 637, 477],
    bands: [
      { start: 580, end: 620, strength: "Intense chromium absorption" }
    ],
    chromophore: "Cr³⁺ (high-purity chromium)",
    bookRef: "Ch. 36: Synthetic Gemstones",
    description: "Hyper-intense chromium doublet at 683/680nm, sharp lines at 662/646nm, and extremely bright fluorescent red glow."
  },
  "Syn. Emerald (Flux)": {
    lines: [683, 680, 662, 646, 637, 477],
    bands: [
      { start: 580, end: 620, strength: "Intense chromium absorption" }
    ],
    chromophore: "Cr³⁺ (high-purity chromium)",
    bookRef: "Ch. 36: Synthetic Gemstones",
    description: "Flux synthetic emerald displays intense chromium spectrum with vivid red organ-pipe fluorescence."
  },

  // ─────────────────────────────────────────────
  //  YAG (YTTRIUM ALUMINUM GARNET)
  // ─────────────────────────────────────────────
  "YAG": {
    lines: [589, 584, 572, 525, 475],
    bands: [
      { start: 570, end: 590, strength: "Neodymium (Nd³⁺) didymium group" }
    ],
    chromophore: "Nd³⁺ (neodymium dopant)",
    bookRef: "Ch. 36: Synthetic Gemstones",
    description: "Synthetic garnet simulant doped with rare earths, showing sharp didymium lines in yellow."
  },

  // ─────────────────────────────────────────────
  //  ZOISITE / TANZANITE
  // ─────────────────────────────────────────────
  "Zoisite": {
    lines: [595, 528, 455],
    bands: [
      { start: 580, end: 610, strength: "Vanadium pleochroic band" }
    ],
    chromophore: "V³⁺ (vanadium)",
    bookRef: "Ch. 35: Miscellaneous Spectra",
    description: "Trichroic spectrum showing vanadium band around 595nm that varies strongly with vibration direction (blue vs purple/bronze)."
  },
  "Tanzanite": {
    lines: [595, 528, 455],
    bands: [
      { start: 580, end: 610, strength: "Vanadium pleochroic band at 595nm" }
    ],
    chromophore: "V³⁺ (vanadium)",
    bookRef: "Ch. 35: Miscellaneous Spectra",
    description: "Trichroic spectrum with prominent 595nm vanadium band. Heat treatment enhances blue by reducing brown pleochroic component."
  },

  // ─────────────────────────────────────────────
  //  GARNET (COLOR-CHANGE)
  // ─────────────────────────────────────────────
  "Garnet (Color-Change)": {
    lines: [504, 573, 685],
    bands: [
      { start: 560, end: 600, strength: "Dual transmission windows in red and blue-green" }
    ],
    chromophore: "Cr³⁺ + V³⁺ + Fe²⁺",
    bookRef: "Ch. 19: Garnet Absorption",
    description: "Dual transmission windows in red and blue-green create alexandrite-like color change under differing illumination."
  },

  // ─────────────────────────────────────────────
  //  GLASS (MAN-MADE SIMULANT)
  // ─────────────────────────────────────────────
  "Glass (Man-Made)": {
    lines: [656, 589, 534],
    bands: [
      { start: 520, end: 670, strength: "Cobalt or didymium bands" }
    ],
    chromophore: "Co²⁺ (cobalt) or Nd/Pr (didymium)",
    bookRef: "Ch. 37: Glasses Spectra",
    description: "Cobalt blue glass shows 3 bands at 656, 589, 534nm; didymium glass shows sharp multi-line rare earth group around 584nm."
  },

  // ─────────────────────────────────────────────
  //  AZURITE
  // ─────────────────────────────────────────────
  "Azurite": {
    lines: [400],
    bands: [
      { start: 400, end: 490, strength: "Total absorption of red/yellow, transmits blue" }
    ],
    chromophore: "Cu²⁺ (copper)",
    bookRef: "Ch. 31: Copper Spectra",
    description: "Intense copper absorption absorbing almost all light above 500nm, transmitting pure deep blue."
  },

  // ─────────────────────────────────────────────
  //  MALACHITE
  // ─────────────────────────────────────────────
  "Malachite": {
    lines: [505],
    bands: [
      { start: 400, end: 510, strength: "Broad copper cutoff" }
    ],
    chromophore: "Cu²⁺ (copper)",
    bookRef: "Ch. 31: Copper Spectra",
    description: "Opaque green copper carbonate; strong cutoff in violet/blue with transmission peak in green."
  },

  // ─────────────────────────────────────────────
  //  LAPIS LAZULI
  // ─────────────────────────────────────────────
  "Lapis Lazuli": {
    lines: [],
    bands: [
      { start: 550, end: 650, strength: "Broad trisulfur radical absorption in orange-red" }
    ],
    chromophore: "S₃⁻ radical anion (lazurite)",
    bookRef: "Ch. 35: Miscellaneous Spectra",
    description: "Blue transmission window with broad orange/red absorption due to the S₃⁻ radical anion."
  },

  // ─────────────────────────────────────────────
  //  DIASPORE (ZULTANITE)
  // ─────────────────────────────────────────────
  "Diaspore (Zultanite)": {
    lines: [680, 471, 460],
    bands: [
      { start: 530, end: 580, strength: "Chromium / manganese / iron absorption" }
    ],
    chromophore: "Cr³⁺ + Fe³⁺ + Mn³⁺",
    bookRef: "Ch. 35: Miscellaneous Spectra",
    description: "Color-change diaspore shows fine chromium lines in red and iron lines in blue, with strong pleochroism."
  },

  // ─────────────────────────────────────────────
  //  BENITOITE
  // ─────────────────────────────────────────────
  "Benitoite": {
    lines: [],
    bands: [
      { start: 400, end: 430, strength: "Fe²⁺-Ti⁴⁺ intervalence charge transfer" }
    ],
    chromophore: "Fe²⁺–Ti⁴⁺ IVCT",
    bookRef: "Ch. 35: Miscellaneous Spectra",
    description: "Strong dichroism (colorless to deep blue); blue ray shows broad intervalence charge transfer absorption."
  },

  // ─────────────────────────────────────────────
  //  SERPENTINE
  // ─────────────────────────────────────────────
  "Serpentine": {
    lines: [497, 464],
    bands: [
      { start: 460, end: 500, strength: "Fe²⁺ iron bands in green varieties (Williamsite)" }
    ],
    chromophore: "Fe²⁺ (iron) / Cr³⁺ (Williamsite)",
    bookRef: "Ch. 35: Miscellaneous Spectra",
    description: "Translucent green serpentine (Williamsite) shows fine iron lines at 497nm and 464nm, sometimes faint Cr lines in red."
  },

  // ─────────────────────────────────────────────
  //  SCAPOLITE
  // ─────────────────────────────────────────────
  "Scapolite": {
    lines: [584, 572],
    bands: [
      { start: 570, end: 590, strength: "Rare earth didymium lines in yellow varieties" }
    ],
    chromophore: "REE didymium / color centers",
    bookRef: "Ch. 33: The Rare Earth Elements",
    description: "Yellow scapolite occasionally shows faint didymium absorption lines at 584nm and 572nm."
  },

  // ─────────────────────────────────────────────
  //  DUMORTIERITE
  // ─────────────────────────────────────────────
  "Dumortierite": {
    lines: [500],
    bands: [
      { start: 580, end: 620, strength: "Broad Fe²⁺-Ti⁴⁺ charge transfer band" }
    ],
    chromophore: "Fe²⁺–Ti⁴⁺ IVCT",
    bookRef: "Ch. 35: Miscellaneous Spectra",
    description: "Deep blue to violet-blue aggregate showing broad absorption in the red-orange."
  },

  // ─────────────────────────────────────────────
  //  HYDROGROSSULAR
  // ─────────────────────────────────────────────
  "Hydrogrossular": {
    lines: [461],
    bands: [
      { start: 450, end: 470, strength: "Intense iron/manganese band at 461nm" }
    ],
    chromophore: "Fe³⁺ / Cr³⁺ (Transvaal Jade)",
    bookRef: "Ch. 18: Other Chromium Spectra",
    description: "Pink hydrogrossular shows manganese band at 461nm; green 'Transvaal jade' shows chromium band in red."
  },

  // ─────────────────────────────────────────────
  //  SCHEELITE
  // ─────────────────────────────────────────────
  "Scheelite": {
    lines: [584, 572, 460],
    bands: [
      { start: 570, end: 590, strength: "Rare earth didymium bands" }
    ],
    chromophore: "Nd³⁺/Pr³⁺ (didymium)",
    bookRef: "Ch. 33: The Rare Earth Elements",
    description: "Displays sharp rare-earth didymium absorption lines in yellow."
  }
};

