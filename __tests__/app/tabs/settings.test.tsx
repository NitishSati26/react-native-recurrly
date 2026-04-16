import React from "react";
import { render, screen } from "@testing-library/react-native";

jest.mock("nativewind", () => ({
  styled: (Component: React.ComponentType<any>) => Component,
}));

jest.mock("react-native-safe-area-context", () => {
  const { View } = require("react-native");
  return {
    SafeAreaView: View,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

import Settings from "@/app/(tabs)/settings";

describe("Settings screen", () => {
  it("renders without crashing", () => {
    expect(() => render(<Settings />)).not.toThrow();
  });

  it('displays the "Settings" text', () => {
    render(<Settings />);
    expect(screen.getByText("Settings")).toBeTruthy();
  });

  it("renders exactly one Text element with 'Settings'", () => {
    render(<Settings />);
    const elements = screen.getAllByText("Settings");
    expect(elements).toHaveLength(1);
  });
});