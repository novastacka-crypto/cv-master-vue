import { test, expect } from "@playwright/test";

test("builder: open the page from the main navigation", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("banner")
    .getByRole("link", { name: "Build CV" })
    .click();

  await expect(page).toHaveURL(/#\/builder$/);
  await expect(
    page.getByRole("heading", { name: "Build Your Resume" }),
  ).toBeVisible();
});

test("builder: opens the cloud account page", async ({ page }) => {
  await page.goto("/#/builder");
  await page.getByRole("link", { name: "Cloud Account" }).click();

  await expect(page).toHaveURL(/#\/account$/);
  await expect(
    page.getByRole("heading", { name: "Your cloud account" }),
  ).toBeVisible();
  // Cloud storage may or may not be configured depending on env.
  const configured = await page
    .getByRole("textbox", { name: "Email address" })
    .isVisible()
    .catch(() => false);
  if (!configured) {
    await expect(page.getByRole("status")).toContainText(
      "Cloud storage is not configured yet",
    );
  }
});

test("builder: opens when stored resume data is invalid", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("cv_resumeData", "null");
  });
  await page.goto("/#/builder");

  await expect(
    page.getByRole("heading", { name: "Build Your Resume" }),
  ).toBeVisible();
});

test("builder: add a profile section", async ({ page }) => {
  await page.goto("/#/builder");

  // Open Profile card
  await page.locator(".cv-card", { hasText: "Profile" }).click();

  // Fill summary
  await page.locator("textarea").fill("My professional summary");

  // Save
  await page.locator(".btn-save").click();

  // Preview shows the item
  await expect(page.locator(".cv-preview-item")).toContainText(
    "My professional summary",
  );
});

test("templates page links to template files", async ({ page }) => {
  await page.goto("/#/templates");
  const href = await page.locator("a.btn-success").first().getAttribute("href");
  expect(href).toBe("templates/template1.html");
});

test("section dialogs are keyboard accessible and restore focus", async ({
  page,
}) => {
  await page.goto("/#/builder");

  const profileButton = page.getByRole("button", { name: /^Profile/ });
  await profileButton.focus();
  await page.keyboard.press("Enter");

  const dialog = page.getByRole("dialog", { name: "Profile" });
  await expect(dialog).toBeVisible();
  const summary = dialog.getByRole("textbox", { name: "Summary" });
  await expect(summary).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(profileButton).toBeFocused();
});

test("preview dialog closes with Escape and returns focus", async ({
  page,
}) => {
  await page.goto("/#/builder");

  const previewButton = page.getByRole("button", { name: "Live Preview" });
  await previewButton.click();
  const dialog = page.getByRole("dialog", { name: "Resume Preview" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(previewButton).toBeFocused();
});

test("accent colors can be selected with arrow keys", async ({ page }) => {
  await page.goto("/#/builder");
  await page.getByRole("button", { name: "Colors" }).click();

  const selectedColor = page.getByRole("radio", {
    name: "Select color #176b5b",
  });
  await selectedColor.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".color-option:focus")).toHaveAttribute(
    "aria-checked",
    "true",
  );
});
