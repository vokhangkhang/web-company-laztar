  export const handleKeyNavigation = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
    const target = e.currentTarget;
    const form = target.form;
    if (!form) return;

    const elements = Array.from(form.elements).filter(
      (el) => el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement ||el instanceof HTMLButtonElement
    ) as HTMLElement[];

    const index = elements.indexOf(target);

    const isTextarea = target.tagName === "TEXTAREA";

    if (target.tagName === "TEXTAREA" && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const submitButton = elements.find(
        (el) => el instanceof HTMLButtonElement && (el as HTMLButtonElement).type === "submit"
      );

      submitButton?.focus?.();
      return;
    }
    if (isTextarea && e.key === "Enter" && e.shiftKey) {
      return;
    }
    if (isTextarea && e.key === "Enter") {
      e.preventDefault();
      elements[index + 1]?.focus?.();
      return;
    }

    if (!isTextarea && e.key === "Enter") {
      e.preventDefault();
      elements[index + 1]?.focus?.();
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

    const caretAtEnd =
      target.selectionStart === target.value.length &&
      target.selectionStart === target.selectionEnd;

    const caretAtStart =
      target.selectionStart === 0 &&
      target.selectionStart === target.selectionEnd;

    if (e.key === "ArrowRight" && caretAtEnd) {
      e.preventDefault();
      elements[(index + 1) % elements.length]?.focus();
    } else if (e.key === "ArrowLeft" && caretAtStart) {
      e.preventDefault();
      elements[(index - 1 + elements.length) % elements.length]?.focus();
    }
  };