export const projectSlice = (set, get) => ({
  projects: [
    {
      id: 1,
      title: 'Modern Fashion Attire Illustration Classic .....',
      date: '25-06-2024',
      status: 'Active',
      proposals: 3,
      replies: 0,
      hired: 0,
    },
    {
      id: 2,
      title: 'Modern Fashion Attire Illustration Classic....',
      date: '25-06-2024',
      status: 'Active',
      proposals: 3,
      replies: 0,
      hired: 0,
    },
    {
      id: 3,
      title: 'Modern Fashion Attire Illustration Classic....',
      date: '25-06-2024',
      status: 'Active',
      proposals: 3,
      replies: 0,
      hired: 0,
    },
    {
      id: 4,
      title: 'Modern Fashion Attire Illustration Classic....',
      date: '25-06-2024',
      status: 'Active',
      proposals: 3,
      replies: 0,
      hired: 0,
    },
    {
      id: 5,
      title: 'Modern Fashion Attire Illustration Classic....',
      date: '25-06-2024',
      status: 'Active',
      proposals: 3,
      replies: 0,
      hired: 0,
    },
  ],
  editProject: null,

  addProject: (project) =>
    set((state) => ({
      projects: [
        ...state.projects,
        { ...project, id: Date.now(), date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'), status: 'Active', proposals: 0, replies: 0, hired: 0 },
      ],
    })),

  updateProject: (id, updatedProject) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, ...updatedProject } : p)),
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),

  setEditProject: (project) => set({ editProject: project }),
  clearEditProject: () => set({ editProject: null }),
});
