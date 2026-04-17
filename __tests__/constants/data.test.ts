import { tabs } from "@/constants/data";
import { icons } from "@/constants/icons";

describe("tabs", () => {
  it("exports an array with 4 tab entries", () => {
    expect(tabs).toHaveLength(4);
  });

  it("contains the Home tab as the first entry", () => {
    expect(tabs[0]).toEqual({
      name: "index",
      title: "Home",
      icon: icons.home,
    });
  });

  it("contains the Subscriptions tab", () => {
    const subscriptionsTab = tabs.find((t) => t.name === "subscriptions");
    expect(subscriptionsTab).toBeDefined();
    expect(subscriptionsTab!.title).toBe("Subscriptions");
    expect(subscriptionsTab!.icon).toBe(icons.wallet);
  });

  it("contains the Insights tab", () => {
    const insightsTab = tabs.find((t) => t.name === "insights");
    expect(insightsTab).toBeDefined();
    expect(insightsTab!.title).toBe("Insights");
    expect(insightsTab!.icon).toBe(icons.activity);
  });

  it("contains the Settings tab", () => {
    const settingsTab = tabs.find((t) => t.name === "settings");
    expect(settingsTab).toBeDefined();
    expect(settingsTab!.title).toBe("Settings");
    expect(settingsTab!.icon).toBe(icons.setting);
  });

  it("every tab has name, title, and icon properties", () => {
    tabs.forEach((tab) => {
      expect(tab).toHaveProperty("name");
      expect(tab).toHaveProperty("title");
      expect(tab).toHaveProperty("icon");
      expect(typeof tab.name).toBe("string");
      expect(typeof tab.title).toBe("string");
      expect(tab.icon).toBeDefined();
    });
  });

  it("tab names are unique", () => {
    const names = tabs.map((t) => t.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(tabs.length);
  });

  it("tab order is index, subscriptions, insights, settings", () => {
    expect(tabs.map((t) => t.name)).toEqual([
      "index",
      "subscriptions",
      "insights",
      "settings",
    ]);
  });
});