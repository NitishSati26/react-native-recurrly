import React from "react";
import { render, screen } from "@testing-library/react-native";

const mockUseLocalSearchParams = jest.fn<{ id: string }, []>();

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => mockUseLocalSearchParams(),
  Link: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string | object;
  }) => {
    const { Text } = require("react-native");
    return <Text testID={`link-${href}`}>{children}</Text>;
  },
}));

import SubscriptionDetails from "@/app/subscriptions/[id]";

describe("SubscriptionDetails screen", () => {
  it("renders without crashing when an id is provided", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: "spotify" });
    expect(() => render(<SubscriptionDetails />)).not.toThrow();
  });

  it("displays the subscription id in the text", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: "spotify" });
    render(<SubscriptionDetails />);
    expect(screen.getByText("SubscriptionDetails: spotify")).toBeTruthy();
  });

  it("displays the correct id for claude", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: "claude" });
    render(<SubscriptionDetails />);
    expect(screen.getByText("SubscriptionDetails: claude")).toBeTruthy();
  });

  it("renders a 'Go Back' link pointing to '/'", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: "spotify" });
    render(<SubscriptionDetails />);
    expect(screen.getByText("Go Back")).toBeTruthy();
    expect(screen.getByTestId("link-/")).toBeTruthy();
  });

  it("handles an empty id gracefully", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: "" });
    render(<SubscriptionDetails />);
    expect(screen.getByText("SubscriptionDetails: ")).toBeTruthy();
  });

  it("displays different content for different ids", () => {
    const { unmount } = render(
      (() => {
        mockUseLocalSearchParams.mockReturnValue({ id: "notion" });
        return <SubscriptionDetails />;
      })()
    );
    expect(screen.getByText("SubscriptionDetails: notion")).toBeTruthy();
    unmount();

    mockUseLocalSearchParams.mockReturnValue({ id: "github" });
    render(<SubscriptionDetails />);
    expect(screen.getByText("SubscriptionDetails: github")).toBeTruthy();
  });
});