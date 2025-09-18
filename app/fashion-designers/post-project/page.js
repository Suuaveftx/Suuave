"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Form,
  Input,
  NumberInput,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import React from "react";
import { GoPaperclip } from "react-icons/go";

const Page = () => {
  const [action, setAction] = React.useState(null);

  const classes = { label: "font-bold " };

  const fashionDesignerSkills = [
    {
      label: "Sketching",
      key: "sketching",
      description: "Creating detailed drawings of fashion concepts and designs",
    },
    {
      label: "Pattern Making",
      key: "pattern-making",
      description:
        "The process of creating patterns for garments, including measurements and fabric considerations",
    },
    {
      label: "Sewing",
      key: "sewing",
      description:
        "The technique of stitching fabric together to create garments and prototypes",
    },
    {
      label: "Textile Knowledge",
      key: "textile-knowledge",
      description:
        "Understanding different fabrics, fibers, and their uses in fashion design",
    },
    {
      label: "Fashion Illustration",
      key: "fashion-illustration",
      description:
        "Creating artistic representations of fashion designs, often using different mediums and techniques",
    },
    {
      label: "CAD (Computer-Aided Design)",
      key: "cad",
      description:
        "Using software to create digital fashion designs and patterns, such as Adobe Illustrator or CLO 3D",
    },
    {
      label: "Trend Analysis",
      key: "trend-analysis",
      description:
        "Researching and predicting fashion trends to stay ahead of market demands",
    },
    {
      label: "Color Theory",
      key: "color-theory",
      description:
        "Understanding how colors interact and how to choose complementary color schemes for designs",
    },
    {
      label: "Fabric Manipulation",
      key: "fabric-manipulation",
      description:
        "The technique of altering fabrics through pleating, draping, or other methods to create unique textures and looks",
    },
    {
      label: "Fit and Construction",
      key: "fit-construction",
      description:
        "Ensuring garments fit well and are constructed according to design specifications and quality standards",
    },
    {
      label: "Sustainability",
      key: "sustainability",
      description:
        "Incorporating eco-friendly materials and ethical practices into fashion design and production",
    },
    {
      label: "Fashion Marketing",
      key: "fashion-marketing",
      description:
        "Promoting fashion designs and understanding how to market products to the right audience",
    },
    {
      label: "Fashion Photography",
      key: "fashion-photography",
      description:
        "The ability to capture fashion pieces through photography for promotion and editorial use",
    },
    {
      label: "Brand Development",
      key: "brand-development",
      description:
        "Creating and maintaining a fashion brand identity and unique design aesthetic",
    },
  ];

  const projectTimeframe = [
    {
      label:"1 Day",
      key:"1day"
    },
    {
      label:"2 Days",
      key:"2days"
    },
    {
      label:"3 Days",
      key:"3days"
    },
  ]

  const budgetType = [
    {
      label:"Fixed",
      key:"fixed"
    },
    {
      label:"Negotiable",
      key:"negotiable"
    },
  ]

   const designStyle = [
    {
      label:"Fixed",
      key:"fixed"
    },
    {
      label:"Negotiable",
      key:"negotiable"
    },
  ]

  const designStyles = [
  {
    label: "Haute Couture",
    key: "haute-couture",
    description:
      "Exclusive, custom-fitted fashion design that is handmade from start to finish with high-quality materials.",
  },
  {
    label: "Ready-to-Wear (Prêt-à-Porter)",
    key: "ready-to-wear",
    description:
      "Fashion clothing produced in standard sizes and sold through retail, blending creativity with accessibility.",
  },
  {
    label: "Streetwear",
    key: "streetwear",
    description:
      "Casual and trendy clothing style inspired by skateboarding, hip-hop, and youth culture.",
  },
  {
    label: "Bohemian (Boho)",
    key: "bohemian",
    description:
      "A relaxed, artistic style featuring flowy fabrics, earthy tones, and ethnic or vintage-inspired elements.",
  },
  {
    label: "Minimalist",
    key: "minimalist",
    description:
      "Simple and clean designs with a focus on neutral colors, streamlined silhouettes, and functionality.",
  },
  {
    label: "Avant-Garde",
    key: "avant-garde",
    description:
      "Experimental and innovative style that challenges traditional fashion rules with bold and artistic designs.",
  },
  {
    label: "Classic",
    key: "classic",
    description:
      "Timeless, elegant, and refined designs that emphasize quality and sophistication over trends.",
  },
  {
    label: "Vintage",
    key: "vintage",
    description:
      "Fashion inspired by past decades, often incorporating retro elements into modern outfits.",
  },
  {
    label: "Athleisure",
    key: "athleisure",
    description:
      "A blend of athletic and casual wear designed for both exercise and everyday use.",
  },
  {
    label: "Glamorous",
    key: "glamorous",
    description:
      "Luxurious and eye-catching designs often featuring sequins, bold cuts, and striking details.",
  },
  {
    label: "Preppy",
    key: "preppy",
    description:
      "A neat, polished style influenced by Ivy League fashion, featuring blazers, polos, and structured pieces.",
  },
  {
    label: "Grunge",
    key: "grunge",
    description:
      "A rugged, edgy style inspired by 90s music culture, often featuring ripped jeans, flannel, and layered looks.",
  },
  {
    label: "Eclectic",
    key: "eclectic",
    description:
      "A mix-and-match style that combines different patterns, textures, and influences to create a unique look.",
  },
  {
    label: "Romantic",
    key: "romantic",
    description:
      "Soft, feminine designs featuring lace, ruffles, pastel colors, and delicate fabrics.",
  },
];


  return (
    <div className="max-w-[1500px] mx-auto p-6">
      <p className="font-bold text-2xl mb-6">Post Project</p>
      <Form
        className="w-full gap-7 bg-white border-2 border-gray-200 rounded-md p-7 "
        onReset={() => setAction("reset")}
        onSubmit={(e) => {
          e.preventDefault();
          let data = Object.fromEntries(new FormData(e.currentTarget));

          setAction(`submit ${JSON.stringify(data)}`);
          console.log(data);
        }}
      >
        <Input
          isRequired
          errorMessage="Please enter a title"
          label="Project Title"
          variant="bordered"
          radius="sm"
          name="projectTitle"
          placeholder="Type the title of the project"
          labelPlacement="outside"
          type="text"
          classNames={classes}
        />
        <Textarea
          labelPlacement="outside"
          classNames={classes}
          name="projectDetails"
          radius="sm"
          isClearable
          variant="bordered"
          errorMessage="Please enter a description "
          className=""
          minRows={7}
          label="Project Description"
          placeholder="Describe the project details"
        />

        <Input
          label="Reference Image (Optional)"
          variant="bordered"
          radius="sm"
          name="referenceImg"
          className="w-60"
          startContent={<GoPaperclip />}
          // placeholder="Type the title of the project"
          labelPlacement="outside"
          type="file"
          classNames={classes}
        />
        <Autocomplete
          allowsCustomValue
          radius="sm"
          className="font-bold"
          labelPlacement="outside"
          name="fashionDesignerSkills"
          defaultItems={fashionDesignerSkills}
          label="Skills Required"
          variant="bordered"
          placeholder="Select from the options provided or type when necessary"
        >
          {(item) => (
            <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
        <Autocomplete
          allowsCustomValue
          radius="sm"
          className="font-bold"
          labelPlacement="outside"
          name="designStyles"
          defaultItems={designStyles}
          label="Design Style"
          variant="bordered"
          placeholder="Select from the options provided or type when necessary"
        >
          {(item) => (
            <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>

        <NumberInput
          variant="bordered"
          radius="sm"
          label="Budget"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
          labelPlacement="outside"
          className="w-60"
          name="budget"
          placeholder="0.00"
          classNames={classes}
        />

        <Select
          variant="bordered"
          radius="sm"
          labelPlacement="outside"
          classNames={classes}
          className="lg:w-60 w-full"
          label="Budget Type"
          name="budgetType"
          placeholder="Select"
        >
          {budgetType.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>
        <Select
          variant="bordered"
          radius="sm"
          labelPlacement="outside"
          classNames={classes}
          className="lg:w-60 w-full"
          name="projectTimeframe"
          label="Project Timeframe"
          placeholder="Select"
        >
          {projectTimeframe.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>
        <div className="flex items-center justify-start gap-4 w-40">
          <Button type="reset" size="lg" variant="flat">
            Cancel
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="outlined"
            className="  text-customWhiteBgText text-lg  shadow-md  font-semibold "
            style={{
              background:
                "radial-gradient(ellipse at center, white 0%, #CCE7F2 100%)",
            }}
          >
            Publish
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Page;
