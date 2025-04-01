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

  return (
    <div className="max-w-[1500px] mx-auto p-6">
      <p className="font-bold text-2xl mb-6">Post A Job</p>
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
          name="fashionStyle"
          defaultItems={fashionDesignerSkills}
          label="Fashion Style"
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
          name="
          budgetType"
          placeholder="Select"
        >
          {fashionDesignerSkills.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>
        <Select
          variant="bordered"
          radius="sm"
          labelPlacement="outside"
          classNames={classes}
          className="lg:w-60 w-full"
          name="projectDuration"
          label="Project Duration"
          placeholder="Select"
        >
          {fashionDesignerSkills.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>
        <div className="flex items-center gap-4 w-40">
          <Button type="reset">Cancle</Button>
          <Button type="submit">Publish</Button>
        </div>
      </Form>
    </div>
  );
};

export default Page;
