import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.describe('view article tests', () => {
  test.beforeEach(
    async ({ page1, page2, user1, user2, articleWithoutTags }) => {
      await signUpUser(page1, user1);
      await signUpUser(page2, user2);

      await createArticle(page1, articleWithoutTags);
    },
  );

  test('View an article created by another user', async ({
    user1,
    page2,
    articleWithoutTags,
  }) => {
    const viewArticlePage = new ViewArticlePage(page2);

    await viewArticlePage.open(articleWithoutTags.url);

    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
    await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
  });

  test('View an article created by another user in Global Feed tab', async ({
    user1,
    page2,
    articleWithoutTags,
  }) => {
    const homePage = new HomePage(page2);

    await homePage.clickGlobalFeedTab();

    await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await homePage.assertArticleDescriptionIsVisible(
      articleWithoutTags.description,
    );
    await homePage.assertArticleAuthorNameIsVisible(user1.username);
  });

  test('Follow an article created by another user', async ({
    page2,
    articleWithoutTags,
  }) => {
    const viewArticlePage = new ViewArticlePage(page2);

    await viewArticlePage.open(articleWithoutTags.url);

    await viewArticlePage.clickFollowButton();

    await viewArticlePage.assertUnfollowButtonIsVisible();
  });

  test('Unfollow an article created by another user', async ({
    page2,
    articleWithoutTags,
  }) => {
    const viewArticlePage = new ViewArticlePage(page2);

    await viewArticlePage.open(articleWithoutTags.url);

    await viewArticlePage.clickFollowButton();

    await viewArticlePage.clickUnfollowButton();

    await viewArticlePage.assertFollowButtonIsVisible();
  });

  test('View an article updated by another user', async ({
    user1,
    page2,
    editArticlePage,
    viewArticlePage,
    articleWithoutTags,
    logger,
  }) => {
    const viewArticlePage2 = new ViewArticlePage(page2);
    const newArticleData = generateNewArticleData(logger);

    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillTitleField(newArticleData.title);
    await editArticlePage.fillTextField(newArticleData.text);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage2.open(articleWithoutTags.url);

    await viewArticlePage2.assertArticleTitleIsVisible(newArticleData.title);
    await viewArticlePage2.assertArticleTextIsVisible(newArticleData.text);
    await viewArticlePage2.assertArticleAuthorNameIsVisible(user1.username);
  });

  test('View new articles in Your Feed after following', async ({
    user1,
    page1,
    page2,
    articleWithoutTags,
    logger,
  }) => {
    const viewArticlePage = new ViewArticlePage(page2);
    const homePage = new HomePage(page2);
    const newArticleData = generateNewArticleData(logger);

    await viewArticlePage.open(articleWithoutTags.url);

    await viewArticlePage.clickFollowButton();

    await createArticle(page1, newArticleData);

    await homePage.open();

    await homePage.assertArticleTitleIsVisible(newArticleData.title);
    await homePage.assertArticleDescriptionIsVisible(
      newArticleData.description,
    );
    await homePage.assertArticleAuthorNameIsVisible(
      user1.username.toLowerCase(),
    );
  });

  test('No articles in Your Feed after unfollowing', async ({
    user1,
    page1,
    page2,
    articleWithoutTags,
    logger,
  }) => {
    const viewArticlePage = new ViewArticlePage(page2);
    const homePage = new HomePage(page2);
    const newArticleData = generateNewArticleData(logger);

    await viewArticlePage.open(articleWithoutTags.url);

    await viewArticlePage.clickFollowButton();
    await viewArticlePage.clickUnfollowButton();

    await createArticle(page1, newArticleData);

    await homePage.open();

    await homePage.assertArticleTitleIsNotVisible(newArticleData.title);
    await homePage.assertArticleDescriptionIsNotVisible(
      newArticleData.description,
    );
    await homePage.assertArticleAuthorNameIsNotVisible(
      user1.username.toLowerCase(),
    );
  });


});
