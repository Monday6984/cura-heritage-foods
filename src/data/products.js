// Single source of truth for the catalog.
//
// Required: id (also the URL slug: /shop/<id>), title, category, price (number, NGN), image, desc.
// Optional: imagePosition (CSS object-position, e.g. 'center 85%', to keep the jar in frame when cropped),
//   eyebrow, tags, size, details (paragraphs separated by a blank line),
//   highlightsTitle + highlights [{ label?, text }], usage { title, text } (newlines become list rows),
//   ingredients, tip.

const IMG = '/images/products/';

export const PRODUCTS = [
  {
    id: 'fish-spice',
    category: 'Spice Blends',
    eyebrow: 'Seafood Seasoning',
    title: 'Tosaf Fish Spice',
    desc: "Bring the ocean's best flavors to life without the chemicals.",
    price: 10000,
    image: `${IMG}fish-spice.jpg`,
    tags: ['No MSG', '100% Natural'],
    details:
      "The natural secret to perfect seafood. Our Fish Spice is specifically blended to enhance the delicate taste of fish while keeping your health a priority.\n\nSwitch to Tosaf and enjoy the authentic taste of nature.",
    highlights: [
      { label: 'Pure & Powerful', text: 'Made with 100% natural spices.' },
      { label: 'Clean Eating', text: 'Contains no MSG and no artificial additives.' },
      { label: 'Healthier Choice', text: 'A convenient, all-natural replacement for MSG-based seasonings.' },
      { label: 'Versatile', text: 'Perfect for grilling, steaming, frying, or baking all types of seafood.' },
    ],
  },
  {
    id: 'scented-curry',
    category: 'Spice Blends',
    eyebrow: 'Artisanal Aroma',
    title: 'Tosaf Scented Curry Powder',
    desc: "An aroma so rich, your neighbors will ask what you're cooking!",
    price: 5000,
    image: `${IMG}scented-curry.jpg`,
    tags: ['Signature Blend', 'No Fillers'],
    details: 'Our signature Scented Curry is a blend of premium herbs and spices.',
    highlights: [
      { label: 'Bold Flavor', text: 'A little goes a long way.' },
      { text: 'Perfect for stews, fried rice and marinating.' },
      { text: 'No flour or fillers, just high-grade natural spices.' },
    ],
  },
  {
    id: 'peppersoup-spice',
    category: 'Spice Blends',
    eyebrow: 'Health & Heritage',
    title: 'Tosaf Fortified Peppersoup Spice',
    desc: 'Bring the authentic taste of tradition to your kitchen.',
    price: 10000,
    image: `${IMG}peppersoup-spice.jpg`,
    tags: ['Vitamin-Enriched', 'No Clumping'],
    details:
      "Our Fortified Peppersoup Spice is more than just a seasoning, it's a blend of health and heritage.\n\nMade with high-quality Ehuru, Uziza, Uda etc for that deep, soul-warming aroma you love.\n\nNo artificial preservatives or fillers. Pure spice, pure goodness.",
    highlights: [
      {
        label: 'No clumping',
        text: 'Contains a natural anti-caking agent, so it stays smooth and pours easily, even in the kitchen heat.',
      },
      {
        label: 'Fortified',
        text: "Specially enriched with essential vitamins to boost your family's immunity with every bowl.",
      },
    ],
    usage: { title: 'Perfect for', text: 'Catfish (Point & Kill), Goat Meat, Chicken, or Yam Pepper Soup.' },
  },
  {
    id: 'goat-meat-spice',
    category: 'Spice Blends',
    eyebrow: 'The Ultimate Flavor Lock',
    title: 'Tosaf Goat Meat Spice',
    desc: 'Transform your meat from "basic" to "gourmet" with a bold, artisanal blend.',
    price: 10000,
    image: `${IMG}goat-meat-spice.jpg`,
    tags: ['Hand-Picked', '0% Chemicals'],
    details:
      'Transform your meat from "basic" to "gourmet." Our Goat Meat Spice is a bold, artisanal blend of traditional herbs and spices specifically crafted to complement the rich, gamey flavor of goat meat and beef.',
    highlights: [
      { text: 'Perfect for Asun, Peppersoup, or Sunday Stews.' },
      { text: 'Penetrates deep into the meat for a "Top-Notch" taste.' },
      { text: '0% Chemicals, 100% Hand-picked spices.' },
    ],
    tip: "Marinate your meat with this blend for 30 minutes before cooking to unlock a layer of flavor you've never experienced before!",
  },
  {
    id: 'suya-spice',
    category: 'Spice Blends',
    eyebrow: 'MSG-Free Grill Blend',
    title: 'Original Suya Spice',
    desc: 'Experience the bold, authentic taste of Suya with our premium natural blend.',
    price: 10000,
    image: `${IMG}suya-spice.jpg`,
    imagePosition: 'center 85%',
    tags: ['MSG-Free', '100% Natural'],
    details: 'Tosaf Suya Spice (MSG-free). Available now!',
    highlights: [
      { text: '100% Natural Spices.' },
      { text: 'No MSG, No Additives, No Preservatives.' },
      { text: 'Perfect for beef, chicken, fish, and even stir-fry!' },
      { text: 'Contains natural anti-caking agent.' },
      { text: 'The convenient, healthy alternative to MSG.' },
    ],
  },
  {
    id: 'soup-supreme',
    category: 'Soup & Stew Essentials',
    eyebrow: 'Ancestral Seafood Master-Blend',
    title: 'Soup Supreme',
    desc: 'A premium, granular seafood concentrate: 100% natural, with no MSG and no artificial fillers.',
    price: 10000,
    size: '200g Premium Jar',
    image: `${IMG}soup-supreme.jpg`,
    imagePosition: '85% center',
    tags: ['No MSG', 'Real Seafood'],
    details:
      'Ditch the chemical cubes and return to the source of true flavor. Tosaf Soup Supreme is a premium, granular seafood concentrate designed for the health-conscious home. We have replaced MSG and artificial fillers with the deep, smoky umami of the Atlantic and the Earth.',
    highlightsTitle: 'Why it is Supreme',
    highlights: [
      {
        label: 'Rich in Real Seafood',
        text: 'Each jar is packed with a high-protein blend of dried prawns, stockfish, and smoked catfish.',
      },
      {
        label: 'The Kitchen Pharmacy Standard',
        text: 'Crafted with our proprietary Ancestral Spice Blend of roasted local botanicals.',
      },
      { label: 'Zero Additives', text: 'No MSG, no artificial colors, and no hidden chemicals.' },
      {
        label: 'The "No-Cube" Guarantee',
        text: 'One spoonful provides all the depth you need. No bouillon cubes or extra crayfish required.',
      },
    ],
    usage: {
      title: 'Perfect for',
      text: "Elevating your Ogbono, Egusi, Oha, Okro, and traditional stews. It is nature's answer to deep, soulful Nigerian cooking.",
    },
    ingredients:
      'Premium Prawns, Stockfish, Catfish, Dehydrated Cabbage, White Onions, Iru, Cameroon Pepper, Sea Salt, and our secret Tosaf Ancestral Spice Blend.',
  },
  {
    id: 'locust-beans',
    category: 'Soup & Stew Essentials',
    eyebrow: 'Clean & Sand-Free Iru',
    title: 'Premium Dehydrated Locust Beans',
    desc: 'The authentic foundation of Nigerian flavor: pure, potent, and properly dehydrated.',
    price: 8000,
    image: `${IMG}locust-beans.jpg`,
    tags: ['Sand-Free', '100% Natural'],
    details:
      'Stop compromising on hygiene for the sake of flavor. Our Premium Dehydrated Locust Beans (Iru/Dawadawa) provide that deep, traditional umami taste with the modern safety standards your family deserves. We have taken the traditional fermentation process and elevated it with scientific precision to ensure every bean is clean, dry, and full of nutrients.',
    highlightsTitle: 'Why the Tosaf standard is different',
    highlights: [
      {
        label: 'Dehydrated',
        text: 'Dried to perfection using technology to lock in flavor while eliminating the risk of mold and sand.',
      },
      { label: 'Detoxified', text: 'Processed with our signature botanical method to ensure the highest purity.' },
      {
        label: '100% Natural',
        text: 'No MSG, no artificial preservatives and zero additives. Just pure, fermented locust beans.',
      },
      {
        label: 'Controlled Aroma',
        text: "Properly dried to provide a rich, savory scent that isn't overpowering, making it easier to store in your modern kitchen.",
      },
    ],
    usage: {
      title: 'How to use',
      text: 'Instant Flavor: Add directly to your Efo Riro, Egusi, Ayamase, or Native Rice.\nNo Soaking Needed: Because they are clean and sand-free, you can drop them straight into the pot!\nLong Shelf Life: These beans remain potent and fresh for months without refrigeration due to their low moisture content.',
    },
    ingredients: '100% Fermented African Locust Beans (Parkia biglobosa).',
  },
  {
    id: 'luna-classic-cream',
    category: 'Breakfast',
    eyebrow: 'Breakfast Purée',
    title: 'Luna Classic Cream',
    desc: 'All-natural, nutrient-dense breakfast purée made with premium roasted almonds and cashews.',
    price: 8000,
    size: '400g',
    image: `${IMG}luna-classic-cream.jpg`,
    tags: ['No Preservatives', 'Nutrient-Dense'],
    details:
      'Breakfast just got an upgrade! Why settle for ordinary when you can have LUNA Breakfast Purée? All-natural, nutrient-dense and delicious.\n\nClassic Cream: premium roasted Almonds & Cashews.\nTropical Bloom: silky-smooth, nut-free and fruit-sweetened.',
    highlights: [
      { text: 'No artificial sugars.' },
      { text: 'No preservatives.' },
      { text: 'Nationwide delivery from Lagos.' },
    ],
    usage: { title: 'Ideal for', text: 'Growing Kids & Active Adults\nNursing Mothers\nRecovery & The Elderly' },
  },
  {
    id: 'sweet-pap-cereal-1kg',
    category: 'Breakfast',
    eyebrow: 'Ready-to-Prepare Pap',
    title: 'CURA Sweet Natural Pap Cereal (1kg)',
    desc: 'Instant sweet natural pap cereal made from a carefully selected blend of finely blended sorghum, maize, ginger and more.',
    price: 10000,
    size: '1kg',
    image: `${IMG}sweet-natural-pap-cereal-1kg.jpg`,
    tags: ['Ready to Prepare', 'No Soaking Required'],
    details:
      'CURA Sweet Natural Pap Cereal is an instant sweet natural pap cereal made from the rich goodness of finely blended sorghum, maize, ginger and more.\n\nNaturally crafted to give you that smooth nourishing taste without the stress of soaking or serving.\n\nThe ready-to-prepare pap is perfect for quick, healthy meals at any time of the day.',
    highlights: [
      { text: 'Made from finely blended sorghum, maize, ginger and more.' },
      { text: 'Smooth and nourishing taste.' },
      { text: 'Ready to prepare, no soaking or serving stress.' },
      { text: 'Convenient for quick meals, any time of day.' },
    ],
  },
  {
    id: 'sweet-pap-cereal-400g',
    category: 'Breakfast',
    eyebrow: 'Ready-to-Prepare Pap',
    title: 'CURA Sweet Natural Pap Cereal (400g)',
    desc: 'Instant sweet natural pap cereal made from a carefully selected blend of finely blended sorghum, maize, ginger and more.',
    price: 5000,
    size: '400g',
    image: `${IMG}sweet-natural-pap-cereal-400g.jpg`,
    tags: ['Ready to Prepare', 'No Soaking Required'],
    details:
      'CURA Sweet Natural Pap Cereal is an instant sweet natural pap cereal made from the rich goodness of finely blended sorghum, maize, ginger and more.\n\nNaturally crafted to give you that smooth nourishing taste without the stress of soaking or serving.\n\nThe ready-to-prepare pap is perfect for quick, healthy meals at any time of the day.',
    highlights: [
      { text: 'Made from finely blended sorghum, maize, ginger and more.' },
      { text: 'Smooth and nourishing taste.' },
      { text: 'Ready to prepare, no soaking or serving stress.' },
      { text: 'Convenient for quick meals, any time of day.' },
    ],
  },
  {
    id: 'pure-honey',
    category: 'Honey',
    eyebrow: 'Raw & Unfiltered',
    title: 'Pure & Original Honey',
    desc: 'Pure. Raw. Unfiltered. Perfect for tea, cereal, and immune support.',
    price: 10000,
    size: '1 Litre',
    image: `${IMG}pure-honey.jpg`,
    tags: ['Raw', 'Unfiltered'],
    details: 'Pure. Raw. Unfiltered. Get your 1-Litre Tosaf Honey today.\n\nPerfect for tea, cereal, and immune support!',
  },
];

const PRODUCT_MAP = new Map(PRODUCTS.map((p) => [p.id, p]));

// Map lookup, so ids like "constructor" or "__proto__" can never match an inherited property.
export const getProduct = (id) => PRODUCT_MAP.get(id);

export const CATEGORIES = [...new Set(PRODUCTS.map((p) => p.category))];
