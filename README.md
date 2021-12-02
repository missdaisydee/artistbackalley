# Artist Back Alley site source

## Running locally

Run `python -m SimpleHTTPServer 8000` from the root directory.

## Updating the artist directory

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
* `site` *(optional)*: A URL for the artist's site.
* `shop` *(optional)*: A URL for the artist's shop.
* `twitch` *(optional)*: A URL for the artist's twitch account.
* `instagram` *(optional)*: A URL for the artist's instagram account.
* `twitter` *(optional)*: A URL for the artist's twitter account.

1. Commit the changes to your branch:

```
$ git commit -am "Adding artist <artist name> to the artist directory"
```

1. Push your branch to github:

```
$ git push
```

1. Create a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
