import formatLikeMessage from "../formatLikeMessage";
import partialRight from "ramda/src/partialRight";

describe("formatLikeMessage", () => {
  it("returns a formatted message that takes into account viewer and pluralization", () => {
    const suffix = "liked this";
    const withViewer = partialRight(formatLikeMessage, [true, suffix]);
    const withoutViewer = partialRight(formatLikeMessage, [false, suffix]);

    expect(withViewer(1)).toEqual("You liked this");
    expect(withViewer(2)).toEqual("You and 1 person liked this");
    expect(withViewer(5)).toEqual("You and 4 people liked this");

    expect(withoutViewer(1)).toEqual("1 person liked this");
    expect(withoutViewer(2)).toEqual("2 people liked this");
    expect(withoutViewer(5)).toEqual("5 people liked this");
  });
});
