#!/usr/bin/env bash

RED="\033[0;31m"
GREEN="\033[0;32m"
BLUE="\033[0;35m"
ENDCOLOR="\033[0m"

error() {
  echo -e "$RED""$*""$ENDCOLOR"
  exit 1
}

success() {
  echo -e "$GREEN""$*""$ENDCOLOR"
}

info() {
  echo -e "$BLUE""$*""$ENDCOLOR"
}

#check if yarn not installed and install it
if ! [ -x "$(command -v yarn)" ]; then
  info "Yarn not installed. Installing..."
  npm install -g yarn
fi

info "Killing any running packagers"
lsof -i :8081 | grep LISTEN
lsof -i :8081 | grep LISTEN | /usr/bin/awk '{print $2}' | xargs kill

info "Cleaning watchman, npm and pod cache"
watchman watch-del-all || error "Couldn't clean watchman cache."
rm -rf node_modules || error "Couldn't clean old node_modules."
rm -rf $TMPDIR/react-* || error "Couldn't clean react cache."
rm -rf $TMPDIR/npm-* || error "Couldn't clean npm temp data."
cd ios || error "Couldn't found ios dir."
#rm -rf Pods || error "Couldn't clean ios Pods."
#rm -rf Podfile.lock || error "Couldn't clean ios Podfile.lock file."
rm -rf build || error "Couldn't clean ios build."
yarn cache clean|| error "Couldn't clean yarn cache."
pod cache clean --all || error "Couldn't clean pod cache."
cd ../android || error "Couldn't find android dir."
rm -rf build || error "Couldn't clean android build."
cd .. || exit
rm -rf ~/Library/Developer/Xcode/DerivedData || error "Couldn't clean Developer DerivedData."
success "Finished cleaning the old cached data."

info "Installing App dependencies"
yarn install  || exit

success "Finished Installing App dependencies."
