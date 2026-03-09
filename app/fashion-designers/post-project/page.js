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
import { ArrowLeft, Paperclip, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect, Suspense } from "react";

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams?.get('edit') === 'true';
  console.log("PostProject - isEditMode:", isEditMode);

  const [action, setAction] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDetails: "",
    fashionDesignerSkills: "",
    designStyles: "",
    projectTimeframe: ""
  });

  const classes = { label: "font-bold " };

  const fashionDesignerSkills = [
    // ... existing skills ...
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

  const projectTimeframe = [
    { label: "1 Day", key: "1day" },
    { label: "2 Days", key: "2days" },
    { label: "3 Days", key: "3days" },
  ];

  const [designValue, setDesignValue] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  useEffect(() => {
    if (isEditMode) {
      const storedProject = localStorage.getItem('editProject');
      if (storedProject) {
        const project = JSON.parse(storedProject);
        setFormData({
          projectTitle: project.title || "",
          projectDetails: project.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.", // Using dummy desc if not present
          fashionDesignerSkills: project.skills || "",
          designStyles: project.style || "",
          projectTimeframe: project.timeframe || ""
        });
        setDesignValue(project.style || "");
      }
    }
  }, [isEditMode]);

  const handleStyleSelection = (style) => {
    setDesignValue(style);
    setShowSuggestions(false);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      originalFile: file
    }));
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onReset = () => {
    setAction("reset");
    setDesignValue("");
    setShowSuggestions(false);
    setSelectedFiles([]);
    setFormData({
      projectTitle: "",
      projectDetails: "",
      fashionDesignerSkills: "",
      designStyles: "",
      projectTimeframe: ""
    });
  };

  return (
    <div className="max-w-[1500px] mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Button
          isIconOnly
          variant="light"
          radius="full"
          className="md:hidden text-black -ml-2"
          onPress={() => router.push('/fashion-designers/my-projects')}
        >
          <ArrowLeft size={24} />
        </Button>
        <p className="font-bold text-2xl">{isEditMode ? "Edit Project" : "Post Project"}</p>
      </div>
      <Form
        className="w-full gap-7 bg-white border-2 border-gray-200 rounded-md p-7 "
        onReset={onReset}
        onSubmit={(e) => {
          e.preventDefault();
          let data = Object.fromEntries(new FormData(e.currentTarget));

          const dataToSave = { ...data };
          dataToSave.referenceFiles = selectedFiles.map(f => f.name);
          dataToSave.designStyles = designValue;

          if (isEditMode) {
            console.log("Updating project:", dataToSave);
            // In a real app, you'd send a PUT/PATCH request here
            localStorage.removeItem('editProject');
          } else {
            localStorage.setItem('postedProject', JSON.stringify(dataToSave));
            console.log("Posting project:", dataToSave);
          }
          router.push('/fashion-designers/my-projects');
        }}
      >
        <Input
          errorMessage="Please enter a title"
          label={
            <span>
              Project Title <span className="text-red-500">*</span>
            </span>
          }
          variant="bordered"
          radius="sm"
          name="projectTitle"
          value={formData.projectTitle}
          onValueChange={(val) => setFormData(prev => ({ ...prev, projectTitle: val }))}
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
          value={formData.projectDetails}
          onValueChange={(val) => setFormData(prev => ({ ...prev, projectDetails: val }))}
          className=""
          minRows={7}
          label={
            <span>
              Project Description <span className="text-red-500">*</span>
            </span>
          }
          placeholder="Describe the project details"
        />

        <div className="flex flex-col gap-3">
          <label className="text-sm font-bold text-[#222222]">Reference Image (Optional)</label>
          <div className="flex flex-wrap gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            <Button
              variant="bordered"
              radius="sm"
              onPress={() => fileInputRef.current.click()}
              className="w-fit border-1 border-[#d1d1d1] font-medium"
              startContent={<Paperclip className="w-4 h-4" />}
            >
              Attach Files
            </Button>

            <div className="flex flex-wrap gap-3">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-3 bg-[#FAFAFA] border border-[#EAEAEA] p-3 rounded-xl min-w-[200px] relative group">
                  <div className="bg-[#CCE7F2] p-2 rounded-lg">
                    <Paperclip className="w-4 h-4 text-[#035A7A]" />
                  </div>
                  <div className="flex flex-col pr-6">
                    <span className="text-sm font-medium text-[#222222] truncate max-w-[150px]">{file.name}</span>
                    <span className="text-xs text-[#767676]">{file.size}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Autocomplete
          allowsCustomValue
          radius="sm"
          className="font-bold"
          labelPlacement="outside"
          name="fashionDesignerSkills"
          defaultItems={fashionDesignerSkills}
          label={
            <span>
              Skills Required <span className="text-red-500">*</span>
            </span>
          }
          value={formData.fashionDesignerSkills}
          onValueChange={(val) => setFormData(prev => ({ ...prev, fashionDesignerSkills: val }))}
          variant="bordered"
          placeholder="Select from the options provided or type when necessary"
        >
          {(item) => (
            <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>

        <div className="flex flex-col gap-2 relative w-full">
          <label htmlFor="design-style-input" className="text-sm font-bold text-[#222222]">
            Design Style <span className="text-red-500">*</span>
          </label>
          <input
            id="design-style-input"
            type="text"
            name="designStyles"
            value={designValue}
            placeholder="Enter category of your design, E.g Casual, etc."
            className="border-1 border-[#d1d1d1] rounded-lg px-3 py-2 text-base focus:outline-none focus:border-[#3A98BB]"
            onChange={(e) => {
              setDesignValue(e.target.value);
              setFormData(prev => ({ ...prev, designStyles: e.target.value }));
              setShowSuggestions(true);
            }}
            onFocus={() => {
              if (designValue) setShowSuggestions(true);
            }}
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 200);
            }}
          />

          {showSuggestions && (
            <div
              id="style-suggestions"
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d1d1d1] rounded-lg shadow-xl max-h-60 overflow-y-auto z-[50]"
            >
              {designStyles
                .filter(item =>
                  item.label.toLowerCase().includes(designValue.toLowerCase())
                )
                .map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      handleStyleSelection(item.label);
                      setFormData(prev => ({ ...prev, designStyles: item.label }));
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-[#F3F4F6] transition-colors text-sm border-b border-gray-50 last:border-none"
                  >
                    {item.label}
                  </button>
                ))}
              {designStyles.filter(item => item.label.toLowerCase().includes(designValue.toLowerCase())).length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-500 italic">
                  No matching styles found. press enter to use &quot;{designValue}&quot;
                </div>
              )}
            </div>
          )}
        </div>

        <Select
          variant="bordered"
          radius="sm"
          labelPlacement="outside"
          classNames={classes}
          className="lg:w-60 w-full"
          name="projectTimeframe"
          label={
            <span>
              Project Timeframe <span className="text-red-500">*</span>
            </span>
          }
          placeholder="Select"
          selectedKeys={formData.projectTimeframe ? new Set([formData.projectTimeframe]) : new Set([])}
          onSelectionChange={(keys) => setFormData(prev => ({ ...prev, projectTimeframe: Array.from(keys)[0] }))}
        >
          {projectTimeframe.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>
        <div className="flex items-center justify-start gap-2 w-48">
          <Button type="reset" size="sm" radius="full" variant="flat" className="text-xs px-10">
            Cancel
          </Button>
          <Button
            type="submit"
            size="sm"
            radius="full"
            variant="outlined"
            className="  text-customWhiteBgText text-xs  shadow-md  font-semibold px-10"
            style={{
              background:
                "radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)",
            }}
          >
            {isEditMode ? "Update" : "Publish"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
