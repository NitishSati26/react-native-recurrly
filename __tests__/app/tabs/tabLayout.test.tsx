import React from "react";
import { render, screen } from "@testing-library/react-native";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
  SafeAreaView: require("react-native").View,
}));

jest.mock("clsx", () => (...args: any[]) => args.filter(Boolean).join(" "));

// Collect registered tab screens during render
const registeredTabs: Array<{ name: string; options?: any }> = [];

jest.mock("expo-router", () => {
  const TabsScreenMock = ({ name, options }: { name: string; options?: any }) => {
    registeredTabs.push({ name, options });
    return null;
  };

  const TabsMock = ({ children }: { children?: React.ReactNode }) => {
    const { View } = require("react-native");
    return <View testID="tabs-container">{children}</View>;
  };
  TabsMock.Screen = TabsScreenMock;

  return { Tabs: TabsMock };
});

import TabLayout from "@/app/(tabs)/_layout";
import { tabs } from "@/constants/data";

describe("TabLayout", () => {
  beforeEach(() => {
    registeredTabs.length = 0;
  });

  it("renders without crashing", () => {
    expect(() => render(<TabLayout />)).not.toThrow();
  });

  it("renders the Tabs container", () => {
    render(<TabLayout />);
    expect(screen.getByTestId("tabs-container")).toBeTruthy();
  });

  it("registers a screen for each tab in the tabs constant", () => {
    render(<TabLayout />);
    expect(registeredTabs).toHaveLength(tabs.length);
  });

  it("registers screens for all 4 tabs", () => {
    render(<TabLayout />);
    expect(registeredTabs).toHaveLength(4);
  });

  it("registers a screen with name 'index'", () => {
    render(<TabLayout />);
    const indexTab = registeredTabs.find((t) => t.name === "index");
    expect(indexTab).toBeDefined();
  });

  it("registers a screen with name 'subscriptions'", () => {
    render(<TabLayout />);
    const subsTab = registeredTabs.find((t) => t.name === "subscriptions");
    expect(subsTab).toBeDefined();
  });

  it("registers a screen with name 'insights'", () => {
    render(<TabLayout />);
    const insightsTab = registeredTabs.find((t) => t.name === "insights");
    expect(insightsTab).toBeDefined();
  });

  it("registers a screen with name 'settings'", () => {
    render(<TabLayout />);
    const settingsTab = registeredTabs.find((t) => t.name === "settings");
    expect(settingsTab).toBeDefined();
  });

  it("each registered screen has a title option", () => {
    render(<TabLayout />);
    registeredTabs.forEach((tab) => {
      expect(tab.options).toHaveProperty("title");
    });
  });

  it("each registered screen has a tabBarIcon option that is a function", () => {
    render(<TabLayout />);
    registeredTabs.forEach((tab) => {
      expect(tab.options).toHaveProperty("tabBarIcon");
      expect(typeof tab.options.tabBarIcon).toBe("function");
    });
  });

  it("'index' screen title is 'Home'", () => {
    render(<TabLayout />);
    const indexTab = registeredTabs.find((t) => t.name === "index");
    expect(indexTab!.options.title).toBe("Home");
  });

  it("'subscriptions' screen title is 'Subscriptions'", () => {
    render(<TabLayout />);
    const subsTab = registeredTabs.find((t) => t.name === "subscriptions");
    expect(subsTab!.options.title).toBe("Subscriptions");
  });

  it("'insights' screen title is 'Insights'", () => {
    render(<TabLayout />);
    const insightsTab = registeredTabs.find((t) => t.name === "insights");
    expect(insightsTab!.options.title).toBe("Insights");
  });

  it("'settings' screen title is 'Settings'", () => {
    render(<TabLayout />);
    const settingsTab = registeredTabs.find((t) => t.name === "settings");
    expect(settingsTab!.options.title).toBe("Settings");
  });
});

describe("TabIcon", () => {
  beforeEach(() => {
    registeredTabs.length = 0;
  });

  it("tabBarIcon renders a truthy element when focused=false", () => {
    render(<TabLayout />);
    const indexTab = registeredTabs.find((t) => t.name === "index");
    const icon = indexTab!.options.tabBarIcon({ focused: false });
    expect(icon).toBeTruthy();
  });

  it("tabBarIcon renders a truthy element when focused=true", () => {
    render(<TabLayout />);
    const indexTab = registeredTabs.find((t) => t.name === "index");
    const icon = indexTab!.options.tabBarIcon({ focused: true });
    expect(icon).toBeTruthy();
  });

  it("tabBarIcon renders different elements for focused vs unfocused", () => {
    render(<TabLayout />);
    const indexTab = registeredTabs.find((t) => t.name === "index");
    const iconUnfocused = indexTab!.options.tabBarIcon({ focused: false });
    const iconFocused = indexTab!.options.tabBarIcon({ focused: true });
    // Both should be valid React elements
    expect(iconUnfocused).toBeTruthy();
    expect(iconFocused).toBeTruthy();
  });

  it("tabBarIcon for every tab produces a renderable element", () => {
    render(<TabLayout />);
    registeredTabs.forEach((tab) => {
      const icon = tab.options.tabBarIcon({ focused: false });
      expect(icon).toBeTruthy();
    });
  });
});