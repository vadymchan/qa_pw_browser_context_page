import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { expect } from '@playwright/test';

test.describe('view own article not logged in', () => {
  test.beforeEach(async ({ user1, page1, articleWithoutTags }) => {
    await signUpUser(page1, user1);

    await createArticle(page1, articleWithoutTags);
  });

  test('View own article in "Global feed" when not logged in', async ({
    user1,
    page2,
    articleWithoutTags,
  }) => {
    const homePage = new HomePage(page2);

    await homePage.open();

    await expect
      .poll(
        async () => {
          await page2.reload();
          return page2
            .getByRole('link', { name: articleWithoutTags.title })
            .count();
        },
        { timeout: 30000 },
      )
      .toBeGreaterThan(0);

    await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await homePage.assertArticleDescriptionIsVisible(
      articleWithoutTags.description,
    );
    await homePage.assertArticleAuthorNameIsVisible(
      user1.username.toLowerCase(),
    );
  });
});
