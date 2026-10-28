import { useShallow } from 'zustand/react/shallow';
import { useAppStore } from '@/store';
import type { AppStore } from '@/store';

export const selectProjects = (state: AppStore) => state.projects;

export const selectProjectEditor = (state: AppStore) => ({
  addProject: state.addProject,
  clearEditProject: state.clearEditProject,
  editProject: state.editProject,
  updateProject: state.updateProject,
});

export const selectProjectManagement = (state: AppStore) => ({
  deleteProject: state.deleteProject,
  projects: state.projects,
  setEditProject: state.setEditProject,
});

export const useProjectEditor = () => useAppStore(useShallow(selectProjectEditor));

export const useProjectManagement = () =>
  useAppStore(useShallow(selectProjectManagement));
