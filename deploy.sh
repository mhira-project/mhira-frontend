#!/bin/bash

# build
ng build --aot --prod --extract-css false
# upload to amazon

# nano ~/.aws/credentials

aws s3 sync dist s3://mhira-portal --delete --profile Mhira --region=af-south-1

aws cloudfront create-invalidation --distribution-id ELKUDD46VAWKE --paths "/index.html" --profile Mhira
