#!/bin/bash

#Variables
LOG_BUCKET="my-org-log-bucket"
SOURCE_BUCKET="my-app-bucket"

#Grant permissions for LogDelivery
aws s3api put-bucket-acl \
 --bucket $LOG_BUCKET \
 --grant-write 'URI="http://acs.amozonaws.com/groups/s3/LogDelivery"' \
 --grand-read-acp 'URI="http://acs.amazonaws.com/groups/s3/LogDelivery"'

 #Enable Logging on the source bucket
 aws s3api put-bucket-logging \
  --bucket $SOURCE_BUCKET \
  --bucket-logging-status file://logging.json

  echo "Logging enabled: $SOURCE_BUCKET logs go to $LOG_BUCKET/my-app-logs/"