#!/usr/bin/env sh


set -e


npm run build


cd dist


git init
git add -A
git commit -m 'deploy'

# если вы деплоите на https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# если вы деплоите на https://<USERNAME>.github.io/<REPO>
git push -f git@github.com/BlackFargo/To-do-list-React.git master:gh-pages

cd -