import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async open() {
    await test.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(authorName) {
    await test.step(`Assert article author name is visible`, async () => {
      const articleAuthorName = this.page
        .getByRole('link', {
          name: authorName,
        })
        .first();
      await expect(articleAuthorName).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsNotVisible(authorName) {
    await test.step(`Assert article author name is not visible`, async () => {
      const articleAuthorName = this.page.getByRole('link', {
        name: authorName,
      });
      await expect(articleAuthorName).toHaveCount(0);
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert article title is visible`, async () => {
      const articleTitle = this.page.getByRole('link', { name: title });
      await expect(articleTitle).toBeVisible();
    });
  }

  async assertArticleTitleIsNotVisible(title) {
    await test.step(`Assert article title is not visible in feed`, async () => {
      await expect(this.page.getByRole('link', { name: title })).toHaveCount(0);
    });
  }

  async assertArticleDescriptionIsVisible(description) {
    await test.step(`Assert article description is visible`, async () => {
      const articleDescription = this.page.getByRole('link', {
        name: description,
      });
      await expect(articleDescription).toBeVisible();
    });
  }

  async assertArticleDescriptionIsNotVisible(description) {
    await test.step(`Assert article description is not visible`, async () => {
      const articleDescription = this.page.getByRole('link', {
        name: description,
      });
      await expect(articleDescription).toHaveCount(0);
    });
  }
}
