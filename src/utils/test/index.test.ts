import { validateCNPJ, validateCPF } from "..";

describe("validateCPF", () => {
  it("returns false for invalid CPF", () => {
    const invalidCPF = "00000000000";
    expect(validateCPF(invalidCPF)).toBe(false);
  });

  it("returns true for valid CPF", () => {
    const validCPF = "52998224725";
    expect(validateCPF(validCPF)).toBe(true);
  });

  it("returns true for valid CPF with special characters", () => {
    const validCPFWithSpecialChars = "529.982.247-25";
    expect(validateCPF(validCPFWithSpecialChars)).toBe(true);
  });
});

describe("validateCNPJ", () => {
  it("returns false for invalid CNPJ", () => {
    const invalidCNPJ = "11111111111111";
    expect(validateCNPJ(invalidCNPJ)).toBe(false);
  });

  it("returns false for CNPJ with all digits the same", () => {
    const sameDigitsCNPJ = "00000000000000";
    expect(validateCNPJ(sameDigitsCNPJ)).toBe(false);
  });

  it("returns true for valid CNPJ", () => {
    const validCNPJ = "11444777000161";
    expect(validateCNPJ(validCNPJ)).toBe(true);
  });

  it("returns true for valid CNPJ with special characters", () => {
    const validCNPJWithSpecialChars = "11.444.777/0001-61";
    expect(validateCNPJ(validCNPJWithSpecialChars)).toBe(true);
  });
});
