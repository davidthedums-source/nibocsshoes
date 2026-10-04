export interface ShoeProduct {
  id: string;
  name: string;
  category: 'Men\'s Shoes' | 'Women\'s Shoes' | 'Formal Shoes' | 'Casual Shoes' | 'Leather Shoes' | 'Handmade Shoes' | 'Custom Shoes';
  allCategories: string[];
  description: string;
  pricePlaceholder: string;
  image: string;
  silhouette: string;
  leatherType: string;
  construction: string;
  sole: string;
  colors: string[];
  features: string[];
}

export interface CraftStep {
  number: string;
  title: string;
  description: string;
  detail: string;
  image: string;
  metric: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  tag: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Finished Shoes' | 'Shoe Production' | 'Leather & Materials' | 'Craftsmanship';
  image: string;
  caption: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

// Visual assets: Production-safe public URLs served statically on Vercel & AI Studio
export const ASSETS = {
  hero: '/images/hero_libocs_shoe_1790782853567.jpg',
  leather: '/images/craft_leather_selection_1790782865783.jpg',
  lasting: '/images/craft_shoe_lasting_1790782877218.jpg',
  finishing: '/images/craft_shoe_finishing_1790782887367.jpg',
  custom: '/images/custom_bespoke_footwear_1790782898112.jpg',
  femaleLoafer: '/images/female_tassel_loafer_1790786960797.jpg',
  menDerby: '/images/men_formal_black_derby_1790788008274.jpg',
  casualSneaker: '/images/casual_sneaker_no_human_1790792121811.jpg',
};

export const CATEGORIES = [
  'All',
  'Men\'s Shoes',
  'Women\'s Shoes',
  'Formal Shoes',
  'Casual Shoes',
  'Leather Shoes',
  'Handmade Shoes',
  'Custom Shoes',
] as const;

export const FEATURED_SHOES: ShoeProduct[] = [
  {
    id: 'men-formal-derby',
    name: 'Executive Plain-Toe Black Derby',
    category: 'Men\'s Shoes',
    allCategories: ['Men\'s Shoes', 'Formal Shoes', 'Leather Shoes', 'Handmade Shoes'],
    description: 'Impeccable men\'s formal plain-toe derby crafted with polished full-grain black box calfskin, waxed 4-eyelet lacing, and an engineered high-traction all-weather outsole.',
    pricePlaceholder: 'Price On Request',
    image: ASSETS.menDerby,
    silhouette: 'Open-Lace 4-Eyelet Plain-Toe Derby',
    leatherType: 'Mirror-Polished Black Box Calf',
    construction: 'Blake-Stitched Reinforced Welt',
    sole: 'Anti-Slip Geometric Tread Rubber Outsole',
    colors: ['Deep Obsidian Black', 'Espresso Dark Brown', 'Antiqued Mahogany'],
    features: ['High-traction all-weather rubber grip sole', 'Anatomical wooden last shaping', 'Waxed round cotton laces', 'Padded leather insole support'],
  },
  {
    id: 'casual-utility-sneaker',
    name: 'Sangotedo Utility Ribbed Sneaker',
    category: 'Casual Shoes',
    allCategories: ['Men\'s Shoes', 'Women\'s Shoes', 'Casual Shoes'],
    description: 'Rugged urban low-top utility sneaker featuring a reinforced ribbed rubber toe bumper, heavy-duty breathable canvas upper, and chunky lugged vulcanized tread.',
    pricePlaceholder: 'Price On Request',
    image: ASSETS.casualSneaker,
    silhouette: 'Low-Top Rubber-Bumper Utility Sneaker',
    leatherType: 'High-Density Canvas Twill & Vulcanized Rubber',
    construction: 'Reinforced 360° Vulcanized Bond with Sidewall Foxing',
    sole: 'Deep Lugged Anti-Abrasion Rubber Outsole',
    colors: ['All-Black Stealth', 'Olive Khaki', 'Industrial Gray'],
    features: ['Ribbed protective rubber toe bumper', 'Cushioned shock-absorbent footbed', 'Chunky lugged tire-tread grip', 'Durable woven heel pull tab'],
  },
  {
    id: 'women-tassel-loafer',
    name: 'Sangotedo Sovereign Women\'s Tassel Loafer',
    category: 'Women\'s Shoes',
    allCategories: ['Women\'s Shoes', 'Formal Shoes', 'Leather Shoes', 'Handmade Shoes', 'Casual Shoes'],
    description: 'Sophisticated women\'s patent mahogany leather loafer with double artisan tassels, polished silver-tone bit buckle, and cushioned interior comfort for refined everyday wear.',
    pricePlaceholder: 'Price On Request',
    image: ASSETS.femaleLoafer,
    silhouette: 'Women\'s Slip-On Tassel Loafer',
    leatherType: 'Gloss Patent Mahogany Leather',
    construction: 'Blake-Stitched Welt',
    sole: 'Low Stacked Heel with Non-Slip Outsole',
    colors: ['Deep Mahogany Gloss', 'Obsidian Black Patent', 'Vintage Cherry Glaze'],
    features: ['Double hand-tied leather tassels', 'Silver-tone bit buckle accent', 'Cushioned ergonomic arch footbed', 'Refined low block heel'],
  },
  {
    id: 'bespoke-commission-master',
    name: 'Bespoke Client Commission Shoe',
    category: 'Custom Shoes',
    allCategories: ['Custom Shoes', 'Handmade Shoes', 'Leather Shoes'],
    description: 'Made exclusively according to client foot measurements, leather swatch selection, and personal heel preference.',
    pricePlaceholder: 'Custom Consultation',
    image: ASSETS.leather,
    silhouette: 'Client-Defined Silhouette',
    leatherType: 'Client Selected Hides',
    construction: 'Fully Hand-Crafted to Last',
    sole: 'Bespoke Customer Specification',
    colors: ['Unlimited Custom Colors & Finishes'],
    features: ['Individual wooden last creation', 'In-person or remote measurement', 'Sample fitting pair'],
  },
];

export const CRAFT_STEPS: CraftStep[] = [
  {
    number: '01',
    title: 'Select',
    description: 'Quality materials are selected for each design.',
    detail: 'We personally inspect every hide for suppleness, tensile strength, and natural grain. Only full-grain leather, solid brass hardware, and dense veg-tan leather outsoles make the cut.',
    image: ASSETS.leather,
    metric: '100% Full-Grain Hides Inspected',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Footwear designs are carefully planned and shaped.',
    detail: 'Every silhouette is drafted with precise balance between aesthetic form and ergonomics. Patterns are drafted and adjusted for human motion and lasting foot support.',
    image: ASSETS.lasting,
    metric: 'Engineered For Ergonomic Movement',
  },
  {
    number: '03',
    title: 'Craft',
    description: 'The shoes are constructed with attention to detail.',
    detail: 'Our artisans hand-cut leather pieces, stitch uppers with high-tensile waxed thread, and pull the leather over anatomical wooden lasts to form the enduring structure.',
    image: ASSETS.lasting,
    metric: 'Hand-Stitched Welt Integrity',
  },
  {
    number: '04',
    title: 'Finish',
    description: 'Every shoe receives finishing touches before delivery.',
    detail: 'Soles are trimmed, edges inked and hand-burnished with natural carnauba and beeswax. The leather is given a deep conditioning polish before inspection and boxing.',
    image: ASSETS.finishing,
    metric: 'Hand-Polished Mirror Burnish',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'shoe-manufacturing',
    title: 'Shoe Manufacturing',
    description: 'Professional footwear production.',
    highlights: ['Industrial-grade precision', 'Consistent quality control', 'Premium grade leathers and components'],
    tag: 'Production',
  },
  {
    id: 'custom-shoe-making',
    title: 'Custom Shoe Making',
    description: 'Personalised footwear created according to customer requirements.',
    highlights: ['Tailored to foot dimensions', 'Choice of leather finishes and soles', 'One-of-a-kind bespoke creations'],
    tag: 'Bespoke',
  },
  {
    id: 'footwear-sales',
    title: 'Footwear Sales',
    description: 'Quality shoes available for customers.',
    highlights: ['Ready-to-wear collections', 'Formal, casual and daily footwear', 'Direct dispatch across Nigeria'],
    tag: 'Retail',
  },
  {
    id: 'shoe-design',
    title: 'Shoe Design',
    description: 'Modern footwear design and development.',
    highlights: ['Original silhouette ideation', 'Pattern drafting and prototyping', 'Modern and timeless aesthetics'],
    tag: 'Design Studio',
  },
  {
    id: 'personalised-footwear',
    title: 'Personalised Footwear',
    description: 'Styles created around customer preferences.',
    highlights: ['Custom color patinas & dyes', 'Choice of hardware and laces', 'Personalized monograms & accents'],
    tag: 'Personalization',
  },
  {
    id: 'bulk-orders',
    title: 'Bulk Orders',
    description: 'Footwear orders for customers requiring multiple pairs.',
    highlights: ['Corporate uniforms & teams', 'Special occasions & wedding parties', 'Wholesale production batches'],
    tag: 'Corporate & Wholesale',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Finished Oxford in Studio',
    category: 'Finished Shoes',
    image: ASSETS.hero,
    caption: 'Handcrafted oxford shoe highlighting razor-sharp stitch density and mirror toe cap.',
    aspect: 'landscape',
  },
  {
    id: 'gal-2',
    title: 'Artisan Lasting & Hand-Stitching',
    category: 'Craftsmanship',
    image: ASSETS.lasting,
    caption: 'Waxed thread passed through the welt on an oiled wooden shoe last in our workshop.',
    aspect: 'square',
  },
  {
    id: 'gal-3',
    title: 'Selection of Raw Leather Hides',
    category: 'Leather & Materials',
    image: ASSETS.leather,
    caption: 'Full-grain calfskin and vegetable-tanned hides hand-graded for thickness and grain.',
    aspect: 'portrait',
  },
  {
    id: 'gal-4',
    title: 'Sole Inking & Edge Burnishing',
    category: 'Shoe Production',
    image: ASSETS.finishing,
    caption: 'Natural wax and friction burnishing applied by hand along the leather sole edge.',
    aspect: 'landscape',
  },
  {
    id: 'gal-female-loafer',
    title: 'Women\'s Mahogany Patent Tassel Loafer',
    category: 'Finished Shoes',
    image: ASSETS.femaleLoafer,
    caption: 'Finished women\'s patent leather loafer featuring silver-tone bit hardware, dual tassels, and cushioned arch footbed.',
    aspect: 'square',
  },
  {
    id: 'gal-men-derby',
    title: 'Executive Plain-Toe Black Derby in Atelier',
    category: 'Finished Shoes',
    image: ASSETS.menDerby,
    caption: 'Classic men\'s black leather plain-toe derby highlighting mirror gloss, open-laced vamp, and ergonomic tread sole.',
    aspect: 'landscape',
  },
  {
    id: 'gal-casual-sneaker',
    title: 'Sangotedo Utility Ribbed Casual Sneaker',
    category: 'Finished Shoes',
    image: ASSETS.casualSneaker,
    caption: 'All-black rugged casual sneaker with protective ribbed rubber toe bumper, heavy-duty canvas, and chunky vulcanized lug sole.',
    aspect: 'square',
  },
  {
    id: 'gal-6',
    title: 'Workshop Pattern & Caliper Measurements',
    category: 'Shoe Production',
    image: ASSETS.leather,
    caption: 'Precision calipers and cutting tools ensuring exact seam tolerances.',
    aspect: 'portrait',
  },
];

export const WHY_NIBOCS = [
  {
    number: '01',
    title: 'Quality Craftsmanship',
    description: 'Careful attention to the construction and finishing of footwear.',
    detail: 'From hand-cutting upper panels to multi-stage sole adhesion and stitching, each pair undergoes rigorous artisanal quality checks.',
  },
  {
    number: '02',
    title: 'Modern Design',
    description: 'Stylish designs suitable for different occasions.',
    detail: 'Clean silhouettes, balanced proportions, and understated luxury that transition effortlessly from business boardrooms to casual gatherings.',
  },
  {
    number: '03',
    title: 'Made With Attention',
    description: 'Each shoe receives attention throughout the production process.',
    detail: 'We never rush production. Every curve of the shoe last and every stitch is inspected to guarantee enduring durability and comfort.',
  },
  {
    number: '04',
    title: 'Customer Focused',
    description: 'Designed around customer needs and preferences.',
    detail: 'Whether you need a ready-made pair, custom width adjustments, or complete bespoke styling, your satisfaction is our primary measure of success.',
  },
];

export const WHY_LIBOCS = WHY_NIBOCS;

export const BUSINESS_INFO = {
  name: 'NIBOCS Shoes',
  tagline: 'Crafted to move with you.',
  description: 'NIBOCS Shoes creates and sells quality footwear, combining skilled craftsmanship, modern style and attention to detail.',
  subDescription: 'Crafted footwear. Modern style. Made with purpose.',
  address: 'DKK Street, Sangotedo, Cannan Estate, Lagos',
  phone: '08025906080',
  phoneTel: '+2348025906080',
  phoneDisplay: '08025906080',
  phoneHref: 'tel:08025906080',
  email: 'eamos7738@gmail.com',
  whatsappUrl: 'https://wa.me/2348025906080?text=Hello%20NIBOCS%20Shoes%2C%20I%20am%20interested%20in%20your%20footwear.',
  coordinates: {
    lat: 6.4715,
    lng: 3.6288,
    area: 'Sangotedo, Lekki-Epe Expressway, Lagos',
  },
};
