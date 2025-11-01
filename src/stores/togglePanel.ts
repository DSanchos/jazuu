import { makeAutoObservable } from "mobx";

class TogglePanelStore {
  isPanel = false;

  constructor() {
    makeAutoObservable(this);
  }

  open = () => {
    this.isPanel = true;
  }

  close = () => {
    this.isPanel = false;
  }

  toggle = () => {
    this.isPanel = !this.isPanel;
  }
}

export const togglePanel = new TogglePanelStore();
