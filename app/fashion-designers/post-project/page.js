"use client";

import {
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  Textarea,
  Card,
  CardBody,
} from "@heroui/react";
import React from "react";
import { ArrowLeft, Paperclip, X } from "lucide-react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect, Suspense } from "react";
import { useForm, Controller } from "react-hook-form";

import { useAppStore } from "@/store";
import PageContainer from "@/components/layout/PageContainer";

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams?.get('edit') === 'true';
  const { addProject, updateProject, editProject, clearEditProject } = useAppStore();

  const [action, setAction] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const [previewAwardUrl, setPreviewAwardUrl] = useState(null);

  const { control, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      projectTitle: "",
      projectDetails: "",
      fashionDesignerSkills: [],
      designStyles: [],
      projectBudget: "",
      projectTimeframe: ""
    }
  });

  const formData = watch();

  const [currentDesignInput, setCurrentDesignInput] = useState("");
  const [designSuggestion, setDesignSuggestion] = useState("");
  const [skillSuggestion, setSkillSuggestion] = useState("");
  const [currentSkillInput, setCurrentSkillInput] = useState("");

  const responsiveClasses = {
    label: "font-semibold lg:font-bold text-[14px] lg:text-sm text-[#222222] pb-1",
    inputWrapper: "border-[#EAEAEA] lg:border-gray-300 !rounded-2xl lg:!rounded-md border min-h-[52px] lg:min-h-[40px] px-4 shadow-none bg-white font-satoshi",
    input: "text-[15px] lg:text-[14px] font-satoshi placeholder:text-[#9CA3AF]",
  };

  const fashionDesignerSkills = [
    { id: 1, label: "Sketching", key: "sketching", description: "Creating detailed drawings of fashion concepts and designs" },
    { id: 2, label: "Pattern Making", key: "pattern-making", description: "The process of creating patterns for garments" },
    { id: 3, label: "Sewing", key: "sewing", description: "The technique of stitching fabric together" },
    { id: 4, label: "Textile Knowledge", key: "textile-knowledge", description: "Understanding different fabrics" },
    { id: 5, label: "Fashion Illustration", key: "fashion-illustration", description: "Creating artistic representations of fashion designs" },
    { id: 6, label: "CAD (Computer-Aided Design)", key: "cad", description: "Using software to create digital fashion designs" },
    { id: 7, label: "Trend Analysis", key: "trend-analysis", description: "Researching and predicting fashion trends" },
    { id: 8, label: "Color Theory", key: "color-theory", description: "Understanding how colors interact" },
    { id: 9, label: "Fabric Manipulation", key: "fabric-manipulation", description: "The technique of altering fabrics" },
    { id: 10, label: "Fit and Construction", key: "fit-construction", description: "Ensuring garments fit well" },
    { id: 11, label: "Sustainability", key: "sustainability", description: "Incorporating eco-friendly materials" },
    { id: 12, label: "Fashion Marketing", key: "fashion-marketing", description: "Promoting fashion designs" },
    { id: 13, label: "Fashion Photography", key: "fashion-photography", description: "Capturing fashion pieces through photography" },
    { id: 14, label: "Brand Development", key: "brand-development", description: "Creating and maintaining a fashion brand identity" },
  ];

  const designStyles = [
    { label: "Haute Couture", key: "haute-couture" },
    { label: "Ready-to-Wear", key: "ready-to-wear" },
    { label: "Streetwear", key: "streetwear" },
    { label: "Bohemian", key: "bohemian" },
    { label: "Minimalist", key: "minimalist" },
    { label: "Avant-Garde", key: "avant-garde" },
    { label: "Classic", key: "classic" },
    { label: "Vintage", key: "vintage" },
    { label: "Athleisure", key: "athleisure" },
    { label: "Glamorous", key: "glamorous" },
    { label: "Preppy", key: "preppy" },
    { label: "Grunge", key: "grunge" },
    { label: "Eclectic", key: "eclectic" },
    { label: "Romantic", key: "romantic" },
  ];

  const projectTimeframe = [
    { label: "1 Day", key: "1day" },
    { label: "2 Days", key: "2days" },
    { label: "3 Days", key: "3days" },
  ];

  useEffect(() => {
    if (isEditMode && editProject) {
      let parsedSkills = [];
      if (Array.isArray(editProject.skills)) {
        parsedSkills = editProject.skills;
      } else if (typeof editProject.skills === 'string' && editProject.skills.length > 0) {
        parsedSkills = editProject.skills.split(',').map(s => s.trim());
      }
      let parsedStyles = [];
      if (Array.isArray(editProject.style)) {
        parsedStyles = editProject.style;
      } else if (typeof editProject.style === 'string' && editProject.style.length > 0) {
        parsedStyles = editProject.style.split(',').map(s => s.trim());
      }
      reset({
        projectTitle: editProject.title || "",
        projectDetails: editProject.description || "",
        fashionDesignerSkills: parsedSkills,
        designStyles: parsedStyles,
        projectTimeframe: editProject.timeframe || ""
      });
    }
  }, [isEditMode, editProject, reset]);

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
    setDesignSuggestion("");
    setCurrentDesignInput("");
    setSkillSuggestion("");
    setCurrentSkillInput("");
    setSelectedFiles([]);
    reset({
      projectTitle: "",
      projectDetails: "",
      fashionDesignerSkills: [],
      designStyles: [],
      projectTimeframe: ""
    });
    if (isEditMode) clearEditProject();
  };

  const onSubmit = (data) => {
    const dataToSave = {
      title: data.projectTitle,
      description: data.projectDetails,
      skills: data.fashionDesignerSkills,
      style: data.designStyles,
      timeframe: data.projectTimeframe,
      referenceFiles: selectedFiles.map(f => f.name)
    };

    if (isEditMode && editProject) {
      updateProject(editProject.id, dataToSave);
      clearEditProject();
    } else {
      addProject(dataToSave);
    }
    router.push('/fashion-designers/my-projects');
  };

  return (
    <PageContainer className="pt-4 lg:pt-8 pb-4 lg:pb-6 min-h-screen bg-[#F9FAFB] lg:bg-transparent px-4 sm:px-6 lg:px-0">

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center gap-3 mb-6 mt-2 -ml-2">
        <Button isIconOnly variant="light" onPress={() => router.back()} className="rounded-full min-w-fit w-11 h-11 bg-transparent">
          <ChevronLeftIcon className="w-6 h-6 text-[#222222]" />
        </Button>
        <h1 className="text-xl font-bold text-[#222222]">{isEditMode ? "Edit Project" : "Post Project"}</h1>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center gap-3 mb-6">
        <p className="font-bold text-2xl">{isEditMode ? "Edit Project" : "Post Project"}</p>
      </div>

      <Card
        shadow="none"
        className="w-full bg-white border border-[#F0F0F0] lg:border-2 lg:border-gray-200 rounded-[20px] lg:rounded-md p-5 lg:p-7 shadow-[0px_8px_30px_rgba(0,0,0,0.04)] lg:shadow-none mb-10 overflow-visible"
      >
        <CardBody className="p-0 overflow-visible">
          <Form
            className="w-full flex-col gap-6 lg:gap-7 overflow-visible"
            onReset={onReset}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="projectTitle"
              control={control}
              rules={{ required: "Please enter a title" }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  label={
                    <span>
                      Project Title <span className="text-red-500">*</span>
                    </span>
                  }
                  variant="bordered"
                  radius="sm"
                  placeholder="Type the title of the project"
                  labelPlacement="outside"
                  type="text"
                  classNames={responsiveClasses}
                />
              )}
            />
            <Controller
              name="projectDetails"
              control={control}
              rules={{ required: "Please enter a description" }}
              render={({ field, fieldState }) => (
                <Textarea
                  {...field}
                  labelPlacement="outside"
                  classNames={responsiveClasses}
                  radius="sm"
                  isClearable
                  variant="bordered"
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  minRows={7}
                  label={
                    <span>
                      Project Description <span className="text-red-500">*</span>
                    </span>
                  }
                  placeholder="Describe the project details"
                />
              )}
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
                  className="lg:w-fit w-full sm:w-1/2  border-1 border-[#EAEAEA] lg:border-[#d1d1d1] font-medium lg:font-medium text-gray-400 lg:text-default-foreground min-h-[52px] lg:min-h-10 !rounded-xl lg:!rounded-sm shadow-none"
                  startContent={<Paperclip className="w-4 h-4 text-gray-500" />}
                >
                  <span className="hidden lg:inline">Attach Files</span>
                  <span className="lg:hidden">Upload</span>
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
            <div className="flex flex-col gap-2 relative w-full">
              <label className="font-semibold lg:font-bold text-[14px] lg:text-sm text-[#222222] pb-1 lg:pb-0">
                Skills Required <span className="text-red-500">*</span>
              </label>

              <div className="relative w-full">
                <input
                  type="text"
                  name="currentSkillInput"
                  value={currentSkillInput}
                  placeholder={formData.fashionDesignerSkills.length === 0 ? "Type a skill and press Enter..." : "Add another skill..."}
                  className="w-full border-1 border-[#EAEAEA] lg:border-[#d1d1d1] !rounded-2xl lg:!rounded-lg px-4 lg:px-3 lg:py-2 py-0 text-[15px] lg:text-base min-h-[52px] lg:min-h-10 focus:outline-none focus:border-[#3A98BB] relative z-10 bg-transparent font-satoshi placeholder:text-[#9CA3AF]"
                  onChange={(e) => {
                    const val = e.target.value;
                    setCurrentSkillInput(val);
                    if (val.length > 0) {
                      const match = fashionDesignerSkills.find(skill =>
                        skill.label.toLowerCase().startsWith(val.toLowerCase())
                      );
                      if (match) {
                        setSkillSuggestion(val + match.label.slice(val.length));
                      } else {
                        setSkillSuggestion("");
                      }
                    } else {
                      setSkillSuggestion("");
                    }
                  }}
                  onKeyDown={(e) => {
                    if ((e.key === "Tab" || e.key === "ArrowRight") && skillSuggestion) {
                      e.preventDefault();
                      if (!formData.fashionDesignerSkills.includes(skillSuggestion)) {
                        setValue("fashionDesignerSkills", [...formData.fashionDesignerSkills, skillSuggestion]);
                      }
                      setCurrentSkillInput("");
                      setSkillSuggestion("");
                    } else if (e.key === "Enter") {
                      e.preventDefault();
                      const skillToAdd = skillSuggestion || currentSkillInput.trim();
                      if (skillToAdd && !formData.fashionDesignerSkills.includes(skillToAdd)) {
                        setValue("fashionDesignerSkills", [...formData.fashionDesignerSkills, skillToAdd]);
                      }
                      setCurrentSkillInput("");
                      setSkillSuggestion("");
                    }
                  }}
                  onBlur={() => {
                    if (currentSkillInput.trim() && !formData.fashionDesignerSkills.includes(currentSkillInput.trim())) {
                      setValue("fashionDesignerSkills", [...formData.fashionDesignerSkills, currentSkillInput.trim()]);
                    }
                    setCurrentSkillInput("");
                    setSkillSuggestion("");
                  }}
                />
                {skillSuggestion && currentSkillInput && skillSuggestion.toLowerCase().startsWith(currentSkillInput.toLowerCase()) && (
                  <div
                    className="absolute inset-0 px-3 py-2 text-base pointer-events-none flex items-center z-0 whitespace-pre overflow-hidden font-sans"
                  >
                    <span className="text-transparent">{currentSkillInput}</span>
                    <span className="text-gray-400">{skillSuggestion.slice(currentSkillInput.length)}</span>
                  </div>
                )}
              </div>

              {formData.fashionDesignerSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.fashionDesignerSkills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-1 bg-[#F3F4F6] text-[#222222] px-3 py-1.5 rounded-lg text-sm border border-[#EAEAEA]">
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => setValue("fashionDesignerSkills", formData.fashionDesignerSkills.filter((_, i) => i !== index))}
                        className="text-gray-400 hover:text-red-500 transition-colors ml-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 relative w-full">
              <label htmlFor="design-style-input" className="font-semibold lg:font-bold text-[14px] lg:text-sm text-[#222222] pb-1 lg:pb-0">
                Design Style <span className="text-red-500">*</span>
              </label>
              <div className="relative w-full">
                <input
                  id="design-style-input"
                  type="text"
                  name="currentDesignInput"
                  value={currentDesignInput}
                  placeholder={formData.designStyles.length === 0 ? "Type a design style and press Enter..." : "Add another style..."}
                  className="w-full border-1 border-[#EAEAEA] lg:border-[#d1d1d1] !rounded-2xl lg:!rounded-lg px-4 lg:px-3 lg:py-2 py-0 text-[15px] lg:text-base min-h-[52px] lg:min-h-10 focus:outline-none focus:border-[#3A98BB] relative z-10 bg-transparent font-satoshi placeholder:text-[#9CA3AF]"
                  onChange={(e) => {
                    const val = e.target.value;
                    setCurrentDesignInput(val);
                    if (val.length > 0) {
                      const match = designStyles.find(style =>
                        style.label.toLowerCase().startsWith(val.toLowerCase())
                      );
                      if (match) {
                        setDesignSuggestion(val + match.label.slice(val.length));
                      } else {
                        setDesignSuggestion("");
                      }
                    } else {
                      setDesignSuggestion("");
                    }
                  }}
                  onKeyDown={(e) => {
                    if ((e.key === "Tab" || e.key === "ArrowRight") && designSuggestion) {
                      e.preventDefault();
                      if (!formData.designStyles.includes(designSuggestion)) {
                        setValue("designStyles", [...formData.designStyles, designSuggestion]);
                      }
                      setCurrentDesignInput("");
                      setDesignSuggestion("");
                    } else if (e.key === "Enter") {
                      e.preventDefault();
                      const styleToAdd = designSuggestion || currentDesignInput.trim();
                      if (styleToAdd && !formData.designStyles.includes(styleToAdd)) {
                        setValue("designStyles", [...formData.designStyles, styleToAdd]);
                      }
                      setCurrentDesignInput("");
                      setDesignSuggestion("");
                    }
                  }}
                  onBlur={() => {
                    if (currentDesignInput.trim() && !formData.designStyles.includes(currentDesignInput.trim())) {
                      setValue("designStyles", [...formData.designStyles, currentDesignInput.trim()]);
                    }
                    setCurrentDesignInput("");
                    setDesignSuggestion("");
                  }}
                />
                {designSuggestion && currentDesignInput && designSuggestion.toLowerCase().startsWith(currentDesignInput.toLowerCase()) && (
                  <div
                    className="absolute inset-0 px-3 py-2 text-base pointer-events-none flex items-center z-0 whitespace-pre overflow-hidden font-sans"
                  >
                    <span className="text-transparent">{currentDesignInput}</span>
                    <span className="text-gray-400">{designSuggestion.slice(currentDesignInput.length)}</span>
                  </div>
                )}
              </div>

              {formData.designStyles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.designStyles.map((style, index) => (
                    <div key={index} className="flex items-center gap-1 bg-[#F3F4F6] text-[#222222] px-3 py-1.5 rounded-lg text-sm border border-[#EAEAEA]">
                      <span>{style}</span>
                      <button
                        type="button"
                        onClick={() => setValue("designStyles", formData.designStyles.filter((_, i) => i !== index))}
                        className="text-gray-400 hover:text-red-500 transition-colors ml-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Controller
              name="projectBudget"
              control={control}
              rules={{ required: "Please enter a budget" }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  variant="bordered"
                  radius="sm"
                  labelPlacement="outside"
                  classNames={responsiveClasses}
                  className="lg:w-96 w-full"
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  label={
                    <span>
                      Budget <span className="text-red-500">*</span>
                    </span>
                  }
                  placeholder="$0.00"
                  type="text"
                />
              )}
            />
            <Controller
              name="projectTimeframe"
              control={control}
              rules={{ required: "Please enter a timeframe" }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  variant="bordered"
                  radius="sm"
                  labelPlacement="outside"
                  classNames={responsiveClasses}
                  className="lg:w-96 w-full"
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  label={
                    <span>
                      Project Timeframe <span className="text-red-500">*</span>
                    </span>
                  }
                  placeholder="1 days, 2 days, 3 days, 10 days, 30 days"
                  type="number"
                />
              )}
            />

            <div className="flex items-center lg:justify-start justify-between gap-3 lg:gap-2 w-full lg:w-48 pt-4 lg:pt-0">
              <Button type="reset" size="sm" radius="full" variant="flat" className="flex-1 lg:flex-none bg-white lg:bg-default-100 border border-gray-100 lg:border-none shadow-sm lg:shadow-none min-h-[52px] lg:min-h-8 text-sm lg:text-xs text-gray-500 font-semibold px-4 lg:px-10">
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                radius="full"
                variant="outlined"
                className="flex-1 lg:flex-none border-none text-[#035A7A] lg:text-customWhiteBgText text-sm lg:text-xs shadow-md font-semibold px-4 lg:px-10 min-h-[52px] lg:min-h-8"
                style={{
                  background:
                    "radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)",
                }}
              >
                {isEditMode ? "Update" : "Publish Project"}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </PageContainer>
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
