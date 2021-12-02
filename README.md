# Artist Back Alley site source

## Running locally

Run `python -m SimpleHTTPServer 8000` from the root directory, then navigate to http://localhost:8000/ to view the site.

## Adding an artist to the artist directory

1. Create a new [branch](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches):

```
$ git checkout -b <branch name>
```

1. Add the artist's train car and logo

Add the train car under `images/cars`. Add the logo under `images/logos`.

1. Add the artist's info to `data/artists.json`

* `logo`: The file name of the artist's logo. Relative to `images/logos`. CASE MATTERS.
* `trainCar`: The file name of the artist's train car. Relative to `images/cars`. CASE MATTERS.
* `bio`: The artist's biography. Up to 3 sentences.
* `shortBio`: A shortened form of the artist's biography. Only one sentence.
* `siteUrl` *(optional)*: A URL for the artist's site.
* `shopUrl` *(optional)*: A URL for the artist's shop.
* `twitchHandle` *(optional)*: The artist's Twitch.tv handle.
* `instagramHandle` *(optional)*: The artist's instagram handle.
* `twitterHandle` *(optional)*: The artist's twitter handle.

1. Commit the changes to your branch:

```
$ git commit -am "Adding artist <artist name> to the artist directory"
```

1. Push your branch to github:

```
$ git push
```

1. Create a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) by navigating to:

https://github.com/missdaisydee/artistbackalley/pull/new/<branch name&gt;

1. Review the changes in the pull request. You can add other reviewers to provide a sanity check.

1. If you make additional changes, make sure to commit and push again:

```
$ git commit -am "Fix typo" && git push
```

The pull request will automatically show the new changes.

2. Merge your change into the `master` branch by clicking "Squash and merge" on the pull request conversation page. 

At this point your change will go live after the next deployment.
