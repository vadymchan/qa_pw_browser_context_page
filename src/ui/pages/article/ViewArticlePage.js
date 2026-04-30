import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.followButton = page.getByRole('button', { name: 'Follow' }).first();
    this.unfollowButton = page
      .getByRole('button', { name: 'Unfollow' })
      .first();
    this.editArticleButton = page
      .getByRole('link', { name: 'Edit Article' })
      .first();
  }

  authorLinkInArticleHeader(username) {
    return this.page
      .locator('.banner .article-meta')
      .getByRole('link', { name: username })
      .first();
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async clickFollowButton() {
    await test.step(`Click Follow button`, async () => {
      await this.followButton.click();
    });
  }

  async clickUnfollowButton() {
    await test.step(`Click Unfollow button`, async () => {
      await this.unfollowButton.click();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(`Assert the article has correct author username`, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  async assertFollowButtonIsVisible() {
    await test.step(`Assert follow button is visible`, async () => {
      await expect(this.followButton).toBeVisible();
    });
  }

  async assertUnfollowButtonIsVisible() {
    await test.step(`Assert unfollow button is visible`, async () => {
      await expect(this.unfollowButton).toBeVisible();
    });
  }
}
