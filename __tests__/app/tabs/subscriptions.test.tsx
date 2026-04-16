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

import Subscriptions from "@/app/(tabs)/subscriptions";

describe("Subscriptions screen", () => {
  it("renders without crashing", () => {
    expect(() => render(<Subscriptions />)).not.toThrow();
  });

  it('displays the "Subscriptions" text', () => {
    render(<Subscriptions />);
    expect(screen.getByText("Subscriptions")).toBeTruthy();
  });

  it("renders exactly one Text element with 'Subscriptions'", () => {
    render(<Subscriptions />);
    const elements = screen.getAllByText("Subscriptions");
    expect(elements).toHaveLength(1);
  });
});