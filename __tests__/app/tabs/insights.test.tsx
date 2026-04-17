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

import Insights from "@/app/(tabs)/insights";

describe("Insights screen", () => {
  it("renders without crashing", () => {
    expect(() => render(<Insights />)).not.toThrow();
  });

  it('displays the "Insights" text', () => {
    render(<Insights />);
    expect(screen.getByText("Insights")).toBeTruthy();
  });

  it("renders exactly one Text element with 'Insights'", () => {
    render(<Insights />);
    const elements = screen.getAllByText("Insights");
    expect(elements).toHaveLength(1);
  });
});