export interface ProjectFormValues {
  projectTitle: string;
  projectDetails: string;
  fashionDesignerSkills: string[];
  designStyles: string[];
  projectBudget: string;
  projectTimeframe: string;
  durationType: 'days';
  projectCurrency: string;
  projectStatus: string;
}

export interface SelectedProjectFile {
  name: string;
  size: string;
  originalFile: File;
}
