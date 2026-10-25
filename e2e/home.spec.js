import { test, expect } from "@playwright/test";

test("home page shows sticker features and a working contact destination", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator(".home-sticker")).toHaveCount(3);
  await expect(
    page.getByRole("heading", { name: "Let's talk about your next step." }),
  ).toBeVisible();
  await expect(page.getByLabel("Your name")).toBeVisible();
  await expect(page.getByLabel("Your email")).toBeVisible();
  await expect(page.getByLabel("How can we help?")).toBeVisible();
  await expect(page.getByRole("link", { name: /rawanabusittah@gmail.com/ }))
    .toHaveAttribute("href", "mailto:rawanabusittah@gmail.com");
});

test("home page has accessible keyboard entry and contact labels", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await expect(page.locator("main#main-content")).toHaveAttribute(
    "tabindex",
    "-1",
  );
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByLabel("Your name")).toHaveAttribute("required", "");
  await expect(page.getByLabel("Your email")).toHaveAttribute("type", "email");
});

test("home page exposes useful SEO metadata", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Free Professional Resume Builder/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /ATS-friendly resume/,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    /Free Professional Resume Builder/,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary",
  );

  await page.getByRole("banner").getByRole("link", { name: "Build CV" }).click();
  await expect(page).toHaveTitle(/Build Your Resume - CV Master/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Add your experience, skills, education/,
  );

  await page.goto("/#/templates");
  await expect(page).toHaveTitle(/Professional Resume Templates - CV Master/);
  await page.getByRole("link", { name: /View details for Classic Professional/ })
    .click();
  await expect(page).toHaveTitle(/Professional Resume Template - CV Master/);
});

test("home page updates its SEO metadata for Arabic", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("banner").getByRole("button", {
    name: "Change language",
  }).click();

  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page).toHaveTitle(/منشئ سيرة ذاتية احترافية مجانًا/);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    "content",
    "ar_AR",
  );
});

test("feature sticker text meets WCAG AA contrast in both themes", async ({
  page,
}) => {
  await page.goto("/");

  async function readStickerContrast() {
    return page.evaluate(() => {
      const luminance = (color) => {
        const rgb = color.match(/[\d.]+/g).slice(0, 3).map(Number);
        const channels = rgb.map((value) => {
          const normalized = value / 255;
          return normalized <= 0.04045
            ? normalized / 12.92
            : ((normalized + 0.055) / 1.055) ** 2.4;
        });
        return (
          0.2126 * channels[0] +
          0.7152 * channels[1] +
          0.0722 * channels[2]
        );
      };

      return [...document.querySelectorAll(".home-sticker p")].map((text) => {
        const foreground = luminance(getComputedStyle(text).color);
        const background = luminance(
          getComputedStyle(text.closest(".home-sticker")).backgroundColor,
        );
        return (
          (Math.max(foreground, background) + 0.05) /
          (Math.min(foreground, background) + 0.05)
        );
      });
    });
  }

  for (const ratio of await readStickerContrast()) {
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  }

  await page.getByRole("banner").getByRole("button", {
    name: "Toggle dark mode",
  }).click();
  for (const ratio of await readStickerContrast()) {
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  }
});

test("home page stays within startup performance budgets", async ({ page }) => {
  await page.addInitScript(() => {
    window.__auditVitals = { lcp: 0, cls: 0 };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__auditVitals.lcp = entry.startTime;
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__auditVitals.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });

  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const transferBytes = performance
      .getEntriesByType("resource")
      .reduce((total, entry) => total + (entry.transferSize || 0), 0);

    return {
      domContentLoaded: navigation.domContentLoadedEventEnd,
      transferBytes,
      resourceCount: performance.getEntriesByType("resource").length,
      ...window.__auditVitals,
    };
  });

  if (metrics.lcp > 0) expect(metrics.lcp).toBeLessThan(2500);
  expect(metrics.cls).toBeLessThan(0.1);
  expect(metrics.domContentLoaded).toBeLessThan(4000);
  expect(metrics.transferBytes).toBeLessThan(1_000_000);
  expect(metrics.resourceCount).toBeLessThan(40);
});
