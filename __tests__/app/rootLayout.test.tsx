import React from "react";
import { render } from "@testing-library/react-native";

jest.mock("@/global.css", () => ({}));

// Capture registered screens here so we can inspect from tests
const registeredScreens: Array<{ name: string; options?: any }> = [];

jest.mock("expo-router", () => {
  const ScreenMock = ({ name, options }: { name: string; options?: any }) => {
    registeredScreens.push({ name, options });
    return null;
  };

  const StackMock = ({ children }: { children?: React.ReactNode }) => {
    const { View } = require("react-native");
    return <View>{children}</View>;
  };
  StackMock.Screen = ScreenMock;

  return { Stack: StackMock };
});

import RootLayout from "@/app/_layout";

describe("RootLayout", () => {
  beforeEach(() => {
    registeredScreens.length = 0;
  });

  it("renders without crashing", () => {
    expect(() => render(<RootLayout />)).not.toThrow();
  });

  it("registers the (tabs) screen", () => {
    render(<RootLayout />);
    const tabsScreen = registeredScreens.find((s) => s.name === "(tabs)");
    expect(tabsScreen).toBeDefined();
  });

  it("registers the (auth) screen", () => {
    render(<RootLayout />);
    const authScreen = registeredScreens.find((s) => s.name === "(auth)");
    expect(authScreen).toBeDefined();
  });

  it("registers exactly 2 screens", () => {
    render(<RootLayout />);
    expect(registeredScreens).toHaveLength(2);
  });

  it("registered screen names are (tabs) and (auth)", () => {
    render(<RootLayout />);
    const names = registeredScreens.map((s) => s.name).sort();
    expect(names).toEqual(["(auth)", "(tabs)"]);
  });
});