import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import { createPinia, setActivePinia } from "pinia";
import en from "../../i18n/locales/en.json";
import ar from "../../i18n/locales/ar.json";
import { cvSections } from "../../data/sections";
import { useResumeStore } from "../../stores/resume";
import SectionModal from "./SectionModal.vue";

const i18n = createI18n({ legacy: false, locale: "en", messages: { en, ar } });

describe("SectionModal", () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it("renders title, desc and labels from i18n", () => {
    const section = cvSections.find((s) => s.key === "profile");
    const wrapper = mount(SectionModal, {
      props: { show: true, section, editIndex: null },
      global: { plugins: [i18n] },
    });
    expect(wrapper.text()).toContain("Profile");
    expect(wrapper.text()).toContain("Add a short summary");
    expect(wrapper.text()).toContain("Summary");
  });

  it("loads existing item when editIndex provided", () => {
    const store = useResumeStore();
    const section = cvSections.find((s) => s.key === "profile");
    store.resumeData.profile = [{ summary: "Saved summary" }];
    const wrapper = mount(SectionModal, {
      props: { show: true, section, editIndex: 0 },
      global: { plugins: [i18n] },
    });
    const textarea = wrapper.find("textarea");
    expect(textarea.element.value).toBe("Saved summary");
  });

  it("translates select options", () => {
    const section = cvSections.find((s) => s.key === "skills");
    const wrapper = mount(SectionModal, {
      props: { show: true, section, editIndex: null },
      global: { plugins: [i18n] },
    });
    expect(wrapper.text()).toContain("Beginner");
    expect(wrapper.text()).toContain("Intermediate");
    expect(wrapper.text()).toContain("Advanced");
  });

  it("labels the dialog and associates each field with its label", async () => {
    const section = cvSections.find((item) => item.key === "profile");
    const wrapper = mount(SectionModal, {
      props: { show: true, section, editIndex: null },
      global: { plugins: [i18n] },
    });

    const dialog = wrapper.get('[role="dialog"]');
    expect(dialog.attributes("aria-modal")).toBe("true");
    expect(dialog.attributes("aria-labelledby")).toBe("sectionModalTitle");

    const label = wrapper.get("label[for]");
    expect(wrapper.get(`#${label.attributes("for")}`).exists()).toBe(true);

    await dialog.trigger("keydown", { key: "Escape" });
    expect(wrapper.emitted("close")).toHaveLength(1);
  });
});
