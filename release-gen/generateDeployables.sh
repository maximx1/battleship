#!/bin/bash
TAGNAME=$(git symbolic-ref -q --short HEAD || git describe --tags --exact-match)
sed -e 's/{version}/$TAGNAME/g' Dockerfile.template > Dockerfile
