# TODO

- [ ] Update `Client/src/components/Navbar.jsx`:
  - [ ] Add theme toggle (light/dark) using `localStorage` + toggling `document.documentElement.classList`.
  - [ ] Implement professional global search in navbar:
    - [ ] Fetch projects and tasks.
    - [ ] Search across project names and task names (and descriptions).
    - [ ] Show dropdown autocomplete results.
    - [ ] Navigate on click:
      - [ ] Project result → `/tasks/:projectId`.
      - [ ] Task result → `/tasks/:projectId?task=:taskId`.
  - [ ] Add keyboard UX (Enter to navigate, Esc to close dropdown).

- [ ] Verify by running the app and testing search + theme persistence.
