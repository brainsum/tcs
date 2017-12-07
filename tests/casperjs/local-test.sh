#!/usr/bin/env sh

# To start the test
casperjs test tests/ \
    --pre=pre.js \
    --ignore-ssl-errors=true \
    --ssl-protocol=any \
    --web-security=no \
    --fail-fast


# --debug=yes

#    --engine=slimerjs \
