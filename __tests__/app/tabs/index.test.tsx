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

jest.mock("expo-router", () => ({
  Link: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string | object;
  }) => {
    const { Text } = require("react-native");
    return <Text testID={`link-${typeof href === "string" ? href : JSON.stringify(href)}`}>{children}</Text>;
  },
}));

jest.mock("@/global.css", () => ({}));

import App from "@/app/(tabs)/index";

describe("Home screen (index)", () => {
  it("renders without crashing", () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it("displays the welcome text", () => {
    render(<App />);
    expect(screen.getByText("Welcome to Nativewind!")).toBeTruthy();
  });

  it("renders a link to onboarding", () => {
    render(<App />);
    expect(screen.getByText("Go to Onboarding")).toBeTruthy();
  });

  it("renders a link to sign-in", () => {
    render(<App />);
    expect(screen.getByText("Go to Sign in")).toBeTruthy();
  });

  it("renders a link to sign-up", () => {
    render(<App />);
    expect(screen.getByText("Go to Sign up")).toBeTruthy();
  });

  it("renders a link to the spotify subscription page", () => {
    render(<App />);
    expect(screen.getByText("Spotify Subscription")).toBeTruthy();
  });

  it("renders a link to the claude subscription page", () => {
    render(<App />);
    expect(screen.getByText("Claude Max Subscription")).toBeTruthy();
  });

  it("spotify link points to /subscriptions/spotify", () => {
    render(<App />);
    expect(screen.getByTestId("link-/subscriptions/spotify")).toBeTruthy();
  });

  it("claude link uses dynamic route params with id=claude", () => {
    render(<App />);
    const expectedHref = JSON.stringify({
      pathname: "/subscriptions/[id]",
      params: { id: "claude" },
    });
    expect(screen.getByTestId(`link-${expectedHref}`)).toBeTruthy();
  });
});