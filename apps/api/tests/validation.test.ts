import { describe, expect, test } from "bun:test";
import { ValidateFiles, ValidateQuote, FileExtension } from "../src/lib/validation.ts";

function BaseForm(): FormData {
  const form = new FormData();
  form.set("fullName", "Jean Dupont");
  form.set("phone", "06 12 34 56 78");
  form.set("email", "jean@example.com");
  form.set("city", "Savigny-le-Temple");
  form.set("workType", "peinture-interieure");
  form.set("description", "Repeindre le séjour.");
  form.set("consent", "true");
  return form;
}

describe("ValidateQuote — champs obligatoires", () => {
  test("formulaire complet valide", () => {
    const result = ValidateQuote(BaseForm());
    expect(result.valid).toBe(true);
    expect(result.data?.fullName).toBe("Jean Dupont");
  });

  test("refuse nom manquant", () => {
    const form = BaseForm();
    form.delete("fullName");
    const result = ValidateQuote(form);
    expect(result.valid).toBe(false);
  });

  test("refuse consentement absent", () => {
    const form = BaseForm();
    form.set("consent", "false");
    const result = ValidateQuote(form);
    expect(result.valid).toBe(false);
  });
});

describe("ValidateQuote — formats", () => {
  test("refuse email invalide", () => {
    const form = BaseForm();
    form.set("email", "pas-un-email");
    expect(ValidateQuote(form).valid).toBe(false);
  });

  test("refuse téléphone invalide", () => {
    const form = BaseForm();
    form.set("phone", "abc");
    expect(ValidateQuote(form).valid).toBe(false);
  });

  test("trim des espaces", () => {
    const form = BaseForm();
    form.set("fullName", "  Marie  ");
    const result = ValidateQuote(form);
    expect(result.data?.fullName).toBe("Marie");
  });
});

describe("ValidateQuote — listes fermées", () => {
  test("accepte une surface valide", () => {
    const form = BaseForm();
    form.set("surface", "30-60");
    expect(ValidateQuote(form).valid).toBe(true);
  });

  test("refuse une surface inconnue", () => {
    const form = BaseForm();
    form.set("surface", "1000m2");
    expect(ValidateQuote(form).valid).toBe(false);
  });

  test("filtre les pièces valides et refuse les inconnues", () => {
    const form = BaseForm();
    form.append("rooms", "cuisine");
    form.append("rooms", "salon");
    expect(ValidateQuote(form).valid).toBe(true);

    const bad = BaseForm();
    bad.append("rooms", "piscine");
    expect(ValidateQuote(bad).valid).toBe(false);
  });
});

describe("FileExtension", () => {
  test("extrait l'extension en minuscule", () => {
    expect(FileExtension("PHOTO.JPG")).toBe(".jpg");
    expect(FileExtension("image.webp")).toBe(".webp");
    expect(FileExtension("sansext")).toBe("");
  });
});

describe("ValidateFiles", () => {
  test("accepte un JPEG valide", () => {
    const file = new File([new Uint8Array(10)], "photo.jpg", { type: "image/jpeg" });
    expect(ValidateFiles([file]).valid).toBe(true);
  });

  test("refuse un type non autorisé", () => {
    const file = new File([new Uint8Array(10)], "doc.pdf", { type: "application/pdf" });
    expect(ValidateFiles([file]).valid).toBe(false);
  });

  test("refuse un fichier trop volumineux", () => {
    const big = new File([new Uint8Array(6 * 1024 * 1024)], "big.png", {
      type: "image/png",
    });
    expect(ValidateFiles([big]).valid).toBe(false);
  });

  test("refuse plus de 5 fichiers", () => {
    const files = Array.from(
      { length: 6 },
      (_, i) => new File([new Uint8Array(1)], `p${i}.png`, { type: "image/png" }),
    );
    expect(ValidateFiles(files).valid).toBe(false);
  });
});
