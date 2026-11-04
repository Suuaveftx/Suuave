export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export const DEFAULT_VALUES = {
  projectTitle: '',
  projectDetails: '',
  fashionDesignerSkills: [],
  designStyles: [],
  projectBudget: '',
  projectTimeframe: '',
  durationType: 'days',
  projectCurrency: 'USD',
  projectStatus: 'open',
};

export const CURRENCIES = ['USD', 'NGN', 'EUR', 'GBP'];
export const DURATION_UNITS = ['days', 'weeks', 'months', 'years'];
export const PROJECT_STATUSES = ['open', 'in_progress', 'completed', 'cancelled'];

export const responsiveClasses = {
  label: 'font-semibold lg:font-bold text-[14px] lg:text-sm text-[#222222] pb-1',
  inputWrapper:
    'border-[#EAEAEA] lg:border-gray-300 !rounded-2xl lg:!rounded-md border min-h-[52px] lg:min-h-[40px] px-4 shadow-none bg-white font-satoshi',
  input: 'text-[15px] lg:text-[14px] font-satoshi placeholder:text-[#9CA3AF]',
};

export const fashionDesignerSkills = [
  { id: 1, label: 'Sketching', key: 'sketching', description: 'Creating detailed drawings of fashion concepts and designs' },
  { id: 2, label: 'Pattern Making', key: 'pattern-making', description: 'The process of creating patterns for garments' },
  { id: 3, label: 'Sewing', key: 'sewing', description: 'The technique of stitching fabric together' },
  { id: 4, label: 'Textile Knowledge', key: 'textile-knowledge', description: 'Understanding different fabrics' },
  { id: 5, label: 'Fashion Illustration', key: 'fashion-illustration', description: 'Creating artistic representations of fashion designs' },
  { id: 6, label: 'CAD (Computer-Aided Design)', key: 'cad', description: 'Using software to create digital fashion designs' },
  { id: 7, label: 'Trend Analysis', key: 'trend-analysis', description: 'Researching and predicting fashion trends' },
  { id: 8, label: 'Color Theory', key: 'color-theory', description: 'Understanding how colors interact' },
  { id: 9, label: 'Fabric Manipulation', key: 'fabric-manipulation', description: 'The technique of altering fabrics' },
  { id: 10, label: 'Fit and Construction', key: 'fit-construction', description: 'Ensuring garments fit well' },
  { id: 11, label: 'Sustainability', key: 'sustainability', description: 'Incorporating eco-friendly materials' },
  { id: 12, label: 'Fashion Marketing', key: 'fashion-marketing', description: 'Promoting fashion designs' },
  { id: 13, label: 'Fashion Photography', key: 'fashion-photography', description: 'Capturing fashion pieces through photography' },
  { id: 14, label: 'Brand Development', key: 'brand-development', description: 'Creating and maintaining a fashion brand identity' },
];

export const designStyles = [
  { label: 'Haute Couture', key: 'haute-couture' },
  { label: 'Ready-to-Wear', key: 'ready-to-wear' },
  { label: 'Streetwear', key: 'streetwear' },
  { label: 'Bohemian', key: 'bohemian' },
  { label: 'Minimalist', key: 'minimalist' },
  { label: 'Avant-Garde', key: 'avant-garde' },
  { label: 'Classic', key: 'classic' },
  { label: 'Vintage', key: 'vintage' },
  { label: 'Athleisure', key: 'athleisure' },
  { label: 'Glamorous', key: 'glamorous' },
  { label: 'Preppy', key: 'preppy' },
  { label: 'Grunge', key: 'grunge' },
  { label: 'Eclectic', key: 'eclectic' },
  { label: 'Romantic', key: 'romantic' },
];

export const SKILL_LABELS = fashionDesignerSkills.map((skill) => skill.label);
export const DESIGN_STYLE_LABELS = designStyles.map((style) => style.label);
