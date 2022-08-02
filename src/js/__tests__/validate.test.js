import Validate from "../validate";

describe("correct coordinates", () => {
  test("1", () => {
    const validate = new Validate("51.50851, -0.12572");
    expect(validate.check()).toEqual(true);
  });
  test("2", () => {
    const validate = new Validate("51.50851,-0.12572");
    expect(validate.check("51.50851,-0.12572")).toEqual(true);
  });
  test("3", () => {
    const validate = new Validate("[51.50851,-0.12572]");
    expect(validate.check()).toEqual(true);
  });
});

describe("wrong coordinates", () => {
  test("1", () => {
    const validate = new Validate("5, 5");
    expect(validate.check()).toEqual(false);
  });
  test("2", () => {
    const validate = new Validate("test");
    expect(validate.check()).toEqual(false);
  });
  test("3", () => {
    const validate = new Validate(".098066536,-0.56768572, 5.487759");
    expect(validate.check()).toEqual(false);
  });
});
