#!/bin/bash

set -e
set -x

export NODE_ENV="development"
export PORT=3000

cd server
npm run start:watch