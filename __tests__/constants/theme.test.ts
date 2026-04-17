import { colors, components, spacing, theme } from "@/constants/theme";

describe("colors", () => {
  it("exports all required color keys", () => {
    expect(colors).toHaveProperty("background");
    expect(colors).toHaveProperty("foreground");
    expect(colors).toHaveProperty("card");
    expect(colors).toHaveProperty("muted");
    expect(colors).toHaveProperty("mutedForeground");
    expect(colors).toHaveProperty("primary");
    expect(colors).toHaveProperty("accent");
    expect(colors).toHaveProperty("border");
    expect(colors).toHaveProperty("success");
    expect(colors).toHaveProperty("destructive");
    expect(colors).toHaveProperty("subscription");
  });

  it("has correct hex values for key colors", () => {
    expect(colors.background).toBe("#fff9e3");
    expect(colors.foreground).toBe("#081126");
    expect(colors.primary).toBe("#081126");
    expect(colors.accent).toBe("#ea7a53");
    expect(colors.success).toBe("#16a34a");
    expect(colors.destructive).toBe("#dc2626");
    expect(colors.subscription).toBe("#8fd1bd");
  });

  it("has rgba values for semi-transparent colors", () => {
    expect(colors.mutedForeground).toBe("rgba(0, 0, 0, 0.6)");
    expect(colors.border).toBe("rgba(0, 0, 0, 0.1)");
  });

  it("exports exactly 11 color keys", () => {
    expect(Object.keys(colors)).toHaveLength(11);
  });
});

describe("spacing", () => {
  it("exports spacing scale values", () => {
    expect(spacing[0]).toBe(0);
    expect(spacing[1]).toBe(4);
    expect(spacing[2]).toBe(8);
    expect(spacing[4]).toBe(16);
    expect(spacing[8]).toBe(32);
  });

  it("uses 4px base unit increments", () => {
    expect(spacing[1]).toBe(4);
    expect(spacing[2]).toBe(8);
    expect(spacing[3]).toBe(12);
    expect(spacing[4]).toBe(16);
    expect(spacing[5]).toBe(20);
  });

  it("has larger spacing values", () => {
    expect(spacing[18]).toBe(72);
    expect(spacing[20]).toBe(80);
    expect(spacing[24]).toBe(96);
    expect(spacing[30]).toBe(120);
  });
});

describe("components.tabBar", () => {
  const tabBar = components.tabBar;

  it("exports all required tabBar properties", () => {
    expect(tabBar).toHaveProperty("height");
    expect(tabBar).toHaveProperty("horizontalInset");
    expect(tabBar).toHaveProperty("radius");
    expect(tabBar).toHaveProperty("iconFrame");
    expect(tabBar).toHaveProperty("itemPaddingVertical");
  });

  it("derives tabBar values from spacing scale", () => {
    // height = spacing[18] = 72
    expect(tabBar.height).toBe(72);
    // horizontalInset = spacing[5] = 20
    expect(tabBar.horizontalInset).toBe(20);
    // radius = spacing[8] = 32
    expect(tabBar.radius).toBe(32);
    // iconFrame = spacing[12] = 48
    expect(tabBar.iconFrame).toBe(48);
    // itemPaddingVertical = spacing[2] = 8
    expect(tabBar.itemPaddingVertical).toBe(8);
  });

  it("has positive numeric values for all tabBar dimensions", () => {
    expect(tabBar.height).toBeGreaterThan(0);
    expect(tabBar.horizontalInset).toBeGreaterThan(0);
    expect(tabBar.radius).toBeGreaterThan(0);
    expect(tabBar.iconFrame).toBeGreaterThan(0);
    expect(tabBar.itemPaddingVertical).toBeGreaterThan(0);
  });

  it("height is larger than iconFrame", () => {
    expect(tabBar.height).toBeGreaterThan(tabBar.iconFrame);
  });
});

describe("theme aggregate", () => {
  it("re-exports colors under theme.colors", () => {
    expect(theme.colors).toBe(colors);
  });

  it("re-exports spacing under theme.spacing", () => {
    expect(theme.spacing).toBe(spacing);
  });

  it("re-exports components under theme.components", () => {
    expect(theme.components).toBe(components);
  });

  it("has exactly the 3 expected top-level keys", () => {
    expect(Object.keys(theme)).toEqual(["colors", "spacing", "components"]);
  });
});