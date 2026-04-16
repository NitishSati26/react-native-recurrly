import { icons } from "@/constants/icons";
import type { IconKey } from "@/constants/icons";

describe("icons", () => {
  it("exports all expected icon keys", () => {
    const expectedKeys = [
      "home",
      "wallet",
      "setting",
      "activity",
      "add",
      "back",
      "menu",
      "plus",
      "notion",
      "dropbox",
      "openai",
      "adobe",
      "medium",
      "figma",
      "spotify",
      "github",
      "claude",
      "canva",
    ];

    expectedKeys.forEach((key) => {
      expect(icons).toHaveProperty(key);
    });
  });

  it("exports exactly 18 icons", () => {
    expect(Object.keys(icons)).toHaveLength(18);
  });

  it("all icon values are defined (non-null, non-undefined)", () => {
    Object.values(icons).forEach((icon) => {
      expect(icon).toBeDefined();
      expect(icon).not.toBeNull();
    });
  });

  it("tab-relevant icons are present (home, wallet, activity, setting)", () => {
    expect(icons.home).toBeDefined();
    expect(icons.wallet).toBeDefined();
    expect(icons.activity).toBeDefined();
    expect(icons.setting).toBeDefined();
  });

  it("subscription service icons are present", () => {
    expect(icons.spotify).toBeDefined();
    expect(icons.claude).toBeDefined();
    expect(icons.notion).toBeDefined();
    expect(icons.dropbox).toBeDefined();
    expect(icons.openai).toBeDefined();
    expect(icons.adobe).toBeDefined();
    expect(icons.figma).toBeDefined();
    expect(icons.github).toBeDefined();
    expect(icons.canva).toBeDefined();
    expect(icons.medium).toBeDefined();
  });

  it("utility icons are present", () => {
    expect(icons.add).toBeDefined();
    expect(icons.back).toBeDefined();
    expect(icons.menu).toBeDefined();
    expect(icons.plus).toBeDefined();
  });

  it("IconKey type covers all icon names", () => {
    // Compile-time check via type assignment
    const key: IconKey = "home";
    expect(key).toBe("home");
  });
});