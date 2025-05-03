
declare global {
  interface Window {
    uploadcare: {
      Widget: (selector: string | HTMLElement) => {
        value: (value: any) => void;
        onChange: (callback: (file: any) => void) => void;
      };
    };
  }
}

export {};
